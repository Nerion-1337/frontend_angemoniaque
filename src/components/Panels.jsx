import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { api } from '../lib/api'; import { A } from '../store'; import { useRefreshMe } from './GameCanvas'; import { terrain } from '../lib/terrain'; import { COLORS } from '../lib/energy';
const Panel = ({ title, children }) => { const d = useDispatch(); return <div className="panel"><button className="x" onClick={() => d(A.setPanel(null))}>×</button><h3>{title}</h3>{children}</div>; };
function useData(path, deps = []) { const [v, set] = useState(null); const load = () => api(path).then(set).catch(() => {}); useEffect(() => { load(); }, deps); return [v, load]; }
function useDo() { const d = useDispatch(); return async (f, after) => { try { await f(); after?.(); } catch (e) { d(A.toast(e.message)); } }; }
export function FaithPanel() {
  const { me } = useSelector(s => s.game), run = useDo(), [pacts, lp] = useData(`/pacts/${me.id}`), [f, lf] = useData(`/faiths/${me.id}`); const [q, setQ] = useState(''); const reload = () => { lp(); lf(); };
  const human = me.race === 'human', god = me.rank.current_rank >= 5;
  return <Panel title="Pactes & Fidèles">
    <h4>Pactes {human ? '(1 max)' : ''}</h4>{pacts?.map(p => <div key={p.id}>{p.ethereal} ⇄ {p.human}{human && <button onClick={() => run(() => api(`/pacts/${p.id}/activate`, { characterId: me.id }))}>Activer le bonus (1 h)</button>}<button onClick={() => run(() => api(`/pacts/${p.id}/${me.id}`, undefined, 'DELETE'), reload)}>Résilier</button></div>)}
    {!human && <div className="row"><input placeholder="Nom de l'Humain" value={q} onChange={e => setQ(e.target.value)} /><button onClick={() => run(() => api('/pacts', { characterId: me.id, humanPseudo: q }), reload)}>Signer</button></div>}
    <h4>Foi</h4>{f?.asFollower.map(x => <div key={x.id}>Dieu : {x.god} ({x.status}) {x.status === 'accepted' && <select defaultValue="" onChange={e => e.target.value && run(() => api(`/faiths/${x.id}/request`, { characterId: me.id, choice: e.target.value }), reload)}><option value="">Requête (72 h)…</option>{['strength', 'agility', 'hp_max', 'recovery', 'heal'].map(c => <option key={c}>{c}</option>)}</select>}{x.request_choice && <small> en attente : {x.request_choice}</small>}</div>)}
    <div className="row"><input placeholder="Devenir fidèle de…" id="god" /><button onClick={() => run(() => api('/faiths/join', { characterId: me.id, godPseudo: document.getElementById('god').value }), reload)}>Demander</button></div>
    {god && <><h4>Mes fidèles</h4>{f?.asGod.map(x => <div key={x.id}>{x.follower} ({x.status}) {x.status === 'pending' && <><button onClick={() => run(() => api(`/faiths/${x.id}/accept`, { characterId: me.id, accept: true }), reload)}>Accepter</button><button onClick={() => run(() => api(`/faiths/${x.id}/accept`, { characterId: me.id, accept: false }), reload)}>Refuser</button></>}
      {x.request_choice && <button onClick={() => run(() => api(`/faiths/${x.id}/answer`, { characterId: me.id }), reload)}>Exaucer « {x.request_choice} » (✨5)</button>}</div>)}</>}</Panel>;
}
export function MountsPanel() {
  const { me } = useSelector(s => s.game), run = useDo(), refresh = useRefreshMe(), [m, load] = useData(`/mounts/${me.id}`);
  return <Panel title="Invocations & Montures">{m?.length ? m.map(x => <div key={x.id}><b>{x.name}</b> PV {x.hp_current}/{x.hp_max} · 🛡{x.armor} · ⚡{x.energy_current}/{x.energy_max} · 👁+{x.bonus_see} · 🎯+{x.bonus_range} {x.flying && '· vole'}
    {x.active ? <button onClick={() => run(() => api('/mounts/dismount', { characterId: me.id }), () => { load(); refresh(); })}>Descendre</button> : <button onClick={() => run(() => api('/mounts/summon', { characterId: me.id, mountId: x.id }), () => { load(); refresh(); })}>Invoquer</button>}</div>) : <p>Aucune monture.</p>}</Panel>;
}
export function GuildPanel() {
  const { me } = useSelector(s => s.game), run = useDo(), refresh = useRefreshMe(), [g, load] = useData(`/guilds/${me.id}`), [name, setName] = useState(''), [topic, setTopic] = useState(null), [posts, setPosts] = useState([]), [txt, setTxt] = useState('');
  const open = async t => { setTopic(t); setPosts(await api(`/guilds/topics/${me.id}/${t.id}`)); };
  if (!g) return <Panel title="Guilde"><div className="row"><input placeholder="Nom de guilde" value={name} onChange={e => setName(e.target.value)} /><button onClick={() => run(() => api('/guilds', { characterId: me.id, name }), () => { load(); refresh(); })}>Créer</button><button onClick={() => run(() => api('/guilds/join', { characterId: me.id, name }), () => { load(); refresh(); })}>Rejoindre</button></div></Panel>;
  return <Panel title={`Guilde — ${g.guild.name}`}><h4>Membres</h4><p>{g.members.map(m => m.pseudo).join(', ')}</p><h4>Dossiers</h4>
    {g.folders.map(f => <div key={f.id}>📁 {f.name}{(f.topics ?? []).map(t => <div key={t.id} className="topic" onClick={() => open(t)}>• {t.title}</div>)}
      <button onClick={() => { const title = prompt('Titre du sujet'), body = title && prompt('Message'); title && run(() => api('/guilds/topics', { characterId: me.id, folderId: f.id, title, body }), load); }}>+ sujet</button></div>)}
    <button onClick={() => { const n = prompt('Nom du dossier'); n && run(() => api('/guilds/folders', { characterId: me.id, name: n }), load); }}>+ dossier</button>
    {topic && <div className="posts"><h4>{topic.title}</h4>{posts.map((p, i) => <div key={i}><b>{p.pseudo}</b> {p.body}</div>)}<div className="row"><input value={txt} onChange={e => setTxt(e.target.value)} /><button onClick={() => run(() => api('/guilds/posts', { characterId: me.id, topicId: topic.id, body: txt }), () => { setTxt(''); open(topic); })}>Répondre</button></div></div>}
    <button onClick={() => run(() => api('/guilds/leave', { characterId: me.id }), () => { load(); refresh(); })}>Quitter</button></Panel>;
}
export function WorldPanel() {
  const { me } = useSelector(s => s.game);
  useEffect(() => { const c = document.getElementById('wm'), x = c.getContext('2d'), { width: w, height: h } = me.pos, k = c.width / w;
    for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) { x.fillStyle = '#' + COLORS[terrain(i, j).kind].toString(16).padStart(6, '0'); x.fillRect(i * k, j * k, Math.ceil(k), Math.ceil(k)); }
    x.fillStyle = '#f33'; x.beginPath(); x.arc(me.pos.x * k, me.pos.y * k, 4, 0, 7); x.fill(); }, []);
  return <Panel title="Carte du monde"><canvas id="wm" width="400" height="400" /><small>● vous · vert : plaines/forêts · gris : montagnes · bleu : lacs</small></Panel>;
}
