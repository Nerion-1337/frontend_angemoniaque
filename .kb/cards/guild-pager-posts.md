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
updated: 2026-10-21
---

## Purpose
Système de pagination commun (flèches icones seules ‹ › + input de page modifiable + `/total`) appliqué à toutes les listes (forum : catégories/sujets/messages ; onglet Liste : postulants/membres), et nouvelle structure des cartes de message (div auteur à gauche, div message à droite avec date en bas à droite, fonds alternés pair/impair).

## How it works
- **`PageNav({ page, total, onPage, size = PAGE })`** (composant commun) : rendu `‹ [input] /N ›` — **tailles de page** : `PFOLDER = 8` (catégories **et** sujets), `PMSG = 20` (messages), `PAGE = 10` (listes postulants/membres, défaut) — les flèches sont **icônes seules** (`ChevronLeft`/`ChevronRight`, `title` au survol, désactivées aux bornes) ; l'input `.ppage` affiche la page courante, est modifiable (chiffres seulement), et **valide à l'Entrée / à la perte de focus** → `onPage(clamp(1..N))` ; l'input se resynchronise quand la page change par ailleurs (`useEffect`). Affiché **en bas de page** (`.pagenav` centré).
- **Cinq listes paginées** : catégories (`fRealP` + carte d'ajout) et sujets (`tRealP` + carte d'ajout) dans `Forum` (état `pgF`/`pgT`, remis à 1 quand on change de catégorie : `useEffect(() => setPgT(1), [fid])`), messages (`postsP`, `pgP` remis à 1 quand on change de sujet : `useEffect(() => setPgP(1), [tid])`), postulants (`applicantsP`, `pgA`) et membres (`membersP`, `pgM`) dans `Members` — 8 éléments/page pour catégories et sujets (`size={PFOLDER}`), 20 messages/page (`size={PMSG}`), 10 par page pour les listes (défaut `PAGE`). Le nombre total de pages = `ceil(total/size)` ; la page courante est clampée si les données ont rétréci.
- **Carte d'ajout sur CHAQUE page** : la tranche ne contient que les items **réels** (`fRealP`/`tRealP`) et la carte `.item.radd` est **toujours rendue en dernière ligne de la page** (`{ add: true }` ajouté), **non draggée** (`AddCard` reçoit `dnd={null}` → pas de `rowProps` : le drag ne la compte pas, `dnd?.justDrag` / `dnd?.drag` null-safe). La position d'insertion **n'est plus mémorisée** (états `fAdd`/`tAdd` supprimés) : l'ancrage de création = **fin de la page courante** (`insertF`/`insertT`, toggle au-dessus/en-dessous relatif à ce point — le nouvel item apparaît donc sur la page courante). Réordonnancement : les indices locaux sont traduits par `startF`/`startT` et `dropRankRow`/`moveRankRow` sont appelés **avec `addPos = ids.length`** (liste complète, carte d'ajout virtuelle en fin) ; le drag de la carte d'ajout est impossible (pas de handlers) et un drop « sur » sa zone se borne à fin de page (`Math.min(b, fRealP.length)`).
- **Pagination masquée si une seule page** : `PageNav` rend `null` quand `ceil(total/size) <= 1` (après les hooks, jamais avant).
- **Drag & drop + flèches sous pagination** : `DndList` ne voit que la tranche de la page (indices locaux) ; la fonction `off(pg, i) = (pg-1)*PAGE + i` traduit l'indice local en **index global de liste d'affichage** avant d'appeler `moveRankRow`/`dropRankRow` (qui opèrent sur l'ordre complet + position de la carte d'ajout) → le réordonnancement reste exact même si la carte d'ajout est sur une autre page. Le réordonnangement ne se fait qu'au sein d'une page (pas de drag transverse entre pages — limitation assumée).
- **`Post`** : `<div class="post">` = ligne flex **à pleine largeur** (comme les `.item.fcard` des catégories/sujets — la `max-width:460px` historique est supprimée) — **`div.pauthor` à gauche** (avatar 40 px → rang guilde `.prank` → pseudo, colonne verticale, `padding:10px 30px` — précision utilisateur) et **`div.pmsg` à droite** (le corps `.postbody` + **`small.ptime` en bas à droite** : `position:absolute; right:10px; bottom:5px`, la `pmsg` réserve `padding-bottom:24px`). **Fonds alternés** : `.post:nth-child(odd)` (impair, blanc 5 %) / `.post:nth-child(even)` (paire, halo 7 %) — le fond est porté par le conteneur `.post`, donc il couvre **les deux div** (auteur + message).
- **Réponse (vue sujet)** : le composeur est un **`textarea` `.rtext` à 80 % de la largeur, centré** (`.rtext{width:80%;margin:0 auto}`), le bouton **Envoyer est centré juste en dessous** (`.rrow{justify-content:center}`) ; le groupe d'icônes `FmtBar` et l'aperçu `FPrev` restent au-dessus/dessous (card `guild-forum-tools`).
- **`.pmsg` occupe l'espace restant** de `.post` (`flex:1;min-width:0`) — le corps `.post .postbody` a sa contrainte `max-width:92%` supprimée (`width:100%` : le texte reste centré).
- **`.ptotal`** (le `/ total` de la pagination) : texte **×2** (`font-size:1.6rem` sur base 0.8rem) et **espace après le `/`** (JSX : `` `/ ${pages}` `` → « / 10 »).
- La **liste des rangs (onglet Gestion) n'est PAS paginée** : c'est un éditeur (drag & drop sur l'ordre complet, toggle d'insertion) ; paginer casserait la sémantique de réorganisation.

## Entry points
- `PageNav` est rendu : sous le `DndList` catégories, sous le `DndList` sujets (Forum), sous `.posts` (vue sujet), sous `.achips` (postulants) et sous `.mgrid` (membres).
- `Post` est rendu dans `.posts` (vue sujet) — la parité pair/impair = position dans la liste des messages de la page (le `.posts` ne contient que des `.post` quand non vide).

## Data flow
`PAGE = 10` constant → troncatures `slice((pg-1)*PAGE, pg*PAGE)` des listes locales (données déjà chargées côté client — **pagination d'affichage, pas d'API back**) ; les réordonnancements passent par `off()` → `POST /guilds/reorder` (ordre global complet).

## Tests
- `test/guild.test.js` (gardes statiques) : `function PageNav` + `ChevronLeft/ChevronRight` + `.ppage` + `/{pages}` ; ≥ 5 usages de `<PageNav` (les 5 listes) ; `fRowsP`/`tRowsP`/`postsP`/`applicantsP`/`membersP` ; `PFOLDER = 8`/`PMSG = 20`/`PAGE = 10` + `offF`/`offT` (translation local→global par taille de page) + `size={PFOLDER}`/`size={PMSG}` ; `.post` pleine largeur (plus de `max-width:460px`) ; `.rtext` 80 % + `.rrow` centré ; `.ptotal` 1.6rem ; resets `useEffect` sur `fid`/`tid` ; `.post{display:flex;flex-direction:row`, `.post:nth-child(odd)/(even){background`, `.ptime{position:absolute;right:10px;bottom:5px`, `<div className="pmsg">`.

## Gotchas
- **Le drag ne traverse pas les pages** : un réordonnancement est limité à la page courante ; l'ordre global reste cohérent via `startF`/`startT` + `addPos = ids.length`. La carte d'ajout est **fixée en dernière ligne de chaque page** (plus de position draggable mémorisée — l'insertion d'un nouvel item s'ancre à la fin de la page courante).
- La parité `.post:nth-child()` suppose que `.posts` ne contient que des `.post` (c'est le cas : le `<small>Aucun message</small>` n'apparaît que quand il n'y a **aucun** message, donc aucun `.post`).
- `nth-child(even)`/`(odd)` : « impair » = 1ᵉʳ, 3ᵉ, … (`:nth-child(odd)`) ; si le design demande l'inverse, inverser les deux règles.
- L'input de page n'accepte que des chiffres (`replace(/[^0-9]/g, '')`) ; entrée vide → resynchronisation au `blur`.
- La pagination est **client-side** : les listes forums/membres/postulants sont intégralement chargées par `GET /guilds/{characterId}` — pour de vrais gros volumes, il faudra une pagination côté API (hors périmètre ici).
