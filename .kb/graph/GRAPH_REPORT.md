# Graph Report - front  (2026-11-26)

## Corpus Check
- 137 files · ~94,925 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 759 nodes · 2494 edges · 30 communities (28 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e15102bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ItemsTab.jsx
- entities.js
- Guild.jsx
- ResourcesTab.jsx
- Races.jsx
- Forum.jsx
- MonsterDetails.jsx
- creatures.js
- TileCard.jsx
- terrain.js
- with
- SidePanel.jsx
- api
- relief.js
- world2.js
- Panels.jsx
- react-redux
- scene.js
- MapLegend.jsx
- password.test.js
- levels.js
- package.json
- react
- ChatDock.jsx
- terrain
- devDependencies
- AGENTS.md — ia_agent / front
- vitest
- scripts

## God Nodes (most connected - your core abstractions)
1. `api()` - 98 edges
2. `react` - 47 edges
3. `vitest` - 38 edges
4. `react-redux` - 36 edges
5. `Empty()` - 36 edges
6. `lucide-react` - 34 edges
7. `terrain()` - 34 edges
8. `MonsterDetails()` - 26 edges
9. `confirmDel()` - 26 edges
10. `mk()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `LegalEdit()` --calls--> `api()`  [EXTRACTED]
  src/components/ForumMod.jsx → src/lib/api.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js

## Import Cycles
- None detected.

## Communities (30 total, 2 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.06
Nodes (76): lucide-react, BuildingSpells(), ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine() (+68 more)

### Community 1 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 3 - "ResourcesTab.jsx"
Cohesion: 0.12
Nodes (34): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor(), BuildingExtras() (+26 more)

### Community 4 - "Races.jsx"
Cohesion: 0.13
Nodes (25): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+17 more)

### Community 5 - "Forum.jsx"
Cohesion: 0.13
Nodes (33): Backdrop(), Author(), Badges(), Category(), Compose(), Forum(), go(), Home_() (+25 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.15
Nodes (29): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+21 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "TileCard.jsx"
Cohesion: 0.10
Nodes (24): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+16 more)

### Community 9 - "terrain.js"
Cohesion: 0.09
Nodes (23): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+15 more)

### Community 10 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 11 - "SidePanel.jsx"
Cohesion: 0.12
Nodes (22): Info(), KIND, BONUS_LABEL, condText(), DLABEL, FILTERS, fmtLock(), History() (+14 more)

### Community 12 - "api"
Cohesion: 0.20
Nodes (19): Admin, App(), Compass(), Location(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks() (+11 more)

### Community 13 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 14 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 15 - "Panels.jsx"
Cohesion: 0.20
Nodes (19): Account(), RACE, raceName(), ActionsPanel(), BUILD, Craft(), FaithPanel(), KV() (+11 more)

### Community 16 - "react-redux"
Cohesion: 0.22
Nodes (13): react-redux, GameCanvas(), useRefreshMe(), Chip(), DIRS, Gauge(), TopBar(), Wheel() (+5 more)

### Community 17 - "scene.js"
Cohesion: 0.19
Nodes (14): hash(), ss(), setWorld(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime() (+6 more)

### Community 18 - "MapLegend.jsx"
Cohesion: 0.25
Nodes (10): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+2 more)

### Community 19 - "password.test.js"
Cohesion: 0.30
Nodes (10): PasswordMeter(), bits(), checklist(), classes(), COMMON, LEVELS, passwordOk(), strength() (+2 more)

### Community 20 - "levels.js"
Cohesion: 0.26
Nodes (12): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+4 more)

### Community 21 - "package.json"
Cohesion: 0.20
Nodes (11): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, name (+3 more)

### Community 22 - "react"
Cohesion: 0.33
Nodes (9): react, Capital(), capTheme(), Empty(), itemStat(), THEME, Modal(), Tabs() (+1 more)

### Community 23 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 24 - "terrain"
Cohesion: 0.42
Nodes (7): pathEnergy(), water(), h0(), procNoise(), terrain(), find(), stepInto()

### Community 25 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, vite@^5, @vitejs/plugin-react@^4, vitest@^2, vite, @vitejs/plugin-react

### Community 26 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

### Community 28 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, test

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `SidePanel.jsx`, `Panels.jsx`, `react-redux`, `react`, `ChatDock.jsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06227106227106227 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `ItemsTab.jsx`, `entities.js`, `Guild.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `react-redux`, `MapLegend.jsx`, `password.test.js`, `levels.js`, `package.json`, `ChatDock.jsx`, `terrain`, `devDependencies`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10204081632653061 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `ItemsTab.jsx`, `entities.js`, `Guild.jsx`, `ResourcesTab.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `SidePanel.jsx`, `api`, `Panels.jsx`, `react-redux`, `scene.js`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1096938775510204 - nodes in this community are weakly interconnected._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12210915818686402 - nodes in this community are weakly interconnected._