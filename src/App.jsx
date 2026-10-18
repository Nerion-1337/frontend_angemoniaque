import { useEffect, useState } from 'react'; import { Settings } from 'lucide-react'; import { useSelector, useDispatch } from 'react-redux'; import { api, hasToken, setToken } from './lib/api'; import { A } from './store';
import { Login, CharSelect } from './components/Login'; import GameCanvas from './components/GameCanvas'; import TopBar from './components/TopBar'; import TileCard from './components/TileCard'; import SidePanel from './components/SidePanel'; import Location from './components/Location';
import ChatDock from './components/ChatDock'; import { FaithPanel, MountsPanel, ActionsPanel, WorldPanel } from './components/Panels'; import GuildModal from './components/Guild'; import Capital from './components/Capital'; import Account from './components/Account'; import Admin from './components/Admin'; import './styles.css';
export default function App() {
  const { auth, charId, me, panel, toast } = useSelector(s => s.game), d = useDispatch(), [hash, setHash] = useState(location.hash), [ready, setReady] = useState(!hasToken()), [menu, setMenu] = useState(false);
  useEffect(() => { const h = () => setHash(location.hash); addEventListener('hashchange', h);
    if (hasToken()) api('/auth/me').then(m => d(A.setAuth(m))).catch(() => setToken(null)).finally(() => setReady(true));   // session restaurée (y compris le rôle admin)
    return () => removeEventListener('hashchange', h); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => d(A.toast(null)), 3500); return () => clearTimeout(t); } }, [toast]);
  if (!ready) return null; if (!auth) return <Login />; if (hash === '#admin') return auth.admin ? <Admin /> : <div className="center box">Accès réservé.<a href="#">Retour</a></div>; if (!charId) return <CharSelect admin={auth.admin} />;
  return <><GameCanvas /><TopBar /><TileCard /><SidePanel /><Location /><ChatDock />{me && { faith: <FaithPanel />, mounts: <MountsPanel />, guild: <GuildModal />, world: <WorldPanel />, actions: <ActionsPanel />, capital: <Capital />, account: <Account /> }[panel]}{toast && <div className="toast">{toast}</div>}
    <div className="acctwrap"><button className="ico sm" title="Compte & paramètres" aria-label="Compte et paramètres" onClick={() => d(A.setPanel('account'))}><Settings size={18} /></button></div></>;
}
