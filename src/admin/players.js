// Helpers purs de la section admin « Joueurs » (testés dans test/adminPlayers.test.js).
export const RACE_LABEL = { human: 'Humains', angel: 'Anges', demon: 'Démons', nephilim: 'Néphilims' };
export const PLACE_LABEL = { equipped: 'Équipé', bag: 'Sac', chest: 'Coffre-fort' };
/** Caractéristiques éditables (même liste que le back EDITABLE), groupées pour le formulaire. */
export const STAT_GROUPS = [
  ['Vie & énergie', [['hp_current', 'PV'], ['hp_max', 'PV max'], ['energy_current', 'Énergie'], ['energy_max', 'Énergie max'], ['divine_energy_current', 'Énergie divine'], ['divine_energy_max', 'Énergie divine max'], ['recovery', 'Régén/h']]],
  ['Combat', [['strength', 'Force'], ['agility', 'Agilité'], ['armor', 'Armure'], ['range', 'Portée'], ['see', 'Vue']]],
  ['Progression', [['xp', 'XP'], ['gold', 'Or'], ['chest_size', 'Taille du coffre'], ['summon_cap', 'Invocations max']]],
];
export const STAT_KEYS = STAT_GROUPS.flatMap(([, f]) => f.map(([k]) => k));
/** Différence entre la fiche et le formulaire : seuls les champs modifiés, en entiers ≥ 0. */
export const statDiff = (orig, form) => {
  const out = {};
  for (const k of [...STAT_KEYS, 'specialization_id']) {
    if (form[k] === '' || form[k] == null) continue;
    const v = Math.max(0, Math.trunc(Number(form[k])));
    if (!Number.isNaN(v) && v !== Number(orig[k] ?? NaN)) out[k] = v;
  }
  return out;
};
/** Position lisible : « Monde 1 · 102, 98 » ou « — ». */
export const posLabel = r => (r.map_id == null ? '—' : `Monde ${r.map_id} · ${r.x}, ${r.y}`);
/** Numéros de pages à afficher (fenêtre autour de la page courante). */
export const pageWindow = (page, pages, w = 2) => {
  const a = Math.max(1, page - w), b = Math.min(pages, page + w), out = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
};
