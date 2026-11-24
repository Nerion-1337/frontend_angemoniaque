// Helpers purs des bâtiments (lot 4), testés dans test/building.test.js.
/** Ajoute au corps de l'éditeur générique les champs propres aux bâtiments : attaques possibles contre l'occupant et
 *  production horaire fusionnée dans `data` (les autres clés de `data` sont conservées). */
export const buildingBody = (body, draft) => {
  const b = { ...body };
  const oa = draft.occupant_attack ?? { melee: true, ranged: true, spell: true };
  b.occupant_attack = { melee: oa.melee !== false, ranged: oa.ranged !== false, spell: oa.spell !== false };
  const prod = Object.fromEntries(Object.entries(draft.production ?? {}).map(([k, q]) => [k, Math.max(1, Math.trunc(Number(q) || 1))]));
  b.data = { ...(b.data ?? {}) };
  if (Object.keys(prod).length) b.data.production = prod; else delete b.data.production;
  return b;
};
/** Brouillon depuis la fiche API : production isolée de `data`. */
export const buildingDraft = det => ({ ...det, production: { ...(det?.data?.production ?? {}) } });
