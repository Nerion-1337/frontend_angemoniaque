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
