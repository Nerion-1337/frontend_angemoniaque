---
title: Guilde (UI) : section Rangs & privilèges (titre centré, carte ajout, réorganisation, label Chef éditable)
slug: guild-ranks-manage
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/styles.css
symbols:
  - src/lib/guild.js:displayRanks
  - src/lib/guild.js:moveRankRow
  - src/components/Guild.jsx:Manage
  - src/components/Guild.jsx:Arrows
tests:
  - test/guild.test.js
---
## Purpose
Front half of the "Rangs & privilèges" revamp in the manage tab (leader only): the section title is centered and larger; the inline "create rank" form is replaced by an **add-rank placeholder card** (dashed border, subtle background, big `+` inside a bordered circle) that opens `NewRankModal` and sits **last** in the list by default; every rank card and the add card carry ↑/↓ arrows that reorder the list, persisting the ranks order through `POST /guilds/reorder` (`kind: 'ranks'`); the rename pencil is now available on the **Chef card too** (the label is editable — only the permissions grid stays locked, `is_leader` rows).

## How it works
All in `src/components/Guild.jsx` (manage tab of `GuildModal`) with pure helpers in `src/lib/guild.js`:
- `displayRanks(ids, addPos)` — display list = rank ids with the ADD sentinel inserted at `addPos` (default: last). `moveRankRow(ids, addPos, i, dir)` — swaps display row `i` with `i+dir` and returns `{ ids (new ranks order, ADD removed), addPos }` (pure; unit-tested).
- `Manage`: `rows = displayRanks(g.ranks.map(r => r.id), addPos)`, `addPos` is **local session state** (resets to "last" on tab remount). `moveRow(i, dir)`: when the swap changes the ranks order (`ids.join()` differs) it calls `POST /guilds/reorder` {kind: 'ranks', ids} then `load()`; when only the ADD card moved, nothing is sent (its position is not a persisted rank property — documented choice).
- **Evolved further** (see card `guild-ranks-insert-dnd`): the add card carries an **insertion toggle** (au-dessus by default / en dessous) that persists the target order right after a rank is created, and every card (ranks + add) supports **press-and-glide drag & drop** (8 px arm threshold, dragged card at opacity .45, golden insertion line) with the same persist path; the ↑/↓ arrows are kept alongside.
- Add card (`div.item.radd`, `onClick` opens `NewRankModal`): grid `1fr auto 1fr` (invisible spacer / `.plus` circle / arrows `justify-self:end`) so the `+` is exactly centered; `58px` circle, `2px` halo border, `50%` radius, `26px` `Plus` icon at `strokeWidth 2.5`. Card shares dimensions with rank cards: same 100% width, shared `min-height: 150px` (`.rcard,.radd{min-height:150px}`) and `.item` radius.
- Rank cards: header row = name + (Chef pill when `is_leader`) + rename pencil (**always shown now, including the Chef card**) + `Arrows`. Pencil switches the header to an inline input + "Renommer" button → `POST /guilds/ranks/{id}/rename` (success → close + `load()`; error → toast, input kept).
- `Arrows({ i, len, onMove })` — ↑/↓ (`ChevronUp`/`ChevronDown`), disabled at list bounds, `stopPropagation` (they live inside the clickable add card).
- CSS: `.rhead` (centered, `1.4rem`, serif), `.radd` (dashed halo border, subtle gold background, hover), `.ranks{align-items:stretch}` — appended block in `src/styles.css`.

## Entry points
- `Guild.jsx:Manage` / `:Arrows` — manage tab cards (rendered when `g.me.leader`).
- `src/lib/guild.js:displayRanks` / `:moveRankRow` — import anywhere to build/mutate the ranks display list (pure; the only place the ADD sentinel lives).
- API: `POST /guilds/reorder` (`kind: 'ranks'`, leader-only — see back card `guild-ranks-order`), `POST /guilds/ranks/{id}/rename` (now allowed on the leader rank), `POST /guilds/ranks` (create, lands last).

## Cross-references
- Later evolution of the manage section: the **default rank for newcomers** (single-choice radio, `POST /guilds/default-rank`) — card `guild-default-rank-ui`.

## Data flow
- Arrow → `moveRankRow` → new ids → `POST /guilds/reorder` {kind:'ranks', ids} → tx writes `sort_order=index` → `load()` → `GET /guilds/{me.id}` returns ranks ordered by `sort_order, id` → cards re-render. New rank creation: API assigns `sort_order = max+1` → appears just before the add card (which re-anchors itself at the end on the next `load()` because `addPos` is session-local).

## Tests
- `test/guild.test.js` (pure vitest): `displayRanks` default-last and mid-insertion; `moveRankRow` rank swap (persistable order changes, ADD follows), ADD-only move (ranks order unchanged, `addPos` moves), bound no-ops. API side covered by `back/test/integration/guild-ranks-order.test.ts`; card interactions (clicks) are not DOM-tested in this repo.

## Gotchas
- The **add card position is not persisted** (session state, default last). If the user moves it up, refresh/tab-switch sends it back to last — by design (there is no schema property for it); persistence exists only for ranks order.
- `moveRow` sends the API call **only** when the ranks order actually changed; the `ids.join() !== ids.join()` comparison is on display-extracted ids (ADD removed) — do not compare with the old `ids` (pre-swap) when ADD moved: both sides already exclude ADD.
- The add card is a clickable `<div>` (not a `<button>`) containing real `<button>`s (`.plus`, arrows) — nested buttons would be invalid HTML; keep the div + `stopPropagation` on arrows.
- The Chef card still disables its 4 permission checkboxes (`is_leader` → all rights, structure-level lock per the revamp spec); only the label became editable.
- `.radd` uses `grid-template-columns:1fr auto 1fr` — the first child must stay the invisible `<span />` spacer or the `+` is no longer centered.
