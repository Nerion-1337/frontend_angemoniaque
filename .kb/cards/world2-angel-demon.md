---
title: Monde Anges & Démons (UI) : sol par zone, ressources visibles, eau teintée, légende
slug: world2-angel-demon
status: done
updated: 2026-11-24
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
Rendu du monde 2 (Anges & Démons), copie exacte de la logique du back : ce qui est dessiné sur une case est ce qu'on y récolte.

## Business rules
- La teinte du sol suit la zone (moyenne de la couleur `ground` des cases voisines), sinon la teinte du type de case.
- L'apparence 3D d'une ressource vient de `RESOURCES2[].look` ; herbe, arbres isolés et roches suivent la zone ; la lave porte les cristaux de Cœur de magma.
- Eau sombre côté démons, claire côté anges (recalculée à chaque déplacement).
- Carte globale, légende, carte de case et emplacement affichent la ZONE (« Forêt calcinée ») plutôt que le type générique.

## Gotchas
- Ajouter une ressource : entrée `RES` + zone dans `tools/catalogue2.py` ; `check()` refuse arbre hors forêt, plante hors plaine/aride/eau, minerai hors sol rocheux, récolte sans apparence.
- `terrain.js` est généré : le crochet `mapId === 2` doit rester dans le gabarit.

## Tests
`test/world2.test.js` (délégation de `terrain()`, légende, poids, eau) ; cohérence complète dans les tests du back.
