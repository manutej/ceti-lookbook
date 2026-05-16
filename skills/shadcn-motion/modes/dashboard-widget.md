# Mode: dashboard-widget

Produces a self-contained widget (one file, either `.tsx` or `.html` fragment) for a dashboard. Optimized for data-viz motion.

## When to use

- User asks for a "KPI tile", "stat card", "animated counter", "sparkline", "progress ring", "activity feed"
- User mentions putting this in a dashboard (existing or new)
- The widget is meant to live among other widgets — it must not dominate

## Defining property

A dashboard widget animates **on entry** and **on data change** — never continuously. The eye should be drawn to the widget *when the value updates*, not constantly.

## Widget archetypes

### 1. KPI counter tile

Animate the number from 0 → final on viewport entry. Re-animate on prop change.

```tsx
"use client";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

interface KPIProps {
  value: number;
  label: string;
  suffix?: string;
  precision?: number;
}

export function KPI({ value, label, suffix = "", precision = 0 }: KPIProps) {
  const spring = useSpring(0, { duration: 1.2, bounce: 0 });
  const display = useTransform(spring, (v) =>
    v.toLocaleString(undefined, { maximumFractionDigits: precision }) + suffix
  );

  useEffect(() => { spring.set(value); }, [value]);

  return (
    <motion.div
      className="rounded-2xl border bg-surface p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, bounce: 0.25 }}
    >
      <motion.div className="text-7xl font-display tracking-tighter">
        {display}
      </motion.div>
      <p className="mt-2 text-sm text-muted font-mono uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}
```

### 2. Sparkline tile

A 7-day trend with the line drawing in on entry, current value pinned with a pulsing dot.

```tsx
"use client";
import { motion } from "motion/react";

interface SparklineProps {
  data: number[];
  label: string;
  value: number;
}

export function Sparkline({ data, label, value }: SparklineProps) {
  const width = 260, height = 80, max = Math.max(...data), min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="rounded-2xl border bg-surface p-6">
      <p className="text-sm text-muted font-mono uppercase tracking-wider">{label}</p>
      <div className="mt-2 text-5xl font-display">{value.toLocaleString()}</div>
      <svg width={width} height={height} className="mt-4 overflow-visible">
        <motion.polyline
          points={points}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={width}
          cy={height - ((data[data.length - 1] - min) / (max - min || 1)) * height}
          r={4}
          fill="var(--color-accent)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, bounce: 0.4 }}
        />
      </svg>
    </div>
  );
}
```

### 3. Progress ring

A circular progress arc that draws on entry.

```tsx
"use client";
import { motion } from "motion/react";

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const r = 40, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="rounded-2xl border bg-surface p-6 flex items-center gap-6">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-border)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="8"
          strokeDasharray={c}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div>
        <div className="text-4xl font-display">{value}%</div>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
```

### 4. Activity feed (animated list)

Items slide in from the right as they arrive. Older items quietly fade.

```tsx
"use client";
import { AnimatePresence, motion } from "motion/react";

interface Event { id: string; time: string; text: string; }

export function ActivityFeed({ events }: { events: Event[] }) {
  return (
    <div className="rounded-2xl border bg-surface p-6">
      <h3 className="text-sm font-mono uppercase tracking-wider text-muted">Activity</h3>
      <ul className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {events.slice(0, 6).map((e) => (
            <motion.li
              key={e.id}
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, bounce: 0.2 }}
              className="flex justify-between text-sm"
            >
              <span>{e.text}</span>
              <span className="font-mono text-muted">{e.time}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
```

## Composition: Bento dashboard

Compose the above widgets into a Bento grid (see `component-catalog-v1.md#bento-grid`). A typical 3-column dashboard:

```
+--------+--------+--------+
| KPI    | KPI    | Ring   |
+--------+--------+--------+
| Sparkline (spans 2)| Feed |
+--------+--------+--------+
```

## Hard rules

- [ ] Widgets animate on entry, **once**. Never on every render.
- [ ] On data change: animate the **changing element** (number, bar height), not the whole tile.
- [ ] No widget animates for more than 1.2s.
- [ ] Loading skeletons use a *low-amplitude pulse* (opacity 0.4 ↔ 0.6, not 0 ↔ 1).
- [ ] All numeric displays are right-aligned monospace OR use `tabular-nums` to prevent layout jitter.
- [ ] WCAG AA contrast on the final-state value (not animating-state).
