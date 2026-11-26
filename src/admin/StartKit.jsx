// Équipement de départ d'une race (races.start_kit) : rang, or, XP, ressources, objets (sac / coffre),
// et sorts reçus par un NOUVEAU personnage de cette race.
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Save, Trash2 } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty } from './ui.jsx';
import { kitDraft, kitBody, kitSummary } from './startKit.js';

export default function StartKit({ race, catalog, onSaved }) {
  const d = useDispatch(), [k, setK] = useState(() => kitDraft(race.start_kit)), [add, setAdd] = useState({ item: '', qty: 1, place: 'bag', spell: '', res: '', rqty: 1 });
  const cat = catalog ?? {}, nameOf = (list, id) => (list ?? []).find(x => String(x.id) === String(id))?.name ?? `n°${id}`;
  const save = async () => { try { await api(`/admin/content/races/${race.id}/start-kit`, kitBody(k), 'PUT'); d(Ad.ok('Équipement de départ enregistré')); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = (f, i) => setK({ ...k, [f]: k[f].filter((_, j) => j !== i) });
  return <div className="startkit">
    <div className="headrow"><h4>Équipement de départ — {race.name}</h4><small>{kitSummary(k)}</small></div>
    <div className="form">
      <div className="cell"><small>Rang de départ</small><select value={k.rank ?? ''} onChange={e => setK({ ...k, rank: e.target.value })}>
        <option value="">Premier palier</option>{(race.ranks ?? []).map(r => <option key={r.id} value={r.current_rank}>{r.current_rank} · {r.name}</option>)}</select></div>
      <div className="cell"><small>Or</small><input type="number" min="0" value={k.gold} onChange={e => setK({ ...k, gold: e.target.value })} /></div>
      <div className="cell"><small>XP</small><input type="number" min="0" value={k.xp} onChange={e => setK({ ...k, xp: e.target.value })} /></div>
    </div>

    <h5>Objets</h5>
    <div className="row add"><Pick options={cat.items} value={add.item} onPick={v => setAdd({ ...add, item: v })} labelOf={o => o.name} placeholder="— Objet —" />
      <input type="number" min="1" className="nb" value={add.qty} onChange={e => setAdd({ ...add, qty: e.target.value })} />
      <select value={add.place} onChange={e => setAdd({ ...add, place: e.target.value })}><option value="bag">Sac</option><option value="chest">Coffre-fort</option></select>
      <button className="sm" disabled={!add.item} onClick={() => setK({ ...k, items: [...k.items, { itemId: Number(add.item), qty: Number(add.qty) || 1, place: add.place }] })}><Plus size={14} /> Ajouter</button></div>
    {k.items.length ? <div className="chips">{k.items.map((it, i) => <span key={i} className="chip on">{nameOf(cat.items, it.itemId)} ×{it.qty} · {it.place === 'chest' ? 'coffre' : 'sac'}<button className="x-in" onClick={() => del('items', i)}>×</button></span>)}</div> : <Empty>Aucun objet.</Empty>}

    <h5>Sorts</h5>
    <div className="row add"><Pick options={cat.spells} value={add.spell} onPick={v => setAdd({ ...add, spell: v })} labelOf={o => o.name} placeholder="— Sort —" />
      <button className="sm" disabled={!add.spell || k.spells.includes(Number(add.spell))} onClick={() => setK({ ...k, spells: [...k.spells, Number(add.spell)] })}><Plus size={14} /> Ajouter</button></div>
    {k.spells.length ? <div className="chips">{k.spells.map((id, i) => <span key={id} className="chip on">{nameOf(cat.spells, id)}<button className="x-in" onClick={() => del('spells', i)}>×</button></span>)}</div> : <Empty>Aucun sort.</Empty>}


    <h5>Ressources</h5>
    <div className="row add"><Pick options={cat.resources} value={add.res} onPick={v => setAdd({ ...add, res: v })} labelOf={o => o.name} placeholder="— Ressource —" />
      <input type="number" min="1" className="nb" value={add.rqty} onChange={e => setAdd({ ...add, rqty: e.target.value })} />
      <button className="sm" disabled={!add.res} onClick={() => setK({ ...k, resources: { ...k.resources, [add.res]: Number(add.rqty) || 1 } })}><Plus size={14} /> Ajouter</button></div>
    {Object.keys(k.resources).length ? <div className="chips">{Object.entries(k.resources).map(([id, q]) => <span key={id} className="chip on">{nameOf(cat.resources, id)} ×{q}
      <button className="x-in" onClick={() => { const r = { ...k.resources }; delete r[id]; setK({ ...k, resources: r }); }}><Trash2 size={11} /></button></span>)}</div> : <Empty>Aucune ressource.</Empty>}

    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer le départ</button></div>
  </div>;
}
