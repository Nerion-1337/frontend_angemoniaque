// Catalogue des designs 3D de créatures (données pures ; le rendu est dans three/creatures.js) : 30 aériens, 40 terrestres,
// 15 aquatiques. Chaque design = plan de corps (`plan`) + paramètres (`p`) + couleurs [principale, secondaire, accent lumineux].
// L'admin associe un design (monsters.model) et une icône (monsters.icon) à chaque type de monstre ; sans choix : design
// retrouvé par le nom, sinon tiré du nom parmi ceux de son milieu (air / eau / terre).
const C = (key, name, hab, plan, c, p = {}, icon) => ({ key, name, hab, plan, c, p, icon });
export const CREATURES = [
  // ---- Aériens (30)
  C('dragon_rouge', 'Dragon rouge', 'air', 'quad', [0x8a1a12, 0xd9a05a, 0xff7a1a], { len: 1.5, leg: 0.5, neck: 0.75, snout: 0.32, horns: 'curved', wings: 'bat', tail: 'long', spikes: 9, scale: 1.25, fire: true }, 'dragon'),
  C('dragon_noir', 'Dragon des ombres', 'air', 'quad', [0x1c1820, 0x4a3a5a, 0xa050ff], { len: 1.6, leg: 0.5, neck: 0.8, snout: 0.34, horns: 'straight', wings: 'bat', tail: 'long', spikes: 11, scale: 1.3 }, 'dragon'),
  C('dragon_givre', 'Dragon de givre', 'air', 'quad', [0xa9d8ee, 0xeaf6ff, 0x6fd8ff], { len: 1.5, leg: 0.5, neck: 0.8, snout: 0.3, horns: 'ram', wings: 'bat', tail: 'long', spikes: 13, scale: 1.25, crystals: true }, 'dragon'),
  C('dragon_jade', 'Dragon de jade', 'air', 'quad', [0x2f7a4a, 0xc9e0a0, 0x9cff8a], { len: 1.4, leg: 0.45, neck: 0.7, snout: 0.3, horns: 'antlers', wings: 'bat', tail: 'long', spikes: 7, scale: 1.15, whiskers: true }, 'dragon'),
  C('dragon_or', 'Dragon d’or', 'air', 'quad', [0xc99a2a, 0xf4e0a0, 0xffe070], { len: 1.5, leg: 0.5, neck: 0.75, snout: 0.32, horns: 'curved', wings: 'bat', tail: 'long', spikes: 9, scale: 1.3, metal: true }, 'dragon'),
  C('dragon_sable', 'Dragon des sables', 'air', 'quad', [0xb88a4a, 0xe8d0a0, 0xffb040], { len: 1.6, leg: 0.45, neck: 0.6, snout: 0.3, horns: 'rhino', wings: 'bat', tail: 'long', spikes: 5, scale: 1.2, frill: true }, 'dragon'),
  C('dragon_spectral', 'Dragon spectral', 'air', 'quad', [0x6aa8ff, 0xcfe8ff, 0x8fd0ff], { len: 1.5, leg: 0.5, neck: 0.8, snout: 0.32, horns: 'straight', wings: 'bat', tail: 'long', spikes: 9, scale: 1.25, ghost: true }, 'ghost'),
  C('wyverne', 'Wyverne', 'air', 'quad', [0x4a5a2a, 0xa0a060, 0xd0ff40], { len: 1.3, leg: 0.5, neck: 0.6, snout: 0.3, horns: 'straight', wings: 'bat', wyvern: true, tail: 'stinger', spikes: 6, scale: 1.05 }, 'dragon'),
  C('vouivre', 'Vouivre', 'air', 'serpent', [0x2a5a4a, 0xb0d0a0, 0x60ffd0], { len: 2.4, r: 0.11, wings: 'bat', horns: 'straight', gem: true, float: true }, 'serpent'),
  C('quetzal', 'Serpent à plumes', 'air', 'serpent', [0x1f8a5a, 0xe8c040, 0xff4a8a], { len: 2.6, r: 0.1, wings: 'feather', crest: true, float: true }, 'serpent'),
  C('griffon', 'Griffon', 'air', 'quad', [0xb07a3a, 0xf0e8d8, 0xffd060], { len: 1.1, leg: 0.5, neck: 0.3, beak: true, wings: 'feather', tail: 'tuft', ears: 'pointy', scale: 1.05, frontTalons: true }, 'griffin'),
  C('hippogriffe', 'Hippogriffe', 'air', 'quad', [0x8a8a92, 0xeeeeee, 0xffe8a0], { len: 1.2, leg: 0.62, neck: 0.35, beak: true, wings: 'feather', tail: 'horse', hooves: true, scale: 1.05, frontTalons: true }, 'griffin'),
  C('pegase', 'Pégase', 'air', 'quad', [0xf2f2f6, 0xd8e0ff, 0xcfe0ff], { len: 1.2, leg: 0.68, neck: 0.55, snout: 0.3, horse: true, wings: 'feather', tail: 'horse', mane: true, hooves: true }, 'horse'),
  C('manticore', 'Manticore', 'air', 'quad', [0xa05a2a, 0x6a2a1a, 0xff5030], { len: 1.2, leg: 0.5, neck: 0.25, snout: 0.16, mane: true, wings: 'bat', tail: 'stinger', ears: 'round', scale: 1.1 }, 'scorpion'),
  C('gargouille', 'Gargouille', 'air', 'biped', [0x6a6a72, 0x4a4a52, 0x80d0ff], { h: 1.0, bulk: 1.1, head: 'beast', horns: 'curved', wings: 'bat', hunch: 0.45, style: 'rock', tail: true, digi: true }, 'bat'),
  C('phenix', 'Phénix', 'air', 'bird', [0xff6a1a, 0xffd040, 0xffa020], { size: 1.1, tailLong: true, crest: true, fire: true }, 'phoenix'),
  C('roc', 'Roc', 'air', 'bird', [0x5a3a22, 0xe8dcc8, 0xffd080], { size: 1.6, hooked: true }, 'eagle'),
  C('aigle_tempete', 'Aigle-tempête', 'air', 'bird', [0x3a4a6a, 0xdde6f0, 0x80c8ff], { size: 1.2, hooked: true, glow: true }, 'eagle'),
  C('oiseau_tonnerre', 'Oiseau-tonnerre', 'air', 'bird', [0x22304a, 0xe0b040, 0xffee60], { size: 1.4, hooked: true, crest: true, glow: true }, 'eagle'),
  C('corbeau_ombre', 'Corbeau des ombres', 'air', 'bird', [0x15131c, 0x2a2836, 0x9a60ff], { size: 0.9, glow: true }, 'raven'),
  C('hibou_titan', 'Hibou-titan', 'air', 'bird', [0x7a6048, 0xd8c8a8, 0xffc040], { size: 1.0, owl: true }, 'owl'),
  C('harpie', 'Harpie', 'air', 'biped', [0x8a6a5a, 0xd8b8a0, 0xffd080], { h: 0.8, bulk: 0.7, head: 'human', hair: true, wings: 'feather', digi: true, talons: true }, 'harpy'),
  C('chauve_souris', 'Chauve-souris géante', 'air', 'bird', [0x3a2a2a, 0x5a4040, 0xff4040], { size: 1.0, bat: true }, 'bat'),
  C('strige', 'Strige', 'air', 'bird', [0x4a1a2a, 0x8a3a4a, 0xff2050], { size: 0.8, bat: true, longBeak: true }, 'bat'),
  C('cocatrix', 'Cocatrix', 'air', 'bird', [0xd8c040, 0x8a2a1a, 0xff3020], { size: 0.85, comb: true, snakeTail: true }, 'rooster'),
  C('guepe_geante', 'Guêpe géante', 'air', 'bug', [0xe8b020, 0x1a1408, 0xffd040], { legs: 6, wings: 2, stinger: true, stripes: true, size: 0.9, fly: true }, 'wasp'),
  C('libellule', 'Libellule géante', 'air', 'bug', [0x2a8ab0, 0x60e0d0, 0x80ffff], { legs: 6, wings: 4, longAbdomen: true, size: 1.0, fly: true }, 'dragonfly'),
  C('diablotin', 'Diablotin ailé', 'air', 'biped', [0xa02a1a, 0x3a0a0a, 0xff6020], { h: 0.6, bulk: 0.7, head: 'beast', horns: 'straight', wings: 'bat', tail: true, digi: true }, 'imp'),
  C('sphinx', 'Sphinx', 'air', 'quad', [0xd8b070, 0x3a5aa0, 0xffd060], { len: 1.2, leg: 0.5, neck: 0.25, humanHead: true, wings: 'feather', tail: 'tuft', scale: 1.1, headdress: true }, 'sphinx'),
  C('wyrm_ether', 'Wyrm d’éther', 'air', 'serpent', [0x6a3aa0, 0xd0a0ff, 0xc070ff], { len: 2.8, r: 0.12, horns: 'curved', float: true, ghost: true, fins: true }, 'serpent'),
  // ---- Terrestres (40)
  C('balrog', 'Balrog', 'land', 'biped', [0x2a0e08, 0x5a1a0a, 0xff5a10], { h: 2.0, bulk: 1.5, head: 'beast', horns: 'ram', wings: 'bat', style: 'lava', tail: true, digi: true, weapon: 'whip', fire: true }, 'demon'),
  C('cyclope', 'Cyclope', 'land', 'biped', [0xb08a6a, 0x5a3a22, 0xffd080], { h: 1.8, bulk: 1.4, head: 'cyclops', weapon: 'club', loincloth: true }, 'cyclops'),
  C('minotaure', 'Minotaure', 'land', 'biped', [0x5a3a24, 0x2a1a10, 0xff6040], { h: 1.5, bulk: 1.35, head: 'bull', horns: 'bull', weapon: 'axe', digi: true, hooves: true, loincloth: true }, 'bull'),
  C('troll', 'Troll des cavernes', 'land', 'biped', [0x5a7a4a, 0x3a4a2a, 0xffe060], { h: 1.6, bulk: 1.2, head: 'troll', hunch: 0.5, longArms: true, weapon: 'club' }, 'troll'),
  C('ogre', 'Ogre', 'land', 'biped', [0xb09060, 0x6a4a2a, 0xff9040], { h: 1.5, bulk: 1.6, head: 'troll', belly: true, weapon: 'club', loincloth: true }, 'troll'),
  C('golem_pierre', 'Golem de pierre', 'land', 'biped', [0x7a7470, 0x5a5450, 0x60e0ff], { h: 1.5, bulk: 1.5, head: 'rock', style: 'rock', longArms: true }, 'golem'),
  C('golem_lave', 'Golem de lave', 'land', 'biped', [0x2a1a14, 0x4a2a1a, 0xff5010], { h: 1.6, bulk: 1.5, head: 'rock', style: 'lava', longArms: true, fire: true }, 'golem'),
  C('geant_givre', 'Géant du givre', 'land', 'biped', [0x9ab8d0, 0xe8f4ff, 0x80e0ff], { h: 2.0, bulk: 1.4, head: 'human', beard: true, style: 'ice', weapon: 'axe' }, 'giant'),
  C('yeti', 'Yéti', 'land', 'biped', [0xe8eef4, 0x9aa8b8, 0x80c8ff], { h: 1.4, bulk: 1.5, head: 'ape', style: 'fur', longArms: true, hunch: 0.3 }, 'yeti'),
  C('loup_garou', 'Loup-garou', 'land', 'biped', [0x4a3c30, 0x2a2018, 0xffd040], { h: 1.4, bulk: 1.1, head: 'wolf', style: 'fur', digi: true, hunch: 0.35, claws: true, tail: true }, 'wolf'),
  C('orc', 'Orc', 'land', 'biped', [0x4a6a2a, 0x3a2a1a, 0xff4020], { h: 1.05, bulk: 1.1, head: 'orc', weapon: 'axe', armor: true }, 'orc'),
  C('gobelin', 'Gobelin', 'land', 'biped', [0x6a8a3a, 0x5a3a2a, 0xffe040], { h: 0.6, bulk: 0.7, head: 'goblin', weapon: 'dagger', hunch: 0.2 }, 'orc'),
  C('liche', 'Liche', 'land', 'biped', [0xd8d0b8, 0x3a1a4a, 0x70ff90], { h: 1.1, bulk: 0.7, head: 'skull', style: 'bone', robe: true, weapon: 'staff', crown: true }, 'skull'),
  C('squelette', 'Squelette guerrier', 'land', 'biped', [0xe0d8c0, 0x5a5048, 0x60c0ff], { h: 1.0, bulk: 0.7, head: 'skull', style: 'bone', weapon: 'sword', shield: true }, 'skull'),
  C('treant', 'Tréant', 'land', 'tree', [0x5a4028, 0x3f7a2a, 0xc0ff60], { h: 1.9 }, 'tree'),
  C('elementaire_terre', 'Élémentaire de terre', 'land', 'elemental', [0x7a5a3a, 0x5a8a3a, 0xffc040], { size: 1.2, kind: 'earth' }, 'mountain'),
  C('loup', 'Loup gris', 'land', 'quad', [0x6a6660, 0xd8d0c4, 0xffd040], { len: 0.95, leg: 0.48, neck: 0.25, snout: 0.22, ears: 'pointy', tail: 'bushy', fur: true }, 'wolf'),
  C('warg', 'Warg', 'land', 'quad', [0x2a2420, 0x6a5a4a, 0xff4020], { len: 1.15, leg: 0.55, neck: 0.25, snout: 0.24, ears: 'pointy', tail: 'bushy', fur: true, scale: 1.2, spikes: 5 }, 'wolf'),
  C('ours', 'Ours des montagnes', 'land', 'quad', [0x4a3020, 0x6a4a30, 0xffc060], { len: 1.1, leg: 0.42, girth: 1.4, neck: 0.15, snout: 0.16, ears: 'round', tail: 'none', fur: true, scale: 1.2, hump: true }, 'bear'),
  C('sanglier', 'Sanglier géant', 'land', 'quad', [0x3a2a20, 0x5a4434, 0xffe0a0], { len: 1.0, leg: 0.32, girth: 1.2, neck: 0.08, snout: 0.2, ears: 'pointy', tail: 'thin', tusks: true, fur: true, spikes: 6 }, 'boar'),
  C('cerbere', 'Cerbère', 'land', 'quad', [0x2a1a18, 0x5a2a20, 0xff5020], { len: 1.25, leg: 0.55, neck: 0.3, snout: 0.22, ears: 'pointy', tail: 'snake', heads: 3, scale: 1.3, fire: true }, 'cerberus'),
  C('hydre', 'Hydre', 'land', 'quad', [0x2a5a3a, 0x9ab870, 0x80ff60], { len: 1.4, leg: 0.4, girth: 1.3, neck: 0.9, snout: 0.22, heads: 5, tail: 'long', spikes: 6, scale: 1.3 }, 'hydra'),
  C('basilic', 'Basilic', 'land', 'quad', [0x4a6a2a, 0xd0c060, 0xffff40], { len: 1.4, leg: 0.28, neck: 0.25, snout: 0.25, tail: 'long', crest: true, sprawl: true, spikes: 10 }, 'lizard'),
  C('salamandre', 'Salamandre de feu', 'land', 'quad', [0x2a1a12, 0xff6010, 0xff8020], { len: 1.2, leg: 0.24, neck: 0.15, snout: 0.22, tail: 'long', sprawl: true, fire: true, spots: true }, 'lizard'),
  C('varan', 'Varan géant', 'land', 'quad', [0x5a5a3a, 0x8a8a5a, 0xffe060], { len: 1.5, leg: 0.26, neck: 0.3, snout: 0.3, tail: 'long', sprawl: true }, 'lizard'),
  C('behemoth', 'Béhémoth', 'land', 'quad', [0x4a3a3a, 0x7a6050, 0xff7040], { len: 1.7, leg: 0.55, girth: 1.6, neck: 0.15, snout: 0.2, horns: 'ram', tail: 'club', plates: true, scale: 1.5 }, 'beast'),
  C('rhino_cuirasse', 'Rhinocéros cuirassé', 'land', 'quad', [0x6a6a6a, 0x8a8a8a, 0xffd080], { len: 1.4, leg: 0.42, girth: 1.4, neck: 0.1, snout: 0.25, horns: 'rhino', ears: 'round', tail: 'thin', plates: true, scale: 1.2 }, 'rhino'),
  C('mammouth', 'Mammouth', 'land', 'quad', [0x5a3a24, 0x7a5434, 0xffe0a0], { len: 1.4, leg: 0.6, girth: 1.6, neck: 0.1, trunk: true, tusks: 'big', ears: 'round', fur: true, hump: true, scale: 1.45, tail: 'thin' }, 'mammoth'),
  C('tigre_sabre', 'Tigre à dents de sabre', 'land', 'quad', [0xc87a2a, 0xf0e0c8, 0xffd040], { len: 1.15, leg: 0.48, neck: 0.2, snout: 0.15, ears: 'round', tail: 'long', sabers: true, stripes: true }, 'cat'),
  C('lion_sables', 'Lion des sables', 'land', 'quad', [0xc8a060, 0x7a4a20, 0xffe080], { len: 1.15, leg: 0.5, neck: 0.2, snout: 0.15, ears: 'round', tail: 'tuft', mane: true }, 'cat'),
  C('hyene', 'Hyène des cendres', 'land', 'quad', [0x7a6a58, 0x3a3028, 0xffa040], { len: 1.0, leg: 0.5, neck: 0.25, snout: 0.2, ears: 'round', tail: 'bushy', slope: true, spots: true, mane: 'ridge' }, 'dog'),
  C('destrier', 'Destrier', 'land', 'quad', [0x5a3a24, 0x1a120c, 0xffe0a0], { len: 1.2, leg: 0.7, neck: 0.55, snout: 0.3, horse: true, tail: 'horse', mane: true, hooves: true }, 'horse'),
  C('licorne', 'Licorne', 'land', 'quad', [0xf6f4fa, 0xe0d0ff, 0xf0d0ff], { len: 1.2, leg: 0.7, neck: 0.55, snout: 0.3, horse: true, horns: 'unicorn', tail: 'horse', mane: true, hooves: true, glow: true }, 'unicorn'),
  C('araignee', 'Araignée géante', 'land', 'bug', [0x2a2420, 0x6a2a1a, 0xff3030], { legs: 8, size: 1.1, spider: true, hairy: true }, 'spider'),
  C('scorpion', 'Scorpion géant', 'land', 'bug', [0x3a2a1a, 0x8a5a2a, 0xffb040], { legs: 8, size: 1.1, pincers: true, stinger: true }, 'scorpion'),
  C('scarabee', 'Scarabée géant', 'land', 'bug', [0x1a3a4a, 0x40a0a0, 0x60ffe0], { legs: 6, size: 0.9, shell: true, horn: true, metal: true }, 'beetle'),
  C('fourmi', 'Fourmi géante', 'land', 'bug', [0x5a1a12, 0x2a0a08, 0xffa040], { legs: 6, size: 0.8, ant: true, mandibles: true }, 'ant'),
  C('crapaud', 'Crapaud géant', 'land', 'quad', [0x5a6a2a, 0xc8c080, 0xffe040], { len: 0.9, leg: 0.2, girth: 1.5, neck: 0, snout: 0.12, tail: 'none', toad: true, spots: true }, 'toad'),
  C('tortue_dragon', 'Tortue-dragon', 'land', 'turtle', [0x4a5a3a, 0x6a4a2a, 0xffa040], { size: 1.3, spikes: true, legs: true }, 'turtle'),
  C('chimere', 'Chimère', 'land', 'quad', [0xb07a3a, 0x5a3a20, 0xff6020], { len: 1.25, leg: 0.5, neck: 0.25, snout: 0.16, mane: true, horns: 'ram', tail: 'snake', ears: 'round', scale: 1.15, fire: true }, 'chimera'),
  // ---- Aquatiques (15)
  C('leviathan', 'Léviathan', 'water', 'serpent', [0x1d5878, 0x8ad0e0, 0x2bd0ff], { len: 3.6, r: 0.22, fins: true, horns: 'straight', scale: 1.4 }, 'serpent'),
  C('kraken', 'Kraken', 'water', 'cephalo', [0x7a2a3a, 0xd08a8a, 0xffd040], { size: 1.6, arms: 8, longArms: true }, 'kraken'),
  C('serpent_mer', 'Serpent de mer', 'water', 'serpent', [0x2a6a5a, 0xd0e8c0, 0x60ffd0], { len: 3.0, r: 0.15, fins: true, frill: true }, 'serpent'),
  C('requin', 'Requin des abysses', 'water', 'fish', [0x4a5a6a, 0xe8eef2, 0xff4040], { len: 1.6, shark: true }, 'shark'),
  C('orque', 'Orque', 'water', 'fish', [0x111418, 0xf2f2f2, 0x80c8ff], { len: 1.7, orca: true }, 'whale'),
  C('meduse', 'Méduse géante', 'water', 'jelly', [0x9a70ff, 0xffa0e0, 0xc090ff], { size: 1.0 }, 'jelly'),
  C('crabe', 'Crabe géant', 'water', 'bug', [0xb03a1a, 0xf0a060, 0xffd040], { legs: 8, size: 1.0, crab: true, pincers: true }, 'crab'),
  C('anguille', 'Anguille électrique', 'water', 'serpent', [0x2a3a4a, 0xc0d060, 0x60e0ff], { len: 2.2, r: 0.07, glow: true, fins: true }, 'eel'),
  C('hippocampe', 'Hippocampe géant', 'water', 'seahorse', [0xe0a040, 0xf8e0a0, 0xffd060], { size: 1.0 }, 'seahorse'),
  C('tortue_mer', 'Tortue de mer', 'water', 'turtle', [0x3a6a4a, 0x8a7a4a, 0x80ffd0], { size: 1.1, flippers: true }, 'turtle'),
  C('raie_manta', 'Raie manta', 'water', 'ray', [0x1a2430, 0xf0f4f8, 0x80e0ff], { size: 1.3 }, 'ray'),
  C('calmar', 'Calmar géant', 'water', 'cephalo', [0xd06a4a, 0xf0c0a0, 0x60e0ff], { size: 1.3, arms: 10, squid: true }, 'kraken'),
  C('baudroie', 'Poisson-lanterne', 'water', 'fish', [0x2a2430, 0x5a4a5a, 0x80ffe0], { len: 1.0, angler: true }, 'fish'),
  C('dragon_mer', 'Dragon des mers', 'water', 'serpent', [0x1a4a6a, 0x60c0c0, 0x40ffe0], { len: 3.0, r: 0.16, horns: 'curved', fins: true, frill: true, whiskers: true, scale: 1.2 }, 'dragon'),
  C('narval', 'Narval', 'water', 'fish', [0x8a98a8, 0xe8ecf0, 0xe0f0ff], { len: 1.5, narwhal: true }, 'whale'),
];
export const CREATURE = Object.fromEntries(CREATURES.map(c => [c.key, c]));
export const HABITATS = [['air', 'Aériens'], ['land', 'Terrestres'], ['water', 'Aquatiques']];
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['geant', 'geante', 'grand', 'grande', 'royal', 'royale', 'ancien', 'sombre', 'ombres', 'abysses', 'sables', 'cendres', 'montagnes', 'cavernes', 'guerrier', 'ailee', 'aile', 'feu', 'mers', 'givre', 'jade']);
const hashName = n => [...String(n ?? '')].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
/** Milieu d'une créature d'après son déplacement (monsters.locomotion) ou son drapeau volant. */
export const habitatOf = (loco, flying) => { const l = loco ?? []; return flying || l.includes('air') ? 'air' : l.length && l.every(x => x === 'water') ? 'water' : 'land'; };
/** Design d'une créature : clé choisie en admin, sinon nom reconnu (« Balrog », « Kraken des abysses »…), sinon tiré du nom dans son milieu. */
export function designFor({ model, name, loco, flying } = {}) {
  if (model && CREATURE[model]) return CREATURE[model];
  const n = norm(name);
  if (n) { const hit = CREATURES.find(c => norm(c.name) === n) ?? CREATURES.find(c => n.split(' ').some(w => w.length > 3 && !STOP.has(w) && norm(c.name).split(' ').includes(w)));
    if (hit) return hit; }
  const hab = habitatOf(loco, flying), pool = CREATURES.filter(c => c.hab === hab);
  return pool[hashName(name) % pool.length];
}
