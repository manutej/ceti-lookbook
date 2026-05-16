# Mode: single-file-html

Produces ONE `.html` file, ≤ 80KB, fully self-contained except for Google Fonts and (optionally) Motion via ESM CDN.

## When to use

- Course pages and proposal pages with WOW animations
- Shareable artifacts (links, attachments) where the receiver opens the file directly
- Outputs that extend the codebase-to-course aesthetic with motion
- Anywhere a build step would be friction

## Skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Page Title}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <style>
    /* Tokens from codebase-to-course/references/design-system.md */
    :root {
      --color-bg: #FAF7F2; --color-bg-warm: #F5F0E8;
      --color-text: #2C2A28; --color-text-secondary: #6B6560; --color-text-muted: #9E9790;
      --color-border: #E5DFD6; --color-surface: #FFFFFF;
      --color-accent: #D94F30; --color-accent-muted: #E8836C; --color-accent-light: #FDEEE9;

      --font-display: 'Bricolage Grotesque', Georgia, serif;
      --font-body:    'DM Sans', -apple-system, sans-serif;
      --font-mono:    'JetBrains Mono', monospace;

      --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

      --duration-fast: 150ms; --duration-normal: 300ms; --duration-slow: 500ms; --duration-slower: 700ms;
      --stagger-normal: 120ms;
    }

    body {
      margin: 0;
      font-family: var(--font-body);
      color: var(--color-text);
      background: var(--color-bg);
      line-height: 1.6;
    }

    /* Reveal pattern (from codebase-to-course) */
    .animate-in { opacity: 0; transform: translateY(20px); transition: opacity var(--duration-slower) var(--ease-spring), transform var(--duration-slower) var(--ease-spring); }
    .animate-in.visible { opacity: 1; transform: translateY(0); }
    .stagger > .animate-in { transition-delay: calc(var(--i, 0) * var(--stagger-normal)); }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
      .animate-in { opacity: 1 !important; transform: none !important; }
    }

    /* Component-specific styles here (Magic Card, Magnetic Button, etc.) */
  </style>
</head>
<body>
  <!-- content goes here -->

  <script type="module">
    // OPTIONAL: import Motion only if needed for advanced animations
    // import { animate, scroll } from "https://esm.sh/motion@latest";

    // Stagger setup
    document.querySelectorAll(".stagger").forEach((p) =>
      [...p.children].forEach((c, i) => c.style.setProperty("--i", i))
    );

    // Reveal on viewport entry
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    document.querySelectorAll(".animate-in").forEach((el) => io.observe(el));
  </script>
</body>
</html>
```

## When to include Motion via ESM CDN

Default to vanilla CSS + JS. Only pull Motion when you need:

- `useSpring` for non-trivial numeric easing (you can also hand-write with `easeOutCubic`)
- Layout animations (FLIP) — these are painful to write by hand
- Gesture-driven motion that responds to drag/pan

CDN import:

```html
<script type="module">
  import { animate, scroll, inView, spring } from "https://esm.sh/motion@latest";

  inView(".kpi", (el) => {
    animate(el, { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, easing: spring({ duration: 0.5, bounce: 0.25 }) });
  });
</script>
```

## File size budget

- Total HTML file: **≤ 80KB**
- Inline `<style>`: ≤ 40KB
- Inline `<script>`: ≤ 20KB
- Inline SVGs/data-URIs: ≤ 20KB combined

If you exceed these, you've over-built. Either prune animations or switch to `component-snippet` mode.

## Porting recipe (from React/Motion → single-file)

| React/Motion | Single-file HTML |
|---|---|
| `<motion.div initial={..} animate={..}>` | `.animate-in` class + `.visible` toggle on IO entry |
| `<motion.div whileInView={..}>` | Same — IntersectionObserver triggers `.visible` |
| `useSpring` with numeric | `requestAnimationFrame` + `easeOutCubic` loop |
| `useScroll + useTransform` | passive `scroll` listener → set CSS variable → use in `transform` |
| `AnimatePresence` (exit anim) | CSS class toggle + `transitionend` cleanup |
| `staggerChildren` variant | `[...children].forEach((c,i) => c.style.setProperty("--i", i))` |
| `<MotionConfig reducedMotion="user">` | `@media (prefers-reduced-motion: reduce)` CSS block |

## Hard rules

- Single HTML file. No `<link rel="stylesheet" href="*.css">` to local files. No `<script src="*.js">` to local files.
- External: Google Fonts CDN OK. esm.sh Motion CDN OK. GSAP CDN OK.
- No `npm install`, no `pnpm`, no build step. The receiver opens the file in a browser.
- Anti-slop checklist (`references/anti-slop.md`) must pass.
