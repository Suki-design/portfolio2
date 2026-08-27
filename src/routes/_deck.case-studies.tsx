import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_deck/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — Favour Sukat" },
      {
        name: "description",
        content:
          "Four product problems told as journeys: retention in an AI household app, a first sale finder, a social game, and a teardown.",
      },
      { property: "og:title", content: "Case studies — Favour Sukat" },
      {
        property: "og:description",
        content: "Four product problems told as journeys, with the decisions left in.",
      },
      { property: "og:url", content: "https://favoursukat.com/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://favoursukat.com/case-studies" }],
  }),
  component: () => null,
});
