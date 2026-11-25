---
title: Onglet Monstres : liste des types + fiche (caractéristiques groupées, capacités, équipement, réapparition, instances sur les cartes)
slug: monster-details-ui
status: done
updated: 2026-11-25
files:
  - src/components/Panels.jsx
  - src/admin/MonsterDetails.jsx
  - src/admin/MonsterParts.jsx
  - src/admin/entityFields.js
  - src/admin/monsterDetails.js
  - src/admin/Pick.jsx
  - src/admin/MiniMap.jsx
  - src/admin/index.jsx
  - src/styles.css
symbols:
  - src/admin/monsterDetails.js:SLOTS
  - src/admin/monsterDetails.js:pickFilter
  - src/admin/MonsterDetails.jsx:MonsterDetails
  - src/admin/Pick.jsx:Pick
tests:
  - test/monsterDetails.test.js
  - test/monsterRespawn.test.js
---
## Purpose
Onglet admin « Monstres » : liste des types, puis fiche à 4 onglets — Caractéristiques, Capacité (sorts actifs/passifs),
Spécificités (quantités max, parties du corps équipables), Liste (instances du type : placement, déplacement, butin, équipement).

## Business rules
- Montures fusionnées (lot B) : groupe « Rareté et déplacement » (rareté, déplacement combinable Terrestre / Aérien / Aquatique, jamais vide — `toggleLoco`) et groupe « Monture » (case « Peut servir de monture », puis vitesse, portage, bonus de vue et de portée) ; la liste affiche rareté et « monture (modes) ». Plus de section « Montures » dans la navigation.
- Un champ JSON non retouché (objet reçu de l'API) s'enregistre tel quel (`jsonOr`).
- Le champ « Garde (relique/arcane/artefact) » n'est plus dans la fiche : l'objet divin gardé se règle par monstre (butin / objets divins).
- Capacités : actives (lancées à la demande) et passives (en continu, sans énergie, cible alliés/ennemis + rayon) ; catalogue global de sorts avec recherche.
- Parties équipables : silhouette dont chaque partie se coche ET se décoche (bouton à bascule, `aria-pressed`) + liste des parties cochées retirables (×) ; sans partie cochée, aucun équipement ne peut être ajouté aux monstres du type (règle aussi appliquée par le serveur) ; une pièce portée reste supprimable.
- L'onglet Liste n'affiche que les instances DU TYPE ouvert ; une seule zone partagée création / édition.
- Déplacement par x/y saisis ou clic sur la mini-carte (zoom molette/boutons, déplacement par glisser ; clic sans glisser = choix de case).
- Butin du tueur : objet, ressource (id du catalogue) ou Or (`resource: 'or'`, crédité en or par le back).
- Menus de choix (`Pick`) : recherche + 20 éléments par page, rendus seulement quand ouverts, fermés au clic extérieur.
- Mise en page : liste des types à gauche (recherche, PV, XP au tueur) + fiche à droite ; onglets Caractéristiques (groupes Identité, Vie et énergie, Combat, Rang et récompenses — rang, XP donnée au tueur une fois, or), Capacités, Équipement et quantité, Sur les cartes ; quitter une fiche modifiée demande confirmation.
- Silhouette : les 10 emplacements d'un personnage (deux armes, deux bracelets, deux bagues ; `SLOTS`, `SLOT_SHORT`, `SLOT_POS`) ; l'équipement d'un monstre posé se retire par emplacement.
- Réapparition et objet divin porté : réglés sur CHAQUE monstre posé (« Sur les cartes » → Sélectionner → `RespawnPanel` sur la ligne de l'instance), plus sur le type ; objet divin porté = famille (une pièce à la fois, plafond et détenus affichés) ; un sauvage n'a pas ce panneau. Le tableau des monstres posés résume la réapparition et la pièce portée.
- Créatures en jeu (`Panels.jsx:MountGear`) : mêmes emplacements ; seuls les objets du sac du bon type (`GROUP`) sont proposés.

## Gotchas
- `SLOTS` = 7 valeurs alignées sur le CHECK `monster_equips.slot` du back : modifier les deux ensemble.
- Mettre à jour l'état de création avec `setNw({ ...nw, mapId })` (la forme updater mal appelée a corrompu l'état).
- `open()` ne doit appeler aucun setter supprimé (`setPend` avait vidé toutes les fiches).
- Ne pas masquer le menu `Pick` par `display:none` ; garder `wheel` en écouteur natif non passif.
- Pas de bandeau `headrow` à l'intérieur d'un onglet (seul le titre de la fiche en a un).
- Classes admin : jamais une classe globale du jeu (`.inl` = ligne d'insertion du glisser-déposer → `.inlabel`).

## Tests
`test/monsterRespawn.test.js` (`respawnBody`, `respawnSummary`, plus de champ « Garde », `toggleLoco`, `locoLabel`) ; `test/admin.test.js` (`jsonOr` objet, champs de monture du monstre) ; `test/monsterDetails.test.js` (silhouette à bascule + liste retirable, 7 `SLOTS`, filtres, libellés, `placeBody`, effets en corps de bloc, `<thead>/<tbody>`, `Pick` paginé, `MiniMap`) ; `test/adminDom.test.js`.
