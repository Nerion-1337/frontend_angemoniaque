# Graph Report - front  (2026-11-26)

## Corpus Check
- 133 files · ~91,341 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 737 nodes · 2445 edges · 20 communities (19 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e284301f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- Panels.jsx
- App.jsx
- Guild.jsx
- entities.js
- ResourcesTab.jsx
- MonsterDetails.jsx
- Races.jsx
- creatures.js
- terrain.js
- TileCard.jsx
- with
- relief.js
- package.json
- world2.js
- MapLegend.jsx
- terrain
- createScene
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 97 edges
2. `react` - 47 edges
3. `vitest` - 37 edges
4. `react-redux` - 36 edges
5. `Empty()` - 36 edges
6. `terrain()` - 34 edges
7. `lucide-react` - 33 edges
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

## Communities (20 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.07
Nodes (86): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+78 more)

### Community 1 - "Panels.jsx"
Cohesion: 0.06
Nodes (65): react-dom@^18, react-dom, ITEM_SLOTS, Account(), RACE, raceName(), Capital(), capTheme() (+57 more)

### Community 2 - "App.jsx"
Cohesion: 0.08
Nodes (51): App(), Backdrop(), Chat(), ChatDock(), Mail(), Compass(), Author(), Badges() (+43 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 5 - "ResourcesTab.jsx"
Cohesion: 0.10
Nodes (28): vitest, activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area() (+20 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (30): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+22 more)

### Community 7 - "Races.jsx"
Cohesion: 0.13
Nodes (25): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+17 more)

### Community 8 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 9 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 10 - "TileCard.jsx"
Cohesion: 0.15
Nodes (24): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+16 more)

### Community 11 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 12 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 13 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 14 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 15 - "MapLegend.jsx"
Cohesion: 0.21
Nodes (12): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+4 more)

### Community 16 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 17 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 18 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Panels.jsx`, `App.jsx`, `Guild.jsx`, `ResourcesTab.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06765418031619427 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ResourcesTab.jsx` to `api`, `Panels.jsx`, `App.jsx`, `Guild.jsx`, `entities.js`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`, `package.json`, `MapLegend.jsx`, `terrain`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `Panels.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05709876543209876 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Panels.jsx`, `App.jsx`, `Guild.jsx`, `entities.js`, `ResourcesTab.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `TileCard.jsx`, `package.json`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `App.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08283730158730158 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._