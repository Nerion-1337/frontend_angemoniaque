import { useState } from 'react'; import { useDispatch } from 'react-redux'; import { Flame, Feather, User, Lock } from 'lucide-react'; import { api, setToken } from '../lib/api'; import { A } from '../store'; import Backdrop from './Backdrop';
const Logo = () => <h1 className="wordmark">Angemoniaque</h1>;
export function Login() {
  const d = useDispatch(), [mode, setMode] = useState('login'), [f, set] = useState({ email: '', password: '', confirm: '' }), [err, setErr] = useState(''), [busy, setBusy] = useState(false), reg = mode === 'register';
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Adresse email invalide');
    if (reg && f.password.length < 8) return setErr('Mot de passe : 8 caractères minimum');
    if (reg && f.password !== f.confirm) return setErr('Les mots de passe ne correspondent pas');
    setBusy(true);
    try { const r = await api(reg ? '/auth/register' : '/auth/login', { email: f.email, password: f.password }); setToken(r.token); d(A.setAuth({ admin: r.admin, email: f.email })); }
    catch (er) { setErr(er.message); } finally { setBusy(false); }
  };
  const field = k => ({ value: f[k], onChange: e => set({ ...f, [k]: e.target.value }) }), tab = m => () => { setMode(m); setErr(''); };
  return <><Backdrop /><main className="stage"><form className="glass auth" onSubmit={submit}>
    <Logo /><p className="tag">Anges, Démons et Hommes se disputent trois mondes.</p>
    <div className="seg" role="tablist"><button type="button" role="tab" aria-selected={!reg} className={!reg ? 'on' : ''} onClick={tab('login')}>Connexion</button><button type="button" role="tab" aria-selected={reg} className={reg ? 'on' : ''} onClick={tab('register')}>Inscription</button></div>
    <label>Email<input type="email" autoComplete="email" {...field('email')} /></label>
    <label>Mot de passe{reg && <small> (8 caractères minimum)</small>}<input type="password" autoComplete={reg ? 'new-password' : 'current-password'} {...field('password')} /></label>
    {reg && <label>Confirmer le mot de passe<input type="password" autoComplete="new-password" {...field('confirm')} /></label>}
    <button className="primary" disabled={busy}>{busy ? 'Un instant…' : reg ? 'Créer mon compte' : 'Se connecter'}</button>
    {err && <p className="err" role="alert">{err}</p>}</form></main></>;
}
const RACES = [['human', 'Humain', User, 'Forgerons et fidèles. Un seul pacte, des Artefacts à conquérir.'], ['demon', 'Démon', Flame, 'Puissance brute, pactes multiples. Gardien des Arcanes.'], ['angel', 'Ange', Feather, 'Porteur des Reliques, il guide les mortels par ses pactes.']];
export function CharSelect({ admin }) {
  const d = useDispatch(), [list, setList] = useState(null), [f, set] = useState({ pseudo: '', race: 'human' }), [err, setErr] = useState(''); const load = () => api('/characters').then(setList); if (!list) load();
  const locked = list?.[0]?.race, race = locked ?? f.race;                  // 3 personnages max, tous de la même race
  const create = async e => { e.preventDefault(); try { setErr(''); await api('/characters', { pseudo: f.pseudo, race }); set({ ...f, pseudo: '' }); load(); } catch (er) { setErr(er.message); } };
  return <><Backdrop /><main className="stage"><div className="glass auth wide"><Logo />
    <h2>Vos personnages <small>{list?.length ?? 0} sur 3</small></h2>
    <div className="chars">{list?.map(c => { const [, label, I] = RACES.find(r => r[0] === c.race); return <button key={c.id} className={`char race-${c.race}`} onClick={() => d(A.setChar(c.id))}><I size={22} />{c.pseudo}<small>{label} · Jouer</small></button>; })}</div>
    {(list?.length ?? 0) < 3 && <form onSubmit={create}><h3>Nouveau personnage</h3>
      <div className="races">{RACES.map(([k, l, I, desc]) => <button type="button" key={k} disabled={!!locked && locked !== k} className={`race race-${k}${race === k ? ' on' : ''}`} onClick={() => set({ ...f, race: k })}><I size={26} /><b>{l}</b><small>{desc}</small></button>)}</div>
      {locked && <small className="note">Tous vos personnages partagent la même race.</small>}
      <label>Pseudo <small>(définitif)</small><input value={f.pseudo} onChange={e => set({ ...f, pseudo: e.target.value })} maxLength={20} /></label><button className="primary">Créer le personnage</button></form>}
    {err && <p className="err" role="alert">{err}</p>}{admin && <a className="link" href="#admin">Espace administrateur</a>}</div></main></>;
}
