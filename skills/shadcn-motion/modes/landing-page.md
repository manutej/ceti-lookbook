# Mode: landing-page

Produces a single hero-driven page meant to WOW visitors and convert them. One `.html` file or `.tsx` page.

## When to use

- User asks for a "landing page", "marketing page", "hero section", "product page"
- Proposal decks that need to live online (e.g., client proposals at `cetiai.co/{client-slug}`)
- Pitch pages for tools, courses, or services

## Anatomy

A landing page has a fixed sequence of acts. Don't reinvent it.

| Act | Purpose | Motion choice |
|---|---|---|
| **1. Hero** | One sentence that earns 10 seconds of attention | Hero text reveal + magnetic CTA |
| **2. Proof** | Numbers, logos, or one bold statement | Number ticker + animated logo strip (Kibo Marquee) |
| **3. Mechanism** | How it actually works | Sticky scroll reveal (3 steps) OR Bento grid |
| **4. Outcomes** | Before/after, what it produces | Image comparison OR 3D tilt cards showing results |
| **5. Author/Team** | Why trust you | Magnetic profile cards + brief credentials |
| **6. CTA** | One unmissable action | Large magnetic button + 1 secondary contact |

## Above-the-fold rules

- Hero text resolves within **1.5 seconds** of page load (including the reveal animation)
- ONE primary CTA, ONE secondary CTA — never more
- LCP element (the headline or hero image) must be visible without scrolling at 1440×900
- No autoplay video above the fold (Lottie OK if ≤ 200KB)
- Page weight to first paint: ≤ 100KB CSS + JS (excluding fonts)

## Template structure (single-file HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Standard head from single-file-html mode -->
</head>
<body>
  <!-- ACT 1: HERO -->
  <section class="hero">
    <h1 class="hero-title">
      <span>The</span> <span>fastest</span> <span>way</span> <span>to</span> <span>{value-prop}.</span>
    </h1>
    <p class="hero-sub">One-sentence elaboration that earns the next 30 seconds.</p>
    <div class="cta-row">
      <button class="magnetic primary">Start now</button>
      <a class="secondary" href="#proof">See how it works ↓</a>
    </div>
  </section>

  <!-- ACT 2: PROOF -->
  <section class="proof" id="proof">
    <div class="stat-row stagger">
      <div class="stat animate-in">
        <span class="num" data-to="5000">0</span>
        <p>Professionals trained</p>
      </div>
      <div class="stat animate-in">
        <span class="num" data-to="100">0</span><span>+</span>
        <p>Organizations</p>
      </div>
      <div class="stat animate-in">
        <span class="num" data-to="20">0</span>
        <p>Countries</p>
      </div>
    </div>
  </section>

  <!-- ACT 3: MECHANISM (3-step sticky scroll OR bento) -->
  <section class="mechanism">
    <!-- pinned scroll OR bento grid -->
  </section>

  <!-- ACT 4: OUTCOMES -->
  <section class="outcomes">
    <!-- 3D tilt cards showing results -->
  </section>

  <!-- ACT 5: AUTHOR -->
  <section class="author">
    <!-- magnetic profile card -->
  </section>

  <!-- ACT 6: CTA -->
  <section class="final-cta">
    <h2>Ready to start?</h2>
    <button class="magnetic primary large">Book a 30-minute conversation</button>
    <p class="contact-row"><a href="mailto:...">email</a> · <a href="...">whatsapp</a></p>
  </section>

  <!-- standard reveal script + magnetic button JS + number ticker JS -->
</body>
</html>
```

## Specific components per act

- Act 1 hero text → `component-catalog-v1.md#hero-text-reveal`
- Act 2 numbers → `component-catalog-v1.md#number-ticker`
- Act 3 sticky scroll → `component-catalog-v1.md#sticky-scroll-reveal`
- Act 3 bento (alternative) → `component-catalog-v1.md#bento-grid`
- Act 4 tilt cards → `component-catalog-v1.md#3d-tilt-card`
- Act 6 magnetic CTA → `component-catalog-v1.md#magnetic-button`

## Hard rules

- [ ] One primary CTA, one secondary CTA above the fold. Never more.
- [ ] Hero text fully revealed within 1.5s of load
- [ ] No purple/pink hero gradient (use warm cream + accent + texture)
- [ ] No autoplay video above the fold
- [ ] Total page weight ≤ 300KB (excluding Google Fonts)
- [ ] Mobile portrait (375px): hero is readable, primary CTA fits within viewport, no horizontal scroll
- [ ] If proposal/client-confidential: include "Confidential" mark in nav
- [ ] CETI standard contacts (Calendly, WhatsApp, email) on every CTA section
