# Component Catalog — v2 (extended 11–20)

Built on top of v1 (`component-catalog-v1.md`). Use these when v1 isn't enough or when the deliverable is a high-stakes hero piece, full interactive experience, or proposal-grade landing page.

| # | Component | Category | Source | Notes |
|---|---|---|---|---|
| 11 | Siri Orb | hero / live | SmoothUI | Voice-assistant aesthetic; perfect for AI surfaces |
| 12 | AI Input | live | SmoothUI | Chat input with state-aware micro-animations |
| 13 | Animated Background — Gradient / Stars / Hexagon | hero | Animate UI | Best non-WebGL backdrop family |
| 14 | MacBook Scroll | hero | Aceternity | Course-intro signature move |
| 15 | Liquid Button | interaction | Animate UI | Tactile CTA alternative |
| 16 | Morphing Dialog | overlay | Motion Primitives | Apple-grade shared-layout transitions |
| 17 | Progressive Blur | scroll | Motion Primitives | Bottom-of-page blur fade |
| 18 | Animated Circular Progress | data-viz | Magic UI | Gauge / completion indicator |
| 19 | Animated Timeline | navigation | Animata | Vertical course curriculum |
| 20 | Marquee | scroll | Kibo UI | Logo strip / testimonial loop |

---

## 11. Siri Orb

```tsx
// SmoothUI
import { SiriOrb } from "@/components/smoothui/siri-orb";

export function AIPresence() {
  return <SiriOrb size={120} state="listening" />;  // idle | listening | thinking | speaking
}
```

State transitions are spring-driven (`{ duration: 0.7, bounce: 0.3 }`). Use sparingly — one per page, near AI surfaces.

## 12. AI Input

```tsx
// SmoothUI
import { AIInput } from "@/components/smoothui/ai-input";

export function ChatBar() {
  return (
    <AIInput
      placeholder="Ask the course assistant..."
      onSubmit={(text) => { /* ... */ }}
    />
  );
}
```

Built-in micro-animations: typing → button morph → spinner → response state. Drop-in for any course AI feature.

## 13. Animated Background (Animate UI)

```tsx
// One section, one ground. Don't stack.
import { GradientBackground } from "@/components/animate-ui/backgrounds/gradient";

export function Hero() {
  return (
    <section className="relative">
      <GradientBackground className="absolute inset-0" />
      <div className="relative z-10">{/* content */}</div>
    </section>
  );
}
```

Choices: `gradient` (default), `stars` (course universe vibe), `hexagon` (tech grid), `hole` (focal point), `fireworks` (celebration). All respect `prefers-reduced-motion`.

## 14. MacBook Scroll

```tsx
// Aceternity
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function CourseLanding() {
  return (
    <MacbookScroll
      title={<span>Build it. <br /> Then learn how it works.</span>}
      src="/course-screenshot.png"
      showGradient
    />
  );
}
```

A signature move: as the user scrolls, a MacBook lid opens revealing the product screenshot. Use ONCE per page (above the fold).

## 15. Liquid Button (Animate UI)

```tsx
import { LiquidButton } from "@/components/animate-ui/buttons/liquid";

export function CTA() {
  return <LiquidButton>Book a call</LiquidButton>;
}
```

Tactile alternative when magnetic feels too restrained. Pairs well with `rounded-full` shape and accent fill.

## 16. Morphing Dialog (Motion Primitives)

```tsx
import { MorphingDialog, MorphingDialogTrigger, MorphingDialogContent } from "@/components/ui/morphing-dialog";

export function ModuleCard({ module }) {
  return (
    <MorphingDialog transition={{ duration: 0.5, bounce: 0.25 }}>
      <MorphingDialogTrigger className="block">
        <article className="card">{module.title}</article>
      </MorphingDialogTrigger>
      <MorphingDialogContent className="dialog">
        {/* expanded view, morphs FROM the card */}
      </MorphingDialogContent>
    </MorphingDialog>
  );
}
```

Card → detail morph is the most "Apple" interaction on the modern web. Worth its weight on a course index page.

## 17. Progressive Blur (Motion Primitives)

```tsx
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

<div className="relative">
  <ScrollContent />
  <ProgressiveBlur className="absolute bottom-0 left-0 right-0 h-32" direction="bottom" blurIntensity={1} />
</div>
```

Fade the bottom of a scrolling list into blur — signals "more content below" without a hard gradient cut.

## 18. Animated Circular Progress (Magic UI)

```tsx
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";

<AnimatedCircularProgressBar max={100} value={73} min={0}
  gaugePrimaryColor="var(--color-accent)" gaugeSecondaryColor="var(--color-border)" />
```

Companion to NumberTicker — use side-by-side: a number + a ring at the same value. Reads as "this metric, at this scale."

## 19. Animated Timeline (Animata)

```tsx
import { AnimatedTimeline } from "@/components/animata/animated-timeline";

const events = [
  { title: "Module 01", description: "Foundations", date: "Week 1" },
  { title: "Module 02", description: "State & data", date: "Week 2" },
  // ...
];

<AnimatedTimeline events={events} />
```

Vertical timeline that reveals as scroll progresses. Default choice for course curriculum / roadmap visualizations.

## 20. Marquee (Kibo UI)

```tsx
import { Marquee } from "@/components/ui/marquee";

<Marquee pauseOnHover className="py-6">
  {logos.map((logo) => <img key={logo.src} src={logo.src} alt={logo.alt} className="h-10 mx-8" />)}
</Marquee>
```

Logo strip / testimonial scroller. Pause on hover is mandatory (without it, users can't read or click).

---

## Composition examples

### Premium course landing (uses 8 components)
1. Hero (1) text reveal over Gradient Background (13)
2. Magnetic CTA (8) — primary
3. MacBook Scroll (14) — see the product
4. Proof: Number Ticker (2) ×3 + Marquee (20) of org logos
5. Mechanism: Sticky Scroll Reveal (6) — 3 steps
6. Curriculum: Animated Timeline (19)
7. Module index: 3D Tilt Cards (7) inside Bento Grid (3) with Morphing Dialog (16) on click
8. Final CTA: Magnetic Button (8)

### Dashboard with WOW (uses 5 components)
1. Top row: 3× KPI tiles (Number Ticker (2)) inside Bento Grid (3)
2. Middle: Sparkline (in dashboard-widget mode) + Animated Circular Progress (18)
3. Right rail: Activity Feed (in dashboard-widget mode)
4. Header pill: Dynamic Island (9)
5. Architecture diagram (when expanded): Animated Beam (10)
