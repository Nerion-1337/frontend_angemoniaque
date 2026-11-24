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

## Features (19)
- **admin-dashboard** [done] (.kb/cards/admin-dashboard.md) Admin dashboard (Étape 2 phase 1) : shell + éditeurs d'entités génériques — Front of the admin back-office (Étape 2 phase 1): a self-contained `src/admin/` module mounted on the existing `#admin` route. — files: src/admin/index.jsx, src/admin/Dashboard.jsx, src/admin/Entities.jsx, src/admin/EntityRules.jsx (+6)
- **admin-login-nav** [done] (.kb/cards/admin-login-nav.md) Connexion admin : redirection vers l'interface admin (#admin) — Après une **connexion ou une inscription réussie**, un compte admin doit pouvoir accéder directement à l'interface admin : la SPA le redirige sur `#admin` (l'écran d'admin s'ouvre immédiatement, avec  — files: src/lib/postAuth.js, src/components/Login.jsx, test/postAuth.test.js
- **admin-players-divine-ui** [done] (.kb/cards/admin-players-divine-ui.md) Admin « Joueurs » (liste paginée, fiche) et objets divins dans l'onglet Objets ; préfixe CSS admin — Section **Joueurs** : liste paginée (20 / page) de tous les personnages, onglets par race avec effectifs, recherche pseudo/e-mail ; « Éditer » ouvre une fiche à onglets (Caractéristiques, Objets, Sort — files: src/admin/PlayersTab.jsx, src/admin/players.js, src/admin/ItemsTab.jsx, src/admin/Divine.jsx (+1)
- **admin-tiles-ui** [done] (.kb/cards/admin-tiles-ui.md) Section admin « Cases » : types de case par monde + affichage en jeu — Section admin **« Cases »** : un onglet par monde (Hommes / Anges & Démons / Morts) listant les types de case avec leur couleur, nom, coût d'énergie, description et sort passif ; édition du nom, de la — files: src/admin/TilesTab.jsx, src/admin/tiles.js, src/lib/tiles.js
- **bestiaire** [done] (.kb/cards/bestiaire.md) Panneau Bestiaire (SUPPRIMÉ phase 3c) : composant retiré de l'onglet Monstres — Le panneau « Bestiaire — butin & apparitions » (`Bestiary.jsx` + helpers `bestiary.js`) a été **supprimé de l'onglet Monstres** (phase 3c, à la demande du propriétaire) : sa section titre (`div.headro — files: src/admin/index.jsx
- **guild-default-rank-ui** [done] (.kb/cards/guild-default-rank-ui.md) Guilde (UI) : option unique du rang par défaut des nouveaux arrivants (Gestion) — Front half of the "default rank for newcomers" feature: in the guild manage tab (leader only), a single-choice control lets the Chef decide which rank accepted applicants / accepted invitations receiv — files: src/components/Guild.jsx, src/styles.css
- **guild-forum-tools** [done] (.kb/cards/guild-forum-tools.md) Guilde (UI) : formatage par balises texte ([g]/[i]/[rgb]), édition unifiée titre+description+droits, suppression/transfert — Forum v2 UX pass — édition et gestion : 1. — files: src/components/Guild.jsx, src/components/fmtbar.jsx, src/components/Confirm.jsx, src/lib/fmt.js (+4)
- **guild-forum-ui** [done] (.kb/cards/guild-forum-ui.md) Guilde (UI) : forum en drill-down, modales +, réorganisation, messages aérés et formatage — The "Forum" tab of the guild modal is a three-level drilldown (categories → topics → messages), with a back icon at each level. — files: src/components/Guild.jsx, src/lib/fmt.js, src/styles.css
- **guild-forum-v2** [done] (.kb/cards/guild-forum-v2.md) Guilde (UI) : forum v2 — typo centrée, cartes d'ajout + toggle, drag & drop, droits par rang, non-lus, carte de message — Front half of the forum revamp: centered larger section/category/topic titles (`.rhead`), a description line under each category/topic title (inline-editable, no reload), standardized "add" cards (big — files: src/components/Guild.jsx, src/lib/guild.js, src/lib/drag.js, src/styles.css
- **guild-list-presentation** [done] (.kb/cards/guild-list-presentation.md) Onglets guilde : présentation centrée, liste (invitations/postulants/membres) — Layout des onglets « 1. — files: src/components/Guild.jsx, src/styles.css
- **guild-pager-posts** [done] (.kb/cards/guild-pager-posts.md) Pagination commune des listes et cartes de message restructurées — Système de pagination commun (flèches icones seules ‹ › + input de page modifiable + `/total`) appliqué à toutes les listes (forum : catégories/sujets/messages ; onglet Liste : postulants/membres), et — files: src/components/Guild.jsx, src/styles.css
- **guild-ranks-insert-dnd** [done] (.kb/cards/guild-ranks-insert-dnd.md) Guilde (UI) : toggle d'insertion + drag & drop des rangs (Gestion) — Evolution of the "Rangs & privilèges" manage section: (1) a **toggle switch on the add-rank card** chooses whether a newly created rank is inserted **above** the add card (default) or **below** it, wi — files: src/components/Guild.jsx, src/lib/guild.js, src/styles.css
- **guild-ranks-manage** [done] (.kb/cards/guild-ranks-manage.md) Guilde (UI) : section Rangs & privilèges (titre centré, carte ajout, réorganisation, label Chef éditable) — Front half of the "Rangs & privilèges" revamp in the manage tab (leader only): the section title is centered and larger; the inline "create rank" form is replaced by an **add-rank placeholder card** ( — files: src/components/Guild.jsx, src/lib/guild.js, src/styles.css
- **guild-ranks-ui** [done] (.kb/cards/guild-ranks-ui.md) Guilde (UI) : dernier Chef, renommage des rangs, création de rang en modale — Front half of the guild-rank feature: the guild modal (Manage tab, Chef only) creates ranks through a small "+" icon that opens a dedicated `NewRankModal` instead of the old inline form, offers a penc — files: src/components/Guild.jsx, src/lib/guild.js
- **item-spell-rarity-ui** [done] (.kb/cards/item-spell-rarity-ui.md) Onglets admin Objets & Sorts (phase 4) : rareté + « qui peut s'en équiper / l'apprendre » — Onglets admin « Objets » et « Sorts » (phase 4) : gestion du catalogue par rareté et du paramètre « qui peut s'en équiper / l'apprendre ». — files: src/admin/ItemsTab.jsx, src/admin/SpellsTab.jsx, src/admin/rarity.js, src/admin/index.jsx
- **monster-details-ui** [done] (.kb/cards/monster-details-ui.md) Onglet Monstres (phase 3b/3c) : types, capacités actives/passives, spécificités, liste & édition des instances — Onglet « Monstres » du dashboard admin (étape 2, phases 3b/3c). — files: src/admin/MonsterDetails.jsx, src/admin/monsterDetails.js, src/admin/Pick.jsx, src/admin/MiniMap.jsx (+2)
- **react-redux-base** [done] (.kb/cards/react-redux-base.md) React + Redux base: store, app shell, API client, Vite config — The React 18 + Redux Toolkit base that boots the SPA: a single `game` slice holds auth/session, selected character, entities, active panel, hover/selection and toasts. — files: src/main.jsx, src/store/index.js, src/App.jsx, src/lib/api.js (+1)
- **terrain-map-3d** [done] (.kb/cards/terrain-map-3d.md) 3D map view: procedural terrain/relief mirrors, Three.js scene, tile interactions — The client-side world renderer: a mirror of the back's world model — **map 1 (Human) is a hand-drawn grid** (`humanMap.js`, byte-equivalent to the back's generated copy) and the other worlds are the o — files: src/lib/terrain.js, src/lib/humanMap.js, src/lib/resources.js, src/lib/energy.js (+8)
- **world2-angel-demon** [done] (.kb/cards/world2-angel-demon.md) Monde Anges & Démons (UI) : sol par zone, ressources visibles, eau teintée, légende — Rendu du monde 2 (copie exacte de la logique back, voir fiche back `world2-angel-demon`) avec une règle : **ce qui est dessiné sur une case est ce qu'on y récolte**. — files: src/lib/world2.js, src/lib/resources2.js, src/lib/angelDemonMap.js, src/lib/relief.js (+3)

## File map
- `index.html`
- `package.json`
- `src/App.jsx` — App
- `src/admin/Dashboard.jsx` — Pilotage : compteurs, répartition par race, simulation du tick, journal d'audit filtrable. — (header), KPI, ago, Dashboard
- `src/admin/Divine.jsx` — Objets divins (rareté « Divin » de l'onglet Objets) : — Divine, Families
- `src/admin/Entities.jsx` — Éditeur générique d'entités (montures, bâtiments) : liste filtrable à gauche + fiche à droite (caractéristique — Entities
- `src/admin/EntityRules.jsx` — Éditeur des règles transverses d'une entité : coûts, plafonds (caps), modificateurs bonus/malus & effets. — RuleForms, RulesList
- `src/admin/ItemsTab.jsx` — Onglet admin « Objets » : sous-onglets par rareté, filtre par type d'équipement (slot), — (header), blank, ItemsTab
- `src/admin/MiniMap.jsx` — Mini-carte admin (détail de monstre — onglet Liste) : grille colorée par le terrain du jeu — (header), COLORS, CSS_W, MiniMap
- `src/admin/MonsterDetails.jsx` — Monstres (Étape 2 phase 3b) : liste des types (création) → clic sur un nom → onglets : — TABS, EMPTY, MonsterDetails
- `src/admin/Pick.jsx` — Menu déroulant avec recherche (catalogues du bestiaire — sorts / objets / ressources) : — Pick
- `src/admin/PlayersTab.jsx` — Section admin « Joueurs » : liste paginée de tous les personnages par race (pseudo, rang, position, XP, or), — (header), PER, PlayersTab, TABS, PlayerSheet
- `src/admin/Races.jsx` — Races (stats de base) + arbre des rangs : paliers d'évolution, prérequis, multiplicateurs de caractéristiques. — Races
- `src/admin/SpellsTab.jsx` — Onglet admin « Sorts » (phase 4) : catalogue global des sorts (blessures/bonus/malus — (header), blank, SpellsTab
- `src/admin/TilesTab.jsx` — Section admin « Cases » : types de case par monde — nom, description, coût d'énergie d'un pas, — (header), hex, TilesTab
- `src/admin/divine.js` — Helpers purs : objets (dont divins) et familles divines (testés dans test/adminDivine.test.js). — NUM, itemBody, familyLabel, validFamilyKey, CORE_FAMILIES
- `src/admin/entityFields.js` — Descripteurs de champs par type d'entité (panneaux d'admin) : [colonne, libellé, type?] (type: number|check|js — FIELDS, jsonOr, jsonText, URL_KIND
- `src/admin/index.jsx` — (header), SECTIONS, ICONS, SUBS, KEY, Admin
- `src/admin/monsterDetails.js` — Détails de monstre (Étape 2 phase 3b) : aides pures du panneau (liste de types + onglets). — SLOTS, SLOT_LABEL, SLOT_POS, slotAllowed, pickFilter, spellLabel, capLabel, equipLabel, capsToMaxCaps, placeBody, linkedLabel, respawnIn
- `src/admin/players.js` — Helpers purs de la section admin « Joueurs » (testés dans test/adminPlayers.test.js). — RACE_LABEL, PLACE_LABEL, STAT_GROUPS, STAT_KEYS, statDiff, posLabel, pageWindow
- `src/admin/rarity.js` — Onglets admin Objets & Sorts (phase 4) : raretés et « qui peut s'en équiper / l'apprendre ». — (header), RARITIES, RARITY_LABEL, USABLE_KINDS, USABLE_LABEL, usableBadge
- `src/admin/tiles.js` — Helpers purs de la section admin « Cases » (testés dans test/adminTiles.test.js). — WORLD_LABEL, hpPerHour, tileBody, spellSummary
- `src/admin/ui.jsx` — Éléments partagés du back-office : toast auto-masqué, en-tête de panneau, état vide, confirmation. — (header), confirmDel, Toast, Search, norm, matches, Empty
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
- `src/components/TileCard.jsx` — Description du type de case + sort passif (effet continu) — textes saisis en admin, rendus comme texte. — (header), cache, useCell, cellCost, TileInfo, Entity, InfoModal, TileCard
- … 40 autres fichiers (utiliser `kb search`)
