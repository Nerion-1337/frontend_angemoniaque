---
title: React + Redux base: store, app shell, API client, Vite config
slug: react-redux-base
status: done
updated: 2026-11-24
files:
  - src/main.jsx
  - src/store/index.js
  - src/App.jsx
  - src/lib/api.js
  - vite.config.js
symbols:
  - src/main.jsx:App
  - src/store/index.js:game
  - src/store/index.js:store
  - src/App.jsx:App
  - src/lib/api.js:api
  - vite.config.js:defineConfig
tests:
  - test/lib.test.js
---
## Purpose
Socle de la SPA : React 18 + Redux Toolkit, coquille `App.jsx` (connexion → choix du personnage → jeu, ou `#admin`), client API
unique, proxy `/api` vers le back.

## Business rules
- Tout appel serveur passe par `lib/api.js` avec une URL RELATIVE `/api/...` (Nginx/Vite retirent le préfixe) ; jamais de `fetch` direct.
- Le jeton est gardé dans `localStorage.token` et envoyé en `Authorization: Bearer` ; au démarrage, `/auth/me` restaure la session (rôle admin compris), un échec efface le jeton.
- `api()` lève une erreur sur toute réponse non 2xx avec le message du back (affiché tel quel dans les toasts) ; pas de nouvelle tentative silencieuse.
- État partagé dans des slices déclarées dans `store/index.js` (`game`, `admin`) ; pas de `useState` pour de l'état partagé.
- Navigation : hash + état (`charId`) ; `#admin` est la seule route hash, réservée aux admins.
- `setPanel` bascule : renvoyer le panneau courant le ferme ; un toast s'efface seul après 3,5 s.

## Gotchas
- Les routes du back s'écrivent SANS `/api` (le préfixe est retiré par le proxy).
- Le front ne connaît du back que la surface `/api` : déployable derrière Nginx sans modification.

## Tests
`test/lib.test.js` (aides de jeu pures : terrain déterministe, `pathEnergy`, `stopAt`).
