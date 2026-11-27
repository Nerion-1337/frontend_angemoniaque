// Helpers purs de la section admin « Améliorations » (testés dans test/statCosts.test.js). Miroir de back/src/game/rules.ts:statUpgradeCost.
export const STAT_LABEL = { hp_max: 'Vie max', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max', recovery: 'Régénération', see: 'Vision', range: 'Portée',
  strength: 'Force', agility: 'Agilité', armor: 'Armure physique', magic_armor: 'Armure magique' };
/** Multiplicateurs par palier : `multis` (nombre libre), sinon l'ancien format multi_1..3. */
export const multisOf = r => (r.multis?.length ? r.multis : [r.multi_1 ?? 1, r.multi_2 ?? 2, r.multi_3 ?? 3]).map(Number);
/** Coût XP du point n° `bought + 1` : base × multiplicateur du palier (achats ÷ améliorations par palier) ; le dernier palier vaut au-delà. */
export const upgradeCost = (r, bought) => { const m = multisOf(r); return Math.round(r.base_xp_cost * m[Math.min(Math.floor(bought / r.numb_up), m.length - 1)]); };
/** Aperçu : coût du 1er point de chaque palier et XP totale pour atteindre le dernier palier. */
export const preview = r => {
  const n = Math.max(1, r.numb_up), x = { ...r, numb_up: n }, k = multisOf(r).length; let total = 0;
  for (let i = 0; i < (k - 1) * n; i++) total += upgradeCost(x, i);
  return { firsts: Array.from({ length: k }, (_, i) => upgradeCost(x, i * n)), toLast: total };
};
const num = (v, min, int = true) => { const x = Number(v); return Number.isFinite(x) ? Math.max(min, int ? Math.trunc(x) : Math.round(x * 100) / 100) : min; };
export const ruleBody = f => ({ base_xp_cost: num(f.base_xp_cost, 0), numb_up: num(f.numb_up, 1), multis: multisOf(f).map(m => num(m, 0, false)) });
export const newRule = () => ({ base_xp_cost: 20, numb_up: 10, multis: [1, 2, 3] });
export const MAX_TIERS = 20;
