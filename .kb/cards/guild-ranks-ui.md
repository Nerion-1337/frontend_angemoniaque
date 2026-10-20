---
title: Guilde (UI) : dernier Chef, renommage des rangs, création de rang en modale
slug: guild-ranks-ui
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
symbols:
  - src/lib/guild.js:lastChef
  - src/components/Guild.jsx:Manage
  - src/components/Guild.jsx:NewRankModal
tests:
  - test/guild.test.js
---
## Purpose
Front half of the guild-rank feature: the guild modal (Manage tab, Chef only) creates ranks through a small "+" icon that opens a dedicated `NewRankModal` instead of the old inline form, offers a pencil icon to rename each rank (calls `POST /guilds/ranks/{id}/rename`), and mirrors the backend integrity rule so the UI blocks the useless gestures. Note: the manage section it describes (v1: inline header + create modal) has since been redesigned — see card `guild-ranks-manage` (v2: centered title, add-rank placeholder card, up/down reordering, Chef label editable). — the last Chef cannot click "Quitter la guilde" nor change their own rank via the Members `<select>`.

## How it works
- `src/lib/guild.js:lastChef(g)` — pure helper, mirror of `back/src/routes/guilds.ts`: true when `g.me.leader` is true and exactly one member holds a rank with `is_leader` (i.e. `me` is the only Chef). `g` is the payload of `GET /guilds/{me.id}` (`{ me: { leader, rank, permissions }, ranks: [{id, name, is_leader, permissions}], members: [{id, rank_id, …}] }`).
- `Guild.jsx` (all sub-components of `GuildModal`, opened via the `game` slice `panel === 'guild'`):
  - `Pres`: the "Quitter la guilde" danger button is replaced by the hint "Le dernier Chef ne peut pas quitter la guilde tant qu'un autre membre n'a pas ce rang." when `lastChef(g)`; the button also carries the leave flow (`/guilds/leave` → `reload()` re-fetches guild state + `useRefreshMe()`).
  - `Members`: the per-member rank `<select>` (only rendered with `P.assign_ranks`) is `disabled` with a title hint on **own** row when `lastChef(g)` — the backend returns the 409 anyway (`useDo` toasts it), this just prevents the dead gesture.
  - `Manage` (Manage tab, only when `g.me.leader`) — v1: a `+` icon button in the section header opened `NewRankModal`; each rank row: `<b>name</b>` on the left; on the right the "Chef — tous les droits" pill for the leader rank or a `Pencil` icon opening an inline rename row (input + "Renommer" button → `saveRename(r)` → `POST /guilds/ranks/{r.id}/rename` → close + `load()`). **v2 (current)**: the section was redesigned — centered `1.4rem` title, the create entry point is an **add-rank placeholder card** (dashed border, big `+` inside a bordered circle, last by default) instead of the header button, every card (ranks + add card) has ↑/↓ arrows persisting order via `POST /guilds/reorder` (`kind: 'ranks'`), and the pencil is available on the **Chef card too**. See card `guild-ranks-manage` for the current code.
  - `NewRankModal`: nested `Modal` (both portal to `<body>`, same `.modal` z-index, DOM order stacks it above the guild modal) with the name input (2–24 chars, button disabled below 2) + the 4 permission checkboxes, submit → `POST /guilds/ranks` → close + `load()`.
- Errors never dismiss the modals: `useDo` catches and toasts (`A.toast`), success callback runs `after` only.

## Entry points
- `front/src/components/Guild.jsx:Manage` / `:NewRankModal` — the "+" modal + rename UI (Manage tab of `GuildModal`).
- `front/src/lib/guild.js:lastChef` — import it in any component that shows a leave/demotion control (used by `Pres` and `Members`).
- API: `POST /guilds/ranks/{id}/rename` (back `src/routes/guilds.ts`) is the only new endpoint; `POST /guilds/ranks` and `POST /guilds/members/rank` are unchanged.

## Data flow
- `GuildModal.load()` → `GET /guilds/{me.id}` → `g` state → all tabs re-render from it; every successful mutation calls `load()` (Manage) or `reload()` (leave: `load()` + `useRefreshMe()` so the top-bar character badge updates).
- Rename flow: pencil → local `ren`/`rname` state → API call → `setRen(null)` + `load()`; the renamed name then flows through `g.ranks` into the Members `<select>` options, forum `RankPick` pills and `visible_ranks` labels.

## Tests
- `test/guild.test.js` (pure vitest, no services): unit-covers `lastChef` — sole Chef holder → true; two members holding the Chef rank → false; non-leader → false. (No DOM testing library in this repo; the modal/inline interactions themselves are covered end-to-end by the back integration test `test/integration/guild-ranks.test.ts` on the API side.)

## Gotchas
- Nested modals: `NewRankModal` renders inside `GuildModal` (both `createPortal` to `document.body`). `.modal` has no distinct z-index, so stacking = DOM order (inner portal appended later wins). Both modals listen for `Escape` on `window` — with the NewRank modal open, Esc closes **both**; that is the pre-existing `Modal` pattern, acceptable here since NewRank discards its draft on close anyway.
- `lastChef` mirrors the backend but the backend is the source of truth: if the rule in `guilds.ts` changes, update `src/lib/guild.js` and its test together (message strings must stay aligned with the 409s: "Le dernier Chef ne peut pas …").
- The back rule (Chef rank unrenamable) has **changed**: the leader-rank 403 was removed (card `back:guild-ranks-order`), so the rename pencil now renders on every rank card including the Chef card; only the permissions grid stays locked for the leader rank. `Manage` still only renders for `g.me.leader`. The v1 description above is kept for history — follow `guild-ranks-manage` for the current manage section.
- Forum tab `RankPick` defaults (`['Chef', 'Officier', 'Membre']` in `Forum`) are hardcoded names: after a rename they may point to names that no longer exist — harmless (the API stores whatever strings are sent, and unselected ones just never match) but cosmetic: a folder created with all pills deselected falls back to `['Chef']` on the back.
