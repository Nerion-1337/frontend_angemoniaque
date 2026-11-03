import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
/** Arcanes, Reliques & Artefacts : objets uniques (plafond global, un seul détenteur par pièce). */
export default function Divine() {
  const d = useDispatch(), [rows, setRows] = useState(null), [n, setN] = useState({ kind: 'relique', nb: 1 });
  const load = () => api('/admin/content/divine').then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(load, []);
  const create = async () => { try { await api('/admin/content/divine', { kind: n.kind, n: +n.nb }, 'POST'); d(Ad.msg('Créé (dans la limite du plafond)')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="divine">
    <h3>Arcanes · Reliques · Artefacts</h3>
    {rows?.map(r => <p key={r.id} className="tag">{r.kind} n°{r.id} — {r.guardian ? `gardien : ${r.guardian}` : 'sans gardien'} → <b>{r.holder}</b></p>)}
    <div className="row"><select value={n.kind} onChange={e => setN({ ...n, kind: e.target.value })}>{['relique', 'arcane', 'artefact'].map(k => <option key={k}>{k}</option>)}</select>
      <input type="number" min="1" value={n.nb} onChange={e => setN({ ...n, nb: e.target.value })} />
      <button onClick={create}>Créer</button></div>
  </div>;
}
