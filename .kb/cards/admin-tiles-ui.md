---
title: Section admin « Cases » : types de case par monde + affichage en jeu
slug: admin-tiles-ui
status: done
updated: 2026-11-23
files:
  - src/admin/TilesTab.jsx
  - src/admin/tiles.js
  - src/lib/tiles.js
symbols:
  - src/admin/tiles.js:tileBody
  - src/admin/tiles.js:hpPerHour
  - src/lib/tiles.js:costOf
tests:
  - test/adminTiles.test.js
---
## Purpose
Section admin **« Cases »** : un onglet par monde (Hommes / Anges & Démons / Morts) listant les types de case avec leur couleur,
nom, coût d'énergie, description et sort passif ; édition du nom, de la description, du coût et du sort appliqué en continu (bonus/malus).
Côté jeu, la carte de case (`TileCard`) affiche le nom, la description et l'effet continu, et l'estimation d'énergie utilise les coûts admin.

## How it works
- `TilesTab.jsx` : `GET /admin/content/tiles` + `GET /admin/content/spells` (picker `Pick`, option « Aucun sort ») ; onglet = `map_id` ;
  éditeur au-dessus du tableau ; `PUT /admin/content/tiles/{mapId}/{kind}` avec `tileBody(f)` ; aperçu « ±N PV par heure » = `hpPerHour(mode, spell.damage)`.
- `admin/tiles.js` (pur) : `WORLD_LABEL`, `tileBody` (pas de mode sans sort), `hpPerHour` (miroir back `tileHpDelta`), `spellSummary`.
- `lib/tiles.js` : `setTileCosts(list)` / `costOf(t)` (coût admin du monde courant, sinon `t.cost`) / `spellLine`. `energy.js` `pathEnergy` utilise `costOf`.
- `TileCard.jsx` : charge `/map/{mapId}/tile-types` à chaque changement de monde (`setTileCosts`) ; `cellCost(c)` = `c.tile.cost` ; `TileInfo` rend
  description + effet continu en TEXTE ; le titre garde la zone (monde 2) et ajoute le nom du type.

## Entry points
- `src/admin/index.jsx` : section `['tiles', 'Cases']` (icône `Grid3x3`).
- `components/TileCard.jsx` (carte de case et survol) ; `lib/energy.js:pathEnergy` (coûts affichés des actions).

## Data flow
Lit `/admin/content/tiles`, `/admin/content/spells`, `/map/{id}/tile-types`, `cell.tile` ; écrit `PUT /admin/content/tiles/…`.
État local au composant (pas de slice Redux) ; `lib/tiles.js` garde les coûts du monde courant en module.

## Tests
`test/adminTiles.test.js` : `tileBody` (sans sort → null/null), `hpPerHour`/`spellSummary`/`spellLine`, priorité de `costOf` sur le coût du terrain,
section branchée dans l'index et aucun `dangerouslySetInnerHTML` dans `TilesTab`/`TileCard`. Back : card `tile-types`.

## Gotchas
- Les coûts réels sont décidés par le serveur (`stepCost`) ; `lib/tiles.js` ne sert qu'à l'estimation affichée. Eau profonde : ∞ à pied quel que soit le coût.
- `setTileCosts` vaut pour le monde courant : il est rechargé quand `me.actor.pos.map_id` change.
- Les textes saisis en admin sont affichés comme texte React (jamais en HTML).

