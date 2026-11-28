// Helpers purs des bâtiments (lot 4), testés dans test/building.test.js.
/** Ajoute au corps de l'éditeur générique les champs propres aux bâtiments : attaques possibles contre l'occupant et
 *  production horaire fusionnée dans `data` (les autres clés de `data` sont conservées). */
export const buildingBody = (body, draft) => {
  const b = { ...body };
  if (draft.activationGroups) b.activation = activationBody(draft.activationGroups);
  const oa = draft.occupant_attack ?? { melee: true, ranged: true, spell: true };
  b.occupant_attack = { melee: oa.melee !== false, ranged: oa.ranged !== false, spell: oa.spell !== false };
  const prod = Object.fromEntries(Object.entries(draft.production ?? {}).map(([k, q]) => [k, Math.max(1, Math.trunc(Number(q) || 1))]));
  b.data = { ...(b.data ?? {}) };
  if (Object.keys(prod).length) b.data.production = prod; else delete b.data.production;
  // Capitale : coffre de départ et capacité max des joueurs de sa race (vide = 10 / sans limite).
  const pos = v => (Number(v) > 0 ? Math.trunc(Number(v)) : null);
  if (draft.kind === 'capital') for (const [k, v] of [['chestStart', pos(draft.chestStart)], ['chestMax', pos(draft.chestMax)]]) { if (v) b.data[k] = v; else delete b.data[k]; }
  return b;
};
/** Brouillon depuis la fiche API : production isolée de `data`. */
export const buildingDraft = det => ({ ...det, production: { ...(det?.data?.production ?? {}) }, chestStart: det?.data?.chestStart ?? '', chestMax: det?.data?.chestMax ?? '', activationGroups: (det?.activation?.groups ?? []).map(groupDraft) });
// Lot E : conditions d'activation (groupes alternatifs ; dans un groupe, tout ce qui est renseigné est exigé). Miroir de game/activation.ts.
export const groupDraft = g => ({ items: [...(g?.items ?? [])], divineOn: !!g?.divine, divineFamily: g?.divine?.family ?? '', divineCount: g?.divine?.count ?? 1,
  spellId: g?.spellId ?? '', resources: { ...(g?.resources ?? {}) }, gold: g?.gold ?? 0, minRank: g?.minRank ?? 0, ranks: [...(g?.ranks ?? [])], consume: !!g?.consume });
const int = (v, min, max) => Math.min(max, Math.max(min, Math.trunc(Number(v) || 0)));
export const activationBody = groups => ({ groups: groups.map(g => ({
  items: g.items.map(i => ({ itemId: int(i.itemId, 0, 1e9), qty: int(i.qty, 1, 999) })).filter(i => i.itemId),
  divine: g.divineOn ? { family: g.divineFamily || null, count: int(g.divineCount, 1, 50) } : null,
  spellId: g.spellId === '' || g.spellId == null ? null : int(g.spellId, 0, 1e9),
  resources: Object.fromEntries(Object.entries(g.resources).map(([k, q]) => [k, int(q, 1, 1e6)])),
  gold: int(g.gold, 0, 1e9), minRank: int(g.minRank, 0, 50), ranks: g.ranks.map(r => int(r, 0, 1e9)), consume: !!g.consume })) });
/** « 2 objet(s), 3 objet(s) divin(s), sort, 10 or, rang ≥ 2 (consommés) » ; groupe vide = « sans condition ». */
export const groupSummary = g => {
  const p = [];
  const n = (g.items ?? []).reduce((a, i) => a + (Number(i.qty) || 1), 0); if (n) p.push(`${n} objet(s)`);
  if (g.divine) p.push(`${g.divine.count} objet(s) divin(s)${g.divine.family ? ` ${g.divine.family}` : ''}`);
  if (g.spellId != null && g.spellId !== '') p.push('sort connu');
  const nr = Object.keys(g.resources ?? {}).length; if (nr) p.push(`${nr} ressource(s)`);
  if (g.gold) p.push(`${g.gold} or`);
  if (g.minRank) p.push(`rang ≥ ${g.minRank}`);
  if (g.ranks?.length) p.push(`${g.ranks.length} rang(s) précis`);
  return p.length ? `${p.join(', ')}${g.consume ? ' (consommés)' : ''}` : 'sans condition';
};
export const activationSummary = a => (a?.groups ?? []).map((g, i) => `${(a.groups.length > 1) ? `option ${i + 1} : ` : ''}${groupSummary(g)}`).join(' — ou — ');

/** Réapparition d'une structure (migration 48) : brouillon et corps PUT (délai décimal ≥ 0, conditions sans référence retirées). */
export const structureRespawnDraft = b => ({ respawn: !!b?.respawn, delayH: b?.respawn_delay_h ?? 0, limits: [...(b?.respawn_limits ?? [])] });
export const structureRespawnBody = r => ({
  respawn: !!r.respawn, respawn_delay_h: Math.max(0, Number(r.delayH) || 0),
  respawn_limits: r.limits.filter(l => l.ref !== '' && l.ref != null).map(l => ({ kind: l.kind, ref: l.kind === 'resource' ? String(l.ref) : Number(l.ref), max: Math.max(1, Math.trunc(Number(l.max) || 1)) })),
});
