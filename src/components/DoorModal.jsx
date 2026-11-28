// Fenêtre d'une porte (migration 48) : état, activation par objets divins (joueur de ce monde), franchissement et choix de la porte d'arrivée.
import { useEffect, useState } from 'react'; import Modal from './Modal'; import { api } from '../lib/api'; import { doorLines } from '../lib/doors';
export default function DoorModal({ id, me, close, done, toast }) {
  const [st, setSt] = useState(null), [n, setN] = useState(1), [choose, setChoose] = useState(null);
  const load = () => api(`/divine/door/${id}/${me.id}`).then(setSt).catch(e => { toast(e.message); close(); });
  useEffect(() => { load(); }, [id]);   // corps de bloc
  const cross = async to => { try { const r = await api('/divine/door', { characterId: me.id, buildingId: id, ...(to ? { toBuildingId: to } : {}) }); if (r.choose) setChoose(r.choose); else { toast(`${st.name} franchie`); done(); } } catch (e) { toast(e.message); } };
  const activate = async () => { try { await api(`/divine/door/${id}/activate`, { characterId: me.id, count: Number(n) }); toast(`${st.name} activée`); load(); } catch (e) { toast(e.message); } };
  return <Modal onClose={close} className="inv small" label={st?.name ?? 'Porte'}>
    {!st ? <p>…</p> : <>
      <h3>{st.name}</h3>
      {doorLines(st).map((l, i) => <p key={i} className="note">{l}</p>)}
      {st.can_activate && <div className="row"><label className="row">Activer avec <input type="number" min="1" max={Math.max(1, st.held)} value={n} onChange={e => setN(e.target.value)} style={{ width: '4em' }} /> {st.family}(s)</label>
        <small>({st.held} détenu{st.held > 1 ? 's' : ''} · {st.hours_per_item} h par objet)</small>
        <button className="primary" disabled={!st.held || Number(n) < 1 || Number(n) > st.held} onClick={activate}>Activer</button></div>}
      {choose ? <><h4>Où voulez-vous apparaître ?</h4><div className="row">{choose.map(c => <button key={c.id} className="primary" onClick={() => cross(c.id)}>{c.name}</button>)}</div></>
        : <div className="row"><button className="primary" disabled={!st.can_cross} onClick={() => cross()}>Franchir</button></div>}
    </>}
  </Modal>;
}
