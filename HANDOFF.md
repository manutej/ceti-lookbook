# HANDOFF.md — CETI Lookbook

State of the repo as of last commit. Read this first when picking up the project in a new session.

---

## Where things stand

### ✅ Complete

- **18 topic pages** built and committed:
  - Session 2 (original 8): langgraph, langchain, mcp, transformers, agentic-patterns, claude-code, claude-cowork, llm-wiki
  - Session 3 (10 new): rag, vectors, prompting, evals, multimodal, safety, voice, coding-agents, computer-use, ai-economics
- **Lookbook index** (`index.html`) with 8-card bento and per-page motif previews
- **Shared pagination nav** at `shared/nav.js` — auto-injects floating prev/counter/next/index/menu on every page
- **Documentation suite**: REQUIREMENTS.md, SUGGESTIONS.md, README.md, this file
- **vercel.json** with cleanUrls + trailingSlash + security headers
- **The shadcn-motion skill** mirrored to `skills/shadcn-motion/`
- **The shadcn-motion plugin** mirrored to `PLUGINS/shadcn-motion/`

### 📦 Source of truth lives at

- **Working copy:** `~/Documents/CETI/.claude/worktrees/shadcn-motion-skill/website/lookbook/`
- **GitHub repo:** `github.com/manutej/ceti-lookbook` (public)
- **Vercel deploy:** `ceti-lookbook.vercel.app`
- **Skill (globally installed):** `~/.claude/skills/shadcn-motion/` — used by every page-build agent

---

## How nav.js works (so you don't break it)

The pagination nav is the most fragile cross-cutting concern. Read this before touching it.

### Loaded by every page

Every topic page has this line near the bottom (just before `</body>`):

```html
<script src="../shared/nav.js" defer></script>
```

The index has:

```html
<script src="./shared/nav.js" defer></script>
```

### Page order

Defined ONCE in `shared/nav.js` in the `PAGES` array. To change the browse order, edit that array. The script computes prev/next/counter from this array, so it's the single source of truth.

### Path resolution

All hrefs use **relative paths** that work in three contexts:
- `file://` (local preview by double-clicking index.html)
- `localhost` (via `npx serve`)
- Vercel deploy (`ceti-lookbook.vercel.app/langgraph/`)

The function `hrefFor(slug, currentIdx)` computes paths based on whether the current page is the index or a topic page. From the index → `./{slug}/`. From a topic page → `../{slug}/` (or `../` for the index).

### Detecting current page

`detectCurrentIndex()` reads `window.location.pathname`, strips trailing slashes, and matches the last path segment against the slug list. Edge cases handled:
- Root path `/lookbook/` or `/` → index (idx 0)
- `/langgraph/` or `/langgraph/index.html` → langgraph (idx 1)
- Unknown slug → fallback to idx 0

### Adding a new page

1. Append `{ slug: 'new-thing', title: 'New Thing', tag: 'NEW' }` to `PAGES` in `shared/nav.js`
2. Create `new-thing/index.html` with the `<script src="../shared/nav.js" defer></script>` line
3. Add a card to `index.html`
4. Done — nav recalculates prev/next/counter automatically

---

## How to add/edit pages

### Generating a new page with the skill

Use the `shadcn-motion` skill (already installed globally):

```
/shadcn-motion single-file-html A page on Fine-Tuning vs RAG vs Prompting,
mid-level audience, signature visual = decision-tree flowchart with animated
branches lighting up.
```

The skill will produce a self-contained HTML file in the canonical aesthetic. Drop it into the repo as `{slug}/index.html`, update nav.js, push.

### Manually editing an existing page

Each page is a single `.tsx`-free `.html` file with inline CSS and JS. Open, edit, save. Vercel hot-deploys on push.

**Don't break:**
- The `<link>` to Google Fonts (Bricolage Grotesque, DM Sans, JetBrains Mono)
- The CSS variables (warm cream `#FAF7F2`, vermillion `#D94F30`, etc.)
- The `prefers-reduced-motion` media query block
- The `<script src="../shared/nav.js" defer></script>` line

---

## How to deploy

### Continuous (automatic)

Push to `main` → Vercel deploys. Live in ~30 seconds.

### Manual

```bash
cd /path/to/ceti-lookbook
npx vercel --prod --yes
```

### Preview deploys

Open a PR → Vercel auto-creates a preview URL. Comment-on-PR isn't wired yet (see SUGGESTIONS.md B2).

---

## How to verify a clean state

Run these from the repo root:

```bash
# 1. All pages exist
for d in langgraph langchain mcp transformers agentic-patterns claude-code claude-cowork llm-wiki \
         rag vectors prompting evals multimodal safety voice coding-agents computer-use ai-economics; do
  test -f "$d/index.html" && echo "✓ $d" || echo "✗ MISSING: $d"
done

# 2. Every page loads the nav script
for d in langgraph langchain mcp transformers agentic-patterns claude-code claude-cowork llm-wiki \
         rag vectors prompting evals multimodal safety voice coding-agents computer-use ai-economics; do
  grep -q 'shared/nav.js' "$d/index.html" && echo "✓ nav $d" || echo "✗ NO NAV: $d"
done

# 3. No broken internal links (all relative)
grep -rE 'href="(/|https?://(localhost|127))' --include="*.html" . | head -20

# 4. Anti-slop spot-check
for d in langgraph langchain mcp transformers agentic-patterns claude-code claude-cowork llm-wiki \
         rag vectors prompting evals multimodal safety voice coding-agents computer-use ai-economics; do
  grep -q 'prefers-reduced-motion' "$d/index.html" && grep -q 'Bricolage Grotesque' "$d/index.html" \
    && grep -q '#FAF7F2' "$d/index.html" && echo "✓ $d" || echo "✗ DESIGN-SYSTEM-DRIFT: $d"
done
```

---

## Known issues / next steps

### Not blockers, just heads-up

1. **No analytics.** SUGGESTIONS.md E1.
2. **No OG cards.** Sharing a link in Slack/iMessage shows the URL, not a preview. SUGGESTIONS.md A1.
3. **No Lighthouse CI gate** on PR. Quality could regress silently. SUGGESTIONS.md B3.
4. **Custom domain.** Currently `*.vercel.app`. To attach `lookbook.cetiai.co`, add a DNS CNAME. SUGGESTIONS.md B1.
5. **Search.** No way to search across all 18 pages. Could add a simple client-side search using `lunr.js` or fuse.js.
6. **Versioning.** No release tags yet. When a content milestone is reached, tag it (e.g., `v1.0.0 = first 18 pages live`).

---

## Continuity checklist for the next session

When resuming work, in this order:

1. `cd ~/Documents/CETI/.claude/worktrees/shadcn-motion-skill/website/lookbook/` (or wherever you cloned the standalone repo)
2. `git pull` to get latest
3. Read this file (you're doing it now ✓)
4. Read `REQUIREMENTS.md` to remember what was agreed
5. Read `SUGGESTIONS.md` for ideas to pick up
6. Open `index.html` in a browser to see current state
7. Run the verification commands above

---

## Contact

- Repo: `github.com/manutej/ceti-lookbook`
- Author: Manu Mulaveesala / CETI.AI
- Issues: file at `github.com/manutej/ceti-lookbook/issues`

---

*Last updated: 2026-05-15. If this file is older than a month and the repo has changed, it's stale — regenerate from current state.*
