import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
/** Pilotage : compteurs, répartition par race, simulation du tick, dernières actions d'audit. */
export default function Dashboard() {
  const d = useDispatch(), [st, setSt] = useState(null), [audit, setAudit] = useState([]);
  useEffect(() => {
    api('/admin/dashboard').then(setSt).catch(e => d(Ad.msg(e.message)));
    api('/admin/audit?limit=8').then(setAudit).catch(() => {});
  }, []);
  const tick = async () => { try { await api('/admin/tick', undefined, 'POST'); d(Ad.msg('+1 heure appliquée')); api('/admin/dashboard').then(setSt); } catch (e) { d(Ad.msg(e.message)); } };
  return <section>
    <h2>Pilotage</h2>
    {st && <div className="kpis">{Object.entries(st.counts).map(([k, v]) => <div key={k} className="kpi"><b>{v}</b><small>{k}</small></div>)}</div>}
    {st?.byRace.length > 0 && <p><b>Personnages par race</b> : {st.byRace.map(r => `${r.race} ×${r.n}`).join(' · ')}</p>}
    <div className="row"><button onClick={tick}>Simuler +1 heure</button>
      <small className="note">XP/régén/production des bâtiments (tick horaire).</small></div>
    <h3>Dernières actions d'administration</h3>
    <div className="auditlist">{audit.map(a => <p key={a.id} className="tag">{new Date(a.created_at).toLocaleString()} — <b>{a.actor}</b> · {a.action}{a.target ? ` ${a.target}` : ''}</p>)}
      {!audit.length && <p className="note">Aucune action enregistrée.</p>}</div>
  </section>;
}
