# Graph Report - front  (2026-11-28)

## Corpus Check
- 158 files · ~104,110 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 843 nodes · 2820 edges · 24 communities (23 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `87bd8acc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- MonsterDetails.jsx
- relief.js
- Guild.jsx
- entities.js
- Races.jsx
- api
- Panels.jsx
- creatures.js
- with
- SidePanel.jsx
- terrain.js
- TilesTab.jsx
- TileCard.jsx
- ResourcesTab.jsx
- package.json
- GameCanvas.jsx
- world2.js
- MapLegend.jsx
- terrain
- Capital.jsx
- StructureModal.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 115 edges
2. `react` - 54 edges
3. `vitest` - 44 edges
4. `react-redux` - 40 edges
5. `Empty()` - 40 edges
6. `lucide-react` - 39 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 29 edges
9. `Ad` - 27 edges
10. `App()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `ResourcesTab()` --indirect_call--> `groupDraft()`  [INFERRED]
  src/admin/ResourcesTab.jsx → src/admin/building.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js

## Import Cycles
- None detected.

## Communities (24 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.05
Nodes (92): lucide-react, react, react-redux, ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES (+84 more)

### Community 1 - "MonsterDetails.jsx"
Cohesion: 0.07
Nodes (62): vitest, activationBody(), activationsBody(), activationSummary(), buildingBody(), buildingDraft(), changedOnly(), ELEMENT_KIND (+54 more)

### Community 2 - "relief.js"
Cohesion: 0.06
Nodes (57): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+49 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 4 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 5 - "Races.jsx"
Cohesion: 0.10
Nodes (31): COMBAT_FIELDS, COMBAT_KEYS, combatBody(), CombatXp(), rankCombatValue(), jsonText(), RaceRules(), RULE_KEYS (+23 more)

### Community 6 - "api"
Cohesion: 0.12
Nodes (40): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+32 more)

### Community 7 - "Panels.jsx"
Cohesion: 0.12
Nodes (31): Admin, App(), Account(), RACE, raceName(), Compass(), Location(), ActionsPanel() (+23 more)

### Community 8 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 9 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 10 - "SidePanel.jsx"
Cohesion: 0.12
Nodes (24): ITEM_SLOTS, Info(), BONUS_LABEL, condText(), DLABEL, FILTERS, fmtLock(), History() (+16 more)

### Community 11 - "terrain.js"
Cohesion: 0.10
Nodes (22): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+14 more)

### Community 12 - "TilesTab.jsx"
Cohesion: 0.15
Nodes (15): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), Chat(), ChatDock() (+7 more)

### Community 13 - "TileCard.jsx"
Cohesion: 0.16
Nodes (20): cache, cellCost(), divCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard() (+12 more)

### Community 14 - "ResourcesTab.jsx"
Cohesion: 0.25
Nodes (19): area(), cellResource(), cellRoll(), KIND_NAME, KINDS, naturalScan(), newShare(), overLimit() (+11 more)

### Community 15 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 16 - "GameCanvas.jsx"
Cohesion: 0.18
Nodes (15): react-dom@^18, react-dom, GameCanvas(), useRefreshMe(), Chip(), DIRS, Gauge(), TopBar() (+7 more)

### Community 17 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 18 - "MapLegend.jsx"
Cohesion: 0.21
Nodes (12): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+4 more)

### Community 19 - "terrain"
Cohesion: 0.24
Nodes (16): FLY, FLY_Y, LEVEL_H, levelAt(), levelLabel(), memo, ring(), ROCK (+8 more)

### Community 20 - "Capital.jsx"
Cohesion: 0.24
Nodes (13): Capital(), capTheme(), Empty(), Filters(), itemStat(), THEME, rarClass(), Rarity() (+5 more)

### Community 21 - "StructureModal.jsx"
Cohesion: 0.50
Nodes (5): StructureModal(), activeLine(), doorLines(), REALM_FR, fmtWait()

### Community 22 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `MonsterDetails.jsx`, `relief.js`, `Guild.jsx`, `Races.jsx`, `Panels.jsx`, `SidePanel.jsx`, `TilesTab.jsx`, `TileCard.jsx`, `ResourcesTab.jsx`, `GameCanvas.jsx`, `Capital.jsx`, `StructureModal.jsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.05343511450381679 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `MonsterDetails.jsx` to `react`, `relief.js`, `Guild.jsx`, `entities.js`, `Races.jsx`, `api`, `SidePanel.jsx`, `TilesTab.jsx`, `ResourcesTab.jsx`, `package.json`, `GameCanvas.jsx`, `MapLegend.jsx`, `terrain`, `Capital.jsx`, `StructureModal.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06729356450191008 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `MonsterDetails.jsx`, `relief.js`, `Guild.jsx`, `entities.js`, `Races.jsx`, `api`, `Panels.jsx`, `SidePanel.jsx`, `TilesTab.jsx`, `TileCard.jsx`, `ResourcesTab.jsx`, `package.json`, `GameCanvas.jsx`, `Capital.jsx`, `StructureModal.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `relief.js` be split into smaller, more focused modules?**
  _Cohesion score 0.055178652193577565 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._