---
slug: guild-list-presentation
title: "Onglets guilde : présentation centrée, liste (invitations/postulants/membres)"
status: done
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:Pres
  - src/components/Guild.jsx:Members
tests:
  - test/guild.test.js
updated: 2026-10-20
---

## Purpose
Layout des onglets « 1. Présentation » et « 2. Liste » de la guilde (modal `GuildModal`) : présentation en colonne unique centrée (logo en tête), liste centrée avec les invitations en tête, les postulants en puces extensibles et les membres 2 par ligne avec le rang de jeu.

## How it works
- **Présentation (`Pres`)** — colonne unique `.form.pres` (plus de `.cols` 2 panneaux) : l'emblème (logo/écu 144 px, nom, tag, modif du logo si Chef) est **en tête**, puis mantra, histoire/description, boutons — le tout centré (`.pres{text-align:center}`, boutons `margin:…auto`).
- **Liste (`Members`)** — colonne unique `.form.members` centrée (`.members .row{justify-content:center}`) : **1) « Inviter un joueur » en tête**, **2) postulants** en puces `.achips`/`.achip` (`flex:1 1 220px` : elles **s'étendent sur la ligne** — flex-grow — avant de passer à la suivante, `flex-wrap:wrap`), **3) membres** en grille 2 colonnes `.mgrid` (1 colonne en mobile ≤760 px).
- **Rang de jeu** : chaque carte membre (`.member .minfo`, infos espacées `gap:12px`) affiche pseudo · race · **rang de jeu** (`.mgrank`, en halo) · rang de guilde (select si `assign_ranks`, sinon pill). Le champ `game_rank` vient du back : `GET /guilds/{characterId}` fait un `LEFT JOIN specializations` sur `characters.specialization_id` (card back `guild-ranks-integrity`) — ex. Soldat/Héros/Titan/Divin selon la race ; `null` → « — ».

## Entry points
- Onglets de la modal guilde : `GuildModal` (`TABS` : pres/list/forum/manage).
- `Pres` (lecture, ou édition si Chef : mantra/historique/logo via `POST /guilds/presentation`), `Members` (invite `POST /guilds/invite` si `send_invites`, accept/refus `POST /guilds/applicants/{id}/answer` si `accept_applicants`, changement de rang `POST /guilds/members/rank` si `assign_ranks`).

## Data flow
`GET /guilds/{characterId}` → `g.members[]` (avec `game_rank`), `g.applicants[]`, permissions de `g.me` → rendu centré ; les actions passent par `run(api(…), load)` (toast + rechargement).

## Tests
- `test/guild.test.js` (gardes statiques) : `className="form members"` ; ordre source **Inviter → Postulants → Membres** ; `achips`/`achip` (`.achip{flex:1 1 220px`), `<div className="mgrid">` (`.mgrid{…1fr 1fr`), `m.game_rank` affiché ; `className="form pres"` avec `<div className="emblem">` **avant** le Mantra ; `.pres{text-align:center}`.
- Back : `guild-ranks.test.ts` — `game_rank` présent et = « Mortel » pour des personnages humains (1ʳᵉ spécialisation).

## Gotchas
- Le `.emblem` est toujours ouvert/fermé **avant** les labels du formulaire (le retour à une colonne unique a cassé une fois la fermeture de div au build — garde de build : `vite build` après toute restructuration de ces JSX).
- `m.game_rank` peut être `null` (personnages sans spécialisation) → affichage « — » (`?? '—'`).
- Les puces de postulants `flex:1 1 220px` remplissent la ligne **avant** de wrapper : avec un seul postulant la puce fait toute la largeur de la modal (comportement demandé).
- `Members` ne lit plus `.cols` : le choix du personnage (`Account.jsx`) et la fondation de guilde (`NoGuild`) continuent d'utiliser `.cols` — ne pas supprimer cette règle.
