import { useEffect, useState } from 'react'; import { useSelector } from 'react-redux'; import { api } from '../lib/api';
const TABS = [['vision', 'Vision', '#4aa3ff'], ['guild', 'Guilde', '#4cd07d'], ['mail', 'Messagerie', '#ccc']];
export default function ChatDock() {
  const { me } = useSelector(s => s.game), [open, setOpen] = useState(false), [tab, setTab] = useState('vision'), [msgs, setMsgs] = useState([]), [un, setUn] = useState({ vision: 0, guild: 0, mail: 0 }), [txt, setTxt] = useState(''), [to, setTo] = useState(''), [subj, setSubj] = useState('');
  const poll = async () => { if (!me) return; setUn(await api(`/messages/${me.id}/unread/count`)); if (open) { setMsgs(await api(`/messages/${me.id}/${tab}`)); api(`/messages/${me.id}/read`, { channel: tab }); } };
  useEffect(() => { poll(); const i = setInterval(poll, 6000); return () => clearInterval(i); }, [open, tab, me?.id]);
  if (!me) return null; const send = async () => { await api('/messages', { characterId: me.id, channel: tab, body: txt, to: tab === 'mail' ? to : undefined, subject: tab === 'mail' ? subj : undefined }).catch(e => alert(e.message)); setTxt(''); poll(); };
  return <div className="chat">{open && <div className="chatbox"><div className="tabs">{TABS.map(([k, l, c]) => <button key={k} style={{ borderColor: c }} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</div>
    <div className="msgs">{msgs.map((m, i) => <div key={i}><b>{m.pseudo}</b> {m.subject && <u>{m.subject}</u>} {m.body}{tab === 'vision' && <small> · expire 12 h</small>}</div>)}</div>
    {tab === 'mail' && <><input placeholder="Destinataire" value={to} onChange={e => setTo(e.target.value)} /><input placeholder="Objet" value={subj} onChange={e => setSubj(e.target.value)} /></>}<div className="row"><input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} /><button onClick={send}>➤</button></div></div>}
    <button className="ico chatbtn" onClick={() => setOpen(!open)}>💬{un.vision > 0 && <i className="dot" style={{ background: '#4aa3ff', right: 2 }} />}{un.guild > 0 && <i className="dot" style={{ background: '#4cd07d', right: 14 }} />}{un.mail > 0 && <i className="badge">{un.mail}</i>}</button></div>;
}
