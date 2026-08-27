import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuroraField } from "@/components/AuroraField";
import {
  CASE_STUDIES,
  FALLBACK_ARTICLES,
  MEDIUM_PROFILE,
  PILLARS,
  type Article,
} from "@/lib/content";
import { getLatestMediumPosts } from "@/lib/medium.functions";

const DECK_CARDS = [
  { key: "home", label: "Home", path: "/" },
  { key: "work", label: "Case studies", path: "/case-studies" },
  { key: "how-i-work", label: "How I work", path: "/how-i-work" },
  { key: "writing", label: "Writing", path: "/writing" },
  { key: "hello", label: "Say hello", path: "/say-hello" },
] as const;

export type DeckKey = (typeof DECK_CARDS)[number]["key"];

export function Deck() {
  const scroller = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const routeIndex = Math.max(
    0,
    DECK_CARDS.findIndex((c) => c.path === pathname),
  );
  const [active, setActive] = useState(routeIndex);
  const settled = useRef(false);

  const goTo = useCallback((index: number) => {
    const el = scroller.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(index, DECK_CARDS.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: settled.current ? "smooth" : "auto" });
  }, []);

  // Keep the URL in sync with the visible card so each one is its own page view.
  const syncUrl = useCallback(
    (index: number) => {
      const target = DECK_CARDS[index]?.path;
      if (!target || target === pathname) return;
      navigate({ to: target, resetScroll: false });
    },
    [navigate, pathname],
  );

  // Land on the card the URL asks for.
  useEffect(() => {
    goTo(routeIndex);
    setActive(routeIndex);
    const id = window.setTimeout(() => {
      settled.current = true;
    }, 60);
    return () => window.clearTimeout(id);
  }, [routeIndex, goTo]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let timer = 0;
    const onScroll = () => {
      setActive(Math.round(el.scrollLeft / el.clientWidth));
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => syncUrl(Math.round(el.scrollLeft / el.clientWidth)),
        400,
      );
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [syncUrl]);

  useEffect(() => {
    const onDeckGoto = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      const index = DECK_CARDS.findIndex((c) => c.key === key);
      if (index >= 0) {
        goTo(index);
        syncUrl(index);
      }
    };
    window.addEventListener("deck:goto", onDeckGoto);
    return () => window.removeEventListener("deck:goto", onDeckGoto);
  }, [goTo, syncUrl]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let cooling = false;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (cooling || Math.abs(event.deltaY) < 12) return;
      cooling = true;
      goTo(active + (event.deltaY > 0 ? 1 : -1));
      window.setTimeout(() => {
        cooling = false;
      }, 550);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, goTo]);

  const { data: posts } = useQuery({
    queryKey: ["medium-latest"],
    queryFn: () => getLatestMediumPosts(),
    staleTime: 1000 * 60 * 30,
  });

  const articles: Article[] =
    posts && posts.length > 0
      ? [
          ...posts,
          ...FALLBACK_ARTICLES.filter((a) => !posts.some((p) => p.href === a.href)),
        ].slice(0, 3)
      : FALLBACK_ARTICLES;

  return (
    <div className="relative h-dvh overflow-hidden">
      <AuroraField />

      <div
        ref={scroller}
        className="no-scrollbar relative z-10 flex h-dvh snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-none"
      >
        {/* 1. Opening */}
        <Card>
          <h1 className="text-[clamp(2.8rem,9vw,6rem)] leading-[0.95] text-bone">
            Favour Sukat
          </h1>
          <p className="label-xs mt-5">Product Manager, AI Builder</p>
          <p className="mt-6 max-w-2xl text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug text-bone">
            Data native. Opinionated about craft. Obsessed with retention over hype.
          </p>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I design and build products from the schema level up, balancing AI token
            economics, user friction, and real-world edge cases to ship software people
            actually use, trust, and keep coming back to.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/case-study/$slug"
              params={{ slug: CASE_STUDIES[0]!.slug }}
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Begin a case study
            </Link>
            <button
              onClick={() => {
                goTo(2);
                syncUrl(2);
              }}
              className="rounded-full border border-border px-7 py-3.5 text-sm tracking-wide text-bone transition-colors hover:border-primary hover:text-primary"
            >
              See my thinking
            </button>
          </div>
        </Card>

        {/* 2. Case studies */}
        <Card>
          <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,3.6rem)] leading-tight text-bone">
            Four problems, told as journeys.
          </h2>
          <div className="mt-10 grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                to="/case-study/$slug"
                params={{ slug: study.slug }}
                className="glass group flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1.5"
              >
                <h3 className="text-xl leading-snug text-bone">{study.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {study.teaser}
                </p>
                <span className="mt-6 text-sm text-primary">Walk through it →</span>
              </Link>
            ))}
          </div>
        </Card>

        {/* 3. How I work */}
        <Card>
          <h2 className="max-w-3xl text-[clamp(1.6rem,4.4vw,2.8rem)] leading-tight text-bone">
            Six things I do before anyone asks me for a roadmap.
          </h2>
          <PillarStack />
        </Card>

        {/* 4. Writing */}
        <Card>
          <h2 className="max-w-2xl text-[clamp(2rem,5.5vw,3.6rem)] leading-tight text-bone">
            Latest, straight from my feed.
          </h2>
          <div className="mt-10 grid w-full gap-5 md:grid-cols-3">
            {articles.map((article, index) => (
              <a
                key={article.href}
                href={article.href}
                target="_blank"
                rel="noopener"
                className="glass flex flex-col rounded-3xl p-6 transition-transform hover:-translate-y-1.5"
              >
                {index === 0 && (
                  <span className="flex items-center gap-2 text-xs tracking-widest text-primary uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Newest
                  </span>
                )}
                <h3 className="mt-4 text-lg leading-snug text-bone">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {article.desc}
                </p>
                <span className="mt-6 text-xs tracking-widest text-muted-foreground uppercase">
                  {article.meta}
                </span>
              </a>
            ))}
          </div>
          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex rounded-full border border-border px-6 py-3 text-sm text-bone transition-colors hover:border-primary hover:text-primary"
          >
            See all writings
          </a>
        </Card>

        {/* 5. Contact */}
        <Card>
          <h2 className="max-w-3xl text-[clamp(2.2rem,6vw,4.2rem)] leading-tight text-bone">
            If your product cannot explain itself yet, that is the part I like.
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
            I am looking for a product team where technical range is used for strategy rather than
            translation duty. Nigeria based, working with teams anywhere.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact/email"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Email me
            </Link>
            <Link
              to="/contact/linkedin"
              className="rounded-full border border-border px-7 py-3.5 text-sm text-bone transition-colors hover:border-primary hover:text-primary"
            >
              LinkedIn
            </Link>
          </div>
        </Card>
      </div>

      {/* Scrims so the fixed header/footer chrome stays legible over scrolling
          card content instead of visually colliding with it on mobile. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-deep via-deep/60 to-transparent md:h-24" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-deep via-deep/70 to-transparent md:h-32" />

      {/* Deck controls */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 pb-7 md:px-10">
        <div className="pointer-events-auto flex items-center gap-3">
          {DECK_CARDS.map((card, index) => (
            <button
              key={card.key}
              onClick={() => {
                goTo(index);
                syncUrl(index);
              }}
              aria-label={card.label}
              aria-current={active === index}
              className="group flex items-center gap-2"
            >
              <span
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: active === index ? "2.2rem" : "0.375rem",
                  background: active === index ? "var(--primary)" : "var(--border)",
                }}
              />
              {active === index && (
                <span className="text-xs tracking-widest text-bone uppercase">{card.label}</span>
              )}
            </button>
          ))}
        </div>
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous card"
            disabled={active === 0}
            className="twirl-left grid h-11 w-11 place-items-center rounded-full border border-border text-bone transition-colors hover:border-primary hover:text-primary disabled:opacity-25"
          >
            <SwipeArrow direction="left" />
          </button>
          <span className="text-xs tracking-[0.28em] text-muted-foreground uppercase">Swipe</span>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next card"
            disabled={active === DECK_CARDS.length - 1}
            className="twirl-right grid h-11 w-11 place-items-center rounded-full border border-border text-bone transition-colors hover:border-primary hover:text-primary disabled:opacity-25"
          >
            <SwipeArrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PillarStack() {
  const [top, setTop] = useState(0);
  const count = PILLARS.length;

  return (
    <div className="mt-8 w-full select-none">
      <div className="relative mx-auto h-[clamp(22rem,46vh,25rem)] w-full max-w-3xl">
        {PILLARS.map((item, index) => {
          const offset = (index - top + count) % count;
          const visible = offset < 3;
          const dir = offset % 2 === 0 ? 1 : -1;
          const tilt = offset === 0 ? 0 : dir * (1.6 + offset * 1.1);
          const isTopCard = offset === 0;

          return (
            <div
              key={item.n}
              onClick={() => {
                if (isTopCard) setTop((t) => (t + 1) % count);
              }}
              aria-hidden={!isTopCard}
              className={`solid-card absolute inset-0 flex flex-col rounded-3xl p-6 text-left transition-transform duration-300 ease-out md:p-10 ${
                isTopCard ? "cursor-pointer" : ""
              }`}
              style={{
                transform: `translate3d(${isTopCard ? 0 : dir * offset * 6}px, ${offset * 8}px, 0) rotate(${tilt}deg) scale(${1 - offset * 0.02})`,
                background:
                  isTopCard ? "oklch(0.09 0.018 175)" : `oklch(${0.14 + offset * 0.025} 0.02 172)`,
                borderColor: isTopCard ? "var(--border)" : "oklch(0.92 0.05 155 / 30%)",
                opacity: visible ? 1 : 0,
                zIndex: count - offset,
                pointerEvents: isTopCard ? "auto" : "none",
              }}
            >
              <span className="font-display text-sm text-primary">
                {item.n} / {String(count).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[clamp(1.3rem,3vw,2rem)] leading-snug text-bone">
                {item.title}
              </h3>
              <p className="mt-4 text-[clamp(0.9rem,1.7vw,1.05rem)] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              <span className="mt-auto pt-5 text-xs tracking-widest text-primary uppercase">
                Tap for next
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SwipeArrow({ direction: _direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* a twirling tail that curls into the arrowhead */}
      <path d="M4 20c3.4 0 5.6-2.2 5.6-4.8 0-1.9-1.3-3.2-2.9-3.2-1.5 0-2.6 1.1-2.6 2.5 0 1.7 1.4 2.8 3.4 2.8 3.6 0 6.1-2.1 8.9-2.1" />
      <path d="M17 16h11" />
      <path d="M23.5 11.5 28 16l-4.5 4.5" />
    </svg>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative h-dvh w-screen flex-none snap-center snap-always overflow-y-auto overflow-x-hidden">
      <div className="rise-in m-auto flex min-h-full w-full max-w-7xl flex-col justify-center px-6 pt-32 pb-40 md:px-16 md:pt-28 md:pb-32">
        {children}
      </div>
    </section>
  );
}