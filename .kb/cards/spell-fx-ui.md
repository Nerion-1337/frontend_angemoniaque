---
title: Onglet Sorts : éditeur des effets (moteur de sorts) et liens ; sorts liés en jeu
slug: spell-fx-ui
status: done
updated: 2026-11-25
files:
  - src/admin/SpellFx.jsx
  - src/admin/ItemsTab.jsx
  - src/admin/MonsterDetails.jsx
  - src/admin/spellFx.js
symbols:
  - src/admin/spellFx.js:fxBody
  - src/admin/spellFx.js:fxSummary
tests:
  - test/spellFx.test.js
---
## Purpose
Onglet admin « Sorts » : éditeur des effets du moteur de sorts et gestion des liens du sort ; en jeu, le panneau Actions indique la
provenance et le résumé des effets de chaque sort lançable.

## Business rules
- Case « Effets paramétrés » décochée → `effects = {}` (sort historique selon son genre).
- Cible soi / unique / zone ; portée seulement hors « soi » ; rayon seulement en zone ; camp touché ; dégâts, soin, dégâts sur la durée (jamais mortels) ; caractéristiques ± ; durée (0 = permanent) seulement si une capacité est modifiée (`fxBody` borne tout).
- « Rendre / retirer » (PV, énergie, énergie divine) agit sur la valeur actuelle sans dépasser le max ; « max » change la capacité.
- Invocation (lot D) : case « Le sort invoque un élément », genre Monstre / Monture (types montables seulement) / Objet (quantité 1–99) / Bâtiment, durée en heures (0 = permanent) ; sans élément choisi → `summon: null`.
- Plus de liens dans l'onglet Sorts : les sorts se lient depuis la fiche de l'élément (`ElementSpells`) — objet (en continu, à activer, au coup porté, à l'attaque reçue), monstre servant de monture (onglet Capacités, « En tant que monture » : en continu, à activer) ; bâtiments : éditeur de sorts de la structure (lot 4). Suppression confirmée.
- Le résumé `fxSummary` est le même dans l'admin et dans le jeu.

## Gotchas
- `SpellFx.jsx` (composants) et `spellFx.js` (fonctions) : importer avec l'extension.
- Les sélecteurs dans une `.row` admin ont une largeur automatique (règle `.admin .row select`) : sans elle, ils prennent toute la ligne.

## Tests
`test/spellFx.test.js` (moteur désactivé → {}, bornes et nettoyage de `fxBody`, `fxSummary`, invocation, modes de lien par élément).
