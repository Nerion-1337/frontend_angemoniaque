import { useEffect, useState } from 'react'; import { api } from '../lib/api';
export default function Admin() {
  const [st, setSt] = useState(null), [pl, setPl] = useState([]), [tbl, setTbl] = useState('items'), [json, setJson] = useState('{"name":"","slot":"weapon","rarity":"rare","quantity_max":5}'), [msg, setMsg] = useState('');
  const load = () => { api('/admin/stats').then(setSt).catch(e => setMsg(e.message)); api('/admin/players').then(setPl).catch(() => {}); }; useEffect(load, []);
  const run = async f => { try { await f(); load(); setMsg('OK'); } catch (e) { setMsg(e.message); } };
  return <div className="admin"><a href="/">← Jeu</a><h1>Administration</h1><p>{msg}</p><pre>{JSON.stringify(st)}</pre><button onClick={() => run(() => api('/admin/tick', undefined, 'POST'))}>Simuler +1 heure</button>
    <table><thead><tr><th>#</th><th>Pseudo</th><th>Race</th><th>XP</th><th>Or</th><th>Pos</th><th>Actions</th></tr></thead><tbody>{pl.map(p => <tr key={p.id}><td>{p.id}</td><td>{p.pseudo}</td><td>{p.race}</td><td>{p.xp}</td><td>{p.gold}</td><td>{p.map_id}:{p.x},{p.y}</td>
      <td><button onClick={() => run(() => api(`/admin/players/${p.id}/block`, { blocked: !p.blocked }))}>{p.blocked ? 'Débloquer' : 'Bloquer'}</button>
        <button onClick={() => { const [m, x, y] = (prompt('map,x,y', '1,100,100') || '').split(',').map(Number); m && run(() => api(`/admin/players/${p.id}/teleport`, { map: m, x, y })); }}>Téléporter</button>
        <button onClick={() => { const [kind, refId] = (prompt('Donner : item|spell|mount, id', 'mount,1') || '').split(','); kind && run(() => api(`/admin/players/${p.id}/grant`, { kind, refId: +refId })); }}>Donner</button>
        <button onClick={() => { const [stat, delta] = (prompt('stat,delta', 'gold,100') || '').split(','); stat && run(() => api(`/admin/players/${p.id}/stat`, { stat, delta: +delta })); }}>± stat</button></td></tr>)}</tbody></table>
    <h3>Créer dynamiquement</h3><select value={tbl} onChange={e => setTbl(e.target.value)}>{['items', 'monsters', 'mounts', 'spells'].map(t => <option key={t}>{t}</option>)}</select><textarea rows="5" value={json} onChange={e => setJson(e.target.value)} /><button onClick={() => run(() => api(`/admin/create/${tbl}`, { data: JSON.parse(json) }))}>Créer</button></div>;
}
