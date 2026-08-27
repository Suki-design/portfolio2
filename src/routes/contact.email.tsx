import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { CONTACT } from "@/lib/content";

export const Route = createFileRoute("/contact/email")({
  head: () => ({
    meta: [{ title: "Email Favour Sukat" }, { name: "robots", content: "noindex" }],
  }),
  component: EmailHandoff,
});

function EmailHandoff() {
  useEffect(() => {
    window.location.href = `mailto:${CONTACT.email}`;
  }, []);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-bone">Opening your email app.</p>
      <a href={`mailto:${CONTACT.email}`} className="text-primary underline">
        {CONTACT.email}
      </a>
    </main>
  );
}
