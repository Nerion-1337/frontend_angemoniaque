// Section admin « Ressources » : gisements par monde — ressource du catalogue, zone (rectangle ou case unique), stock partagé,
// régénération par heure, quantité par récolte. Hors gisement, la récolte du terrain reste illimitée (+1).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2 } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import { depositDraft, depositBody, zoneLabel } from './deposits.js';
import { WORLD_LABEL } from './tiles.js';

export default function ResourcesTab() {
  const d = useDispatch();
  const [maps, setMaps] = useState([]), [res, setRes] = useState([]), [world, setWorld] = useState(1), [rows, setRows] = useState(null), [edit, setEdit] = useState(null), [f, setF] = useState(depositDraft());
  const load = () => api(`/admin/content/deposits?mapId=${world}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); setEdit(null); }, [world]);   // corps de bloc
  useEffect(() => { api('/admin/catalog').then(c => { setMaps(c.maps ?? []); setRes(c.resources ?? []); }).catch(() => {}); }, []);
  const m = maps.find(x => x.id === world);
  const open = r => { setEdit(r ? r.id : 'new'); setF(depositDraft(r, world)); };
  const save = async () => {
    try { await api(edit === 'new' ? '/admin/content/deposits' : `/admin/content/deposits/${edit}`, depositBody(f, world), edit === 'new' ? 'POST' : 'PUT'); d(Ad.ok('Gisement enregistré')); setEdit(null); load(); }
    catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async r => { if (!confirmDel(`le gisement de ${r.resource_name}`)) return; try { await api(`/admin/content/deposits/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Gisement supprimé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const u = (k, v) => setF({ ...f, [k]: v });
  return <section>
    <p className="note">Un gisement place une ressource sur une zone d'un monde avec un stock partagé : chaque récolte sur une case de la zone en retire
      la quantité par récolte ; le stock se régénère chaque heure jusqu'au maximum. Stock vide = « gisement épuisé ». Hors gisement, chaque case garde la ressource de son terrain (récolte illimitée).</p>
    <div className="tabs">{(maps.length ? maps : [{ id: 1 }, { id: 2 }, { id: 3 }]).map(x => <button key={x.id} className={world === x.id ? 'on' : ''} onClick={() => setWorld(x.id)}>{WORLD_LABEL[x.id] ?? x.name_file}</button>)}</div>
    <div className="filterrow"><small>{rows ? `${rows.length} gisement(s)` : 'Chargement…'}{m ? ` · monde ${m.width}×${m.height}` : ''}</small><span className="grow" />
      <button className="sm" onClick={() => open(null)}><Plus size={14} /> Nouveau gisement</button></div>
    {edit && <div className="editor apanel">
      <h3>{edit === 'new' ? 'Nouveau gisement' : 'Gisement'} — {WORLD_LABEL[world] ?? `monde ${world}`}</h3>
      <div className="form">
        <div className="cell span2"><small>Ressource</small><Pick options={res} value={f.resource} onPick={v => u('resource', v)} labelOf={o => `${o.name}${o.group ? ` · ${o.group}` : ''}`} placeholder="— Ressource —" /></div>
        <div className="cell span2"><small>Zone</small><div className="seg2">{[['cell', 'Case unique'], ['rect', 'Rectangle']].map(([k, l]) =>
          <button key={k} className={`chip${f.shape === k ? ' on' : ''}`} onClick={() => u('shape', k)}>{l}</button>)}</div></div>
        <div className="cell"><small>X{f.shape === 'rect' ? ' min' : ''}{m ? ` (0–${m.width - 1})` : ''}</small><input type="number" min="0" value={f.xMin} onChange={e => u('xMin', e.target.value)} /></div>
        <div className="cell"><small>Y{f.shape === 'rect' ? ' min' : ''}{m ? ` (0–${m.height - 1})` : ''}</small><input type="number" min="0" value={f.yMin} onChange={e => u('yMin', e.target.value)} /></div>
        {f.shape === 'rect' && <><div className="cell"><small>X max</small><input type="number" min="0" value={f.xMax} onChange={e => u('xMax', e.target.value)} /></div>
          <div className="cell"><small>Y max</small><input type="number" min="0" value={f.yMax} onChange={e => u('yMax', e.target.value)} /></div></>}
        <div className="cell"><small>Stock maximum</small><input type="number" min="1" value={f.stockMax} onChange={e => u('stockMax', e.target.value)} /></div>
        <div className="cell"><small>Stock actuel</small><input type="number" min="0" value={f.stock} onChange={e => u('stock', e.target.value)} /></div>
        <div className="cell"><small>Régénération / heure</small><input type="number" min="0" value={f.regenPerH} onChange={e => u('regenPerH', e.target.value)} /></div>
        <div className="cell"><small>Quantité par récolte</small><input type="number" min="1" value={f.yieldPerHarvest} onChange={e => u('yieldPerHarvest', e.target.value)} /></div>
        <div className="cell span-all"><label className="check"><input type="checkbox" checked={f.active} onChange={e => u('active', e.target.checked)} /> Actif</label></div>
      </div>
      <div className="actions"><button className="ghost" onClick={() => setEdit(null)}>Annuler</button><button className="primary" disabled={!f.resource} onClick={save}>Enregistrer</button></div>
    </div>}
    {rows && !rows.length && <Empty>Aucun gisement sur ce monde.</Empty>}
    {rows?.length > 0 && <div className="tablewrap"><table><thead><tr><th>Ressource</th><th>Zone</th><th>Stock</th><th>Régén.</th><th>Par récolte</th><th /></tr></thead><tbody>
      {rows.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
        <td><b>{r.resource_name}</b>{!r.active && <small> · inactif</small>} <button className="sm" onClick={() => edit === r.id ? setEdit(null) : open(r)}>{edit === r.id ? 'Fermer' : 'Éditer'}</button></td>
        <td>{zoneLabel(r)}</td><td><span className={`stockbar${r.stock ? '' : ' empty0'}`}><i style={{ '--p': (100 * r.stock) / r.stock_max }} /></span> {r.stock} / {r.stock_max}</td>
        <td>+{r.regen_per_h}/h</td><td>{r.yield_per_harvest}</td>
        <td><button className="sm danger" title="Supprimer" onClick={() => del(r)}><Trash2 size={13} /></button></td></tr>)}</tbody></table></div>}
  </section>;
}
