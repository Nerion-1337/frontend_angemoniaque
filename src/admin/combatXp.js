// Helpers purs de l'XP de combat / entraînement (testés dans test/combatXp.test.js). Miroir de back game/xp.ts (COMBAT_KEYS).
export const COMBAT_FIELDS = [['xp_hit_player', 'XP quand un joueur en frappe un autre'], ['xp_dodge', 'XP du défenseur qui esquive'],
  ['train_energy', 'Entraînement : coût en énergie'], ['train_xp', 'Entraînement : XP gagnée']];
export const COMBAT_KEYS = COMBAT_FIELDS.map(([k]) => k);
const int = v => Math.max(0, Math.trunc(Number(v) || 0));
/** Corps des valeurs générales : entiers ≥ 0. */
export const combatBody = v => Object.fromEntries(COMBAT_KEYS.map(k => [k, int(v?.[k])]));
/** Valeur d'un rang : vide → null (= valeur générale), sinon entier ≥ 0. */
export const rankCombatValue = v => (v === '' || v == null ? null : int(v));
