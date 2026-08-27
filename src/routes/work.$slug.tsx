import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URLs. Keeps old links and search results working after the rename.
const RENAMED: Record<string, string> = {
  "measurement-rebuild": "ai-household-retention",
  ditto: "ditto-social-game",
};

export const Route = createFileRoute("/work/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/case-study/$slug",
      params: { slug: RENAMED[params.slug] ?? params.slug },
      replace: true,
    });
  },
});
