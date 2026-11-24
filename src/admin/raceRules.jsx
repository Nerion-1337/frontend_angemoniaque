// Races : zone d'apparition des nouveaux personnages et limites de personnages (migration 17).
// Vide = comportement par défaut : capitale de la race / pas de limite.
export const RULE_KEYS = ['spawn_map_id', 'spawn_x', 'spawn_y', 'spawn_radius', 'max_per_account', 'max_total'];
/** Valeurs du formulaire depuis la race (null → ''). */
export const rulesDraft = r => Object.fromEntries(RULE_KEYS.map(k => [k, r?.[k] ?? (k === 'spawn_radius' ? 4 : k === 'max_per_account' && !r ? 3 : '')]));
/** Corps envoyé au back : '' → null (défaut / illimité), nombres entiers ; sans monde, la zone est remise à la capitale. */
export const rulesBody = f => {
  const n = v => (v === '' || v == null ? null : Math.max(0, Math.trunc(Number(v))));
  const b = Object.fromEntries(RULE_KEYS.map(k => [k, n(f[k])]));
  if (b.spawn_map_id == null) { b.spawn_x = null; b.spawn_y = null; }
  b.spawn_radius = b.spawn_radius ?? 4;
  return b;
};
/** Résumé lisible : « Apparition : Monde 3 · 40, 60 (± 3) · 3 / compte · population ≤ 500 ». */
export const rulesLabel = r => [
  r.spawn_map_id != null ? `Apparition : Monde ${r.spawn_map_id} · ${r.spawn_x}, ${r.spawn_y} (± ${r.spawn_radius ?? 4})` : 'Apparition : capitale',
  r.max_per_account != null ? `${r.max_per_account} / compte` : 'illimité / compte',
  r.max_total != null ? `population ≤ ${r.max_total}` : null,
].filter(Boolean).join(' · ');

/** Bloc du formulaire de race : monde + centre + rayon, limites par compte et population. */
export function RaceRules({ draft, set, maps }) {
  const v = k => draft[k] ?? '', on = k => e => set({ ...draft, [k]: e.target.value });
  const m = (maps ?? []).find(x => String(x.id) === String(draft.spawn_map_id));
  return <div className="racerules">
    <h4>Apparition des nouveaux personnages</h4>
    <div className="form">
      <div className="cell"><small>Monde</small><select value={v('spawn_map_id')} onChange={on('spawn_map_id')}>
        <option value="">Capitale de la race (défaut)</option>
        {(maps ?? []).map(x => <option key={x.id} value={x.id}>Monde {x.id} · {x.name_file} ({x.width}×{x.height})</option>)}</select></div>
      {draft.spawn_map_id !== '' && <>
        <div className="cell"><small>Centre X{m ? ` (0–${m.width - 1})` : ''}</small><input type="number" min="0" value={v('spawn_x')} onChange={on('spawn_x')} /></div>
        <div className="cell"><small>Centre Y{m ? ` (0–${m.height - 1})` : ''}</small><input type="number" min="0" value={v('spawn_y')} onChange={on('spawn_y')} /></div>
        <div className="cell"><small>Rayon de la zone (cases)</small><input type="number" min="0" max="100" value={v('spawn_radius')} onChange={on('spawn_radius')} /></div>
      </>}
    </div>
    <p className="note">Case libre tirée au hasard dans le carré centre ± rayon (jamais sur l’eau ni la lave) ; la zone s’élargit si elle est pleine.</p>
    <h4>Limites de personnages</h4>
    <div className="form">
      <div className="cell"><small>Par compte (vide = illimité)</small><input type="number" min="0" value={v('max_per_account')} onChange={on('max_per_account')} /></div>
      <div className="cell"><small>Population totale (vide = illimitée)</small><input type="number" min="0" value={v('max_total')} onChange={on('max_total')} /></div>
    </div>
    <p className="note">Le compte administrateur n’est soumis à aucune limite (ni à la règle « une seule race par compte »).</p>
  </div>;
}
