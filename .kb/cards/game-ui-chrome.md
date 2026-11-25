---
title: Interface de jeu : barre d accès, messagerie, paramètres, navigation du haut, panneaux
slug: game-ui-chrome
status: done
updated: 2026-11-25
files:
  - src/components/ChatDock.jsx
  - src/components/Account.jsx
  - src/components/TopBar.jsx
  - src/components/Panels.jsx
  - src/App.jsx
  - src/lib/chat.js
symbols:
  - src/lib/chat.js:ago
  - src/lib/chat.js:groupChat
tests:
  - test/chat.test.js
---
## Purpose
Habillage de l'interface de jeu (hors guilde) : barre d'accès Messagerie / Paramètres, fenêtre de messagerie, paramètres du
compte, navigation du haut libellée, en-tête des panneaux et boutons harmonisés.

## Business rules
- Barre d'accès en bas à droite : « Messages » (pastille = total des non-lus des trois canaux) et « Paramètres » (ouvre / ferme le panneau du compte) ; libellés masqués sous 600 px.
- Messagerie : canaux Vision, Guilde, Courrier avec leurs non-lus ; discussion en bulles (les miennes à droite, auteur et heure relative, messages enchaînés du même auteur regroupés sous 5 min) ; envoi par Entrée ou bouton, désactivé si vide ; erreurs en toast.
- Courrier : cartes repliables (non lus marqués), « Répondre » pré-remplit destinataire et « Re : objet » ; « Nouveau courrier » ouvre le formulaire (destinataire, objet, message).
- Guilde sans guilde : message d'état au lieu de la saisie ; liste vide : message d'état.
- Paramètres : personnage actif (race en clair, rang, case), personnages du compte (« Jouer » / « En jeu »), création (limite 3 sauf admin), administration, déconnexion.
- Navigation du haut : disques libellés (Pactes, Montures, Guilde, Carte) ; un second clic referme le panneau ouvert.
- Les styles ajoutés ne visent que `.panel`, `.inv:not(.guild)`, `.scroll`, `.dock`, `.portrait`, `.mainico` : la guilde garde son apparence.

## Gotchas
- Classe globale `.inl` déjà prise par le jeu (ligne d'insertion) : ne pas réutiliser de classes génériques sans préfixe.
- Un courrier envoyé à soi-même revient deux fois du serveur (deux participants) : la liste dédoublonne par id.

## Tests
`test/chat.test.js` (`ago`, `reSubject`, `groupChat`, pas d'`alert()`, paramètres dans la barre d'accès) ; contrôle visuel Chromium (bureau + mobile) avec envoi réel.
