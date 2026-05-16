# SUGGESTIONS.md — Future improvements

Things I noticed while building but did NOT do (because not explicitly in scope, or because they'd extend the timeline). Captured here so they're not lost.

---

## A. Visual / UX polish

### A1. Custom OpenGraph cards per page
Right now there are no `<meta property="og:*">` tags. When you share a lookbook link in Slack / iMessage / WhatsApp, you get the URL but no preview card.
**Suggested:** add a script that auto-generates an OG image per page (or write 18 static PNGs) at `/og/{slug}.png`. Then inject per-page `og:title` / `og:description` / `og:image` tags via the nav.js or a build step.

### A2. View Transitions between lookbook pages
The pages currently navigate the normal way. Since you're on Vercel + same-origin MPA, adding View Transitions (cross-document) would give Apple-grade smoothness — `@view-transition { navigation: auto; }` in a shared stylesheet plus matching `view-transition-name` on the hero element of each page.
**Suggested:** add to `shared/styles.css` (currently only `shared/nav.js` exists).

### A3. Dark mode
The palette is intentionally warm light. A dark mode toggle would broaden the audience for mobile-at-night reading. Tokens are already centralized — `prefers-color-scheme: dark` block in `shared/dark.css` could do it without touching individual pages.

### A4. Spotlight / hash anchors on first scroll
When a user lands directly on a deep section (e.g., `/transformers/#attention-matrix`), it should gently scroll + briefly highlight. Easy to add to nav.js.

### A5. Page-progress reading indicator
A thin progress bar at the very top of each page (filling as the user scrolls). Already a pattern in codebase-to-course; could be folded into `shared/nav.js`.

---

## B. Repo + deploy

### B1. Custom domain `lookbook.cetiai.co`
Vercel default `.vercel.app` works but a branded subdomain feels intentional. Requires a DNS CNAME record on cetiai.co.

### B2. Branch previews + comment-on-PR
Vercel auto-creates preview deployments per PR. Worth wiring a GitHub Action to comment the preview link in every PR.

### B3. Lighthouse CI gates
Add `.github/workflows/lighthouse.yml` that fails the deploy if mobile performance drops below 95 or accessibility below 100. Locks in the quality bar.

### B4. Open Graph image generation pipeline
Use `@vercel/og` to generate per-page OG images at the edge — no need to maintain 18 static PNGs.

### B5. Sitemap.xml + robots.txt
For SEO. Auto-generated from the same canonical PAGES list in nav.js.

---

## C. Content / completeness

### C1. v3 lookbook expansion (10 more topics)
If/when we extend further, candidates that would round out the set:
- **Fine-tuning vs LoRA vs RAG** — the decision matrix that pairs well with the existing RAG page
- **Anthropic SDK / API patterns** — deep-dive of API features (caching, batch, files, citations, memory tools)
- **Function calling / tool use** — the protocol-level mechanic underneath agents
- **AI in the data stack** — embeddings + DuckDB + vectors as the new analytics primitive
- **Local LLMs** — Llama.cpp, Ollama, MLX, the "private AI" trend
- **AI hardware** — H100/B200, Apple Silicon, custom inference chips (Cerebras, Groq, Tenstorrent)
- **AI in design** — Figma + AI, Loveable, V0, Bolt — the design-to-code wave
- **AI in education** — Khan Academy's Khanmigo, AI tutors, personalized learning
- **The AI startup landscape 2026** — taxonomy of the ~200 funded companies by what they do
- **AI in the enterprise** — change-management, the human side of rollout

### C2. Interactive code playgrounds
Each page has a static `<pre>` code block. Could embed a tiny in-browser sandbox (Pyodide for Python, esbuild-wasm for JS) so the code is RUNNABLE.

### C3. AI-narrated audio versions
Each page is ~1500 words. ElevenLabs or OpenAI TTS → a 5-minute audio companion per page. Toggle button on the nav.

### C4. Multi-language (ES/PT first for CETI's existing audience)
Single source of truth for the content (markdown per page in `content/{slug}/{lang}.md`) → build step generates the HTML. Currently HTML is the source — would need a refactor.

---

## D. Skill + plugin extensions

### D1. v2 component catalog implementation
The skill already documents the 20-component v2 catalog. Could promote 5 of those to v1 status based on what was actually useful when building these 18 pages.

### D2. CLI: `npx ceti-lookbook new <topic>`
A small CLI that scaffolds a new lookbook page from a template (skeleton HTML + research stub + signature visual placeholder). Would make adding pages a 1-minute operation.

### D3. Storybook for components
Right now each component lives in `references/component-catalog-v1.md` as code samples. A Storybook with each at multiple states (default, hovered, animating) would be a much better "spec" than markdown.

### D4. Figma library mirroring the skill tokens
Designers who consume CETI work would benefit from a Figma library that matches the skill's CSS variables 1:1.

---

## E. Operational

### E1. Analytics
Plausible / Fathom / Vercel Web Analytics. Without it we won't know which lookbook pages are actually being read.

### E2. Feedback widget
A tiny "Was this useful?" thumbs at the bottom of each page → posts to a webhook → captures qualitative feedback.

### E3. RSS / new-page-notification
If we're going to keep adding pages, an RSS feed or email digest would matter.

### E4. CETI service line
The lookbook implicitly sells: "we can build pages like this." Worth making that explicit — a dedicated CTA section ("Want this for your domain? Book a CETI workshop.") on the index page or as a banner on every page. Currently only the index page CTA hints at this.

---

## F. Risks / fragility (worth knowing)

### F1. Google Fonts hard dependency
Every page loads `Bricolage Grotesque + DM Sans + JetBrains Mono` from `fonts.googleapis.com`. If Google Fonts is blocked (corporate networks, certain countries) the pages render with system fallbacks — degrades gracefully but loses the design language.
**Mitigation:** consider self-hosting the fonts (subset + woff2) in `shared/fonts/`. ~80KB total.

### F2. CSS `offset-path` use in `llm-wiki` / `langgraph` pages
Used for the SVG pulse animations. Supported in all modern browsers since 2023 but the LLM Wiki page agent flagged it explicitly — older browsers degrade to a stationary pulse (still visible, just not moving).

### F3. No build step → no minification
HTML files are hand-written and uncompressed. Vercel's gzip handles wire-level compression so this isn't critical, but a build step with HTML/CSS/JS minification could cut payload by 20-30%.

### F4. Inline SVGs aren't shared across pages
If 5 pages all draw a similar "Claude orb" SVG, each one redefines it. Total payload is ~5x what it could be. A `shared/symbols.svg` sprite (loaded once via `<use href>`) could deduplicate.
