# Mode: interactive-experience

The next evolution above codebase-to-course single-file HTML. Produces a directory containing a multi-section, scroll-orchestrated, deeply interactive course tutorial. Think: Apple keynote meets Bartosz Ciechanowski explainer.

## When to use

- User asks for "interactive experience", "interactive course", "interactive tutorial"
- User says "above single-file HTML" or "next evolution of codebase-to-course"
- The deliverable needs:
  - Multiple sections with their own choreography
  - Pinned scroll narratives (concept-by-concept reveal)
  - In-section interactive demos the learner can play with
  - Page-to-page morphs (View Transitions)
  - Persistent navigation that tracks progress

## Output structure

```
{experience-slug}/
├── index.html                  # entry page; loads shared assets, renders shell
├── sections/
│   ├── 01-overview.html        # one section per concept
│   ├── 02-mechanism.html
│   ├── 03-walkthrough.html
│   ├── 04-edge-cases.html
│   └── 05-recap.html
├── assets/
│   ├── styles.css              # shared design tokens (imports from codebase-to-course design system)
│   ├── motion.js               # shared animation runtime (Motion, Lenis, GSAP via CDN)
│   ├── shell.js                # navigation, progress, view-transitions wiring
│   ├── illustrations/
│   │   └── *.lottie            # designer-authored vector loops where appropriate
│   └── thumbs/
│       └── *.svg               # inline-SVG diagrams for each section
├── README.md                   # how to view + adapt
└── manifest.json               # section list, titles, durations, learning objectives
```

## Section anatomy

Each section follows a 4-act structure:

1. **Open** — hero reveal of the concept's name + one-sentence framing (hero text reveal)
2. **Mechanism** — a pinned scroll-scrubbed visualization that *shows* the concept moving (GSAP ScrollTrigger pinned section)
3. **Try it** — an interactive demo the learner can manipulate (input → see effect)
4. **Recap** — a Bento grid of 3–4 takeaways with magnetic-button "next section" CTA

## Shared shell

```html
<!-- index.html: minimal shell, loads first section, navigation, view-transition CSS -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Experience Title}</title>

  <link rel="stylesheet" href="assets/styles.css">

  <style>
    @view-transition { navigation: auto; }
    ::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.5s; }
    .section-title { view-transition-name: section-title; }
  </style>
</head>
<body>
  <nav class="shell-nav">
    <div class="progress" role="progressbar"></div>
    <button class="shell-prev" aria-label="Previous section">←</button>
    <ol class="shell-sections">
      <!-- one li per section, rendered from manifest.json -->
    </ol>
    <button class="shell-next" aria-label="Next section">→</button>
  </nav>

  <main class="shell-main">
    <!-- section content injected here, or load via fetch + view-transition -->
  </main>

  <script type="module" src="assets/shell.js"></script>
</body>
</html>
```

## Cross-section navigation (View Transitions)

```js
// assets/shell.js
async function goToSection(href) {
  if (!document.startViewTransition) {
    location.href = href;
    return;
  }
  const html = await fetch(href).then((r) => r.text());
  document.startViewTransition(() => {
    document.querySelector(".shell-main").innerHTML = html;
    initSectionMotion();  // re-init Motion / GSAP / Lenis for new content
  });
}
```

## Scroll choreography per section

The mechanism act in each section is a GSAP-pinned scrubbed timeline:

```js
import { gsap } from "https://esm.sh/gsap@3.13";
import { ScrollTrigger } from "https://esm.sh/gsap@3.13/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function pinnedMechanism(root) {
  const steps = root.querySelectorAll(".mechanism-step");
  const tl = gsap.timeline();

  steps.forEach((step, i) => {
    tl.from(step.querySelector(".visual"), { opacity: 0, y: 40, duration: 1 }, i);
    tl.from(step.querySelector(".caption"), { opacity: 0, y: 20, duration: 0.8 }, i + 0.2);
  });

  ScrollTrigger.create({
    trigger: root,
    start: "top top",
    end: () => "+=" + (steps.length * 600),
    pin: true,
    scrub: 1,
    animation: tl,
  });
}
```

## Interactive demos

Each "try it" act is a small standalone widget that responds to user input. Examples:
- Slider that changes a chart parameter and animates the chart accordingly
- Toggle that morphs a UI between two states (with view-transition or Motion `layout`)
- Drag-to-explore that uses Motion gestures

Wrap the demo in a clearly-delineated container:

```html
<section class="try-it">
  <header>
    <h3 class="screen-heading">Try it yourself</h3>
    <p class="hint">Move the slider to see how depth changes the result.</p>
  </header>
  <div class="demo">
    <!-- interactive widget -->
  </div>
  <button class="reset">Reset</button>
</section>
```

## Manifest

```json
{
  "title": "How [concept] works — an interactive walkthrough",
  "slug": "concept-walkthrough",
  "duration_minutes": 18,
  "sections": [
    { "id": "01-overview",    "title": "What problem does this solve?", "duration": 2 },
    { "id": "02-mechanism",   "title": "The mechanism, step by step",   "duration": 6 },
    { "id": "03-walkthrough", "title": "A real example end-to-end",     "duration": 5 },
    { "id": "04-edge-cases",  "title": "When it breaks",                "duration": 3 },
    { "id": "05-recap",       "title": "Takeaways",                     "duration": 2 }
  ],
  "learning_objectives": [
    "Explain the concept in plain language",
    "Recognize when to apply it",
    "Diagnose three common failure modes"
  ]
}
```

## Composition with codebase-to-course

If the experience is built from an existing codebase, the FIRST step is to invoke `codebase-to-course` to produce the prose modules. Then `shadcn-motion` (this mode) **lifts** those modules into the multi-section interactive shell by:

1. Reading the codebase-to-course output's module HTML files
2. Splitting them into the 4-act structure (open/mechanism/try/recap)
3. Wiring section-to-section navigation with View Transitions
4. Adding pinned-scroll choreography where the existing module has step-by-step content
5. Inserting "try it" widgets where the existing module has code translations

## Hard rules

- [ ] Each section loads independently (works if user lands on `sections/03-walkthrough.html` directly)
- [ ] View Transitions are feature-detected; fallback is plain page navigation
- [ ] `prefers-reduced-motion` disables ALL scroll-scrubbed timelines (replace with normal scroll)
- [ ] Lenis kill-switch exists (query param or keyboard shortcut)
- [ ] Total page weight per section ≤ 200KB (including any Lottie)
- [ ] Keyboard navigation: ← → arrow keys move between sections
- [ ] Screen-reader: section landmarks (`<main role="main">`), skip-to-content link in shell
- [ ] WCAG AA contrast throughout
