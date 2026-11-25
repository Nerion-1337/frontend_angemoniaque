// Helpers purs : objets (dont divins) et familles divines (testés dans test/adminDivine.test.js).
const NUM = ['price', 'armor', 'strength_bonus', 'agility_bonus', 'durability', 'weapon_damage', 'magic_armor', 'quantity_max', 'req_strength', 'xp_use', 'reach'];
/** Caractéristiques qu'un objet peut offrir (valeur négative = malus) : [clé, libellé, colonne historique de l'objet].
 *  Sans colonne : rangée dans `bonuses` et reportée sur la fiche à l'équipement (migration 26). */
export const ITEM_STATS = [['strength', 'Force', 'strength_bonus'], ['agility', 'Agilité', 'agility_bonus'], ['armor', 'Armure', 'armor'], ['magic_armor', 'Armure magique', 'magic_armor'],
  ['hp_max', 'PV max'], ['recovery', 'Régénération / h'], ['energy_max', 'Énergie max'], ['divine_energy_max', 'Énergie divine max'], ['see', 'Vue'], ['range', 'Portée']];
/** { stat: entier } des caractéristiques sans colonne ; vides et zéros retirés. */
export const bonusesBody = bonuses => Object.fromEntries(ITEM_STATS.filter(s => !s[2]).map(([k]) => [k, Math.trunc(Number(bonuses?.[k]) || 0)]).filter(([, v]) => v));
/** « +2 Force · -5 Énergie max · +20 PV max » (colonnes historiques + bonuses). */
export const statsLine = it => ITEM_STATS.map(([k, l, col]) => [l, Number(col ? it[col] : it.bonuses?.[k]) || 0]).filter(([, v]) => v).map(([l, v]) => `${v > 0 ? '+' : ''}${v} ${l}`).join(' · ');
/** Corps POST/PUT d'un objet : seulement les champs du formulaire, sans valeurs vides ni null
 *  (le back refuse null sur les nombres) ; famille divine envoyée seulement en rareté « divin ». */
export const itemBody = f => {
  const b = { name: String(f.name ?? '').trim(), rarity: f.rarity || 'commun', usable_by: f.usable_by ?? [] };
  if (f.slot) b.slot = f.slot;
  b.two_handed = f.slot === 'weapon' && !!f.two_handed;   // deux mains : armes seulement (un arc l'est toujours)
  // Parchemin d'agrandissement du sac : data = { kind: 'bag', add, max } (les autres parchemins gardent leur data).
  const add = Math.trunc(Number(f.bag_add) || 0), max = Math.trunc(Number(f.bag_max) || 0);
  if (f.slot === 'scroll' && add > 0) b.data = { kind: 'bag', add, max: Math.max(max, add) };
  else if (f.was_bag) b.data = {};
  for (const k of NUM) if (f[k] !== '' && f[k] != null && !Number.isNaN(Number(f[k]))) b[k] = Number(f[k]);
  b.bonuses = bonusesBody(f.bonuses);
  // Portée (migrations 36-37) : armes seulement. Grande portée : puissance à la case 1 → 100 % à la case X (≤ portée) → puissance à la
  // dernière case ; sans case X, 100 % partout. Pourcentages bornés 0..100 (vide = 100).
  if (f.slot === 'weapon') { const reach = Math.max(1, Math.trunc(Number(f.reach) || 1)), full = Math.trunc(Number(f.full_power_at) || 0);
    const pct = v => (v === '' || v == null || Number.isNaN(Number(v)) ? 100 : Math.max(0, Math.min(100, Math.trunc(Number(v)))));
    b.reach = reach; b.full_power_at = reach > 1 && full >= 1 && full <= reach ? full : null;
    if (b.full_power_at) { b.power_start = pct(f.power_start); b.power_end = pct(f.power_end); } } else delete b.reach;
  b.divine_family = b.rarity === 'divin' && f.divine_family ? f.divine_family : null;
  b.shop = !!f.shop; b.shop_races = f.shop ? [...(f.shop_races ?? [])] : [];
  if (f.shop_stock !== '' && f.shop_stock != null && !Number.isNaN(Number(f.shop_stock))) b.shop_stock = Math.max(0, Math.trunc(Number(f.shop_stock)));
  return b;
};
/** Types d'objets du jeu (emplacements de l'inventaire, routes/inventory.ts:GROUP) — pas les parties du corps des monstres. */
export const ITEM_SLOTS = [['weapon', 'Arme (main)'], ['shield', 'Bouclier'], ['head', 'Casque'], ['chest', 'Plastron'], ['foot', 'Chaussures'], ['amulet', 'Collier'], ['ring', 'Bague'], ['bracelet', 'Bracelet'], ['special', 'Objet spécial'], ['tool', 'Outil'], ['scroll', 'Parchemin']];
export const ITEM_SLOT_LABEL = Object.fromEntries(ITEM_SLOTS);
/** « Reliques (relique) · 3 / 4 » */
export const familyLabel = fm => `${fm.name} (${fm.key}) · ${fm.copies ?? 0} / ${fm.cap ?? '∞'}`;
/** Clé de famille valide (même règle que le back et la contrainte SQL). */
export const validFamilyKey = k => /^[a-z][a-z0-9_]{1,29}$/.test(k ?? '');
/** Familles utilisées par les règles du jeu (non supprimables). */
export const CORE_FAMILIES = ['relique', 'arcane', 'artefact'];
