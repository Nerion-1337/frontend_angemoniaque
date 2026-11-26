---
title: Inscription sécurisée (jauge de mot de passe, anti-robot) et interface admin chargée à la demande
slug: auth-security-ui
status: done
updated: 2026-11-26
files:
  - src/components/Login.jsx
  - src/lib/password.js
  - src/lib/pow.js
  - src/App.jsx
  - vite.config.js
symbols:
  - src/lib/password.js:strength
  - src/lib/password.js:passwordOk
  - src/lib/pow.js:solve
  - src/components/Login.jsx:PasswordMeter
tests:
  - test/password.test.js
---
## Purpose
Inscription robuste (mot de passe fort guidé, anti-robot) et interface d'administration livrée seulement aux admins.

## Business rules
- Interface admin : `React.lazy(import('./admin'))` ; au build, tout src/admin/ va dans un paquet `assets-admin/admin-*.js` (vite manualChunks : admin / vendor / app), jamais préchargé ; un refus (403 Nginx) affiche « Accès à l'administration refusé ». Aucun module hors src/admin/ ne doit importer src/admin/ (sinon le paquet admin deviendrait une dépendance statique).
- Jauge de mot de passe (`PasswordMeter`) : barre animée (largeur, couleur), niveau Très faible → Excellent, critères cochés au fil de la saisie ; « Fort » seulement si le serveur l'accepterait (`lib/password.js`, miroir du back) ; bouton désactivé tant que le mot de passe n'est pas accepté.
- Anti-robot : preuve de travail calculée en arrière-plan dès l'ouverture de l'onglet Inscription (`lib/pow.js`, SHA-256 via crypto.subtle), renouvelée après chaque échec ; champ piège invisible `website`.
- Déconnexion : `POST /auth/logout` (retire le cookie admin) avant d'effacer le jeton.

## Gotchas
- En dev, Vite sert les sources : Nginx protège `/src/admin/` de la même manière que `/assets-admin/` en prod.

## Tests
`test/password.test.js` (critères, jauge croissante, preuve de travail).
