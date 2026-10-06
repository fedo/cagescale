# CageScale

Mobile-first web app to review UFC weight classes, recent champions, fighter profiles, and where your walk-around weight fits.

## Documentation

| Doc | Purpose |
|-----|---------|
| [PRODUCT.md](PRODUCT.md) | Requirements and product iteration recap |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Code structure, routes, data flow |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Decision log (ADR-style) |
| [AGENTS.md](AGENTS.md) | Cursor agent workflow + autowiring |
| [.cursor/skills/cagescale/SKILL.md](.cursor/skills/cagescale/SKILL.md) | Project skill for agents |

## Stack

- Vite + React + TypeScript
- TanStack Router (file routes in `src/pages`)
- TanStack Query
- Tailwind CSS v4 + shadcn-style primitives in `src/shared/ui`
- Feature-sliced / bulletproof-style layout (`app`, `pages`, `features`, `entities`, `shared`)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy on Vercel

This is a Vite SPA. `vercel.json` sets:

- Framework: Vite (`build` → `dist`)
- SPA rewrites so deep links (`/fighters/:id`, `/weight-finder`) resolve to `index.html`

Import the GitHub repo at [vercel.com/new](https://vercel.com/new) or:

```bash
npx vercel
```

See [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite).

## Data

Curated static seed (no live API). Sources researched Oct 2026:

- [UFC.com — Understanding UFC Weight Classes](https://www.ufc.com/news/understanding-ufc-weight-classes-and-weigh-ins)
- [UFC.com athletes / titleholders](https://www.ufc.com/athletes)
- [Wikipedia — List of UFC champions](https://en.wikipedia.org/wiki/List_of_UFC_champions)

Champion photos: drop files in [`public/fighters_images/`](public/fighters_images/) named `{fighter-id}.webp` (also tries `.jpg`, `.jpeg`, `.png`). Missing files fall back to UI Avatars initials. Example: `joshua-van.webp`.

`RECENT_CHAMPIONS_COUNT` in `src/entities/weight-class/model/constants.ts` controls how many champions appear under each class (default **5**).

## Notes

- Weights are always displayed in **kg and lb**.
- Bulking / cutting / dehydration figures on My Weight are approximate educational heuristics, not medical advice.
- Heavyweight current listing follows UFC.com’s Ciryl Gane titleholder treatment (interim lineage also seeded via Tom Aspinall / Jon Jones).
