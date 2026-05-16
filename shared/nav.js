/*
  CETI Lookbook · Pagination Navigation
  Loaded by every page via: <script src="../shared/nav.js" defer></script>
  (Index page uses: <script src="./shared/nav.js" defer></script>)

  Single source of truth for the 18-page page list.
  Auto-injects floating bottom-nav with prev / counter / next / index links.
  Touch-friendly (44x44px minimum). Mobile-first. Respects prefers-reduced-motion.
  Zero external dependencies. Inherits the loaded page's design tokens.
*/

(function () {
  'use strict';

  // ========== CANONICAL PAGE LIST — single source of truth ==========
  // Order matters: this is the user-facing browse order.
  // To add a new page: add an entry here + create folder with index.html.
  const PAGES = [
    { slug: '',                 title: 'Lookbook · Index',          tag: 'INDEX' },
    { slug: 'langgraph',        title: 'LangGraph Agents',          tag: 'AGENTS' },
    { slug: 'langchain',        title: 'LangChain Pipelines',       tag: 'LCEL' },
    { slug: 'mcp',              title: 'Model Context Protocol',    tag: 'MCP' },
    { slug: 'transformers',     title: 'Transformers Architecture', tag: 'ARCH' },
    { slug: 'agentic-patterns', title: 'Agentic Orchestrator Patterns', tag: 'PATTERNS' },
    { slug: 'claude-code',      title: 'Claude Code',               tag: 'CLI' },
    { slug: 'claude-cowork',    title: 'Claude Cowork',             tag: 'BUSINESS' },
    { slug: 'llm-wiki',         title: 'LLM Wiki + Agentic PKM',    tag: 'PKM' },
    { slug: 'rag',              title: 'RAG Architecture',          tag: 'RAG' },
    { slug: 'vectors',          title: 'Vector DBs + Embeddings',   tag: 'VECTORS' },
    { slug: 'prompting',        title: 'Prompt Engineering',        tag: 'PROMPTS' },
    { slug: 'evals',            title: 'AI Evals + Observability',  tag: 'EVALS' },
    { slug: 'multimodal',       title: 'Multimodal AI',             tag: 'MULTIMODAL' },
    { slug: 'safety',           title: 'AI Safety + Alignment',     tag: 'SAFETY' },
    { slug: 'voice',            title: 'Voice AI',                  tag: 'VOICE' },
    { slug: 'coding-agents',    title: 'AI Coding Agents',          tag: 'AGENTS' },
    { slug: 'computer-use',     title: 'Computer Use',              tag: 'COMPUTER' },
    { slug: 'ai-economics',     title: 'AI Economics',              tag: 'ECON' },
  ];

  // ========== DETECT CURRENT PAGE ==========
  // We detect by matching the URL's penultimate path segment to a slug.
  // Works equally for: cetiai.co/lookbook/langgraph/, /langgraph/, /langgraph/index.html.
  function detectCurrentIndex() {
    const path = window.location.pathname.replace(/\/$/, '').toLowerCase();
    // Match the trailing folder name (last non-empty segment, ignoring index.html)
    const segments = path.split('/').filter((s) => s && s !== 'index.html');
    const lastSeg = segments[segments.length - 1] || '';
    // If we're at root (path ends in /lookbook or empty), it's the index page (slug = '').
    if (lastSeg === '' || lastSeg === 'lookbook' || lastSeg === 'ceti-lookbook') return 0;
    const idx = PAGES.findIndex((p) => p.slug === lastSeg);
    return idx === -1 ? 0 : idx;
  }

  // ========== PATH HELPER ==========
  // All hrefs are RELATIVE so they work locally (file://) and deployed equally.
  // From a topic page (e.g., /langgraph/), to go to /mcp/ we need '../mcp/'.
  // From the index, we need './langgraph/'.
  function hrefFor(slug, currentIdx) {
    const isIndex = currentIdx === 0;
    if (slug === '') return isIndex ? '#' : '../';
    return isIndex ? `./${slug}/` : `../${slug}/`;
  }

  // ========== INJECT STYLES (scoped, prefixed) ==========
  const STYLES = `
    .ceti-nav {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: saturate(180%) blur(12px);
      -webkit-backdrop-filter: saturate(180%) blur(12px);
      border: 1px solid rgba(229, 223, 214, 0.9);
      border-radius: 999px;
      box-shadow: 0 4px 18px rgba(44, 42, 40, 0.08), 0 1px 3px rgba(44, 42, 40, 0.04);
      font-family: 'DM Sans', -apple-system, system-ui, sans-serif;
      font-size: 0.85rem;
      max-width: calc(100vw - 1.5rem);
      transition: opacity 300ms ease, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
      opacity: 0;
    }
    .ceti-nav.visible { opacity: 1; }
    .ceti-nav button, .ceti-nav a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      padding: 0 0.875rem;
      background: transparent;
      color: #2C2A28;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      font: inherit;
      text-decoration: none;
      transition: background 180ms ease, color 180ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .ceti-nav a:hover,
    .ceti-nav button:hover { background: #FDEEE9; color: #D94F30; }
    .ceti-nav a:focus-visible,
    .ceti-nav button:focus-visible { outline: 2px solid #D94F30; outline-offset: 2px; }
    .ceti-nav .ceti-counter {
      padding: 0 0.875rem;
      color: #6B6560;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      white-space: nowrap;
      cursor: default;
      pointer-events: none;
    }
    .ceti-nav .ceti-counter strong {
      color: #2C2A28;
      font-weight: 500;
    }
    .ceti-nav .ceti-divider {
      width: 1px;
      height: 18px;
      background: #E5DFD6;
      margin: 0 0.125rem;
      pointer-events: none;
    }
    .ceti-nav .ceti-icon {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem;
      line-height: 1;
    }
    .ceti-nav .ceti-disabled {
      color: #C4BDB4;
      cursor: not-allowed;
      pointer-events: none;
    }
    /* Dropdown trigger for the full index */
    .ceti-nav-menu {
      position: fixed;
      bottom: 5rem;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
      z-index: 998;
      background: #FFFFFF;
      border: 1px solid #E5DFD6;
      border-radius: 12px;
      box-shadow: 0 16px 48px rgba(44, 42, 40, 0.12);
      padding: 0.5rem;
      max-width: min(92vw, 380px);
      max-height: 60vh;
      overflow-y: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
      font-family: 'DM Sans', -apple-system, sans-serif;
    }
    .ceti-nav-menu.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }
    .ceti-nav-menu a {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      padding: 0.625rem 0.875rem;
      color: #2C2A28;
      text-decoration: none;
      border-radius: 8px;
      font-size: 0.9rem;
      min-height: 44px;
    }
    .ceti-nav-menu a:hover { background: #FDEEE9; color: #D94F30; }
    .ceti-nav-menu a.current { background: #FAF7F2; color: #D94F30; font-weight: 500; }
    .ceti-nav-menu a .ceti-menu-num {
      flex: 0 0 auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: #9E9790;
      width: 1.75rem;
    }
    .ceti-nav-menu a .ceti-menu-title { flex: 1; }
    .ceti-nav-menu a .ceti-menu-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #9E9790;
    }
    .ceti-nav-menu a.current .ceti-menu-tag,
    .ceti-nav-menu a.current .ceti-menu-num { color: #D94F30; }

    /* Reserve bottom padding so the nav never overlaps content */
    body { padding-bottom: 5.5rem !important; }

    /* Mobile tweaks */
    @media (max-width: 480px) {
      .ceti-nav {
        bottom: 0.75rem;
        gap: 0.125rem;
        padding: 0.375rem;
        font-size: 0.8rem;
      }
      .ceti-nav button, .ceti-nav a {
        padding: 0 0.625rem;
        min-width: 44px;
      }
      .ceti-nav .ceti-counter { padding: 0 0.5rem; font-size: 0.68rem; }
      .ceti-nav-menu { bottom: 4.5rem; max-width: calc(100vw - 1rem); }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .ceti-nav, .ceti-nav-menu, .ceti-nav button, .ceti-nav a { transition: none !important; }
    }

    /* Hide nav for printing */
    @media print { .ceti-nav, .ceti-nav-menu { display: none !important; } }
  `;

  // ========== BUILD + INJECT ==========
  function build() {
    const currentIdx = detectCurrentIndex();
    const current = PAGES[currentIdx];
    const prev = currentIdx > 0 ? PAGES[currentIdx - 1] : null;
    const next = currentIdx < PAGES.length - 1 ? PAGES[currentIdx + 1] : null;

    // Inject styles once
    if (!document.getElementById('ceti-nav-styles')) {
      const style = document.createElement('style');
      style.id = 'ceti-nav-styles';
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    // Build nav element
    const nav = document.createElement('nav');
    nav.className = 'ceti-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Lookbook page navigation');

    const prevEl = prev
      ? `<a href="${hrefFor(prev.slug, currentIdx)}" aria-label="Previous: ${prev.title}" title="← ${prev.title}"><span class="ceti-icon">←</span></a>`
      : `<button class="ceti-disabled" aria-disabled="true" tabindex="-1"><span class="ceti-icon">←</span></button>`;

    const nextEl = next
      ? `<a href="${hrefFor(next.slug, currentIdx)}" aria-label="Next: ${next.title}" title="${next.title} →"><span class="ceti-icon">→</span></a>`
      : `<button class="ceti-disabled" aria-disabled="true" tabindex="-1"><span class="ceti-icon">→</span></button>`;

    // Show "0 / 18" for the index, "1 / 18" through "18 / 18" for the topic pages
    const counter = currentIdx === 0
      ? `<span class="ceti-counter">INDEX · <strong>${PAGES.length - 1}</strong> PAGES</span>`
      : `<span class="ceti-counter"><strong>${currentIdx}</strong> / ${PAGES.length - 1} · ${current.tag}</span>`;

    const indexLink = currentIdx === 0
      ? `<button class="ceti-disabled" aria-disabled="true" tabindex="-1" title="You're on the index"><span class="ceti-icon">⊟</span></button>`
      : `<a href="${hrefFor('', currentIdx)}" aria-label="Back to lookbook index" title="Index"><span class="ceti-icon">⊟</span></a>`;

    nav.innerHTML = `
      ${prevEl}
      <span class="ceti-divider"></span>
      ${counter}
      <span class="ceti-divider"></span>
      <button class="ceti-menu-toggle" aria-label="Show all pages" aria-expanded="false" title="All pages"><span class="ceti-icon">≡</span></button>
      <span class="ceti-divider"></span>
      ${indexLink}
      <span class="ceti-divider"></span>
      ${nextEl}
    `;

    // Build dropdown menu (all pages)
    const menu = document.createElement('div');
    menu.className = 'ceti-nav-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = PAGES.map((page, i) => {
      const isCurrent = i === currentIdx;
      const num = String(i).padStart(2, '0');
      const href = hrefFor(page.slug, currentIdx);
      return `
        <a href="${href}" role="menuitem" class="${isCurrent ? 'current' : ''}" ${isCurrent ? 'aria-current="page"' : ''}>
          <span class="ceti-menu-num">${num}</span>
          <span class="ceti-menu-title">${page.title}</span>
          <span class="ceti-menu-tag">${page.tag}</span>
        </a>
      `;
    }).join('');

    document.body.appendChild(nav);
    document.body.appendChild(menu);

    // Reveal with a small delay so it doesn't compete with hero load
    setTimeout(() => nav.classList.add('visible'), 350);

    // Wire the menu toggle
    const toggle = nav.querySelector('.ceti-menu-toggle');
    let menuOpen = false;
    const setMenu = (open) => {
      menuOpen = open;
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenu(!menuOpen);
    });
    document.addEventListener('click', (e) => {
      if (menuOpen && !menu.contains(e.target) && !nav.contains(e.target)) setMenu(false);
    });

    // Keyboard nav: arrow keys + escape
    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (e.key === 'Escape' && menuOpen) { setMenu(false); return; }
      if (e.key === 'ArrowLeft' && prev) { window.location.href = hrefFor(prev.slug, currentIdx); }
      if (e.key === 'ArrowRight' && next) { window.location.href = hrefFor(next.slug, currentIdx); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
