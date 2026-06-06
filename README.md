# Pyrolux Gallery

**Where Fire Meets The Stars** — A premium celestial Art Nouveau artist portfolio.

## Stack

- React 19 + TypeScript
- Vite 5
- Tailwind CSS 3
- Cormorant Garamond · Cinzel Decorative · Cinzel (Google Fonts)

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
/index.html                         — App entry point
/src/
  main.tsx                          — React root mount
  App.tsx                           — Root component, theme state, section tracking
  styles/
    global.css                      — CSS variables, animations, utility classes
  components/
    sections/
      Hero.tsx                      — Animated star canvas, headline, CTAs
      Navigation.tsx                — Floating nav, mobile slide-out, section dots
      Commissions.tsx               — Expandable service panels + inquiry modal
      Studies.tsx                   — Catalogue grid with filter + artwork modal
      Library.tsx                   — Accordion archive drawers by collection
      About.tsx                     — Artist statement, philosophy, contact CTA
    ui-custom/
      Ornaments.tsx                 — SVG Art Nouveau ornaments, PyroluxLogo, MoonPhase
  data/
    gallery.ts                      — Artwork entries, collections, service definitions
  lib/
    utils.ts                        — cn() Tailwind class utility
  assets/                           — Place artwork images here (jpg/png/webp)
```

## Adding Your Artwork

Replace the placeholder gradient strings in `src/data/gallery.ts`:

```ts
// Before (placeholder)
placeholder: "linear-gradient(135deg, #0a0f2e 0%, #1a2a4a 100%)",

// After (your image)
placeholder: "url('/src/assets/your-artwork.jpg')",
```

Set `background-size: cover` on the artwork card div in `Studies.tsx` if needed.

## Theme

Toggle between **Dark Mode** (deep space) and **Light Mode** (celestial blue & gold)
using the ☀ / ☽ button in the navigation bar.

## Fonts

Loaded via Google Fonts CDN in `global.css`. No local font files required.
For offline use, download and self-host via `@font-face`.

## License

All design, code, and branding © Pyrolux. All rights reserved.
