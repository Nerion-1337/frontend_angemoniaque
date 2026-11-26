// Helpers purs du moteur de sorts côté admin (testés dans test/spellFx.test.js). Miroir du schéma back game/spellEffects.ts.
export const STAT_LABEL = {
  hp: 'PV (rendre / retirer)', energy: 'Énergie (rendre / retirer)', divine_energy: 'Énergie divine (rendre / retirer)',
  hp_max: 'PV max', energy_max: 'Énergie max (capacité)', divine_energy_max: 'Énergie divine max',
  strength: 'Force', agility: 'Agilité', armor: 'Armure', magic_armor: 'Armure magique', see: 'Vue', range: 'Portée', recovery: 'Régénération',
};
export const POOL_STATS = ['hp', 'energy', 'divine_energy'];
export const TARGET_LABEL = { self: 'Soi-même', single: 'Cible unique', area: "Zone d'impact" };
/** Invocation (lot D) et modes des sorts liés à un élément (objet, bâtiment). */
export const SUMMON_LABEL = { monster: 'Monstre', item: 'Objet', building: 'Bâtiment' };
export const LINK_MODES = {
  item: [['passive', 'En continu (tant qu\'il est porté)'], ['active', 'À activer (lançable par le porteur)'], ['on_hit', 'Au coup porté (arme)'], ['on_struck', 'À l\'attaque reçue (armure, bouclier)']],
  building: [['passive', 'En continu (chaque heure)'], ['active', 'À activer (propriétaire à côté)']],
};
export const modeLabel = (kind, mode) => (LINK_MODES[kind] ?? []).find(m => m[0] === mode)?.[1] ?? mode;
export const AFFECTS_LABEL = { enemies: 'Ennemis', allies: 'Alliés (même race)', all: 'Tout le monde' };
/** Brouillon depuis spells.effects ({} = moteur désactivé, sort historique). */
export const fxDraft = e => {
  const on = !!e && Object.keys(e).length > 0;
  return { on, target: e?.target ?? 'single', range: e?.range ?? 4, radius: e?.radius ?? 1, affects: e?.affects ?? 'enemies',
    damage: e?.damage ?? 0, heal: e?.heal ?? 0, dotOn: !!e?.dot, dotDamage: e?.dot?.damage ?? 5, dotHours: e?.dot?.hours ?? 3,
    stats: [...(e?.stats ?? [])], durationH: e?.durationH ?? 0,
    sumOn: !!e?.summon, sumKind: e?.summon?.kind ?? 'monster', sumRef: e?.summon?.refId ?? '', sumQty: e?.summon?.qty ?? 1, sumH: e?.summon?.durationH ?? 0 };
};
const int = (v, min, max) => Math.min(max, Math.max(min, Math.trunc(Number(v) || 0)));
/** Corps `effects` envoyé au back ; moteur désactivé → {}. Rayon seulement en zone ; portée 0 pour soi. */
export const fxBody = d => {
  if (!d.on) return {};
  return { target: d.target, range: d.target === 'self' ? 0 : int(d.range, 0, 30), radius: d.target === 'area' ? int(d.radius, 0, 15) : 0, affects: d.affects,
    damage: int(d.damage, 0, 1e6), heal: int(d.heal, 0, 1e6), dot: d.dotOn ? { damage: int(d.dotDamage, 1, 1e6), hours: int(d.dotHours, 1, 720) } : null,
    stats: (d.stats ?? []).filter(s => s.stat && Number(s.value)).map(s => ({ stat: s.stat, value: int(s.value, -1e6, 1e6) })), durationH: int(d.durationH, 0, 8760),
    summon: d.sumOn && d.sumRef !== '' && d.sumRef != null ? { kind: d.sumKind, refId: int(d.sumRef, 0, 1e9), qty: d.sumKind === 'item' ? int(d.sumQty, 1, 99) : 1, durationH: int(d.sumH, 0, 8760) } : null };
};
/** Résumé lisible d'un effet (admin et jeu). */
export const fxSummary = e => {
  if (!e || !Object.keys(e).length) return '';
  const p = [TARGET_LABEL[e.target] ?? e.target];
  if (e.target !== 'self') p.push(`portée ${e.range ?? 4}`);
  if (e.target === 'area') p.push(`rayon ${e.radius}`);
  if (e.target !== 'self') p.push(AFFECTS_LABEL[e.affects] ?? e.affects);
  if (e.damage) p.push(`${e.damage} dégâts`);
  if (e.heal) p.push(`+${e.heal} PV`);
  if (e.dot) p.push(`${e.dot.damage} dégâts/h pendant ${e.dot.hours} h`);
  for (const s of e.stats ?? []) p.push(`${s.value > 0 ? '+' : ''}${s.value} ${STAT_LABEL[s.stat]?.split(' (')[0] ?? s.stat}`);
  if (e.durationH && (e.stats ?? []).some(s => !POOL_STATS.includes(s.stat))) p.push(`${e.durationH} h`);
  if (e.summon) p.push(`invoque : ${SUMMON_LABEL[e.summon.kind] ?? e.summon.kind} n°${e.summon.refId}${e.summon.qty > 1 ? ` ×${e.summon.qty}` : ''} ${e.summon.durationH ? `pendant ${e.summon.durationH} h` : '(permanent)'}`);
  return p.join(' · ');
};
