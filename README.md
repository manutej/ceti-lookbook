# CETI Lookbook

> 18 single-file HTML lookbook pages — one per AI / agent concept — each with a unique animated signature visual. Built with the `shadcn-motion` skill.

**Live:** [ceti-lookbook.vercel.app](https://ceti-lookbook.vercel.app) *(updates on every push to main)*

---

## What this is

A reference lookbook covering the 18 core concepts a modern AI builder or curious knowledge worker needs to grok in 2026. Every page is:

- A single self-contained HTML file (≤ 80KB, no build step)
- Anchored in real, web-researched concepts (no fabricated facts)
- WOW-grade with a unique animated visual specific to the concept
- Accessible (WCAG AA, `prefers-reduced-motion`, keyboard nav)
- Mobile-first (touch targets ≥ 44px, tested at 375 / 768 / 1280)
- Compliant with the [shadcn-motion anti-slop checklist](./skills/shadcn-motion/references/anti-slop.md)

---

## The 18 pages

| # | Page | Topic | Signature visual |
|---|---|---|---|
| 0 | [Index](./) | Lookbook overview | 8-card bento with per-page motifs |
| 1 | [LangGraph](./langgraph/) | Stateful agent graphs | Cyclic ReAct loop with traveling pulse |
| 2 | [LangChain](./langchain/) | LCEL pipelines | Horizontal pipeline with morphing packets |
| 3 | [MCP](./mcp/) | Model Context Protocol | Radial hub-spoke with 8 servers |
| 4 | [Transformers](./transformers/) | Architecture | 8×8 attention matrix |
| 5 | [Agentic Patterns](./agentic-patterns/) | Orchestrator patterns | 4 pattern diagrams in bento |
| 6 | [Claude Code](./claude-code/) | CLI agent (non-tech intro) | Animated Catppuccin terminal |
| 7 | [Claude Cowork](./claude-cowork/) | Business users | Before/after time-asymmetry |
| 8 | [LLM Wiki](./llm-wiki/) | Karpathy PKM + agentic | 15-node knowledge graph |
| 9 | [RAG](./rag/) | Retrieval-Augmented Generation | Pipeline + 2D vector space |
| 10 | [Vectors](./vectors/) | Embeddings + Vector DBs | 50-dot semantic clusters |
| 11 | [Prompting](./prompting/) | Prompt engineering patterns | 6 mini prompt demos |
| 12 | [Evals](./evals/) | AI observability | Live dashboard widgets |
| 13 | [Multimodal](./multimodal/) | Vision/Audio/Video | 3-column fusion to token stream |
| 14 | [Safety](./safety/) | Alignment + guardrails | Filter pipeline + Constitutional loop |
| 15 | [Voice](./voice/) | Real-time voice agents | STT/LLM/TTS pipeline + waveforms |
| 16 | [Coding Agents](./coding-agents/) | Landscape comparison | Capability matrix with animated bars |
| 17 | [Computer Use](./computer-use/) | Browser/desktop agents | Autonomous cursor in fake browser |
| 18 | [AI Economics](./ai-economics/) | Cost + caching + latency | Cost curves + price ladder |

---

## How to navigate

- **Bottom-of-page nav** appears on every page: `← prev` · counter · menu · index · `next →`
- **Keyboard**: arrow keys move between pages; `Esc` closes the menu
- **Mobile**: same nav, larger tap targets, sticky bottom

---

## How to view locally

The pages are static HTML — no build step.

```bash
# Easiest: open the index in a browser
open index.html

# Or serve over HTTP (necessary for some browsers to load relative scripts cleanly)
npx serve .
# → opens at http://localhost:3000
```

---

## How to deploy

This repo deploys to Vercel automatically on every push to `main`. No build configuration needed — Vercel serves the static files as-is, with `vercel.json` providing:

- `cleanUrls: true` — `/langgraph` works (not just `/langgraph/index.html`)
- `trailingSlash: true` — consistent canonical URLs
- Security headers (CSP-friendly, no clickjacking)
- Aggressive caching for `/shared/*` assets

To deploy:

```bash
# One-time setup
npx vercel link

# Deploy
npx vercel --prod --yes
```

---

## Project structure

```
ceti-lookbook/
├── README.md                ← you are here
├── REQUIREMENTS.md          ← user requirements (locked, never delete)
├── SUGGESTIONS.md           ← future improvement ideas
├── HANDOFF.md               ← state of the repo + next steps
├── vercel.json              ← Vercel deploy config (clean URLs, headers)
├── .gitignore
│
├── index.html               ← lookbook landing page
├── {topic}/index.html       ← 18 topic pages, one per concept
│
├── shared/
│   └── nav.js               ← shared pagination — loaded by every page
│
├── skills/
│   └── shadcn-motion/       ← the Claude Code skill that built this
│       ├── SKILL.md
│       ├── references/      ← library-index, catalog-v1, catalog-v2, motion-vocabulary, anti-slop
│       ├── modes/           ← 5 output modes
│       └── examples/        ← canonical single-file HTML
│
└── PLUGINS/
    └── shadcn-motion/       ← the same skill in distributable plugin form
        ├── .claude-plugin/
        ├── README.md
        ├── install.sh
        ├── uninstall.sh
        └── (mirrors skill content)
```

---

## How to add a new page

1. Pick a slug (e.g., `fine-tuning`)
2. Create `fine-tuning/index.html` — use any existing page as a starting template
3. Add the slug to `shared/nav.js` in the `PAGES` array (in display order)
4. Add a row to the table above + a card on `index.html`
5. Push — Vercel auto-deploys

Use the `shadcn-motion` skill (installed globally at `~/.claude/skills/shadcn-motion/`) to generate the new page's HTML — invoke with `/shadcn-motion single-file-html <topic-description>`.

---

## Credits

- Skill author / curator: [Manu Mulaveesala](https://cetiai.co) · CETI.AI
- Built with [Motion.dev](https://motion.dev), inspired by [SmoothUI](https://smoothui.dev)
- Anti-slop checklist enforces no purple-gradient SaaS aesthetic; warm cream + vermillion palette throughout

License: MIT
