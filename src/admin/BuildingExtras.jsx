// Onglet Bâtiments (lot 4) : case occupable + attaques possibles contre l'occupant, production horaire par ressource,
// sorts de la structure (actifs pour le propriétaire à côté, passifs chaque heure).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import { fxSummary } from './spellFx.js';

/** Bloc contrôlé : `draft.occupant_attack` et `draft.production` (fusionnés au corps par `buildingBody`). */
export function BuildingExtras({ draft, set, resources }) {
  const oa = draft.occupant_attack ?? { melee: true, ranged: true, spell: true }, prod = draft.production ?? {};
  const [res, setRes] = useState({ id: '', qty: 1 });
  const nameOf = id => (resources ?? []).find(r => String(r.id) === String(id))?.name ?? id;
  return <div className="bldextras">
    {draft.occupiable && <><h5>Occupant de la case — peut être attaqué</h5>
      <div className="row">{[['melee', 'Au corps à corps'], ['ranged', 'À distance'], ['spell', 'Par sort']].map(([k, l]) =>
        <label key={k} className="check"><input type="checkbox" checked={oa[k] !== false} onChange={e => set('occupant_attack', { ...oa, [k]: e.target.checked })} /> {l}</label>)}</div>
      <p className="note">L'occupant reçoit les bonus d'armure, de vue et de portée du bâtiment.</p></>}
    <h5>Extraction / production (par heure, pour le propriétaire)</h5>
    <div className="row add"><Pick options={resources ?? []} value={res.id} onPick={v => setRes({ ...res, id: v })} labelOf={o => o.name} placeholder="— Ressource —" />
      <input type="number" min="1" className="nb" value={res.qty} onChange={e => setRes({ ...res, qty: e.target.value })} /><small>/ h</small>
      <button className="sm" disabled={!res.id} onClick={() => set('production', { ...prod, [res.id]: Math.max(1, Number(res.qty) || 1) })}><Plus size={14} /> Ajouter</button></div>
    {Object.keys(prod).length ? <div className="chips">{Object.entries(prod).map(([k, q]) => <span key={k} className="chip on">{nameOf(k)} {q}/h
      <button className="x-in" onClick={() => { const n = { ...prod }; delete n[k]; set('production', n); }}>×</button></span>)}</div> : <Empty>Aucune production.</Empty>}
  </div>;
}

/** Sorts liés au bâtiment (enregistrés immédiatement). */
export function BuildingSpells({ id }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [spells, setSpells] = useState([]), [n, setN] = useState({ spellId: '', mode: 'passive' });
  const load = () => api(`/admin/content/buildings/${id}/spells`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, [id]);   // corps de bloc
  useEffect(() => { api('/admin/content/spells').then(setSpells).catch(() => {}); }, []);
  const add = async () => { try { await api(`/admin/content/spells/${n.spellId}/links`, { kind: 'building', refId: id, mode: n.mode }, 'POST'); d(Ad.ok('Sort lié')); setN({ ...n, spellId: '' }); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async r => { if (!confirmDel(`le lien avec « ${r.name} »`)) return; try { await api(`/admin/content/spells/${r.spell_id}/links/building/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Lien retiré')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="bldextras">
    <h5>Sorts de la structure</h5>
    <div className="row add"><Pick options={spells} value={n.spellId} onPick={v => setN({ ...n, spellId: v })} labelOf={o => o.name} placeholder="— Sort —" />
      <select value={n.mode} onChange={e => setN({ ...n, mode: e.target.value })}><option value="passive">En continu (chaque heure)</option><option value="active">À la demande (propriétaire à côté)</option></select>
      <button className="sm" disabled={!n.spellId} onClick={add}><Plus size={14} /> Lier</button></div>
    {rows && !rows.length ? <Empty>Aucun sort.</Empty> : <div className="chips">{(rows ?? []).map(r => <span key={r.id} className="chip on">{r.name} · {r.mode === 'passive' ? 'continu' : 'à la demande'}{fxSummary(r.effects) && <small> · {fxSummary(r.effects)}</small>}
      <button className="x-in" onClick={() => del(r)}>×</button></span>)}</div>}
    <p className="note">En continu : les effets partent de la case du bâtiment (zone = entités dans le rayon, camp relatif au propriétaire ; sinon l'occupant). Les effets se règlent dans l'onglet Sorts.</p>
  </div>;
}
