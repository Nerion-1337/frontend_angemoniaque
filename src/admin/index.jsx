import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { LayoutDashboard, Users, ScrollText, Gem, Grid3x3, Crown, Skull, Sword, Sparkles, Castle, ArrowLeft, Menu, TrendingUp, Flame, Handshake, Scale } from 'lucide-react';
import Dashboard from './Dashboard.jsx'; import Races from './Races.jsx'; import StructuresTab from './StructuresTab.jsx'; import FaithTab from './FaithTab.jsx'; import PactTab from './PactTab.jsx'; import RulesTab from './RulesTab.jsx'; import MonsterDetails from './MonsterDetails.jsx'; import ItemsTab from './ItemsTab.jsx'; import SpellsTab from './SpellsTab.jsx'; import TilesTab from './TilesTab.jsx'; import PlayersTab from './PlayersTab.jsx'; import ScrollsTab from './ScrollsTab.jsx'; import ResourcesTab from './ResourcesTab.jsx'; import StatCostsTab from './StatCostsTab.jsx';
import { Toast } from './ui.jsx';
const SECTIONS = [['dashboard', 'Pilotage'], ['players', 'Joueurs'], ['races', 'Races & Rangs'], ['monster', 'Monstres'], ['item', 'Objets'], ['spell', 'Sorts'], ['scrolls', 'Parchemins'], ['tiles', 'Cases'], ['resources', 'Ressources'], ['building', 'Structures'], ['upgrades', 'Améliorations'], ['faith', 'Foi'], ['pact', 'Pacte'], ['rules', 'Règles générales']];
const ICONS = { dashboard: LayoutDashboard, players: Users, races: Crown, monster: Skull, item: Sword, spell: Sparkles, scrolls: ScrollText, tiles: Grid3x3, resources: Gem, building: Castle, upgrades: TrendingUp, faith: Flame, pact: Handshake, rules: Scale };
const SUBS = { dashboard: 'Vue d’ensemble du monde et journal d’administration', players: 'Tous les personnages par race : fiche, inventaire, coffre-fort, sorts, structures', races: 'Stats de base et paliers d’évolution', monster: 'Types (dont les montables), capacités, équipement, réapparition et placement sur les cartes',
  item: 'Catalogue par rareté et type d’équipement ; Divin : familles et exemplaires uniques', spell: 'Catalogue des sorts par rareté', resources: 'Carte des ressources par monde : ressources naturelles et secteurs (parts, type de case, stock)', scrolls: 'Parchemin + ressources → objet, sort ou structure (fabrication en jeu)', tiles: 'Types de case par monde : nom, description, énergie, sort en continu', building: 'Types de structure (réglages globaux) et structures posées sur les cartes, individualisables', rules: 'Perte à la mort, bonus des portes ouvertes', upgrades: 'Coût en XP des améliorations de caractéristiques (paliers)', faith: 'Gains des dieux, prières et bénédictions', pact: 'Caractéristiques transférées, compositions de pacte, pactes par rang' };
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
        {t === 'players' && <PlayersTab />}
        {t === 'races' && <Races />}
        {t === 'monster' && <MonsterDetails />}
        {t === 'item' && <ItemsTab />}
        {t === 'spell' && <SpellsTab />}
        {t === 'scrolls' && <ScrollsTab />}
        {t === 'tiles' && <TilesTab />}
        {t === 'resources' && <ResourcesTab />}
        {t === 'upgrades' && <StatCostsTab />}
        {t === 'building' && <StructuresTab />}
        {t === 'faith' && <FaithTab />}
        {t === 'pact' && <PactTab />}
        {t === 'rules' && <RulesTab />}
      </div>
    </main>
    {navOpen && <div className="scrim" onClick={() => setNavOpen(false)} />}
    <Toast msg={msg} tone={tone} onClose={() => d(Ad.msg(''))} />
  </div>;
}
