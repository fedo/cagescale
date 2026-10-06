---
name: cagescale
description: Work on the CageScale UFC weight-classes Vite app — static data, mobile UI, dual units, fighter photos, TanStack Router/Query. Use when editing this repo, adding fighters/champions, changing Divisions or My Weight pages, Vercel deploy, or when the user mentions CageScale, UFC weight classes, or cagescale GitHub.
---

# CageScale skill

## Read first

1. [PRODUCT.md](../../../PRODUCT.md) — requirements and iteration history
2. [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) — folder layers and data flow
3. [docs/DECISIONS.md](../../../docs/DECISIONS.md) — accepted decisions

## Stack (do not swap casually)

- Vite + React + TypeScript
- TanStack Router (`src/pages/`) + TanStack Query
- Tailwind v4, shadcn-style components in `src/shared/ui/`
- Static curated data in `src/entities/` — no live UFC API unless DECISIONS log says otherwise

## Implementation checklist

### UI change

- Match existing patterns in `features/` and `shared/ui/`
- Preserve header: fixed top, Men/Women + kg/lb switches on Divisions and My Weight
- Bottom nav: tab-like, icons (`Layers`, `Scale`)
- Use `DualWeight` / `DualWeightFromLb` for limits; `FighterHeight` / `formatHeightDual` for height
- Use `FighterPhoto` for portraits (not raw `imageUrl` on `<img>`)

### Data change

- Fighter id = URL slug = photo basename (kebab-case)
- Update `fighter-heights.ts` for every new fighter id
- Champion rows: `champions.ts` — historical years only; do not add Champ/Interim UI
- Research sources: UFC.com, Wikipedia list of champions — note snapshot in commit message if bulk update

### Verify

```bash
npm run build
```

Optional: `node scripts/smoke.mjs` if Playwright is installed.

## File map (quick)

| Task | Location |
|------|-----------|
| Division list / accordion | `features/weight-classes/`, `pages/index.tsx` |
| My Weight | `features/weight-finder/`, `pages/weight-finder.tsx` |
| Fighter profile | `features/fighter-profile/`, `pages/fighters.$fighterId.tsx` |
| Shell / nav | `shared/ui/app-shell.tsx`, `header-controls.tsx` |
| Gender / unit | `app/providers/gender-provider.tsx`, `weight-unit-provider.tsx` |
| Champion count | `entities/weight-class/model/constants.ts` |

## Agent output

- Prefer small, focused diffs
- After behaviour changes, update PRODUCT.md or DECISIONS.md if user-visible rules changed
- Commit messages: complete sentences, what and why
