# ivan.darma — portfolio

Personal portfolio of **Ivan Darma Saputra** (junior developer, Tangerang, ID).
Editorial-playful pastel theme with scroll-driven animations: a self-drawing
S-curve "journey" path, a pinned curved 3D project carousel, sticky process
panels, marquees and line-mask reveals.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
[Motion](https://motion.dev) (`motion/react`) · [Lenis](https://github.com/darkroomengineering/lenis) smooth scroll.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

**Every text on the site lives in [`src/lib/content.ts`](src/lib/content.ts).**
Components never hardcode copy. Identity, about, skills ("the path"), process
and FAQ are filled from the real CV; to change anything, edit that one file.

- `works` — project cards. Currently **blank on purpose**: each entry renders
  as an empty labelled slot in the carousel. Fill `title`, `category`, `role`,
  `status`, `year`, `summary` (and optional `url`) and the cards light up.
- `testimonials` — empty array hides the whole section; add entries to show it.
- `profile.photo` — the portrait in `public/img/profile.jpg`.

Palette and keyframes live in [`src/app/globals.css`](src/app/globals.css)
(CSS variables + Tailwind v4 `@theme`).

## Accessibility & motion

- `prefers-reduced-motion`: Lenis is disabled, the path renders fully drawn,
  the carousel becomes a horizontal snap scroller, reveals are instant and
  marquees stop.
- Skip link, focus-visible outlines, aria labels on nav/carousel/accordion,
  live region for the project counter, AA contrast on the pastel palette.

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. On [vercel.com/new](https://vercel.com/new) import that repository —
   Vercel auto-detects Next.js; no environment variables are required.
3. Deploy. Every push to `main` redeploys automatically.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```
