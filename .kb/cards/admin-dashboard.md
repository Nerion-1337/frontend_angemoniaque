---
title: Admin dashboard (Étape 2 phase 1) : shell + éditeurs d'entités génériques
slug: admin-dashboard
status: done
updated: 2026-11-26
files:
  - src/admin/index.jsx
  - src/admin/Dashboard.jsx
  - src/admin/StructuresTab.jsx
  - src/admin/EntityRules.jsx
  - src/admin/Races.jsx
  - src/admin/Divine.jsx
  - src/admin/entityFields.js
  - src/admin/ui.jsx
  - src/store/admin.js
  - src/store/index.js
symbols:
  - src/admin/entityFields.js:FIELDS
  - src/admin/entityFields.js:URL_KIND
  - src/admin/StructuresTab.jsx:StructuresTab
  - src/store/admin.js:Ad
tests:
  - test/admin.test.js
  - test/adminUi.test.js
---
## Purpose
Back-office d'administration (`src/admin/`, route `#admin`) : application plein écran à sections (Pilotage, Joueurs, Races & Rangs,
Monstres (dont les types montables), Objets, Sorts, Parchemins, Cases, Ressources, Bâtiments), éditeur générique d'entités, règles transverses, toasts et éléments partagés.

## Business rules
- Accès : `#admin` ET `auth.admin` ; sinon « Accès réservé ».
- Toute suppression demande confirmation (`confirmDel`) ; toute action affiche un toast : succès `Ad.ok` (vert, 4 s), erreur `Ad.msg` (rouge, 6 s).
- La dernière section ouverte est retenue dans `localStorage` (`admin.section`), lecture/écriture protégées par try/catch.
- Pilotage : compteurs, personnages par race, journal d'audit filtrable (jusqu'à 200 lignes), état de l'horloge ; « Simuler +1 heure » = tick supplémentaire.
- Éditeur générique (Bâtiments) : champs décrits par `FIELDS` (`[colonne, libellé, number|check|json]`) ; un JSON invalide bloque l'enregistrement ; quitter une fiche modifiée demande confirmation.
- Routes au nom de table PLURIEL : `URL_KIND` (front) doit rester identique au `URL_KIND` du back.
- Le contenu venant de l'API est rendu comme texte React, jamais en HTML.
- CSS : aucune classe admin ne reprend un nom global du jeu ; `.apanel` remplace `.panel`, et `.cell`, `.actions`, `.item.row2`, `.empty`, `.logo` sont neutralisés sous `.admin`.
- Section « Parchemins » : recettes de fabrication (card `scrolls-shop-ui`).
- Bâtiments : champs armure, case occupable, bonus, attaques de l'occupant, production et sorts (card `buildings-ui`).
- Section « Ressources » : gisements (card `resources-ui`).

## Gotchas
- Un effet qui charge des données s'écrit `useEffect(() => { load(); }, deps)` : passer le loader directement renvoie sa Promise comme fonction de nettoyage → « destroy is not a function » au changement d'onglet.
- Nouvelle classe CSS admin : vérifier par `grep` qu'elle n'existe pas déjà dans `styles.css` (régression du 2026-11-24 : panneaux plaqués à gauche sous la barre).
- Nouveau type d'entité : entrée `FIELDS` ET clé `URL_KIND`.

## Tests
`test/admin.test.js` (slice, `FIELDS`, `jsonOr`), `test/adminEffects.test.js` (effets en corps de bloc), `test/adminUi.test.js` (toasts typés, recherche, confirmations) ; API testée côté back (`admin.test.ts`). Rendu vérifié dans Chromium (Playwright, 9 sections, bureau + mobile).
