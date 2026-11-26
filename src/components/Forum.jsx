// Annonces, forum public et pages légales, accessibles depuis l'écran d'accueil (#forum, #legal/<clé>) avec ou sans compte.
// Écrire exige un compte et les CGU en vigueur acceptées ; l'équipe (mod / admin) modère sur place (ForumMod.jsx pour les réglages).
import { useEffect, useState } from 'react';
import { Megaphone, MessagesSquare, Pin, Lock, EyeOff, Eye, ArrowLeft, Flag, Pencil, Trash2, Send, Shield, ScrollText, VolumeX, Home, LogIn } from 'lucide-react';
import { api, hasToken } from '../lib/api'; import { forumRoute, accessBadges, ago, ROLE_LABEL, pager } from '../lib/forum.js';
import Backdrop from './Backdrop'; import ForumMod from './ForumMod';
const go = h => { location.hash = h; };
function useLoad(path, deps) {
  const [st, set] = useState({ data: null, err: '' }), reload = () => api(path).then(data => set({ data, err: '' })).catch(e => set({ data: null, err: e.message }));
  useEffect(() => { set({ data: null, err: '' }); reload(); }, deps); return [st.data, st.err, reload];
}
const Badges = ({ k }) => <span className="fo-badges">{accessBadges(k).map(([t, tone]) => <i key={t} className={`fo-badge ${tone}`}>{t}</i>)}</span>;
const Author = ({ p }) => <span className="fo-author">{p.author ?? 'Compte supprimé'}{ROLE_LABEL[p.author_role] && <i className="fo-role"><Shield size={11} /> {ROLE_LABEL[p.author_role]}</i>}</span>;
const Pages = ({ page, pages, to }) => pages > 1 && <nav className="fo-pages" aria-label="Pages">{pager(page, pages).map((p, i) => p === '…' ? <span key={i}>…</span> : <button key={i} className={p === page ? 'on' : ''} onClick={() => go(to(p))}>{p}</button>)}</nav>;

/** Bandeau d'acceptation des CGU (version en vigueur). */
function TosBar({ me, after }) {
  const [err, setErr] = useState('');
  if (!me?.logged || me.tos || me.staff) return null;
  return <div className="fo-tos"><ScrollText size={16} /><span>Pour écrire, acceptez les <a href="#legal/cgu">conditions générales d'utilisation</a> (version {me.tosVersion}) et le <a href="#legal/rules">règlement du forum</a>.</span>
    <button className="primary sm" onClick={() => api('/legal/accept', undefined, 'POST').then(after).catch(e => setErr(e.message))}>J'accepte</button>{err && <small className="err">{err}</small>}</div>;
}
function Compose({ title, onSend, label = 'Publier', initial = {} }) {
  const [f, set] = useState({ title: initial.title ?? '', body: initial.body ?? '' }), [err, setErr] = useState(''), [busy, setBusy] = useState(false);
  const send = async e => { e.preventDefault(); setErr(''); setBusy(true); try { await onSend(f); set({ title: '', body: '' }); } catch (er) { setErr(er.message); } finally { setBusy(false); } };
  return <form className="fo-compose" onSubmit={send}>
    {title && <input placeholder="Titre du sujet" maxLength={120} value={f.title} onChange={e => set({ ...f, title: e.target.value })} />}
    <textarea rows={5} maxLength={10000} placeholder="Votre message (texte brut)" value={f.body} onChange={e => set({ ...f, body: e.target.value })} />
    <div className="fo-row"><small>{f.body.length} / 10 000</small><span className="grow" />{err && <small className="err" role="alert">{err}</small>}<button className="primary" disabled={busy || !f.body.trim() || (title && f.title.trim().length < 3)}><Send size={14} /> {label}</button></div></form>;
}

function Home_() {
  const [d, err] = useLoad('/forum', []);
  if (err) return <p className="err">{err}</p>; if (!d) return <p className="fo-muted">Chargement…</p>;
  const ann = d.categories.filter(k => k.kind === 'announce'), rest = d.categories.filter(k => k.kind !== 'announce');
  const Card = ({ k }) => { const I = k.kind === 'announce' ? Megaphone : MessagesSquare;
    return <button className={`fo-cat${k.denied ? ' denied' : ''}${k.hidden ? ' hid' : ''}`} onClick={() => !k.denied && go(`#forum/c/${k.id}`)} title={k.denied ?? ''} aria-disabled={!!k.denied}>
      <I size={22} className="fo-ico" /><div className="fo-catmain"><b>{k.name}</b><small>{k.description}</small><Badges k={k} />{k.denied && <small className="fo-why"><Lock size={11} /> {k.denied}</small>}</div>
      <div className="fo-catstats"><span><b>{k.topics}</b> sujets</span><span><b>{k.posts}</b> messages</span>{k.last && <small className="fo-last">{k.last.title}<br />{ago(k.last.at)}</small>}</div></button>; };
  return <>{ann.length > 0 && <section><h3 className="fo-h"><Megaphone size={16} /> Annonces</h3>{ann.map(k => <Card key={k.id} k={k} />)}</section>}
    <section><h3 className="fo-h"><MessagesSquare size={16} /> Forum</h3>{rest.map(k => <Card key={k.id} k={k} />)}</section></>;
}
function Category({ id, page }) {
  const [d, err, reload] = useLoad(`/forum/categories/${id}?page=${page}`, [id, page]);
  if (err) return <p className="err">{err}</p>; if (!d) return <p className="fo-muted">Chargement…</p>;
  const k = d.category;
  return <><div className="fo-crumb"><button className="sm" onClick={() => go('#forum')}><ArrowLeft size={14} /> Catégories</button><h3>{k.name}</h3><Badges k={k} /></div>
    {k.description && <p className="fo-muted">{k.description}</p>}<TosBar me={d.me} after={reload} />
    <div className="fo-topics" role="table">{!d.topics.length && <p className="fo-muted">Aucun sujet pour l'instant.</p>}
      {d.topics.map(t => <button key={t.id} role="row" className={`fo-topic${t.hidden ? ' hid' : ''}`} onClick={() => go(`#forum/t/${t.id}`)}>
        <span className="fo-tflags">{t.pinned && <Pin size={14} aria-label="Épinglé" />}{t.locked && <Lock size={14} aria-label="Verrouillé" />}{t.hidden && <EyeOff size={14} aria-label="Masqué" />}</span>
        <span className="fo-ttitle"><b>{t.title}</b><small>par <Author p={t} /> · {ago(t.created_at)}</small></span>
        <span className="fo-tstat"><b>{t.replies}</b> réponse{t.replies > 1 ? 's' : ''}<small>{ago(t.last_post_at)}</small></span></button>)}</div>
    <Pages page={d.page} pages={d.pages} to={p => `#forum/c/${id}/${p}`} />
    {d.canPost ? <><h4 className="fo-h">Nouveau sujet</h4><Compose title onSend={async f => { const r = await api(`/forum/categories/${id}/topics`, f); go(`#forum/t/${r.id}`); }} /></>
      : <p className="fo-note">{d.me.logged ? d.postReason : <><a href="#">Connectez-vous</a> pour écrire.</>}</p>}</>;
}
function Post({ p, me, reload, onTopicGone, topic }) {
  const [edit, setEdit] = useState(false), [rep, setRep] = useState(false), [msg, setMsg] = useState('');
  const act = (fn, done) => fn().then(r => { done?.(r); reload(); }).catch(e => setMsg(e.message));
  const del = () => confirm(p.first ? 'Supprimer ce sujet et tous ses messages ?' : 'Supprimer ce message ?') && act(() => api(`/forum/posts/${p.id}`, undefined, 'DELETE'), r => r?.topicDeleted && onTopicGone());
  return <article className={`fo-post${p.hidden ? ' hid' : ''}${ROLE_LABEL[p.author_role] ? ' staff' : ''}`} id={`p${p.id}`}>
    <header><Author p={p} /><small>{ago(p.created_at)}{p.edited_at && ` · modifié ${ago(p.edited_at)}`}</small>{p.hidden && <i className="fo-badge staff"><EyeOff size={11} /> masqué</i>}
      {me.staff && p.reports > 0 && <i className="fo-badge lock"><Flag size={11} /> {p.reports} signalement{p.reports > 1 ? 's' : ''}</i>}</header>
    {edit ? <Compose title={p.first} initial={{ title: topic.title, body: p.body }} label="Enregistrer" onSend={f => api(`/forum/posts/${p.id}`, { body: f.body, ...(p.first ? { title: f.title } : {}) }, 'PUT').then(() => { setEdit(false); reload(); })} />
      : <div className="fo-body">{p.body}</div>}
    {rep && <form className="fo-row" onSubmit={e => { e.preventDefault(); act(() => api(`/forum/posts/${p.id}/report`, { reason: e.target.reason.value }), () => { setRep(false); setMsg('Merci : le signalement est transmis à l\'équipe.'); }); }}>
      <input name="reason" className="grow" placeholder="Motif du signalement (propos illicites, insultes, spam…)" maxLength={500} /><button className="sm danger">Signaler</button></form>}
    <footer>{(p.mine || me.staff) && <><button className="sm" onClick={() => setEdit(!edit)}><Pencil size={13} /> {edit ? 'Annuler' : 'Modifier'}</button><button className="sm" onClick={del}><Trash2 size={13} /> Supprimer</button></>}
      {me.logged && !p.mine && <button className="sm" onClick={() => setRep(!rep)}><Flag size={13} /> Signaler</button>}
      {me.staff && <><button className="sm" onClick={() => act(() => api(`/forum/mod/posts/${p.id}`, { hidden: !p.hidden }, 'PUT'))}>{p.hidden ? <><Eye size={13} /> Afficher</> : <><EyeOff size={13} /> Masquer</>}</button>
        {p.author_id && p.author_role === 'player' && !p.mine && <button className="sm" title={p.author_muted_until && new Date(p.author_muted_until) > new Date() ? `En sourdine jusqu'au ${new Date(p.author_muted_until).toLocaleString('fr-FR')}` : ''}
          onClick={() => { const h = prompt('Sourdine de l\'auteur sur le forum, en heures (0 = lever) :', '24'); if (h != null) act(() => api(`/forum/mod/accounts/${p.author_id}/mute`, { hours: Math.max(0, Math.trunc(Number(h)) || 0) }, 'PUT'), () => setMsg(Number(h) > 0 ? `Auteur en sourdine ${h} h` : 'Sourdine levée')); }}><VolumeX size={13} /> Sourdine</button>}
        {me.admin && p.author_id && ['player', 'mod'].includes(p.author_role) && !p.mine && <button className="sm" onClick={() => act(() => api(`/admin/forum/accounts/${p.author_id}/role`, { role: p.author_role === 'mod' ? 'player' : 'mod' }, 'PUT'))}><Shield size={13} /> {p.author_role === 'mod' ? 'Retirer modérateur' : 'Nommer modérateur'}</button>}</>}
      {msg && <small className="fo-msg">{msg}</small>}</footer></article>;
}
function Topic({ id, page }) {
  const [d, err, reload] = useLoad(`/forum/topics/${id}?page=${page}`, [id, page]), [cats, setCats] = useState(null), [msg, setMsg] = useState('');
  useEffect(() => { if (d?.me.admin && !cats) api('/admin/forum/categories').then(setCats).catch(() => {}); }, [d]);
  if (err) return <p className="err">{err}</p>; if (!d) return <p className="fo-muted">Chargement…</p>;
  const t = d.topic, mod = body => api(`/forum/mod/topics/${t.id}`, body, 'PUT').then(reload).catch(e => setMsg(e.message));
  return <><div className="fo-crumb"><button className="sm" onClick={() => go(`#forum/c/${d.category.id}`)}><ArrowLeft size={14} /> {d.category.name}</button>
      <h3>{t.pinned && <Pin size={16} />} {t.locked && <Lock size={16} />} {t.title}</h3></div>
    {d.me.staff && <div className="fo-modbar"><Shield size={14} /><b>Modération</b>
      <button className="sm" onClick={() => mod({ pinned: !t.pinned })}><Pin size={13} /> {t.pinned ? 'Désépingler' : 'Épingler'}</button>
      <button className="sm" onClick={() => mod({ locked: !t.locked })}><Lock size={13} /> {t.locked ? 'Déverrouiller' : 'Verrouiller'}</button>
      <button className="sm" onClick={() => mod({ hidden: !t.hidden })}>{t.hidden ? <><Eye size={13} /> Afficher</> : <><EyeOff size={13} /> Masquer</>}</button>
      {cats && <select value={t.category_id} onChange={e => mod({ category_id: Number(e.target.value) })} aria-label="Déplacer vers">{cats.map(k => <option key={k.id} value={k.id}>Déplacer : {k.name}</option>)}</select>}
      <button className="sm danger" onClick={() => confirm('Supprimer définitivement ce sujet ?') && api(`/forum/mod/topics/${t.id}`, undefined, 'DELETE').then(() => go(`#forum/c/${d.category.id}`)).catch(e => setMsg(e.message))}><Trash2 size={13} /> Supprimer</button>
      {msg && <small className="err">{msg}</small>}</div>}
    <TosBar me={d.me} after={reload} />
    {d.posts.map(p => <Post key={p.id} p={p} me={d.me} topic={t} reload={reload} onTopicGone={() => go(`#forum/c/${d.category.id}`)} />)}
    <Pages page={d.page} pages={d.pages} to={p => `#forum/t/${id}/${p}`} />
    {d.canReply ? <><h4 className="fo-h">Répondre</h4><Compose label="Répondre" onSend={async f => { await api(`/forum/topics/${id}/posts`, { body: f.body }); if (d.page < d.pages || d.total % 20 === 0) go(`#forum/t/${id}/${Math.ceil((d.total + 1) / 20)}`); else reload(); }} /></>
      : <p className="fo-note">{d.me.logged ? d.replyReason : <><a href="#">Connectez-vous</a> pour répondre.</>}</p>}</>;
}
function Legal({ k }) {
  const [list] = useLoad('/legal', []), [p, err] = useLoad(`/legal/${k}`, [k]);
  return <div className="fo-legal"><nav>{list?.map(x => <button key={x.key} className={x.key === k ? 'on' : ''} onClick={() => go(`#legal/${x.key}`)}>{x.title}</button>)}</nav>
    <article>{err && <p className="err">{err}</p>}{p && <><h3>{p.title}</h3><small>Version {p.version} · mise à jour le {new Date(p.updated_at).toLocaleDateString('fr-FR')}</small><div className="fo-body">{p.body}</div></>}</article></div>;
}
export default function Forum({ hash }) {
  const r = forumRoute(hash) ?? { view: 'home' }, [me, setMe] = useState(null);
  useEffect(() => { api('/forum').then(d => setMe(d.me)).catch(() => {}); }, [hash]);
  useEffect(() => { document.querySelector('.fo-scroll')?.scrollTo(0, 0); }, [hash]);
  return <><Backdrop /><main className="stage fo-stage"><div className="glass fo">
    <header className="fo-top"><h1 className="wordmark fo-mark">Angemoniaque</h1><nav className="fo-nav">
      <button className={r.view !== 'legal' && r.view !== 'mod' ? 'on' : ''} onClick={() => go('#forum')}><MessagesSquare size={15} /> Annonces & forum</button>
      <button className={r.view === 'legal' ? 'on' : ''} onClick={() => go('#legal/cgu')}><ScrollText size={15} /> Informations légales</button>
      {me?.staff && <button className={r.view === 'mod' ? 'on' : ''} onClick={() => go('#forum/mod')}><Shield size={15} /> Modération</button>}
      <span className="grow" /><button onClick={() => go('')}>{hasToken() ? <><Home size={15} /> Retour au jeu</> : <><LogIn size={15} /> Connexion</>}</button></nav></header>
    <div className="fo-scroll">{r.view === 'home' && <Home_ />}{r.view === 'category' && <Category id={r.id} page={r.page} />}{r.view === 'topic' && <Topic id={r.id} page={r.page} />}
      {r.view === 'legal' && <Legal k={r.key} />}{r.view === 'mod' && (me?.staff ? <ForumMod me={me} /> : <p className="fo-muted">Réservé à l'équipe de modération.</p>)}</div>
    <footer className="fo-foot"><a href="#legal/cgu">CGU</a><a href="#legal/privacy">Confidentialité</a><a href="#legal/legal">Mentions légales</a><a href="#legal/rules">Règlement</a><a href="#legal/cookies">Cookies</a></footer>
  </div></main></>;
}
