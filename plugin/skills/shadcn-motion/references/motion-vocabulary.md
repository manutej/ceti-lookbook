# Motion Vocabulary

The house motion language. Anchored in **SmoothUI** patterns (the user's stated inspiration) and extending the **codebase-to-course** design system tokens.

> **Single source of truth for design tokens:** `~/.claude/skills/codebase-to-course/references/design-system.md`.
> This file adds motion-specific tokens only.

## Core spring

Almost every animation in this skill family uses one spring:

```ts
// Motion (motion.dev) — the modern API
const houseSpring = { duration: 0.5, bounce: 0.25 };

// Use it for almost everything:
<motion.div transition={houseSpring} animate={{ y: 0 }} initial={{ y: 20 }} />
```

**Why this spring?**
- `bounce: 0.25` → perceptible character without feeling toy-like (SmoothUI house default)
- `duration: 0.5` → fast enough not to feel sluggish, slow enough to read

**When to deviate:**
- Magnetic/hover springs → `{ duration: 0.6, bounce: 0.2 }` (slightly slower, less bounce)
- Page entry / large layout → `{ duration: 0.7, bounce: 0.3 }`
- Micro-feedback (button press) → `{ duration: 0.2, bounce: 0 }` (snap)

## Easing tokens (CSS-side)

Extends codebase-to-course tokens with motion-specific additions:

```css
:root {
  /* From codebase-to-course (DO NOT redefine — import) */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* shadcn-motion additions */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* approximates Motion's bounce:0.25 */
  --ease-snap:   cubic-bezier(0.4, 0, 0.2, 1);       /* tactile feedback */
  --ease-decel:  cubic-bezier(0, 0, 0.2, 1);         /* arrives at rest, no bounce */
}
```

## Duration scale

```css
:root {
  --duration-instant: 100ms;   /* hover state change */
  --duration-fast:    150ms;   /* from codebase-to-course */
  --duration-normal:  300ms;   /* from codebase-to-course */
  --duration-slow:    500ms;   /* from codebase-to-course (house default) */
  --duration-slower:  700ms;   /* deliberate entry */
  --duration-still:   1200ms;  /* hard ceiling — anything longer hurts perceived perf */
}
```

**Rule**: never exceed `--duration-still` (1.2s) for a single discrete animation. Loops and scroll-scrubbed timelines are exempt because the user controls their duration.

## Stagger

```css
:root {
  --stagger-tight:  60ms;
  --stagger-normal: 120ms;   /* from codebase-to-course */
  --stagger-relaxed: 180ms;
}
```

**Stagger budget**: a stagger chain should complete in ≤ 800ms. If you have 10 items and `--stagger-normal`, that's already 1.2s — use `--stagger-tight` or reduce visible items.

**SmoothUI guidance**: prefer single-element springs over heavy stagger chains. If you stagger more than 5 items, ask whether you really need to.

## Choreography patterns

### 1. Enter from below (the canonical reveal)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.5, bounce: 0.25 }}
/>
```

`once: true` prevents re-animation on scroll-back. `margin: "-10%"` triggers slightly before the element fully enters viewport.

### 2. Stagger children

```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, bounce: 0.25 } }
      }}
    />
  ))}
</motion.div>
```

### 3. Magnetic / cursor-following

```jsx
function Magnetic({ children, strength = 25 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { duration: 0.6, bounce: 0.2 });
  const springY = useSpring(y, { duration: 0.6, bounce: 0.2 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) / strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) / strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
```

### 4. Number animation via spring

```jsx
function NumberFlow({ to }) {
  const v = useSpring(0, { duration: 1.2, bounce: 0 });
  const display = useTransform(v, (n) => Math.round(n).toLocaleString());

  return (
    <motion.span
      onViewportEnter={() => v.set(to)}
    >
      {display}
    </motion.span>
  );
}
```

### 5. Scroll-bound transform

```jsx
function ParallaxText() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  return <motion.h1 style={{ y }}>title</motion.h1>;
}
```

## prefers-reduced-motion (mandatory)

Every animation must have a reduced-motion fallback that shows the **final state** instantly. Motion respects `prefers-reduced-motion: reduce` automatically via `MotionConfig`:

```jsx
import { MotionConfig } from "motion/react";

<MotionConfig reducedMotion="user">
  {/* your app */}
</MotionConfig>
```

For CSS-only / single-file HTML:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .animate-in { opacity: 1 !important; transform: none !important; }
}
```

## Composition with engines

| If you're using | Then |
|---|---|
| Motion + GSAP in one project | Let GSAP own scroll/timeline. Let Motion own UI micro-interactions. Don't have them animate the same element. |
| Motion + Lenis | Sync them: `gsap.ticker.add(t => lenis.raf(t * 1000))` (Lenis docs show this canonical pattern). |
| Motion + View Transitions | Wrap state changes in `document.startViewTransition()`. Motion handles in-element animations; VT handles cross-element morphs. |
| Lottie + ScrollTrigger | Use ScrollTrigger to drive `lottiePlayer.setFrame(progress * totalFrames)`. |

## Translating from React to single-file HTML

When porting a Motion-based React component to single-file HTML, the cheap recipe:

1. Replace `motion.div initial={..} animate={..}` with a CSS class `.animate-in` that has the initial state and a `.visible` modifier with the animate state. Use `transition: all var(--duration-slow) var(--ease-spring)`.
2. Replace `whileInView` with an `IntersectionObserver` that adds `.visible`.
3. Replace `useSpring` numeric values with a `requestAnimationFrame` loop using a cubic-out easing function.
4. Replace `useScroll + useTransform` with a `scroll` listener (passive) that updates a CSS variable.

The reduced-motion media query handles accessibility for free.

See `modes/single-file-html.md` for the full porting recipe.
