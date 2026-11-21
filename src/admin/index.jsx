import { useSelector, useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import Dashboard from './Dashboard.jsx'; import Races from './Races.jsx'; import Entities from './Entities.jsx'; import MonsterDetails from './MonsterDetails.jsx'; import ItemsTab from './ItemsTab.jsx'; import SpellsTab from './SpellsTab.jsx';
const SECTIONS = [['dashboard', 'Pilotage'], ['races', 'Races & Rangs'], ['monster', 'Monstres'], ['item', 'Objets'], ['spell', 'Sorts'], ['mount', 'Montures'], ['building', 'Bâtiments']];
export default function Admin() {
  const section = useSelector(s => s.admin.section), msg = useSelector(s => s.admin.msg), d = useDispatch();
  const t = SECTIONS.find(x => x[0] === section)?.[0] ?? 'dashboard';
  return <div className="admin shell">
    <nav>{SECTIONS.map(([k, label]) => <button key={k} className={section === k ? 'on' : ''} onClick={() => d(Ad.setSection(k))}>{label}</button>)}
      <a href="#" className="back">← Jeu</a></nav>
    {msg && <p className="toastline" onClick={() => d(Ad.msg(''))}>{msg}</p>}
    {t === 'dashboard' && <Dashboard />}
    {t === 'races' && <Races />}
    {t === 'monster' && <MonsterDetails />}
    {t === 'item' && <ItemsTab />}
    {t === 'spell' && <SpellsTab />}
    {t === 'mount' && <Entities kind="mount" />}
    {t === 'building' && <Entities kind="building" />}
  </div>;
}
