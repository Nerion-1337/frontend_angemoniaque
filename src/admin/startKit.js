// Helpers purs de l'équipement de départ (testés dans test/startKit.test.js). Miroir du schéma back game/startKit.ts.
/** Brouillon du formulaire depuis races.start_kit (champs absents → valeurs vides). */
export const kitDraft = k => ({
  rank: k?.rank ?? '', gold: k?.gold ?? 0, xp: k?.xp ?? 0, resources: { ...(k?.resources ?? {}) },
  items: [...(k?.items ?? [])], spells: [...(k?.spells ?? [])],
});
const int = v => Math.max(0, Math.trunc(Number(v) || 0));
/** Corps du PUT : entiers ≥ 0, rang vide = premier palier (null). */
export const kitBody = k => {
  return {
    rank: k.rank === '' || k.rank == null ? null : int(k.rank),
    gold: int(k.gold), xp: int(k.xp),
    resources: Object.fromEntries(Object.entries(k.resources ?? {}).filter(([, q]) => int(q) > 0).map(([id, q]) => [id, int(q)])),
    items: (k.items ?? []).map(i => ({ itemId: int(i.itemId), qty: Math.max(1, int(i.qty)), place: i.place === 'chest' ? 'chest' : 'bag' })),
    spells: [...new Set((k.spells ?? []).map(int))],
  };
};
/** « Palier 2 · 500 or · 42 XP · 3 objets · 1 sort · 2 ressources » */
export const kitSummary = k => {
  const n = (x, s, p = s + 's') => (x ? `${x} ${x > 1 ? p : s}` : null);
  return [k.rank !== '' && k.rank != null ? `Palier ${k.rank}` : 'Premier palier', `${int(k.gold)} or`, int(k.xp) ? `${int(k.xp)} XP` : null,
    n((k.items ?? []).length, 'objet'), n((k.spells ?? []).length, 'sort'), n(Object.keys(k.resources ?? {}).length, 'ressource')]
    .filter(Boolean).join(' · ');
};
