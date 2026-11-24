// Helpers purs des gisements (testés dans test/deposits.test.js).
export const depositDraft = (r, mapId = 1) => ({
  shape: r && (r.x_max !== r.x_min || r.y_max !== r.y_min) ? 'rect' : 'cell', resource: r?.resource ?? '',
  xMin: r?.x_min ?? 0, yMin: r?.y_min ?? 0, xMax: r?.x_max ?? 0, yMax: r?.y_max ?? 0,
  stockMax: r?.stock_max ?? 10, stock: r?.stock ?? 10, regenPerH: r?.regen_per_h ?? 1, yieldPerHarvest: r?.yield_per_harvest ?? 1, active: r?.active ?? true, mapId: r?.map_id ?? mapId,
});
const int = (v, min) => Math.max(min, Math.trunc(Number(v) || 0));
/** Corps POST/PUT : case unique → max = min ; rectangle remis dans l'ordre ; stock borné par le maximum. */
export const depositBody = (f, mapId) => {
  const xa = int(f.xMin, 0), ya = int(f.yMin, 0), xb = f.shape === 'rect' ? int(f.xMax, 0) : xa, yb = f.shape === 'rect' ? int(f.yMax, 0) : ya;
  const stockMax = int(f.stockMax, 1);
  return { mapId: Number(mapId ?? f.mapId), xMin: Math.min(xa, xb), yMin: Math.min(ya, yb), xMax: Math.max(xa, xb), yMax: Math.max(ya, yb), resource: f.resource,
    stockMax, stock: Math.min(int(f.stock, 0), stockMax), regenPerH: int(f.regenPerH, 0), yieldPerHarvest: int(f.yieldPerHarvest, 1), active: !!f.active };
};
/** « case 12, 40 » ou « 10–14 × 40–42 (15 cases) » */
export const zoneLabel = r => (r.x_min === r.x_max && r.y_min === r.y_max ? `case ${r.x_min}, ${r.y_min}`
  : `${r.x_min}–${r.x_max} × ${r.y_min}–${r.y_max} (${(r.x_max - r.x_min + 1) * (r.y_max - r.y_min + 1)} cases)`);
