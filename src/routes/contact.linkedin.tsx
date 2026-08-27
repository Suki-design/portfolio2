import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CONTACT } from "@/lib/content";

export const Route = createFileRoute("/contact/linkedin")({
  head: () => ({
    meta: [{ title: "Favour Sukat on LinkedIn" }, { name: "robots", content: "noindex" }],
  }),
  component: LinkedInHandoff,
});

function LinkedInHandoff() {
  useEffect(() => {
    window.location.href = CONTACT.linkedin;
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-bone">Taking you to LinkedIn.</p>
      <a href={CONTACT.linkedin} className="text-primary underline">
        Open LinkedIn
      </a>
    </main>
  );
}
