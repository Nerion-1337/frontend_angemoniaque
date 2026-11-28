/** Descripteurs de champs par type d'entité (panneaux d'admin) : [colonne, libellé, type?] (type: number|check|json). */
export const FIELDS = {
  monster: [
    ['name', 'Nom'], ['hp_max', 'PV max', 'number'], ['hp_current', 'PV', 'number'], ['recovery', 'Régén/h', 'number'],
    ['energy_max', 'Énergie max', 'number'], ['strength', 'Force', 'number'], ['agility', 'Agilité', 'number'],
    ['armor', 'Armure', 'number'], ['magic_armor', 'Armure magique', 'number'], ['range', 'Portée d\'attaque (cases)', 'number'], ['see', 'Portée de vue', 'number'],
    ['rank', 'Rang (écart de rang avec le joueur : bonus / malus d\'XP)', 'number'], ['xp_reward', 'XP donnée au tueur (une fois)', 'number'], ['xp_hit', 'XP gagnée par le joueur à chaque coup porté (touché)', 'number'], ['gold_current', 'Or', 'number'],
    ['rarity', 'Rareté', 'rarity'], ['locomotion', 'Déplacement', 'loco'],
    ['mountable', 'Montable : invoqué, son propriétaire peut monter dessus', 'check'],
    ['size', 'Taille (1 à 3 : +1 vue / portée par niveau pour son cavalier, s\'il est terrestre ou aquatique ; volant : +6)', 'number'],
    ['resummon_delay_h', 'Délai avant de relancer son sort d\'invocation après sa mort (heures, décimales permises ; 0 = aucun)', 'number'],
    ['model', 'Design 3D', 'look'], ['icon', 'Icône', 'look'],
    ['data', 'Comportement (JSON : {"behavior":"...","loot":[...]})', 'json']
  ],
  item: [
    ['name', 'Nom'], ['slot', 'Slot'], ['rarity', 'Rareté'], ['quantity_max', 'Quantité max', 'number'],
    ['price', 'Prix', 'number'], ['durability', 'Durabilité', 'number'],
    ['armor', 'Armure', 'number'], ['magic_armor', 'Armure magique', 'number'],
    ['strength_bonus', 'Bonus Force', 'number'], ['agility_bonus', 'Bonus Agilité', 'number'],
    ['req_strength', 'Force requise', 'number'], ['weapon_damage', 'Attaque (multiplicateur)', 'number'],
    ['data', 'Effets / effets spéciaux (JSON : {"buffs":[...],"trigger":"...","effects":{}})', 'json']
  ],
  building: [
    ['name', 'Nom'], ['kind', 'Type (wall/tower/factory/totem/...)'], ['invulnerable', 'Invulnérable', 'check'],
    ['structure', 'Points de vie (structure)', 'number'], ['xp_hit', 'XP gagnée par le joueur à chaque coup porté (structure non invulnérable)', 'number'], ['armor', 'Armure de la structure', 'number'], ['size', 'Taille (cases)', 'number'],
    ['occupiable', 'Case occupable (un personnage peut s\'y tenir)', 'check'],
    ['bonus_armor', 'Bonus armure (occupant)', 'number'], ['bonus_magic_armor', 'Bonus armure magique (occupant)', 'number'], ['bonus_see', 'Bonus vue (occupant)', 'number'], ['bonus_range', 'Bonus portée à distance (occupant ; armes à distance seulement)', 'number'],
    ['peace_radius', 'Zone de paix (cases autour ; 0 = aucune) : personne ne peut y attaquer ni y être attaqué — corps à corps, distance, sort, monstre', 'number'],
    ['nobuild_radius', 'Zone sans construction (cases autour ; 0 = aucune)', 'number'],
    ['realm', 'Porte : monde de la porte', 'opts', [['', '— (pas une porte des mondes)'], ['human', 'Hommes'], ['demon', 'Démons'], ['angel', 'Anges'], ['dead', 'Royaume des Morts (ramène chez soi)']]],
    ['leads_to', 'Porte : mène vers le monde des', 'opts', [['', '—'], ['human', 'Hommes'], ['demon', 'Démons'], ['angel', 'Anges']]],
    ['open_h_per_item', 'Porte : heures d\'ouverture par objet divin (arcane / artefact / relique) utilisé pour l\'activer', 'number'],
    ['prerequisites', 'Prérequis (JSON : {"rank":3,"building":2})', 'json'],
    ['data', 'Passifs/collecte/production (JSON : {"passive":{"defense":5},"production":{"lorien":2},"storage":{"lorien":50}})', 'json']
  ],
  rank: [
    ['name', 'Nom du rang'], ['current_rank', 'Palier (niveau)', 'number'],
    ['max_population_percent', 'Cap population %', 'number'], ['gain_xp_hour', 'XP/h', 'number'],
    ['hp_max', 'PV max', 'number'], ['recovery', 'Régén/h', 'number'], ['see', 'Portée vue', 'number'],
    ['strength', 'Force', 'number'], ['agility', 'Agilité', 'number'],
    ['energy_max', 'Énergie max', 'number'], ['divine_energy_max', 'Énergie divine max', 'number'],
    ['prereq_xp', 'XP requis (prérequis)', 'number'],
    ['xp_hit_player', 'XP quand il frappe un autre joueur (vide = valeur générale)', 'number'], ['xp_dodge', 'XP quand il esquive l\'attaque d\'un joueur (vide = valeur générale)', 'number'],
    ['train_energy', 'Entraînement : coût en énergie (vide = valeur générale)', 'number'], ['train_xp', 'Entraînement : XP gagnée (vide = valeur générale ; 0 = pas d\'entraînement)', 'number'],
    ['multipliers', 'Multiplicateurs (JSON : {"strength":1.5,"hp_max":2})', 'json']
  ],
  race: [
    ['key', 'Clé (code)'], ['name', 'Nom'], ['color', 'Couleur'], ['active', 'Active', 'check'],
    ['base_stats', 'Stats de base (JSON : {"hp_max":100,"strength":5,...})', 'json']
  ]
};
/** Parse JSON tolérant : un objet déjà parsé (valeur reçue de l'API, champ non retouché) est rendu tel quel ; JSON invalide → `def`. */
export const jsonOr = (v, def = null) => { if (v == null || v === '') return def; if (typeof v === 'object') return v; try { return JSON.parse(v); } catch { return def; } };
export const jsonText = v => (v == null ? '' : JSON.stringify(v, null, 1));
/** Segment d'URL (pluriel) de l'entité : les routes admin utilisent les noms de tables. */
export const URL_KIND = { monster: 'monsters', item: 'items', building: 'buildings' };
