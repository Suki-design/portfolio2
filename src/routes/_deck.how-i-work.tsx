import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_deck/how-i-work")({
  head: () => ({
    meta: [
      { title: "How I work — Favour Sukat" },
      {
        name: "description",
        content:
          "Six things I do before anyone asks me for a roadmap: reframing, discovery, measurement, delivery, retention loops.",
      },
      { property: "og:title", content: "How I work — Favour Sukat" },
      {
        property: "og:description",
        content: "Six things I do before anyone asks me for a roadmap.",
      },
      { property: "og:url", content: "https://favoursukat.com/how-i-work" },
    ],
    links: [{ rel: "canonical", href: "https://favoursukat.com/how-i-work" }],
  }),
  component: () => null,
});
