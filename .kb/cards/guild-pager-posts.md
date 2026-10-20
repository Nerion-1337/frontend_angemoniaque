---
slug: guild-pager-posts
title: "Pagination commune des listes et cartes de message restructurées"
status: done
files:
  - src/components/Guild.jsx
  - src/styles.css
symbols:
  - src/components/Guild.jsx:PageNav
  - src/components/Guild.jsx:Post
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:Members
tests:
  - test/guild.test.js
updated: 2026-10-20
---

## Purpose
Système de pagination commun (flèches icones seules ‹ › + input de page modifiable + `/total`) appliqué à toutes les listes (forum : catégories/sujets/messages ; onglet Liste : postulants/membres), et nouvelle structure des cartes de message (div auteur à gauche, div message à droite avec date en bas à droite, fonds alternés pair/impair).

## How it works
- **`PageNav({ page, total, onPage })`** (composant commun, `const PAGE = 10` éléments/page) : rendu `‹ [input] /N ›` — les flèches sont **icônes seules** (`ChevronLeft`/`ChevronRight`, `title` au survol, désactivées aux bornes) ; l'input `.ppage` affiche la page courante, est modifiable (chiffres seulement), et **valide à l'Entrée / à la perte de focus** → `onPage(clamp(1..N))` ; l'input se resynchronise quand la page change par ailleurs (`useEffect`). Affiché **en bas de page** (`.pagenav` centré).
- **Cinq listes paginées** : catégories (`fRowsP`) et sujets (`tRowsP`) dans `Forum` (état `pgF`/`pgT`, remis à 1 quand on change de catégorie : `useEffect(() => setPgT(1), [fid])`), messages (`postsP`, `pgP` remis à 1 quand on change de sujet : `useEffect(() => setPgP(1), [tid])`), postulants (`applicantsP`, `pgA`) et membres (`membersP`, `pgM`) dans `Members`. Le nombre total de pages = `ceil(total/PAGE)` ; la page courante est clampée si les données ont rétréci.
- **Drag & drop + flèches sous pagination** : `DndList` ne voit que la tranche de la page (indices locaux) ; la fonction `off(pg, i) = (pg-1)*PAGE + i` traduit l'indice local en **index global de liste d'affichage** avant d'appeler `moveRankRow`/`dropRankRow` (qui opèrent sur l'ordre complet + position de la carte d'ajout) → le réordonnancement reste exact même si la carte d'ajout est sur une autre page. Le réordonnangement ne se fait qu'au sein d'une page (pas de drag transverse entre pages — limitation assumée).
- **`Post`** : `<div class="post">` = ligne flex — **`div.pauthor` à gauche** (avatar 40 px → rang guilde `.prank` → pseudo, colonne verticale) et **`div.pmsg` à droite** (le corps `.postbody` + **`small.ptime` en bas à droite** : `position:absolute; right:10px; bottom:5px`, la `pmsg` réserve `padding-bottom:24px`). **Fonds alternés** : `.post:nth-child(odd)` (impair, blanc 5 %) / `.post:nth-child(even)` (paire, halo 7 %) — le fond est porté par le conteneur `.post`, donc il couvre **les deux div** (auteur + message).
- La **liste des rangs (onglet Gestion) n'est PAS paginée** : c'est un éditeur (drag & drop sur l'ordre complet, toggle d'insertion) ; paginer casserait la sémantique de réorganisation.

## Entry points
- `PageNav` est rendu : sous le `DndList` catégories, sous le `DndList` sujets (Forum), sous `.posts` (vue sujet), sous `.achips` (postulants) et sous `.mgrid` (membres).
- `Post` est rendu dans `.posts` (vue sujet) — la parité pair/impair = position dans la liste des messages de la page (le `.posts` ne contient que des `.post` quand non vide).

## Data flow
`PAGE = 10` constant → troncatures `slice((pg-1)*PAGE, pg*PAGE)` des listes locales (données déjà chargées côté client — **pagination d'affichage, pas d'API back**) ; les réordonnancements passent par `off()` → `POST /guilds/reorder` (ordre global complet).

## Tests
- `test/guild.test.js` (gardes statiques) : `function PageNav` + `ChevronLeft/ChevronRight` + `.ppage` + `/{pages}` ; ≥ 5 usages de `<PageNav` (les 5 listes) ; `fRowsP`/`tRowsP`/`postsP`/`applicantsP`/`membersP` ; `off = (pg, i) => (pg - 1) * PAGE + i` ; resets `useEffect` sur `fid`/`tid` ; `.post{display:flex;flex-direction:row`, `.post:nth-child(odd)/(even){background`, `.ptime{position:absolute;right:10px;bottom:5px`, `<div className="pmsg">`.

## Gotchas
- **Le drag ne traverse pas les pages** : un réordonnancement est limité à la page courante ; si 10+ éléments, la carte d'ajout ne se déplace qu'au sein de sa page (l'ordre global reste cohérent via `off()`).
- La parité `.post:nth-child()` suppose que `.posts` ne contient que des `.post` (c'est le cas : le `<small>Aucun message</small>` n'apparaît que quand il n'y a **aucun** message, donc aucun `.post`).
- `nth-child(even)`/`(odd)` : « impair » = 1ᵉʳ, 3ᵉ, … (`:nth-child(odd)`) ; si le design demande l'inverse, inverser les deux règles.
- L'input de page n'accepte que des chiffres (`replace(/[^0-9]/g, '')`) ; entrée vide → resynchronisation au `blur`.
- La pagination est **client-side** : les listes forums/membres/postulants sont intégralement chargées par `GET /guilds/{characterId}` — pour de vrais gros volumes, il faudra une pagination côté API (hors périmètre ici).
