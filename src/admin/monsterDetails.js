/** Détails de monstre (Étape 2 phase 3) : aides pures du panneau `MonsterDetails` (UI dans MonsterDetails.jsx). */
/** Les 7 slots d'équipement du dossier (mains, tête, torse, pieds, collier, bracelet, bague). */
export const SLOTS = ['mains', 'tete', 'torse', 'pieds', 'collier', 'bracelet', 'bague'];
export const SLOT_LABEL = { mains: 'Mains', tete: 'Tête', torse: 'Torse', pieds: 'Pieds', collier: 'Collier', bracelet: 'Bracelet', bague: 'Bague' };
/** Filtrage insensible à la casse d'un catalogue par libellé (menu déroulant avec recherche). */
export const pickFilter = (list, q, labelOf) => {
  const s = String(q ?? '').trim().toLowerCase();
  if (!s) return list;
  return (list ?? []).filter(o => String(labelOf(o) ?? '').toLowerCase().includes(s));
};
/** Libellé d'un sort du catalogue (recherche + listes). */
export const spellLabel = s => `${s.name} (n°${s.id})${s.kind ? ` · ${s.kind}` : ''}${s.energy_cost != null ? ` · ${s.energy_cost} énergie` : ''}`;
/** Libellé d'une pièce d'équipement du monstre (objet du catalogue + slot porté). */
export const equipLabel = e => e.item_name ? `${e.item_name} — ${SLOT_LABEL[e.slot] ?? e.slot}` : `objet n°${e.item_id}`;
/** Libellé d'une aura : sort appliqué en continu (sans énergie), cible + périmètre. */
export const auraLabel = a => `${a.spell_name ?? `sort n°${a.spell_id}`} · ${a.target === 'ally' ? 'alliés' : 'ennemis'} · rayon ${a.radius} (continu, sans énergie)`;
/** Plafonds d'une entité (entity_caps) → { inGame, perPlayer } pour les deux champs du dossier. */
export const capsToMaxCaps = caps => {
  const out = { inGame: '', perPlayer: '' };
  for (const c of caps ?? []) { if (c.scope === 'global') out.inGame = c.value; if (c.scope === 'per_player') out.perPlayer = c.value; }
  return out;
};
/** Corps d'ajout de placement spontané : conversion numérique + cases à cocher par défaut false. */
export const placeBody = f => ({
  monsterId: Number(f.monsterId), mapId: Number(f.mapId), x: Number(f.x), y: Number(f.y),
  gold: f.gold === '' ? undefined : Number(f.gold),
  items: !!f.items, resources: !!f.resources, divine: !!f.divine,
  reincarnateH: f.reincarnateH === '' ? undefined : Number(f.reincarnateH)
});
/** Échéance de réincarnation lisible (instance du status) : « dans Xh » / « morte » / null. */
export const respawnIn = i => {
  if (!i?.respawn_due_at) return i?.hp_current === 0 ? 'mort' : null;
  const h = Math.max(0, Math.round((new Date(i.respawn_due_at).getTime() - Date.now()) / 3600e3));
  return `réincarne dans ~${h} h`;
};
