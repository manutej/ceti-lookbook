# Mode: component-snippet

Produces one or more `.tsx` files for a Next.js / React project. Drop-in copy-paste ready.

## When to use

- User has a Next.js / React project (check `package.json` for `react` + `next` or `vite`)
- User explicitly asks for a "component" or "tsx" or "for my Next project"
- Output will live inside an existing codebase

## Assumed stack

- Next.js 14+ (App Router) OR Vite + React 18+
- Tailwind CSS 3+ (4 works too)
- shadcn/ui installed (`components.json` exists)
- `motion` package (NOT `framer-motion`)

If any of these are missing, install commands are part of the output:

```bash
# Tailwind (skip if present)
pnpm dlx tailwindcss init -p

# shadcn (skip if components.json exists)
pnpm dlx shadcn@latest init

# Motion (always required)
pnpm i motion

# Per-component (from research catalog)
pnpm dlx shadcn@latest add "https://magicui.design/r/number-ticker.json"
pnpm dlx shadcn@latest add "https://motion-primitives.com/c/text-effect.json"
```

## Template structure

For a single component:

```
components/
└── ui/
    └── {component-name}.tsx       ← the component
```

For a composed feature:

```
components/
├── ui/
│   ├── magic-card.tsx
│   ├── border-beam.tsx
│   └── number-ticker.tsx
└── features/
    └── stats-section.tsx          ← composes the primitives
```

## Boilerplate per file

```tsx
"use client";  // ALWAYS for Motion components in Next.js App Router

import { motion } from "motion/react";  // NEVER framer-motion
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  // ... component-specific props
}

export function ComponentName({ className, ...props }: Props) {
  return (
    <motion.div
      className={cn("base-classes", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, bounce: 0.25 }}
      {...props}
    />
  );
}
```

## When to use `LazyMotion`

If the project will use Motion in 5+ places and bundle size matters:

```tsx
// app/providers.tsx
"use client";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

Then use `<m.div>` instead of `<motion.div>` in components — they share the API but `m` is tree-shakeable.

## Server-component-safe pattern

When a component must work as an RSC (no `"use client"`), use CSS-only animations from the codebase-to-course style:

```tsx
// No motion library, RSC-safe
export function StatTile({ value, label }: Props) {
  return (
    <div className="rounded-2xl border bg-surface p-8 animate-in">
      <div className="text-8xl font-display">{value}</div>
      <p className="text-muted">{label}</p>
    </div>
  );
}

// In globals.css
.animate-in { opacity: 0; transform: translateY(20px); animation: fade-up 0.7s var(--ease-spring) forwards; }
@keyframes fade-up { to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) { .animate-in { animation: none; opacity: 1; transform: none; } }
```

## Output checklist

- [ ] Every Motion file starts with `"use client"`
- [ ] Imports from `motion/react`, never `framer-motion`
- [ ] Props interface defined (no `any`)
- [ ] `className` prop merges via `cn(...)`
- [ ] `whileInView` always has `viewport={{ once: true }}`
- [ ] Reduced-motion respected (either via MotionConfig or CSS fallback)
- [ ] No `<motion.div>` for purely static content
- [ ] Component is exported (named, not default, for tree-shaking) unless the project convention says default
