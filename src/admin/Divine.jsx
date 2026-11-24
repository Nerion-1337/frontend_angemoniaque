// Objets divins (rareté « Divin » de l'onglet Objets) :
//  - Divine : exemplaires uniques d'un objet divin (détenteur / gardien), création dans la limite du plafond
//    de la famille, suppression d'un exemplaire libre ;
//  - Families : familles divines (relique / arcane / artefact + familles libres) et leur plafond global.
import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { Plus, Trash2 } from 'lucide-react';
import { confirmDel, Empty } from './ui.jsx';
import { validFamilyKey, CORE_FAMILIES } from './divine.js';

export default function Divine({ itemId, onChange }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [nb, setNb] = useState(1);
  const load = () => api(`/admin/content/divine?itemId=${itemId}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, [itemId]);   // corps de bloc : l'effet ne retourne jamais la Promise du loader (crash unmount « destroy is not a function »)
  const create = async () => { try { const r = await api('/admin/content/divine', { itemId, n: +nb }, 'POST'); d(Ad.ok(`${r.created} exemplaire(s) créé(s)`)); load(); onChange?.(); } catch (e) { d(Ad.msg(e.message)); } };
  const del = async r => { if (!confirmDel(`l’exemplaire n°${r.id}`)) return; try { await api(`/admin/content/divine/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Exemplaire supprimé')); load(); onChange?.(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="divine">
    <div className="headrow"><h4>Exemplaires uniques</h4><span className="grow" />
      <input type="number" min="1" max="20" value={nb} onChange={e => setNb(e.target.value)} className="nb" />
      <button className="sm" onClick={create}><Plus size={14} /> Créer</button></div>
    {rows && !rows.length && <Empty>Aucun exemplaire : un objet divin n’existe en jeu qu’à travers ses exemplaires.</Empty>}
    {rows?.length > 0 && <div className="tablewrap"><table><thead><tr><th>N°</th><th>Famille</th><th>Détenteur</th><th>Gardien</th><th /></tr></thead><tbody>
      {rows.map(r => <tr key={r.id}><td>n°{r.id}</td><td>{r.kind}</td><td><b>{r.holder}</b></td><td>{r.guardian ?? '—'}</td>
        <td>{r.holder === 'libre' && <button className="sm danger" title="Supprimer" onClick={() => del(r)}><Trash2 size={13} /></button>}</td></tr>)}
    </tbody></table></div>}
  </div>;
}

/** Familles divines : liste, plafond éditable, création d'une nouvelle famille, suppression (familles libres et vides). */
export function Families({ fams, reload }) {
  const d = useDispatch(), [nf, setNf] = useState({ key: '', name: '', cap: '' }), [caps, setCaps] = useState({});
  const run = f => async () => { try { await f(); reload(); } catch (e) { d(Ad.msg(e.message)); } };
  const create = run(async () => {
    if (!validFamilyKey(nf.key)) throw new Error('Clé : minuscules, chiffres ou _, 2 à 30 caractères, commence par une lettre');
    await api('/admin/content/divine-families', { key: nf.key, name: nf.name.trim(), cap: nf.cap === '' ? null : Number(nf.cap) }, 'POST');
    d(Ad.ok('Famille créée')); setNf({ key: '', name: '', cap: '' });
  });
  const saveCap = fm => run(async () => { const v = caps[fm.key]; await api(`/admin/content/divine-families/${fm.key}`, { name: fm.name, cap: v === '' ? null : Number(v) }, 'PUT'); d(Ad.ok('Plafond enregistré')); });
  const del = fm => run(async () => { if (!confirmDel(`la famille « ${fm.name} »`)) return; await api(`/admin/content/divine-families/${fm.key}`, undefined, 'DELETE'); d(Ad.ok('Famille supprimée')); });
  return <div className="apanel families">
    <div className="headrow"><h3>Familles divines</h3><small>Plafond = nombre maximal d’exemplaires en jeu (vide = illimité)</small></div>
    <div className="famgrid">{fams.map(fm => <div key={fm.key} className="fam">
      <b>{fm.name}</b><small><code>{fm.key}</code> · {fm.copies} exemplaire(s), {fm.held} détenu(s)</small>
      <div className="row"><input type="number" min="0" className="nb" placeholder="∞" value={caps[fm.key] ?? (fm.cap ?? '')} onChange={e => setCaps({ ...caps, [fm.key]: e.target.value })} />
        <button className="sm" onClick={saveCap(fm)}>OK</button>
        {!CORE_FAMILIES.includes(fm.key) && <button className="sm danger" title="Supprimer" onClick={del(fm)}><Trash2 size={13} /></button>}</div>
    </div>)}
      <div className="fam new"><b>Nouvelle famille</b>
        <input placeholder="clé (ex. sceau)" value={nf.key} onChange={e => setNf({ ...nf, key: e.target.value.toLowerCase() })} />
        <input placeholder="nom (ex. Sceaux)" value={nf.name} onChange={e => setNf({ ...nf, name: e.target.value })} />
        <div className="row"><input type="number" min="0" className="nb" placeholder="∞" value={nf.cap} onChange={e => setNf({ ...nf, cap: e.target.value })} />
          <button className="sm" disabled={!nf.key || !nf.name.trim()} onClick={create}><Plus size={14} /> Créer</button></div></div>
    </div>
  </div>;
}
