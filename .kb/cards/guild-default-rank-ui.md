---
title: Guilde (UI) : option unique du rang par défaut des nouveaux arrivants (Gestion)
slug: guild-default-rank-ui
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Manage
tests:
  - test/guild.test.js
---
## Purpose
Front half of the "default rank for newcomers" feature: in the guild manage tab (leader only), a single-choice control lets the Chef decide which rank accepted applicants / accepted invitations receive. **Exactly one option** is selected at a time: "Automatique (rang le plus bas)" or one of the guild's non-Chef ranks. Persisted through `POST /guilds/default-rank`; the chosen value round-trips via `GET /guilds/{me}` `guild.default_rank_id`.

## How it works
In `src/components/Guild.jsx` `Manage`:
- A `.drank` card renders below the rank cards: a header, a flex row of radios (`.drow`), and a helper line. The radios are built from `[auto, ...g.ranks.filter(r => !r.is_leader)]` — the **leader rank is not offered** (the back rejects it, 400), so the choice is always a valid one.
- "Automatique" is `checked={g.guild.default_rank_id == null}`; each rank radio is `checked={g.guild.default_rank_id === r.id}`. Changing a radio fires `run(() => api('/guilds/default-rank', { characterId: me.id, rankId: <id | null> }), load)` — `null` for automatic — which persists then re-fetches the guild (so `load()` re-syncs the control state).
- CSS (`.drank` block in `src/styles.css`): flex-wrapping radio row, `white-space:nowrap` per option, helper small text.

## Entry points
- `Guild.jsx:Manage` → the `.drank` card (rendered in the manage tab, leader only).
- API: `POST /guilds/default-rank` (leader-only; `rankId` null = automatic; Chef rank 400; foreign id 404 — see back card `guild-default-rank`) and `GET /guilds/{me}` (`guild.default_rank_id`).

## Data flow
- Leader clicks a rank radio → `POST /guilds/default-rank` {rankId} → back sets `guilds.default_rank_id` → `load()` refetches → the corresponding radio becomes checked.
- Next time a newcomer joins (server-side), the back `joinRank` assigns that rank — the UI never itself assigns ranks; it only sets the default.

## Tests
- No new pure helper: the control is pure render-state over the API payload, so `test/guild.test.js` gains nothing here (no DOM testing library in this repo). The end-to-end parcours (set default → next invited joiner receives it, reset → fallback) is covered by the back integration test `test/integration/guild-default-rank.test.ts`.

## Gotchas
- `rankId: null` (not omitted) is what means "automatic": the back treats `null`/absent identically, but always send `null` explicitly so the intent is unambiguous.
- The control is intentionally **not** a dropdown: a single-choice radio list makes "one default" visually explicit and mirrors the "option unique" requirement.
- If the leader rank were ever allowed as the default (back rule change), the front filter `!r.is_leader` must be lifted in the same change or the UI would hide a now-valid choice.
- The helper line and "Automatique" label mirror the back fallback (`lowestRank` = lowest non-Chef rank); keep the wording in sync if `joinRank` changes.
