---
title: Designs 3D de créatures (85) et icônes de créatures (médaillon + initiales)
slug: creature-designs
status: done
updated: 2026-11-26
files:
  - src/lib/creatureCatalog.js
  - src/three/creatures.js
  - src/lib/creatureIcons.js
  - src/components/CreatureIcon.jsx
  - src/admin/Appearance.jsx
symbols:
  - src/lib/creatureCatalog.js:designFor
  - src/lib/creatureCatalog.js:habitatOf
  - src/lib/creatureIcons.js:initials
  - src/lib/creatureIcons.js:iconKey
  - src/three/creatures.js:buildCreature
  - src/components/CreatureIcon.jsx:CreatureIcon
  - src/admin/Appearance.jsx:Appearance
tests:
  - test/creatures.test.js
  - test/mountRider.test.js
---
## Purpose
Catalogue de 85 designs 3D de créatures (30 aériens, 40 terrestres, 15 aquatiques) générés par plans de corps paramétrés, et bibliothèque d'icônes de créatures affichées en médaillon avec les initiales ; l'admin associe un design et une icône à chaque type de monstre.

## Business rules
- Catalogue (`lib/creatureCatalog.js`, données pures) : clé, nom, milieu (air / land / water), plan de corps, couleurs [principale, secondaire, accent lumineux], paramètres, icône par défaut ; clés uniques.
- Plans (`three/creatures.js`) : quadrupède, bipède, oiseau, serpent, arthropode, poisson, céphalopode, méduse, raie, tortue, hippocampe, arbre, élémentaire ; corps à contre-ombrage (couleurs de sommets dos / ventre), membres en chaînes articulées, ailes membraneuses (bras en bord d'attaque) ou à plumes (rémiges vers l'arrière), animation par `tick(t)` ; repère : regarde +z, pieds à y = 0, `userData.height` et `userData.saddle`.
- Design d'une créature (`designFor`) : clé choisie (monsters.model) si elle existe, sinon nom reconnu (nom exact, ou un mot significatif du nom ; mots génériques ignorés : géant, royal, sombre…), sinon tiré de façon stable dans son milieu (déplacement : air si volant, eau si seulement aquatique, sinon terre).
- Icônes (`lib/creatureIcons.js`) : glyphes au trait 24×24 dessinés ou repris de lucide (imports nommés) ; icône d'une créature = choisie (monsters.icon), sinon celle du design, sinon selon le milieu ; initiales = deux premières lettres significatives du nom (articles ignorés), « ? » si vide.
- Médaillon (`CreatureIcon`) : glyphe en fond, initiales par-dessus, teinte selon le milieu ; utilisé dans le HUD (invocation contrôlée, monture) et le panneau Invocations.
- Admin Monstres › Apparence (`admin/Appearance.jsx`) : aperçu 3D animé et tournant, catalogue par milieu, grille d'icônes filtrable ; vide = automatique (envoyé null).

## Gotchas
- Une géométrie sans couleurs de sommets sur un matériau `vertexColors` s'affiche noire : `mk()` ajoute le contre-ombrage à partir de `material.userData.top/bot`.
- Les ailes sont dans un plan horizontal : vues de profil, l'aile du fond paraît être une baguette (normal) ; en jeu la caméra est au-dessus.

## Tests
`test/creatures.test.js` (30/40/15, clés et icônes, chaque design se construit et s'anime, choix automatique, initiales) ; `test/mountRider.test.js`.
