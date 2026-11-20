/** Détails de monstre (Étape 2 phase 3b) : aides pures du panneau (liste de types + onglets). */
/** Les 7 parties du corps équipables (contrat CHECK des migrations 12/13 — style personnage). */
export const SLOTS = ['mains', 'tete', 'torse', 'pieds', 'collier', 'bracelet', 'bague'];
export const SLOT_LABEL = { mains: 'Mains', tete: 'Tête', torse: 'Torse', pieds: 'Pieds', collier: 'Collier', bracelet: 'Bracelet', bague: 'Bague' };
/** Position (en %) de chaque partie sur la silhouette (style de l'équipement personnage — SidePanel). */
export const SLOT_POS = { tete: [50, 8], collier: [50, 41], mains: [11, 20], bague: [11, 45], torse: [50, 56], bracelet: [33, 17], pieds: [50, 90] };
/** Un slot est-t-il autorisé ? Liste de parties vide = aucune restriction (tout est autorisé). */
export const slotAllowed = (slots, slot) => !slots || !slots.length || slots.includes(slot);
/** Filtrage insensible à la casse d'un catalogue par libellé (menus déroulants avec recherche). */
export const pickFilter = (list, q, labelOf) => {
  const s = String(q ?? '').trim().toLowerCase();
  if (!s) return list;
  return (list ?? []).filter(o => String(labelOf(o) ?? '').toLowerCase().includes(s));
};
/** Libellé d'un sort du catalogue (recherche + listes de capacités). */
export const spellLabel = s => `${s.name} (n°${s.id})${s.kind ? ` · ${s.kind}` : ''}${s.energy_cost != null ? ` · ${s.energy_cost} énergie` : ''}`;
/** Libellé d'une capacité (active = lançable, passive = en continu sans énergie, cible + périmètre). */
export const capLabel = x => `${spellLabel({ name: x.name, id: x.spell_id, kind: x.kind, energy_cost: x.energy_cost })}${x.mode === 'passive' ? ` · CONTINU${x.target ? ` (${x.target === 'ally' ? 'alliés' : 'ennemis'})` : ''} · rayon ${x.radius}` : ''}`;
/** Libellé d'une pièce d'équipement du monstre (objet du catalogue + partie du corps). */
export const equipLabel = e => e.item_name ? `${e.item_name} — ${SLOT_LABEL[e.slot] ?? e.slot}` : `objet n°${e.item_id}`;
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
/** Instance du status : « lié à <pseudo> » ou « natif » (pas de liaison personnage). */
export const linkedLabel = i => i.linked ? `lié à ${i.linked_pseudo ?? 'un personnage'}` : 'natif';
/** Échéance de réincarnation lisible : « dans Xh » / « mort » / null. */
export const respawnIn = i => {
  if (!i?.respawn_due_at) return i?.hp_current === 0 ? 'mort' : null;
  const h = Math.max(0, Math.round((new Date(i.respawn_due_at).getTime() - Date.now()) / 3600e3));
  return `réincarne dans ~${h} h`;
};
