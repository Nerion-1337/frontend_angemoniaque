// Helpers purs de l'éditeur « Gain d'XP selon l'écart de rang » (Races & rangs ; testés dans test/xpRank.test.js).
// Miroir de back/src/game/xp.ts:rankPercent. Écart = rang de la cible − rang du personnage.
/** Table { "écart": % } → lignes triées [{ diff, pct }]. */
export const rowsOf = table => Object.entries(table ?? {}).map(([k, v]) => ({ diff: Number(k), pct: Number(v) })).sort((a, b) => a.diff - b.diff);
/** Lignes → table (écarts entiers -99..99, % entiers ≥ 0, dernier écart en double gagnant). */
export const tableOf = rows => Object.fromEntries(rows.filter(r => r.diff !== '' && Number.isFinite(Number(r.diff)))
  .map(r => [String(Math.max(-99, Math.min(99, Math.trunc(Number(r.diff))))), Math.max(0, Math.trunc(Number(r.pct) || 0))]));
/** Pourcentage appliqué pour un écart : ligne exacte, sinon la plus proche (égalité : la plus basse) ; table vide → 100. */
export const rankPercent = (table, diff) => {
  const keys = Object.keys(table ?? {}).map(Number).filter(Number.isFinite);
  if (!keys.length) return 100;
  const k = keys.sort((a, b) => Math.abs(a - diff) - Math.abs(b - diff) || a - b)[0];
  return Math.max(0, Number(table[String(k)]) || 0);
};
/** « Cible 2 rangs au-dessus » / « Même rang » / « Cible 1 rang en dessous ». */
export const diffLabel = d => (d === 0 ? 'Même rang' : `Cible ${Math.abs(d)} rang${Math.abs(d) > 1 ? 's' : ''} ${d > 0 ? 'au-dessus' : 'en dessous'}`);
