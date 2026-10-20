---
title: Guilde (UI) : forum v2 — typo centrée, cartes d'ajout + toggle, drag & drop, droits par rang, non-lus, carte de message
slug: guild-forum-v2
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/guild.js
  - src/lib/drag.js
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:Perks
  - src/lib/guild.js:effWrite
  - src/lib/drag.js:useDrag
tests:
  - test/guild.test.js
---
## Purpose
Front half of the forum revamp: centered larger section/category/topic titles (`.rhead`), a description line under each category/topic title (inline-editable, no reload), standardized "add" cards (big `+` in a bordered circle, last by default, **insertion toggle** above/below like the ranks section), **drag & drop** reordering alongside the kept ↑/↓ arrows (reduced opacity + golden insertion line), a **per-rank Voir/Écrire panel** with topic-level inheritance, **unread badges** (topic + cumulative category, auto-ack on open), and the restructured message card (avatar 40 px → rank badge → pseudo, airy centered body, date bottom-right).

## How it works
All in `src/components/Guild.jsx` (Forum tab) with shared helpers in `src/lib/` and a CSS block in `src/styles.css`:
- **Typography**: each view's title is a centered `.rhead` (now `1.6rem` in the forum header via `.fhead2 .rhead` — the ranks manage section keeps `1.4rem`), in a `.fhead2` grid `1fr auto 1fr` with **no** right « + » button (creation happens exclusively through the add card) and the contextual back button **strictly left** (`.fhead2 .backbtn{ justify-self:start }`). A description line (`.fdesc`, `.9rem`) renders under the title, separated by exactly five centered dashes (`.fsep` = `-----`, only when a description exists). Titles/descriptions render through `fmt` (card `guild-forum-tools`).
- **Add cards**: `displayRanks(ids, addPos)` builds the display list with the ADD sentinel (default last); the add card is the shared `AddCard` component (same `.radd`/`.plus`/`.tgl` look as the ranks section, card `guild-forum-tools`), with an **insertion toggle** (default "au-dessus") now on the action-buttons line next to the arrows. On create the `afterFold`/`afterTopic` callback re-fetches the guild, computes the target full order with `insertRankTarget(prev, addPos, newId, below)` and calls `POST /guilds/reorder` (`kind: 'folders'` | `'topics'` + `folderId`) **only when it differs from the current order** — the API always appends the new row at the end (`sort_order = max+1`, back), the reorder then lands it above/below the add card as toggled.
- **Drag & drop**: shared `DndList` component (card `guild-forum-tools`) wrapping the `useDrag(count, onDrop, listRef)` hook (`src/lib/drag.js`, also used by Manage) — pointer press-and-glide with an 8 px arm threshold (clicks preserved), dragged row at `.rkdr` (opacity .45 + dashed outline), a golden `.inl` insertion line at the measured position, drop → `dropRankRow` → `persistF`/`persistT` (reorder API when the items' order changed; the add card's own position stays local). The `.dlist` container is `position:relative` (anchor for the absolute `.inl`) and `.fcard` rows get `touch-action:none` + grab cursor so the same hook works on touch.
- **Per-rank perms**: `Perks({ g, kind, value, onChange })` (**controlled** — the draft lives in the parent `Forum`, card `guild-forum-tools`; leader-only, rendered inside the unified edit opened by the pencil) renders a checkbox grid — one Voir + one Écrire per rank. Checking Écrire auto-checks Voir; un-checking Voir un-checks Écrire. For `kind === 'topics'` there are two inheritance checkboxes (`iR` lecture héritée / `iW` écriture héritée), saved as `readRanks: []` (read inherited) / `writeRanks: null` (write inherited). **No separate save**: the parent `saveAll()` posts `POST /guilds/{folders|topics}/{id}/perms` right after the `/edit` call, in the same `run`.
- **Unread badges**: `g.unread` from `GET /guilds/{me}` — `{ topics: {tid: n}, folders: {fid: Σn} }`, **non-zero entries only**. A `.unread` pill shows `n` on a topic row and the cumulative total on its category row (`g.unread.folders[f.id] ?? 0`). Opening a topic (`open`) calls the topics GET which the back uses to mark it read, then `load()` refreshes the badges (0 after open; a newer post flips it back).
- **Message card**: `Post` re-renders as a centered vertical stack — `.pauthor` (`.avatar` 40 px, `.prank` rank badge from the new `p.rank` field, then pseudo), an airy centered `.postbody` (still `fmt()` for `**gras**`/`*italique*`/`#rrggbb`), and `.ptime` anchored bottom-right. The reply box renders only when `g.me.leader || effWrite(topic, folder).includes(g.me.rank)` (the `effWrite` helper resolves a topic's effective write list, NULL → category) and gains the compact `FmtBar` (card `guild-forum-tools`).
- **Create modals → inherit encoding**: `NewTopicModal` sends `visibleRanks: inhR ? [] : tr` (empty = inherit read, the back's topic-read marker) and `writeRanks: inhW ? undefined : tw` — **omitted key** (not `[]`!), so the back's optional schema stores `NULL` = inherit write; `[]` would mean "nobody". `NewFolderModal` always sends explicit arrays (no inheritance on categories). Inline editors (`saveFEd`/`saveTEd`) send `description ?? ''` (empty string clears the text; omitted = keep, per the back's `COALESCE`).

## Entry points
- `Guild.jsx:Forum` — the whole forum tab (drill-down categories → topics → messages; reworked in `guild-forum-tools` — headers, `AddCard`/`DndList`, `FmtBar`, inline `InlineEdit`).
- `Guild.jsx:Perks` — the per-rank rights matrix, **controlled** (folds into the unified pencil edit with title/description; card `guild-forum-tools`).
- `src/lib/guild.js:effWrite(topic, folder)` — effective write list of a topic (used to gate the reply box; unit-tested).
- `src/lib/drag.js:useDrag` — the shared DnD hook (now consumed by the shared `DndList`, also used by the ranks manage tab).
- Modals: `NewFolderModal` / `NewTopicModal` gained a description field, a write-ranks picker, topic read/write "inherit" toggles, and a `FmtBar` above their fields; both call `onCreated` → the toggle-aware `afterFold`/`afterTopic`.

## Data flow
- Create (with toggle): modal → `POST /guilds/folders|topics` (appended at end) → `onCreated` refetches → `insertRankTarget` target order → `POST /guilds/reorder` when it differs → `load()` → the new card sits above/below the add card as toggled.
- Perms: panel checkboxes → `POST /guilds/{kind}/{id}/perms` → back `checkPerms` (names + write⊆read, effective read for inheriting topics) → `load()`.
- Unread: `open(topic)` → `GET /guilds/topics/{me}/{tid}` (back upserts `guild_topic_reads`) → `load()` re-pulls `g.unread` → badges refresh.

## Tests
- `test/guild.test.js` (pure vitest): `effWrite` (topic NULL inherits the category write; explicit `[]` = nobody; explicit list) plus the display/drop/insert helpers already covered there. DnD pointer behavior, the toggle, and the badges have no DOM test in this repo (no jsdom/testing-library, no new deps); their API side is covered by the back integration test `test/integration/guild-forum-perms.test.ts` and `guild-ranks-order.test.ts` (the reorder/create orderings).

## Gotchas
- `write_ranks` null vs `[]` on a topic is load-bearing: **null = inherit the category, `[]` = explicitly nobody** (but the Chef). `Perks`' draft seeding: `iW` from `target.write_ranks === null`, `iR` from an empty/null `visible_ranks` (the draft materialises the category list); the create modal sends `undefined` (not `[]`) for an inherited write — never normalise an empty array to null or a "nobody" override becomes an inherit.
- `Perks` is **controlled** (draft in the parent `Forum` state, no local state, no independent save — draft save/discard happens in `saveAll`/`closeEdit`, card `guild-forum-tools`); opening another item re-seeds the draft from that item, so a stale draft is impossible.
- The add card's position (`fAdd`/`tAdd`) and the toggle are **local session state** (resets on tab remount); only the items' order is persisted (`/guilds/reorder`). The add card's own position is intentionally not persisted.
- `useDrag` swallows a drag-start on any `button/input/select/label/a/textarea` descendant (`closest()` guard), so inner controls (edit, arrows, toggle, rank checkboxes) never trigger a drag; the add card's click still opens the modal except right after a drag (`justDrag`).
- Unread badges only update after a `load()`; `open()` triggers one after marking read, and replying triggers one via `open(topic)` in the reply success handler. Absent keys are normal (non-zero-only payload) — always `?? 0`.

## Cross-references
- Forum pass 3 (card `guild-forum-tools`): text-marker formatting toolbar (`[g]`/`[i]`/`[rgb:R.G.B]` via `FmtBar`/`FmtField`/`useFmt`, rendered only through escape-first `fmt`), **unified in-place editing** (the pencil swaps the display tags for pre-filled fields: title + description + per-rank rights), save-by-reclick with a `Confirm` screen when changes exist, **delete** (Chef, cascade — back card `guild-forum-manage`) and **topic transfer** between categories, topic edit gating (`canEditTopic`, back card `guild-forum-edit`), header cleanup + `-----` separator, and the `AddCard`/`DndList` factorisation — this card's add-card/DnD/inline-editor descriptions are superseded there where they differ.
