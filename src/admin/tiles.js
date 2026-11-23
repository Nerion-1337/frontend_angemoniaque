// Helpers purs de la section admin « Cases » (testés dans test/adminTiles.test.js).
export const WORLD_LABEL = { 1: 'Monde des Hommes', 2: 'Anges & Démons', 3: 'Royaume des Morts' };
/** Variation de PV par heure : miroir de back game/tileTypes.ts tileHpDelta. */
export const hpPerHour = (mode, damage) => (!damage ? 0 : mode === 'bonus' ? Math.abs(damage) : mode === 'malus' ? -Math.abs(damage) : 0);
/** Corps du PUT /admin/content/tiles/{mapId}/{kind} : pas de mode sans sort. */
export const tileBody = f => {
  const spellId = f.spellId === '' || f.spellId == null ? null : Number(f.spellId);
  return { name: String(f.name ?? '').trim(), description: f.description ?? '', energyCost: Number(f.energyCost) || 0, spellId, spellMode: spellId ? f.spellMode : null };
};
/** Résumé d'un sort passif dans le tableau : « Nom (+3 PV/h) ». */
export const spellSummary = r => { const h = hpPerHour(r.spell_mode, r.spell_damage); return `${r.spell_name ?? `Sort n°${r.spell_id}`} (${h > 0 ? '+' : ''}${h} PV/h)`; };
