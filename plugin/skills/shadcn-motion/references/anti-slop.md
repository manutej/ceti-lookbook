# Anti-Slop

Forbidden patterns. If your output contains any of these, it is wrong. Fix before shipping.

> Extends the anti-slop rules from `~/.claude/skills/codebase-to-course/references/gotchas.md`.

## Visual slop

❌ **Purple/pink gradient hero backgrounds** — the unmistakable SaaS-tutorial cliché. Use the warm cream + accent palette from codebase-to-course.

❌ **Glassmorphism as default** — frosted blur is a tool for one specific moment (a floating nav over a busy background), not a baseline aesthetic.

❌ **Emoji in headings** — "🚀 Features", "⚡ Fast", "🔒 Secure". Use the type system; let the words do the work.

❌ **Emoji as visual elements / replacing real icons** — `<h2>🎯 Goals</h2>` is slop. Use Lucide, Tabler, or hand-drawn SVGs.

❌ **Stock isometric illustrations** — 3/4 perspective stick figures, undraw.co, isomorphic.dev style.

❌ **Generic icon-card feature grids** — three cards with `Fast / Secure / Scalable` and matching cliché icons. If you have 3 features to show, write them as paragraphs or use one bold callout.

❌ **AI/tech-stock photos** — no robot hands, no glowing brain neurons, no purple data streams.

❌ **Pure-black shadows** — always tint shadows toward `rgb(44, 42, 40)` (warm) or the accent color.

## Motion slop

❌ **Continuous looping animations that don't pause on `prefers-reduced-motion`** — every loop must check.

❌ **Animations longer than 1.2s** for a single discrete transition. Loops and scroll-scrubbed timelines are exempt because the user controls duration.

❌ **Hover animations on touch-only devices** — wrap in `@media (hover: hover)`.

❌ **Animating on first paint without `whileInView` or IntersectionObserver** — if the user scrolls past your element while it's still animating from initial state, the WOW is wasted on no one.

❌ **Stagger chains longer than 5 items** — at SmoothUI house `--stagger-normal: 120ms`, that's 600ms. More than 5 items reads as fussy.

❌ **Re-animating on scroll back** — set `viewport={{ once: true }}` in Motion. The first reveal is the moment; subsequent passes should show the final state.

❌ **Bouncy springs on text** — `bounce: 0` for text reveals. Springs on letters look like a toy keyboard.

❌ **3D tilt > 20°** — gimmicky. Cap at 16°.

❌ **Multiple competing scroll-driven effects in one section** — pick one. Parallax + tilt + opacity + scale = chaos.

❌ **Lottie animations > 1MB** for a hero — kills LCP. Use `.lottie` format and 200KB ceiling for above-the-fold.

## Code / structural slop

❌ **`import { motion } from "framer-motion"`** when `motion/react` is correct. These are *different packages*.

❌ **Mixing `framer-motion` and `motion/react`** in one project — doubles the bundle. Pick one (default: `motion/react`).

❌ **Using deprecated `@studio-freight/lenis`** — package was renamed. Use `lenis` and `lenis/react`.

❌ **Using legacy `lottie-react`** when `@lottiefiles/dotlottie-react` exists — 60–80% smaller `.lottie` files, WASM runtime.

❌ **GSAP without registering plugins** — `gsap.registerPlugin(ScrollTrigger)` is required. The error is silent until production.

❌ **Forgetting `"use client"` on Motion components in Next.js App Router** — Motion components are client-only.

❌ **Wrapping every element in `<motion.div>`** — Motion's runtime cost is per-component. Use `LazyMotion + m` for bundle slimming; reach for plain `<div>` when no animation is needed.

❌ **Using View Transitions without feature-detection** — `if (!document.startViewTransition) return fallback();`

❌ **Forgetting accessibility on scroll-jacking** — Lenis hijacks scroll. Always provide a kill-switch path (a query param, a button, OR auto-disable on `prefers-reduced-motion`).

❌ **Setting `view-transition-name` on multiple visible elements** — names must be unique per snapshot. Two visible elements with `view-transition-name: hero` will crash the transition.

## Course-specific slop

❌ **Motion that interrupts reading** — text that animates in *while the user is reading the previous line* is hostile.

❌ **Auto-scrolling away from where the user looked** — a sticky-scroll story that scrolls the page on its own steals control.

❌ **Decorative motion in the middle of a long explanation** — the eye stops at the moving element instead of the content. Use a Lottie/animated diagram at the TOP of a section, not interspersed in prose.

❌ **Counter animations that re-trigger on scroll back** — once a number has been seen, leave it.

## Checklist before shipping

- [ ] No `framer-motion` imports if also using `motion/react`
- [ ] All `whileInView` have `viewport={{ once: true }}`
- [ ] `prefers-reduced-motion: reduce` media query covers all CSS animations
- [ ] No continuous loops without pause logic
- [ ] No hover effects on touch (or wrapped in `@media (hover: hover)`)
- [ ] Lottie files ≤ 200KB above the fold
- [ ] Stagger chains ≤ 5 items
- [ ] No purple/pink gradients
- [ ] No emoji in headings
- [ ] No 3D tilt > 16°
- [ ] No animation > 1.2s for single transitions
- [ ] Accent rotation visible (multiple accent colors in use, not monotone)
- [ ] WCAG AA contrast on all animated text (verify final state, not animating state)
- [ ] Works at 375px mobile
