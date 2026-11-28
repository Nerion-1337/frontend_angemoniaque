// Fenêtre d'une structure (migrations 48-49) : état d'activation, éléments d'activation (chacun sa durée ; un élément consommé peut
// être payé plusieurs fois), conditions supplémentaires ; porte : portes en face, franchissement et choix de la porte d'arrivée.
import { useEffect, useState } from 'react'; import Modal from './Modal'; import { api } from '../lib/api'; import { doorLines, activeLine } from '../lib/doors';
export default function StructureModal({ id, me, close, done, toast }) {
  const [st, setSt] = useState(null), [times, setTimes] = useState({}), [choose, setChoose] = useState(null);
  const load = () => api(`/buildings/${id}/state/${me.id}`).then(setSt).catch(e => { toast(e.message); close(); });
  useEffect(() => { load(); }, [id]);   // corps de bloc
  const cross = async to => { try { const r = await api('/divine/door', { characterId: me.id, buildingId: id, ...(to ? { toBuildingId: to } : {}) }); if (r.choose) setChoose(r.choose); else { toast(`${st.name} franchie`); done(); } } catch (e) { toast(e.message); } };
  const activate = async el => { try { const r = await api(`/buildings/${id}/activate`, { characterId: me.id, ...(el ? { element: el.index, times: Number(times[el.index] ?? 1) } : {}) });
    toast(`${st.name} activée${r.results?.length ? ` : ${r.results.map(y => `${y.spell} → ${y.effect}`).join(' ; ')}` : ''}`); load(); } catch (e) { toast(e.message); } };
  return <Modal onClose={close} className="inv small" label={st?.name ?? 'Structure'}>
    {!st ? <p>…</p> : <>
      <h3>{st.name}</h3>
      {st.door && doorLines(st).map((l, i) => <p key={i} className="note">{l}</p>)}
      {!st.door && <p className="note">{activeLine(st)}</p>}
      {st.race_note && <p className="note err">{st.race_note}</p>}
      {st.conditions && <p className="note">Conditions en plus : {st.conditions}</p>}
      {st.elements.length > 0 && <><h4>Activer avec</h4>
        {st.elements.map(el => { const n = Number(times[el.index] ?? 1);
          return <div key={el.index} className="item row2"><span>{el.label}{el.missing && <><br /><small className="err">{el.missing}</small></>}</span>
            <span className="row">{el.max_times > 1 && <label className="row"><small>×</small><input type="number" min="1" max={el.max_times} value={times[el.index] ?? 1} onChange={e => setTimes({ ...times, [el.index]: e.target.value })} style={{ width: '4em' }} /></label>}
              <button className="primary" disabled={!st.can_activate || !!el.missing || n < 1 || n > el.max_times} onClick={() => activate(el)}>Activer</button></span></div>; })}</>}
      {!st.elements.length && st.conditions && <div className="row"><button className="primary" disabled={!st.can_activate} onClick={() => activate(null)}>Activer</button></div>}
      {st.door && (choose ? <><h4>Où voulez-vous apparaître ?</h4><div className="row">{choose.map(c => <button key={c.id} className="primary" onClick={() => cross(c.id)}>{c.name}</button>)}</div></>
        : <div className="row"><button className="primary" disabled={!st.can_cross} onClick={() => cross()}>Franchir</button></div>)}
    </>}
  </Modal>;
}
