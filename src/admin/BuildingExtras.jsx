// Onglet Bâtiments (lot 4) : case occupable + attaques possibles contre l'occupant, production horaire par ressource,
// sorts de la structure (actifs pour le propriétaire à côté, passifs chaque heure).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import { fxSummary } from '../lib/spellFx.js'; import { groupDraft } from './building.js';

/** Bloc contrôlé : `draft.occupant_attack` et `draft.production` (fusionnés au corps par `buildingBody`). */
export function BuildingExtras({ draft, set, resources }) {
  const oa = draft.occupant_attack ?? { melee: true, ranged: true, spell: true }, prod = draft.production ?? {};
  const [res, setRes] = useState({ id: '', qty: 1 });
  const nameOf = id => (resources ?? []).find(r => String(r.id) === String(id))?.name ?? id;
  return <div className="bldextras">
    {draft.kind === 'capital' && <><h5>Coffre des joueurs de cette capitale</h5>
      <div className="row"><label className="inlabel">Taille de départ <input type="number" min="1" className="nb" placeholder="10" value={draft.chestStart ?? ''} onChange={e => set('chestStart', e.target.value)} /></label>
        <label className="inlabel">Capacité maximale <input type="number" min="1" className="nb" placeholder="sans limite" value={draft.chestMax ?? ''} onChange={e => set('chestMax', e.target.value)} /></label></div>
      <p className="note">La taille de départ s'applique aux personnages créés ensuite ; l'agrandissement (Hôtel de ville) s'arrête à la capacité maximale.</p></>}
    {draft.occupiable && <><h5>Occupant de la case — peut être attaqué</h5>
      <div className="row">{[['melee', 'Au corps à corps'], ['ranged', 'À distance'], ['spell', 'Par sort']].map(([k, l]) =>
        <label key={k} className="check"><input type="checkbox" checked={oa[k] !== false} onChange={e => set('occupant_attack', { ...oa, [k]: e.target.checked })} /> {l}</label>)}</div>
      <p className="note">L'occupant reçoit les bonus d'armure, de vue et de portée de la structure.</p></>}
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
    <p className="note">En continu : les effets partent de la case de la structure (zone = entités dans le rayon, camp relatif au propriétaire ; sinon l'occupant). Les effets se règlent dans l'onglet Sorts.</p>
  </div>;
}

/** Conditions d'activation (lot E) : options alternatives ; dans une option, tout ce qui est renseigné est exigé. */
const ACT_NOTE = <>Portail : conditions pour le franchir (remplacent l'objet divin historique). Autre structure : conditions pour déclencher ses sorts « à activer »
  au profit de l'activateur. Il suffit de remplir UNE option ; dans une option, tout ce qui est renseigné est exigé. Aucune option : comportement historique.</>;
/** Groupes de conditions alternatifs (bâtiments ; aussi conditions de récolte des ressources, avec `title` / `note` / `itemHint`). */
export function ActivationEditor({ groups, set, cat, title = 'Activation de la capacité', note = ACT_NOTE, itemHint = '— Objet (sac) —', consumeLabel = "Consommés à l'activation (objets, ressources, or ; objets divins rendus)" }) {
  const [pick, setPick] = useState({});   // sélections en cours par option : { [i]: { item, qty, res, rq } }
  const g = groups ?? [], up = (i, v) => set(g.map((x, j) => (j === i ? { ...x, ...v } : x)));
  const P = i => pick[i] ?? { item: '', qty: 1, res: '', rq: 1 }, setP = (i, v) => setPick({ ...pick, [i]: { ...P(i), ...v } });
  const name = (list, id) => (list ?? []).find(o => String(o.id) === String(id))?.name ?? id;
  const rankLabel = r => `${r.name} (${r.race}, palier ${r.current_rank})`;
  return <div className="bldextras activation">
    {title && <h5>{title}</h5>}
    <p className="note">{note}</p>
    {g.map((x, i) => <div key={i} className="actgroup apanel">
      <div className="headrow"><b>Option {i + 1}</b><span className="grow" /><button className="sm danger" onClick={() => set(g.filter((_, j) => j !== i))}>Retirer l'option</button></div>
      <div className="row add"><Pick options={cat.items ?? []} value={P(i).item} onPick={v => setP(i, { item: v })} labelOf={o => o.name} placeholder={itemHint} />
        <input type="number" min="1" className="nb" value={P(i).qty} onChange={e => setP(i, { qty: e.target.value })} />
        <button className="sm" disabled={!P(i).item} onClick={() => up(i, { items: [...x.items.filter(y => String(y.itemId) !== String(P(i).item)), { itemId: Number(P(i).item), qty: Math.max(1, Number(P(i).qty) || 1) }] })}><Plus size={14} /> Objet</button></div>
      {x.items.length > 0 && <div className="chips">{x.items.map(y => <span key={y.itemId} className="chip on">{name(cat.items, y.itemId)} ×{y.qty}<button className="x-in" onClick={() => up(i, { items: x.items.filter(z => z !== y) })}>×</button></span>)}</div>}
      <div className="row add"><Pick options={cat.resources ?? []} value={P(i).res} onPick={v => setP(i, { res: v })} labelOf={o => o.name} placeholder="— Ressource —" />
        <input type="number" min="1" className="nb" value={P(i).rq} onChange={e => setP(i, { rq: e.target.value })} />
        <button className="sm" disabled={!P(i).res} onClick={() => up(i, { resources: { ...x.resources, [P(i).res]: Math.max(1, Number(P(i).rq) || 1) } })}><Plus size={14} /> Ressource</button></div>
      {Object.keys(x.resources).length > 0 && <div className="chips">{Object.entries(x.resources).map(([k, q]) => <span key={k} className="chip on">{name(cat.resources, k)} ×{q}<button className="x-in" onClick={() => { const n = { ...x.resources }; delete n[k]; up(i, { resources: n }); }}>×</button></span>)}</div>}
      <div className="form">
        <div className="cell span2"><label className="check"><input type="checkbox" checked={x.divineOn} onChange={e => up(i, { divineOn: e.target.checked })} /> Objets divins détenus</label>
          {x.divineOn && <div className="row"><select value={x.divineFamily} onChange={e => up(i, { divineFamily: e.target.value })}><option value="">Toutes familles</option>
            {(cat.divineFamilies ?? []).map(f => <option key={f.key} value={f.key}>{f.name}</option>)}</select>
            <input type="number" min="1" className="nb" value={x.divineCount} onChange={e => up(i, { divineCount: e.target.value })} /></div>}</div>
        <div className="cell span2"><small>Sort connu</small><Pick options={cat.spells ?? []} value={x.spellId} onPick={v => up(i, { spellId: v })} labelOf={o => o.name} placeholder="— Aucun —" />
          {x.spellId !== '' && x.spellId != null && <button className="sm ghost" onClick={() => up(i, { spellId: '' })}>Retirer le sort</button>}</div>
        <div className="cell"><small>Or</small><input type="number" min="0" value={x.gold} onChange={e => up(i, { gold: e.target.value })} /></div>
        <div className="cell"><small>Rang minimum (palier, 0 = aucun)</small><input type="number" min="0" value={x.minRank} onChange={e => up(i, { minRank: e.target.value })} /></div>
        <div className="cell span2"><small>Ou l'un de ces rangs</small><Pick options={(cat.ranks ?? []).filter(r => !x.ranks.includes(r.id))} value="" onPick={v => up(i, { ranks: [...x.ranks, Number(v)] })} labelOf={rankLabel} placeholder="— Ajouter un rang —" />
          {x.ranks.length > 0 && <div className="chips">{x.ranks.map(r => <span key={r} className="chip on">{(cat.ranks ?? []).find(o => o.id === r)?.name ?? r}<button className="x-in" onClick={() => up(i, { ranks: x.ranks.filter(z => z !== r) })}>×</button></span>)}</div>}</div>
        <div className="cell span-all"><label className="check"><input type="checkbox" checked={x.consume} onChange={e => up(i, { consume: e.target.checked })} /> {consumeLabel}</label></div>
      </div>
    </div>)}
    <button className="sm" onClick={() => set([...g, groupDraft()])}><Plus size={14} /> Ajouter une option</button>
  </div>;
}
