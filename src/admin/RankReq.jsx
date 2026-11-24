// Onglet Races & Rangs : conditions pour PASSER à ce rang (objets, ressources, énergie, définitif / temporaire, consommation).
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Save } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty } from './ui.jsx';
import { reqDraft, reqBody } from './rankReq.js';

export default function RankReq({ rank, catalog, onSaved }) {
  const d = useDispatch(), [r, setR] = useState(() => reqDraft(rank.requirements)), [it, setIt] = useState({ id: '', qty: 1 }), [res, setRes] = useState({ id: '', qty: 1 });
  const cat = catalog ?? {}, nameOf = (list, id) => (list ?? []).find(x => String(x.id) === String(id))?.name ?? id;
  const save = async () => { try { await api(`/admin/content/ranks/${rank.id}/requirements`, reqBody(r), 'PUT'); d(Ad.ok('Conditions de passage enregistrées')); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="rankreq">
    <div className="headrow"><h4>Passage au rang « {rank.name} »</h4></div>
    <label className="check"><input type="checkbox" checked={r.on} onChange={e => setR({ ...r, on: e.target.checked })} /> Passage par conditions (depuis le rang précédent)</label>
    {!r.on ? <p className="note">Désactivé : aucun passage par conditions vers ce rang (le passage par objets divins reste possible pour humains, anges et démons).</p> : <>
      <div className="form">
        <div className="cell"><small>Coût en énergie</small><input type="number" min="0" value={r.energyCost} onChange={e => setR({ ...r, energyCost: e.target.value })} /></div>
        <div className="cell span2"><small>Type de passage</small><div className="seg2">{[['permanent', 'Définitif'], ['temporary', 'Temporaire']].map(([k, l]) =>
          <button key={k} className={`chip${r.mode === k ? ' on' : ''}`} onClick={() => setR({ ...r, mode: k })}>{l}</button>)}</div></div>
        {r.mode === 'temporary' && <div className="cell"><small>Durée (heures)</small><input type="number" min="1" value={r.durationH} onChange={e => setR({ ...r, durationH: e.target.value })} /></div>}
        <div className="cell span-all"><label className="check"><input type="checkbox" checked={r.consume} onChange={e => setR({ ...r, consume: e.target.checked })} /> Objets et ressources consommés (sinon : seulement exigés)</label></div>
      </div>
      <p className="note">XP requis : champ « XP requis (prérequis) » du rang. Temporaire : à l'échéance, le joueur retrouve son rang et ses caractéristiques d'avant.</p>
      <h5>Objets (dans le sac)</h5>
      <div className="row add"><Pick options={cat.items ?? []} value={it.id} onPick={v => setIt({ ...it, id: v })} labelOf={o => o.name} placeholder="— Objet —" />
        <input type="number" min="1" className="nb" value={it.qty} onChange={e => setIt({ ...it, qty: e.target.value })} />
        <button className="sm" disabled={!it.id} onClick={() => setR({ ...r, items: [...r.items.filter(x => String(x.itemId) !== String(it.id)), { itemId: Number(it.id), qty: Math.max(1, Number(it.qty) || 1) }] })}><Plus size={14} /> Ajouter</button></div>
      {r.items.length ? <div className="chips">{r.items.map(x => <span key={x.itemId} className="chip on">{nameOf(cat.items, x.itemId)} ×{x.qty}<button className="x-in" onClick={() => setR({ ...r, items: r.items.filter(y => y.itemId !== x.itemId) })}>×</button></span>)}</div> : <Empty>Aucun objet.</Empty>}
      <h5>Ressources</h5>
      <div className="row add"><Pick options={cat.resources ?? []} value={res.id} onPick={v => setRes({ ...res, id: v })} labelOf={o => o.name} placeholder="— Ressource —" />
        <input type="number" min="1" className="nb" value={res.qty} onChange={e => setRes({ ...res, qty: e.target.value })} />
        <button className="sm" disabled={!res.id} onClick={() => setR({ ...r, resources: { ...r.resources, [res.id]: Math.max(1, Number(res.qty) || 1) } })}><Plus size={14} /> Ajouter</button></div>
      {Object.keys(r.resources).length ? <div className="chips">{Object.entries(r.resources).map(([k, q]) => <span key={k} className="chip on">{nameOf(cat.resources, k)} ×{q}<button className="x-in" onClick={() => { const n = { ...r.resources }; delete n[k]; setR({ ...r, resources: n }); }}>×</button></span>)}</div> : <Empty>Aucune ressource.</Empty>}
    </>}
    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer le passage</button></div>
  </div>;
}
