# Graph Report - front  (2026-11-26)

## Corpus Check
- 137 files · ~94,435 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 758 nodes · 2487 edges · 22 communities (21 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d7924f9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ItemsTab.jsx
- api
- ResourcesTab.jsx
- entities.js
- Guild.jsx
- Races.jsx
- MonsterDetails.jsx
- Forum.jsx
- creatures.js
- terrain.js
- with
- Login.jsx
- relief.js
- MapLegend.jsx
- package.json
- world2.js
- ChatDock.jsx
- terrain
- createScene
- TilesTab.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 97 edges
2. `react` - 47 edges
3. `vitest` - 38 edges
4. `react-redux` - 36 edges
5. `Empty()` - 36 edges
6. `lucide-react` - 34 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 26 edges
9. `mk()` - 26 edges
10. `createScene()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `LegalEdit()` --calls--> `api()`  [EXTRACTED]
  src/components/ForumMod.jsx → src/lib/api.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js

## Import Cycles
- None detected.

## Communities (22 total, 1 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.06
Nodes (79): lucide-react, react-redux, BuildingSpells(), ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES (+71 more)

### Community 1 - "api"
Cohesion: 0.06
Nodes (85): react, react-dom, Admin, App(), Account(), RACE, raceName(), Capital() (+77 more)

### Community 2 - "ResourcesTab.jsx"
Cohesion: 0.10
Nodes (36): vitest, activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor() (+28 more)

### Community 3 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (38): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+30 more)

### Community 5 - "Races.jsx"
Cohesion: 0.13
Nodes (25): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+17 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.15
Nodes (29): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+21 more)

### Community 7 - "Forum.jsx"
Cohesion: 0.13
Nodes (32): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+24 more)

### Community 8 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 9 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 10 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 11 - "Login.jsx"
Cohesion: 0.17
Nodes (21): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+13 more)

### Community 12 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 13 - "MapLegend.jsx"
Cohesion: 0.17
Nodes (16): hex(), LegendAngDem(), MapLegend(), COLORS, pathEnergy(), water(), RES2_BY_ID, RESOURCES2 (+8 more)

### Community 14 - "package.json"
Cohesion: 0.11
Nodes (20): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+12 more)

### Community 15 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 16 - "ChatDock.jsx"
Cohesion: 0.21
Nodes (8): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject(), walk()

### Community 17 - "terrain"
Cohesion: 0.28
Nodes (14): FLY, FLY_Y, LEVEL_H, levelAt(), levelLabel(), memo, ring(), ROCK (+6 more)

### Community 18 - "createScene"
Cohesion: 0.16
Nodes (15): ss(), setWorld(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime() (+7 more)

### Community 19 - "TilesTab.jsx"
Cohesion: 0.56
Nodes (6): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab()

### Community 20 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `ChatDock.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.060050041701417846 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ResourcesTab.jsx` to `ItemsTab.jsx`, `api`, `entities.js`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `MapLegend.jsx`, `package.json`, `ChatDock.jsx`, `terrain`, `TilesTab.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.05934065934065934 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `ResourcesTab.jsx`, `entities.js`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `package.json`, `ChatDock.jsx`, `TilesTab.jsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.102322206095791 - nodes in this community are weakly interconnected._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._