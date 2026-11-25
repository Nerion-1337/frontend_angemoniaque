// Helpers purs des secteurs de ressources (testés dans test/deposits.test.js). Tirage miroir du back (game/deposits.ts).
export const KINDS = [['plain', 'Plaine'], ['forest', 'Forêt'], ['mountain', 'Massif'], ['arid', 'Terre aride'], ['snow', 'Pics glacés'], ['ether', 'Pics d’éther'], ['volcano', 'Volcan'], ['shallow', 'Eau peu profonde'], ['deep', 'Eau profonde']];
export const KIND_NAME = Object.fromEntries(KINDS);
/** Tirage 0..99 d'une case dans un secteur (identique au serveur). */
export const cellRoll = (x, y, sid) => {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1) ^ Math.imul(sid | 0, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35); return ((h ^ (h >>> 16)) >>> 0) % 100;
};
/** Ressource du secteur sur la case (ou null = terrain naturel). */
export function pickShare(shares, kind, x, y, sid) {
  const roll = cellRoll(x, y, sid); let acc = 0;
  for (const s of shares) { if (s.kind && s.kind !== kind) continue; acc += Number(s.percent) || 0; if (roll < acc) return s; }
  return null;
}
/** Somme des parts par type de case touché ; chaque total doit rester ≤ 100. */
export const shareTotals = shares => Object.fromEntries(KINDS.map(([k]) => [k, shares.filter(s => !s.kind || s.kind === k).reduce((a, s) => a + (Number(s.percent) || 0), 0)]).filter(([, v]) => v));
export const overLimit = shares => Object.entries(shareTotals(shares)).filter(([, v]) => v > 100).map(([k, v]) => `${KIND_NAME[k]} ${v} %`);
/** Ressource effective d'une case : secteurs actifs du plus petit au plus grand (puis le plus récent), sinon le terrain. */
export const sortSectors = rows => (rows ?? []).filter(r => r.active).sort((a, b) => area(a) - area(b) || b.id - a.id);
const area = r => (r.x_max - r.x_min + 1) * (r.y_max - r.y_min + 1);
export function cellResource(x, y, t, sorted) {
  for (const d of sorted) {
    if (x < d.x_min || x > d.x_max || y < d.y_min || y > d.y_max) continue;
    const s = pickShare(d.resources, t.kind, x, y, d.id); if (s) return { id: s.resource, sector: d };
  }
  return t.resourceId ? { id: t.resourceId, sector: null } : null;
}
/** Ressources naturelles d'un monde : { id: { n, kind (type de case dominant) } }. */
export function naturalScan(width, height, terrainAt) {
  const by = {};
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const t = terrainAt(x, y); if (!t.resourceId) continue;
    const e = by[t.resourceId] ??= { n: 0, kinds: {} }; e.n++; e.kinds[t.kind] = (e.kinds[t.kind] ?? 0) + 1;
  }
  for (const e of Object.values(by)) e.kind = Object.entries(e.kinds).sort((a, b) => b[1] - a[1])[0][0];
  return by;
}
const int = (v, min) => Math.max(min, Math.trunc(Number(v) || 0));
/** Nouvelle ressource du secteur : type de case = celui où elle pousse naturellement ; part = ce qui reste sur ce type. */
export const newShare = (resource, kind, shares) => {
  const tot = shareTotals(shares), used = kind ? (tot[kind] ?? 0) : Math.max(0, ...Object.values(tot));
  return { resource, kind: kind ?? '', percent: Math.max(1, 100 - used), stockMax: 50, stock: 50, regenPerH: 5, yieldPerHarvest: 1 };
};
export const sectorDraft = (r, mapId = 1, zone = null) => ({
  name: r?.name ?? '', active: r?.active ?? true, mapId: r?.map_id ?? mapId,
  xMin: r?.x_min ?? zone?.xMin ?? 0, yMin: r?.y_min ?? zone?.yMin ?? 0, xMax: r?.x_max ?? zone?.xMax ?? 0, yMax: r?.y_max ?? zone?.yMax ?? 0,
  resources: (r?.resources ?? []).map(s => ({ resource: s.resource, kind: s.kind ?? '', percent: s.percent, stockMax: s.stock_max, stock: s.stock, regenPerH: s.regen_per_h, yieldPerHarvest: s.yield_per_harvest })),
});
/** Corps POST/PUT : coins remis dans l'ordre ; parts 1..100 ; type vide → toute case ; stock borné par le maximum. */
export const sectorBody = (f, mapId) => {
  const xa = int(f.xMin, 0), ya = int(f.yMin, 0), xb = int(f.xMax, 0), yb = int(f.yMax, 0);
  return { mapId: Number(mapId ?? f.mapId), name: (f.name ?? '').trim(), active: !!f.active,
    xMin: Math.min(xa, xb), yMin: Math.min(ya, yb), xMax: Math.max(xa, xb), yMax: Math.max(ya, yb),
    resources: f.resources.map(s => { const stockMax = int(s.stockMax, 1);
      return { resource: s.resource, kind: s.kind || null, percent: Math.min(100, int(s.percent, 1)), stockMax, stock: Math.min(int(s.stock, 0), stockMax), regenPerH: int(s.regenPerH, 0), yieldPerHarvest: int(s.yieldPerHarvest, 1) }; }) };
};
/** « case 12, 40 » ou « 10–14 × 40–42 (15 cases) » */
export const zoneLabel = r => (r.x_min === r.x_max && r.y_min === r.y_max ? `case ${r.x_min}, ${r.y_min}`
  : `${r.x_min}–${r.x_max} × ${r.y_min}–${r.y_max} (${(r.x_max - r.x_min + 1) * (r.y_max - r.y_min + 1)} cases)`);
