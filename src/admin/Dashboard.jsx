import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { Users, Castle, Sword, MessageSquare, RefreshCw, Hourglass } from 'lucide-react';
import { Search, matches, Empty } from './ui.jsx'; import { RACE_LABEL } from './players.js';
/** Pilotage : compteurs, répartition par race, simulation du tick, journal d'audit filtrable. */
const KPI = { characters: ['Personnages', Users], buildings: ['Bâtiments', Castle], items: ['Objets', Sword], messages: ['Messages', MessageSquare] };
const ago = t => { const s = Math.round((Date.now() - new Date(t)) / 1000); if (s < 60) return 'à l’instant'; if (s < 3600) return `il y a ${Math.floor(s / 60)} min`; if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`; return new Date(t).toLocaleDateString(); };
export default function Dashboard() {
  const d = useDispatch(), [st, setSt] = useState(null), [audit, setAudit] = useState(null), [busy, setBusy] = useState(false), [q, setQ] = useState(''), [limit, setLimit] = useState(10);
  const load = () => {
    api('/admin/dashboard').then(setSt).catch(e => d(Ad.msg(e.message)));
    api(`/admin/audit?limit=${limit}`).then(setAudit).catch(() => setAudit([]));
  };
  useEffect(() => { load(); }, [limit]);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const tick = async () => { setBusy(true); try { await api('/admin/tick', undefined, 'POST'); d(Ad.ok('+1 heure appliquée')); load(); } catch (e) { d(Ad.msg(e.message)); } finally { setBusy(false); } };
  const total = st?.byRace.reduce((a, r) => a + r.n, 0) || 0;
  const rows = (audit ?? []).filter(a => matches(q, a.actor, a.action, a.target));
  return <section className="dash">
    <div className="kpis">{st ? Object.entries(st.counts).map(([k, v]) => { const [l, I] = KPI[k] ?? [k, Users]; return <div key={k} className="kpi"><I size={20} /><b>{v.toLocaleString()}</b><small>{l}</small></div>; })
      : [0, 1, 2, 3].map(i => <div key={i} className="kpi skel" />)}</div>
    <div className="grid2">
      <div className="apanel">
        <h3>Personnages par race</h3>
        {st && !total && <Empty>Aucun personnage.</Empty>}
        {st?.byRace.map(r => <div key={r.race} className="bar"><span>{RACE_LABEL[r.race] ?? r.race}</span><i style={{ '--p': (100 * r.n) / total }} /><b>{r.n}</b></div>)}
      </div>
      <div className="apanel">
        <h3>Horloge du monde</h3>
        <p className="note">Applique immédiatement un tick horaire : XP, régénération, production des bâtiments.</p>
        <button className="primary" disabled={busy} onClick={tick}><Hourglass size={16} /> {busy ? 'Application…' : 'Simuler +1 heure'}</button>
      </div>
    </div>
    <div className="apanel">
      <div className="headrow"><h3>Journal d'administration</h3><span className="grow" />
        <Search value={q} onChange={setQ} placeholder="Filtrer (auteur, action, cible)…" />
        <button className="sm" title="Actualiser" onClick={load}><RefreshCw size={14} /></button></div>
      {audit && !rows.length ? <Empty>Aucune action enregistrée.</Empty> : <table><thead><tr><th>Quand</th><th>Auteur</th><th>Action</th><th>Cible</th></tr></thead><tbody>
        {rows.map(a => <tr key={a.id}><td title={new Date(a.created_at).toLocaleString()}>{ago(a.created_at)}</td><td><b>{a.actor}</b></td><td><code>{a.action}</code></td><td>{a.target ? `${a.target}${a.target_id != null ? ` n°${a.target_id}` : ''}` : '—'}</td></tr>)}
      </tbody></table>}
      {audit?.length === limit && limit < 200 && <button className="ghost more" onClick={() => setLimit(l => Math.min(l * 3, 200))}>Afficher plus</button>}
    </div>
  </section>;
}
