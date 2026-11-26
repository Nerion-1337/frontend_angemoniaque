// « L'histoire » (#histoire) : le jeu et ses mécanismes racontés comme une chronique, chapitre par chapitre ; chaque chapitre
// rappelle en une ligne ce que le récit signifie en jeu. Page publique (écran d'accueil), sans appel serveur.
import { Globe2, Flame, Feather, User, Crown, Zap, Mountain, Pickaxe, Landmark, ScrollText, Swords, Skull, PawPrint, Handshake, Gem, Shield, TrendingUp, Sparkles } from 'lucide-react';
export const CHAPTERS = [
  { id: 'brisure', I: Globe2, title: 'I. La Brisure', tone: 'gold',
    text: ['Au commencement, il n’y avait qu’un seul monde, et une seule lumière. Puis vint la Brisure : la lumière se fendit, et la création tomba en trois éclats.',
      'Le premier devint le Monde des Hommes, terre de plaines, de forêts et de montagnes, où l’on bâtit, récolte et prie. Le deuxième se sépara en deux moitiés qui se regardent sans jamais se mêler : le Monde des Anges et des Démons, lumière d’un côté, braise de l’autre. Le troisième, enfin, ne fut jamais habité par les vivants : c’est le Monde des Morts, où dorment les âmes et les ressources que nul ne devrait toucher.',
      'Entre ces mondes, seules des Portes anciennes demeurent. Elles ne s’ouvrent qu’à ceux qui portent un fragment de la lumière perdue.'],
    game: 'Trois cartes (Hommes, Anges & Démons, Morts) reliées par des portes que l’on franchit avec un objet divin.' },
  { id: 'peuples', I: User, title: 'II. Les trois peuples (et le quatrième)', tone: 'neutral',
    text: ['Les Hommes sont nés de la poussière des éclats : fragiles, mais tenaces. Ils forgent, ils construisent, ils s’organisent. Un Homme ne scelle qu’un seul pacte dans sa vie, mais il est le seul à pouvoir porter les Artefacts.',
      'Les Anges gardent les Reliques. Ils guident les mortels, soignent, protègent, et nouent plusieurs pactes à la fois. Les Démons, eux, gardent les Arcanes : puissance brute, ambition sans fond, et autant de pactes que leur rang le permet.',
      'Et puis, parfois, naît un Néphilim. Mi-ange, mi-démon, une aile de plumes et une aile de braise, il n’appartient à aucun camp. Les Néphilims sont rares : le monde n’en tolère qu’une poignée.'],
    game: 'Choisissez votre race à la création ; tous les personnages d’un compte partagent la même. Le Néphilim est réservé et limité en nombre.' },
  { id: 'rangs', I: Crown, title: 'III. L’Ascension', tone: 'gold',
    text: ['Nul ne naît grand. Le Mortel devient Héros, puis Immortel, Demi-Dieu, et — pour une poignée d’élus à travers les âges — Divin. Chez les Anges, le Soldat devient Archange puis Séraphin ; chez les Démons, Duc puis Titan.',
      'Chaque marche est plus étroite que la précédente : la moitié seulement d’un peuple peut prétendre au deuxième rang, un quart au troisième, et le rang Divin est presque une légende. Gravir une marche exige des épreuves ; certains la gravissent pour toujours, d’autres seulement pour un temps.',
      'À mesure que l’on s’élève, le corps change : on voit plus loin, on frappe plus fort, et l’on finit par sentir couler en soi l’énergie divine. On le voit même de loin : épaulières de bronze, plastron d’argent, aura d’or, couronne de lumière.'],
    game: 'Rangs à places limitées, passage de rang définitif ou temporaire, énergie divine aux rangs élevés ; à chaque rang gagné, les caractéristiques de base du palier s’ajoutent à celles que vous avez améliorées (et se retirent si vous redescendez) ; l’allure du personnage change avec le rang.' },
  { id: 'souffle', I: Zap, title: 'IV. Le Souffle et l’Heure', tone: 'blue',
    text: ['Tout geste coûte du souffle. Marcher dans la plaine en demande peu, gravir une montagne ou traverser une eau profonde beaucoup plus ; frapper, récolter, lancer un sort, tout puise dans la même réserve.',
      'Mais le monde a une horloge. À chaque heure qui passe — même quand vous dormez, même quand le monde lui-même s’arrête — les corps se réparent : la vie, le souffle et l’énergie divine reviennent selon la vigueur de chacun.'],
    game: 'L’énergie se dépense à chaque action et se régénère chaque heure (régénération unique : vie, énergie et énergie divine).' },
  { id: 'terre', I: Mountain, title: 'V. Ce que l’on voit d’en haut', tone: 'green',
    text: ['La terre n’est pas plate. Celui qui grimpe une colline voit plus loin et porte ses coups plus loin ; celui qui chevauche une grande bête domine la mêlée ; et celui qui vole, tout là-haut, embrasse le monde entier du regard — mais devient aussi une cible visible de partout.',
      'Prenez garde aux volcans, dont la chaleur brûle d’heure en heure, et respectez la Zone sacrée autour de l’Hôtel de ville des Hommes : là, nul ne lève l’arme contre un autre joueur.'],
    game: 'Le relief et la hauteur (monture, vol) augmentent vision et portée ; brûlure du volcan ; zone sacrée sans combat entre joueurs.' },
  { id: 'recolte', I: Pickaxe, title: 'VI. Les dons de la terre', tone: 'green',
    text: ['Chaque monde cache ses trésors : bois rares, fleurs étranges, minerais d’adamantine ou de mithril, âmes cristallisées au Royaume des Morts. On ne les ramasse pas à mains nues : il faut l’outil juste, parfois le sort juste, et les gisements s’épuisent avant de renaître.',
      'Les plus avisés achètent à l’Hôtel de ville la Carte des ressources de leur monde, qui révèle où pousse chaque merveille. Pour les autres mondes, il faut trouver le parchemin qui en dévoile les secrets.'],
    game: 'Récolte par case selon outils / sorts requis, stocks qui se régénèrent ; sac et coffre en piles ; carte des ressources par monde (achat ou parchemin).' },
  { id: 'capitale', I: Landmark, title: 'VII. Les cœurs des peuples', tone: 'gold',
    text: ['Chaque peuple a son cœur. L’Hôtel de ville des Hommes, de pierre et d’horloge ; le Bastion Infernal des Démons, d’obsidienne et de lave ; le Sanctuaire de la Providence des Anges, de marbre et de lumière.',
      'C’est là qu’on achète ses premières armes, qu’on apprend ses sorts, qu’on range ses biens dans le coffre et qu’on s’améliore. Et ici, rien ne coûte de souffle.'],
    game: 'Capitale par race : boutique, sorts, coffre, améliorations ; interactions gratuites en énergie.' },
  { id: 'forge', I: ScrollText, title: 'VIII. Les parchemins', tone: 'neutral',
    text: ['Le savoir des anciens est écrit sur des parchemins. Réunissez les bonnes ressources, lisez le parchemin, et naissent une arme, un sort oublié, ou même un bâtiment entier : un mur, une tour, une fabrique, un totem.',
      'Une tour posée sur une case la rend vôtre ; on peut s’y abriter, la défendre, ou l’éveiller pour qu’elle agisse d’elle-même.'],
    game: 'Fabrication : parchemin + ressources → objet, sort ou bâtiment ; les bâtiments occupent une case et peuvent avoir des sorts.' },
  { id: 'combat', I: Swords, title: 'IX. L’art de la guerre', tone: 'red',
    text: ['Un coup ne touche pas toujours : l’agilité décide. Quand il touche, c’est la force — et l’arme — qui parlent, et l’armure qui répond, la physique contre les lames, la magique contre les sorts.',
      'Une lance atteint deux pas plus loin qu’une épée ; un arc frappe de loin, mais sa puissance monte et retombe avec la distance. Et contre un cavalier juché sur sa monture, une lame courte ne fait que fendre l’air.',
      'Chaque coup porté enseigne quelque chose. On apprend plus en affrontant plus fort que soi, et presque rien en écrasant les faibles.'],
    game: 'Chance de toucher selon l’agilité, dégâts arme × force réduits par l’armure, portée des armes et courbe de puissance, hauteur (Pythagore), XP pondérée par l’écart de rang.' },
  { id: 'betes', I: Skull, title: 'X. Les Gardiens', tone: 'red',
    text: ['Les terres sauvages grouillent de créatures : loups, wargs, araignées, et pire. Certaines sont plus que des bêtes : ce sont des Gardiens. Le Balrog porte un Arcane ; abattez-le, et l’Arcane est à vous… mais des heures plus tard, il revient, avec un nouvel éclat, jusqu’à ce que tous les Arcanes du monde aient trouvé un porteur.',
      'Tuer une créature rapporte son butin, de l’or, et une leçon — d’autant plus grande que la bête était redoutable.'],
    game: 'Monstres posés avec réapparition propre, gardiens d’objets divins, butin et XP au tueur.' },
  { id: 'compagnons', I: PawPrint, title: 'XI. Compagnons', tone: 'green',
    text: ['Nul ne voyage seul longtemps. On apprivoise un destrier, un griffon, un serpent des mers ; on le monte pour aller plus vite, plus haut, plus loin, et il combat à vos côtés avec sa propre attaque.',
      'Les plus doués savent aussi invoquer : un sort, et une créature se lève, que l’on peut même diriger en personne, le temps de lui prêter sa volonté.'],
    game: 'Montures terrestres, aquatiques ou volantes (taille = hauteur), invocations par sort, prise de contrôle d’une invocation.' },
  { id: 'pactes', I: Handshake, title: 'XII. Les pactes et la foi', tone: 'blue',
    text: ['Les Hommes et les êtres éthérés ont besoin les uns des autres. Un pacte lie un Homme à un Ange ou à un Démon : chacun y gagne une part de la force de l’autre. L’Homme n’en scelle qu’un ; l’Ange et le Démon, d’autant plus que leur rang est haut.',
      'Et quand un être atteint le rang Divin, il cesse d’être un simple combattant : il devient un dieu. Des fidèles le rejoignent, et il choisit les bénédictions qu’il leur accorde.'],
    game: 'Pactes Humain ↔ Ange / Démon (1 pour un Humain, plusieurs selon le rang pour les éthérés) ; un Divin a des fidèles qu’il bénit.' },
  { id: 'divin', I: Gem, title: 'XIII. Les éclats de lumière', tone: 'gold',
    text: ['Ce que la Brisure a dispersé, chacun veut le rassembler. Reliques des Anges, Arcanes des Démons, Artefacts des Hommes : il n’en existe qu’un nombre fini, et chacun ouvre des Portes, éveille des pouvoirs, et attise toutes les convoitises.'],
    game: 'Objets divins en nombre limité par famille, portés, échangés ou gardés par des monstres ; ils ouvrent les portes entre les mondes.' },
  { id: 'guildes', I: Shield, title: 'XIV. Les confréries', tone: 'neutral',
    text: ['Les héros se regroupent en guildes, avec leurs rangs, leurs règles, leurs conseils secrets et leurs salles de discussion. Une guilde bien tenue vaut mieux qu’une armée désordonnée.'],
    game: 'Guildes avec rangs, permissions et forum interne.' },
  { id: 'croissance', I: TrendingUp, title: 'XV. Devenir plus que soi', tone: 'blue',
    text: ['Chaque leçon apprise se change en force : un peu plus de vie, de souffle, de vision, de vigueur. Mais plus on s’améliore, plus chaque progrès coûte cher.'],
    game: 'L’XP achète +1 dans une caractéristique, par paliers de coût croissants.' },
  { id: 'epilogue', I: Sparkles, title: 'Épilogue : votre chapitre', tone: 'gold',
    text: ['Le reste de l’histoire n’est pas encore écrit. Il le sera par vous, par vos alliances et vos trahisons, sur les champs de bataille comme sur la Place publique.',
      'Choisissez votre peuple. Et souvenez-vous : la lumière a été brisée une fois. Elle peut l’être encore.'] },
];
const ICON_BY_RACE = { human: User, angel: Feather, demon: Flame };
export default function Story() {
  return <article className="story">
    <header className="story-hero"><p className="story-kicker">Chronique d’Angemoniaque</p><h2>L’histoire des trois mondes</h2>
      <p>Tout ce qu’il faut savoir pour jouer, raconté comme on raconte une légende au coin du feu.</p>
      <div className="story-races">{Object.entries(ICON_BY_RACE).map(([k, I]) => <span key={k} className={`story-race r-${k}`}><I size={20} /></span>)}</div></header>
    <nav className="story-toc" aria-label="Chapitres">{CHAPTERS.map(c => <a key={c.id} href={`#histoire`} onClick={e => { e.preventDefault(); document.getElementById(`ch-${c.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{c.title}</a>)}</nav>
    {CHAPTERS.map(({ id, I, title, text, game, tone }) => <section key={id} id={`ch-${id}`} className={`story-ch t-${tone}`}>
      <div className="story-ico"><I size={22} /></div><div className="story-body"><h3>{title}</h3>{text.map((p, i) => <p key={i}>{p}</p>)}
        {game && <p className="story-game"><b>En jeu</b>{game}</p>}</div></section>)}
    <footer className="story-end"><a className="btnlike" href="#">Entrer dans le jeu</a><a className="btnlike" href="#forum">Annonces & forum</a></footer>
  </article>;
}
