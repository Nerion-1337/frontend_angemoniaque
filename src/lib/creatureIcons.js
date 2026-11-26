// Icônes de créatures (médaillon + initiales, voir components/CreatureIcon.jsx) : glyphes au trait 24×24 dessinés ici
// (`d` = tracés SVG) ou repris de lucide (`lucide`). L'admin en attribue une à chaque type de monstre (monsters.icon) ;
// sans choix : celle du design 3D, sinon selon le milieu.
const I = (key, label, d, lucide) => ({ key, label, d, lucide });
export const ICONS = [
  I('dragon', 'Dragon', ['M3 19c3-1 5-3 6-6', 'M9 13 5 5l6 4 2-5 2 6 5-3-2 7', 'M9 13c2 2 5 2 8 1', 'M14 14l2 5', 'M17 14l3 3']),
  I('wyvern', 'Wyverne', ['M2 12c4-1 7-4 8-8 1 3 3 5 6 5l6-2-3 5c-2 2-5 3-8 3', 'M11 15l-2 5', 'M14 15l1 5', 'M2 12l4 2']),
  I('serpent', 'Serpent', ['M4 20c3 0 4-3 6-3s3 3 6 3 4-3 4-6-2-5-5-5H9', 'M9 9c-2 0-4-1-4-3s2-3 4-3 4 1 4 3', 'M7 5h.01', 'M3 6h2']),
  I('eagle', 'Aigle / rapace', ['M2 9c3-1 6 0 8 2l2-3 2 3c2-2 5-3 8-2-2 2-4 4-7 5l-1 5-2-2-2 2-1-5C6 13 4 11 2 9z', 'M11 8l1-3 1 3']),
  I('phoenix', 'Phénix', ['M12 21c-3-2-4-5-3-8 1 1 2 1 3 0-1-3 0-6 3-9 0 3 2 4 2 7 1-1 2-1 3-1-1 4-3 8-8 11z', 'M12 13c-3 0-6-1-9-4 3 0 5 1 6 2']),
  I('raven', 'Corbeau', ['M3 14c2-4 6-6 10-6l3-3 1 3 4 1-4 2c0 4-3 7-7 7l-2 3v-4c-2 0-4-1-5-3z', 'M15 8h.01']),
  I('owl', 'Hibou', ['M6 4l2 3h8l2-3v10a6 6 0 0 1-12 0z', 'M10 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z', 'M17 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z', 'M12 12v2']),
  I('bat', 'Chauve-souris', ['M2 8c2 0 3 2 4 4 1-2 3-2 4-1l1-3 1 1 1-1 1 3c1-1 3-1 4 1 1-2 2-4 4-4-1 4-2 7-5 8-1-1-3-1-4 0l-1-1-1 1c-1-1-3-1-4 0-3-1-4-4-5-8z']),
  I('griffin', 'Griffon', ['M4 10l3-6 2 4h3l2 3 6 1-4 2v6h-2v-4h-5l-1 4H6v-6c-1-1-2-2-2-4z', 'M7 4 5 7']),
  I('horse', 'Cheval', ['M7 21l1-6-3-2 1-4 5-6 2 3c3 1 5 4 5 8v7', 'M13 9h.01', 'M9 6 7 3']),
  I('unicorn', 'Licorne', ['M7 21l1-6-3-2 1-4 5-6 2 3c3 1 5 4 5 8v7', 'M13 9h.01', 'M11 3 7 1']),
  I('wolf', 'Loup', ['M5 3l3 5h8l3-5 1 8-3 5-5 5-5-5-3-5z', 'M9 11h.01', 'M15 11h.01', 'M11 15h2']),
  I('bear', 'Ours', ['M6 7a2 2 0 1 1 2-3', 'M18 7a2 2 0 1 0-2-3', 'M5 12a7 7 0 0 1 14 0c0 5-3 8-7 8s-7-3-7-8z', 'M9 11h.01', 'M15 11h.01', 'M10 15c1 1 3 1 4 0']),
  I('boar', 'Sanglier', ['M3 14c0-4 4-7 9-7h3l2-2 1 3c2 1 3 3 3 5l1 2-3 1c-1 2-3 3-6 3H8l-1 3H5v-4c-1-1-2-2-2-4z', 'M18 15l1 3', 'M15 11h.01']),
  I('cat', 'Félin', [], 'Cat'),
  I('dog', 'Canidé', [], 'Dog'),
  I('bull', 'Taureau / Minotaure', ['M3 4c1 3 3 5 6 5h6c3 0 5-2 6-5', 'M8 9v5a4 4 0 0 0 8 0V9', 'M10 12h.01', 'M14 12h.01', 'M10 17h4']),
  I('cyclops', 'Cyclope', ['M5 9a7 7 0 0 1 14 0v4a7 7 0 0 1-14 0z', 'M9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0z', 'M12 10h.01', 'M9 17h6']),
  I('demon', 'Démon', ['M5 2l3 5h8l3-5', 'M6 9a6 6 0 0 0 12 0V7H6z', 'M9 10l2 1', 'M15 10l-2 1', 'M10 15h4', 'M8 20l4-2 4 2']),
  I('imp', 'Diablotin', ['M6 4l2 4h8l2-4', 'M7 10a5 5 0 0 0 10 0V8H7z', 'M10 11h.01', 'M14 11h.01', 'M12 15v2', 'M17 15c2 1 3 3 3 6']),
  I('troll', 'Troll / Ogre', ['M6 8a6 6 0 0 1 12 0v5a6 6 0 0 1-12 0z', 'M9 10h.01', 'M15 10h.01', 'M12 11l-1 3h2', 'M9 17l1-1 1 1 1-1 1 1 1-1', 'M3 8l3 1', 'M21 8l-3 1']),
  I('orc', 'Orc / Gobelin', ['M4 7l4 2', 'M20 7l-4 2', 'M8 7a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0z', 'M10 10h.01', 'M14 10h.01', 'M10 15v-1', 'M14 15v-1', 'M8 20h8']),
  I('giant', 'Géant', ['M9 2h6v5H9z', 'M5 8h14v7H5z', 'M8 15v7', 'M16 15v7', 'M5 8 2 14', 'M19 8l3 6']),
  I('golem', 'Golem', ['M8 2h8v5H8z', 'M4 8h16v8H4z', 'M7 16v6', 'M17 16v6', 'M10 4h.01', 'M14 4h.01', 'M10 11l2 2 2-2']),
  I('yeti', 'Yéti', ['M7 6a5 5 0 0 1 10 0v2l2 3-2 1v4c0 3-2 5-5 5s-5-2-5-5v-4l-2-1 2-3z', 'M10 9h.01', 'M14 9h.01', 'M10 13h4']),
  I('skull', 'Mort-vivant', [], 'Skull'),
  I('ghost', 'Spectre', [], 'Ghost'),
  I('harpy', 'Harpie', ['M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z', 'M12 9v6', 'M12 15l-3 6', 'M12 15l3 6', 'M10 11C7 9 4 9 2 11c3 0 5 1 6 3', 'M14 11c3-2 6-2 8 0-3 0-5 1-6 3']),
  I('sphinx', 'Sphinx', ['M8 4h8l1 5-1 4H8L7 9z', 'M10 8h.01', 'M14 8h.01', 'M8 13l-4 3v4h16v-4l-4-3', 'M5 20v-4']),
  I('cerberus', 'Cerbère', ['M3 9l2-4 2 3', 'M9 7l3-4 3 4', 'M17 8l2-3 2 4', 'M3 9c0 3 2 5 4 5', 'M9 7c0 4 1 7 3 7s3-3 3-7', 'M21 9c0 3-2 5-4 5', 'M6 14l2 7h8l2-7']),
  I('hydra', 'Hydre', ['M6 21c0-4 2-7 6-7s6 3 6 7', 'M9 15C7 12 5 9 4 5', 'M12 14V4', 'M15 15c2-3 4-6 5-10', 'M3 5h2', 'M11 4h2', 'M19 5h2']),
  I('lizard', 'Lézard / Basilic', ['M12 3c1 0 2 1 2 3v3l3-1 1 2-4 2v4l3 2-1 2-3-2c0 3-1 5-1 7', 'M12 3c-1 0-2 1-2 3v3L7 8 6 10l4 2v4l-3 2 1 2 3-2']),
  I('toad', 'Crapaud', ['M7 8a2 2 0 1 1 3-1', 'M17 8a2 2 0 1 0-3-1', 'M4 15c0-4 4-7 8-7s8 3 8 7c0 2-2 4-4 4H8c-2 0-4-2-4-4z', 'M9 14c2 1 4 1 6 0', 'M5 19l-2 2', 'M19 19l2 2']),
  I('rhino', 'Rhinocéros', ['M2 13l3-4 1-3 2 3h7c3 0 6 2 6 5v3h-3v3h-2v-3H9v3H7v-3l-3-1z', 'M5 9 4 5', 'M8 11h.01']),
  I('mammoth', 'Mammouth', ['M18 12c0-4-3-7-7-7S4 8 4 12v8h3v-4h6v4h3v-6c2 1 3 3 3 6h2c0-3-1-6-3-8z', 'M18 13c1 1 1 3 0 5', 'M8 9h.01']),
  I('beast', 'Bête cornue', ['M4 4c0 3 2 5 4 5', 'M20 4c0 3-2 5-4 5', 'M6 9h12l1 5-3 6H8l-3-6z', 'M10 13h.01', 'M14 13h.01']),
  I('chimera', 'Chimère', ['M3 12c0-3 3-6 7-6 2-2 5-2 6 0l3-2v4c1 1 2 3 2 5h-4l-1 5h-2v-4H9v4H7v-4l-3-1z', 'M19 8l2 1', 'M8 10h.01']),
  I('spider', 'Araignée', ['M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z', 'M12 15a3 3 0 0 1 0 6', 'M9 11 4 7 2 8', 'M15 11l5-4 2 1', 'M9 13H3', 'M15 13h6', 'M9 15l-4 4', 'M15 15l4 4']),
  I('scorpion', 'Scorpion', ['M5 17h10', 'M7 17l-2 3', 'M10 17l-1 3', 'M13 17l1 3', 'M15 17c3 0 5-3 5-6s-2-5-4-5l-2 2 2 1', 'M5 17c-2 0-3-2-2-4l2-1 1 2', 'M3 9l2 3']),
  I('beetle', 'Scarabée', [], 'Bug'),
  I('ant', 'Fourmi', ['M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M12 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4z', 'M12 13a3 4 0 1 1 0 8 3 4 0 0 1 0-8z', 'M10 4 7 2', 'M14 4l3-2', 'M10 10 6 9', 'M14 10l4-1', 'M10 12l-4 3', 'M14 12l4 3']),
  I('wasp', 'Guêpe', ['M12 8a3 5 0 1 1 0 10 3 5 0 0 1 0-10z', 'M9 12h6', 'M9 15h6', 'M12 18v3', 'M10 9C7 5 3 5 3 8s4 3 7 3', 'M14 9c3-4 7-4 7-1s-4 3-7 3', 'M11 6l-1-3', 'M13 6l1-3']),
  I('dragonfly', 'Libellule', ['M12 3v18', 'M12 7C8 5 3 5 3 7s5 3 9 2', 'M12 7c4-2 9-2 9 0s-5 3-9 2', 'M12 11c-4-1-8 0-8 2s4 1 8-1', 'M12 11c4-1 8 0 8 2s-4 1-8-1']),
  I('rooster', 'Coq / Cocatrix', ['M8 6l1-3 1 2 1-2 1 3', 'M8 6c-2 0-3 2-3 4l-2 1 2 1c0 4 3 7 7 7l1 3', 'M12 19c4 0 7-3 7-8 0-2-1-3-2-4l2-3-4 2', 'M8 9h.01']),
  I('tree', 'Tréant', [], 'TreePine'),
  I('mountain', 'Élémentaire', [], 'Mountain'),
  I('kraken', 'Kraken / Calmar', ['M12 2a5 5 0 0 1 5 5c0 2-1 3-1 4l3 6', 'M12 2a5 5 0 0 0-5 5c0 2 1 3 1 4l-3 6', 'M10 11c0 3-1 6-3 9', 'M14 11c0 3 1 6 3 9', 'M12 12v9', 'M10 7h.01', 'M14 7h.01']),
  I('shark', 'Requin', ['M2 14c4-4 10-5 16-3l4-3-1 5 1 4-4-2c-5 2-11 2-16-1z', 'M10 10l2-5 2 5', 'M5 14h.01']),
  I('whale', 'Cétacé', ['M2 12c0-3 4-5 9-5 4 0 7 2 8 5l3-2v6l-3-1c-1 3-4 5-8 5-5 0-9-3-9-8z', 'M6 11h.01', 'M4 15c3 1 7 1 10 0']),
  I('jelly', 'Méduse', ['M4 11a8 7 0 0 1 16 0z', 'M7 11c0 3 1 6-1 9', 'M10 11v9', 'M14 11v9', 'M17 11c0 3-1 6 1 9']),
  I('crab', 'Crabe', ['M5 9a3 3 0 0 1 3-4l-1 3', 'M19 9a3 3 0 0 0-3-4l1 3', 'M6 13c0-2 3-4 6-4s6 2 6 4-3 4-6 4-6-2-6-4z', 'M4 16l3-1', 'M20 16l-3-1', 'M5 20l3-3', 'M19 20l-3-3']),
  I('eel', 'Anguille', ['M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0l2-1', 'M2 12l2 1', 'M10 9l1-3', 'M15 7l2-2']),
  I('seahorse', 'Hippocampe', ['M14 3c-3 0-5 2-5 4l-4 1 4 1c0 2 1 3 3 4-2 2-3 4-2 6 1 2 4 2 4 0s-2-2-2-1', 'M12 13c3-1 5-3 5-6 0-2-1-4-3-4', 'M12 6h.01']),
  I('turtle', 'Tortue', [], 'Turtle'),
  I('ray', 'Raie', ['M12 4c3 3 7 5 10 6-3 1-6 3-8 6l-2 2-2-2c-2-3-5-5-8-6 3-1 7-3 10-6z', 'M12 18v4']),
  I('fish', 'Poisson', [], 'Fish'),
  I('rabbit', 'Petit animal', [], 'Rabbit'),
  I('snail', 'Mollusque', [], 'Snail'),
  I('worm', 'Ver', [], 'Worm'),
  I('flame', 'Feu', [], 'Flame'),
  I('snowflake', 'Glace', [], 'Snowflake'),
  I('paw', 'Bête', [], 'PawPrint'),
];
export const ICON = Object.fromEntries(ICONS.map(i => [i.key, i]));
/** Initiales d'un nom : « Griffon royal » → « GR », « Balrog » → « BA », sans articles (« Le Kraken des abysses » → « KA »). */
export function initials(name) {
  const w = String(name ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^A-Za-z0-9]+/).filter(x => x && !/^(le|la|les|l|du|de|des|d|of|the)$/i.test(x));
  if (!w.length) return '?';
  return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2)).toUpperCase();
}
/** Icône d'une créature : clé choisie, sinon celle du design, sinon selon le milieu. */
export const iconKey = (icon, design, hab) => (icon && ICON[icon] ? icon : design?.icon && ICON[design.icon] ? design.icon : hab === 'air' ? 'eagle' : hab === 'water' ? 'fish' : 'paw');
