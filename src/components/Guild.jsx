import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { ShieldCheck, Users, MessageSquare, Settings, Upload, UserPlus, Eye, Shield, Plus, Pencil, ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';
import Modal from './Modal'; import { api } from '../lib/api'; import { A } from '../store'; import { useDo } from '../lib/hooks'; import { useRefreshMe } from './GameCanvas'; import { lastChef } from '../lib/guild'; import { fmt } from '../lib/fmt';
const PERMS = [['accept_applicants', 'Accepter des postulants'], ['send_invites', 'Envoyer des invitations'], ['create_topics', 'Créer catégories et sujets'], ['assign_ranks', 'Attribuer des rangs']], words = t => (t.trim() ? t.trim().split(/\s+/).length : 0);
const RankPick = ({ ranks, value, onChange }) => <div className="gear">{ranks.map(r => <button type="button" key={r.id} className={'pill' + (value.includes(r.name) ? ' on' : '')} onClick={() => onChange(value.includes(r.name) ? value.filter(x => x !== r.name) : [...value, r.name])}>{r.name}</button>)}</div>;
function Pres({ g, me, run, load, leave }) {
  const lead = g.me.leader, [mantra, setMantra] = useState(g.guild.mantra || ''), [desc, setDesc] = useState(g.guild.description || ''), d = useDispatch();
  const upload = e => { const f = e.target.files[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) return d(A.toast('Image trop lourde (2 Mo maximum)')); const r = new FileReader(); r.onload = () => run(() => api('/guilds/presentation', { characterId: me.id, logo: r.result }), load); r.readAsDataURL(f); };
  return <div className="cols"><div className="emblem">{g.guild.logo ? <img alt="" src={g.guild.logo} /> : <Shield size={64} />}<h3>{g.guild.name}</h3><span className="pill">[{g.guild.tag}]</span>{lead && <label className="btnlike"><Upload size={14} /> Modifier le logo (2 Mo max)<input type="file" accept="image/*" hidden onChange={upload} /></label>}</div>
    <div className="form"><label>Mantra de la guilde <small>{mantra.length} / 120 caractères</small><input maxLength={120} readOnly={!lead} value={mantra} onChange={e => setMantra(e.target.value.slice(0, 120))} /></label>
      <label>Histoire & description <small>{words(desc)} / 1000 mots</small><textarea rows={8} readOnly={!lead} value={desc} onChange={e => words(e.target.value) <= 1000 && setDesc(e.target.value)} /></label>
      {lead && <button className="primary" onClick={() => run(() => api('/guilds/presentation', { characterId: me.id, mantra, description: desc }), () => { load(); d(A.toast('Présentation enregistrée')); })}>Enregistrer</button>}{lastChef(g) ? <small>Le dernier Chef ne peut pas quitter la guilde tant qu'un autre membre n'a pas ce rang.</small> : <button className="danger" onClick={leave}>Quitter la guilde</button>}</div></div>;
}
function Members({ g, me, run, load }) {
  const P = g.me.permissions, [pseudo, setPseudo] = useState('');
  return <div className="cols"><div className="form"><h4>Membres ({g.members.length}) <small>{P.assign_ranks ? 'Vous pouvez attribuer des rangs' : 'Lecture seule'}</small></h4>
    {g.members.map(m => <div key={m.id} className="item row2"><span><b>{m.pseudo}</b> <small>{m.race}</small></span>{P.assign_ranks ? <select value={m.rank_id} disabled={m.id === me.id && lastChef(g)} title={m.id === me.id && lastChef(g) ? 'Le dernier Chef ne peut pas changer de rang' : ''} onChange={e => run(() => api('/guilds/members/rank', { characterId: me.id, memberId: m.id, rankId: +e.target.value }), load)}>{g.ranks.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select> : <span className="pill">{m.rank}</span>}</div>)}</div>
    <div className="form"><h4><UserPlus size={14} /> Inviter un joueur</h4>{P.send_invites ? <div className="row"><input placeholder="Pseudo du joueur…" value={pseudo} onChange={e => setPseudo(e.target.value)} /><button onClick={() => run(() => api('/guilds/invite', { characterId: me.id, pseudo }), () => setPseudo(''))}>Inviter</button></div> : <small>Votre rang ne permet pas d'envoyer des invitations.</small>}
      <h4>Postulants en attente ({g.applicants.length})</h4>{!P.accept_applicants && <small>Droit requis pour voir et accepter les postulants.</small>}
      {g.applicants.map(a => <div key={a.id} className="item row2"><span>{a.pseudo} <small>{a.race}</small></span><span className="row"><button className="primary" onClick={() => run(() => api(`/guilds/applicants/${a.id}/answer`, { characterId: me.id, accept: true }), load)}>Accepter</button><button onClick={() => run(() => api(`/guilds/applicants/${a.id}/answer`, { characterId: me.id, accept: false }), load)}>Refuser</button></span></div>)}</div></div>;
}
const AV = ['#c8a24a', '#7fa8d9', '#9d7fce', '#7fce9d', '#d98f7f', '#69c9c9'];
const Avatar = ({ p }) => <span className="avatar" style={{ background: AV[[...p].reduce((h, c) => h + c.charCodeAt(0), 0) % AV.length] }}>{(p[0] || '?').toUpperCase()}</span>;
const Post = ({ p }) => <div className="post"><Avatar p={p.pseudo} /><b>{p.pseudo}</b><div className="postbody" dangerouslySetInnerHTML={{ __html: fmt(p.body) }} /></div>;
function NewFolderModal({ g, me, run, load, onClose }) {
  const [name, setName] = useState(''), [fr, setFr] = useState(g.ranks.map(r => r.name));
  return <Modal onClose={onClose} className="inv guild" label="Nouvelle catégorie"><div className="form"><h4><Plus size={14} /> Nouvelle catégorie</h4><input placeholder="Titre…" value={name} onChange={e => setName(e.target.value)} />
    <small>Rangs autorisés à la voir :</small><RankPick ranks={g.ranks} value={fr} onChange={setFr} />
    <button className="primary" disabled={!name.trim()} onClick={() => run(() => api('/guilds/folders', { characterId: me.id, name: name.trim(), visibleRanks: fr }), () => { onClose(); load(); })}>Créer la catégorie</button></div></Modal>;
}
function NewTopicModal({ g, folder, me, run, load, onClose }) {
  const [t, setT] = useState({ title: '', body: '' }), [tr, setTr] = useState(g.ranks.map(r => r.name));
  return <Modal onClose={onClose} className="inv guild" label="Nouveau sujet"><div className="form"><h4><Plus size={14} /> Nouveau sujet — {folder.name}</h4>
    <input placeholder="Titre du sujet…" value={t.title} onChange={e => setT({ ...t, title: e.target.value })} />
    <textarea rows={4} placeholder="Contenu… (**gras** · *italique* · #rrggbb)" value={t.body} onChange={e => setT({ ...t, body: e.target.value })} />
    <small>Visible aux rangs :</small><RankPick ranks={g.ranks} value={tr} onChange={setTr} />
    <button className="primary" disabled={!t.title.trim() || !t.body.trim()} onClick={() => run(() => api('/guilds/topics', { characterId: me.id, folderId: folder.id, title: t.title.trim(), body: t.body, visibleRanks: tr }), () => { onClose(); load(); })}>Publier le sujet</button></div></Modal>;
}
function Forum({ g, me, run, load }) {
  const can = g.me.permissions.create_topics, [fid, setFid] = useState(null), [tid, setTid] = useState(null), [posts, setPosts] = useState([]), [reply, setReply] = useState(''), [nfold, setNfold] = useState(false), [ntopic, setNtopic] = useState(false);
  const folder = g.folders.find(f => f.id === fid), topic = folder?.topics.find(x => x.id === tid);
  const open = async x => { setTid(x.id); setPosts(await api(`/guilds/topics/${me.id}/${x.id}`).catch(() => [])); };
  const back = () => (tid !== null ? setTid(null) : setFid(null));
  const move = (kind, list, i, dir) => { const j = i + dir; if (j < 0 || j >= list.length) return; const ids = list.map(x => x.id); [ids[i], ids[j]] = [ids[j], ids[i]]; run(() => api('/guilds/reorder', { characterId: me.id, kind, ...(kind === 'topics' ? { folderId: fid } : {}), ids }), load); };
  const arrows = (kind, list, i) => !can ? null : <span className="ord"><button title="Monter" disabled={i === 0} onClick={() => move(kind, list, i, -1)}><ChevronUp size={14} /></button><button title="Descendre" disabled={i === list.length - 1} onClick={() => move(kind, list, i, 1)}><ChevronDown size={14} /></button></span>;
  return <div className="forum">
    {!folder && <><div className="row2 fhead"><h4>Catégories</h4>{can && <button className="btnlike" title="Créer une catégorie" onClick={() => setNfold(true)}><Plus size={14} /></button>}</div>
      {g.folders.map((f, i) => <div key={f.id} className="row2 sel"><button className="selitem" onClick={() => { setFid(f.id); setTid(null); }}><span>{f.name}</span><small><Eye size={12} /> {f.visible_ranks.join(', ')}</small></button>{arrows('folders', g.folders, i)}</div>)}
      {!g.folders.length && <small>Aucune catégorie : créez-en une avec le bouton +.</small>}</>}
    {folder && tid === null && <><div className="row2 fhead"><h4><button className="backbtn" onClick={back} title="Retour aux catégories"><ArrowLeft size={15} /> Catégories</button> <b>{folder.name}</b></h4>{can && <button className="btnlike" title="Créer un sujet" onClick={() => setNtopic(true)}><Plus size={14} /></button>}</div>
      {(folder.topics ?? []).map((x, i) => <div key={x.id} className="row2 sel"><button className="selitem" onClick={() => open(x)}><span>{x.title}</span><small>par {x.author} · {x.visible_ranks.join(', ')}</small></button>{arrows('topics', folder.topics, i)}</div>)}
      {!(folder.topics?.length) && <small>Aucun sujet dans cette catégorie.</small>}</>}
    {topic && <><div className="row2 fhead"><h4><button className="backbtn" onClick={back} title="Retour aux sujets"><ArrowLeft size={15} /> Sujets</button> <b>{topic.title}</b></h4></div>
      <div className="posts">{posts.map((p, i) => <Post key={i} p={p} />)}{!posts.length && <small>Aucun message pour l'instant.</small>}</div>
      <div className="replyrow"><input value={reply} onChange={e => setReply(e.target.value)} placeholder="Répondre… (**gras** · *italique* · #rrggbb)" /><button className="primary" onClick={() => run(() => api('/guilds/posts', { characterId: me.id, topicId: topic.id, body: reply }), () => { setReply(''); open(topic); })}>Envoyer</button></div></>}
    {nfold && <NewFolderModal g={g} me={me} run={run} load={load} onClose={() => setNfold(false)} />}
    {ntopic && <NewTopicModal g={g} folder={folder} me={me} run={run} load={load} onClose={() => setNtopic(false)} />}
  </div>;
}
function NewRankModal({ me, run, load, onClose }) {
  const [name, setName] = useState(''), [perms, setPerms] = useState({ create_topics: true });
  return <Modal onClose={onClose} className="inv guild" label="Nouveau rang"><div className="form"><h4><Plus size={14} /> Créer un rang</h4><input placeholder="Nom (ex : Sénéchal, Recrue…)" value={name} onChange={e => setName(e.target.value)} />
    {PERMS.map(([k, l]) => <label key={k} className="chk"><input type="checkbox" checked={!!perms[k]} onChange={e => setPerms({ ...perms, [k]: e.target.checked })} /> {l}</label>)}
    <button className="primary" disabled={name.trim().length < 2} onClick={() => run(() => api('/guilds/ranks', { characterId: me.id, name: name.trim(), permissions: perms }), () => { onClose(); load(); })}>Créer le rang</button></div></Modal>;
}
function Manage({ g, me, run, load }) {
  const [open, setOpen] = useState(false), [ren, setRen] = useState(null), [rname, setRname] = useState('');
  const saveRename = r => run(() => api(`/guilds/ranks/${r.id}/rename`, { characterId: me.id, name: rname }), () => { setRen(null); load(); });
  return <div className="form"><div className="row2"><h4>Rangs & privilèges</h4><button className="btnlike" title="Créer un rang" aria-label="Créer un rang" onClick={() => setOpen(true)}><Plus size={14} /></button></div>
    {g.ranks.map(r => <div key={r.id} className="item"><div className="head"><b>{r.name}</b>
      {ren === r.id ? <span className="row"><input value={rname} onChange={e => setRname(e.target.value)} /><button className="primary" onClick={() => saveRename(r)}>Renommer</button></span>
        : <span className="row">{r.is_leader ? <span className="pill">Chef — tous les droits</span> : <button title={`Renommer « ${r.name} »`} onClick={() => { setRen(r.id); setRname(r.name); }}><Pencil size={13} /></button>}</span>}</div>
      <div className="grid2">{PERMS.map(([k, l]) => <label key={k} className="chk"><input type="checkbox" disabled={r.is_leader} checked={r.is_leader || !!r.permissions[k]} onChange={e => run(() => api(`/guilds/ranks/${r.id}/permission`, { characterId: me.id, permission: k, value: e.target.checked }), load)} /> {l}</label>)}</div></div>)}
    {open && <NewRankModal me={me} run={run} load={load} onClose={() => setOpen(false)} />}
  </div>;
}
function NoGuild({ me, run, reload }) {
  const [name, setName] = useState(''), [tag, setTag] = useState(''), [inv, setInv] = useState([]); useEffect(() => { api(`/guilds/invitations/${me.id}`).then(setInv).catch(() => {}); }, []);
  return <div className="cols"><div className="form"><h3>Fonder une guilde</h3><input placeholder="Nom de la guilde" value={name} onChange={e => setName(e.target.value)} /><input placeholder="Tag (2-6 lettres)" maxLength={6} value={tag} onChange={e => setTag(e.target.value)} /><button className="primary" onClick={() => run(() => api('/guilds', { characterId: me.id, name, tag: tag || undefined }), reload)}>Créer</button>
    <h3>Postuler</h3><div className="row"><input placeholder="Nom de la guilde" value={name} onChange={e => setName(e.target.value)} /><button onClick={() => run(() => api('/guilds/apply', { characterId: me.id, name }), () => alert('Candidature envoyée'))}>Postuler</button></div></div>
    <div className="form"><h3>Invitations reçues</h3>{!inv.length && <small>Aucune invitation.</small>}{inv.map(i => <div key={i.id} className="item row2"><span>{i.guild} [{i.tag}]</span><span className="row"><button className="primary" onClick={() => run(() => api(`/guilds/invitations/${i.id}/accept`, { characterId: me.id, accept: true }), reload)}>Rejoindre</button><button onClick={() => run(() => api(`/guilds/invitations/${i.id}/accept`, { characterId: me.id, accept: false }), reload)}>Refuser</button></span></div>)}</div></div>;
}
export default function GuildModal() {
  const { me } = useSelector(s => s.game), d = useDispatch(), run = useDo(), refresh = useRefreshMe(), [g, setG] = useState(undefined), [tab, setTab] = useState('pres');
  const load = () => api(`/guilds/${me.id}`).then(setG).catch(() => setG(null)); useEffect(() => { load(); }, []); const reload = () => { load(); refresh(); }, leave = () => run(() => api('/guilds/leave', { characterId: me.id }), reload);
  const TABS = [['pres', ShieldCheck, '1. Présentation'], ['list', Users, `2. Liste (${g?.members.length ?? 0})`], ['forum', MessageSquare, '3. Forum'], ...(g?.me.leader ? [['manage', Settings, '4. Gestion (Chef)']] : [])];
  if (g === undefined) return null;
  return <Modal onClose={() => d(A.setPanel(null))} className="inv guild" label="Guilde">
    {g ? <><div className="seg tabs4">{TABS.map(([k, I, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><I size={15} /> {l}</button>)}</div><small className="rankline">Votre rang : <b>{g.me.rank}</b></small>
      {tab === 'pres' && <Pres g={g} me={me} run={run} load={load} leave={leave} />}{tab === 'list' && <Members g={g} me={me} run={run} load={load} />}{tab === 'forum' && <Forum g={g} me={me} run={run} load={load} />}{tab === 'manage' && g.me.leader && <Manage g={g} me={me} run={run} load={load} />}</>
      : <NoGuild me={me} run={run} reload={reload} />}</Modal>;
}
