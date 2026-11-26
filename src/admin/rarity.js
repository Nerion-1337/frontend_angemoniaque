// Onglets admin Objets & Sorts (phase 4) : raretés et « qui peut s'en équiper / l'apprendre ».
// Miroir des constantes back (admin/common.ts : RARITIES, USABLE_KINDS) — les deux listes
// évoluent ensemble.

export const RARITIES = ['commun', 'rare', 'epique', 'legendaire', 'divin'];
export const RARITY_LABEL = { commun: 'Commun', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire', divin: 'Divin' };
/** Qui peut s'équiper (objet) / apprendre (sort) : sous-ensemble de ces 6 kinds. */
export const USABLE_KINDS = ['humain', 'ange', 'demon', 'monstre', 'structure'];
export const USABLE_LABEL = { humain: 'Humain', ange: 'Ange', demon: 'Démon', monstre: 'Monstre', structure: 'Structure' };
/** Badge compact de la valeur `usable_by` (tableau JSON, éventuellement stringifié). */
export const usableBadge = v => {
  let a = v;
  if (typeof v === 'string') { try { a = JSON.parse(v); } catch { a = []; } }
  a = Array.isArray(a) ? a : [];
  return a.length ? a.map(k => USABLE_LABEL[k] ?? k).join(', ') : 'Tout le monde';
};
