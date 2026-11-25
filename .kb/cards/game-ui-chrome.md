---
title: Interface de jeu : barre d accès, messagerie, paramètres, navigation du haut, panneaux, montures
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
  - src/components/Tabs.jsx
  - src/components/Capital.jsx
  - src/components/GameCanvas.jsx
  - src/components/TileCard.jsx
symbols:
  - src/lib/chat.js:ago
  - src/lib/chat.js:groupChat
tests:
  - test/chat.test.js
  - test/gameTabs.test.js
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
- Panneau Montures : par monture, état (Au repos / Montée / Invoquée à pied), modes de déplacement, caractéristiques équipement compris, capacités ; boutons « Monter dessus » (si le type sert de monture) et « Invoquer (sans monter) », puis « Descendre » ou « Contrôler / Revenir » et « Renvoyer » ; équipement par partie du corps autorisée, verrouillé pendant l'invocation à pied (règles serveur : card back `mount-call`).
- Les styles ajoutés ne visent que `.panel`, `.inv:not(.guild)`, `.scroll`, `.dock`, `.portrait`, `.mainico` : la guilde garde son apparence.
- Fenêtres en onglets (`Tabs` / `useTab`, un seul onglet affiché, dernier onglet retenu par fenêtre en localStorage, onglet disparu → le premier) : Actions (Sorts, Construire, Récolte & bâtiments, Combat ; la case ciblée s'affiche pour Sorts et Construire), Pactes & Fidèles (Pactes, Demandes, Foi, Autel pour un Dieu), Invocations : PAS d'onglets — une seule liste de créatures (possédées : invocables, montables ou non ; puis celles invoquées par un sort).
- « Montures » devient « Invocations » (navigation et titre). Monture invoquée à pied : « Monter dessus » actif depuis une case voisine (sinon grisé + rappel), aussi dans la carte de case (« Monter sur X » : approche puis montée).
- Changement de personnage : `useRefreshMe` lit `charId` au moment de l'appel et ignore une réponse arrivée après un changement ; l'intervalle de rafraîchissement est relancé au changement (sinon l'ancien personnage revenait).
- Hôtel de ville (`Capital`) : en-tête (nom, or), onglets Boutique, Sorts, Marché (offres + vente : objet du sac, prix), Coffre (jauge, extension, colonnes Coffre ⇄ Sac) ; cartes d'objets en grille ; bouton grisé si or insuffisant / épuisé / coffre plein.
- Invocations : statut par créature (Au repos / Invoquée / contrôlée / Montée) ; au repos : « Invoquer », « Invoquer et monter » si montable ; invoquée : « Monter dessus » (case voisine), « Contrôler », « Renvoyer » ; montée : « Descendre », « Descendre et la laisser invoquée ».

## Gotchas
- Classe globale `.inl` déjà prise par le jeu (ligne d'insertion) : ne pas réutiliser de classes génériques sans préfixe.
- Un courrier envoyé à soi-même revient deux fois du serveur (deux participants) : la liste dédoublonne par id.

## Tests
`test/chat.test.js` (`ago`, `reSubject`, `groupChat`, pas d'`alert()`, paramètres dans la barre d'accès) ; contrôle visuel Chromium (bureau + mobile) avec envoi réel.
