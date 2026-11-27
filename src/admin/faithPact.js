// Helpers purs des sections admin « Foi » et « Pacte » (testés dans test/faithPact.test.js). Miroir de back/game/faithPact.ts.
export const STAT_LABEL = { strength: 'Force', agility: 'Agilité', armor: 'Armure', magic_armor: 'Armure magique', see: 'Vision', range: 'Portée', recovery: 'Régénération', hp_max: 'PV max (et PV)', energy_max: 'Énergie max (et énergie)', divine_energy_max: 'Énergie divine max (et ÉD)' };
const int = (v, min = 0) => Math.max(min, Math.trunc(Number(v)) || 0);
/** Corps du PUT /admin/content/faith : entiers ≥ bornes, bénédictions des caractéristiques cochées seulement. */
export const faithBody = f => ({
  followersStep: int(f.followersStep, 1), xpHour: int(f.xpHour), goldHour: int(f.goldHour), prayers: int(f.prayers), prayerPeriodH: Math.max(1, Number(f.prayerPeriodH) || 1),
  blessings: Object.fromEntries(Object.entries(f.blessings ?? {}).filter(([, b]) => b?.on !== false).map(([k, b]) => [k, { max: int(b.max, 1), maxH: int(b.maxH, 1), cost: int(b.cost) }])),
});
/** Coût d'une bénédiction (aperçu) : coût du maximum au prorata de la valeur et de la durée, arrondi au supérieur. */
export const blessingCost = (b, v, h) => Math.ceil(b.cost * (v / b.max) * (h / b.maxH) - 1e-9);
/** Corps d'une composition de pacte. */
export const tierBody = t => ({ name: String(t.name ?? '').trim(), xp_hour: int(t.xp_hour), gold_hour: int(t.gold_hour), percent: Math.min(100, int(t.percent, 1)),
  duration_h: Math.max(1, Number(t.duration_h) || 1), cooldown_h: Math.max(0, Number(t.cooldown_h) || 0),
  max_assign: t.max_assign === '' || t.max_assign == null ? null : Math.max(1, Math.trunc(Number(t.max_assign)) || 1) });   // vide = illimité
/** Exemple lisible d'une composition : ce que l'Humain reçoit pour une caractéristique de 20 (arrondi au supérieur). */
export const tierExample = t => `${Math.ceil(20 * (Number(t.percent) || 0) / 100)} pour 20`;
