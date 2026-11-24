---
title: Guilde (UI) : formatage par balises texte ([g]/[i]/[rgb]), édition unifiée titre+description+droits, suppression/transfert
slug: guild-forum-tools
status: done
updated: 2026-11-24
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
  - src/components/fmtbar.jsx:PrevToggle
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
Outils d'édition du forum : formatage par balises texte, édition unifiée en place (titre, description, droits), confirmation
avant enregistrement ou suppression, suppression (Chef) et transfert de sujet, composants partagés `AddCard` / `DndList`.

## Business rules
- Formatage stocké en balises texte : `[g]…[/g]`, `[i]…[/i]`, `[rgb:R.G.B]…[/rgb]` (canaux bornés à 255) ; anciens marqueurs toujours lus ; rendu final uniquement par `fmt` (échappement d'abord), jamais de HTML brut.
- La barre de formatage agit sur le dernier champ focalisé ; elle est inactive en mode aperçu.
- Édition en place : 1er clic sur le crayon = champs pré-remplis ; 2e clic = enregistrer ; s'il y a des modifications, confirmation (Valider / Annuler) ; Annuler abandonne le brouillon sans appel API.
- Droit d'éditer un sujet (`canEditTopic`, miroir du back) : Chef, auteur, `create_topics`, ou rang qui écrit dans la catégorie ; les droits par rang ne sont modifiables que par le Chef (le rang Chef n'a pas de case).
- Suppression (Chef) toujours confirmée : une catégorie emporte ses sujets et messages.
- Transfert (`create_topics`) vers une AUTRE catégorie : le sujet arrive en fin de liste.
- Un champ contrôlé a toujours un `onChange` (sinon le texte est figé).

## Gotchas
- Les routes `/edit` ignorent les champs inconnus : envoyer exactement `name` (catégorie) et `title` (sujet), sinon 200 sans effet.
- La mise en page flottante des cartes est limitée à `.fcard` : les mêmes classes existent ailleurs (choix du personnage, rangs).
- Taper un `#` à la main dans un texte coloré peut couper la balise (sans risque XSS).

## Tests
`test/fmt.test.js` (échappement, balises, imbrications, `wrapSel`, conversion de couleur) ; `test/guild.test.js` (`lastChef`, ordre, `effWrite`, `canEditTopic`, littéraux `name`/`title`, champs contrôlés).
