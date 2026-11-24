// Helpers purs : conditions de passage de rang (testés dans test/rankReq.test.js). Miroir du schéma back game/rankUp.ts.
export const reqDraft = r => ({
  on: !!r && Object.keys(r).length > 0, items: [...(r?.items ?? [])], resources: { ...(r?.resources ?? {}) },
  energyCost: r?.energyCost ?? 0, mode: r?.mode ?? 'permanent', durationH: r?.durationH ?? 24, consume: r?.consume ?? true,
});
const int = (v, min, max) => Math.min(max, Math.max(min, Math.trunc(Number(v) || 0)));
/** Corps PUT ; désactivé → {} (pas de passage par conditions). */
export const reqBody = d => (!d.on ? {} : {
  items: d.items.map(i => ({ itemId: int(i.itemId, 0, 1e9), qty: int(i.qty, 1, 9999) })).filter(i => i.itemId),
  resources: Object.fromEntries(Object.entries(d.resources).map(([k, q]) => [k, int(q, 1, 1e6)])),
  energyCost: int(d.energyCost, 0, 1000), mode: d.mode === 'temporary' ? 'temporary' : 'permanent', durationH: int(d.durationH, 1, 8760), consume: !!d.consume,
});
/** « 2 objets · 3 ressources · ⚡5 · temporaire 24 h · consommés » */
export const reqSummary = r => {
  if (!r || !Object.keys(r).length) return '';
  const p = [];
  if (r.items?.length) p.push(`${r.items.reduce((a, i) => a + (i.qty ?? 1), 0)} objet(s)`);
  const nr = Object.keys(r.resources ?? {}).length; if (nr) p.push(`${nr} ressource(s)`);
  if (r.energyCost) p.push(`⚡${r.energyCost}`);
  p.push(r.mode === 'temporary' ? `temporaire ${r.durationH} h` : 'définitif');
  p.push(r.consume === false ? 'non consommés' : 'consommés');
  return p.join(' · ');
};
