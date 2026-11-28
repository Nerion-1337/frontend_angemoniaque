# Graph Report - front  (2026-11-28)

## Corpus Check
- 158 files · ~103,743 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 838 nodes · 2805 edges · 30 communities (29 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `95ac06c3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api
- Guild.jsx
- entities.js
- MonsterDetails.jsx
- Races.jsx
- ResourcesTab.jsx
- Forum.jsx
- creatures.js
- scene.js
- with
- terrain.js
- Login.jsx
- TileCard.jsx
- relief.js
- SidePanel.jsx
- package.json
- GameCanvas.jsx
- world2.js
- Panels.jsx
- App.jsx
- Capital.jsx
- ChatDock.jsx
- MapLegend.jsx
- divine.js
- StatCostsTab.jsx
- terrain
- Account.jsx
- StructureModal.jsx
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 113 edges
2. `react` - 54 edges
3. `vitest` - 44 edges
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

### Community 0 - "api"
Cohesion: 0.07
Nodes (90): lucide-react, react, react-redux, structureRespawnBody(), structureRespawnDraft(), ActivationEditor(), ActivationElements(), BuildingExtras() (+82 more)

### Community 1 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 2 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 3 - "MonsterDetails.jsx"
Cohesion: 0.10
Nodes (33): vitest, FIELDS, jsonOr(), jsonText(), COLORS, MiniMap(), capLabel(), capsToMaxCaps() (+25 more)

### Community 4 - "Races.jsx"
Cohesion: 0.11
Nodes (29): COMBAT_FIELDS, COMBAT_KEYS, combatBody(), CombatXp(), rankCombatValue(), RaceRules(), RULE_KEYS, rulesBody() (+21 more)

### Community 5 - "ResourcesTab.jsx"
Cohesion: 0.13
Nodes (32): activationBody(), activationsBody(), activationSummary(), buildingBody(), buildingDraft(), changedOnly(), ELEMENT_KIND, elementDraft() (+24 more)

### Community 6 - "Forum.jsx"
Cohesion: 0.11
Nodes (36): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+28 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "scene.js"
Cohesion: 0.12
Nodes (26): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+18 more)

### Community 9 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 10 - "terrain.js"
Cohesion: 0.10
Nodes (22): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+14 more)

### Community 11 - "Login.jsx"
Cohesion: 0.18
Nodes (20): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+12 more)

### Community 12 - "TileCard.jsx"
Cohesion: 0.15
Nodes (20): hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, cache, cellCost(), divCost(), Entity() (+12 more)

### Community 13 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 14 - "SidePanel.jsx"
Cohesion: 0.14
Nodes (22): Info(), BONUS_LABEL, condText(), DLABEL, FILTERS, fmtLock(), History(), Inventory() (+14 more)

### Community 15 - "package.json"
Cohesion: 0.11
Nodes (19): dependencies, lucide-react@^0.460.0, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, devDependencies, vite@^5 (+11 more)

### Community 16 - "GameCanvas.jsx"
Cohesion: 0.18
Nodes (15): react-dom@^18, react-dom, GameCanvas(), useRefreshMe(), Chip(), DIRS, Gauge(), TopBar() (+7 more)

### Community 17 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 18 - "Panels.jsx"
Cohesion: 0.18
Nodes (17): ActionsPanel(), Bless(), blessCost(), BUILD, Craft(), FaithPanel(), KV(), LOCO_FR (+9 more)

### Community 19 - "App.jsx"
Cohesion: 0.21
Nodes (11): Admin, App(), Compass(), KIND, Location(), RankingPanel(), forumRoute(), googleReturn() (+3 more)

### Community 20 - "Capital.jsx"
Cohesion: 0.24
Nodes (14): Capital(), capTheme(), Empty(), Filters(), itemStat(), THEME, rarClass(), Rarity() (+6 more)

### Community 21 - "ChatDock.jsx"
Cohesion: 0.21
Nodes (8): Chat(), ChatDock(), Mail(), ago(), CHANNELS, groupChat(), reSubject(), walk()

### Community 22 - "MapLegend.jsx"
Cohesion: 0.25
Nodes (10): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+2 more)

### Community 23 - "divine.js"
Cohesion: 0.22
Nodes (10): bonusesBody(), CORE_FAMILIES, ITEM_SLOT_LABEL, ITEM_SLOTS, ITEM_STATS, itemBody(), NUM, statsLine() (+2 more)

### Community 24 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

### Community 25 - "terrain"
Cohesion: 0.33
Nodes (9): COLORS, pathEnergy(), water(), h0(), procNoise(), terrain(), costOf(), find() (+1 more)

### Community 26 - "Account.jsx"
Cohesion: 0.33
Nodes (8): Account(), RACE, raceName(), MountsPanel(), Panel(), setToken(), useDo(), postAuth()

### Community 27 - "StructureModal.jsx"
Cohesion: 0.50
Nodes (5): StructureModal(), activeLine(), doorLines(), REALM_FR, fmtWait()

### Community 28 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Guild.jsx`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `Forum.jsx`, `Login.jsx`, `TileCard.jsx`, `SidePanel.jsx`, `GameCanvas.jsx`, `Panels.jsx`, `App.jsx`, `Capital.jsx`, `ChatDock.jsx`, `StatCostsTab.jsx`, `Account.jsx`, `StructureModal.jsx`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Should `api` be split into smaller, more focused modules?**
  _Cohesion score 0.06540697674418605 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `MonsterDetails.jsx` to `api`, `Guild.jsx`, `entities.js`, `Races.jsx`, `ResourcesTab.jsx`, `scene.js`, `Login.jsx`, `TileCard.jsx`, `package.json`, `GameCanvas.jsx`, `App.jsx`, `Capital.jsx`, `ChatDock.jsx`, `MapLegend.jsx`, `divine.js`, `StatCostsTab.jsx`, `terrain`, `StructureModal.jsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Why does `react` connect `api` to `Guild.jsx`, `entities.js`, `MonsterDetails.jsx`, `Races.jsx`, `ResourcesTab.jsx`, `Forum.jsx`, `Login.jsx`, `TileCard.jsx`, `SidePanel.jsx`, `package.json`, `GameCanvas.jsx`, `Panels.jsx`, `App.jsx`, `Capital.jsx`, `ChatDock.jsx`, `StatCostsTab.jsx`, `Account.jsx`, `StructureModal.jsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._
- **Should `MonsterDetails.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10241545893719807 - nodes in this community are weakly interconnected._