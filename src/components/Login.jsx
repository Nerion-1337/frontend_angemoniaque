import { useEffect, useState } from 'react'; import { useDispatch } from 'react-redux'; import { Flame, Feather, User, Lock, Megaphone, MessagesSquare } from 'lucide-react'; import { api } from '../lib/api'; import { postAuth } from '../lib/postAuth'; import { A } from '../store'; import Backdrop from './Backdrop';
const Logo = () => <h1 className="wordmark">Angemoniaque</h1>;
/** Liens de l'écran d'accueil : annonces, forum, pages légales (lisibles sans compte). */
export const HomeLinks = () => <nav className="homelinks"><a href="#forum"><MessagesSquare size={14} /> Annonces & forum</a><a href="#legal/cgu">CGU</a><a href="#legal/privacy">Confidentialité</a><a href="#legal/legal">Mentions légales</a><a href="#legal/cookies">Cookies</a></nav>;
const GIcon = () => <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>;
/** Connexion avec Google : vraie (redirection) si les clés sont réglées, sinon simulée (email seulement) ; masquée si coupée. */
function GoogleLogin({ done }) {
  const [cfg, setCfg] = useState(null), [mock, setMock] = useState(false), [email, setEmail] = useState(''), [err, setErr] = useState('');
  useEffect(() => { api('/auth/google/config').then(setCfg).catch(() => setCfg({ mode: 'off' })); }, []);
  if (!cfg || cfg.mode === 'off') return null;
  const click = () => (cfg.mode === 'google' ? location.assign('/api/auth/google/start') : setMock(!mock));
  return <div className="glogin"><div className="or"><span>ou</span></div>
    <button type="button" className="gbtn" onClick={click}><GIcon /> Se connecter avec Google{cfg.mode === 'mock' && <small> (simulé)</small>}</button>
    {mock && <div className="gmock"><small>Mode simulé : aucune clé Google n'est réglée (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET). Indiquez l'email du compte Google à simuler.</small>
      <div className="row"><input type="email" placeholder="vous@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="button" className="primary" onClick={async () => { setErr(''); try { done(await api('/auth/google/mock', { email }), email); } catch (e) { setErr(e.message); } }}>Continuer</button></div>
      {err && <p className="err" role="alert">{err}</p>}</div>}
    <small className="gnote">En continuant avec Google, vous acceptez les <a href="#legal/cgu">CGU</a> et la <a href="#legal/privacy">politique de confidentialité</a>.</small></div>;
}
/** Trois dernières annonces (catégorie « annonces ») sur l'écran d'accueil. */
function LatestNews() {
  const [list, setList] = useState(null);
  useEffect(() => { api('/forum').then(async d => { const k = d.categories.find(c => c.kind === 'announce' && !c.denied); if (!k) return setList([]); setList((await api(`/forum/categories/${k.id}`)).topics.slice(0, 3)); }).catch(() => setList([])); }, []);
  if (!list?.length) return null;
  return <aside className="glass news"><h3><Megaphone size={16} /> Dernières annonces</h3>{list.map(t => <a key={t.id} href={`#forum/t/${t.id}`}><b>{t.title}</b><small>{new Date(t.created_at).toLocaleDateString('fr-FR')}</small></a>)}<a className="more" href="#forum">Toutes les annonces et le forum →</a></aside>;
}
export function Login() {
  const d = useDispatch(), [mode, setMode] = useState('login'), [f, set] = useState({ email: '', password: '', confirm: '', tos: false }), [err, setErr] = useState(() => { const e = sessionStorage.getItem('loginError') ?? ''; sessionStorage.removeItem('loginError'); return e; }), [busy, setBusy] = useState(false), reg = mode === 'register';
  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Adresse email invalide');
    if (reg && f.password.length < 8) return setErr('Mot de passe : 8 caractères minimum');
    if (reg && f.password !== f.confirm) return setErr('Les mots de passe ne correspondent pas');
    if (reg && !f.tos) return setErr('Acceptez les conditions générales d\'utilisation pour créer un compte');
    setBusy(true);
    try { const r = await api(reg ? '/auth/register' : '/auth/login', { email: f.email, password: f.password, ...(reg ? { acceptTos: true } : {}) }); done(r, f.email); }
    catch (er) { setErr(er.message); } finally { setBusy(false); }
  };
  const done = (r, email) => { const p = postAuth(r, email); d(A.setAuth(p.auth)); if (p.hash) location.hash = p.hash; };
  const field = k => ({ value: f[k], onChange: e => set({ ...f, [k]: e.target.value }) }), tab = m => () => { setMode(m); setErr(''); };
  return <><Backdrop /><main className="stage"><form className="glass auth" onSubmit={submit}>
    <Logo /><p className="tag">Anges, Démons et Hommes se disputent trois mondes.</p>
    <div className="seg" role="tablist"><button type="button" role="tab" aria-selected={!reg} className={!reg ? 'on' : ''} onClick={tab('login')}>Connexion</button><button type="button" role="tab" aria-selected={reg} className={reg ? 'on' : ''} onClick={tab('register')}>Inscription</button></div>
    <label>Email<input type="email" autoComplete="email" {...field('email')} /></label>
    <label>Mot de passe{reg && <small> (8 caractères minimum)</small>}<input type="password" autoComplete={reg ? 'new-password' : 'current-password'} {...field('password')} /></label>
    {reg && <label>Confirmer le mot de passe<input type="password" autoComplete="new-password" {...field('confirm')} /></label>}
    {reg && <label className="chk tos"><input type="checkbox" checked={f.tos} onChange={e => set({ ...f, tos: e.target.checked })} /><span>J'accepte les <a href="#legal/cgu">conditions générales d'utilisation</a> et la <a href="#legal/privacy">politique de confidentialité</a>.</span></label>}
    <button className="primary" disabled={busy}>{busy ? 'Un instant…' : reg ? 'Créer mon compte' : 'Se connecter'}</button>
    {err && <p className="err" role="alert">{err}</p>}<GoogleLogin done={done} /><HomeLinks /></form><LatestNews /></main></>;
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
    {err && <p className="err" role="alert">{err}</p>}{admin && <a className="link" href="#admin">Espace administrateur</a>}<HomeLinks /></div></main></>;
}
