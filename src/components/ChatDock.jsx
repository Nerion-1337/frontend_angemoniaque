// Barre d'accès (bas à droite) : Messagerie, Classement et Paramètres ; fenêtre de messagerie (vision, guilde, courrier).
import { useEffect, useRef, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux';
import { MessageCircle, Settings, X, Send, PenLine, Reply, Inbox, Trophy } from 'lucide-react';
import { api } from '../lib/api'; import { A } from '../store'; import { CHANNELS, ago, reSubject, groupChat } from '../lib/chat';

function Chat({ msgs, me }) {
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }); }, [msgs.length]);
  return <div className="msgs">{groupChat(msgs, me).map((m, i) => <div key={m.id ?? i} className={`bubble${m.mine ? ' mine' : ''}${m.cont ? ' cont' : ''}`}>
    {!m.cont && <div className="who"><b>{m.mine ? 'Vous' : m.pseudo}</b><small>{ago(m.created_at)}</small></div>}<p>{m.body}</p></div>)}<i ref={end} /></div>;
}
function Mail({ msgs, reply }) {
  const [open, setOpen] = useState(null);
  const list = msgs.filter((m, i) => msgs.findIndex(x => x.id === m.id) === i);   // un courrier envoyé à soi-même apparaît deux fois côté serveur
  return <div className="msgs mails">{list.map(m => <div key={m.id} className={`mail${m.read === false ? ' unread' : ''}${open === m.id ? ' open' : ''}`}>
    <button className="mailhead" onClick={() => setOpen(open === m.id ? null : m.id)}><b>{m.subject || '(sans objet)'}</b><small>{m.pseudo} · {ago(m.created_at)}</small></button>
    {open === m.id && <><p>{m.body}</p><button className="sm" onClick={() => reply(m)}><Reply size={14} /> Répondre</button></>}</div>)}</div>;
}

export default function ChatDock() {
  const { me, panel } = useSelector(s => s.game), d = useDispatch();
  const [open, setOpen] = useState(false), [tab, setTab] = useState('vision'), [msgs, setMsgs] = useState([]), [un, setUn] = useState({ vision: 0, guild: 0, mail: 0 });
  const [txt, setTxt] = useState(''), [to, setTo] = useState(''), [subj, setSubj] = useState(''), [compose, setCompose] = useState(false), [busy, setBusy] = useState(false);
  const poll = async () => {
    if (!me) return;
    try { setUn(await api(`/messages/${me.id}/unread/count`)); if (open) { setMsgs(await api(`/messages/${me.id}/${tab}`)); api(`/messages/${me.id}/read`, { channel: tab }).catch(() => {}); } } catch { /* réseau : on réessaie au prochain passage */ }
  };
  useEffect(() => { poll(); const i = setInterval(poll, 6000); return () => clearInterval(i); }, [open, tab, me?.id]);   // corps de bloc
  useEffect(() => { setMsgs([]); setCompose(false); }, [tab]);
  if (!me) return null;
  const send = async e => {
    e?.preventDefault(); if (!txt.trim() || busy) return; setBusy(true);
    try { await api('/messages', { characterId: me.id, channel: tab, body: txt.trim(), to: tab === 'mail' ? to.trim() : undefined, subject: tab === 'mail' ? subj.trim() || undefined : undefined });
      setTxt(''); if (tab === 'mail') { setCompose(false); setTo(''); setSubj(''); d(A.toast('Message envoyé')); } poll();
    } catch (er) { d(A.toast(er.message)); } finally { setBusy(false); }
  };
  const reply = m => { setTo(m.pseudo); setSubj(reSubject(m.subject)); setTxt(''); setCompose(true); };
  const total = un.vision + un.guild + un.mail, cur = CHANNELS.find(c => c[0] === tab);
  const noGuild = tab === 'guild' && !me.guild_id;
  return <div className="dock">
    {open && <section className="chatbox" role="dialog" aria-label="Messagerie">
      <header><MessageCircle size={18} /><h3>Messagerie</h3><span className="grow" /><button className="x" aria-label="Fermer la messagerie" onClick={() => setOpen(false)}><X size={14} /></button></header>
      <nav className="chantabs">{CHANNELS.map(([k, l, c]) => <button key={k} style={{ '--c': c }} className={tab === k ? 'on' : ''} aria-pressed={tab === k} onClick={() => setTab(k)}>
        <i className="cdot" />{l}{un[k] > 0 && <em>{un[k]}</em>}</button>)}</nav>
      <small className="chanhint">{cur[3]}</small>
      {noGuild ? <div className="empty"><Inbox size={22} />Vous n'appartenez à aucune guilde.</div>
        : tab === 'mail' && compose ? <form className="compose" onSubmit={send}>
          <input placeholder="Destinataire (pseudo)" value={to} onChange={e => setTo(e.target.value)} required />
          <input placeholder="Objet" value={subj} maxLength={80} onChange={e => setSubj(e.target.value)} />
          <textarea placeholder="Votre message…" rows="6" maxLength={1000} value={txt} onChange={e => setTxt(e.target.value)} required />
          <div className="row"><button type="button" className="ghost" onClick={() => setCompose(false)}>Annuler</button><span className="grow" />
            <button className="primary" disabled={busy || !txt.trim() || !to.trim()}><Send size={14} /> Envoyer</button></div></form>
        : msgs.length === 0 ? <div className="empty"><Inbox size={22} />{tab === 'mail' ? 'Aucun courrier reçu.' : 'Aucun message pour le moment. Écrivez le premier !'}</div>
          : tab === 'mail' ? <Mail msgs={msgs} reply={reply} /> : <Chat msgs={msgs} me={me.pseudo} />}
      {tab === 'mail' ? !compose && <button className="primary wide" onClick={() => { setTo(''); setSubj(''); setTxt(''); setCompose(true); }}><PenLine size={14} /> Nouveau courrier</button>
        : !noGuild && <form className="sendrow" onSubmit={send}><input placeholder={tab === 'vision' ? 'Parler aux joueurs proches…' : 'Écrire à la guilde…'} maxLength={1000} value={txt} onChange={e => setTxt(e.target.value)} />
          <button className="send" aria-label="Envoyer" disabled={busy || !txt.trim()}><Send size={16} /></button></form>}
    </section>}
    <div className="dockbar">
      <button className={`dockbtn${open ? ' on' : ''}`} aria-label={`Messagerie${total ? ` (${total} non lu${total > 1 ? 's' : ''})` : ''}`} onClick={() => setOpen(!open)}>
        <MessageCircle size={20} /><span>Messages</span>{total > 0 && <em className="count">{total > 99 ? '99+' : total}</em>}</button>
      <button className={`dockbtn${panel === 'ranking' ? ' on' : ''}`} aria-label="Classement des joueurs" onClick={() => d(A.setPanel(panel === 'ranking' ? null : 'ranking'))}><Trophy size={20} /><span>Classement</span></button>
      <button className={`dockbtn${panel === 'account' ? ' on' : ''}`} aria-label="Compte et paramètres" onClick={() => d(A.setPanel(panel === 'account' ? null : 'account'))}><Settings size={20} /><span>Paramètres</span></button>
    </div>
  </div>;
}
