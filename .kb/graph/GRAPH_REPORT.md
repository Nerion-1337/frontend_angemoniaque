# Graph Report - front  (2026-11-25)

## Corpus Check
- 101 files · ~55,230 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 520 nodes · 1653 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `23317b3a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MonsterDetails.jsx
- api
- relief.js
- Guild.jsx
- ItemsTab.jsx
- TileCard.jsx
- with
- Races.jsx
- terrain.js
- package.json
- world2.js
- world2.test.js
- PlayersTab.jsx
- vitest
- terrain
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 77 edges
2. `react` - 40 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 24 edges
7. `confirmDel()` - 24 edges
8. `Forum()` - 23 edges
9. `terrain()` - 23 edges
10. `createScene()` - 23 edges

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

## Communities (17 total, 2 thin omitted)

### Community 0 - "MonsterDetails.jsx"
Cohesion: 0.08
Nodes (55): lucide-react, buildingBody(), buildingDraft(), BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI (+47 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (61): react, react-dom, react-redux, App(), Account(), Backdrop(), CAP, Capital() (+53 more)

### Community 2 - "relief.js"
Cohesion: 0.08
Nodes (47): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+39 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "ItemsTab.jsx"
Cohesion: 0.11
Nodes (35): CORE_FAMILIES, Divine(), Families(), familyLabel(), itemBody(), NUM, validFamilyKey(), blank (+27 more)

### Community 5 - "TileCard.jsx"
Cohesion: 0.15
Nodes (23): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+15 more)

### Community 6 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 7 - "Races.jsx"
Cohesion: 0.17
Nodes (19): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+11 more)

### Community 8 - "terrain.js"
Cohesion: 0.11
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

### Community 9 - "package.json"
Cohesion: 0.11
Nodes (21): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+13 more)

### Community 10 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 11 - "world2.test.js"
Cohesion: 0.24
Nodes (11): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RES_BY_ID (+3 more)

### Community 12 - "PlayersTab.jsx"
Cohesion: 0.35
Nodes (10): pageWindow(), PLACE_LABEL, posLabel(), RACE_LABEL, STAT_GROUPS, STAT_KEYS, statDiff(), PlayerSheet() (+2 more)

### Community 14 - "terrain"
Cohesion: 0.33
Nodes (6): KIND, WORLDS, h0(), procNoise(), terrain(), find()

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `MonsterDetails.jsx`, `Guild.jsx`, `ItemsTab.jsx`, `TileCard.jsx`, `Races.jsx`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0808641975308642 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `MonsterDetails.jsx`, `api`, `Guild.jsx`, `ItemsTab.jsx`, `TileCard.jsx`, `Races.jsx`, `package.json`, `world2.test.js`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08456790123456791 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `MonsterDetails.jsx`, `Guild.jsx`, `ItemsTab.jsx`, `TileCard.jsx`, `Races.jsx`, `package.json`, `PlayersTab.jsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.083710407239819 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11020408163265306 - nodes in this community are weakly interconnected._