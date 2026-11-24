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
Après une connexion ou une inscription réussie, un compte admin arrive directement sur `#admin` ; un joueur reste sur la sélection
de personnage. L'écran de sélection affiche les races jouables et les places restantes fournies par le serveur.

## Business rules
- Redirection vers `#admin` UNIQUEMENT juste après une connexion/inscription réussie d'un admin ; une session restaurée au rechargement ne redirige pas (accès par les liens « Espace administrateur » / « Administration » ou l'URL).
- L'état `auth` est publié AVANT de changer le hash (sinon « Accès réservé » une image).
- Écran de création : races, places (« n sur max » ou « administrateur, sans limite ») et raison d'un refus viennent de `GET /characters/races` ; aucune limite n'est codée dans le front.

## Gotchas
- `postAuth` importe `lib/api.js`, qui lit `localStorage` au chargement : les tests doivent stubber `localStorage` avant l'import dynamique.
- Le contrat `{token, admin, role}` vient du back : le changer casse `postAuth` et son test ensemble.

## Tests
`test/postAuth.test.js` (admin → `#admin`, joueur → pas de redirection, inscription admin) ; `test/raceRules.test.js` (écran de création piloté par le serveur).
