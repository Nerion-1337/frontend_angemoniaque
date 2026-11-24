// Helpers purs de la section « Parchemins » (testés dans test/scrolls.test.js).
export const TARGET_LABEL = { item: 'Objet', spell: 'Sort', building: 'Bâtiment' };
/** Brouillon du formulaire depuis une recette de l'API (null = nouvelle recette). */
export const recipeDraft = r => ({
  scrollMode: 'new', newScrollName: '', scrollItemId: r?.scroll_item_id ?? '',
  targetKind: r?.target_kind ?? 'item', targetId: r?.target_id ?? '', qtyOut: r?.qty_out ?? 1,
  resources: { ...(r?.resources ?? {}) }, consumeScroll: r?.consume_scroll ?? true, atCapital: r?.at_capital ?? false, energyCost: r?.energy_cost ?? 0,
});
const int = (v, min = 0) => Math.max(min, Math.trunc(Number(v) || 0));
/** Corps POST/PUT : entiers bornés, quantité 1 hors objets, parchemin existant OU nom d'un nouveau parchemin. */
export const recipeBody = f => {
  const b = { targetKind: f.targetKind, targetId: int(f.targetId), qtyOut: f.targetKind === 'item' ? int(f.qtyOut, 1) : 1,
    resources: Object.fromEntries(Object.entries(f.resources ?? {}).map(([k, q]) => [k, int(q, 1)])),
    consumeScroll: !!f.consumeScroll, atCapital: !!f.atCapital, energyCost: int(f.energyCost) };
  if (f.scrollItemId !== '' && f.scrollItemId != null && (f.scrollMode !== 'new' || !f.newScrollName)) b.scrollItemId = int(f.scrollItemId);
  else if (f.newScrollName?.trim()) b.newScrollName = f.newScrollName.trim();
  return b;
};
/** Nom affiché d'une ressource du catalogue (repli : son id). */
export const resLabel = (list, id) => (list ?? []).find(r => String(r.id) === String(id))?.name ?? id;
