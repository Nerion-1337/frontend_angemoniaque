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
The "Forum" tab of the guild modal is a three-level drilldown (categories → topics → messages), with a back icon at each level. The "+" icon opens an overlay modal to create a category or a topic, instead of the old inline forms. Holders of "create_topics" can reorder the lists with up/down arrows (the server persists the order, see the back card "guild-forum-order"). Messages are displayed as small centered avatars with a nickname below, with an airy spacing, and text supports **bold**, *italic* and "#rrggbb" color codes.

## How it works
All in "src/components/Guild.jsx" (subcomponents of "GuildModal", "Forum" tab):
- Navigation: a single "fid"/"tid" pair of states. "fid === null" → categories view ("row2 fhead" header + "+" icon). Category click → "setFid" (topics view, back icon "ArrowLeft" → "setFid(null)"). Topic click → "open(x)": "setTid" + "GET /guilds/topics/{me.id}/{x.id}" (failure → empty list, no crash). The back icon pops one level: "back()" = "tid !== null ? setTid(null) : setFid(null)".
- "+" modals: "NewFolderModal" (name + "RankPick" visibility + create) and "NewTopicModal" (title, body textarea, "RankPick" + publish) — both are nested "Modal" (portal to "<body>", stacked above the guild modal by DOM order), close on success ("onClose" inside the "useDo" "after" callback) and leave open on error (toast). The "RankPick" values are now the actual rank names ("g.ranks.map(r => r.name)") instead of a hardcoded "['Chef','Officier','Membre']" — important after a rename.
- Reordering: "move(kind, list, i, dir)" swaps two adjacent ids and sends the new complete order via "POST /guilds/reorder" ("folderId" for topics), then "load()". The "arrows()" helper renders the "↑/↓" ("ChevronUp"/"ChevronDown") buttons, only when "can = g.me.permissions.create_topics"; first/last items disable the corresponding arrow. Items are "<div class='row2 sel'>" containing "<button class='selitem'>" (avoiding the forbidden nested button, since the arrows are real buttons) — see ".row2.sel"/".selitem" in "src/styles.css".
- Messages: "Post" subcomponent → "Avatar" (40px circle, letter of the nickname, palette hashed from the nickname, ".avatar") + nickname below ("<b>") + body rendered by "fmt" ("dangerouslySetInnerHTML" — safe, see below). ".posts"/".post"/".replyrow": centered column, 24px gap between messages, centered reply input with a formatting hint in the placeholder.
- "src/lib/fmt.js:fmt": pure function, HTML escaping ("& < >") first, then "**gras**" → "<b>", "*italique*" → "<i>", a standalone 6-digit "#rrggbb" (start of line/whitespace + boundary) displayed in its color ("#1234567" or "#12345gg" remain text), "\n" → "<br>". Used on post bodies (the reply/topic inputs hint at the syntax in the placeholder).
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
