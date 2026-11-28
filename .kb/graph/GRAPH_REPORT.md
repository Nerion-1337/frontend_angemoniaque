# Graph Report - front  (2026-11-28)

## Corpus Check
- 157 files · ~102,516 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 833 nodes · 2788 edges · 30 communities (29 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6948100`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- MonsterDetails.jsx
- vitest
- Guild.jsx
- entities.js
- Forum.jsx
- ResourcesTab.jsx
- creatures.js
- SidePanel.jsx
- with
- terrain.js
- Login.jsx
- relief.js
- App.jsx
- api
- world2.js
- Panels.jsx
- GameCanvas.jsx
- Capital.jsx
- scene.js
- createScene
- MapLegend.jsx
- TilesTab.jsx
- StatCostsTab.jsx
- Modal
- terrain
- ChatDock.jsx
- XpRank.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 113 edges
2. `react` - 54 edges
3. `vitest` - 43 edges
4. `react-redux` - 40 edges
5. `lucide-react` - 39 edges
6. `Empty()` - 39 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `Ad` - 27 edges
10. `App()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `LegalEdit()` --calls--> `api()`  [EXTRACTED]
  src/components/ForumMod.jsx → src/lib/api.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js

## Import Cycles
- None detected.

## Communities (30 total, 1 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (80): lucide-react, react, react-redux, ActivationEditor(), ActivationElements(), BuildingExtras(), BuildingSpells(), COMBAT_FIELDS (+72 more)

### Community 1 - "MonsterDetails.jsx"
Cohesion: 0.08
Nodes (50): Appearance(), Preview(), structureRespawnBody(), structureRespawnDraft(), COLORS, MiniMap(), capLabel(), capsToMaxCaps() (+42 more)

### Community 2 - "vitest"
Cohesion: 0.08
Nodes (41): vitest, bonusesBody(), CORE_FAMILIES, Families(), familyLabel(), ITEM_SLOT_LABEL, ITEM_SLOTS, ITEM_STATS (+33 more)

### Community 3 - "Guild.jsx"
Cohesion: 0.09
Nodes (38): FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows(), AV (+30 more)

### Community 4 - "entities.js"
Cohesion: 0.08
Nodes (39): dependencies, lucide-react@^0.460.0, react@^18, react-dom@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies (+31 more)

### Community 5 - "Forum.jsx"
Cohesion: 0.11
Nodes (39): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+31 more)

### Community 6 - "ResourcesTab.jsx"
Cohesion: 0.15
Nodes (28): activationBody(), activationsBody(), activationSummary(), buildingBody(), buildingDraft(), ELEMENT_KIND, elementDraft(), groupDraft() (+20 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "SidePanel.jsx"
Cohesion: 0.12
Nodes (25): react-dom, Info(), KIND, BONUS_LABEL, condText(), DLABEL, FILTERS, fmtLock() (+17 more)

### Community 9 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 10 - "terrain.js"
Cohesion: 0.10
Nodes (22): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+14 more)

### Community 11 - "Login.jsx"
Cohesion: 0.17
Nodes (21): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+13 more)

### Community 12 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 13 - "App.jsx"
Cohesion: 0.18
Nodes (17): Admin, App(), Account(), RACE, raceName(), Compass(), GuildModal(), NoGuild() (+9 more)

### Community 14 - "api"
Cohesion: 0.20
Nodes (18): ActionsPanel(), Craft(), cache, cellCost(), divCost(), Entity(), HEALTH, InfoModal() (+10 more)

### Community 15 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 16 - "Panels.jsx"
Cohesion: 0.18
Nodes (15): Confirm(), MapLegend(), Bless(), blessCost(), BUILD, FaithPanel(), LOCO_FR, mapResources() (+7 more)

### Community 17 - "GameCanvas.jsx"
Cohesion: 0.22
Nodes (12): GameCanvas(), useRefreshMe(), Chip(), DIRS, Gauge(), TopBar(), Wheel(), pct() (+4 more)

### Community 18 - "Capital.jsx"
Cohesion: 0.26
Nodes (13): Capital(), capTheme(), Empty(), Filters(), itemStat(), THEME, rarClass(), Rarity() (+5 more)

### Community 19 - "scene.js"
Cohesion: 0.27
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), levelLabel(), memo, ring(), ROCK (+5 more)

### Community 20 - "createScene"
Cohesion: 0.17
Nodes (14): hash(), ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime() (+6 more)

### Community 21 - "MapLegend.jsx"
Cohesion: 0.28
Nodes (9): hex(), LegendAngDem(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS, RESOURCES (+1 more)

### Community 22 - "TilesTab.jsx"
Cohesion: 0.31
Nodes (10): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), costOf(), COSTS (+2 more)

### Community 23 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

### Community 24 - "Modal"
Cohesion: 0.40
Nodes (6): Modal(), StructureModal(), activeLine(), doorLines(), REALM_FR, fmtWait()

### Community 25 - "terrain"
Cohesion: 0.31
Nodes (9): COLORS, pathEnergy(), water(), RES_BY_ID, h0(), procNoise(), terrain(), find() (+1 more)

### Community 26 - "ChatDock.jsx"
Cohesion: 0.49
Nodes (7): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject()

### Community 27 - "XpRank.jsx"
Cohesion: 0.61
Nodes (5): diffLabel(), rankPercent(), rowsOf(), tableOf(), XpRank()

### Community 28 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `react`, `MonsterDetails.jsx`, `vitest`, `Guild.jsx`, `Forum.jsx`, `ResourcesTab.jsx`, `SidePanel.jsx`, `Login.jsx`, `App.jsx`, `Panels.jsx`, `GameCanvas.jsx`, `Capital.jsx`, `TilesTab.jsx`, `StatCostsTab.jsx`, `Modal`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06086059534335397 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `react`, `MonsterDetails.jsx`, `Guild.jsx`, `entities.js`, `Forum.jsx`, `ResourcesTab.jsx`, `Login.jsx`, `GameCanvas.jsx`, `Capital.jsx`, `scene.js`, `MapLegend.jsx`, `TilesTab.jsx`, `StatCostsTab.jsx`, `Modal`, `terrain`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0818452380952381 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `MonsterDetails.jsx`, `vitest`, `Guild.jsx`, `entities.js`, `Forum.jsx`, `ResourcesTab.jsx`, `SidePanel.jsx`, `Login.jsx`, `App.jsx`, `api`, `Panels.jsx`, `GameCanvas.jsx`, `Capital.jsx`, `TilesTab.jsx`, `StatCostsTab.jsx`, `Modal`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.07704918032786885 - nodes in this community are weakly interconnected._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0942684766214178 - nodes in this community are weakly interconnected._