import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { LayoutDashboard, Crown, Skull, Sword, Sparkles, PawPrint, Castle, ArrowLeft, Menu } from 'lucide-react';
import Dashboard from './Dashboard.jsx'; import Races from './Races.jsx'; import Entities from './Entities.jsx'; import MonsterDetails from './MonsterDetails.jsx'; import ItemsTab from './ItemsTab.jsx'; import SpellsTab from './SpellsTab.jsx';
import { Toast } from './ui.jsx';
const SECTIONS = [['dashboard', 'Pilotage'], ['races', 'Races & Rangs'], ['monster', 'Monstres'], ['item', 'Objets'], ['spell', 'Sorts'], ['mount', 'Montures'], ['building', 'Bâtiments']];
const ICONS = { dashboard: LayoutDashboard, races: Crown, monster: Skull, item: Sword, spell: Sparkles, mount: PawPrint, building: Castle };
const SUBS = { dashboard: 'Vue d’ensemble du monde et journal d’administration', races: 'Stats de base et paliers d’évolution', monster: 'Types, capacités, équipement et placement sur les cartes',
  item: 'Catalogue par rareté et type d’équipement', spell: 'Catalogue des sorts par rareté', mount: 'Montures et leurs caractéristiques', building: 'Bâtiments, passifs et production' };
const KEY = 'admin.section';   // dernière section ouverte (confort local ; absent = Pilotage)
export default function Admin() {
  const section = useSelector(s => s.admin.section), msg = useSelector(s => s.admin.msg), tone = useSelector(s => s.admin.tone), d = useDispatch();
  const [navOpen, setNavOpen] = useState(false);
  useEffect(() => { try { const k = localStorage.getItem(KEY); if (k && SECTIONS.some(x => x[0] === k)) d(Ad.setSection(k)); } catch { /* stockage indisponible */ } }, []);
  const t = SECTIONS.find(x => x[0] === section)?.[0] ?? 'dashboard';
  const go = k => { d(Ad.setSection(k)); setNavOpen(false); try { localStorage.setItem(KEY, k); } catch { /* idem */ } };
  const label = SECTIONS.find(x => x[0] === t)[1], Icon = ICONS[t];
  return <div className={`admin shell${navOpen ? ' navopen' : ''}`}>
    <aside>
      <div className="brand"><span className="logo">Angemoniaque</span><small>Administration</small></div>
      <nav>{SECTIONS.map(([k, l]) => { const I = ICONS[k]; return <button key={k} className={section === k ? 'on' : ''} aria-current={section === k ? 'page' : undefined} onClick={() => go(k)}><I size={17} />{l}</button>; })}</nav>
      <a href="#" className="back"><ArrowLeft size={16} /> Retour au jeu</a>
    </aside>
    <main>
      <header className="topbar">
        <button className="ico sm burger" aria-label="Menu" onClick={() => setNavOpen(o => !o)}><Menu size={18} /></button>
        <Icon size={22} className="topico" />
        <div><h1>{label}</h1><small>{SUBS[t]}</small></div>
      </header>
      <div className="content">
        {t === 'dashboard' && <Dashboard />}
        {t === 'races' && <Races />}
        {t === 'monster' && <MonsterDetails />}
        {t === 'item' && <ItemsTab />}
        {t === 'spell' && <SpellsTab />}
        {t === 'mount' && <Entities kind="mount" />}
        {t === 'building' && <Entities kind="building" />}
      </div>
    </main>
    {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}
    <Toast msg={msg} tone={tone} onClose={() => d(Ad.msg(''))} />
  </div>;
}
