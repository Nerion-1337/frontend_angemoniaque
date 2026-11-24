---
title: 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions
slug: terrain-map-3d
status: done
updated: 2026-11-24
files:
  - src/lib/terrain.js
  - src/lib/humanMap.js
  - src/lib/resources.js
  - src/lib/energy.js
  - src/lib/relief.js
  - src/three/scene.js
  - src/three/entities.js
  - src/components/GameCanvas.jsx
  - src/components/Location.jsx
  - src/components/TileCard.jsx
  - src/components/MapLegend.jsx
  - src/components/Compass.jsx
symbols:
  - src/lib/terrain.js:terrain
  - src/lib/terrain.js:noiseAt
  - src/lib/terrain.js:inSafeZone
  - src/lib/resources.js:RES_BY_ID
  - src/components/MapLegend.jsx:MapLegend
  - src/components/Compass.jsx:Compass
  - src/lib/energy.js:pathEnergy
  - src/lib/relief.js:heightAt
  - src/lib/relief.js:groundColor
  - src/three/scene.js:createScene
  - src/three/entities.js:makeEntity
  - src/components/GameCanvas.jsx:GameCanvas
  - src/components/TileCard.jsx:TileCard
tests:
  - test/lib.test.js
  - test/world.test.js
---
## Purpose
Rendu client du monde : miroir exact du modèle du back (carte 1 dessinée, monde 2 par zones, carte 3 générée), règles d'énergie
et de montures pour les estimations, scène 3D, carte de case, légende et boussole.

## Business rules
- Le miroir `terrain.js` / `humanMap.js` / `resources.js` est identique au back : même type, coût, ressource (nom affiché, id stocké) pour chaque case.
- Estimation d'énergie (`pathEnergy`) : pas Chebyshev ; monture volante = 1 ; aquatique = 1 sur l'eau, impossible sur terre ; à pied = coût admin du type de case du monde (`costOf`), eau profonde impossible.
- `pathEnergy` calcule toujours sur le monde COURANT (`setWorld`, appelé à chaque rafraîchissement du personnage).
- L'option d'attaque est masquée dans la zone sacrée (drapeau `safe` de `/map/{id}/cell`), comme le refus 403 du back.
- La carte de case affiche le type réglé en admin (nom, description, effet continu, coût) ; jamais de PV exacts (état public).
- Le serveur reste seul juge : le front ne fait que prévisualiser.

## Gotchas
- Toute modification du terrain ou de l'énergie se fait des DEUX côtés (back et front) ; les fichiers générés se régénèrent par `tools/gen_*`.
- `setWorld` est un état global : les tests doivent le fixer avant tout calcul.
- Ne jamais passer une cible d'un autre monde à `pathEnergy`.
- Nouveau type de case : couleur dans `relief.js` (`COLORS`) et dans `energy.js`.

## Tests
`test/lib.test.js` (énergie, `stopAt`, règles de l'eau, id ⇄ nom sur les 3 cartes) ; `test/world.test.js` (mêmes invariants que le back) ; `test/adminTiles.test.js` (`costOf`).
