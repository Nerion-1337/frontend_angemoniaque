---
title: Interface de jeu : barre d accès, messagerie, paramètres, navigation du haut, panneaux, invocations (montées ou non)
slug: game-ui-chrome
status: done
updated: 2026-11-26
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
  - src/lib/worlds.js
  - src/components/CreatureIcon.jsx
symbols:
  - src/lib/chat.js:ago
  - src/lib/chat.js:groupChat
tests:
  - test/chat.test.js
  - test/gameTabs.test.js
  - test/noSwallowedCode.test.js
---
## Purpose
Habillage de l'interface de jeu (hors guilde) : barre d'accès Messagerie / Paramètres, fenêtre de messagerie, paramètres du
compte, navigation du haut libellée, en-tête des panneaux et boutons harmonisés.

## Business rules
- Logo « Angemoniaque » (`.logo` en jeu, `.wordmark` accueil / forum / histoire, admin) : UNE règle CSS partagée (dégradé bleu ciel → or → braise, ombres portées) ; boîte ajustée au mot (`width:fit-content`), sinon le dégradé s'étire sur la largeur et le mot reste bleu-blanc.
- Barre d'accès en bas à droite : « Messages » (pastille = total des non-lus des trois canaux) et « Paramètres » (ouvre / ferme le panneau du compte) ; libellés masqués sous 600 px.
- Messagerie : canaux Vision, Guilde, Courrier avec leurs non-lus ; discussion en bulles (les miennes à droite, auteur et heure relative, messages enchaînés du même auteur regroupés sous 5 min) ; envoi par Entrée ou bouton, désactivé si vide ; erreurs en toast.
- Courrier : cartes repliables (non lus marqués), « Répondre » pré-remplit destinataire et « Re : objet » ; « Nouveau courrier » ouvre le formulaire (destinataire, objet, message).
- Guilde sans guilde : message d'état au lieu de la saisie ; liste vide : message d'état.
- Paramètres : personnage actif (race en clair, rang, case), personnages du compte (« Jouer » / « En jeu »), création (limite 3 sauf admin), administration, déconnexion.
- Navigation du haut : disques libellés (Pactes, Invocations, Guilde, Carte) ; un second clic referme le panneau ouvert.
- Panneau Invocations (2026-11-26, plus de montures) : chaque invocation (créée par un sort) avec médaillon, état (Invoquée / contrôlée / Montée), déplacement, « peut être montée », caractéristiques ; boutons « Monter dessus » (type montable, case voisine du héros, sinon grisé + rappel), « Contrôler » / « Revenir », « Renvoyer », « Descendre » si montée.
- Les styles ajoutés ne visent que `.panel`, `.inv:not(.guild)`, `.scroll`, `.dock`, `.portrait`, `.mainico` : la guilde garde son apparence.
- Fenêtres en onglets (`Tabs` / `useTab`, un seul onglet affiché, dernier onglet retenu par fenêtre en localStorage, onglet disparu → le premier) : Actions (Sorts, Construire, Récolte & bâtiments, Combat ; la case ciblée s'affiche pour Sorts et Construire), Pactes & Fidèles (Pactes, Demandes, Foi, Autel pour un Dieu), Invocations : PAS d'onglets — une seule liste de créatures (possédées : invocables, montables ou non ; puis celles invoquées par un sort).
- Carte de case : sur sa propre invocation montable, action « Monter sur X » (approche puis `/summons/ride`). Actions › Sorts : « Lancer et monter » pour un sort qui invoque un monstre montable (`summon_mountable`) ; délai de relance affiché, bouton grisé et « Recharge : encore … » tant que `cooldown_left_s` > 0 ; plus de souffle de monture ni de navire.
- Changement de personnage : `useRefreshMe` lit `charId` au moment de l'appel et ignore une réponse arrivée après un changement ; l'intervalle de rafraîchissement est relancé au changement (sinon l'ancien personnage revenait).
- Hôtel de ville (`Capital`) : en-tête (nom, or), onglets Boutique, Sorts, Marché (offres + vente : objet du sac, prix), Coffre (jauge, extension, colonnes Coffre ⇄ Sac) ; cartes d'objets en grille ; bouton grisé si or insuffisant / épuisé / coffre plein.
- Invocations : statut par créature (Au repos / Invoquée / contrôlée / Montée) ; au repos : « Invoquer », « Invoquer et monter » si montable ; invoquée : « Monter dessus » (case voisine), « Contrôler », « Renvoyer » ; montée : « Descendre », « Descendre et la laisser invoquée ».
- Pactes, Actions, Invocations, Compte : fenêtres CENTRÉES (`Panel` = `Modal`), fermées par Échap / clic extérieur / ×.
- Hôtel de ville, onglet Boutique : offre « Carte des ressources — <monde de cette capitale> » (prix serveur, « Acquise » si ce monde est dans `me.map_worlds`). Carte du monde : la mise en valeur des ressources n'apparaît que si le monde affiché est dans `me.map_worlds` ; sinon une note renvoie à l'Hôtel de ville de ce monde ou à son parchemin.
- Carte de case sélectionnée : en-tête (nom, case, niveau, coût, ressource), infos, entité, jauge de toucher, une action = un bouton avec son coût (plus de liste + « Valider ») ; construction : choix du bâtiment en boutons ; reste dans l'écran.
- Carte de case : si une condition de récolte manque à CE personnage (`harvestMissing`), pas d'action « Récolter » mais « Vous n'êtes pas équipé pour récolter X » ; survol / focus : ce qui manque, par option.
- Hôtel de ville, Coffre : emplacements utilisés (objets + piles) ; ressources regroupées par type dans les colonnes Coffre et Sac, déplacées en un clic.
- Invocations : chaque créature affiche sa taille (+taille vision / portée montée, volante +6) au lieu des anciens bonus de vue / portée. Admin Monstres : champ « Taille » (1 à 3) à la place des bonus de vue / portée de monture.
- Hôtel de ville thématisé selon la race du personnage (`capTheme` : nom, devise, emblème Landmark / Flame / Feather ; classes `.cap-human|demon|angel`, couleur `--capc`) ; race inconnue → thème humain.
- Compte & paramètres : la race du nouveau personnage vient de `GET /characters/races` (admin : toutes les races actives au choix ; joueur : sa race verrouillée) ; plus de race imposée par le premier personnage.

- Sac : un parchemin de carte des ressources sélectionné propose « Utiliser » (désactivé si ce monde est déjà ouvert) ; ligne d'objet « Carte des ressources : <monde> ». Noms des mondes : `lib/worlds.js`.
- HUD : barres de l'invocation contrôlée et de la monture sur UNE ligne, médaillon de créature (icône + initiales) à la place du nom ; plus de « bonus de vision » sur la barre de monture. Panneau Invocations : médaillon devant chaque monture / invocation.
## Gotchas
- Classe globale `.inl` déjà prise par le jeu (ligne d'insertion) : ne pas réutiliser de classes génériques sans préfixe.
- Un courrier envoyé à soi-même revient deux fois du serveur (deux participants) : la liste dédoublonne par id.

## Tests
`test/chat.test.js` (`ago`, `reSubject`, `groupChat`, pas d'`alert()`, paramètres dans la barre d'accès) ; contrôle visuel Chromium (bureau + mobile) avec envoi réel.
