// Section admin « Améliorations » : coût en XP de chaque caractéristique améliorable (onglet « Amélioration » de l'inventaire du joueur).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2, Save } from 'lucide-react';
import { Empty, confirmDel } from './ui.jsx';
import { STAT_LABEL, preview, ruleBody, newRule, multisOf, MAX_TIERS } from './statCosts.js';

export default function StatCostsTab() {
  const d = useDispatch(), [data, setData] = useState(null), [rows, setRows] = useState({}), [add, setAdd] = useState('');
  const load = () => api('/admin/content/stat-costs').then(x => { setData(x); setRows(Object.fromEntries(x.rules.map(r => [r.stat, { ...r, multis: multisOf(r) }]))); }).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, []);   // corps de bloc
  const u = (s, k, v) => setRows({ ...rows, [s]: { ...rows[s], [k]: v } });
  const um = (s, f) => u(s, 'multis', f([...rows[s].multis]));   // paliers : modifier, ajouter, retirer
  const save = async s => { try { await api(`/admin/content/stat-costs/${s}`, ruleBody(rows[s]), 'PUT'); d(Ad.ok(`${STAT_LABEL[s] ?? s} : coûts enregistrés`)); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async s => { if (!confirmDel(`l'amélioration « ${STAT_LABEL[s] ?? s} » (elle ne pourra plus être achetée)`)) return; try { await api(`/admin/content/stat-costs/${s}`, undefined, 'DELETE'); d(Ad.ok('Amélioration retirée')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const free = (data?.stats ?? []).filter(s => !rows[s]);
  return <section>
    <p className="note">Coût en XP d'un point de caractéristique (onglet « Amélioration » de l'inventaire). Coût = base × multiplicateur du palier ; on change de palier
      toutes les « améliorations par palier » ; le dernier palier vaut ensuite pour tous les points. « + Palier » en ajoute un (jusqu'à {MAX_TIERS}). Une caractéristique absente de la liste ne s'améliore pas.</p>
    {data && !data.rules.length && <Empty>Aucune caractéristique améliorable.</Empty>}
    <div className="costgrid">{Object.values(rows).map(r => { const p = preview(ruleBody(r));
      return <div key={r.stat} className="apanel costcard"><div className="headrow"><b>{STAT_LABEL[r.stat] ?? r.stat}</b><span className="grow" />
        <button className="sm danger" title="Retirer" onClick={() => del(r.stat)}><Trash2 size={13} /></button></div>
        <div className="form">
          <div className="cell"><small>Coût de base (XP)</small><input type="number" min="0" value={r.base_xp_cost} onChange={e => u(r.stat, 'base_xp_cost', e.target.value)} /></div>
          <div className="cell"><small>Améliorations par palier</small><input type="number" min="1" value={r.numb_up} onChange={e => u(r.stat, 'numb_up', e.target.value)} /></div>
          {r.multis.map((m, i) => <div key={i} className="cell"><small>× palier {i + 1}{i === r.multis.length - 1 ? ' et +' : ''}
            {r.multis.length > 1 && <button className="tierx" title={`Retirer le palier ${i + 1}`} onClick={() => um(r.stat, a => { a.splice(i, 1); return a; })}>×</button>}</small>
            <input type="number" min="0" step="0.1" value={m} onChange={e => um(r.stat, a => { a[i] = e.target.value; return a; })} /></div>)}
          {r.multis.length < MAX_TIERS && <div className="cell"><small>&nbsp;</small><button className="sm" onClick={() => um(r.stat, a => [...a, Number(a[a.length - 1]) + 1 || 1])}><Plus size={13} /> Palier</button></div>}
        </div>
        <small className="costprev">1er point de chaque palier : {p.firsts.map((x, i) => <span key={i}>{i ? ' · ' : ''}<b>{x}</b></span>)} XP · jusqu'au palier {r.multis.length} : <b>{p.toLast}</b> XP</small>
        <div className="actions"><span className="grow" /><button className="primary sm" onClick={() => save(r.stat)}><Save size={13} /> Enregistrer</button></div></div>; })}</div>
    {free.length > 0 && <div className="row add"><select value={add} onChange={e => setAdd(e.target.value)}><option value="">— Rendre améliorable —</option>{free.map(s => <option key={s} value={s}>{STAT_LABEL[s] ?? s}</option>)}</select>
      <button className="sm" disabled={!add} onClick={() => { setRows({ ...rows, [add]: { stat: add, ...newRule() } }); setAdd(''); }}><Plus size={14} /> Ajouter</button><small>puis « Enregistrer » sur sa carte</small></div>}
  </section>;
}
