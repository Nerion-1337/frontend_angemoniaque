---
title: Guilde (UI) : formatage par balises texte ([g]/[i]/[rgb]), édition unifiée titre+description+droits, suppression/transfert
slug: guild-forum-tools
status: done
updated: 2026-10-20
files:
  - src/components/Guild.jsx
  - src/components/fmtbar.jsx
  - src/components/Confirm.jsx
  - src/lib/fmt.js
  - src/lib/guild.js
  - src/styles.css
  - test/fmt.test.js
  - test/guild.test.js
symbols:
  - src/components/fmtbar.jsx:FmtBar
  - src/components/fmtbar.jsx:FmtField
  - src/components/fmtbar.jsx:FPrev
  - src/components/fmtbar.jsx:useFmt
  - src/components/Confirm.jsx:Confirm
  - src/components/Guild.jsx:Forum
  - src/components/Guild.jsx:Perks
  - src/components/Guild.jsx:MoveModal
  - src/lib/fmt.js:fmt
  - src/lib/fmt.js:wrapSel
tests:
  - test/fmt.test.js
  - test/guild.test.js
---
## Purpose
Forum v2 UX pass — édition et gestion :
1. **Formatage par balises texte** : la barre d'outils (au-dessus du champ) n'insère que des balises tapées dans le texte, interprétées par `fmt` : `[g]…[/g]` (gras), `[i]…[/i]` (italique), `[rgb:R.G.B]…[/rgb]` (couleur, canaux 0-255). Les anciens marqueurs (`**`, `*`, `#rrggbb:text#`, code hex isolé) restent interprétés pour les contenus existants.
2. **Édition unifiée en place** : le bouton crayon REMPLACE les balises d'affichage (div/span) par des champs pré-remplis (useState côté parent) — titre + description + droits par rang — dans la même ligne ; les boutons de formatage sont au-dessus de l'élément modifié.
3. **Sauvegarde par re-clic** : re-clic sur le même crayon = enregistrer ; s'il y a eu des modifications, un écran de confirmation propose de **valider ou d'annuler les changements**.
4. **Suppression avec confirmation** (Chef) : une catégorie emporte ses sujets et leurs messages (cascade back).
5. **Transfert de sujet** : bouton qui déplace un sujet d'une catégorie à l'autre (back : fin de liste cible).
6. Factorisation `AddCard` / `DndList` (rangs / catégories / sujets) et en-têtes propres (titre centré 1.6rem, séparateur `-----`, bouton retour strictement à gauche, pas de fond d'en-tête).

## How it works
- **`fmt` (`src/lib/fmt.js`)** — échappement HTML d'abord (donc sûr), puis les règles d'affichage, dans cet ordre : `[g]` → `[i]` → `[rgb:R.G.B]` (chaux clampés à 255 ; regex `(\d{1,3})` × 3) → `#hex:text#` (héritage WYSIWYG, toujours supporté) → `**` → `*` → code `#hex` isolé (sémantique historique) → `\n`→`<br>`. Les marqueurs de balises sont substitnés AVANT les gras/italiques : le contenu capturé traverse les règles suivantes, donc les balises se nichent (`[rgb:1.2.3][g]A[/g][/rgb]` → span coloré autour du `<b>`). Le HTML brut tapé dans une balise reste échappé (testé).
- **`wrapSel(value, s, e, before, after = before)`** — pure : entoure la sélection `[s,e]` de `before`/`after` ; sélection vide → paire insérée au curseur ; retourne `{ text, cursor }` (fin d'insertion, repositionnement du caret après le setState).
- **`FmtBar({ onFmt, onColor })`** (`fmtbar.jsx`) — rangée compacte `B`/`I`/nuancier, placée **au-dessus** de l'élément modifié : `B` → `onFmt('[g]', '[/g]')`, `I` → `onFmt('[i]', '[/i]')`, pastille (`<input type="color">`, défaut `#c8a24a`) → `onColor(hex)` qui insère `[rgb:R.G.B]…[/rgb]` (canal par canal converti depuis le hex, `rgbOf`).
- **`useFmt(set)`** (`fmtbar.jsx`) — `bind(s)` se répand sur `<input>/<textarea>` et porte **toujours** `onFocus` (récupère `{ el, set }` dans une ref, dernière ligne focalisée) ET `onChange` (un champ contrôlé sans `onChange` est gelé par React — bug historique « impossible d'ajouter/effacer du texte »). `fm.fmt(m, after?)` / `fm.color(h)` appliquent `wrapSel` sur la `value` + `selectionStart/End` du champ, `set(text)`, puis `requestAnimationFrame(() => el.setSelectionRange(cursor, cursor))`.
- **`FmtField({ value, onChange, multiline, rows = 3, placeholder })`** (`fmtbar.jsx`) — le champ modifiable générique (contrôlé : le parent porte le texte en useState) : `FmtBar` en haut, `<input>/<textarea>` pré-rempli au milieu, `FPrev` (aperçu du rendu `fmt` live) en dessous. C'est lui qui remplace les balises d'affichage à l'édition (spéc. « le bouton remplace les balises div/span/p par un input pré-rempli »).
- **Édition unifiée** (`Forum` dans `Guild.jsx`) : un seul état par objet — `ed = { kind: 'f'|'t', id }`, `draft` (brouillon : `title`, `desc`, `read`, `write`, `iR`, `iW`), `base` (instantané à l'ouverture → détection des modifications par comparaison, `dirty()`). Le crayon : 1er clic = `openFoldEdit`/`openTopicEdit` (pré-remplit le brouillon : lecture/écriture **matérialisées** — `write_ranks === null` → `iW` true ; sujet `visible_ranks` vide/null → `iR` true avec la liste de la catégorie) ; re-clic = `dirty() ? setCSave(true) : closeEdit()`. À l'ouverture, les balises d'affichage de la ligne (titre `selitem`, description `.fdesc`) sont remplacées **dans le même emplacement** par `FmtField` (+ `Perks` si Chef).
- **`Perks({ g, kind, value, onChange })`** — matrice droits par rang **contrôlée** (pas de save interne, le parent enregistre tout d'un bloc) : cochons Voir/Écrire par rang ; « voir décoché → écrire décoché », « écrire coché → voir coché » ; cases `iR` (« lecture héritée de la catégorie », sujets seulement) et `iW` (« écriture héritée de la lecture ») qui désactivent la colonne ; note permanente « Le Chef dépasse toujours ces droits ; écrire est limité à « voir » ».
- **Sauvegarde unifiée `saveAll()`** — `POST /guilds/{folders|topics}/{id}/edit` (titre + description ; le back rejoue la porte : auteur / create_topics / écriture de catégorie, card `guild-forum-edit`) et, **Chef seulement**, `POST …/perms` (`readRanks` : liste, ou `[]` si `iR` ; `writeRanks` : `null` si `iW`). Erreur → toast `run`, champs restés ouverts.
- **Confirmation (`src/components/Confirm.jsx`)** — `Confirm({ msg, ok, cancel, onOk, onCancel })` : voile `position:fixed` + carte centrée (`.ccard`) ; clic extérieur = annuler. Utilisé : (a) sauvegarde avec modifications (« valider l'enregistrement ? » — **Annuler abandonne le brouillon** : `closeEdit` + `load()` non appelé, l'état redescend), (b) suppression.
- **Suppression** (Chef) — corbeille `Trash2` dans `.aacts` (catégories ET sujets, vue liste ; pas d'icône dans l'en-tête) : `setCDel({ kind, id, name })` → `Confirm` explicite (« Tous ses sujets et leurs messages seront supprimés définitivement. ») → `POST /guilds/{folders|topics}/{id}/delete` (back card `guild-forum-manage`, cascade) → `load()` (+ retour liste si la vue courante portait l'objet).
- **Transfert `MoveModal`** — icône `MoveRight` sur chaque sujet (détenteurs de `create_topics`, le Chef passe) : modal radio sur les **autres** catégories (`.mov`) → `POST /guilds/topics/{id}/move` (`folderId`) → le back range le sujet **en fin de liste cible** (sortie des messages/droits) → `load()` (+ `setTid(null)` si le sujet était ouvert).
- **`AddCard` / `DndList`** — facteurs communs inchangés de la pass précédente : carte d'ajout (`+` dans cercle bordé, toggle d'insertion dans `.aacts`, arrows `canMove`) et liste à flèches ↑/↓ + drag & drop 8 px + ligne dorée `.inl` (retraitée par `dropRankRow` + `POST /guilds/reorder`).
- **En-têtes** — `.fhead2` : retour strictement à gauche (`.backbtn{ justify-self:start }`), titre centré 1.6rem, séparateur `-----` (`.fsep`) uniquement si description, description 0.9rem ; aucun fond ni bordure sur le bloc d'en-tête ; le « + » supérieur-droite a été supprimé (création uniquement via la carte d'ajout).
- **Droits d'édition d'affichage** — `canEditTopic(t, f, gme, uid)` (`src/lib/guild.js`, pure, unit-tested) = Chef ∪ auteur (`t.author_id === uid`) ∪ `create_topics` ∪ rang dans `f.write_ranks` : miroir exact de la porte back (card `guild-forum-edit`) ; les crayons (liste + vue sujet) l'utilisent, le crayon catégorie reste `create_topics`-only.

## Entry points
- `src/components/fmtbar.jsx` — `FmtBar` / `FmtField` / `FPrev` / `useFmt` (la toolbar, le champ générique, l'aperçu, la sélection du dernier champ focalisé).
- `src/components/Confirm.jsx` — l'écran de confirmation (enregistrement / suppression).
- `Guild.jsx:Forum` (+ `Perks`, `MoveModal`, `NewFolderModal`, `NewTopicModal` — ces deux dernières utilisent `FmtField` pour titre/description/corps).
- `src/lib/fmt.js` — `fmt` (rendu sûr, marqueurs) + `wrapSel` (pure, importable partout).
- Back API : `POST /guilds/{folders,topics}/{id}/edit` (card `guild-forum-edit`), `POST /guilds/{folders,topics}/{id}/perms` (Chef, card `guild-forum-perms`), `POST /guilds/{folders,topics}/{id}/delete` + `POST /guilds/topics/{id}/move` (card `guild-forum-manage`).

## Data flow
- **Formatage** : B/I/nuancier → `useFmt` (champ focalisé) → `wrapSel` (pure) → `set(text)` → re-render ; le rendu passe TOUJOURS par `fmt` (échappement d'abord) dans `FPrev` et les balises d'affichage — aucun HTML brut, jamais.
- **Édition** : crayon #1 → brouillon pré-rempli (état useState du `Forum`) → `FmtField`/`Perks` mutent le brouillon → crayon #2 → `dirty()` ? `Confirm` : fermeture ; **Valider** → `saveAll` (edit + perms si Chef) → `load()` → fermeture ; **Annuler** → brouillon abandonné, fermeture.
- **Suppression** : corbeille (Chef) → `Confirm` → `POST …/delete` (cascade back : messages, sujets, états de lecture, sujets, catégorie) → `load()`.
- **Transfert** : `MoveRight` (create_topics) → modal radio → `POST /guilds/topics/{id}/move` → fin de liste de la cible → `load()`.

## Tests
- `test/fmt.test.js` (vitest pur) : `fmt` — échappement, `[g]`/`[i]`/`[rgb:R.G.B]` (clamp >255), nestings (`[rgb]∘[g]`, `[g]∘[i]`), HTML dans une balise reste échappé, `wrapSel` (asymétrique, sélection vide) + rendu `fmt(wrapSel('[g]…'))`, `#c8a24a` → `[rgb:200.162.74]`, coexistence anciens+nouveaux marqueurs ; garde-fous historiques (code hex isolé, ligne `**`/`*`).
- `test/guild.test.js` (pur + gardes statiques) : `canEditTopic` (7 cas) ; gardes de régression sur les sources — `FmtField` présent dans `Guild.jsx` ET `contentEditable`/`InlineField`/`InlineEdit`/`edbox` absents (le WYSIWYG est retiré) ; `fmtbar.jsx` insère `'[g]'`/`'[/i]'`/`[rgb:${rgbOf(h)}]` et ne connaît plus `execCommand` ; `bind` porte un `onChange` ; `Guild.jsx` appelle `/delete`, `/move`, `<Confirm` ; `Confirm.jsx` est contrôlé (`onOk`/`onCancel`, clic extérieur = annuler) ; `<DndList` en prop `renderRow` (3 sites).

## Gotchas
- Les balises sont **du texte stocké** : au rendu final elles disparaissent (`fmt` les transforme), mais dans les champs/aperçus elles sont visibles — c'est le comportement voulu (l'ancien mode WYSIWYG contentEditable + serializer `rich.js` a été **retiré** : `src/lib/rich.js`, `test/rich.test.js`, `InlineField.jsx` supprimés ; le marqueur `#hex:text#` reste interprété par `fmt` pour les contenus de l'époque).
- `#` tapé à la main dans du texte coloré peut couper le marqueur `[rgb:…:…]` tôt (le contenu reste échappé — pas de XSS) ; ne pas mixer des `#` manuels dans des balises couleur.
- `dirty()` compare le brouillon au **brouillon d'ouverture** (`base`) : annuler (✕ ou Confirm) restaure visuellement (l'état re-descend) mais ne ré-appelle pas l'API — les changements non validés sont perdus (conforme à la spécification « annuler les changements »).
- La porte « sauvegarde » s'applique au texte (auteur/create_topics/écriture de catégorie) ET, pour les droits, au Chef : un auteur qui n'est pas Chef peut enregistrer le titre/description mais ne voit pas le panneau `Perks` (le `perms` n'est pas appelé).
- Le transfert range le sujet en **fin** de liste cible (max sort_order + 1) : l'utilisateur ne réordonne PAS le sujet dans la cible à ce moment-là (il peut ensuite le glisser avec le DnD).
- La `Confirm` est un voile `fixed` (z-index 80) : clic extérieur ou bouton Annuler = `onCancel` ; aucun clavier (Échap) — ajouté si demandé.
- `FmtField` est contrôlé : **jamais** de valeur sans `onChange` (le spread `bind` le garantit — garde statique).
