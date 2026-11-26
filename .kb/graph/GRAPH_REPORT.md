# Graph Report - front  (2026-11-26)

## Corpus Check
- 127 files · ~75,895 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 677 nodes · 2192 edges · 20 communities (18 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e878f805`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- relief.js
- Guild.jsx
- MonsterDetails.jsx
- Races.jsx
- ResourcesTab.jsx
- Forum.jsx
- TileCard.jsx
- with
- terrain.js
- MapLegend.jsx
- package.json
- ChatDock.jsx
- world2.js
- terrain
- statCosts.js
- AGENTS.md — ia_agent / front
- vitest

## God Nodes (most connected - your core abstractions)
1. `api()` - 97 edges
2. `react` - 46 edges
3. `react-redux` - 36 edges
4. `vitest` - 36 edges
5. `Empty()` - 36 edges
6. `terrain()` - 34 edges
7. `lucide-react` - 32 edges
8. `confirmDel()` - 26 edges
9. `App()` - 25 edges
10. `MonsterDetails()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx

## Import Cycles
- None detected.

## Communities (20 total, 2 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (78): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+70 more)

### Community 1 - "api"
Cohesion: 0.06
Nodes (80): react-dom@^18, react-dom, App(), Account(), RACE, raceName(), Backdrop(), Capital() (+72 more)

### Community 2 - "relief.js"
Cohesion: 0.06
Nodes (58): three, base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2 (+50 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (30): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+22 more)

### Community 5 - "Races.jsx"
Cohesion: 0.13
Nodes (26): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+18 more)

### Community 6 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 7 - "Forum.jsx"
Cohesion: 0.17
Nodes (28): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+20 more)

### Community 8 - "TileCard.jsx"
Cohesion: 0.14
Nodes (25): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+17 more)

### Community 9 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 10 - "terrain.js"
Cohesion: 0.10
Nodes (22): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+14 more)

### Community 11 - "MapLegend.jsx"
Cohesion: 0.18
Nodes (15): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, RARE3 (+7 more)

### Community 12 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 13 - "ChatDock.jsx"
Cohesion: 0.16
Nodes (10): ITEM_SLOTS, Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject() (+2 more)

### Community 14 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 15 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 16 - "statCosts.js"
Cohesion: 0.52
Nodes (5): num(), preview(), ruleBody(), STAT_LABEL, upgradeCost()

### Community 17 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `Forum.jsx`, `TileCard.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07061994609164421 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `api`, `relief.js`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `Forum.jsx`, `TileCard.jsx`, `MapLegend.jsx`, `package.json`, `ChatDock.jsx`, `terrain`, `statCosts.js`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.059207920792079205 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `Forum.jsx`, `TileCard.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06013986013986014 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._