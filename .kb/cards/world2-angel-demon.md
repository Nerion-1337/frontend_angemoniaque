---
title: Monde Anges & Démons (UI) : sol par zone, ressources visibles, eau teintée, légende
slug: world2-angel-demon
status: done
updated: 2026-10-21
files:
  - src/lib/world2.js
  - src/lib/resources2.js
  - src/lib/angelDemonMap.js
  - src/lib/relief.js
  - src/three/scene.js
  - src/components/MapLegend.jsx
  - src/components/Panels.jsx
symbols:
  - src/lib/relief.js:zoneTint
  - src/three/scene.js:buildVegetation
  - src/components/MapLegend.jsx:MapLegend
tests:
  - test/world2.test.js
---
## Purpose
Rendu du monde 2 (copie exacte de la logique back, voir fiche back `world2-angel-demon`) avec une règle : **ce qui est dessiné sur une case est ce qu'on y récolte**.

## How it works
- `relief.js:zoneTint` mélange la couleur `ground` des 4 cases voisines (sol de zone) ; à défaut, la teinte par type (arides, glaces, éther, volcan) comme avant.
- `scene.js` : `ORE_FX`/`FLORA_FX`/`WOOD` sont complétés depuis `RESOURCES2[].look` (cristaux émissifs, plantes à 3 formes, arbres, `bare` = arbre mort sans feuillage). Sol : herbe teintée par zone (`grass`, `false` = aucune), arbres isolés par zone (`lone`), roches par zone (`rock`), lave sans aiguilles (`flat`) mais couverte de cristaux de Cœur de magma. Minerais aussi sur les terres arides. Les maillages sans instance sont masqués (`visible`).
- Eau : couleur par sommet (`waterTint`) recalculée à chaque déplacement.
- `Panels.jsx` : carte globale colorée par `ground` pour le monde 2 ; `MapLegend` du monde 2 liste zone par zone (même couleur que la carte) et ses ressources. `TileCard`/`Location` affichent le libellé de zone (« Forêt calcinée ») au lieu du type générique.

## Tests
`test/world2.test.js` (délégation de `terrain()`, légende, poids, eau) ; la cohérence complète est dans les tests back.

## Gotchas
- Ajouter une ressource : une entrée `RES` + une zone dans `tools/catalogue2.py` ; le contrôle `check()` refuse arbre hors forêt, plante hors plaine/aride/eau, minerai sur sol non rocheux, récolte sans apparence.
- `terrain.js` est généré : le crochet `mapId === 2` doit exister dans le gabarit.
