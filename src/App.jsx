import { useEffect, useState, lazy, Suspense } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { api, hasToken, setToken } from './lib/api'; import { A } from './store';
import { Login, CharSelect } from './components/Login'; import Forum from './components/Forum'; import { isForumHash, googleReturn } from './lib/forum.js'; import GameCanvas from './components/GameCanvas'; import TopBar from './components/TopBar'; import TileCard from './components/TileCard'; import SidePanel from './components/SidePanel'; import Location from './components/Location';
import ChatDock from './components/ChatDock'; import Compass from './components/Compass'; import { FaithPanel, MountsPanel, ActionsPanel, WorldPanel, RankingPanel } from './components/Panels'; import GuildModal from './components/Guild'; import Capital from './components/Capital'; import Account from './components/Account'; import './styles.css';
// Interface admin : paquet séparé, téléchargé seulement par un compte admin identifié (Nginx le sert après vérification du
// cookie admin par le back) ; un refus (session expirée, compte rétrogradé) affiche un message au lieu de l'interface.
const Admin = lazy(() => import('./admin/index.jsx').catch(() => ({ default: () => <div className="center box">Accès à l'administration refusé : reconnectez-vous avec un compte administrateur.<a href="#">Retour</a></div> })));
export default function App() {
  const { auth, charId, me, panel, toast } = useSelector(s => s.game), d = useDispatch(), [hash, setHash] = useState(location.hash), [ready, setReady] = useState(!hasToken()), [menu, setMenu] = useState(false);
  useEffect(() => { const h = () => setHash(location.hash); addEventListener('hashchange', h);
    const g = googleReturn(location.hash);   // retour de la connexion Google : jeton (ou erreur affichée sur l'écran de connexion)
    if (g) { history.replaceState(null, '', location.pathname + location.search); setHash(''); if (g.token) setToken(g.token); else sessionStorage.setItem('loginError', g.error); }
    if (hasToken()) api('/auth/me').then(m => { d(A.setAuth(m)); if (g?.token && m.admin) location.hash = '#admin'; }).catch(() => setToken(null)).finally(() => setReady(true));   // session restaurée (y compris le rôle admin)
    return () => removeEventListener('hashchange', h); }, []);
  useEffect(() => { if (toast) { const t = setTimeout(() => d(A.toast(null)), 3500); return () => clearTimeout(t); } }, [toast]);
  if (!ready) return null; if (isForumHash(hash)) return <Forum hash={hash} />;   // annonces, forum, pages légales : avec ou sans compte
  if (!auth) return <Login />; if (hash === '#admin') return auth.admin ? <Suspense fallback={<div className="center box">Chargement de l'administration…</div>}><Admin /></Suspense> : <div className="center box">Accès réservé.<a href="#">Retour</a></div>; if (!charId) return <CharSelect admin={auth.admin} />;
  return <><GameCanvas /><TopBar /><TileCard /><SidePanel /><Location /><Compass /><ChatDock />{me && { faith: <FaithPanel />, mounts: <MountsPanel />, guild: <GuildModal />, world: <WorldPanel />, actions: <ActionsPanel />, capital: <Capital />, account: <Account />, ranking: <RankingPanel /> }[panel]}{toast && <div className="toast" role="status">{toast}</div>}</>;
}
