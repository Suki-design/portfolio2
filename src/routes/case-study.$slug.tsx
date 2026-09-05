import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuroraField } from "@/components/AuroraField";
import { CASE_STUDIES, type Stage } from "@/lib/content";

export const Route = createFileRoute("/case-study/$slug")({
  loader: ({ params }) => {
    const study = CASE_STUDIES.find((item) => item.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { study } = loaderData;
    const title = `${study.title} | Favour Sukat`;
    const url = `https://favoursukat.com/case-study/${study.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: study.teaser },
        { property: "og:title", content: title },
        { property: "og:description", content: study.teaser },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  const [step, setStep] = useState(0);
  const stage = study.stages[step]!;
  const last = step === study.stages.length - 1;
  const next =
    CASE_STUDIES[
      (CASE_STUDIES.findIndex((s) => s.slug === study.slug) + 1) % CASE_STUDIES.length
    ]!;

  useEffect(() => {
    setStep(0);
  }, [study.slug]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight")
        setStep((s) => Math.min(s + 1, study.stages.length - 1));
      if (event.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [study.stages.length]);

  const hue = String(Number(study.hue) + step * 12);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AuroraField hue={hue} />

      <header className="relative z-10 flex items-center justify-between px-6 pt-24 pb-2 md:px-10">
        <Link
          to="/"
          hash="work"
          className="text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          ← Back to the deck
        </Link>
        <span className="text-xs tracking-widest text-muted-foreground uppercase">
          {study.kicker}
        </span>
      </header>

      <div className="relative z-10 flex flex-1 items-center px-6 py-10 md:px-16">
        <div className="mx-auto w-full max-w-4xl">
          <nav className="flex flex-wrap gap-2" aria-label="Case study stages">
            {study.stages.map((s, index) => (
              <button
                key={s.key}
                onClick={() => setStep(index)}
                className="rounded-full px-4 py-1.5 text-xs tracking-widest uppercase transition-colors"
                style={{
                  background: index === step ? "var(--primary)" : "transparent",
                  color: index === step ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  border: `1px solid ${index === step ? "transparent" : "var(--border)"}`,
                }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div key={stage.key} className="rise-in mt-10">
            <h1 className=" text-[clamp(2rem,5.5vw,3.8rem)] leading-[1.05] text-bone">
              {stage.heading}
            </h1>

            {stage.body.map((paragraph, index) =>
              typeof paragraph === "string" ? (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph}
                </p>
              ) : (
                <p
                  key={`link-${index}`}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {paragraph.leading}
                  <a
                    href={paragraph.href}
                    target="_blank"
                    rel="noopener"
                    className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
                  >
                    {paragraph.label}
                  </a>
                  {paragraph.trailing}
                </p>
              )
            )}

            {stage.media && <MediaBand media={stage.media} />}

            {stage.points && (

              <ul className="mt-9 grid gap-4 md:grid-cols-3">
                {stage.points.map((point) => (
                  <li key={point.title} className="glass rounded-3xl p-6">
                    <h2 className="text-lg leading-snug text-bone">{point.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {point.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {last && study.link && (
              <a
                href={study.link.href}
                target="_blank"
                rel="noopener"
                className="mt-9 inline-flex rounded-full border border-border px-6 py-3 text-sm text-bone transition-colors hover:border-primary hover:text-primary"
              >
                {study.link.label} ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 pb-9 md:px-16">
        <div className="flex gap-3">
          <button
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="rounded-full border border-border px-6 py-3 text-xs tracking-widest uppercase transition-colors hover:border-primary disabled:opacity-30"
          >
            Back
          </button>
          {last ? (
            <Link
              to="/case-study/$slug"
              params={{ slug: next.slug }}
              className="rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-widest text-primary-foreground uppercase"
            >
              Next case study
            </Link>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-[1.03]"
            >
              {study.stages[step + 1]!.label}
            </button>
          )}
        </div>
        <Link
          to="/case-studies"
          hash="work"
          className="text-xs tracking-widest text-muted-foreground uppercase"
        >
          All case studies
        </Link>
      </footer>
    </div>
  );
}

function MediaBand({ media }: { media: NonNullable<Stage["media"]> }) {
  const phones = media.kind === "phones";
  return (
    <div
      className={`mt-10 grid gap-6 ${
        phones
          ? media.shots.length > 1
            ? "max-w-2xl sm:grid-cols-2"
            : "max-w-[15rem]"
          : "max-w-3xl"
      }`}
    >
      {media.shots.map((shot) => (
        <figure key={shot.src} className="rise-in">
          <div
            className={`overflow-hidden border border-border/70 bg-black/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${
              phones ? "rounded-[2rem] p-2" : "rounded-2xl"
            }`}
          >
            {!phones && (
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-white/[0.04] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
            )}
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className={`w-full ${phones ? "rounded-[1.6rem]" : ""}`}
            />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
