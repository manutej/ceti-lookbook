# Component Catalog — v1 (top 10)

Curated for course pages, dashboards, and technical demos. Hybrid shadcn structure + smoothui motion vocabulary. Each component has both a Next.js/tsx pattern and a single-file HTML port.

## The v1 ten

| # | Component | Category | Source | Output modes |
|---|---|---|---|---|
| 1 | [Hero Text Reveal](#1-hero-text-reveal) | hero | Motion Primitives `TextEffect` / GSAP `SplitText` | all modes |
| 2 | [Number Ticker](#2-number-ticker) | data-viz | Magic UI `NumberTicker` / SmoothUI `NumberFlow` | all modes |
| 3 | [Bento Grid](#3-bento-grid) | dashboard | Magic UI `BentoGrid` + `MagicCard` | all modes |
| 4 | [Magic Card + Border Beam](#4-magic-card--border-beam) | card | Magic UI | all modes |
| 5 | [Hero Parallax](#5-hero-parallax) | hero | Aceternity `HeroParallax` | landing, experience |
| 6 | [Sticky Scroll Reveal](#6-sticky-scroll-reveal) | scroll | Aceternity `StickyScrollReveal` / GSAP pinned | experience, landing |
| 7 | [3D Tilt Card](#7-3d-tilt-card) | card | Aceternity `3D Card Effect` / Motion Primitives `Tilt` | all modes |
| 8 | [Magnetic Button](#8-magnetic-button) | interaction | SmoothUI `MagneticButton` | all modes |
| 9 | [Dynamic Island](#9-dynamic-island) | live status | SmoothUI / Cult UI | dashboard, experience |
| 10 | [Animated Beam](#10-animated-beam) | diagram | Magic UI `AnimatedBeam` | all modes |

---

## 1. Hero Text Reveal

**What it does:** A headline appears one word (or character) at a time, with each piece springing up from below.

### Next.js / Motion Primitives

```tsx
// pnpm dlx shadcn@latest add "https://motion-primitives.com/c/text-effect.json"
import { TextEffect } from "@/components/ui/text-effect";

export function Hero() {
  return (
    <TextEffect per="word" preset="slide" delay={0.2}>
      Animations that direct attention.
    </TextEffect>
  );
}
```

### Single-file HTML — handwritten Motion

```html
<h1 class="hero" aria-label="Animations that direct attention.">
  <span>Animations</span> <span>that</span> <span>direct</span> <span>attention.</span>
</h1>

<style>
  .hero span {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 500ms cubic-bezier(0.34, 1.56, 0.64, 1),
                transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .hero.visible span { opacity: 1; transform: translateY(0); }
  .hero.visible span:nth-child(1) { transition-delay: 0ms; }
  .hero.visible span:nth-child(2) { transition-delay: 80ms; }
  .hero.visible span:nth-child(3) { transition-delay: 160ms; }
  .hero.visible span:nth-child(4) { transition-delay: 240ms; }

  @media (prefers-reduced-motion: reduce) {
    .hero span { opacity: 1; transform: none; transition: none; }
  }
</style>

<script>
  const hero = document.querySelector(".hero");
  new IntersectionObserver(([e]) => e.isIntersecting && hero.classList.add("visible"),
    { threshold: 0.4 }).observe(hero);
</script>
```

**Tuning:** stagger 80ms feels tight and confident. 120ms feels reverent. > 160ms feels slow.

---

## 2. Number Ticker

**What it does:** Counter springs from 0 to final value when entering viewport. Canonical KPI element.

### Next.js / Magic UI

```tsx
// pnpm dlx shadcn@latest add "https://magicui.design/r/number-ticker.json"
import { NumberTicker } from "@/components/ui/number-ticker";

export function StatTile() {
  return (
    <div className="rounded-2xl border bg-surface p-8">
      <NumberTicker value={5000} className="text-8xl font-medium tracking-tighter" />
      <p className="text-sm text-muted">Professionals trained</p>
    </div>
  );
}
```

### Next.js — handwritten with Motion useSpring

```tsx
import { motion, useSpring, useTransform } from "motion/react";

export function NumberFlow({ to, suffix = "" }: { to: number; suffix?: string }) {
  const v = useSpring(0, { duration: 1.2, bounce: 0 });
  const display = useTransform(v, (n) => Math.round(n).toLocaleString() + suffix);
  return <motion.span onViewportEnter={() => v.set(to)}>{display}</motion.span>;
}
```

### Single-file HTML

```html
<span class="num" data-to="5000">0</span>

<script>
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function tickerToValue(el) {
    const to = +el.dataset.to;
    const dur = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(easeOutCubic(p) * to).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  new IntersectionObserver((entries) => entries.forEach(e => {
    if (e.isIntersecting) { tickerToValue(e.target); observer.unobserve(e.target); }
  })).observe(document.querySelector(".num"));
</script>
```

**Tuning:** duration 1.2s + easeOutCubic feels like an odometer. Use `duration: 0` for instant if `prefers-reduced-motion`.

---

## 3. Bento Grid

**What it does:** Apple-style asymmetric tile grid. Use for dashboard landing pages and module overviews.

### Next.js / Magic UI

```tsx
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  { name: "AI input", className: "col-span-3 lg:col-span-1", Icon: SparklesIcon, description: "Chat with state-aware micro-animations.", href: "/ai-input", cta: "Open" },
  { name: "Animated beams", className: "col-span-3 lg:col-span-2", Icon: WavesIcon, description: "Light traveling between any two refs.", href: "/animated-beam", cta: "Open" },
  // ... more
];

export function Overview() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((f) => <BentoCard key={f.name} {...f} />)}
    </BentoGrid>
  );
}
```

### Single-file HTML

```html
<section class="bento">
  <article class="tile span-2"><h3>Title</h3><p>Body</p></article>
  <article class="tile"><h3>...</h3></article>
  <article class="tile"><h3>...</h3></article>
  <article class="tile span-2 row-2"><h3>...</h3></article>
</section>

<style>
  .bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(180px, auto);
    gap: var(--space-4);
  }
  .tile {
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: transform 300ms var(--ease-spring), box-shadow 300ms var(--ease-out);
  }
  .tile:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
  .span-2 { grid-column: span 2; }
  .row-2 { grid-row: span 2; }

  @media (max-width: 768px) {
    .bento { grid-template-columns: 1fr; }
    .span-2, .row-2 { grid-column: auto; grid-row: auto; }
  }
</style>
```

**Tuning:** prefer 3-column desktop, asymmetric (1+2 or 2+1 mix), 1-column mobile. Don't go beyond 6 tiles per grid — it stops feeling curated.

---

## 4. Magic Card + Border Beam

**What it does:** A card with a soft glow that follows the cursor, plus an optional traveling border-beam highlight.

### Next.js / Magic UI

```tsx
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";

export function FeaturedCard() {
  return (
    <MagicCard className="relative rounded-2xl p-8" gradientColor="#D94F30">
      <BorderBeam size={250} duration={12} delay={9} />
      <h3 className="text-2xl font-display">Module 03 — Hooks</h3>
      <p className="text-muted">8 lessons · 42 min</p>
    </MagicCard>
  );
}
```

### Single-file HTML — radial gradient that follows the cursor

```html
<article class="magic-card">
  <h3>Module 03 — Hooks</h3>
</article>

<style>
  .magic-card {
    position: relative;
    padding: var(--space-8);
    border-radius: var(--radius-lg);
    background:
      radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%),
        rgba(217, 79, 48, 0.08), transparent 40%),
      var(--color-surface);
    border: 1px solid var(--color-border);
    transition: border-color 300ms;
  }
  .magic-card:hover { border-color: var(--color-accent-muted); }
</style>

<script>
  document.querySelectorAll(".magic-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
</script>
```

**Tuning:** use the accent color at 6–10% opacity. Heavier gradients break warm-cream palette cohesion.

---

## 5. Hero Parallax

**What it does:** Multiple rows of cards translate at different speeds as the page scrolls. Aceternity's most iconic component.

### Next.js / Aceternity

```tsx
import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  { title: "Module 1 — Intro to Agents", link: "/modules/1", thumbnail: "/thumbs/m1.png" },
  // ... 12–18 items, typically arranged in 3 rows
];

export default function Course() {
  return <HeroParallax products={products} />;
}
```

### Notes for single-file HTML port
Aceternity's HeroParallax pulls in framer-motion's `useScroll` + `useTransform`. The single-file port writes three rows with `transform: translate3d(var(--scroll-x), 0, 0)` and updates `--scroll-x` via a passive scroll listener. Reduce row count to 2 if the bundle budget is tight.

**Tuning:** odd rows scroll right→left, even rows scroll left→right. Speeds: 1.0, -0.8, 1.2.

---

## 6. Sticky Scroll Reveal

**What it does:** A pinned section pairs each piece of text with a swapped visual. As the user scrolls, the text progresses and the visual fades to the next state.

### Next.js / Aceternity

```tsx
import { StickyScroll } from "@/components/ui/sticky-scroll";

const content = [
  { title: "Step 1 — Ingest", description: "...", content: <img src="/step1.png" /> },
  { title: "Step 2 — Embed",  description: "...", content: <img src="/step2.png" /> },
  { title: "Step 3 — Retrieve", description: "...", content: <Visualization /> },
];

export default () => <StickyScroll content={content} />;
```

### Vanilla / GSAP pinned section

```js
gsap.registerPlugin(ScrollTrigger);

const steps = gsap.utils.toArray(".step");
ScrollTrigger.create({
  trigger: ".story",
  start: "top top",
  end: "+=3000",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    const i = Math.floor(self.progress * steps.length);
    steps.forEach((s, j) => s.classList.toggle("active", i === j));
  }
});
```

**Tuning:** 3 steps is the sweet spot. 5+ becomes exhausting. Always provide a non-scroll fallback (clickable step list) for accessibility.

---

## 7. 3D Tilt Card

**What it does:** Card tilts in 3D space toward the cursor with subtle perspective.

### Next.js / Motion Primitives

```tsx
import { Tilt } from "@/components/ui/tilt";

export function ModuleTile() {
  return (
    <Tilt rotationFactor={8} springOptions={{ duration: 0.6, bounce: 0.2 }}>
      <div className="rounded-2xl bg-surface p-8 shadow-lg">
        <h3>Module 02 — State</h3>
      </div>
    </Tilt>
  );
}
```

### Single-file HTML

```html
<article class="tilt-card"><h3>Module 02</h3></article>

<style>
  .tilt-card {
    transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform;
  }
</style>

<script>
  document.querySelectorAll(".tilt-card").forEach((c) => {
    c.addEventListener("mousemove", (e) => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty("--ry", `${x * 16}deg`);
      c.style.setProperty("--rx", `${-y * 16}deg`);
    });
    c.addEventListener("mouseleave", () => {
      c.style.setProperty("--ry", "0deg");
      c.style.setProperty("--rx", "0deg");
    });
  });
</script>
```

**Tuning:** max rotation 8–16°. Beyond 20° starts looking gimmicky. Always disable on touch devices.

---

## 8. Magnetic Button

**What it does:** Button pulls slightly toward the cursor when nearby, with a satisfying spring back.

### Next.js / SmoothUI

```tsx
import { MagneticButton } from "@/components/smoothui/magnetic-button";

export function CTA() {
  return (
    <MagneticButton springConfig={{ duration: 0.6, bounce: 0.2 }} strength={25}>
      Start Course
    </MagneticButton>
  );
}
```

### Single-file HTML (uses Motion via esm.sh OR pure CSS+JS)

```html
<button class="magnetic">Start Course</button>

<style>
  .magnetic {
    padding: 1rem 2rem;
    border-radius: 9999px;
    background: var(--color-accent);
    color: white;
    border: none;
    cursor: pointer;
    transform: translate3d(var(--mx, 0), var(--my, 0), 0);
    transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
</style>

<script>
  const strength = 25;
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / strength;
      const y = (e.clientY - (r.top + r.height / 2)) / strength;
      btn.style.setProperty("--mx", `${x}px`);
      btn.style.setProperty("--my", `${y}px`);
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.setProperty("--mx", "0px");
      btn.style.setProperty("--my", "0px");
    });
  });
</script>
```

**Tuning:** `strength: 25` is SmoothUI's house number. Lower (= more magnetism) feels playful; higher feels subtle. Pair with a slight scale on hover (`scale(1.04)`).

---

## 9. Dynamic Island

**What it does:** Apple-style pill that expands to show transient content (notification, progress, status).

### Next.js / SmoothUI

```tsx
import { DynamicIsland } from "@/components/smoothui/dynamic-island";
import { useState } from "react";

export function StatusBar() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  return (
    <DynamicIsland state={state}>
      {state === "loading" && <span>Compiling course…</span>}
      {state === "success" && <span>Module 3 ready</span>}
    </DynamicIsland>
  );
}
```

**Tuning:** spring `{ duration: 0.5, bounce: 0.35 }` — slightly bouncier than house default. Auto-collapse after 3.5s for transient notifications.

---

## 10. Animated Beam

**What it does:** A glowing light beam travels along a curved path between two DOM refs — perfect for system architecture diagrams in course modules.

### Next.js / Magic UI

```tsx
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useRef } from "react";

export function Architecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative flex items-center justify-between p-8">
      <div ref={fromRef} className="size-12 rounded-full bg-accent" />
      <div ref={toRef} className="size-12 rounded-full bg-info" />
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} duration={3} />
    </div>
  );
}
```

**Tuning:** duration 3s for course storytelling. 1.5s for dense dashboard architecture. Always use accent colors that match the connected nodes.

---

## What's NOT in v1 (saved for v2)

Promoted to v2 (`component-catalog-v2.md`):
11. Siri Orb (SmoothUI)
12. AI Input (SmoothUI)
13. Animated Background — Gradient/Stars/Hexagon (Animate UI)
14. MacBook Scroll (Aceternity)
15. Liquid Button (Animate UI)
16. Morphing Dialog (Motion Primitives)
17. Progressive Blur (Motion Primitives)
18. Animated Circular Progress (Magic UI)
19. Animated Timeline (Animata)
20. Marquee (Kibo UI)
