# Graph Report - front  (2026-11-25)

## Corpus Check
- 105 files · ~59,261 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 550 nodes · 1752 edges · 17 communities (16 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6f47b8e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ItemsTab.jsx
- api
- Guild.jsx
- Races.jsx
- MonsterDetails.jsx
- terrain.js
- with
- TileCard.jsx
- world2.test.js
- world2.js
- package.json
- relief.js
- createScene
- entities.js
- ChatDock.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 79 edges
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
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `App()` --calls--> `Admin()`  [EXTRACTED]
  src/App.jsx → src/admin/index.jsx
- `App()` --calls--> `ChatDock()`  [EXTRACTED]
  src/App.jsx → src/components/ChatDock.jsx
- `App()` --calls--> `GuildModal()`  [EXTRACTED]
  src/App.jsx → src/components/Guild.jsx

## Import Cycles
- None detected.

## Communities (17 total, 1 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.06
Nodes (80): lucide-react, buildingDraft(), groupDraft(), ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+72 more)

### Community 1 - "api"
Cohesion: 0.08
Nodes (63): react, react-dom, react-redux, App(), Account(), RACE, raceName(), Backdrop() (+55 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 3 - "Races.jsx"
Cohesion: 0.09
Nodes (28): vitest, activationBody(), activationSummary(), buildingBody(), groupSummary(), FIELDS, jsonOr(), jsonText() (+20 more)

### Community 4 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (27): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+19 more)

### Community 5 - "terrain.js"
Cohesion: 0.09
Nodes (26): KIND, Location(), WORLDS, CODES, FEATURES, H, ROWS, W (+18 more)

### Community 6 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 7 - "TileCard.jsx"
Cohesion: 0.16
Nodes (20): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+12 more)

### Community 8 - "world2.test.js"
Cohesion: 0.18
Nodes (16): hex(), LegendAngDem(), MapLegend(), pathEnergy(), water(), RES2_BY_ID, RESOURCES2, SIDES (+8 more)

### Community 9 - "world2.js"
Cohesion: 0.12
Nodes (20): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+12 more)

### Community 10 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 11 - "relief.js"
Cohesion: 0.10
Nodes (19): three@^0.170.0, three, base(), cellTint(), DEEP, FOREST, g2, GRASS (+11 more)

### Community 12 - "createScene"
Cohesion: 0.25
Nodes (17): groundColor(), hash(), heightAt(), micro(), ridge(), ss(), WATER_Y, noiseAt() (+9 more)

### Community 13 - "entities.js"
Cohesion: 0.38
Nodes (12): BEAST, beast(), building(), golem(), label(), M(), makeEntity(), mesh() (+4 more)

### Community 14 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 15 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0637065637065637 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `Races.jsx` to `ItemsTab.jsx`, `api`, `Guild.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `world2.test.js`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.08099969888587774 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `TileCard.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11020408163265306 - nodes in this community are weakly interconnected._
- **Should `Races.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09098639455782313 - nodes in this community are weakly interconnected._