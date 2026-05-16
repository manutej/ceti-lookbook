---
description: Invoke the shadcn-motion skill with an explicit mode for course pages, dashboards, hero sections, and interactive experiences
---

# /shadcn-motion

Invoke the **shadcn-motion** skill with an explicit output mode. Produces beautiful, interactive, WOW-level animated components in the hybrid shadcn+smoothui aesthetic.

## Usage

```
/shadcn-motion <mode> <description>
```

If you omit the mode, the skill will infer it from the description.

## Modes

| Mode | Use when | Output |
|---|---|---|
| `component-snippet` | You have a Next.js / React project, want copy-paste tsx | `.tsx` file(s) |
| `single-file-html` | Course page, proposal, or sharable artifact with no build step | One self-contained `.html` (≤ 80KB) |
| `dashboard-widget` | Animated KPI tile, sparkline, progress ring, activity feed | Self-contained widget |
| `interactive-experience` | Multi-section scroll-orchestrated course tutorial — next evolution above static HTML | Directory: shell + sections + assets |
| `landing-page` | Hero-driven marketing or proposal page | Single page (HTML or tsx) |

## Examples

```
/shadcn-motion landing-page A pitch page for our enterprise AI training
/shadcn-motion dashboard-widget A KPI tile showing weekly active users with a sparkline
/shadcn-motion interactive-experience How a RAG pipeline works, 5 sections
/shadcn-motion single-file-html Hero with magnetic CTA, animated stats row, and a bento grid
/shadcn-motion component-snippet A magnetic button I can drop into my Next.js app
```

## What the skill brings

- **v1 catalog of 10 components**: Hero Text Reveal, Number Ticker, Bento Grid, Magic Card + Border Beam, Hero Parallax, Sticky Scroll Reveal, 3D Tilt Card, Magnetic Button, Dynamic Island, Animated Beam
- **v2 catalog of 10 more** for richer outputs: Siri Orb, AI Input, Animated Backgrounds, MacBook Scroll, Liquid Button, Morphing Dialog, Progressive Blur, Animated Circular Progress, Animated Timeline, Marquee
- **Coverage of 10 libraries**: Motion.dev, Magic UI, Aceternity UI, SmoothUI, Motion Primitives, Animate UI, Cult UI, React Bits, Animata, Kibo UI
- **Coverage of 4 engines**: GSAP + ScrollTrigger (now 100% free), Lenis, Lottie (dotlottie-react), View Transitions API
- **Motion vocabulary** anchored in SmoothUI: `{ duration: 0.5, bounce: 0.25 }` house spring; preference for single-element springs over heavy stagger
- **Anti-slop enforcement**: forbidden patterns checked on every output (no purple gradients, no glassmorphism default, no emoji in headings, no animations > 1.2s, no mixed motion engines)
- **Accessibility-first**: `prefers-reduced-motion`, `viewport={{ once: true }}`, WCAG AA contrast, touch-device hover guards

## Composition with codebase-to-course

`shadcn-motion` extends — never duplicates — the codebase-to-course design system. When the deliverable is the *document*, use codebase-to-course. When it's the *experience*, use shadcn-motion (especially `interactive-experience` mode).
