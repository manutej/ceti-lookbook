# REQUIREMENTS.md — CETI Lookbook

Captured verbatim from session transcript so nothing drifts as the project evolves.

---

## Session 1 — Original ask (skill + plugin + lookbook)

### Initial goal
> "create a skill and plugin of shadcn animation libraries, first reading and researching the whole library, related documentation, and also when it is useful, first researching the best components, asking me questions about core priorities. recognizing that we need to have extensively interactive and WOW level animations on webpages and dashboards for course learning materials and for sharing technical materials. My inspirations also include: https://smoothui.dev/"

### Locked decisions from the priority Q&A
- **Output format (multi-select):** Standalone plugin package (distributable) · Dashboard widgets (data-viz + interactivity) · Next.js / React component snippets · Single-file HTML (codebase-to-course style) · Comprehensive detailed course tutorials that are complete interactive EXPERIENCES (next evolution above single-file HTML — "next evolution beyond codebase-to-course")
- **Libraries (multi-select):** Motion (formerly Framer Motion) — primary · GSAP + ScrollTrigger · Lenis (smooth scroll) + Lottie · "Other ones included from research and my feedback. Less is more so choose top 10 to be able to build the plugin, maybe 20 for v2"
- **Component categories (multi-select):** Hero / landing reveal animations · Interactive cards / hover micro-interactions · Data-viz + dashboard animations
- **Style anchor:** Hybrid: shadcn structure + smoothui motion vocabulary

### Source corpus the user supplied
The 100-link research list pasted in chat — Magic UI, Aceternity UI, Shadcn Space, SmoothUI, Cult UI, Animate UI, Motion Primitives, React Bits, Kibo UI, 21st.dev, Eldora UI, 8bitcn, PrismUI, GlassCN, Shadcnblocks, Tailark, plus the 4 engines (GSAP, Lenis, Lottie, View Transitions). Use these as the authoritative starting set.

---

## Session 2 — Lookbook (initial 8 pages)

> "Did you build real sample dashboards with your skills and animations? Build some examples as a lookbook for EACH of the following concepts having their own detailed page: langgraph agents, langchain pipelines, Model Context Protocol, Transformers Architecture and modern llm architectures, Agentic AI orchestrator patterns and non-technical introduction, Non-technical introduction to Claude Code, Claude Cowork for Business Users, Karpathy style LLM Wiki implementations and benefits (and workflow) with logic and personal knowledge management in the era of agentic ai"
>
> "plan for each, perform quick research for each of the core concepts but the visuals have to be ABSOLUTELY STUNNING. Shoot for WOW. Anything less is absolute Failure."

### Hard quality bar (non-negotiable)
- "ABSOLUTELY STUNNING. Shoot for WOW. Anything less is absolute Failure."
- Each page must have a unique, concept-specific signature animated visual (not a reused template)
- Must comply with the shadcn-motion anti-slop checklist
- Each page is its own standalone artifact (deep-linkable, self-contained)

---

## Session 3 — 10 more + GitHub repo + Vercel + mobile + docs

> "Explore 10 other similar ones and build them out please and let's build a github repo for all these lookbooks in order to paginate through the different styles and make sure they are also all reviewed to be mobile ready so i can review final artifacts from my phone with a direct link please. They should load in my vercel and have corresponding github repo with all specification, updated HANDOFF.md and skills relevant and used within this folder (inside github repo)"

### Locked decisions from the priority Q&A
- **Repo name:** `ceti-lookbook` (PUBLIC)
- **Vercel target:** New Vercel project, default `*.vercel.app` domain (auto-generates `ceti-lookbook.vercel.app`)

### Hard requirements
- **18 total pages**: original 8 + 10 new (RAG, vectors, prompting, evals, multimodal, safety, voice, coding-agents, computer-use, ai-economics)
- **Pagination between pages**: user wants to "paginate through the different styles" → shared nav with prev/next/index/menu
- **Mobile-ready**: "I can review final artifacts from my phone with a direct link"
  - Touch targets ≥ 44×44px
  - Tested layouts at 375px / 768px / 1280px
  - Mobile-optimized meta tags
- **Direct link**: shareable Vercel URL, no auth wall, no login
- **GitHub repo**: holds all specification + updated HANDOFF.md + the relevant skills (shadcn-motion) inside the folder
- **Vercel deployment**: corresponding deploy that updates on every push

### Follow-up requirement (mid-session)
> "Make sure all the backlinks and elements load properly to ensure no dependencies are lost during deployment please (document my requirements and any future suggestions carefully)"

- **All hrefs/srcs use relative paths** that work locally AND deployed
- **No missing dependencies**: every script, font, asset reference must resolve
- **Document requirements + future suggestions carefully** ← this file + `SUGGESTIONS.md`

---

## Implicit but non-negotiable (across all sessions)

- The shadcn-motion skill is the single source of truth for the design system. Pages **extend** it, never fork it.
- No purple/pink gradients · no glassmorphism as default · no emoji in headings · no animation > 1.2s for single transitions · `prefers-reduced-motion` respected · WCAG AA contrast everywhere.
- CETI palette: warm cream `#FAF7F2`, vermillion `#D94F30`, Bricolage Grotesque + DM Sans + JetBrains Mono.
- Single-file HTML, ≤ 80KB per page (hard max 110KB).
- Each page is anchored in real concepts (web research before content) — no fabricated facts.
