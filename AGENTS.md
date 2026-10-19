# AGENTS.md — ia_agent / front

> Dépôt `front` du projet `ia_agent`. Les règles générales (mémoire `kb`, cycle plan/code/tests/fiche, commits,
> web, outils `stack` et `gitpush`) sont dans `../AGENTS.md` : **relis-les**, elles s'appliquent ici.
> Ce fichier ne contient que ce qui est propre à ce dépôt.

## Rôle de ce dépôt
- Interface utilisateur web (Single Page Application).
- Gestion de l'état global applicatif avec Redux.
- Consommation des services de l'API backend via le reverse proxy Nginx (requêtes relatives sur `/api/...`).

## Stack et commandes
- **Technologies** : React, Vite, Redux (Redux Toolkit), JavaScript / TypeScript (modules ES), OpenAPI, Three.js (ou Babylon.js).
- **Conteneurisation** : l'environnement tourne dans le conteneur `frontend` (`ange-prod-frontend` en production). Les `node_modules` sont montés et isolés directement dans le conteneur via un volume dédié pour éviter les pollutions d'environnement local.
- **Commandes** :
  - Lancement dev : `npm run dev -- --host --port 5173` (ou via `stack exec frontend -- npm run dev`)
  - Tests : `npm test` — enregistré dans `.kb/config.json` (`kb init --test-cmd "npm test"`)
  - Build : `npm run build`
- **Dépendances** : **aucune** nouvelle dépendance (`npm install <package>`) sans mon accord préalable.

## Conventions de code et architecture des composants
Pour préserver la lisibilité et faciliter la maintenance :
- **Taille des fichiers** : bannis les composants monolithiques et les fichiers longs.
- **Granularité** : découpe systématiquement en petits sous-composants réutilisables (même s'ils doivent être paramétrés ou adaptés par la suite).

## Travail dans ce dépôt
- Branche `agent` (déjà créée). Commits : `gitsave "<message>"` lancé depuis CE dossier.
- Publier : `gitpush` depuis CE dossier. Je fais la Pull Request et le merge.
- Mémoire : `kb init` si `.kb/` n'existe pas encore dans ce dossier, puis le cycle habituel (`../AGENTS.md`).