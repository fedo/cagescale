# CageScale — Product recap

Mobile-first web app to **review, track, and visualise UFC weight classes**, recent champions, fighter context, and where a user’s walk-around weight fits in the ladder.

This document captures requirements and product ideas from the initial concept through iterative refinement (Oct 2025–2026).

---

## Core user jobs

1. **See all UFC divisions** in one scrollable view with limits and recent title history.
2. **Open a fighter** from a champion entry and read record, divisions, ranking history, and weight-class moves.
3. **Enter body weight** and see the matching division, neighbours above/below, and rough bulk/cut/dehydration ranges (education only, not medical advice).

---

## Initial requirements (v0 vision)

- **One page**: all weight classes (men’s and women’s).
- Under each class: **last N champions** (photo, name, **year of first taking the belt**).
- Photo links to **fighter profile** with:
  - Weight-class **chips**
  - **Wins / losses / draws** (and NC when applicable)
  - **Ranking timeline** — collapsed by default
  - **Weight-class changes** — expanded by default
- **My Weight** page: type weight in **kg or lb**, always show **both units** everywhere.
- Show **your class**, **one above**, **one below**, with limits in kg/lb.
- **Approximate** bulking, fat-loss, and fight-week dehydration estimates.

### Data strategy (chosen)

- **Curated static JSON** in the repo (no live sports API).
- Seed from **UFC.com** weight-class explainer, athlete pages, and **Wikipedia title lineages** (researched, Oct 2026 snapshot).
- **Last 5 champions** per division (`RECENT_CHAMPIONS_COUNT`).

### Stack (chosen)

- **Vite + React + TypeScript**
- **TanStack Router** (file routes) + **TanStack Query** (async-shaped static loaders)
- **Tailwind v4** + **shadcn-style** primitives
- **Bulletproof / feature-sliced** layout: `app`, `pages`, `features`, `entities`, `shared`

---

## Iterations (what changed after v0)

### Navigation & chrome

- **Fixed top header** with CageScale branding.
- **Men / Women** switch on the **same row as the title** (top right), shared across Divisions and My Weight.
- **kg / lb** switch **below** Men/Women, same width; **primary unit first and bold**, secondary muted (always both shown).
- **Bottom nav** as **wide tab-like targets** with icons: **Layers** (Divisions), **Scale** (My Weight).

### Divisions list

- Filter divisions by header **gender** (no per-row Men/Women label).
- **Collapsible champions** per division (accordion: **one open at a time**):
  - **Collapsed**: truncated **one-liner** (names, first belt year, height).
  - **Expanded**: horizontal **photo cards** (same as early design).
- **Expanded row**: darker **muted background** highlight.
- Class **limit on the same line** as the division name, **right-aligned before chevron**.
- Removed **Champ / Interim** badges and one-liner tags so UI does not imply **current** titleholders (avoids stale “who holds the belt” labels).
- **Vacant** badge retained on divisions with no current champion in seed data (can remove later if desired).

### My Weight

- **Your class** and **Estimates** use **3-column** layouts (Above | You | Below; Bulk | Cut | Dehydrate).
- Gender for ladder comes from **header Men/Women** (not a duplicate control on the page).
- Input unit follows header **kg/lb** toggle.

### Fighter profile

- **Compact record grid**: up to **4 columns** on small screens (W/L/D/NC).
- **Percentage** under each label (same small type, slightly darker than label).
- **Listed height** on profile and champion surfaces (`cm / ft'in"`).

### Media

- Optional real photos: `public/fighters_images/{fighter-id}.webp` (falls back through jpg/jpeg/png, then **initials placeholder**).

### Deploy

- **Vercel** as Vite SPA with `vercel.json` rewrites for client routes.

---

## Non-goals (for now)

- Live UFC API, paywalled stats feeds, or automatic title updates.
- User accounts, saved weights, or notifications.
- Medical or coaching prescriptions; estimates are **heuristic copy** only.

---

## Success criteria

- Works on **narrow mobile** viewports first; readable without horizontal scroll except champion carousels.
- Deep links work on Vercel: `/`, `/weight-finder`, `/fighters/:id`.
- Adding a fighter or photo is **data + optional file** without routing changes.
- Agents and humans can extend the app using **ARCHITECTURE.md** and **DECISIONS.md** without reverse-engineering chat history.

---

## Related docs

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — code structure and data flow
- [docs/DECISIONS.md](docs/DECISIONS.md) — decision log
- [AGENTS.md](AGENTS.md) — how Cursor agents should work in this repo
