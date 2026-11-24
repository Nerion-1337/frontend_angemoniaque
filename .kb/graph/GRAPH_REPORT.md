# Graph Report - front  (2026-11-24)

## Corpus Check
- 93 files · ~51,934 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 490 nodes · 1509 edges · 16 communities (14 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ad19c9b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- ItemsTab.jsx
- relief.js
- Guild.jsx
- Races.jsx
- TileCard.jsx
- with
- terrain.js
- MonsterDetails.jsx
- world2.js
- package.json
- world2.test.js
- vitest
- terrain
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 71 edges
2. `react` - 37 edges
3. `react-redux` - 31 edges
4. `lucide-react` - 24 edges
5. `Empty()` - 24 edges
6. `Forum()` - 23 edges
7. `terrain()` - 23 edges
8. `createScene()` - 23 edges
9. `App()` - 22 edges
10. `vitest` - 21 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `GuildModal()`  [EXTRACTED]
  src/App.jsx → src/components/Guild.jsx
- `App()` --calls--> `TileCard()`  [EXTRACTED]
  src/App.jsx → src/components/TileCard.jsx

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "api"
Cohesion: 0.09
Nodes (61): react, react-dom, react-redux, App(), Account(), Backdrop(), CAP, Capital() (+53 more)

### Community 1 - "ItemsTab.jsx"
Cohesion: 0.08
Nodes (58): lucide-react, ago(), Dashboard(), KPI, CORE_FAMILIES, Divine(), Families(), familyLabel() (+50 more)

### Community 2 - "relief.js"
Cohesion: 0.08
Nodes (49): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+41 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 4 - "Races.jsx"
Cohesion: 0.14
Nodes (24): FIELDS, jsonOr(), jsonText(), URL_KIND, RuleForms(), RulesList(), Pick(), RaceRules() (+16 more)

### Community 5 - "TileCard.jsx"
Cohesion: 0.15
Nodes (23): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+15 more)

### Community 6 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 7 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 8 - "MonsterDetails.jsx"
Cohesion: 0.22
Nodes (17): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), linkedLabel(), MonsterDetails() (+9 more)

### Community 9 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 10 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 11 - "world2.test.js"
Cohesion: 0.24
Nodes (11): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RES_BY_ID (+3 more)

### Community 13 - "terrain"
Cohesion: 0.33
Nodes (6): KIND, WORLDS, h0(), procNoise(), terrain(), find()

### Community 14 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08641975308641975 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`, `package.json`, `world2.test.js`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08191808191808192 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`, `package.json`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0803633822501747 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1096938775510204 - nodes in this community are weakly interconnected._