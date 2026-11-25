// Helpers purs : objets (dont divins) et familles divines (testés dans test/adminDivine.test.js).
const NUM = ['price', 'armor', 'strength_bonus', 'agility_bonus', 'durability', 'weapon_damage', 'magic_armor', 'quantity_max', 'req_strength'];
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
  for (const k of NUM) if (f[k] !== '' && f[k] != null && !Number.isNaN(Number(f[k]))) b[k] = Number(f[k]);
  b.bonuses = bonusesBody(f.bonuses);
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
