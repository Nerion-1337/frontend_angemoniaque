// Section admin « Parchemins » : un parchemin (objet du catalogue) + des ressources permettent, en jeu, de fabriquer un objet,
// d'apprendre un sort ou de bâtir une copie d'un bâtiment modèle. Par recette : parchemin consommé ou non, à l'hôtel de ville
// seulement ou partout, coût en énergie.
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2 } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel, Search, matches } from './ui.jsx';
import { recipeBody, recipeDraft, TARGET_LABEL, resLabel } from './scrolls.js';

export default function ScrollsTab() {
  const d = useDispatch();
  const [rows, setRows] = useState(null), [cat, setCat] = useState({}), [bld, setBld] = useState([]), [edit, setEdit] = useState(null), [f, setF] = useState(recipeDraft()), [q, setQ] = useState(''), [res, setRes] = useState({ id: '', qty: 1 });
  const load = () => api('/admin/content/recipes').then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  useEffect(() => { api('/admin/catalog').then(setCat).catch(() => {}); api('/admin/content/buildings').then(setBld).catch(() => {}); }, []);
  const targets = { item: cat.items ?? [], spell: cat.spells ?? [], building: bld };
  const open = r => { setEdit(r ? r.id : 'new'); setF(recipeDraft(r)); };
  const save = async () => {
    try {
      await api(edit === 'new' ? '/admin/content/recipes' : `/admin/content/recipes/${edit}`, recipeBody(f), edit === 'new' ? 'POST' : 'PUT');
      d(Ad.ok('Parchemin enregistré')); setEdit(null); load();
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async r => { if (!confirmDel(`la recette du parchemin « ${r.scroll_name} »`)) return; try { await api(`/admin/content/recipes/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Recette supprimée')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const view = (rows ?? []).filter(r => matches(q, r.scroll_name, r.target_name));
  return <section>
    <p className="note">Un parchemin dans le sac + les ressources de sa recette permettent au joueur de fabriquer l'objet, d'apprendre le sort ou de bâtir le bâtiment lié
      (panneau « Actions », section Fabrication). Pour rendre un objet ou un sort obtenable SEULEMENT ainsi, retire-le de la boutique dans son onglet.</p>
    <div className="filterrow"><Search value={q} onChange={setQ} /><small>{view.length} parchemin(s)</small><span className="grow" />
      <button className="sm" onClick={() => open(null)}><Plus size={14} /> Nouveau parchemin</button></div>

    {edit && <div className="editor apanel">
      <h3>{edit === 'new' ? 'Nouveau parchemin' : `Parchemin — ${rows?.find(r => r.id === edit)?.scroll_name ?? ''}`}</h3>
      <div className="form">
        {edit === 'new' && <div className="cell span2"><small>Nom du parchemin (créé avec la recette)</small>
          <input placeholder="ex. Parchemin de la lame runique" value={f.newScrollName} onChange={e => setF({ ...f, newScrollName: e.target.value })} /></div>}
        <div className="cell"><small>Fabrique</small><select value={f.targetKind} onChange={e => setF({ ...f, targetKind: e.target.value, targetId: '', qtyOut: 1 })}>
          {Object.entries(TARGET_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
        <div className="cell span2"><small>{TARGET_LABEL[f.targetKind]} lié</small>
          <Pick options={targets[f.targetKind]} value={f.targetId} onPick={v => setF({ ...f, targetId: v })} labelOf={o => o.name} placeholder="— Choisir —" /></div>
        {f.targetKind === 'item' && <div className="cell"><small>Quantité produite</small><input type="number" min="1" value={f.qtyOut} onChange={e => setF({ ...f, qtyOut: e.target.value })} /></div>}
        <div className="cell"><small>Coût en énergie</small><input type="number" min="0" value={f.energyCost} onChange={e => setF({ ...f, energyCost: e.target.value })} /></div>
        <div className="cell span-all">
          <label className="check"><input type="checkbox" checked={f.consumeScroll} onChange={e => setF({ ...f, consumeScroll: e.target.checked })} /> Parchemin consommé à la fabrication</label>
          <label className="check"><input type="checkbox" checked={f.atCapital} onChange={e => setF({ ...f, atCapital: e.target.checked })} /> Fabrication seulement à l'hôtel de ville</label>
          {f.targetKind === 'building' && <p className="note">Le bâtiment fabriqué est une copie du modèle (structure, données), posée sur une case adjacente libre et appartenant au joueur.</p>}
        </div>
      </div>
      <h4>Ressources consommées</h4>
      <div className="row add"><Pick options={cat.resources ?? []} value={res.id} onPick={v => setRes({ ...res, id: v })} labelOf={o => o.name} placeholder="— Ressource —" />
        <input type="number" min="1" className="nb" value={res.qty} onChange={e => setRes({ ...res, qty: e.target.value })} />
        <button className="sm" disabled={!res.id} onClick={() => setF({ ...f, resources: { ...f.resources, [res.id]: Math.max(1, Number(res.qty) || 1) } })}><Plus size={14} /> Ajouter</button></div>
      {Object.keys(f.resources).length ? <div className="chips">{Object.entries(f.resources).map(([id, qty]) => <span key={id} className="chip on">{resLabel(cat.resources, id)} ×{qty}
        <button className="x-in" onClick={() => { const r = { ...f.resources }; delete r[id]; setF({ ...f, resources: r }); }}>×</button></span>)}</div> : <Empty>Aucune ressource : le parchemin seul suffit.</Empty>}
      <div className="actions"><button className="ghost" onClick={() => setEdit(null)}>Annuler</button><button className="primary" onClick={save}>Enregistrer</button></div>
    </div>}

    {rows && !rows.length && <Empty>Aucun parchemin de fabrication.</Empty>}
    {view.length > 0 && <div className="tablewrap"><table><thead><tr><th>Parchemin</th><th>Fabrique</th><th>Ressources</th><th>Énergie</th><th>Règles</th><th /></tr></thead><tbody>
      {view.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
        <td><b>{r.scroll_name}</b> <button className="sm" onClick={() => edit === r.id ? setEdit(null) : open(r)}>{edit === r.id ? 'Fermer' : 'Éditer'}</button></td>
        <td>{TARGET_LABEL[r.target_kind]} : <b>{r.target_name ?? `n°${r.target_id} (supprimé)`}</b>{r.qty_out > 1 ? ` ×${r.qty_out}` : ''}</td>
        <td>{Object.entries(r.resources ?? {}).map(([id, q]) => `${resLabel(cat.resources, id)} ×${q}`).join(', ') || '—'}</td>
        <td>{r.energy_cost ? `⚡${r.energy_cost}` : '—'}</td>
        <td><small>{r.consume_scroll ? 'consommé' : 'conservé'}{r.at_capital ? ' · hôtel de ville' : ''}</small></td>
        <td><button className="sm danger" title="Supprimer" onClick={() => del(r)}><Trash2 size={13} /></button></td>
      </tr>)}</tbody></table></div>}
  </section>;
}
