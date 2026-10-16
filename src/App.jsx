import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { hasToken } from './lib/api'; import { A } from './store';
import { Login, CharSelect } from './components/Login'; import GameCanvas from './components/GameCanvas'; import TopBar from './components/TopBar'; import TileCard from './components/TileCard'; import SidePanel from './components/SidePanel';
import ChatDock from './components/ChatDock'; import { FaithPanel, MountsPanel, GuildPanel, WorldPanel } from './components/Panels'; import Admin from './components/Admin'; import './styles.css';
export default function App() {
  const { auth, charId, me, panel, toast } = useSelector(s => s.game), d = useDispatch(), [hash, setHash] = useState(location.hash);
  useEffect(() => { addEventListener('hashchange', () => setHash(location.hash)); if (hasToken() && !auth) d(A.setAuth({ admin: false })); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => d(A.toast(null)), 3500); return () => clearTimeout(t); } }, [toast]);
  if (!auth) return <Login />; if (hash === '#admin') return <Admin />; if (!charId) return <CharSelect admin={auth.admin} />;
  return <><GameCanvas /><TopBar /><TileCard /><SidePanel /><ChatDock />{me && { faith: <FaithPanel />, mounts: <MountsPanel />, guild: <GuildPanel />, world: <WorldPanel /> }[panel]}{toast && <div className="toast">{toast}</div>}
    <button className="ico acct" title="Compte & paramètres" onClick={() => { localStorage.clear(); location.reload(); }}>⚙</button></>;
}
