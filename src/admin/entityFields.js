/** Descripteurs de champs par type d'entité (panneaux d'admin) : [colonne, libellé, type?] (type: number|check|json). */
export const FIELDS = {
  monster: [
    ['name', 'Nom'], ['hp_max', 'PV max', 'number'], ['hp_current', 'PV', 'number'], ['recovery', 'Régén/h', 'number'],
    ['energy_max', 'Énergie max', 'number'], ['strength', 'Force', 'number'], ['agility', 'Agilité', 'number'],
    ['armor', 'Armure', 'number'], ['range', 'Portée', 'number'], ['see', 'Portée de vue', 'number'],
    ['gain_xp_hour', 'XP/h', 'number'], ['gold_current', 'Or', 'number'],
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
  mount: [
    ['name', 'Nom'], ['hp_max', 'PV max', 'number'], ['armor', 'Armure', 'number'], ['energy_max', 'Endurance max', 'number'],
    ['speed', 'Vitesse', 'number'], ['carry', 'Portage', 'number'],
    ['bonus_see', 'Bonus portée vue', 'number'], ['bonus_range', 'Bonus portée combat', 'number'],
    ['flying', 'Volant', 'check'], ['aquatic', 'Aquatique', 'check'],
    ['strength', 'Force', 'number'], ['agility', 'Agilité', 'number'], ['recovery', 'Régén/h', 'number'],
    ['special_attack_name', 'Attaque spéciale'], ['special_attack_damage', 'Dégâts spéciale', 'number'],
    ['special_attack_energy', 'Coût spéciale', 'number']
  ],
  building: [
    ['name', 'Nom'], ['kind', 'Type (wall/tower/factory/totem/...)'], ['invulnerable', 'Invulnérable', 'check'],
    ['structure', 'Points de vie (structure)', 'number'], ['armor', 'Armure de la structure', 'number'], ['size', 'Taille (cases)', 'number'],
    ['occupiable', 'Case occupable (un personnage peut s\'y tenir)', 'check'],
    ['bonus_armor', 'Bonus armure (occupant)', 'number'], ['bonus_see', 'Bonus vue (occupant)', 'number'], ['bonus_range', 'Bonus portée (occupant)', 'number'],
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
    ['multipliers', 'Multiplicateurs (JSON : {"strength":1.5,"hp_max":2})', 'json']
  ],
  race: [
    ['key', 'Clé (code)'], ['name', 'Nom'], ['color', 'Couleur'], ['active', 'Active', 'check'],
    ['base_stats', 'Stats de base (JSON : {"hp_max":100,"strength":5,...})', 'json']
  ]
};
/** Parse JSON tolérant : renvoie la valeur par défaut (ou undefined si JSON invalide). */
export const jsonOr = (v, def = null) => { if (v == null || v === '') return def; try { return JSON.parse(v); } catch { return def; } };
export const jsonText = v => (v == null ? '' : JSON.stringify(v, null, 1));
/** Segment d'URL (pluriel) de l'entité : les routes admin utilisent les noms de tables. */
export const URL_KIND = { monster: 'monsters', item: 'items', mount: 'mounts', building: 'buildings' };
