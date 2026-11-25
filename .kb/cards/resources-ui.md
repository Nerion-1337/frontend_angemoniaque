---
title: Section admin Ressources (carte, ressources naturelles, secteurs) ; ressource de secteur dans la carte de case
slug: resources-ui
status: done
updated: 2026-11-25
files:
  - src/admin/ResourcesTab.jsx
  - src/admin/ResourceMap.jsx
  - src/admin/deposits.js
  - src/components/TileCard.jsx
  - src/admin/BuildingExtras.jsx
symbols:
  - src/admin/deposits.js:sectorBody
  - src/admin/deposits.js:pickShare
  - src/admin/deposits.js:cellResource
  - src/admin/deposits.js:naturalScan
  - src/admin/deposits.js:newShare
  - src/admin/ResourceMap.jsx:ResourceMap
tests:
  - test/deposits.test.js
---
## Purpose
Section admin « Ressources » : carte de chaque monde (terrain + ressource de chaque case), ressources naturelles déjà présentes,
secteurs tracés sur la carte avec plusieurs ressources (part %, type de case, stock) ; en jeu, la carte de case affiche la ressource du secteur.

## Business rules
- Carte (`ResourceMap`) : terrain du jeu (`lib/terrain`) ; couche « Ressources » = ressource effective de chaque case (`cellResource` : secteurs actifs du plus petit au plus grand, sinon terrain) ; contours des secteurs (sélectionné en or, inactif en pointillés).
- Outil « Tracer un secteur » : glisser = zone d'un nouveau secteur (ou nouvelle zone du secteur ouvert) ; clic = ouvre le secteur de la case ; « Déplacer » : glisser = pan ; molette / +− : zoom.
- Ressources naturelles (`naturalScan`) : nombre de cases et type de case dominant par ressource ; un clic les met en évidence sur la carte.
- Éditeur : nom, zone, actif, ressources (part %, type de case, stock max / actuel, régénération, par récolte) ; une ressource ajoutée prend son type de case naturel et la part restante (`newShare`).
- Totaux par type de case affichés (reste = naturel) ; > 100 % bloque l'enregistrement (`overLimit`), comme le serveur.
- Aperçu en direct : la carte montre la répartition du secteur en cours d'édition avant l'enregistrement.
- Carte de case en jeu : la ressource du secteur remplace la ressource naturelle ; ligne « Gisement « secteur » : ressource — stock / max ».
- Conditions de récolte : liste des ressources à conditions (texte serveur `needs`), ajout par sélecteur, bouton « Conditions » sur chaque ressource d'un secteur, cadenas sur les ressources concernées ; éditeur = `ActivationEditor` (objets équipés ou sac, sort, ressources, or, rang, consommation à chaque récolte) ; aucune option = libre.
- Carte de case en jeu : ligne « Récolte : nécessite … » (`harvestNeeds`).
- Prix de l'amélioration « Carte des ressources » réglable dans l'onglet (vendue à l'Hôtel de ville).
- « Réglages des ressources » : quantité par emplacement (sac et coffre) + conditions de récolte dans le même éditeur ; liste des ressources réglées (taille de pile ≠ 20 ou conditions).

## Gotchas
- `deposits.js` duplique le tirage du back (`game/deposits.ts`) : valeurs figées identiques dans les deux tests.
- `.note` est en flex : pas de `<b>` dedans.
- `ResourcesTab.jsx` / `ResourceMap.jsx` / `deposits.js` : importer avec l'extension.

## Tests
`test/deposits.test.js` (tirage miroir, `sectorBody` / `sectorDraft`, totaux et dépassement, `newShare`, une ressource par case et priorité des secteurs, `naturalScan` du Monde des Hommes, `zoneLabel`).
