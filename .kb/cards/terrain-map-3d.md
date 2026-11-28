---
title: 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions
slug: terrain-map-3d
status: done
updated: 2026-11-28
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
  - src/lib/levels.js
  - src/lib/resources3.js
  - src/three/creatures.js
symbols:
  - src/lib/terrain.js:terrain
  - src/lib/terrain.js:noiseAt
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
  - src/lib/levels.js:levelAt
tests:
  - test/lib.test.js
  - test/world.test.js
  - test/levels.test.js
  - test/personLook.test.js
  - test/mountRider.test.js
---
## Purpose
Rendu client du monde : miroir exact du modèle du back (carte 1 dessinée, monde 2 par zones, carte 3 générée), règles d'énergie
et de l'invocation montée pour les estimations, scène 3D, carte de case, légende et boussole.

## Business rules
- Le miroir `terrain.js` / `humanMap.js` / `resources.js` est identique au back : même type, coût, ressource (nom affiché, id stocké) pour chaque case.
- Estimation d'énergie (`pathEnergy`) : pas Chebyshev ; monture aérienne = 1 ; aquatique = 1 sur l'eau ; terre ferme impossible si l'invocation montée n'est pas terrestre (`terrestrial`, défaut : un aquatique ne l'est pas) — amphibie = les deux ; à pied = coût admin du type de case du monde (`costOf`), eau profonde impossible.
- `pathEnergy` calcule toujours sur le monde COURANT (`setWorld`, appelé à chaque rafraîchissement du personnage).
- Plus de zone sacrée codée en dur (2026-11-28) : l'option d'attaque est grisée en zone de paix d'une structure (card `struct-activation-ui`).
- La carte de case affiche le type réglé en admin (nom, description, effet continu, coût) ; jamais de PV exacts (état public).
- Le serveur reste seul juge : le front ne fait que prévisualiser.
- La carte de case affiche le gisement de la case et propose sa récolte (card `resources-ui`).
- Niveaux verticaux (`lib/levels.js`, affichage seulement) : chaque case est une colonne de cubes de `LEVEL_H` = 0,5 ; sol 0 ; eau peu profonde −1 (−2 au contact de l'eau profonde) ; eau profonde −4 ; massifs (montagne, glace, éther, volcan) = distance au bord du massif, de +1 à +5 (champ de lave plat = +1) ; arbres de +1 à +3 ; ciel +8 ; créatures volantes au niveau +6 (`FLY`).
- Scène : dessus de colonne + faces latérales découpées par niveau là où le voisin est plus bas (teinte alternée) ; végétation, curseurs, quadrillage (contour de chaque case à sa hauteur), points cardinaux et entités posés sur le dessus (à la surface sur l'eau, `standY`) ; volants (`flying` de `/map/area`) à `FLY_Y` (+6) avec fil + anneau vers la case survolée ; la caméra suit au niveau +6 un héros sur monture volante ou une créature volante contrôlée.
- Clic sur une face latérale = case de la colonne (point reculé selon la normale). La carte de case affiche « niveau +n ».
- Estimation d'énergie : la créature contrôlée utilise sa locomotion (`me.actor.loco`) — volante = 1 par case, comme le serveur.
- Personnages : jambes, torse, bras, tête (cheveux, yeux), tenue par race (cape humaine ; robe, ailes en plumes et auréole d'ange ; cornes, épaulières, queue et yeux luisants de démon), respiration / bras animés. Créatures : modèle généré (museau, yeux luisants, cornes ou oreilles, pattes, queue ; teinte et proportions tirées du nom ; ailes qui battent si volante) ; une invocation non « golem » utilise ce modèle.
- Royaume des Morts : miroir `lib/resources3.js` (3 ressources uniques, rendues comme plante / arbre / minerai) ; légende dédiée.

- Personnage selon la race ET le rang (`person(race, me, rank)`, rang 1-5) : rang 2 épaulières et ceinture de bronze (démon : épaulières à pointe), 3 plastron d'argent et diadème, 4 or et aura au sol, 5 couronne, orbes en orbite, lumière, taille ×1,08 ; ailes et cornes grandissent avec le rang ; ange séraphin (4 ailes) au rang 5 ; ailes de démon dès le rang 3. La clé d'entité inclut le rang (modèle reconstruit au passage de rang).
- Néphilim = hybride : aile de plumes à gauche, aile membraneuse à droite, une corne, demi-halo brisé, yeux vairons (or / rouge), tenue blanche à écharpe pourpre ; étiquette mauve.
- Hôtel de ville selon `building_race` (`capital(race)`) : humain = hôtel de pierre, toit d'ardoise, beffroi à horloge, bannières ; démon = bastion d'obsidienne à pointes, coulées de lave, braseros ; ange = sanctuaire de marbre à colonnes, dôme d'or, anneaux de lumière ; sans race = humain.
- Invocation montée volante : seules ses ailes battent (références gardées) ; le cavalier, enfant de la monture, ne pivote jamais avec elles et garde sa propre animation (ticks chaînés).
- Monstres et invocations (montées ou non) : design du catalogue (`creature(e)`) ramené à une emprise d'environ une case sur sa longueur / hauteur (l'envergure peut déborder ; ×1,3 si taille ≥ 2) ; monture : échelle telle que la selle soit à ~0,62 ; cavalier posé sur la selle hors de l'échelle de la créature (`mounted`), chacun garde son animation ; étiquette au-dessus de la hauteur réelle.
- Carte modernisée (même structure) : dessus des cases biseauté (plateau + quatre biseaux plus sombres, remplace le quadrillage blanc, gardé très discret à moins de ~4 cases), léger damier de teintes, ombres de nuages qui défilent (texture de bruit en coordonnées monde dans le shader du sol), particules d'ambiance (pollen le jour, lucioles la nuit), curseurs de case à coins lumineux pulsés, étalonnage final (vignette, contraste, saturation).
- Étalonnage final réglé par le joueur (2026-11-26) : luminosité ×1, contraste ×1 (neutre), saturation neutre, bloom 0,15 (+0,07 la nuit). Ne pas changer sans demande.
- Blancs détaillés : exposition 1,05–1,1 (au lieu de 1,25–1,3, qui brûlait murs blancs et fleurs) compensée par `gam` 0,88 (tons moyens relevés dans l'étalonnage).
- Plantes de ressource (`FLORA_FX`) : clarté PERÇUE (sRGB, `getHSL(…, SRGBColorSpace)`) plafonnée à 0,45 et émission 0,08 ; en espace linéaire, le pissenlit jaune passait sous le seuil et restait blanc au soleil.
## Gotchas
- Toute modification du terrain ou de l'énergie se fait des DEUX côtés (back et front) ; les fichiers générés se régénèrent par `tools/gen_*`.
- `setWorld` est un état global : les tests doivent le fixer avant tout calcul.
- Ne jamais passer une cible d'un autre monde à `pathEnergy`.
- Nouveau type de case : couleur dans `relief.js` (`COLORS`) et dans `energy.js`.

## Tests
`test/lib.test.js` (énergie, `stopAt`, règles de l'eau, id ⇄ nom sur les 3 cartes) ; `test/world.test.js` (mêmes invariants que le back) ; `test/adminTiles.test.js` (`costOf`).
