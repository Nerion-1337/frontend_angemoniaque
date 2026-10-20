---
title: Guilde (UI) : toggle d'insertion + drag & drop des rangs (Gestion)
slug: guild-ranks-insert-dnd
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/styles.css
symbols:
  - src/lib/guild.js:dropRankRow
  - src/lib/guild.js:insertRankTarget
  - src/components/Guild.jsx:Manage
tests:
  - test/guild.test.js
---
## Purpose
Evolution of the "Rangs & privilèges" manage section: (1) a **toggle switch on the add-rank card** chooses whether a newly created rank is inserted **above** the add card (default) or **below** it, with the target order persisted at creation time; (2) **drag & drop** reordering (press and glide) complements the existing ↑/↓ arrows — with reduced opacity on the dragged card, a golden insertion line at the target position, and no drag starting from the card's inner inputs/buttons.

## How it works
All in `src/components/Guild.jsx` (Manage tab) with pure helpers in `src/lib/guild.js`:
- **Toggle** (`below` state, default `false` = insertion au-dessus): a styled switch (`.tgl`/`.trk` + `.knob` in `styles.css`) sits in the add card's **right action group** (`.aacts` = toggle + up/down arrows, i.e. next to the other action buttons; the grid `1fr auto 1fr` still keeps the `+` circle centered, first child an empty spacer span). Its label carries `onClick={e => e.stopPropagation()}` so a toggle click acts like the card's other buttons — contained: it flips `below` but **never** opens the create modal (only the card body / `+` do). On create, `NewRankModal` calls `onCreated` → `afterCreate` in `Manage`: the API always creates the rank at the end (`sort_order = max+1`), then `insertRankTarget(prevIds, addPos, newId, below)` computes the target full order — new rank at display position `addPos` (au-dessus) or `addPos+1` (en dessous) — and `POST /guilds/reorder` (`kind: 'ranks'`) is called only when that order differs from the current one (dense `sort_order` reindex, one tx on the back). The add card's own position stays local (`addPos`).
- **Drag & drop** (pointer events, no dependency): `onPointerDown` on a card registers a pending drag (`setPointerCapture`); the drag **arms** after 8 px of vertical movement (plain clicks are preserved). `dropIndex(y)` measures the card rects (`rowRefs`) to get the target insertion index; during the move the dragged card gets `.rkdr` (opacity .45 + dashed outline) and an absolutely-positioned golden line (`.inl`, `top` from measured row edges, inside the `position:relative` `.form.ranks` container) marks the insertion point. On release, `dropRankRow(ids, addPos, from, to)` (pure) recomputes the ranks order + new `addPos`, and the same persist path as the arrows runs (`/guilds/reorder` when the ranks order actually changed; add-card-only moves persist nothing).
- **Arrows kept** (`moveRow`/`moveRankRow`, unchanged).
- **Safety guards**: `dragStart` returns immediately if `e.target.closest('button,input,select,label,a,textarea')` (rename input, "Renommer", arrows, toggle, permission checkboxes — none may start a drag); `touch-action:none` on `.rcard/.radd` makes the gesture work on touch (mobile later); a `justDrag` ref swallows the synthetic click that follows a drag so gliding the add card does not open the modal. Clicks follow the same containment: the toggle's `stopPropagation` means only the card body/`+` area opens the create modal.

## Entry points
- `Guild.jsx:Manage` — the only consumer; `afterCreate` is passed to `NewRankModal` as `onCreated`.
- `src/lib/guild.js:insertRankTarget(ids, addPos, newId, below)` / `:dropRankRow(ids, addPos, from, to)` — import anywhere to build/mutate the ranks display list (pure, unit-tested).
- API: `POST /guilds/reorder` (`kind: 'ranks'`) + `POST /guilds/ranks` (create) — no backend change for this feature (see back card `guild-ranks-order`).

## Data flow
- Toggle + create: modal submit → `POST /guilds/ranks` (end of list) → refetch → `insertRankTarget` (target order from `addPos` + `below`) → `POST /guilds/reorder` when it differs → `load()` → cards re-render with the new rank above/below the add card as toggled.
- Drag: pointerdown → (8 px) drag state → pointermove: `dropIndex` + insertion line y (measured) → pointerup: `dropRankRow` → persist when the ranks order changed → `load()`.

## Tests
- `test/guild.test.js` (pure vitest): `dropRankRow` (drag first row to the bottom with the add card trailing; dragging the add card up keeps ranks order and moves `addPos`; drop under self is a no-op) and `insertRankTarget` (default au-dessus with the add card last = end of list, no reorder; au-dessus with the add card moved up = mid-list insertion; en dessous with the add card last = end of list so the add card renders before the new rank; en dessous with the add card mid-list = rank just after it).
- The create-then-reorder sequence is covered end-to-end on the API side by `back/test/integration/guild-ranks-order.test.ts` (« séquence front (toggle) » test). Pointer interactions themselves are not DOM-tested in this repo (no jsdom/testing-library, no new deps).

## Gotchas
- **No backend change on purpose**: creation always lands at the end (`max+1`); the toggle only decides the follow-up `/guilds/reorder` target order. A "Sentinelle" created afterwards still lands at the end — the front then re-persists the order per the current toggle/addPos.
- The insertion line is positioned with `getBoundingClientRect` on every move (no `scrollIntoView`/layout reflow) — the container must stay `position:relative` and the `.inl` `pointer-events:none`.
- `justDrag` swallows exactly one click right after a drag (cleared on a `setTimeout 0`) — a real tap on the add card after a drag still opens the modal.
- `touch-action:none` on the rank cards disables touch-scrolling that starts on a card; the manage list is short and the modal body scrolls from the headers — acceptable trade-off documented for the mobile pass.
- `dropIndex` uses row midpoints, so hovering the top half of row j targets "before j" and the bottom half targets "after j" — matches the arrows' semantics (and the 8 px arm threshold means a tap never reorders).
