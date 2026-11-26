// Onglet Races & Rangs : conditions pour PASSER à ce rang. Deux voies indépendantes (définitive, temporaire), chacune
// facultative avec ses objets, ressources, énergie et consommation ; le joueur choisit la voie en jeu.
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Save } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty } from './ui.jsx';
import { MODES, reqDraft, reqBody } from './rankReq.js';

/** Une voie : objets du sac, ressources, énergie, consommation (+ durée pour la voie temporaire). */
function Path({ mode, label, c, set, cat }) {
  const [it, setIt] = useState({ id: '', qty: 1 }), [res, setRes] = useState({ id: '', qty: 1 });
  const nameOf = (list, id) => (list ?? []).find(x => String(x.id) === String(id))?.name ?? id;
  return <div className={`reqpath apanel${c.on ? '' : ' off'}`}>
    <label className="check"><input type="checkbox" checked={c.on} onChange={e => set({ ...c, on: e.target.checked })} /> <b>{label}</b></label>
    {!c.on ? <small className="muted">Non proposé pour ce rang.</small> : <>
      <div className="form">
        <div className="cell"><small>Coût en énergie</small><input type="number" min="0" value={c.energyCost} onChange={e => set({ ...c, energyCost: e.target.value })} /></div>
        <div className="cell"><small title="0 = aucune (par défaut) ; toujours payée par le personnage">Coût en énergie divine (0 = aucune)</small><input type="number" min="0" value={c.divineEnergyCost} onChange={e => set({ ...c, divineEnergyCost: e.target.value })} /></div>
        {mode === 'temporary' && <div className="cell"><small>Durée (heures)</small><input type="number" min="1" value={c.durationH} onChange={e => set({ ...c, durationH: e.target.value })} /></div>}
        <div className="cell span-all"><label className="check"><input type="checkbox" checked={c.consume} onChange={e => set({ ...c, consume: e.target.checked })} /> Objets et ressources consommés (sinon : seulement exigés)</label></div>
      </div>
      <h5>Objets (dans le sac)</h5>
      <div className="row add"><Pick options={cat.items ?? []} value={it.id} onPick={v => setIt({ ...it, id: v })} labelOf={o => o.name} placeholder="— Objet —" />
        <input type="number" min="1" className="nb" value={it.qty} onChange={e => setIt({ ...it, qty: e.target.value })} />
        <button className="sm" disabled={!it.id} onClick={() => set({ ...c, items: [...c.items.filter(x => String(x.itemId) !== String(it.id)), { itemId: Number(it.id), qty: Math.max(1, Number(it.qty) || 1) }] })}><Plus size={14} /> Ajouter</button></div>
      {c.items.length ? <div className="chips">{c.items.map(x => <span key={x.itemId} className="chip on">{nameOf(cat.items, x.itemId)} ×{x.qty}<button className="x-in" onClick={() => set({ ...c, items: c.items.filter(y => y.itemId !== x.itemId) })}>×</button></span>)}</div> : <Empty>Aucun objet.</Empty>}
      <h5>Ressources</h5>
      <div className="row add"><Pick options={cat.resources ?? []} value={res.id} onPick={v => setRes({ ...res, id: v })} labelOf={o => o.name} placeholder="— Ressource —" />
        <input type="number" min="1" className="nb" value={res.qty} onChange={e => setRes({ ...res, qty: e.target.value })} />
        <button className="sm" disabled={!res.id} onClick={() => set({ ...c, resources: { ...c.resources, [res.id]: Math.max(1, Number(res.qty) || 1) } })}><Plus size={14} /> Ajouter</button></div>
      {Object.keys(c.resources).length ? <div className="chips">{Object.entries(c.resources).map(([k, q]) => <span key={k} className="chip on">{nameOf(cat.resources, k)} ×{q}<button className="x-in" onClick={() => { const n = { ...c.resources }; delete n[k]; set({ ...c, resources: n }); }}>×</button></span>)}</div> : <Empty>Aucune ressource.</Empty>}
    </>}
  </div>;
}

export default function RankReq({ rank, catalog, onSaved }) {
  const d = useDispatch(), [r, setR] = useState(() => reqDraft(rank.requirements));
  const save = async () => { try { await api(`/admin/content/ranks/${rank.id}/requirements`, reqBody(r), 'PUT'); d(Ad.ok('Conditions de passage enregistrées')); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="rankreq">
    <div className="headrow"><h4>Passage au rang « {rank.name} »</h4></div>
    <p className="note">Les deux voies peuvent être proposées en même temps : le joueur choisit en jeu. XP requis : champ « XP requis (prérequis) » du rang, commun aux deux.
      Temporaire : à l'échéance, le joueur retrouve son rang et ses caractéristiques d'avant. Aucune voie cochée : seul le passage par objets divins reste possible (humains, anges, démons).</p>
    <div className="reqpaths">{MODES.map(([m, l]) => <Path key={m} mode={m} label={l} c={r[m]} set={v => setR({ ...r, [m]: v })} cat={catalog ?? {}} />)}</div>
    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer le passage</button></div>
  </div>;
}
