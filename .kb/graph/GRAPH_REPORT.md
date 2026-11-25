# Graph Report - front  (2026-11-25)

## Corpus Check
- 105 files · ~58,872 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 547 nodes · 1746 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4616207`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- api
- terrain.js
- relief.js
- Races.jsx
- Guild.jsx
- MonsterDetails.jsx
- with
- package.json
- TilesTab.jsx
- ChatDock.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 78 edges
2. `react` - 40 edges
3. `react-redux` - 34 edges
4. `Empty()` - 34 edges
5. `lucide-react` - 28 edges
6. `vitest` - 27 edges
7. `MonsterDetails()` - 25 edges
8. `Pick()` - 24 edges
9. `confirmDel()` - 24 edges
10. `Forum()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `ChatDock()`  [EXTRACTED]
  src/App.jsx → src/components/ChatDock.jsx
- `BuildingSpells()` --calls--> `api()`  [EXTRACTED]
  src/admin/BuildingExtras.jsx → src/lib/api.js

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (81): lucide-react, react, buildingDraft(), groupDraft(), ActivationEditor(), BuildingExtras(), BuildingSpells(), ago() (+73 more)

### Community 1 - "api"
Cohesion: 0.07
Nodes (77): react-dom, react-redux, App(), Account(), RACE, raceName(), Backdrop(), CAP (+69 more)

### Community 2 - "terrain.js"
Cohesion: 0.05
Nodes (60): hex(), LegendAngDem(), MapLegend(), FEATURES2, H2, ROWS2, W2, pathEnergy() (+52 more)

### Community 3 - "relief.js"
Cohesion: 0.08
Nodes (48): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+40 more)

### Community 4 - "Races.jsx"
Cohesion: 0.09
Nodes (28): vitest, activationBody(), activationSummary(), buildingBody(), groupSummary(), FIELDS, jsonOr(), jsonText() (+20 more)

### Community 5 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 7 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 9 - "TilesTab.jsx"
Cohesion: 0.47
Nodes (7): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), COLORS

### Community 10 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 11 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `Races.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `TilesTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06494943109987358 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Races.jsx` to `react`, `api`, `terrain.js`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `TilesTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.0663659793814433 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `api`, `relief.js`, `Races.jsx`, `Guild.jsx`, `MonsterDetails.jsx`, `package.json`, `TilesTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05017543859649123 - nodes in this community are weakly interconnected._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07966457023060797 - nodes in this community are weakly interconnected._