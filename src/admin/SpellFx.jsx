// Onglet Sorts : éditeur des effets (moteur de sorts, lot 2) et liens du sort avec monstres / objets / montures / bâtiments.
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2 } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import { STAT_LABEL, POOL_STATS, TARGET_LABEL, AFFECTS_LABEL, fxSummary, fxBody } from './spellFx.js';

/** Éditeur contrôlé : `fx` = brouillon (fxDraft), `set` = setter du parent. */
export function SpellEffects({ fx, set }) {
  const u = (k, v) => set({ ...fx, [k]: v });
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
      <p className="note">« Rendre / retirer » agit sur la valeur actuelle sans dépasser le maximum ; « max » change la capacité. Aperçu : {fxSummary(fxBody(fx)) || '—'}</p>
    </>}
  </div>;
}

const KIND_LABEL = { monster: 'Monstre', item: 'Objet (équipé)', mount: 'Monture (active)', building: 'Bâtiment' };
/** Liens d'un sort existant : actif = lançable par le porteur ; passif = appliqué chaque heure au porteur. */
export function SpellLinks({ spellId }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [cat, setCat] = useState({}), [n, setN] = useState({ kind: 'item', refId: '', mode: 'active' });
  const load = () => api(`/admin/content/spells/${spellId}/links`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, [spellId]);   // corps de bloc
  useEffect(() => { Promise.all([api('/admin/catalog'), api('/admin/content/monsters'), api('/admin/content/buildings')]).then(([c, m, b]) => setCat({ item: c.items, mount: c.mounts, monster: m, building: b })).catch(() => {}); }, []);
  const add = async () => { try { await api(`/admin/content/spells/${spellId}/links`, { kind: n.kind, refId: Number(n.refId), mode: n.mode }, 'POST'); d(Ad.ok('Lien ajouté')); setN({ ...n, refId: '' }); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async l => { if (!confirmDel(`le lien avec « ${l.name} »`)) return; try { await api(`/admin/content/spells/${spellId}/links/${l.kind}/${l.id}`, undefined, 'DELETE'); d(Ad.ok('Lien retiré')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="spelllinks">
    <h5>Liens du sort</h5>
    <div className="row add">
      <select value={n.kind} onChange={e => setN({ ...n, kind: e.target.value, refId: '' })}>{Object.entries(KIND_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
      <Pick options={cat[n.kind] ?? []} value={n.refId} onPick={v => setN({ ...n, refId: v })} labelOf={o => o.name} placeholder="— Choisir —" />
      <select value={n.mode} onChange={e => setN({ ...n, mode: e.target.value })}><option value="active">Actif (à la demande)</option><option value="passive">Passif (en continu)</option></select>
      <button className="sm" disabled={!n.refId} onClick={add}><Plus size={14} /> Lier</button></div>
    {rows && !rows.length ? <Empty>Aucun lien.</Empty> : <div className="chips">{(rows ?? []).map(l => <span key={`${l.kind}${l.id}`} className="chip on">
      {KIND_LABEL[l.kind].split(' (')[0]} : {l.name} · {l.mode === 'passive' ? 'passif' : 'actif'}<button className="x-in" onClick={() => del(l)}>×</button></span>)}</div>}
    <p className="note">Objet : lançable (actif) ou appliqué chaque heure (passif) quand il est équipé. Monture : idem quand elle est active. Monstre : capacité du monstre. Bâtiment : effets de la structure (lot bâtiments).</p>
  </div>;
}
