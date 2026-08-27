import { createServerFn } from "@tanstack/react-start";

export type MediumPost = {
  title: string;
  href: string;
  desc: string;
  meta: string;
};

function decode(input: string) {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match?.[1] ? decode(match[1]) : "";
}

export const getLatestMediumPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediumPost[]> => {
    try {
      const res = await fetch("https://medium.com/feed/@sukatfavour", {
        headers: { "user-agent": "Mozilla/5.0 (compatible; portfolio-feed)" },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      const items = xml.split("<item>").slice(1, 4);

      return items
        .map((block) => {
          const title = pick(block, "title");
          const href = pick(block, "link");
          const raw = pick(block, "content:encoded") || pick(block, "description");
          const pubDate = pick(block, "pubDate");
          const date = pubDate ? new Date(pubDate) : null;
          const meta =
            date && !Number.isNaN(date.getTime())
              ? `${date.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}, Medium`
              : "Medium";
          return {
            title,
            href,
            desc: raw.slice(0, 190).trim() + (raw.length > 190 ? "..." : ""),
            meta,
          };
        })
        .filter((post) => post.title && post.href);
    } catch {
      return [];
    }
  },
);
