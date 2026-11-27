# Graph Report - front  (2026-11-27)

## Corpus Check
- 144 files · ~97,795 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 792 nodes · 2609 edges · 27 communities (26 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50f67936`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- Guild.jsx
- entities.js
- Forum.jsx
- MonsterDetails.jsx
- vitest
- Races.jsx
- creatures.js
- ResourcesTab.jsx
- TileCard.jsx
- Panels.jsx
- terrain.js
- with
- Login.jsx
- relief.js
- SidePanel.jsx
- package.json
- GameCanvas.jsx
- world2.js
- MapLegend.jsx
- terrain
- createScene
- Capital.jsx
- StatCostsTab.jsx
- AGENTS.md — ia_agent / front
- Location.jsx

## God Nodes (most connected - your core abstractions)
1. `api()` - 103 edges
2. `react` - 49 edges
3. `vitest` - 40 edges
4. `react-redux` - 37 edges
5. `lucide-react` - 37 edges
6. `Empty()` - 37 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `App()` - 26 edges
10. `mk()` - 26 edges

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

## Communities (27 total, 1 thin omitted)

### Community 0 - "api"
Cohesion: 0.07
Nodes (83): lucide-react, react, react-redux, ActivationEditor(), BuildingExtras(), BuildingSpells(), ago(), Dashboard() (+75 more)

### Community 1 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 2 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 3 - "Forum.jsx"
Cohesion: 0.11
Nodes (40): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+32 more)

### Community 4 - "MonsterDetails.jsx"
Cohesion: 0.13
Nodes (30): FIELDS, jsonOr(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+22 more)

### Community 5 - "vitest"
Cohesion: 0.10
Nodes (19): vitest, bonusesBody(), CORE_FAMILIES, ITEM_SLOT_LABEL, ITEM_SLOTS, ITEM_STATS, itemBody(), NUM (+11 more)

### Community 6 - "Races.jsx"
Cohesion: 0.13
Nodes (25): jsonText(), RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), condBody() (+17 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area(), cellResource() (+17 more)

### Community 9 - "TileCard.jsx"
Cohesion: 0.12
Nodes (25): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, cache, cellCost(), divCost(), Entity() (+17 more)

### Community 10 - "Panels.jsx"
Cohesion: 0.15
Nodes (26): Admin, App(), Account(), RACE, raceName(), Compass(), ActionsPanel(), Bless() (+18 more)

### Community 11 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 12 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 13 - "Login.jsx"
Cohesion: 0.17
Nodes (21): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+13 more)

### Community 14 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 15 - "SidePanel.jsx"
Cohesion: 0.14
Nodes (22): Info(), BONUS_LABEL, condText(), DLABEL, FILTERS, fmtLock(), History(), Inventory() (+14 more)

### Community 16 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 17 - "GameCanvas.jsx"
Cohesion: 0.18
Nodes (15): react-dom@^18, react-dom, GameCanvas(), useRefreshMe(), Chip(), DIRS, Gauge(), TopBar() (+7 more)

### Community 18 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 19 - "MapLegend.jsx"
Cohesion: 0.25
Nodes (10): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+2 more)

### Community 20 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 21 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 22 - "Capital.jsx"
Cohesion: 0.31
Nodes (10): Capital(), capTheme(), Empty(), itemStat(), THEME, rarClass(), Rarity(), RARITY_LABEL (+2 more)

### Community 23 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

### Community 24 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

### Community 25 - "Location.jsx"
Cohesion: 0.50
Nodes (3): KIND, Location(), WORLDS

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Guild.jsx`, `Forum.jsx`, `MonsterDetails.jsx`, `vitest`, `Races.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Panels.jsx`, `Login.jsx`, `SidePanel.jsx`, `GameCanvas.jsx`, `Capital.jsx`, `StatCostsTab.jsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.07147067491895077 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `api`, `Guild.jsx`, `entities.js`, `Forum.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Login.jsx`, `package.json`, `GameCanvas.jsx`, `MapLegend.jsx`, `terrain`, `StatCostsTab.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Guild.jsx`, `entities.js`, `Forum.jsx`, `MonsterDetails.jsx`, `vitest`, `Races.jsx`, `ResourcesTab.jsx`, `TileCard.jsx`, `Panels.jsx`, `Login.jsx`, `SidePanel.jsx`, `package.json`, `GameCanvas.jsx`, `Capital.jsx`, `StatCostsTab.jsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._
- **Should `Forum.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10628019323671498 - nodes in this community are weakly interconnected._