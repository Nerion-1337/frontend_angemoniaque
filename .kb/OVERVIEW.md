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

## Features (4)
- **guild-forum-ui** [done] (.kb/cards/guild-forum-ui.md) Guilde (UI) : forum en drill-down, modales +, réorganisation, messages aérés et formatage — The "Forum" tab of the guild modal is a three-level drilldown (categories → topics → messages), with a back icon at each level. — files: src/components/Guild.jsx, src/lib/fmt.js, src/styles.css
- **guild-ranks-manage** [done] (.kb/cards/guild-ranks-manage.md) Guilde (UI) : section Rangs & privilèges (titre centré, carte ajout, réorganisation, label Chef éditable) — Front half of the "Rangs & privilèges" revamp in the manage tab (leader only): the section title is centered and larger; the inline "create rank" form is replaced by an **add-rank placeholder card** ( — files: src/components/Guild.jsx, src/lib/guild.js, src/styles.css
- **guild-ranks-ui** [done] (.kb/cards/guild-ranks-ui.md) Guilde (UI) : dernier Chef, renommage des rangs, création de rang en modale — Front half of the guild-rank feature: the guild modal (Manage tab, Chef only) creates ranks through a small "+" icon that opens a dedicated `NewRankModal` instead of the old inline form, offers a penc — files: src/components/Guild.jsx, src/lib/guild.js
- **react-redux-base** [done] (.kb/cards/react-redux-base.md) React + Redux base: store, app shell, API client, Vite config — The React 18 + Redux Toolkit base that boots the SPA: a single `game` slice holds auth/session, selected character, entities, active panel, hover/selection and toasts. — files: src/main.jsx, src/store/index.js, src/App.jsx, src/lib/api.js (+1)

## File map
- `index.html`
- `package.json`
- `src/App.jsx` — App
- `src/components/Account.jsx` — Account
- `src/components/Admin.jsx` — Admin
- `src/components/Backdrop.jsx` — Fond 3D vivant (même moteur que le jeu) : la caméra orbite lentement au-dessus du monde. — (header), Backdrop
- `src/components/Capital.jsx` — (header), CAP, Capital
- `src/components/ChatDock.jsx` — (header), TABS, ChatDock
- `src/components/GameCanvas.jsx` — (header), useRefreshMe, GameCanvas
- `src/components/Guild.jsx` — (header), PERMS, RankPick, Pres, Members, AV, Avatar, Post, NewFolderModal, NewTopicModal, Forum, NewRankModal, Arrows
- `src/components/Info.jsx` — Petite icône « i » : l'infobulle s'affiche au survol (ou au focus / clic sur mobile). Rendue dans <body> pour  — Info
- `src/components/Location.jsx` — (header), WORLDS, Location
- `src/components/Login.jsx` — (header), Logo, Login, RACES, CharSelect
- `src/components/Modal.jsx` — Fenêtre modale rendue dans <body> : indépendante des parents (un ancêtre avec backdrop-filter/transform devien — Modal
- `src/components/Panels.jsx` — (header), Panel, KV, FaithPanel, MountsPanel, OFFS, ActionsPanel, WorldPanel
- `src/components/SidePanel.jsx` — Silhouette en étoile (bras tendus, jambes écartées) : coordonnées dans un repère 120 × 100. Chaque emplacement — (header), DEFAULT, LABEL, RACES, kindOf, History, SLOTS, LEADERS, GROUP, TYPE, statLine, fmtLock, Inventory, SidePanel
- `src/components/TileCard.jsx` — (header), cache, useCell, Entity, InfoModal, TileCard
- `src/components/TopBar.jsx` — (header), DIRS, Wheel, Gauge, Chip, TopBar
- `src/lib/api.js` — token, setToken, hasToken, api
- `src/lib/energy.js` — Énergie d'un trajet (8 directions) jusqu'à stopAt cases de la cible. Miroir de game/movement.ts : — (header), water, pathEnergy, COLORS
- `src/lib/fmt.js` — Micro-formatage du texte du forum, rendu par innerHTML APRÈS échappement HTML (donc sûr) : — fmt
- `src/lib/guild.js` — Intégrité des rangs (miroir de back/src/routes/guilds.ts) : le dernier porteur du rang Chef — lastChef, ADD, displayRanks, moveRankRow
- `src/lib/hooks.js` — (header), useData, useDo, pct
- `src/lib/relief.js` — Eau : le fond descend en pente raide sous le niveau d'eau ; relief des montagnes accentué. — (header), base, WATER_Y, ss, micro, ridge, heightAt, C, DEEP, g2, groundColor, hash
- `src/lib/terrain.js` — Copie exacte de backend/src/game/terrain.ts (règle de coût partagée) — h, noiseAt, terrain
- `src/main.jsx`
- `src/store/index.js` — game, A
- `src/styles.css` — {box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.35 var(--sans);-webkit-
- `src/three/entities.js` — (header), M, stone, label, person, BEAST, beast, building, mountModel, golem, RACE_COL, makeEntity
- `src/three/scene.js` — Scène réaliste : terrain en relief continu, ciel physique (cycle jour/nuit sur l'heure locale), ombres, eau, v — noiseTex, createScene
- `test/fmt.test.js`
- `test/guild.test.js` — (header), R, g
- `test/lib.test.js`
- `vite.config.js`
