# Graph Report - front  (2026-11-27)

## Corpus Check
- 147 files · ~98,831 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 802 nodes · 2658 edges · 24 communities (23 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8290948e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- Panels.jsx
- vitest
- entities.js
- Guild.jsx
- Forum.jsx
- MonsterDetails.jsx
- creatures.js
- ResourcesTab.jsx
- terrain.js
- with
- Login.jsx
- relief.js
- TileCard.jsx
- package.json
- world2.js
- MapLegend.jsx
- terrain
- createScene
- StatCostsTab.jsx
- ChatDock.jsx
- XpRank
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 107 edges
2. `react` - 51 edges
3. `vitest` - 41 edges
4. `react-redux` - 39 edges
5. `lucide-react` - 38 edges
6. `Empty()` - 38 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `App()` - 26 edges
10. `MonsterDetails()` - 26 edges

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

## Communities (24 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.06
Nodes (96): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), COMBAT_FIELDS, COMBAT_KEYS (+88 more)

### Community 1 - "Panels.jsx"
Cohesion: 0.06
Nodes (75): react-dom, Admin, App(), Account(), RACE, raceName(), Capital(), capTheme() (+67 more)

### Community 2 - "vitest"
Cohesion: 0.06
Nodes (30): vitest, bonusesBody(), CORE_FAMILIES, familyLabel(), ITEM_SLOT_LABEL, ITEM_SLOTS, ITEM_STATS, itemBody() (+22 more)

### Community 3 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 4 - "Guild.jsx"
Cohesion: 0.11
Nodes (40): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+32 more)

### Community 5 - "Forum.jsx"
Cohesion: 0.11
Nodes (40): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+32 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.15
Nodes (29): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), InstXp(), LIMIT_KIND (+21 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

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

### Community 13 - "TileCard.jsx"
Cohesion: 0.16
Nodes (20): cache, cellCost(), divCost(), Entity(), HEALTH, InfoModal(), KIND, TileCard() (+12 more)

### Community 14 - "package.json"
Cohesion: 0.11
Nodes (20): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+12 more)

### Community 15 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 16 - "MapLegend.jsx"
Cohesion: 0.22
Nodes (12): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+4 more)

### Community 17 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 18 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 19 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

### Community 20 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 21 - "XpRank"
Cohesion: 0.57
Nodes (5): diffLabel(), rankPercent(), rowsOf(), tableOf(), XpRank()

### Community 22 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Panels.jsx`, `Guild.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Login.jsx`, `TileCard.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`, `XpRank`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.061829111206526406 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `Panels.jsx`, `entities.js`, `Guild.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Login.jsx`, `TileCard.jsx`, `package.json`, `MapLegend.jsx`, `terrain`, `StatCostsTab.jsx`, `ChatDock.jsx`, `XpRank`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Should `Panels.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.060398078242964996 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Panels.jsx`, `entities.js`, `Guild.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Login.jsx`, `TileCard.jsx`, `package.json`, `StatCostsTab.jsx`, `ChatDock.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06009783368273934 - nodes in this community are weakly interconnected._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._