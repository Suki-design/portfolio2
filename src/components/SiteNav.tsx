import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { JourneyOverlay } from "./JourneyOverlay";

type DeckCard = "home" | "work" | "how-i-work" | "writing" | "hello";

const DECK_PATHS: Record<DeckCard, string> = {
  home: "/",
  work: "/case-studies",
  "how-i-work": "/how-i-work",
  writing: "/writing",
  hello: "/say-hello",
};

function useDeckNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onDeck = Object.values(DECK_PATHS).includes(pathname);

  return (card: DeckCard) => {
    if (onDeck) {
      window.dispatchEvent(new CustomEvent("deck:goto", { detail: card }));
    } else {
      navigate({ to: DECK_PATHS[card] });
    }
  };
}

export function SiteNav() {
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const goDeck = useDeckNav();

  const links: { card: DeckCard; label: string }[] = [
    { card: "work", label: "Case studies" },
    { card: "writing", label: "Writing" },
  ];

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => goDeck("home")}
          className="hidden font-display text-sm tracking-[0.2em] text-bone uppercase md:block"
        >
          Favour Sukat
        </button>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <button
            onClick={() => setJourneyOpen(true)}
            className="transition-colors hover:text-primary"
          >
            The long way here
          </button>
          {links.map((l) => (
            <button
              key={l.card}
              onClick={() => goDeck(l.card)}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => goDeck("hello")}
            className="rounded-full border border-border px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Say hello
          </button>
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="ml-auto rounded-full border border-border px-4 py-2 text-xs tracking-widest uppercase md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {menuOpen && (
        <div className="solid-card fixed inset-x-4 top-20 z-40 rounded-3xl p-6 md:hidden">
          <div className="flex flex-col gap-5 text-lg">
            <button
              className="text-left"
              onClick={() => {
                setMenuOpen(false);
                goDeck("home");
              }}
            >
              Home
            </button>
            <button
              className="text-left"
              onClick={() => {
                setMenuOpen(false);
                setJourneyOpen(true);
              }}
            >
              The long way here
            </button>
            {[...links, { card: "hello" as DeckCard, label: "Say hello" }].map((l) => (
              <button
                key={l.card}
                className="text-left"
                onClick={() => {
                  setMenuOpen(false);
                  goDeck(l.card);
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <JourneyOverlay open={journeyOpen} onClose={() => setJourneyOpen(false)} />
    </>
  );
}
