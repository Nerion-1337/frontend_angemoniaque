// Espace de modération du forum (#forum/mod) : signalements (mod / admin) ; catégories et leurs accès, pages légales (admin).
import { useEffect, useState } from 'react';
import { Flag, EyeOff, Check, Plus, Save, Trash2, ScrollText, FolderTree } from 'lucide-react';
import { api } from '../lib/api'; import { ago } from '../lib/forum.js';
const RACES = [['human', 'Hommes'], ['demon', 'Démons'], ['angel', 'Anges'], ['nephilim', 'Néphilims']];
const BLANK = { name: '', description: '', kind: 'forum', position: 0, read_access: 'public', post_access: 'members', races: [], min_rank: 1, locked: false, hidden: false };
function Reports() {
  const [list, setList] = useState(null), [err, setErr] = useState(''), load = () => api('/forum/mod/reports').then(setList).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);
  const act = p => p.then(load).catch(e => setErr(e.message));
  return <section><h3 className="fo-h"><Flag size={16} /> Signalements à traiter {list && <small>({list.length})</small>}</h3>{err && <p className="err">{err}</p>}
    {list && !list.length && <p className="fo-muted">Aucun signalement en attente.</p>}
    {list?.map(r => <article key={r.id} className="fo-post"><header><b>{r.title}</b><small>signalé par {r.reporter} · {ago(r.created_at)}</small></header>
      <p className="fo-why"><Flag size={12} /> {r.reason}</p><div className="fo-body fo-excerpt">{r.author} : {r.excerpt}</div>
      <footer><a className="btnlike" href={`#forum/t/${r.topic_id}`}>Voir le sujet</a>{!r.hidden && <button className="sm" onClick={() => act(api(`/forum/mod/posts/${r.post_id}`, { hidden: true }, 'PUT'))}><EyeOff size={13} /> Masquer le message</button>}
        <button className="sm" onClick={() => act(api(`/forum/mod/reports/${r.id}`, undefined, 'PUT'))}><Check size={13} /> Classer sans suite</button></footer></article>)}</section>;
}
function CatRow({ k, onSaved }) {
  const [f, set] = useState({ ...BLANK, ...k }), [msg, setMsg] = useState(''), isNew = !k.id;
  const v = (key, val) => set({ ...f, [key]: val }), race = r => v('races', f.races.includes(r) ? f.races.filter(x => x !== r) : [...f.races, r]);
  const body = () => { const { id, created_at, topics, posts, ...b } = f; return { ...b, position: Number(b.position) || 0, min_rank: Math.max(1, Number(b.min_rank) || 1) }; };
  const save = () => (isNew ? api('/admin/forum/categories', body()) : api(`/admin/forum/categories/${k.id}`, body(), 'PUT')).then(() => { setMsg('Enregistré'); onSaved(); if (isNew) set(BLANK); }).catch(e => setMsg(e.message));
  return <div className={`fo-catedit${isNew ? ' new' : ''}`}>
    <div className="fo-grid"><label>Nom<input value={f.name} onChange={e => v('name', e.target.value)} /></label>
      <label>Type<select value={f.kind} onChange={e => v('kind', e.target.value)}><option value="announce">Annonces</option><option value="forum">Forum</option></select></label>
      <label>Ordre<input type="number" min="0" value={f.position} onChange={e => v('position', e.target.value)} /></label>
      <label className="span2">Description<input value={f.description} onChange={e => v('description', e.target.value)} /></label>
      <label>Lecture<select value={f.read_access} onChange={e => v('read_access', e.target.value)}><option value="public">Tout le monde (sans compte)</option><option value="members">Membres connectés</option><option value="staff">Équipe seulement</option></select></label>
      <label>Écriture<select value={f.post_access} onChange={e => v('post_access', e.target.value)}><option value="members">Membres</option><option value="staff">Équipe seulement</option></select></label>
      <label>Rang minimal<input type="number" min="1" max="10" value={f.min_rank} onChange={e => v('min_rank', e.target.value)} /></label></div>
    <div className="fo-row"><small>Races :</small>{RACES.map(([r, l]) => <label key={r} className="chk"><input type="checkbox" checked={f.races.includes(r)} onChange={() => race(r)} /> {l}</label>)}<small>(aucune = toutes)</small>
      <span className="grow" /><label className="chk"><input type="checkbox" checked={f.locked} onChange={e => v('locked', e.target.checked)} /> Verrouillée</label>
      <label className="chk"><input type="checkbox" checked={f.hidden} onChange={e => v('hidden', e.target.checked)} /> Masquée</label>
      {msg && <small className="fo-msg">{msg}</small>}
      {!isNew && <button className="sm danger" onClick={() => confirm(`Supprimer « ${k.name} » et tous ses sujets ?`) && api(`/admin/forum/categories/${k.id}`, undefined, 'DELETE').then(onSaved).catch(e => setMsg(e.message))}><Trash2 size={13} /></button>}
      <button className="sm primary" disabled={f.name.trim().length < 2} onClick={save}>{isNew ? <><Plus size={13} /> Créer</> : <><Save size={13} /> Enregistrer</>}</button></div></div>;
}
function Categories() {
  const [list, setList] = useState(null), [sel, setSel] = useState(null), load = () => api('/admin/forum/categories').then(setList);
  useEffect(() => { load(); }, []);
  useEffect(() => { if (list && sel === null) setSel(list[0]?.id ?? 'new'); }, [list]);   // première catégorie par défaut
  const cur = list?.find(k => k.id === sel);
  return <section><h3 className="fo-h"><FolderTree size={16} /> Catégories et accès</h3>
    <p className="fo-muted">Lecture « Tout le monde » : visible depuis l'écran d'accueil sans compte. Races et rang minimal : un des personnages du compte doit y correspondre. L'équipe voit et écrit partout.</p>
    <div className="fo-subtabs">{list?.map(k => <button key={k.id} className={sel === k.id ? 'on' : ''} onClick={() => setSel(k.id)}>{k.name}</button>)}
      <button className={sel === 'new' ? 'on' : ''} onClick={() => setSel('new')}><Plus size={13} /> Nouvelle</button></div>
    {!list ? null : cur ? <CatRow key={`${cur.id}-${cur.position}-${cur.name}`} k={cur} onSaved={load} /> : <CatRow key="new" k={BLANK} onSaved={load} />}</section>;
}
function LegalEdit() {
  const [list, setList] = useState([]), [key, setKey] = useState('cgu'), [f, set] = useState(null), [bump, setBump] = useState(false), [msg, setMsg] = useState('');
  useEffect(() => { api('/legal').then(setList); }, []);
  useEffect(() => { setMsg(''); setBump(false); api(`/legal/${key}`).then(set).catch(() => set({ title: '', body: '', version: 0 })); }, [key]);
  const save = () => api(`/admin/legal/${key}`, { title: f.title, body: f.body, bump }, 'PUT').then(p => { setMsg(`Enregistré (version ${p.version})`); set({ ...f, version: p.version }); setBump(false); api('/legal').then(setList); }).catch(e => setMsg(e.message));
  return <section><h3 className="fo-h"><ScrollText size={16} /> Pages légales</h3>
    <div className="fo-row"><select value={key} onChange={e => setKey(e.target.value)}>{list.map(p => <option key={p.key} value={p.key}>{p.title}</option>)}</select>
      <small>Complétez les mentions entre crochets (éditeur, hébergeur, contact).</small></div>
    {f && <div className="form"><label>Titre<input value={f.title} onChange={e => set({ ...f, title: e.target.value })} /></label>
      <label>Texte (brut)<textarea rows={16} value={f.body} onChange={e => set({ ...f, body: e.target.value })} /></label>
      <div className="fo-row">{key === 'cgu' && <label className="chk"><input type="checkbox" checked={bump} onChange={e => setBump(e.target.checked)} /> Nouvelle version (version {f.version + 1}) : chaque membre devra la réaccepter pour écrire</label>}
        <span className="grow" />{msg && <small className="fo-msg">{msg}</small>}<button className="primary" onClick={save}><Save size={14} /> Enregistrer</button></div></div>}</section>;
}
const TABS = [['reports', 'Signalements', Flag, Reports], ['cats', 'Catégories', FolderTree, Categories], ['legal', 'Pages légales', ScrollText, LegalEdit]];
/** Onglets : un seul élément affiché à la fois ; catégories et pages légales réservées à l'admin. */
export default function ForumMod({ me }) {
  const tabs = me.admin ? TABS : TABS.slice(0, 1), [tab, setTab] = useState('reports'), View = (tabs.find(t => t[0] === tab) ?? tabs[0])[3];
  return <>{tabs.length > 1 && <nav className="fo-tabs" role="tablist">{tabs.map(([k, l, I]) =>
    <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><I size={15} /> {l}</button>)}</nav>}
    <View /></>;
}
