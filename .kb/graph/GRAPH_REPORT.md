# Graph Report - front  (2026-11-27)

## Corpus Check
- 142 files · ~97,388 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 785 nodes · 2594 edges · 30 communities (29 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63e668ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Panels.jsx
- Guild.jsx
- entities.js
- ResourcesTab.jsx
- api
- creatures.js
- MonsterDetails.jsx
- Empty
- TileCard.jsx
- terrain.js
- with
- Login.jsx
- relief.js
- index.jsx
- package.json
- react
- world2.js
- api.js
- MapLegend.jsx
- ui.jsx
- SpellFx.jsx
- terrain
- createScene
- PlayersTab.jsx
- RankReq.jsx
- StatCostsTab.jsx
- ChatDock.jsx
- XpRank.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 104 edges
2. `react` - 50 edges
3. `vitest` - 39 edges
4. `react-redux` - 38 edges
5. `Empty()` - 38 edges
6. `lucide-react` - 37 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `App()` - 26 edges
10. `mk()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js
- `syncEntities()` --calls--> `makeEntity()`  [EXTRACTED]
  src/three/scene.js → src/three/entities.js

## Import Cycles
- None detected.

## Communities (30 total, 1 thin omitted)

### Community 0 - "Panels.jsx"
Cohesion: 0.06
Nodes (73): react-dom@^18, react-dom, Admin, App(), Account(), RACE, raceName(), Capital() (+65 more)

### Community 1 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 2 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 3 - "ResourcesTab.jsx"
Cohesion: 0.10
Nodes (28): vitest, activationBody(), activationSummary(), buildingBody(), buildingDraft(), groupDraft(), groupSummary(), area() (+20 more)

### Community 4 - "api"
Cohesion: 0.12
Nodes (39): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+31 more)

### Community 5 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.16
Nodes (28): COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel(), LIMIT_KIND, linkedLabel() (+20 more)

### Community 7 - "Empty"
Cohesion: 0.15
Nodes (26): bonusesBody(), CORE_FAMILIES, Divine(), Families(), familyLabel(), ITEM_SLOT_LABEL, ITEM_SLOTS, ITEM_STATS (+18 more)

### Community 8 - "TileCard.jsx"
Cohesion: 0.14
Nodes (25): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab(), cache, cellCost() (+17 more)

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

### Community 13 - "index.jsx"
Cohesion: 0.19
Nodes (16): lucide-react, react-redux, blessingCost(), faithBody(), STAT_LABEL, tierBody(), tierExample(), FaithTab() (+8 more)

### Community 14 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 15 - "react"
Cohesion: 0.26
Nodes (14): react, ActivationEditor(), BuildingExtras(), BuildingSpells(), Entities(), FIELDS, jsonOr(), jsonText() (+6 more)

### Community 16 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 17 - "api.js"
Cohesion: 0.27
Nodes (12): RaceRules(), RULE_KEYS, rulesBody(), rulesDraft(), rulesLabel(), Races(), int(), kitBody() (+4 more)

### Community 18 - "MapLegend.jsx"
Cohesion: 0.21
Nodes (12): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+4 more)

### Community 19 - "ui.jsx"
Cohesion: 0.25
Nodes (11): ago(), Dashboard(), KPI, recipeBody(), recipeDraft(), resLabel(), TARGET_LABEL, ScrollsTab() (+3 more)

### Community 20 - "SpellFx.jsx"
Cohesion: 0.26
Nodes (13): SpellEffects(), useSummonables(), SpellsTab(), AFFECTS_LABEL, fxBody(), fxDraft(), fxSummary(), LINK_MODES (+5 more)

### Community 21 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 22 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 23 - "PlayersTab.jsx"
Cohesion: 0.35
Nodes (10): pageWindow(), PLACE_LABEL, posLabel(), RACE_LABEL, STAT_GROUPS, STAT_KEYS, statDiff(), PlayerSheet() (+2 more)

### Community 24 - "RankReq.jsx"
Cohesion: 0.31
Nodes (9): condBody(), condDraft(), condSummary(), MODES, Path(), RankReq(), reqBody(), reqDraft() (+1 more)

### Community 25 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

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

- **Why does `api()` connect `api` to `Panels.jsx`, `Guild.jsx`, `ResourcesTab.jsx`, `MonsterDetails.jsx`, `Empty`, `TileCard.jsx`, `Login.jsx`, `index.jsx`, `react`, `api.js`, `ui.jsx`, `SpellFx.jsx`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Should `Panels.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05892634207240949 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ResourcesTab.jsx` to `Panels.jsx`, `Guild.jsx`, `entities.js`, `api`, `MonsterDetails.jsx`, `Empty`, `TileCard.jsx`, `Login.jsx`, `index.jsx`, `package.json`, `react`, `api.js`, `MapLegend.jsx`, `ui.jsx`, `SpellFx.jsx`, `terrain`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Panels.jsx`, `Guild.jsx`, `entities.js`, `ResourcesTab.jsx`, `api`, `MonsterDetails.jsx`, `Empty`, `TileCard.jsx`, `Login.jsx`, `index.jsx`, `package.json`, `api.js`, `ui.jsx`, `SpellFx.jsx`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ChatDock.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._
- **Should `ResourcesTab.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1036077705827937 - nodes in this community are weakly interconnected._