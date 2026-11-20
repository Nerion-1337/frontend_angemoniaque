# Project overview
_Généré par `kb overview` — ne pas éditer ici ; notes manuelles dans `.kb/NOTES.md`._

# Project notes (maintenus à la main / par l'agent)

## Stack & conventions
- React 18 + Vite 5 + Redux Toolkit + Three.js ; petit sous-composants réutilisables (pas de fichiers monolithiques)
- État global : slice unique `game` (`src/store/index.js`) ; actions via `import { A } from './store'`
- API : uniquement `src/lib/api.js` (URLs relatives `/api/...`, Bearer token en localStorage) — proxy Vite/Nginx qui strip `/api`
- Aucune nouvelle dépendance sans accord (voir AGENTS.md)

## Commandes utiles
- tests : `npm test` (Vitest, runnables en Docker — aucun node_modules sur l'hôte ; le hook pre-commit build le target `test` du Dockerfile)
- dev : `npm run dev -- --host --port 5173` (ou `stack exec frontend -- npm run dev`)
- build : `npm run build`
- kb : backend d'embedding `hash` (offline) dans `.kb/config.json`

## Features (16)
- **admin-dashboard** [done] (.kb/cards/admin-dashboard.md) Admin dashboard (Étape 2 phase 1) : shell + éditeurs d'entités génériques — Front of the admin back-office (Étape 2 phase 1): a self-contained `src/admin/` module mounted on the existing `#admin` route. — files: src/admin/index.jsx, src/admin/Dashboard.jsx, src/admin/Entities.jsx, src/admin/EntityRules.jsx (+5)
- **admin-login-nav** [done] (.kb/cards/admin-login-nav.md) Connexion admin : redirection vers l'interface admin (#admin) — Après une **connexion ou une inscription réussie**, un compte admin doit pouvoir accéder directement à l'interface admin : la SPA le redirige sur `#admin` (l'écran d'admin s'ouvre immédiatement, avec  — files: src/lib/postAuth.js, src/components/Login.jsx, test/postAuth.test.js
- **bestiaire** [done] (.kb/cards/bestiaire.md) Bestiaire admin panel (phase 2): loot tables, spawn rules, map presence dashboard — Admin UI (Étape 2 phase 2, "Bestiaire" tab of `src/admin/index.jsx`, rendered after the generic `Entities kind="monster"` CRUD): manage per-monster loot tables (classical items, resources, divine item — files: src/admin/Bestiary.jsx, src/admin/bestiary.js
- **guild-default-rank-ui** [done] (.kb/cards/guild-default-rank-ui.md) Guilde (UI) : option unique du rang par défaut des nouveaux arrivants (Gestion) — Front half of the "default rank for newcomers" feature: in the guild manage tab (leader only), a single-choice control lets the Chef decide which rank accepted applicants / accepted invitations receiv — files: src/components/Guild.jsx, src/styles.css
- **guild-forum-tools** [done] (.kb/cards/guild-forum-tools.md) Guilde (UI) : formatage par balises texte ([g]/[i]/[rgb]), édition unifiée titre+description+droits, suppression/transfert — Forum v2 UX pass — édition et gestion : 1. — files: src/components/Guild.jsx, src/components/fmtbar.jsx, src/components/Confirm.jsx, src/lib/fmt.js (+4)
- **guild-forum-ui** [done] (.kb/cards/guild-forum-ui.md) Guilde (UI) : forum en drill-down, modales +, réorganisation, messages aérés et formatage — The "Forum" tab of the guild modal is a three-level drilldown (categories → topics → messages), with a back icon at each level. — files: src/components/Guild.jsx, src/lib/fmt.js, src/styles.css
- **guild-forum-v2** [done] (.kb/cards/guild-forum-v2.md) Guilde (UI) : forum v2 — typo centrée, cartes d'ajout + toggle, drag & drop, droits par rang, non-lus, carte de message — Front half of the forum revamp: centered larger section/category/topic titles (`.rhead`), a description line under each category/topic title (inline-editable, no reload), standardized "add" cards (big — files: src/components/Guild.jsx, src/lib/guild.js, src/lib/drag.js, src/styles.css
- **guild-list-presentation** [done] (.kb/cards/guild-list-presentation.md) Onglets guilde : présentation centrée, liste (invitations/postulants/membres) — Layout des onglets « 1. — files: src/components/Guild.jsx, src/styles.css
- **guild-pager-posts** [done] (.kb/cards/guild-pager-posts.md) Pagination commune des listes et cartes de message restructurées — Système de pagination commun (flèches icones seules ‹ › + input de page modifiable + `/total`) appliqué à toutes les listes (forum : catégories/sujets/messages ; onglet Liste : postulants/membres), et — files: src/components/Guild.jsx, src/styles.css
- **guild-ranks-insert-dnd** [done] (.kb/cards/guild-ranks-insert-dnd.md) Guilde (UI) : toggle d'insertion + drag & drop des rangs (Gestion) — Evolution of the "Rangs & privilèges" manage section: (1) a **toggle switch on the add-rank card** chooses whether a newly created rank is inserted **above** the add card (default) or **below** it, wi — files: src/components/Guild.jsx, src/lib/guild.js, src/styles.css
- **guild-ranks-manage** [done] (.kb/cards/guild-ranks-manage.md) Guilde (UI) : section Rangs & privilèges (titre centré, carte ajout, réorganisation, label Chef éditable) — Front half of the "Rangs & privilèges" revamp in the manage tab (leader only): the section title is centered and larger; the inline "create rank" form is replaced by an **add-rank placeholder card** ( — files: src/components/Guild.jsx, src/lib/guild.js, src/styles.css
- **guild-ranks-ui** [done] (.kb/cards/guild-ranks-ui.md) Guilde (UI) : dernier Chef, renommage des rangs, création de rang en modale — Front half of the guild-rank feature: the guild modal (Manage tab, Chef only) creates ranks through a small "+" icon that opens a dedicated `NewRankModal` instead of the old inline form, offers a penc — files: src/components/Guild.jsx, src/lib/guild.js
- **monster-details-ui** [done] (.kb/cards/monster-details-ui.md) Panneau Détails de monstre (phase 3) : compétences, équipement 7 slots, auras, plafonds, placements — Partie UI de l'étape 2 phase 3 : dans l'onglet « Monstres » du dashboard admin, la liste des monstres (noms cliquables, filtrable) ouvre une fiche par onglets — compétences/sorts (menu déroulant avec  — files: src/admin/MonsterDetails.jsx, src/admin/monsterDetails.js, src/admin/Pick.jsx, src/admin/index.jsx (+1)
- **react-redux-base** [done] (.kb/cards/react-redux-base.md) React + Redux base: store, app shell, API client, Vite config — The React 18 + Redux Toolkit base that boots the SPA: a single `game` slice holds auth/session, selected character, entities, active panel, hover/selection and toasts. — files: src/main.jsx, src/store/index.js, src/App.jsx, src/lib/api.js (+1)
- **terrain-map-3d** [done] (.kb/cards/terrain-map-3d.md) 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions — The client-side world renderer: a mirror of the back's world model — **map 1 (Human) is a hand-drawn grid** (`humanMap.js`, byte-equivalent to the back's generated copy) and the other worlds are the o — files: src/lib/terrain.js, src/lib/humanMap.js, src/lib/resources.js, src/lib/energy.js (+8)
- **world2-angel-demon** [done] (.kb/cards/world2-angel-demon.md) Monde Anges & Démons (UI) : sol par zone, ressources visibles, eau teintée, légende — Rendu du monde 2 (copie exacte de la logique back, voir fiche back `world2-angel-demon`) avec une règle : **ce qui est dessiné sur une case est ce qu'on y récolte**. — files: src/lib/world2.js, src/lib/resources2.js, src/lib/angelDemonMap.js, src/lib/relief.js (+3)

## File map
- `index.html`
- `package.json`
- `src/App.jsx` — App
- `src/admin/Bestiary.jsx` — Bestiaire (Étape 2 phase 2) : tables de butin par monstre (objets, ressources, objets — Bestiary
- `src/admin/Dashboard.jsx` — Pilotage : compteurs, répartition par race, simulation du tick, dernières actions d'audit. — Dashboard
- `src/admin/Divine.jsx` — Arcanes, Reliques & Artefacts : objets uniques (plafond global, un seul détenteur par pièce). — Divine
- `src/admin/Entities.jsx` — Éditeur générique d'entités (monstres, objets, montures, bâtiments) : liste + fiche + règles transverses. — Entities
- `src/admin/EntityRules.jsx` — Éditeur des règles transverses d'une entité : coûts, plafonds (caps), modificateurs bonus/malus & effets. — RuleForms, RulesList
- `src/admin/MonsterDetails.jsx` — Détails de monstre (Étape 2 phase 3) : liste des monstres (noms cliquables) puis onglets — TABS, MonsterDetails
- `src/admin/Pick.jsx` — Menu déroulant avec recherche (catalogues du jeu) : une case de filtre + la liste filtrée — Pick
- `src/admin/Races.jsx` — Races (stats de base) + arbre des rangs : paliers d'évolution, prérequis, multiplicateurs de caractéristiques. — Races
- `src/admin/bestiary.js` — Bestiaire (Étape 2 phase 2) : aides pures du panneau (affichage du butin, corps de spawn). — lootLabel, spawnBody
- `src/admin/entityFields.js` — Descripteurs de champs par type d'entité (panneaux d'admin) : [colonne, libellé, type?] (type: number|check|js — FIELDS, jsonOr, jsonText, URL_KIND
- `src/admin/index.jsx` — (header), SECTIONS, Admin
- `src/admin/monsterDetails.js` — Détails de monstre (Étape 2 phase 3) : aides pures du panneau `MonsterDetails` (UI dans MonsterDetails.jsx). — SLOTS, SLOT_LABEL, pickFilter, spellLabel, equipLabel, auraLabel, capsToMaxCaps, placeBody, respawnIn
- `src/components/Account.jsx` — Account
- `src/components/Backdrop.jsx` — Fond 3D vivant (même moteur que le jeu) : la caméra orbite lentement au-dessus du monde. — (header), Backdrop
- `src/components/Capital.jsx` — (header), CAP, Capital
- `src/components/ChatDock.jsx` — (header), TABS, ChatDock
- `src/components/Compass.jsx` — Rose des vents : le N pointe toujours vers le Nord réel de la carte, quelle que soit la rotation de la caméra  — Compass
- `src/components/Confirm.jsx` — Écran de confirmation minimal (enregistrement avec modifications, suppression) : — Confirm
- `src/components/GameCanvas.jsx` — (header), useRefreshMe, GameCanvas
- `src/components/Guild.jsx` — Pagination commune des listes : « ‹ [page] /total › » — flèches icones seules (pas de texte), — (header), PERMS, RankPick, PAGE, PFOLDER, PMSG, PageNav, Pres, Members, AV, Avatar, Post, NewFolderModal, NewTopicModal, Perks
- `src/components/Info.jsx` — Petite icône « i » : l'infobulle s'affiche au survol (ou au focus / clic sur mobile). Rendue dans <body> pour  — Info
- `src/components/Location.jsx` — (header), WORLDS, Location
- `src/components/Login.jsx` — (header), Logo, Login, RACES, CharSelect
- `src/components/MapLegend.jsx` — Monde Anges & Démons : une ligne par ZONE de sol (même couleur que sur la carte) et ce qu'on y récolte — le so — (header), hex, LegendAngDem, MapLegend
- `src/components/Modal.jsx` — Fenêtre modale rendue dans <body> : indépendante des parents (un ancêtre avec backdrop-filter/transform devien — Modal
- `src/components/Panels.jsx` — (header), Panel, KV, FaithPanel, MountsPanel, OFFS, ActionsPanel, WorldPanel
- `src/components/SidePanel.jsx` — Silhouette en étoile (bras tendus, jambes écartées) : coordonnées dans un repère 120 × 100. Chaque emplacement — (header), DEFAULT, LABEL, RACES, kindOf, History, SLOTS, LEADERS, GROUP, TYPE, statLine, fmtLock, Inventory, SidePanel
- `src/components/TileCard.jsx` — (header), cache, useCell, Entity, InfoModal, TileCard
- `src/components/TopBar.jsx` — (header), DIRS, Wheel, Gauge, Chip, TopBar
- `src/components/compass.css`
- `src/components/fmtbar.jsx` — Barre d'outils de formatage compacte (Gras / Italique / Nuancier) : agit sur la sélection du — (header), rgbOf, FmtBar, PrevToggle, FmtField, useFmt
- `src/components/legend.css`
- `src/lib/angelDemonMap.js` — ⚠ GÉNÉRÉ par tools/gen_angel_demon_map.py — monde Anges & Démons : ne pas éditer à la main. — W2, ROWS2, FEATURES2
- `src/lib/api.js` — token, setToken, hasToken, api
- `src/lib/drag.js` — Drag & drop des lignes d'affichage (appui + glissement, seuil 8 px pour préserver les clics). — useDrag
- `src/lib/energy.js` — Énergie d'un trajet (8 directions) jusqu'à stopAt cases de la cible. Miroir de game/movement.ts : — (header), water, pathEnergy, COLORS
- `src/lib/fmt.js` — Micro-formatage du texte du forum, rendu par innerHTML APRÈS échappement HTML (donc sûr). — fmt, wrapSel
- `src/lib/guild.js` — Intégrité des rangs (miroir de back/src/routes/guilds.ts) : le dernier porteur du rang Chef — lastChef, ADD, displayRanks, moveRankRow, dropRankRow, insertRankTarget, effWrite, canEditTopic
- `src/lib/hooks.js` — (header), useData, useDo, pct
- `src/lib/humanMap.js` — ⚠ GÉNÉRÉ par tools/gen_human_map.py à partir de la carte de référence — ne pas éditer à la main. — W, ROWS, CODES, FEATURES
- `src/lib/postAuth.js` — Suite d'une réponse /auth/login ou /auth/register réussie : — (header), postAuth
- `src/lib/relief.js` — Eau : le fond descend en pente raide sous le niveau d'eau ; relief des montagnes accentué. — (header), base, WATER_Y, ss, micro, ridge, heightAt, C, DEEP, g2, ZT, ZC, cellTint, zoneTint, groundColor, hash
- `src/lib/resources.js` — ⚠ GÉNÉRÉ par tools/gen_human_map.py — catalogue des ressources et légende de la carte. — RESOURCES, GROUPS, RES_BY_ID
- `src/lib/resources2.js` — ⚠ GÉNÉRÉ par tools/gen_angel_demon_map.py — catalogue du monde Anges & Démons (zones, ressources, apparence 3D — SIDES, RESOURCES2, ZONES2, RES2_BY_ID
- `src/lib/terrain.js` — ⚠ GÉNÉRÉ par tools/gen_human_map.py — copie identique dans backend/src/game/terrain.ts et frontend/src/lib/ter — (header), MAP_HUMAN, WORLD, setWorld, BURN_DAMAGE, KIND_COST, KIND_LABEL, mk, hash, CELLS, BY_CODE, VOID, inMap, humanCell, VR, V, vAt, h0, procNoise, POOL, PROC, noiseAt, terrain, SAFE_ZONES, inSafeZone
- `src/lib/world2.js` — ⚠ GÉNÉRÉ par tools/gen_angel_demon_map.py — copie identique dans backend/src/game/world2.ts et frontend/src/li — (header), MAP_ANGDEM, COST, ihash, CELLS, mk, ZBY, VOID, inMap, pick, terrain2, VR, V, vAt, noise2, lerpHex, FRONTIER_X, waterTint
- `src/main.jsx`
- `src/store/admin.js` — État de l'espace administrateur : section active, entité en cours, message de statut. — (header), admin, Ad
- … 16 autres fichiers (utiliser `kb search`)
