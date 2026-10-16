import { useState } from 'react'; import { useDispatch } from 'react-redux'; import { api, setToken } from '../lib/api'; import { A } from '../store';
export function Login() {
  const d = useDispatch(), [f, set] = useState({ email: '', password: '' }), [err, setErr] = useState('');
  const go = async p => { try { const r = await api(p, f); setToken(r.token); d(A.setAuth({ admin: r.admin })); } catch (e) { setErr(e.message); } };
  return <div className="center box"><h1>Angemoniaque</h1><input placeholder="Email" onChange={e => set({ ...f, email: e.target.value })} />
    <input type="password" placeholder="Mot de passe (8+)" onChange={e => set({ ...f, password: e.target.value })} /><button onClick={() => go('/auth/login')}>Connexion</button><button onClick={() => go('/auth/register')}>Créer un compte</button><p className="err">{err}</p></div>;
}
export function CharSelect({ admin }) {
  const d = useDispatch(), [list, setList] = useState(null), [f, set] = useState({ pseudo: '', race: 'human' }), [err, setErr] = useState('');
  const load = () => api('/characters').then(setList); if (!list) load();
  const locked = list?.[0]?.race;   // 3 personnages max, même race
  const create = async () => { try { await api('/characters', { ...f, race: locked ?? f.race }); load(); } catch (e) { setErr(e.message); } };
  return <div className="center box"><h2>Vos personnages ({list?.length ?? 0}/3)</h2>
    {list?.map(c => <button key={c.id} onClick={() => d(A.setChar(c.id))}>{c.pseudo} — {c.race}</button>)}
    {(list?.length ?? 0) < 3 && <><input placeholder="Pseudo (définitif)" onChange={e => set({ ...f, pseudo: e.target.value })} />
      <select disabled={!!locked} value={locked ?? f.race} onChange={e => set({ ...f, race: e.target.value })}><option value="human">Humain</option><option value="demon">Démon</option><option value="angel">Ange</option></select><button onClick={create}>Créer</button></>}
    {admin && <a href="#admin">Espace administrateur</a>}<p className="err">{err}</p></div>;
}
