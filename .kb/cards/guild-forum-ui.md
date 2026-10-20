---
title: Guilde (UI) : forum en drill-down, modales +, réorganisation, messages aérés et formatage
slug: guild-forum-ui
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/lib/fmt.js
  - src/styles.css
symbols:
  - src/lib/fmt.js:fmt
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:NewFolderModal
  - src/components/Guild.jsx:NewTopicModal
tests:
  - test/fmt.test.js
---
## Purpose
The "Forum" tab of the guild modal is a three-level drilldown (categories → topics → messages), with a back icon at each level. The "+" icon opens an overlay modal to create a category or a topic, instead of the old inline forms. Holders of "create_topics" can reorder the lists with up/down arrows (the server persists the order, see the back card "guild-forum-order"). Messages are displayed as small centered avatars with a nickname below, with an airy spacing, and text supports the text markers of the formatting pass (card `guild-forum-tools`): `[g]…[/g]` bold, `[i]…[/i]` italic, `[rgb:R.G.B]…[/rgb]` colored text, plus the legacy `**`/`*`/`#rrggbb` markers for existing content — all rendered through escape-first `fmt`.

## How it works
All in "src/components/Guild.jsx" (subcomponents of "GuildModal", "Forum" tab):
- Navigation: a single "fid"/"tid" pair of states. "fid === null" → categories view ("row2 fhead" header + "+" icon). Category click → "setFid" (topics view, back icon "ArrowLeft" → "setFid(null)"). Topic click → "open(x)": "setTid" + "GET /guilds/topics/{me.id}/{x.id}" (failure → empty list, no crash). The back icon pops one level: "back()" = "tid !== null ? setTid(null) : setFid(null)".
- "+" modals: "NewFolderModal" (name + "RankPick" visibility + create) and "NewTopicModal" (title, body textarea, "RankPick" + publish) — both are nested "Modal" (portal to "<body>", stacked above the guild modal by DOM order), close on success ("onClose" inside the "useDo" "after" callback) and leave open on error (toast). The "RankPick" values are now the actual rank names ("g.ranks.map(r => r.name)") instead of a hardcoded "['Chef','Officier','Membre']" — important after a rename.
- Reordering: the shared `DndList`/`Arrows` factors (card `guild-forum-tools`) — `persistF`/`persistT` recompute via `moveRankRow` (arrows) or `dropRankRow` (drag & drop) and send the new complete order via `POST /guilds/reorder` (`folderId` for topics) only when it changed, then `load()`. Arrows only when `can = g.me.permissions.create_topics`; first/last items disable the corresponding arrow. Items are `<div class='row2 sel'>` containing `<button class='selitem'>` (avoiding the forbidden nested button, since the arrows are real buttons) — see `.row2.sel`/`.selitem` in `src/styles.css`.
- Messages: "Post" subcomponent → **div auteur à gauche** ("Avatar" 40 px — lettre du pseudo, palette hashée sur le pseudo — + rang guilde ".prank" + pseudo "<b>", colonne verticale) et **div message à droite** (corps rendu par "fmt", "dangerouslySetInnerHTML" — sûr, cf. infra ; **date en bas à droite** ".ptime" : "position:absolute; right:10px; bottom:5px") ; **fonds alternés** pair/impair ("​.post:nth-child(odd)/(even)" sur le conteneur → couvre les deux divs). Layout, alternance et **pagination** détaillés dans la fiche "guild-pager-posts". ".posts"/".replyrow" : colonne, 24 px entre messages, input de réponse centré avec astuce de formatage dans le placeholder.
- `src/lib/fmt.js:fmt`: pure function, HTML escaping (`& < >`) first, then the markers in order: `[g]` → `<b>`, `[i]` → `<i>`, `[rgb:R.G.B]` → colored `<span>` (channels clamped to 255), legacy `#rrggbb:text#` (WYSIWYG-era content), `**` → `<b>`, `*` → `<i>`, a standalone 6-digit `#rrggbb` (whitespace-bounded) shown in its color, `\n` → `<br>`. The only rendering path for forum text (escape-before-format is the XSS guarantee); creation/edit fields format through the `FmtBar`/`FmtField` toolbar above the field (card `guild-forum-tools`).
- Layout ("src/styles.css"): ".guild" resized — width "min(920px)" → "min(1380px, 96vw/100vw-32px)" (~1.5×), height fixed to "min(88vh, 1150px)" (~2× the previous automatic height); at 760px or below, "width:100%; height:94vh".

## Entry points
- "Guild.jsx:Forum" (tab "forum" of "GuildModal"), "NewFolderModal"/"NewTopicModal" (icon "+"), "arrows"/"move" (up/down reordering).
- "src/lib/fmt.js:fmt" — import it anywhere to render forum text (the only entry point for forum formatting; do not inline "dangerouslySetInnerHTML").
- API: "POST /guilds/reorder" (new), "GET /guilds/topics/{characterId}/{topicId}" (posts).

## Data flow
- Drilldown: "g" (from "GET /guilds/{me.id}") → categories list → topics of the selected folder ("folder.topics", nested by the API) → posts ("GET /guilds/topics/{me.id}/{tid}", local state "posts", refetched on each new message). All mutations ("create", "reorder", "post") end with "load()" (guild re-fetch) — for "reorder", the local "fid"/"tid" survive the re-fetch, since the ids are stable.
- "fmt" output is rendered via "innerHTML": any future change to "fmt" must keep HTML escaping before the markup substitution, otherwise it is an XSS on user content.

## Tests
- "test/fmt.test.js" (pure vitest): HTML escaping, bold + italic, standalone "#ff0000" colored vs. "hex within a word" left as-is, newline → "<br>", null → empty. The reorder API side is covered by "back/test/integration/guild-forum.test.ts"; the drilldown/modals themselves are not unit-tested (no DOM library in this repo — end-to-end via "npm test" + integration + visual).

## Cross-references
- The forum was redesigned (v2): centered titles, description fields, add cards with insertion toggle, drag & drop, per-rank Voir/Écrire panels, unread badges, restructured message cards — card `guild-forum-v2` (see also back `guild-forum-perms`). The drill-down navigation described here survives as the base pattern.
- A third pass (`guild-forum-tools`) reworked the headers (no right « + » button, back strictly left, `-----` title/description separator), added the secure formatting toolbar and gated the topic edit pencil (`canEditTopic`, back `guild-forum-edit`); it also consolidated the add card / DnD controls into the shared `AddCard` / `DndList` components.

## Gotchas
- Nested modals: three modals can be stacked (guild > category/topic). Esc closes all of them (existing "Modal" pattern: one "keydown" listener per instance). An interrupted draft is lost — accepted.
- The "selitem" pattern (a clickable "<div class='row2 sel'>" + an inner "<button>") exists precisely to avoid the forbidden "<button>" inside "<button>" (the reordering arrows). Do not replace the outer div with a button.
- "fid"/"tid" point to ids: if a member loses visibility of the selected folder (rank change/rename), "folder" becomes undefined and the forum automatically falls back to the categories view ("!folder" guard) — keep these guards when restructuring.
- ".posts" is redefined in the forum block at the end of "styles.css" (the older ".posts{margin-top:10px…}" on line 31 remains for other uses, but the forum one wins by cascade in the guild context — in fact, it wins everywhere: check before reusing the ".posts" class in other features).
- "#rrggbb" color codes are parsed only when standalone (whitespace or start of line before, and whitespace or end of string after): "my#ff0000tag" is not colored. If you change the syntax, update the placeholder hints (topic textarea, reply input) and "test/fmt.test.js".
