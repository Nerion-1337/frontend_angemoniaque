---
title: Guilde (UI) : formatage sécurisé B/I/#, droits d'édition, en-têtes, factorisation AddCard/DndList
slug: guild-forum-tools
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/fmt.js
  - src/lib/guild.js
  - src/styles.css
symbols:
  - src/components/Guild.jsx:FmtBar
  - src/components/Guild.jsx:AddCard
  - src/components/Guild.jsx:DndList
  - src/components/Guild.jsx:useFmt
  - src/lib/fmt.js:wrapSel
  - src/lib/guild.js:canEditTopic
tests:
  - test/fmt.test.js
  - test/guild.test.js
---
## Purpose
UX pass over the forum v2 (`guild-forum-v2`): (1) a compact **secure formatting toolbar** (Gras / Italique / Nuancier) on edit fields — it only inserts the text markers `fmt` supports (`**x**`, `*x*`, `#rrggbb`), and every rendering still goes through `fmt` (HTML escaped first), never raw HTML; (2) **topic edit rights** — the pencil shows only for the topic author, `create_topics` holders, or holders of the parent category's write right (mirrors the back 403, card `guild-forum-edit`); (3) **header cleanup & typography** — the redundant top-right « + » button is gone (creation happens exclusively through the add card), the contextual back button is strictly left, forum titles are slightly larger, a centered five-dash separator `-----` separates title from description, and descriptions are larger; (4) **factorisation** — one shared `AddCard` (ranks / categories / topics) with the insertion toggle on the action-buttons line (ranks layout), and one shared `DndList` owning the arrows + drag & drop + golden insertion line for all three lists.

## How it works
All UI in `src/components/Guild.jsx`, pure helpers in `src/lib/`:
- **`FmtBar({ onFmt, onColor })`** — one compact row: `B` → `onFmt('**')`, `I` → `onFmt('*')`, a color swatch (`<input type="color">`, default `#c8a24a`, commits on `onMouseUp`/`onTouchEnd`) → `onColor(hex)`. Placed **above** the edit fields in `NewTopicModal` / `NewFolderModal`, in the reply row, and in `InlineEdit`.
- **`useFmt()`** — `bind(setter)` is spread on a target `<input>/<textarea>`: focus captures `{ el, set }` in a ref. `fmt(marker)` / `color(hex)` resolve the *last focused* field and run the pure **`wrapSel(value, s, e, before, after = before)`** / **`colorSel(value, s, e, hex)`** (`src/lib/fmt.js`) over the element's live `value` + `selectionStart/End`, call `set(text)`, and reposition the caret with `requestAnimationFrame(() => el.setSelectionRange(cursor, cursor))`. Empty selection: `wrapSel` inserts the empty marker pair; `colorSel` inserts the bare code at the caret (with a separating space when there *is* a selection — `fmt` renders a standalone `#rrggbb` in that color).
- **Safe rendering**: titles/descriptions now render through `dangerouslySetInnerHTML={{ __html: fmt(...) }}` (folder & topic names, `.fdesc` lines, the topic-view `<h4>`): `fmt` escapes HTML **before** turning `**`/`*`/`#rrggbb` into tags, so user HTML stays inert — verified by `test/fmt.test.js` (`fmt(wrapSel('<img src=x>', 0, 11, '**'))` → `<b>&lt;img src=x&gt;</b>`).
- **Edit gating**: `canEditTopic(t, f, gme, uid)` (`src/lib/guild.js`, pure, unit-tested) = `gme.leader || t.author_id === uid || gme.permissions?.create_topics || (f.write_ranks ?? []).includes(gme.rank)` — the exact mirror of the back gate; the topic pencils (list view + messages view) use it, the category pencil stays `create_topics`-only. The back now returns `author_id` in every topic row (`GET /guilds/{characterId}`).
- **`AddCard({ i, len, onOpen, dnd, below, setBelow, label, canMove, onMove })`** — the single add card for ranks/categories/topics: `.radd` grid `1fr auto 1fr` (empty left spacer, big `+` in the bordered circle centered, `.aacts` on the right = **insertion toggle + `Arrows`** — the ranks layout; the forum add cards now match it). Card body / `+` open the create modal (suppressed right after a drag via `dnd.justDrag`); the toggle label `stopPropagation`s so toggling never opens the modal; `canMove` renders the ↑/↓ `Arrows` (forum: only with `create_topics`).
- **`DndList({ rows, onReorder, renderRow, className = 'dlist' })`** — owns `useDrag` (8 px arm threshold), the container ref (`.dlist` is `position:relative`), the golden `.inl` insertion line, and maps `renderRow(row, i, dnd)` per display row (add sentinel → `AddCard`, else a `.rcard`/`.fcard` with `dnd.rowProps(i)` + `.rkdr` while dragged). On drop it calls `onReorder(from, to)`; the parent recomputes ids with `dropRankRow` and persists via `POST /guilds/reorder` only when the real order changed. Consumed by `Manage` (ranks) and `Forum` (folders, topics) — the per-list `useDrag`/`rowProps`/`.inl` boilerplate was deleted.
- **`InlineEdit({ label, title, desc, save, onDone })`** — per-instance title+description editor (`FmtBar` on top, `useFmt` bindings, `save(v, done)` calls the parent's `POST …/edit`); replaces the old shared `fEd`/`tEd` object states — `fEd`/`tEd` are now the open target ids only.
- **Headers**: `.fhead2` grid lost its right « + » button; `.fhead2 .backbtn{ justify-self:start }` (strict left); `.fhead2 .rhead{ font-size:1.6rem }` (ranks stay 1.4rem); `.fdesc` .9rem/opacity .8; `.fsep` = exactly `-----` centered, rendered only when a description exists (topic view, messages view; category-list view has no section description). The header block carries no background/border of its own.

## Entry points
- `Guild.jsx:FmtBar` / `:useFmt` / `:InlineEdit` — the toolbar + inline editors (both create modals, the reply row, inline edits in the three views).
- `Guild.jsx:AddCard` / `:DndList` — the single shared add card and reordering controls (ranks, categories, topics).
- `src/lib/fmt.js:wrapSel` / `:colorSel` and `src/lib/guild.js:canEditTopic` — pure helpers (unit-tested; import anywhere).
- Back API: `POST /guilds/{folders,topics}/{id}/edit` (403 rules — card `guild-forum-edit`); topic rows carry `author_id`.

## Data flow
- Toolbar: click B / I / # → `useFmt` resolves the last focused field → `wrapSel`/`colorSel` (pure, no DOM read beyond selection) → `set(text)` → React re-render; on submit/render the text displays through `fmt` (escape-then-format). No raw HTML ever reaches the DOM; `fmt` is the only rendering path.
- Edit gating: `GET /guilds/{me}` → topic rows carry `author_id` → `canEditTopic(t, f, g.me, me.id)` shows/hides the pencil → `POST /guilds/topics/{id}/edit` re-checks server-side (author / create_topics / **category** write) → 403 otherwise → `load()` re-syncs.
- Reorder: press & glide a row (8 px) → `.rkdr` (opacity .45) + `.inl` measured line → drop → `dropRankRow` → `persistF`/`persistT`/`persistOrder` → `POST /guilds/reorder` only when the items' order changed (the add card's own position stays session-local).

## Tests
- `test/fmt.test.js` (pure vitest): `wrapSel` (wrap a selection / empty selection inserts the pair at the caret / asymmetric before-after), `colorSel` (space-glued code after a selection / bare code at the caret), security — `fmt(wrapSel('<img src=x>', 0, 11, '**'))` stays escaped (`<b>&lt;img src=x&gt;</b>`) and a `colorSel`-inserted `#ff0000` renders through `fmt`.
- `test/guild.test.js` (pure): `canEditTopic` — Chef bypass, author, `create_topics`, category `write_ranks` inclusion, none-of-the-three = false, missing `write_ranks` = false.
- `FmtBar`/`AddCard`/`DndList` pointer/keyboard behaviour has no DOM test in this repo (no jsdom/testing-library, no new deps): their API side is covered by the back integration tests (`guild-forum-edit`, `guild-forum-perms`, `guild-ranks-order`) and the production build (`npm run build`).

## Gotchas
- `colorSel` glues ` #rrggbb` with **one** space: `fmt` only colors a standalone hex (space before + space/end after), so inserting a color mid-word renders the code as plain text — by `fmt` design (a `#` inside a word is text), not a bug. Bold/italic markers wrap anywhere.
- `useFmt.bind` stores the setter in a ref **on focus**: the toolbar acts on the last focused field; a never-focused field is a no-op (no crash). The caret reposition is deferred to `requestAnimationFrame` so React has committed the new value first.
- `InlineEdit` is per-instance state seeded from `title`/`desc` at mount (keyed by target id): re-opening another target remounts it; a `load()` behind an open editor leaves the visible draft stale — accepted (same as the old `fEd`/`tEd` pattern).
- Topic pencil gating is `canEditTopic`, **not** `can`: a rank holding only the category write right sees topic pencils but no category pencil; the reorder arrows stay `create_topics`-gated. The back 403 is authoritative — the front mirror only hides the gesture.
- The header « + » is gone: the add card is the only create entry point and it still renders for everyone (creation by a non-`create_topics` member 403s and toasts) — mirrors the previous behaviour, not a regression.
- Never inline a `dangerouslySetInnerHTML` with raw user text: the only sanctioned pattern is `__html: fmt(text)` (escape-then-format). `fmt` must stay the single rendering module for forum text.
