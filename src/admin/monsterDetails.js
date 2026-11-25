/** Détails de monstre (Étape 2 phase 3b) : aides pures du panneau (liste de types + onglets). */
/** Les 7 parties du corps équipables (contrat CHECK des migrations 12/13 — style personnage). */
export const SLOTS = ['mains', 'tete', 'torse', 'pieds', 'collier', 'bracelet', 'bague'];
export const SLOT_LABEL = { mains: 'Mains', tete: 'Tête', torse: 'Torse', pieds: 'Pieds', collier: 'Collier', bracelet: 'Bracelet', bague: 'Bague' };
/** Position (en %) de chaque partie sur la silhouette admin (MonsterParts.jsx, même repère 100×100 que le dessin). */
export const SLOT_POS = { tete: [50, 9], collier: [50, 21], torse: [50, 38], bracelet: [25, 46], mains: [16, 58], bague: [84, 58], pieds: [50, 94] };
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
/** Groupes de champs de la fiche monstre (clés de FIELDS.monster). */
export const MONSTER_GROUPS = [
  ['Identité', ['name']],
  ['Vie et énergie', ['hp_max', 'hp_current', 'recovery', 'energy_max']],
  ['Combat', ['strength', 'agility', 'armor', 'range', 'see']],
  ['Récompenses', ['gain_xp_hour', 'gold_current']],
];
/** Réapparition (migration 24) : libellés des éléments limités. */
export const LIMIT_KIND = { item: 'Objet', spell: 'Sort', resource: 'Ressource' };
export const respawnDraft = m => ({ respawn: m?.respawn ?? true, delayH: m?.reincarnate_delay_h ?? 0, limits: [...(m?.respawn_limits ?? [])] });
/** Corps PUT de la réapparition : délai entier ≥ 0, conditions sans référence retirées, max ≥ 1, objet/sort → id numérique. */
export const respawnBody = r => ({
  respawn: !!r.respawn, reincarnate_delay_h: Math.max(0, Math.trunc(Number(r.delayH) || 0)),
  respawn_limits: r.limits.filter(l => l.ref !== '' && l.ref != null).map(l => ({ kind: l.kind, ref: l.kind === 'resource' ? String(l.ref) : Number(l.ref), max: Math.max(1, Math.trunc(Number(l.max) || 1)) })),
});
/** « Ne réapparaît pas · … » / « Réapparaît après 6 h · 2 condition(s) » / « Réapparaît aussitôt » */
export const respawnSummary = m => (m.respawn === false ? 'Non recréé après sa mort'
  : `${m.reincarnate_delay_h > 0 ? `Réapparaît après ${m.reincarnate_delay_h} h` : 'Réapparaît aussitôt'}${m.respawn_limits?.length ? ` · ${m.respawn_limits.length} condition(s)` : ''}`);
