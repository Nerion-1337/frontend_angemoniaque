# Graph Report - front  (2026-11-28)

## Corpus Check
- 153 files · ~100,622 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .conf 1)

## Summary
- 816 nodes · 2722 edges · 30 communities (29 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d7ea3e3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Panels.jsx
- vitest
- Guild.jsx
- entities.js
- Forum.jsx
- TileCard.jsx
- MonsterDetails.jsx
- creatures.js
- ResourcesTab.jsx
- api
- terrain.js
- with
- Empty
- Login.jsx
- Races.jsx
- relief.js
- react
- world2.js
- MapLegend.jsx
- Entities.jsx
- terrain
- createScene
- PlayersTab.jsx
- RankReq.jsx
- StatCostsTab.jsx
- ScrollsTab.jsx
- XpRank.jsx
- react-redux
- AGENTS.md — ia_agent / front

## God Nodes (most connected - your core abstractions)
1. `api()` - 111 edges
2. `react` - 53 edges
3. `vitest` - 42 edges
4. `react-redux` - 40 edges
5. `lucide-react` - 39 edges
6. `Empty()` - 38 edges
7. `terrain()` - 34 edges
8. `confirmDel()` - 28 edges
9. `Ad` - 27 edges
10. `App()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `stepInto()` --calls--> `pathEnergy()`  [EXTRACTED]
  test/lib.test.js → src/lib/energy.js
- `find()` --calls--> `terrain()`  [EXTRACTED]
  test/lib.test.js → src/lib/terrain.js
- `LegalEdit()` --calls--> `api()`  [EXTRACTED]
  src/components/ForumMod.jsx → src/lib/api.js
- `scan()` --calls--> `levelAt()`  [EXTRACTED]
  test/levels.test.js → src/lib/levels.js
- `scan()` --calls--> `terrain()`  [EXTRACTED]
  test/levels.test.js → src/lib/terrain.js

## Import Cycles
- None detected.

## Communities (30 total, 1 thin omitted)

### Community 0 - "Panels.jsx"
Cohesion: 0.06
Nodes (77): react-dom@^18, react-dom, Admin, App(), Account(), RACE, raceName(), Capital() (+69 more)

### Community 1 - "vitest"
Cohesion: 0.06
Nodes (31): devDependencies, vite@^5, @vitejs/plugin-react@^4, vitest@^2, name, scripts, build, dev (+23 more)

### Community 2 - "Guild.jsx"
Cohesion: 0.11
Nodes (41): Confirm(), FmtBar(), FmtField(), PrevToggle(), rgbOf(), useFmt(), AddCard(), Arrows() (+33 more)

### Community 3 - "entities.js"
Cohesion: 0.10
Nodes (38): three, Appearance(), Preview(), CreatureIcon(), Glyph(), L, CREATURE, CREATURES (+30 more)

### Community 4 - "Forum.jsx"
Cohesion: 0.11
Nodes (39): Author(), Badges(), Category(), Compose(), Forum(), go(), Home_(), Legal() (+31 more)

### Community 5 - "TileCard.jsx"
Cohesion: 0.10
Nodes (31): FACTION_FR, rulesBody(), hpPerHour(), spellSummary(), tileBody(), WORLD_LABEL, hex(), TilesTab() (+23 more)

### Community 6 - "MonsterDetails.jsx"
Cohesion: 0.14
Nodes (31): structureRespawnBody(), structureRespawnDraft(), COLORS, MiniMap(), capLabel(), capsToMaxCaps(), EMPTY(), equipLabel() (+23 more)

### Community 7 - "creatures.js"
Cohesion: 0.28
Nodes (35): anim(), batWing(), beastHead(), biped(), bird(), blob(), bug(), cephalo() (+27 more)

### Community 8 - "ResourcesTab.jsx"
Cohesion: 0.17
Nodes (25): activationBody(), activationSummary(), buildingBody(), groupDraft(), groupSummary(), ActivationEditor(), area(), cellResource() (+17 more)

### Community 9 - "api"
Cohesion: 0.15
Nodes (22): lucide-react@^0.460.0, lucide-react, ago(), Dashboard(), KPI, blessingCost(), faithBody(), STAT_LABEL (+14 more)

### Community 10 - "terrain.js"
Cohesion: 0.09
Nodes (25): CODES, FEATURES, H, ROWS, W, RARE3, RES3_BY_ID, RESOURCES3 (+17 more)

### Community 11 - "with"
Cohesion: 0.08
Nodes (27): jobs, publish, test, name, on, pull_request, push, contents (+19 more)

### Community 12 - "Empty"
Cohesion: 0.23
Nodes (20): Divine(), Families(), validFamilyKey(), blank, ItemsTab(), RARITIES, RARITY_LABEL, USABLE_KINDS (+12 more)

### Community 13 - "Login.jsx"
Cohesion: 0.18
Nodes (20): Backdrop(), CharSelect(), GIcon(), GoogleLogin(), HomeLinks(), LatestNews(), Login(), Logo() (+12 more)

### Community 14 - "Races.jsx"
Cohesion: 0.20
Nodes (16): COMBAT_FIELDS, COMBAT_KEYS, combatBody(), CombatXp(), rankCombatValue(), RaceRules(), RULE_KEYS, rulesBody() (+8 more)

### Community 15 - "relief.js"
Cohesion: 0.12
Nodes (23): base(), cellTint(), DEEP, FOREST, g2, GRASS, GRASS2, groundColor() (+15 more)

### Community 16 - "react"
Cohesion: 0.21
Nodes (16): react, BuildingExtras(), BuildingSpells(), Pick(), SpellEffects(), useSummonables(), AFFECTS_LABEL, fxBody() (+8 more)

### Community 17 - "world2.js"
Cohesion: 0.13
Nodes (18): FEATURES2, H2, ROWS2, W2, CELLS, COST, FRONTIER_X, ihash() (+10 more)

### Community 18 - "MapLegend.jsx"
Cohesion: 0.21
Nodes (12): hex(), LegendAngDem(), MapLegend(), RES2_BY_ID, RESOURCES2, SIDES, ZONES2, GROUPS (+4 more)

### Community 19 - "Entities.jsx"
Cohesion: 0.31
Nodes (10): buildingDraft(), Entities(), FIELDS, jsonOr(), jsonText(), URL_KIND, RuleForms(), RulesList() (+2 more)

### Community 20 - "terrain"
Cohesion: 0.30
Nodes (13): FLY, FLY_Y, LEVEL_H, levelAt(), memo, ring(), ROCK, SKY (+5 more)

### Community 21 - "createScene"
Cohesion: 0.17
Nodes (14): ss(), lerpHex(), waterTint(), cloudTex(), createScene(), animMotes(), applyTime(), buildGrid() (+6 more)

### Community 22 - "PlayersTab.jsx"
Cohesion: 0.31
Nodes (11): familyLabel(), pageWindow(), PLACE_LABEL, posLabel(), RACE_LABEL, STAT_GROUPS, STAT_KEYS, statDiff() (+3 more)

### Community 23 - "RankReq.jsx"
Cohesion: 0.31
Nodes (9): condBody(), condDraft(), condSummary(), MODES, Path(), RankReq(), reqBody(), reqDraft() (+1 more)

### Community 24 - "StatCostsTab.jsx"
Cohesion: 0.44
Nodes (9): MAX_TIERS, multisOf(), newRule(), num(), preview(), ruleBody(), STAT_LABEL, upgradeCost() (+1 more)

### Community 25 - "ScrollsTab.jsx"
Cohesion: 0.50
Nodes (5): recipeBody(), recipeDraft(), resLabel(), TARGET_LABEL, ScrollsTab()

### Community 26 - "XpRank.jsx"
Cohesion: 0.61
Nodes (5): diffLabel(), rankPercent(), rowsOf(), tableOf(), XpRank()

### Community 27 - "react-redux"
Cohesion: 0.29
Nodes (7): dependencies, react@^18, react-redux@^9, @reduxjs/toolkit@^2, three@^0.170.0, react-redux, @reduxjs/toolkit

### Community 28 - "AGENTS.md — ia_agent / front"
Cohesion: 0.33
Nodes (5): AGENTS.md — ia_agent / front, Conventions de code et architecture des composants, Rôle de ce dépôt, Stack et commandes, Travail dans ce dépôt

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api()` connect `api` to `Panels.jsx`, `vitest`, `Guild.jsx`, `Forum.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `Empty`, `Login.jsx`, `Races.jsx`, `react`, `Entities.jsx`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ScrollsTab.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Should `Panels.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05635964912280702 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `Panels.jsx`, `Guild.jsx`, `entities.js`, `Forum.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `api`, `Empty`, `Login.jsx`, `Races.jsx`, `react`, `MapLegend.jsx`, `Entities.jsx`, `terrain`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ScrollsTab.jsx`, `XpRank.jsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.06431372549019608 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Panels.jsx`, `vitest`, `Guild.jsx`, `entities.js`, `Forum.jsx`, `TileCard.jsx`, `MonsterDetails.jsx`, `ResourcesTab.jsx`, `api`, `Empty`, `Login.jsx`, `Races.jsx`, `Entities.jsx`, `PlayersTab.jsx`, `RankReq.jsx`, `StatCostsTab.jsx`, `ScrollsTab.jsx`, `XpRank.jsx`, `react-redux`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `Guild.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10745098039215686 - nodes in this community are weakly interconnected._
- **Should `entities.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10289115646258504 - nodes in this community are weakly interconnected._