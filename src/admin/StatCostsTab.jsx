// Section admin « Améliorations » : coût en XP de chaque caractéristique améliorable (onglet « Amélioration » de l'inventaire du joueur).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2, Save } from 'lucide-react';
import { Empty, confirmDel } from './ui.jsx';
import { STAT_LABEL, preview, ruleBody, newRule } from './statCosts.js';

export default function StatCostsTab() {
  const d = useDispatch(), [data, setData] = useState(null), [rows, setRows] = useState({}), [add, setAdd] = useState('');
  const load = () => api('/admin/content/stat-costs').then(x => { setData(x); setRows(Object.fromEntries(x.rules.map(r => [r.stat, r]))); }).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, []);   // corps de bloc
  const u = (s, k, v) => setRows({ ...rows, [s]: { ...rows[s], [k]: v } });
  const save = async s => { try { await api(`/admin/content/stat-costs/${s}`, ruleBody(rows[s]), 'PUT'); d(Ad.ok(`${STAT_LABEL[s] ?? s} : coûts enregistrés`)); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async s => { if (!confirmDel(`l'amélioration « ${STAT_LABEL[s] ?? s} » (elle ne pourra plus être achetée)`)) return; try { await api(`/admin/content/stat-costs/${s}`, undefined, 'DELETE'); d(Ad.ok('Amélioration retirée')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const free = (data?.stats ?? []).filter(s => !rows[s]);
  return <section>
    <p className="note">Coût en XP d'un point de caractéristique (onglet « Amélioration » de l'inventaire). Coût = base × multiplicateur du palier ; on change de palier
      toutes les « améliorations par palier » (palier 1, puis 2, puis 3 et au-delà). Une caractéristique absente de la liste ne s'améliore pas.</p>
    {data && !data.rules.length && <Empty>Aucune caractéristique améliorable.</Empty>}
    <div className="costgrid">{Object.values(rows).map(r => { const p = preview(ruleBody(r));
      return <div key={r.stat} className="apanel costcard"><div className="headrow"><b>{STAT_LABEL[r.stat] ?? r.stat}</b><span className="grow" />
        <button className="sm danger" title="Retirer" onClick={() => del(r.stat)}><Trash2 size={13} /></button></div>
        <div className="form">
          <div className="cell"><small>Coût de base (XP)</small><input type="number" min="0" value={r.base_xp_cost} onChange={e => u(r.stat, 'base_xp_cost', e.target.value)} /></div>
          <div className="cell"><small>Améliorations par palier</small><input type="number" min="1" value={r.numb_up} onChange={e => u(r.stat, 'numb_up', e.target.value)} /></div>
          {[1, 2, 3].map(i => <div key={i} className="cell"><small>× palier {i}{i === 3 ? ' et +' : ''}</small><input type="number" min="0" step="0.1" value={r[`multi_${i}`]} onChange={e => u(r.stat, `multi_${i}`, e.target.value)} /></div>)}
        </div>
        <small className="costprev">1er point : <b>{p.t1}</b> XP · palier 2 : <b>{p.t2}</b> · palier 3 : <b>{p.t3}</b> · {2 * Math.max(1, Number(r.numb_up) || 1)} premiers points : <b>{p.toT3}</b> XP</small>
        <div className="actions"><span className="grow" /><button className="primary sm" onClick={() => save(r.stat)}><Save size={13} /> Enregistrer</button></div></div>; })}</div>
    {free.length > 0 && <div className="row add"><select value={add} onChange={e => setAdd(e.target.value)}><option value="">— Rendre améliorable —</option>{free.map(s => <option key={s} value={s}>{STAT_LABEL[s] ?? s}</option>)}</select>
      <button className="sm" disabled={!add} onClick={() => { setRows({ ...rows, [add]: { stat: add, ...newRule() } }); setAdd(''); }}><Plus size={14} /> Ajouter</button><small>puis « Enregistrer » sur sa carte</small></div>}
  </section>;
}
