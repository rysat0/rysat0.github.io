# PortFolio — Ryuu Leonardo Sato (rysato)

A dark, neon-accented personal portfolio for **Ryuu Leonardo Sato** (Leonardo) —
Brazilian-Japanese software engineer and CTO of StepAI, Inc.

Single-page, bilingual (EN / 日本語), with a WebGL shader hero, scroll-reveal
sections, and a fully static build deployable to **GitHub Pages**.

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (dark theme, neon-green accent)
- **three.js** — colorful WebGL shader hero (code-split, lazy-loaded)
- **anime.js** — hero entrance animation
- **motion** (Framer Motion) — scroll reveals
- All motion respects `prefers-reduced-motion`

## Local development

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
npm run lint       # eslint
```

## Content

All copy lives in typed, bilingual data files — no hard-coded strings in the UI:

- `src/data/profile.ts` — bio, expertise, contact, "What's 42?"
- `src/data/projects.ts` — projects (with optional external links)
- `src/i18n/dictionary.ts` — UI chrome strings (EN / JA)

Edit those files to update the site; the language toggle in the navbar switches
between English and Japanese (persisted to `localStorage`, syncs `<html lang>`).

## Deployment (GitHub Pages, user page)

This project is configured for the **user page** `rysat0.github.io`
(`base: '/'` in `vite.config.ts`).

1. Create/use a repository named **`rysat0.github.io`** and push this code to the
   `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source = "GitHub
   Actions"**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the app
   and publishes `dist/` to GitHub Pages. The site goes live at
   `https://rysat0.github.io/`.

> Deploying to a **project page** (`rysat0.github.io/<repo>/`) instead would
> require setting `base: '/<repo>/'` in `vite.config.ts`.
