---
name: shadcn-motion
description: "Use when generating WOW-level animated components for course pages, dashboards, hero sections, product landing pages, or technical demos. Triggers on 'animated component', 'make this WOW', 'add animation', 'magnetic button', 'number ticker / number flow', 'bento grid', 'hero text reveal', 'hero parallax', 'sticky scroll', 'animated beam', 'dynamic island', '3D tilt card', 'border beam', 'shadcn animations', 'smoothui style', 'aceternity style', 'magic UI', 'motion primitives', 'react bits', 'animate UI', 'cult UI', 'animated dashboard widget', 'scroll storytelling', 'KPI counter', 'animated background', 'interactive experience'. Also use when extending the codebase-to-course design system with motion, building interactive course tutorials beyond single-page HTML, or producing dashboard widgets with data-viz motion. Hybrid shadcn structure + smoothui motion vocabulary."
---

# shadcn-motion

Generate beautiful, interactive, WOW-level animated components for course materials, dashboards, hero pages, and technical demos. Hybrid aesthetic: **shadcn/ui structure + smoothui motion vocabulary**.

## Core principle

> Motion serves comprehension. WOW is what happens when motion makes something *feel inevitable*, not flashy.

Every animation must justify itself by one of: (a) directing attention to the next concept, (b) providing tactile feedback for an interaction, (c) revealing structure that static layouts can't show. If it does none of those, cut it.

## When to use this skill

**Triggering symptoms:**
- "Make this page WOW", "add animations", "make this interactive"
- "Animate this number / counter / KPI / chart"
- "Hero needs to feel cinematic / premium"
- "Add scroll storytelling" or "scroll-driven reveals"
- "Dashboard tile / card needs personality"
- User mentions any of: smoothui, aceternity, magic UI, motion primitives, framer motion, motion.dev, cult UI, react bits, animate UI, kibo UI
- Building course pages where modules need narrative motion (the "interactive experience" tier above static HTML)

**Skip this skill when:**
- User wants static prose / docs / cheat sheets → use other content skills
- User wants a *generic* component (basic button, plain card) → shadcn primitives are enough; no motion needed
- The output is text-only (markdown, PDF) → motion doesn't translate

## Output modes

Pick the mode that matches the deliverable. Each mode has a dedicated reference in `modes/`.

| Mode | When | Output |
|---|---|---|
| `component-snippet` | Next.js / React project, copy-paste ready | One or more `.tsx` files |
| `single-file-html` | Course page / proposal / standalone artifact, no build step | One `.html` (≤ 80KB) with inline CSS+JS, CDN Motion |
| `dashboard-widget` | Data-viz tile (KPI, sparkline, animated chart) | Self-contained `.tsx` or HTML fragment |
| `interactive-experience` | Multi-section interactive course tutorial — next evolution above codebase-to-course | Directory: `index.html` + section partials + shared assets |
| `landing-page` | Hero-driven marketing/proposal page | Single `.html` or `.tsx` page |

**Mode selection flow:**

```
Is the deliverable interactive AND multi-section AND course-like?
  → interactive-experience
Is there a Next.js project in cwd / user mentions Next or React?
  → component-snippet
Is the output one page meant to wow visitors?
  → landing-page
Is the output one tile/widget in a larger dashboard?
  → dashboard-widget
Otherwise (course page, proposal, sharable artifact):
  → single-file-html
```

## Library decision

For any component you need, prefer in this order:

1. **CDN-portable Motion patterns first** (re-implementable in single-file HTML). See `references/component-catalog-v1.md`.
2. **shadcn registry components** (Magic UI, Motion Primitives, Animate UI, SmoothUI, Kibo UI, React Bits) when shipping into a Next.js project.
3. **GSAP+ScrollTrigger** for scroll-scrubbed timelines or pinned narratives (now 100% free as of 2026 — Webflow acquired GreenSock).
4. **Lottie** (via `@lottiefiles/dotlottie-react`) only for designer-authored vector illustrations.
5. **View Transitions API** for page-to-page or tab-swap morphs (Baseline as of Oct 2025).

Full library map: `references/library-index.md`. Top-10 catalog with real code: `references/component-catalog-v1.md`.

## Motion vocabulary (the smoothui anchor)

The house style. Use these defaults unless a specific design calls for something else.

- **Engine import**: `import { motion } from "motion/react"` (NOT `framer-motion`).
- **Spring**: `{ duration: 0.5, bounce: 0.25 }` (SmoothUI house spring). Bounce 0.2–0.3 is perceptible but never toy-like.
- **Easing tokens** (extends codebase-to-course): `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`.
- **Durations**: 150ms (micro), 300ms (normal), 500ms (slow), 700ms (deliberate).
- **Stagger**: 60–120ms; prefer single-element springs over heavy stagger chains.
- **Always**: respect `prefers-reduced-motion` — every reveal has a fallback that just shows the final state.

Full details: `references/motion-vocabulary.md`.

## Anti-slop rules (extends codebase-to-course)

These are absolute. If your output contains any of these, it is wrong and you must fix it before shipping.

- ❌ Purple/pink gradient hero backgrounds (the SaaS-tutorial cliché)
- ❌ Glassmorphism without intent (frosted blur as default)
- ❌ Emoji spam in headings or as visual elements
- ❌ Stock isometric illustrations
- ❌ Generic icon-card feature grids ("Fast 🚀 / Secure 🔒 / Scalable 📈")
- ❌ Continuous looping background animations that don't pause on `prefers-reduced-motion`
- ❌ Animations longer than 1.2s (kills perceived performance)
- ❌ Hover animations on touch-only devices
- ❌ `framer-motion` import when `motion/react` is correct (these are NOT the same package)
- ❌ Mixing `framer-motion` and `motion/react` in one project (doubles bundle)

Full list: `references/anti-slop.md`.

## File map

```
shadcn-motion/
├── SKILL.md                              ← you are here
├── references/
│   ├── library-index.md                  ← 10 libraries → which to use when
│   ├── component-catalog-v1.md           ← top 10 components, real code
│   ├── component-catalog-v2.md           ← extended 20 for richer outputs
│   ├── motion-vocabulary.md              ← timing, easing, choreography
│   └── anti-slop.md                      ← forbidden patterns
├── modes/
│   ├── component-snippet.md              ← Next.js tsx mode
│   ├── single-file-html.md               ← CDN Motion mode
│   ├── dashboard-widget.md               ← data-viz mode
│   ├── interactive-experience.md         ← multi-section course mode
│   └── landing-page.md                   ← hero-driven page mode
└── examples/
    └── hero-reveal-singlefile.html       ← canonical single-file example
```

## Quick reference

**Hero text reveal** → `single-file-html` mode + Motion `whileInView` + char/word stagger. See `references/component-catalog-v1.md#hero-text-reveal`.

**KPI counter** → Motion `useSpring` bound to `useMotionValue`; for single-file HTML, write a 30-line vanilla counter with `requestAnimationFrame` + easing. See `references/component-catalog-v1.md#number-ticker`.

**Bento dashboard tiles** → CSS grid with asymmetric spans + Magic Card border-beam edges + `whileHover` lift. See `references/component-catalog-v1.md#bento-grid`.

**Scroll-driven story** → GSAP ScrollTrigger pinned section with scrubbed timeline. For lighter touch, Motion `useScroll + useTransform`. See `references/component-catalog-v1.md#sticky-scroll-reveal`.

**Magnetic button** → SmoothUI spring: `{ duration: 0.6, bounce: 0.2 }`. Cursor proximity → translate. See `references/component-catalog-v1.md#magnetic-button`.

## Cross-references

This skill extends the codebase-to-course design system (`~/.claude/skills/codebase-to-course/references/`). **DO NOT** fork or duplicate that design system — import its tokens (`--color-*`, `--space-*`, `--ease-*`, fonts) and add only the motion-specific additions documented in `references/motion-vocabulary.md`.

For batch course-page generation, prefer **codebase-to-course** when the deliverable is the document; use **shadcn-motion** when the deliverable is the *experience*.
