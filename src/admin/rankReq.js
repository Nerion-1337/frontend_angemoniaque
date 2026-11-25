// Helpers purs : conditions de passage de rang (testés dans test/rankReq.test.js). Miroir du schéma back game/rankUp.ts :
// deux voies indépendantes, chacune facultative — définitive et temporaire (avec durée).
export const MODES = [['permanent', 'Passage définitif'], ['temporary', 'Passage temporaire']];
const condDraft = c => ({ on: !!c, items: [...(c?.items ?? [])], resources: { ...(c?.resources ?? {}) }, energyCost: c?.energyCost ?? 0, consume: c?.consume ?? true });
export const reqDraft = r => ({ permanent: condDraft(r?.permanent), temporary: { ...condDraft(r?.temporary), durationH: r?.temporary?.durationH ?? 24 } });
const int = (v, min, max) => Math.min(max, Math.max(min, Math.trunc(Number(v) || 0)));
const condBody = c => ({
  items: c.items.map(i => ({ itemId: int(i.itemId, 0, 1e9), qty: int(i.qty, 1, 9999) })).filter(i => i.itemId),
  resources: Object.fromEntries(Object.entries(c.resources).map(([k, q]) => [k, int(q, 1, 1e6)])),
  energyCost: int(c.energyCost, 0, 1000), consume: !!c.consume,
});
/** Corps PUT : chaque voie décochée → null ; les deux décochées → aucun passage par conditions. */
export const reqBody = d => ({
  permanent: d.permanent.on ? condBody(d.permanent) : null,
  temporary: d.temporary.on ? { ...condBody(d.temporary), durationH: int(d.temporary.durationH, 1, 8760) } : null,
});
const condSummary = c => {
  const p = [];
  if (c.items?.length) p.push(`${c.items.reduce((a, i) => a + (i.qty ?? 1), 0)} objet(s)`);
  const nr = Object.keys(c.resources ?? {}).length; if (nr) p.push(`${nr} ressource(s)`);
  if (c.energyCost) p.push(`⚡${c.energyCost}`);
  p.push(c.consume === false ? 'non consommés' : 'consommés');
  return p.join(', ');
};
/** « définitif (2 objet(s), ⚡5, consommés) · temporaire 24 h (1 ressource(s), non consommés) » */
export const reqSummary = r => [r?.permanent && `définitif (${condSummary(r.permanent)})`, r?.temporary && `temporaire ${r.temporary.durationH} h (${condSummary(r.temporary)})`].filter(Boolean).join(' · ');
