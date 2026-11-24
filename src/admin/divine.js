// Helpers purs : objets (dont divins) et familles divines (testés dans test/adminDivine.test.js).
const NUM = ['price', 'armor', 'strength_bonus', 'agility_bonus', 'durability', 'weapon_damage', 'magic_armor', 'quantity_max', 'req_strength'];
/** Corps POST/PUT d'un objet : seulement les champs du formulaire, sans valeurs vides ni null
 *  (le back refuse null sur les nombres) ; famille divine envoyée seulement en rareté « divin ». */
export const itemBody = f => {
  const b = { name: String(f.name ?? '').trim(), rarity: f.rarity || 'commun', usable_by: f.usable_by ?? [] };
  if (f.slot) b.slot = f.slot;
  for (const k of NUM) if (f[k] !== '' && f[k] != null && !Number.isNaN(Number(f[k]))) b[k] = Number(f[k]);
  b.divine_family = b.rarity === 'divin' && f.divine_family ? f.divine_family : null;
  return b;
};
/** « Reliques (relique) · 3 / 4 » */
export const familyLabel = fm => `${fm.name} (${fm.key}) · ${fm.copies ?? 0} / ${fm.cap ?? '∞'}`;
/** Clé de famille valide (même règle que le back et la contrainte SQL). */
export const validFamilyKey = k => /^[a-z][a-z0-9_]{1,29}$/.test(k ?? '');
/** Familles utilisées par les règles du jeu (non supprimables). */
export const CORE_FAMILIES = ['relique', 'arcane', 'artefact'];
