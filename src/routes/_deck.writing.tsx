import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_deck/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Favour Sukat" },
      {
        name: "description",
        content:
          "Essays on product analytics, retention and building with AI, straight from my latest feed.",
      },
      { property: "og:title", content: "Writing — Favour Sukat" },
      {
        property: "og:description",
        content: "Essays on product analytics, retention and building with AI.",
      },
      { property: "og:url", content: "https://favoursukat.com/writing" },
    ],
    links: [{ rel: "canonical", href: "https://favoursukat.com/writing" }],
  }),
  component: () => null,
});
