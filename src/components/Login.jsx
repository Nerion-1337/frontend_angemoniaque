import { useState } from 'react'; import { useDispatch } from 'react-redux'; import { Flame, Feather, User, Lock } from 'lucide-react'; import { api } from '../lib/api'; import { postAuth } from '../lib/postAuth'; import { A } from '../store'; import Backdrop from './Backdrop';
const Logo = () => <h1 className="wordmark">Angemoniaque</h1>;
export function Login() {
  const d = useDispatch(), [mode, setMode] = useState('login'), [f, set] = useState({ email: '', password: '', confirm: '' }), [err, setErr] = useState(''), [busy, setBusy] = useState(false), reg = mode === 'register';
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Adresse email invalide');
    if (reg && f.password.length < 8) return setErr('Mot de passe : 8 caractères minimum');
    if (reg && f.password !== f.confirm) return setErr('Les mots de passe ne correspondent pas');
    setBusy(true);
    try { const r = await api(reg ? '/auth/register' : '/auth/login', { email: f.email, password: f.password }); const p = postAuth(r, f.email); d(A.setAuth(p.auth)); if (p.hash) location.hash = p.hash; }
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
/** Écran des personnages : races jouables, places et refus viennent du serveur (GET /characters/races :
 *  une seule race par compte, max par compte, population max) ; le compte admin n'a aucune limite. */
export function CharSelect({ admin }) {
  const d = useDispatch(), [list, setList] = useState(null), [info, setInfo] = useState(null), [f, set] = useState({ pseudo: '', race: '' }), [err, setErr] = useState('');
  const load = () => { api('/characters').then(setList); api('/characters/races').then(setInfo).catch(() => setInfo({ races: [] })); };
  if (!list) load();
  const races = info?.races ?? [], allowed = races.filter(r => r.allowed);
  const race = allowed.some(r => r.key === f.race) ? f.race : info?.locked ?? allowed[0]?.key ?? '';
  const cur = races.find(r => r.key === (info?.locked ?? race)), max = info?.admin ? null : cur?.max ?? null;
  const create = async e => { e.preventDefault(); try { setErr(''); await api('/characters', { pseudo: f.pseudo, race }); set({ ...f, pseudo: '' }); load(); } catch (er) { setErr(er.message); } };
  const meta = k => RACES.find(r => r[0] === k) ?? [k, races.find(r => r.key === k)?.name ?? k, User, ''];
  return <><Backdrop /><main className="stage"><div className="glass auth wide"><Logo />
    <h2>Vos personnages <small>{list?.length ?? 0}{max != null ? ` sur ${max}` : info?.admin ? ' · administrateur, sans limite' : ''}</small></h2>
    <div className="chars">{list?.map(c => { const [, label, I] = meta(c.race); return <button key={c.id} className={`char race-${c.race}`} onClick={() => d(A.setChar(c.id))}><I size={22} />{c.pseudo}<small>{label} · Jouer</small></button>; })}</div>
    {allowed.length > 0 && <form onSubmit={create}><h3>Nouveau personnage</h3>
      <div className="races">{races.map(r => { const [, l, I, desc] = meta(r.key); return <button type="button" key={r.key} disabled={!r.allowed} title={r.reason ?? ''} className={`race race-${r.key}${race === r.key ? ' on' : ''}`} onClick={() => set({ ...f, race: r.key })}><I size={26} /><b>{r.name ?? l}</b><small>{r.reason ?? desc}</small></button>; })}</div>
      {info?.locked && <small className="note">Tous vos personnages partagent la même race.</small>}
      <label>Pseudo <small>(définitif)</small><input value={f.pseudo} onChange={e => set({ ...f, pseudo: e.target.value })} maxLength={20} /></label><button className="primary" disabled={!race}>Créer le personnage</button></form>}
    {info && !allowed.length && <p className="note">Aucune nouvelle création possible pour ce compte.</p>}
    {err && <p className="err" role="alert">{err}</p>}{admin && <a className="link" href="#admin">Espace administrateur</a>}</div></main></>;
}
