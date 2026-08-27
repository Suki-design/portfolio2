type Props = { hue?: string };

/**
 * Living aurora background: two counter-rotating gradient fields under a grain
 * overlay. Pure CSS, no WebGL. `hue` shifts the whole field per case study.
 * Layers stay near-viewport sized so compositors keep the blur (very large
 * blurred surfaces get dropped and the field renders flat black).
 */
export function AuroraField({ hue = "150" }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-deep"
      style={{ filter: `hue-rotate(${Number(hue) - 150}deg)` }}
    >
      <div
        className="aurora-layer absolute top-1/2 left-1/2 h-[105vmax] w-[105vmax] -translate-x-1/2 -translate-y-1/2 blur-[60px]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, oklch(0.15 0.03 175) 0deg, oklch(0.6 0.18 152) 45deg, oklch(0.2 0.05 200) 110deg, oklch(0.48 0.14 200) 175deg, oklch(0.16 0.03 170) 240deg, oklch(0.66 0.19 145) 305deg, oklch(0.15 0.03 175) 360deg)",
          opacity: 0.9,
        }}
      />
      <div
        className="aurora-layer-slow absolute top-1/2 left-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 -translate-y-1/2 blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side at 32% 38%, oklch(0.75 0.2 152 / 0.55), transparent 70%), radial-gradient(closest-side at 72% 66%, oklch(0.55 0.15 205 / 0.5), transparent 72%), radial-gradient(closest-side at 55% 18%, oklch(0.45 0.13 170 / 0.45), transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 45%, oklch(0.09 0.02 175 / 0.2) 0%, oklch(0.09 0.02 175 / 0.6) 58%, oklch(0.07 0.015 175 / 0.94) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
