# CageScale — agent instructions

Instructions for **Cursor Cloud Agents**, local Agent, and subagents working in [fedo/cagescale](https://github.com/fedo/cagescale).

## Before you change code

1. Read **[PRODUCT.md](PRODUCT.md)** — intent, scope, and UX rules that are easy to miss (dual units, no champ labels, accordion behaviour).
2. Read **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — layers, routes, where data lives.
3. Skim **[docs/DECISIONS.md](docs/DECISIONS.md)** — do not revert accepted decisions without a new log entry.

## Project skill (autoload)

This repo ships a Cursor skill:

- **Path:** [`.cursor/skills/cagescale/SKILL.md`](.cursor/skills/cagescale/SKILL.md)
- **When:** Any CageScale feature work, data seed updates, UI changes, or docs that affect product behaviour.

If the skill is available in your environment, **read and follow it** at the start of the task.

## Rules (autoload)

Cursor should apply:

- [`.cursor/rules/cagescale.mdc`](.cursor/rules/cagescale.mdc) — global conventions (always apply)
- [`.cursor/rules/cagescale-data.mdc`](.cursor/rules/cagescale-data.mdc) — when editing fighter/weight-class entity files

## Git (Cloud Agent)

- Branch prefix: `cursor/<descriptive-name>-eee6`
- Commit and push incrementally; `main` is deployable (Vercel).
- Push: `git push -u origin <branch>` (retry on transient network errors).

## Commands

```bash
npm install
npm run dev      # local dev
npm run build    # required check before finishing
npm run lint     # oxlint
```

Optional (install Playwright locally): `node scripts/smoke.mjs`

## UX invariants (do not break)

- **Weights:** Always show **kg and lb**; header unit controls which is **first and bold**.
- **Heights:** Always **cm / ft'in"**.
- **No Champ/Interim** badges or “current titleholder” copy in champion lists.
- **Gender** filter via header only on Divisions / My Weight.
- **Fighter photos:** Prefer `FighterPhoto`; files under `public/fighters_images/{id}.*`.
- **Mobile-first:** touch targets (especially bottom tabs) stay large.

## Adding or updating fighters

1. `src/entities/fighter/model/data.ts` — profile, record, timelines.
2. `src/entities/fighter/model/fighter-heights.ts` — height cm (required).
3. `src/entities/weight-class/model/champions.ts` — if a recent champion.
4. Optional: `public/fighters_images/{slug}.webp`
5. Run `npm run build`.

## Documentation duty

For non-trivial product or architecture choices, append a dated entry to **[docs/DECISIONS.md](docs/DECISIONS.md)**.

## Deploy

Production: Vercel from `main`. Do not add SSR unless DECISIONS log and PRODUCT scope change.
