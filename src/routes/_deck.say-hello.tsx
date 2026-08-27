import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_deck/say-hello")({
  head: () => ({
    meta: [
      { title: "Say hello — Favour Sukat" },
      {
        name: "description",
        content:
          "Reach out by email or LinkedIn. Nigeria based product manager, working with teams anywhere.",
      },
      { property: "og:title", content: "Say hello — Favour Sukat" },
      {
        property: "og:description",
        content: "Reach out by email or LinkedIn.",
      },
      { property: "og:url", content: "https://favoursukat.com/say-hello" },
    ],
    links: [{ rel: "canonical", href: "https://favoursukat.com/say-hello" }],
  }),
  component: () => null,
});
