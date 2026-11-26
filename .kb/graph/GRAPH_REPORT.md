# Graph Report - front  (2026-11-26)

## Corpus Check
- 137 files · ~94,627 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 758 nodes · 2492 edges · 20 communities (19 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aafe1683`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- Panels.jsx
- terrain.js
- ResourcesTab.jsx
- Guild.jsx
- entities.js
- TileCard.jsx
- api
- creatures.js
- Races.jsx
- with
- Login.jsx
- relief.js
- package.json
- world2.js
- terrain
- ChatDock.jsx
- createScene
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
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `syncEntities()` --calls--> `makeEntity()`  [EXTRACTED]
  src/three/scene.js → src/three/entities.js

## Import Cycles
- None detected.

## Communities (20 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (81): lucide-react, react, react-redux, BuildingExtras(), BuildingSpells(), ago(), Dashboard(), KPI (+73 more)

### Community 1 - "Panels.jsx"
Cohesion: 0.06
Nodes (69): ITEM_SLOTS, Admin, App(), Account(), RACE, raceName(), Capital(), capTheme() (+61 more)

### Community 2 - "terrain.js"
Cohesion: 0.07
Nodes (51): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+43 more)

### Community 3 - "ResourcesTab.jsx"
Cohesion: 0.10
Nodes (35): vitest, activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), ActivationEditor() (+27 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 5 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 6 - "TileCard.jsx"
Cohesion: 0.09
Nodes (36): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), hex(), LegendAngDem() (+28 more)

### Community 7 - "api"
Cohesion: 0.14
Nodes (33): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+25 more)

### Community 8 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 9 - "Races.jsx"
Cohesion: 0.13
Nodes (24): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+16 more)

### Community 10 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 11 - "Login.jsx"
Cohesion: 0.17
Nodes (21): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+13 more)

### Community 12 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 13 - "package.json"
Cohesion: 0.11
Nodes (21): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+13 more)

### Community 14 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 15 - "terrain"
Cohesion: 0.25
Nodes (15): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+7 more)

### Community 16 - "ChatDock.jsx"
Cohesion: 0.21
Nodes (8): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject(), walk()

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

- **Why does `api()` connect `api` to `react`, `Panels.jsx`, `terrain.js`, `ResourcesTab.jsx`, `Guild.jsx`, `TileCard.jsx`, `Races.jsx`, `Login.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06352718078381796 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ResourcesTab.jsx` to `react`, `Panels.jsx`, `terrain.js`, `Guild.jsx`, `entities.js`, `TileCard.jsx`, `api`, `Races.jsx`, `Login.jsx`, `package.json`, `terrain`, `ChatDock.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `Panels.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.062173458725182866 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Panels.jsx`, `terrain.js`, `ResourcesTab.jsx`, `Guild.jsx`, `entities.js`, `TileCard.jsx`, `api`, `Races.jsx`, `Login.jsx`, `package.json`, `ChatDock.jsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `terrain.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06597222222222222 - nodes in this community are weakly interconnected._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1048265460030166 - nodes in this community are weakly interconnected._