# Graph Report - front  (2026-11-26)

## Corpus Check
- 137 files · ~94,426 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 757 nodes · 2494 edges · 23 communities (22 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `99da1c65`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- ItemsTab.jsx
- vitest
- ResourcesTab.jsx
- Guild.jsx
- Races.jsx
- Forum.jsx
- creatures.js
- MonsterDetails.jsx
- terrain.js
- with
- Appearance.jsx
- relief.js
- TileCard.jsx
- world2.js
- MapLegend.jsx
- terrain
- createScene
- password.test.js
- ChatDock.jsx
- TilesTab.jsx
- AGENTS.md — ia_agent / front

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
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `syncEntities()` --calls--> `makeEntity()`  [EXTRACTED]
  src/three/scene.js → src/three/entities.js

## Import Cycles
- None detected.

## Communities (23 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.06
Nodes (85): react-dom@^18, react, react-dom, react-redux, Admin, App(), Account(), RACE (+77 more)

### Community 1 - "ItemsTab.jsx"
Cohesion: 0.07
Nodes (71): lucide-react, ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine(), Families() (+63 more)

### Community 2 - "vitest"
Cohesion: 0.06
Nodes (44): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+36 more)

### Community 3 - "ResourcesTab.jsx"
Cohesion: 0.11
Nodes (38): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor(), BuildingExtras() (+30 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 5 - "Races.jsx"
Cohesion: 0.13
Nodes (25): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+17 more)

### Community 6 - "Forum.jsx"
Cohesion: 0.14
Nodes (31): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+23 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (28): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+20 more)

### Community 9 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 10 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 11 - "Appearance.jsx"
Cohesion: 0.20
Nodes (18): Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES, designFor() (+10 more)

### Community 12 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 13 - "TileCard.jsx"
Cohesion: 0.18
Nodes (18): cache, cellCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard(), TileInfo() (+10 more)

### Community 14 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 15 - "MapLegend.jsx"
Cohesion: 0.22
Nodes (12): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RES_BY_ID (+4 more)

### Community 16 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 17 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 18 - "password.test.js"
Cohesion: 0.30
Nodes (10): PasswordMeter(), bits(), checklist(), classes(), COMMON, LEVELS, passwordOk(), strength() (+2 more)

### Community 19 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 20 - "TilesTab.jsx"
Cohesion: 0.56
Nodes (6): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab()

### Community 21 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ChatDock.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.058896138247222715 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `ItemsTab.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `Appearance.jsx`, `MapLegend.jsx`, `terrain`, `password.test.js`, `ChatDock.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06535087719298245 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `vitest`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `Appearance.jsx`, `TileCard.jsx`, `ChatDock.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.05552617662612375 - nodes in this community are weakly interconnected._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11320754716981132 - nodes in this community are weakly interconnected._