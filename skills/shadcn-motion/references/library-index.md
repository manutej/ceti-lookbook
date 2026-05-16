# Library Index

Quick map: which library for which job. **Verified 2026 status — package names, licenses, and bundle costs are current.**

## At a glance

| Library | Stars | License | Best for | Engine | Install |
|---|---|---|---|---|---|
| **Motion.dev** | 31.9k | MIT | All motion (engine layer) | self | `npm i motion`, `motion/react` |
| **SmoothUI** | 790 | MIT | Dashboard widgets, micro-interactions | motion | `npx smoothui-cli add <c>` or shadcn registry |
| **Magic UI** | 21k | MIT | Cards, counters, beams, bento grids | motion | `npx shadcn add @magicui/<c>` |
| **Aceternity UI** | — | Free (Pro paid) | Cinematic hero, parallax, 3D | framer-motion | `npx shadcn add @aceternity/<c>-demo` |
| **Motion Primitives** | 5.5k | MIT | Text reveals, scroll storytelling | motion | `npx shadcn add "https://motion-primitives.com/c/<c>.json"` |
| **Animate UI** | 3.6k | MIT | Animated backgrounds, buttons, code blocks | motion | `npx shadcn add "https://animate-ui.com/r/<c>.json"` |
| **Cult UI** | 4.4k | MIT | Texture cards, Dynamic Island, shaders | framer-motion ⚠️ | `npx shadcn add @cult/<c>` |
| **React Bits** | 39.5k | MIT + Commons Clause | Kinetic typography, WebGL backgrounds | motion + gsap + three | `npx shadcn add @react-bits/<c>-TS-TW` |
| **Animata** | 2.6k | MIT | Tailwind-native micro-interactions, timeline, dock | motion (optional) | copy-paste only |
| **Kibo UI** | 3.8k | MIT | Productivity blocks: Gantt, Kanban, Marquee, Contribution Graph | restrained / CSS | `npx kibo-ui add <c>` |

## ⚠️ Critical compatibility rules

1. **Pick ONE motion engine per project.** `motion` (motion.dev) and `framer-motion` are different packages now — mixing doubles your bundle. Default to `motion/react`. The only libraries that still ship `framer-motion`: **Cult UI** and **Aceternity** (some components). When pulling from those, port to `motion/react` or accept the bundle cost.

2. **Lenis package renamed.** Use `lenis` and `lenis/react`. The old `@studio-freight/lenis` and `@studio-freight/react-lenis` are deprecated.

3. **Use `@lottiefiles/dotlottie-react` not `lottie-react`.** WASM runtime, smaller `.lottie` files (60–80% lighter than `.json`).

4. **GSAP is 100% FREE as of 2026.** Webflow acquired GreenSock; all formerly-paid plugins (SplitText, MorphSVG, ScrollSmoother, DrawSVG, MotionPath) are now free under the standard license.

5. **View Transitions API is Baseline (Oct 2025) for same-document.** Cross-document: Chrome 126+, Safari 18.2+, Firefox pending 2026.

## When to reach for which library

### Need a hero that reveals text dramatically
1. **Motion Primitives `TextEffect`** — per-char/word reveal, drop-in for shadcn projects
2. **React Bits `SplitText` / `BlurText`** — heavier, GSAP-backed, more cinematic
3. **GSAP SplitText** directly — for full control / single-file HTML

### Need a multi-row scroll-parallax landing hero
1. **Aceternity `HeroParallax`** — gold standard, ships fast
2. **Custom Motion `useScroll + useTransform`** — when you need control

### Need a counter that animates from N → M
1. **Magic UI `NumberTicker`** — drop-in for Next.js
2. **SmoothUI `NumberFlow` / `PriceFlow`** — odometer style (best for pricing)
3. **Motion `useSpring`** binding — for single-file HTML, hand-write 30 lines

### Need a dashboard grid of tiles
1. **Magic UI `BentoGrid`** — Apple-asymmetric layout
2. **Compose** with `MagicCard` (Magic UI) + `BorderBeam` (Magic UI) for premium tile edges

### Need a CTA that feels tactile
1. **SmoothUI `MagneticButton`** — house spring `{ duration: 0.6, bounce: 0.2 }`
2. **Animate UI `LiquidButton` / `RippleButton`** — tactile alternatives
3. **Motion Primitives `Magnetic`** — composable wrapper around any element

### Need a "live status" pill
1. **SmoothUI `DynamicIsland`** — Apple-style expand/collapse
2. **Cult UI `DynamicIsland`** — heavier with shader background option

### Need scroll-driven storytelling for a course module
1. **GSAP ScrollTrigger** with `pin: true, scrub: true` — pinned multi-step narrative
2. **Motion Primitives `InView` + `ScrollProgress` + `ProgressiveBlur`** — composable scroll triple
3. **Aceternity `StickyScrollReveal`** — drop-in pair of (text, visual) scrolled together

### Need a system architecture / data-flow diagram with motion
1. **Magic UI `AnimatedBeam`** — light beam between two refs
2. **Lottie** (designer-authored `.lottie`) — for hand-drawn vector flows

### Need a dashboard timeline / Gantt
1. **Kibo UI `Gantt`** — drag/resize, dnd-kit + date-fns
2. **Animata `AnimatedTimeline`** — vertical Framer-Motion narrative

### Need a contribution-graph-style heatmap
1. **Kibo UI `ContributionGraph`** — GitHub-style
2. **SmoothUI `ContributionGraph`** — alternative with springs

### Need a marquee logo strip
1. **Kibo UI `Marquee`** — `react-fast-marquee`-backed

### Need an animated background section
1. **Animate UI `Gradient` / `Stars` / `Hexagon` / `Hole` / `Fireworks`** — full-section grounds
2. **Aceternity `BackgroundBeams` / `BackgroundGradientAnimation`** — heavier
3. **React Bits `Aurora` / `Iridescence` / `Silk`** — WebGL (code-split, GPU-gated)

### Need a multi-state Lottie illustration
1. **`@lottiefiles/dotlottie-react`** — `<DotLottieReact src="/anim.lottie" autoplay loop />`
2. Gate behind viewport entry + `prefers-reduced-motion`

### Need page-to-page or tab-swap morph
1. **View Transitions API** — zero JS, `document.startViewTransition()` + `view-transition-name`
2. **React 19+** has `<ViewTransition>` built-in
