# Graph Report - front  (2026-11-26)

## Corpus Check
- 142 files · ~96,958 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 784 nodes · 2559 edges · 24 communities (22 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

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
- TileCard.jsx
- AGENTS.md — ia_agent / front
- StatCostsTab.jsx
- adminEffects.test.js

## God Nodes (most connected - your core abstractions)
1. `api()` - 104 edges
2. `react` - 50 edges
3. `vitest` - 39 edges
4. `Empty()` - 38 edges
5. `react-redux` - 38 edges
6. `lucide-react` - 37 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `App()` - 26 edges
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

## Communities (24 total, 2 thin omitted)

### Community 0 - "ItemsTab.jsx"
Cohesion: 0.06
Nodes (75): lucide-react, ago(), Dashboard(), KPI, bonusesBody(), CORE_FAMILIES, Divine(), Families() (+67 more)

### Community 1 - "api"
Cohesion: 0.06
Nodes (77): react, react-dom, react-redux, Admin, App(), Account(), RACE, raceName() (+69 more)

### Community 2 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 3 - "entities.js"
Cohesion: 0.10
Nodes (39): three@^0.170.0, three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE (+31 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 5 - "Races.jsx"
Cohesion: 0.13
Nodes (25): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody(), condDraft() (+17 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.11
Nodes (41): ActivationEditor(), BuildingExtras(), BuildingSpells(), Entities(), FIELDS, jsonOr(), jsonText(), URL_KIND (+33 more)

### Community 7 - "Forum.jsx"
Cohesion: 0.11
Nodes (37): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+29 more)

### Community 8 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 9 - "terrain.js"
Cohesion: 0.10
Nodes (20): CODES, FEATURES, H, ROWS, W, BURN_DAMAGE, BY_CODE, CELLS (+12 more)

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
Cohesion: 0.16
Nodes (15): vitest, hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2 (+7 more)

### Community 14 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, devDependencies, vite@^5 (+11 more)

### Community 15 - "world2.js"
Cohesion: 0.13
Nodes (19): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+11 more)

### Community 16 - "ChatDock.jsx"
Cohesion: 0.21
Nodes (8): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject(), walk()

### Community 17 - "terrain"
Cohesion: 0.24
Nodes (15): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+7 more)

### Community 18 - "createScene"
Cohesion: 0.20
Nodes (14): hash(), ss(), setWorld(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime() (+6 more)

### Community 19 - "TileCard.jsx"
Cohesion: 0.14
Nodes (26): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+18 more)

### Community 20 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

### Community 22 - "StatCostsTab.jsx"
Cohesion: 0.47
Nodes (7): newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost(), StatCostsTab()

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `ItemsTab.jsx`, `ResourcesTab.jsx`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `ChatDock.jsx`, `TileCard.jsx`, `StatCostsTab.jsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Should `ItemsTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.057509157509157506 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `MapLegend.jsx` to `ItemsTab.jsx`, `api`, `ResourcesTab.jsx`, `entities.js`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `package.json`, `ChatDock.jsx`, `terrain`, `TileCard.jsx`, `StatCostsTab.jsx`, `adminEffects.test.js`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06400343642611683 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `ItemsTab.jsx`, `ResourcesTab.jsx`, `entities.js`, `Guild.jsx`, `Races.jsx`, `MonsterDetails.jsx`, `Forum.jsx`, `Login.jsx`, `package.json`, `ChatDock.jsx`, `TileCard.jsx`, `StatCostsTab.jsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09877551020408164 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1096938775510204 - nodes in this community are weakly interconnected._