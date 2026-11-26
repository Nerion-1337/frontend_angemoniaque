// Onglet Sorts : éditeur des effets (moteur de sorts) dont l'invocation d'un élément ; fiches d'objet / bâtiment :
// sorts liés à l'élément avec leur mode d'application (ElementSpells).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2 } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import { STAT_LABEL, POOL_STATS, TARGET_LABEL, AFFECTS_LABEL, SUMMON_LABEL, LINK_MODES, modeLabel, fxSummary, fxBody } from '../lib/spellFx.js';

/** Catalogues des éléments invocables (chargés une fois par éditeur). */
function useSummonables() {
  const [cat, setCat] = useState({});
  useEffect(() => { Promise.all([api('/admin/catalog'), api('/admin/content/monsters'), api('/admin/content/buildings')])
    .then(([c, m, b]) => setCat({ monster: m, item: c.items, building: b, spells: c.spells })).catch(() => {}); }, []);
  return cat;
}

/** Éditeur contrôlé : `fx` = brouillon (fxDraft), `set` = setter du parent. */
export function SpellEffects({ fx, set }) {
  const u = (k, v) => set({ ...fx, [k]: v }), cat = useSummonables();
  const setStat = (i, k, v) => set({ ...fx, stats: fx.stats.map((s, j) => (j === i ? { ...s, [k]: v } : s)) });
  return <div className="spellfx">
    <label className="check"><input type="checkbox" checked={fx.on} onChange={e => u('on', e.target.checked)} /> Effets paramétrés (moteur de sorts)</label>
    {!fx.on ? <p className="note">Désactivé : le sort garde son comportement historique selon son genre (invocation, attaque, buff…).</p> : <>
      <div className="form">
        <div className="cell"><small>Cible</small><select value={fx.target} onChange={e => u('target', e.target.value)}>{Object.entries(TARGET_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
        {fx.target !== 'self' && <div className="cell"><small>Portée (cases)</small><input type="number" min="0" max="30" value={fx.range} onChange={e => u('range', e.target.value)} /></div>}
        {fx.target === 'area' && <div className="cell"><small>Rayon de la zone</small><input type="number" min="0" max="15" value={fx.radius} onChange={e => u('radius', e.target.value)} /></div>}
        {fx.target !== 'self' && <div className="cell"><small>Touche</small><select value={fx.affects} onChange={e => u('affects', e.target.value)}>{Object.entries(AFFECTS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>}
        <div className="cell"><small>Dégâts instantanés</small><input type="number" min="0" value={fx.damage} onChange={e => u('damage', e.target.value)} /></div>
        <div className="cell"><small>Soin instantané (PV)</small><input type="number" min="0" value={fx.heal} onChange={e => u('heal', e.target.value)} /></div>
        <div className="cell span2"><label className="check"><input type="checkbox" checked={fx.dotOn} onChange={e => u('dotOn', e.target.checked)} /> Dégâts sur la durée</label>
          {fx.dotOn && <div className="row"><input type="number" min="1" className="nb" value={fx.dotDamage} onChange={e => u('dotDamage', e.target.value)} /><small>dégâts / heure pendant</small>
            <input type="number" min="1" className="nb" value={fx.dotHours} onChange={e => u('dotHours', e.target.value)} /><small>h (jamais mortel)</small></div>}</div>
      </div>
      <h5>Caractéristiques (valeur positive = bonus, négative = malus)</h5>
      {fx.stats.map((s, i) => <div key={i} className="row">
        <select value={s.stat} onChange={e => setStat(i, 'stat', e.target.value)}>{Object.entries(STAT_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <input type="number" className="nb" value={s.value} onChange={e => setStat(i, 'value', e.target.value)} />
        <button className="sm danger" onClick={() => set({ ...fx, stats: fx.stats.filter((_, j) => j !== i) })}><Trash2 size={13} /></button></div>)}
      <button className="sm" onClick={() => set({ ...fx, stats: [...fx.stats, { stat: 'strength', value: 1 }] })}><Plus size={14} /> Caractéristique</button>
      {fx.stats.some(s => !POOL_STATS.includes(s.stat)) && <div className="row"><small>Durée des caractéristiques</small><input type="number" min="0" className="nb" value={fx.durationH} onChange={e => u('durationH', e.target.value)} /><small>h (0 = permanent)</small></div>}
      <h5>Invocation</h5>
      <label className="check"><input type="checkbox" checked={fx.sumOn} onChange={e => u('sumOn', e.target.checked)} /> Le sort invoque un élément</label>
      {fx.sumOn && <div className="row add">
        <select value={fx.sumKind} onChange={e => set({ ...fx, sumKind: e.target.value, sumRef: '' })}>{Object.entries(SUMMON_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <Pick options={cat[fx.sumKind] ?? []} value={fx.sumRef} onPick={v => u('sumRef', v)} labelOf={o => o.name} placeholder="— Choisir —" />
        {fx.sumKind === 'item' && <label className="inlabel"><small>×</small><input type="number" min="1" max="99" className="nb" value={fx.sumQty} onChange={e => u('sumQty', e.target.value)} /></label>}
        <label className="inlabel"><small>durée</small><input type="number" min="0" className="nb" value={fx.sumH} onChange={e => u('sumH', e.target.value)} /><small>h (0 = permanent)</small></label></div>}
      {fx.sumOn && <p className="note">Monstre : invocation de combat contrôlable près du lanceur (limite d'invocations) ; s'il est montable, le lanceur peut monter dessus. Objet : dans son sac.
        Bâtiment : copie posée près de lui, à lui. Temporaire : retiré à l'échéance (tick horaire).</p>}
      <p className="note">« Rendre / retirer » agit sur la valeur actuelle sans dépasser le maximum ; « max » change la capacité. Aperçu : {fxSummary(fxBody(fx)) || '—'}</p>
    </>}
  </div>;
}

/** Sorts liés à UN élément (fiche objet, bâtiment) avec leur mode d'application. */
export function ElementSpells({ kind, refId }) {
  const d = useDispatch(), cat = useSummonables(), [rows, setRows] = useState(null), [n, setN] = useState({ spellId: '', mode: LINK_MODES[kind][0][0] });
  const load = () => api(`/admin/content/element-spells?kind=${kind}&refId=${refId}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, [kind, refId]);   // corps de bloc
  const add = async () => { try { await api(`/admin/content/spells/${n.spellId}/links`, { kind, refId: Number(refId), mode: n.mode }, 'POST'); d(Ad.ok('Sort lié')); setN({ ...n, spellId: '' }); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async l => { if (!confirmDel(`le lien avec « ${l.spell_name} »`)) return; try { await api(`/admin/content/spells/${l.spell_id}/links/${kind}/${l.id}`, undefined, 'DELETE'); d(Ad.ok('Lien retiré')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="spelllinks">
    <h5>Sorts liés</h5>
    <div className="row add">
      <Pick options={cat.spells ?? []} value={n.spellId} onPick={v => setN({ ...n, spellId: v })} labelOf={o => o.name} placeholder="— Sort —" />
      <select value={n.mode} onChange={e => setN({ ...n, mode: e.target.value })}>{LINK_MODES[kind].map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
      <button className="sm" disabled={!n.spellId} onClick={add}><Plus size={14} /> Lier</button></div>
    {rows && !rows.length ? <Empty>Aucun sort lié.</Empty> : <div className="chips">{(rows ?? []).map(l => <span key={l.id} className="chip on">
      {l.spell_name} · {modeLabel(kind, l.mode)}<button className="x-in" onClick={() => del(l)}>×</button></span>)}</div>}
    <p className="note">Le sort agit selon ses propres effets (onglet Sorts). Au coup porté : sur l'adversaire touché, ou sur le porteur si le sort cible « soi-même » ;
      à l'attaque reçue : sur l'attaquant, ou sur le porteur. Ces déclenchements ne coûtent pas d'énergie.</p>
  </div>;
}
