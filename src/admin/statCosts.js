// Helpers purs de la section admin « Améliorations » (testés dans test/statCosts.test.js). Miroir de back/src/game/rules.ts:statUpgradeCost.
export const STAT_LABEL = { hp_max: 'Vie max', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max', recovery: 'Régénération', see: 'Vision', range: 'Portée',
  strength: 'Force', agility: 'Agilité', armor: 'Armure physique', magic_armor: 'Armure magique' };
/** Coût XP du point n° `bought + 1` : base × multiplicateur du palier (achats ÷ améliorations par palier, plafonné au palier 3). */
export const upgradeCost = (r, bought) => Math.round(r.base_xp_cost * [r.multi_1, r.multi_2, r.multi_3][Math.min(Math.floor(bought / r.numb_up), 2)]);
/** Aperçu : coût du 1er point de chaque palier et XP totale pour atteindre le palier 3. */
export const preview = r => { const n = Math.max(1, r.numb_up); let total = 0; for (let i = 0; i < 2 * n; i++) total += upgradeCost({ ...r, numb_up: n }, i);
  return { t1: upgradeCost({ ...r, numb_up: n }, 0), t2: upgradeCost({ ...r, numb_up: n }, n), t3: upgradeCost({ ...r, numb_up: n }, 2 * n), toT3: total }; };
const num = (v, min, int = true) => { const x = Number(v); return Number.isFinite(x) ? Math.max(min, int ? Math.trunc(x) : Math.round(x * 100) / 100) : min; };
export const ruleBody = f => ({ base_xp_cost: num(f.base_xp_cost, 0), numb_up: num(f.numb_up, 1), multi_1: num(f.multi_1, 0, false), multi_2: num(f.multi_2, 0, false), multi_3: num(f.multi_3, 0, false) });
export const newRule = () => ({ base_xp_cost: 20, numb_up: 10, multi_1: 1, multi_2: 2, multi_3: 3 });
