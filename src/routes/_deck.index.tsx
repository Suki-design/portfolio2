import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_deck/")({
  head: () => ({
    meta: [
      { title: "Favour Sukat — Product Manager, AI Builder" },
      {
        name: "description",
        content:
          "Data native. Opinionated about craft. Obsessed with retention over hype. I design and build products from the schema level up, balancing AI token economics, user friction, and real-world edge cases.",
      },
      { property: "og:title", content: "Favour Sukat — Product Manager, AI Builder" },
      {
        property: "og:description",
        content: "Data native. Opinionated about craft. Obsessed with retention over hype.",
      },
      { property: "og:url", content: "https://favoursukat.com/" },
    ],
    links: [{ rel: "canonical", href: "https://favoursukat.com/" }],
  }),
  component: () => null,
});
