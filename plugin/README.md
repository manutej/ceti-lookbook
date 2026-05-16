# shadcn-motion

> Generate WOW-level animated components for course pages, dashboards, hero sections, and technical demos.

A Claude Code plugin that synthesizes the best of 10 shadcn-aligned animation libraries (Motion.dev, Magic UI, Aceternity UI, SmoothUI, Motion Primitives, Animate UI, Cult UI, React Bits, Animata, Kibo UI) plus four cross-cutting engines (GSAP + ScrollTrigger, Lenis, Lottie, View Transitions API) into a single skill with 5 output modes.

## What it does

Tell Claude what you want — "make a WOW landing page", "add an animated KPI counter", "build an interactive course module" — and the skill generates production-quality, accessibility-respecting, anti-slop-compliant animated components in the mode that fits your deliverable.

**Five output modes:**

| Mode | Use it when | Output |
|---|---|---|
| `component-snippet` | You have a Next.js / React project | One or more `.tsx` files |
| `single-file-html` | Course page, proposal, sharable artifact (no build step) | One `.html` ≤ 80KB |
| `dashboard-widget` | Animated KPI tile, sparkline, progress ring, activity feed | Self-contained `.tsx` or HTML fragment |
| `interactive-experience` | Multi-section scroll-orchestrated course tutorial | Directory: shell + sections + assets |
| `landing-page` | Hero-driven marketing or proposal page | Single page (HTML or tsx) |

## The v1 component catalog (top 10)

Hero reveals, interactive cards, and data-viz — the three categories that matter most for course/dashboard WOW.

1. **Hero Text Reveal** — Motion Primitives `TextEffect` / GSAP `SplitText`
2. **Number Ticker** — Magic UI `NumberTicker` / SmoothUI `NumberFlow`
3. **Bento Grid** — Magic UI asymmetric tile layout
4. **Magic Card + Border Beam** — cursor-following glow + traveling edge highlight
5. **Hero Parallax** — Aceternity multi-row scroll parallax
6. **Sticky Scroll Reveal** — Aceternity / GSAP pinned narrative
7. **3D Tilt Card** — Aceternity / Motion Primitives perspective hover
8. **Magnetic Button** — SmoothUI cursor-attracting CTA
9. **Dynamic Island** — SmoothUI / Cult UI live status pill
10. **Animated Beam** — Magic UI architecture diagram pulse

Plus an extended **v2 catalog** (11–20) for richer outputs: Siri Orb, AI Input, animated backgrounds, MacBook Scroll, Liquid Button, Morphing Dialog, Progressive Blur, Animated Circular Progress, Animated Timeline, and Marquee.

Full catalog with copy-paste code for every component: `skills/shadcn-motion/references/component-catalog-v1.md` and `component-catalog-v2.md`.

## Design philosophy

> Motion serves comprehension. WOW is what happens when motion makes something *feel inevitable*, not flashy.

Every animation must justify itself by one of:
- Directing attention to the next concept
- Providing tactile feedback for an interaction
- Revealing structure that static layouts can't show

If it does none of those, cut it.

### Hybrid aesthetic: shadcn + smoothui

- **Structure** from shadcn/ui: composable, accessible, copy-paste primitives, Radix/Tailwind tokens
- **Motion vocabulary** from SmoothUI: `{ duration: 0.5, bounce: 0.25 }` springs, restrained palette, single-element preferences over heavy stagger chains, `prefers-reduced-motion` first-class

### Hard anti-slop rules

The skill enforces a `references/anti-slop.md` checklist on every output. Examples:

- ❌ Purple/pink gradient SaaS hero backgrounds
- ❌ Glassmorphism as default
- ❌ Emoji in headings or as visual elements
- ❌ Stock isometric illustrations
- ❌ Generic "Fast / Secure / Scalable" icon-card grids
- ❌ Continuous animations without `prefers-reduced-motion` pause
- ❌ `framer-motion` imports when `motion/react` is correct
- ❌ Mixing `framer-motion` and `motion/react` in one project (doubles bundle)
- ❌ Animations longer than 1.2s for a single transition
- ❌ Stagger chains > 5 items
- ❌ 3D tilt > 16°

## Installation

### Method 1: Install via the install script (recommended)

```bash
git clone https://github.com/manutej/shadcn-motion.git
cd shadcn-motion
./install.sh
```

The script installs the skill into `~/.claude/skills/shadcn-motion/` and the command into `~/.claude/commands/shadcn-motion.md`.

### Method 2: Manual install

```bash
# Copy the skill
cp -R skills/shadcn-motion ~/.claude/skills/

# Copy the command
cp commands/shadcn-motion.md ~/.claude/commands/
```

### Method 3: Install via Claude Code plugin command

```bash
/plugin install https://github.com/manutej/shadcn-motion.git
```

### Uninstall

```bash
./uninstall.sh
```

## Usage

After installation, the skill activates automatically when Claude detects relevant triggers in your request:

- "make this page WOW"
- "add an animated KPI counter"
- "build a magnetic button"
- "create a bento grid dashboard"
- "make a hero text reveal"
- "build an interactive course tutorial"
- "shadcn animations" / "smoothui style" / "aceternity style"

You can also invoke explicitly with the `/shadcn-motion` command:

```
/shadcn-motion landing-page A pitch page for our AI consulting practice
/shadcn-motion dashboard-widget A KPI tile showing weekly active users
/shadcn-motion interactive-experience How a RAG pipeline works
/shadcn-motion single-file-html Hero with magnetic CTA and stats row
/shadcn-motion component-snippet A magnetic button I can drop into Next.js
```

## What's inside

```
shadcn-motion/
├── .claude-plugin/
│   └── plugin.json                       # plugin manifest
├── README.md                              # this file
├── LICENSE                                # MIT
├── install.sh                             # installer
├── uninstall.sh                           # uninstaller
├── .gitignore                             # Claude Code patterns
├── skills/
│   └── shadcn-motion/
│       ├── SKILL.md                       # entry — frontmatter, modes, when-to-use
│       ├── references/
│       │   ├── library-index.md           # 10 libraries → which to use when
│       │   ├── component-catalog-v1.md    # top 10 components, full code per mode
│       │   ├── component-catalog-v2.md    # extended 20 for richer outputs
│       │   ├── motion-vocabulary.md       # timing, easing, choreography
│       │   └── anti-slop.md               # forbidden patterns
│       ├── modes/
│       │   ├── component-snippet.md       # Next.js tsx mode
│       │   ├── single-file-html.md        # CDN Motion mode
│       │   ├── dashboard-widget.md        # data-viz mode
│       │   ├── interactive-experience.md  # multi-section course mode
│       │   └── landing-page.md            # hero-driven page mode
│       └── examples/
│           └── hero-reveal-singlefile.html  # canonical working example (18KB)
└── commands/
    └── shadcn-motion.md                   # /shadcn-motion command
```

## Composition with `codebase-to-course`

This skill **extends** the `codebase-to-course` design system (warm cream palette, Bricolage Grotesque / DM Sans / JetBrains Mono, the reveal pattern). It does NOT fork or duplicate it.

When the deliverable is the *document*, use `codebase-to-course`.
When the deliverable is the *experience*, use `shadcn-motion` (especially the `interactive-experience` mode).

## Try the example

Open `skills/shadcn-motion/examples/hero-reveal-singlefile.html` directly in a browser. It demonstrates five v1 components — hero text reveal, magnetic CTA, number ticker, magic card, and animated beam — in a single 18KB self-contained HTML file with no build step.

## License

MIT © 2026 Manu Mulaveesala / CETI.AI

All upstream libraries credited in `skills/shadcn-motion/references/library-index.md` — this plugin is a synthesis layer, not a fork of any underlying library. Use each library under its own license (all MIT except React Bits which is MIT + Commons Clause).

## Credits & inspiration

- [SmoothUI](https://smoothui.dev/) by Eduardo Lopez — the explicit motion-vocabulary anchor
- [Motion.dev](https://motion.dev/) by Motion Division — the engine
- [Magic UI](https://magicui.design/), [Aceternity UI](https://ui.aceternity.com/), [Motion Primitives](https://motion-primitives.com/), [Animate UI](https://animate-ui.com/), [Cult UI](https://www.cult-ui.com/), [React Bits](https://www.reactbits.dev/), [Animata](https://animata.design/), [Kibo UI](https://www.kibo-ui.com/)
- [GSAP](https://gsap.com/) (now 100% free under Webflow ownership)
- [Lenis](https://lenis.darkroom.engineering/) by Darkroom Engineering
- [LottieFiles](https://lottiefiles.com/) for the dotlottie WASM runtime
