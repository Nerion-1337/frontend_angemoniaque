---
title: Annonces, forum, pages légales, modération et connexion Google (écran d accueil)
slug: forum-public-ui
status: done
updated: 2026-11-26
files:
  - src/components/Forum.jsx
  - src/components/ForumMod.jsx
  - src/lib/forum.js
  - src/components/Login.jsx
  - src/App.jsx
symbols:
  - src/lib/forum.js:forumRoute
  - src/lib/forum.js:accessBadges
  - src/lib/forum.js:googleReturn
  - src/components/Forum.jsx:Forum
  - src/components/ForumMod.jsx:ForumMod
tests:
  - test/forum.test.js
---
## Purpose
Écran d'accueil (liens, dernières annonces, connexion Google, case CGU à l'inscription) et espace Annonces / forum / pages légales accessible sans compte ; modération sur place pour l'équipe.

## Business rules
- Routes par hash (`lib/forum.js:forumRoute`) : `#forum`, `#classement` (card `faith-pact-ui`), `#forum/c/ID[/page]`, `#forum/t/ID[/page]`, `#forum/mod`, `#legal/<clé>` ; App les affiche AVANT l'écran de connexion (avec ou sans compte).
- Retour Google : App lit `#google-token=` (jeton enregistré, hash effacé, admin → `#admin`) ou `#google-error=` (message affiché par l'écran de connexion via sessionStorage).
- Connexion Google : mode lu sur `/auth/google/config` ; `google` → redirection `/api/auth/google/start` ; `mock` → email à saisir (bouton « (simulé) ») ; `off` → bouton masqué.
- Inscription : case « J'accepte les CGU et la politique de confidentialité » obligatoire (envoie `acceptTos: true`).
- Forum : catégories refusées grisées avec la raison ; écrire masqué avec la raison du refus ; bandeau d'acceptation des CGU quand la version a changé.
- Équipe : barre de modération du sujet (épingler, verrouiller, masquer, déplacer, supprimer), masquer / sourdine par message, compteur de signalements ; admin : nommer / retirer modérateur ; onglet Modération en sous-onglets, un seul élément affiché à la fois (`ForumMod` : Signalements ; admin : Catégories — une catégorie à la fois, choisie par pastille, + « Nouvelle » — et Pages légales avec nouvelle version des CGU ; un modérateur ne voit que Signalements, sans barre d'onglets).
- Tout contenu (messages, pages légales) est rendu comme TEXTE (`white-space: pre-wrap`), jamais en HTML ; l'email d'un auteur n'est jamais affiché.

- Route `#histoire` (page L'histoire, story-page) dans le même cadre ; lien sur l'écran de connexion.
## Gotchas
- `.stage:has(> .news)` place l'encart des annonces à côté du formulaire (une colonne sous 760 px).

## Tests
`test/forum.test.js` (routes, badges d'accès, dates relatives, pagination, retour Google).
