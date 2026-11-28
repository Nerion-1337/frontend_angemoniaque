// Règles générales (migration 48) : perte à la mort et bonus des portes ouvertes. Miroir de back/routes/admin/faithPact.ts (Rules).
export const FACTION_FR = { demon: 'Démons', angel: 'Anges' };
/** Corps du PUT /admin/content/rules : pourcentage borné 0–100, bonus entiers non nuls seulement. */
export const rulesBody = r => ({
  death_loss_pct: Math.min(100, Math.max(0, Number(r.death_loss_pct) || 0)),
  gate_bonus: Object.fromEntries(['demon', 'angel'].map(f => [f, Object.fromEntries(Object.entries(r.gate_bonus?.[f] ?? {}).map(([k, v]) => [k, Math.trunc(Number(v)) || 0]).filter(([, v]) => v))])),
});
