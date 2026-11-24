---
title: Connexion admin : redirection vers l'interface admin (#admin)
slug: admin-login-nav
status: done
updated: 2026-11-24
files:
  - src/lib/postAuth.js
  - src/components/Login.jsx
  - test/postAuth.test.js
symbols:
  - src/lib/postAuth.js:postAuth
  - src/components/Login.jsx:Login
tests:
  - test/postAuth.test.js
---
## Purpose
Après une **connexion ou une inscription réussie**, un compte admin doit pouvoir accéder directement à
l'interface admin : la SPA le redirige sur `#admin` (l'écran d'admin s'ouvre immédiatement, avec le
bouton « ← Jeu » pour revenir au jeu). Un compte joueur reste sur la sélection de personnage.
Avant ce changement, l'accès existait seulement via les liens discrets (CharSelect / panneau Compte).

## How it works
- `src/lib/postAuth.js` `postAuth(r, email)` : suit une réponse `/auth/login` ou `/auth/register`
  réussie — `setToken(r.token)` (persistance localStorage), calcule l'état `auth`
  `{ admin, role, email }` (mêmes champs que `/auth/me`) et retourne `{ auth, hash }` avec
  `hash = '#admin'` si `r.admin`, sinon `null`.
- `Login.jsx` `submit` : `const p = postAuth(r, f.email); d(A.setAuth(p.auth)); if (p.hash) location.hash = p.hash;`
  — le dispatch `setAuth` (synchronique) précède le changement de hash : `App.jsx` re-rend sur
  `hash === '#admin'` en voyant déjà `auth.admin === true` → rend `<Admin />`.
- `App.jsx` gate existant inchangé : `hash === '#admin'` + `auth.admin` → `<Admin />`, sinon
  « Accès réservé ».

- **2026-11-24 (card `race-rules-ui`)** : `CharSelect` lit `/characters/races` (races jouables, places, raisons) ; plus de limite codée en dur ; l'admin crée sans limite.

## Entry points
- `Login.jsx` : après `POST /auth/login` et `POST /auth/register` réussis.
- Liens d'accès complémentaires (inchangés) : `CharSelect` (« Espace administrateur ») et
  panneau `Account` (« Administration ») — utiles une fois dans le jeu / après reload.

## Data flow
- Lit la réponse API `{ token, admin, role }` ; écrit `localStorage.token` et le slice Redux
  `game.auth`. Effet de bord : navigation par hash (`location.hash = '#admin'` → event
  `hashchange` → re-render de `App`). Aucun état de session n'est perdu : le token est déjà
  stocké, le reload avec session reste possible (`/auth/me`).

## Tests
- `test/postAuth.test.js` (unitaires + parcours complet du flux côté client) :
  1. **admin** : réponse admin → token stocké + `auth` dispatché sur le store réel + `hash === '#admin'`.
  2. **joueur** : `hash === null` (pas de redirection), `auth` correct.
  3. **inscription admin** (ADMIN_EMAIL) : mène aussi à `#admin`.
- Intégration stack (API contract vérifié à la main) : `POST /api/auth/login` en admin renvoie
  `{ token, admin: true, role: 'admin' }` et le dashboard admin répond 200 avec ce token.

## Gotchas
- La redirection ne se produit **qu'au moment de la connexion/inscription réussie** : un reload
  avec session existante (restauration `/auth/me`) ne redirige PAS — l'accès passe par les liens
  (CharSelect / Account) ou l'URL `#admin` directe.
- Le `dispatch setAuth` doit précéder l'écriture de `location.hash` : `App` lit `auth` dans le
  store au re-render ; l'inverser ferait voir « Accès réservé » une frame.
- `postAuth` importe `setToken` de `lib/api.js` qui lit `localStorage` au chargement du module :
  les tests qui importent `postAuth` doivent stubber `globalThis.localStorage` **avant**
  l'import dynamique (voir `test/postAuth.test.js`).
- La forme de la réponse (`r.admin`, `r.role`) vient du back (commit socle admin) : si le back
  change de contract, `postAuth` et le test se cassent ensemble — les mettre à jour ensemble.
