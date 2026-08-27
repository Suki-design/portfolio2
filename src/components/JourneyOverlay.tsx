import { useEffect, useState } from "react";
import { CERTIFICATIONS, MILESTONES } from "@/lib/content";

export function JourneyOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown" || event.key === "ArrowRight")
        setStep((s) => Math.min(s + 1, MILESTONES.length));
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const atEnd = step >= MILESTONES.length;
  const milestone = MILESTONES[Math.min(step, MILESTONES.length - 1)]!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The long way here"
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "oklch(0.09 0.02 175 / 0.94)", backdropFilter: "blur(22px)" }}
    >
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <span className="label-xs">The long way here</span>
        <button
          onClick={onClose}
          className="rounded-full border border-border px-4 py-2 text-xs tracking-widest uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Close
        </button>
      </header>

      <div className="flex flex-1 items-center px-6 pb-10 md:px-12">
        <div className="mx-auto w-full max-w-3xl">
          {atEnd ? (
            <div key="certs" className="rise-in">
              <p className="label-xs">Also collected along the way</p>
              <ul className="mt-8 space-y-6">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.title} className="border-b border-border pb-5">
                    <p className="font-display text-xl text-bone">{cert.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cert.org} · {cert.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div key={milestone.date} className="rise-in">
              <p className="label-xs">{milestone.date}</p>
              <h2 className="mt-5 text-3xl leading-tight text-bone md:text-5xl">
                {milestone.role}
              </h2>
              <p
                className="mt-3 text-sm tracking-wide"
                style={{
                  color:
                    milestone.kind === "study"
                      ? "var(--accent)"
                      : milestone.kind === "honour"
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                }}
              >
                {milestone.org}
              </p>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {milestone.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between gap-6 px-6 pb-8 md:px-12">
        <div className="flex flex-wrap gap-1.5">
          {MILESTONES.map((m, index) => (
            <button
              key={m.date}
              aria-label={`Go to ${m.date}`}
              onClick={() => setStep(index)}
              className="h-1 w-8 rounded-full transition-colors"
              style={{
                background: index <= step ? "var(--primary)" : "var(--border)",
              }}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="rounded-full border border-border px-5 py-2.5 text-xs tracking-widest uppercase transition-colors hover:border-primary disabled:opacity-30"
          >
            Back
          </button>
          <button
            onClick={() => (atEnd ? onClose() : setStep((s) => s + 1))}
            className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold tracking-widest text-primary-foreground uppercase transition-transform hover:scale-[1.03]"
          >
            {atEnd ? "Done" : "Keep going"}
          </button>
        </div>
      </footer>
    </div>
  );
}
