import { useSelector, useDispatch } from 'react-redux';
import { Handshake, PawPrint, Compass, Shield, Map as MapIcon, ArrowUp, Heart, Zap, Sparkles, Eye, Swords, Wind, ShieldHalf, Coins, Star, RefreshCw, Crosshair } from 'lucide-react';
import { A } from '../store'; import { api } from '../lib/api'; import { pct } from '../lib/hooks'; import { useRefreshMe } from './GameCanvas';
const DIRS = [[0, -1, 0, 'Nord'], [1, -1, 45, 'Nord-Est'], [1, 0, 90, 'Est'], [1, 1, 135, 'Sud-Est'], [0, 1, 180, 'Sud'], [-1, 1, 225, 'Sud-Ouest'], [-1, 0, 270, 'Ouest'], [-1, -1, 315, 'Nord-Ouest']];
function Wheel() {
  const { me } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), P = me.actor.pos;
  const go = (dx, dy) => async () => { try { await api('/actions/move', { characterId: me.id, x: P.x + dx, y: P.y + dy }); await refresh(); } catch (e) { d(A.toast(e.message)); } };
  return <div className="wheel">{DIRS.map(([dx, dy, a, n]) => <button key={a} className="arrow" style={{ '--a': a + 'deg' }} aria-label={`Aller ${n}`} onClick={go(dx, dy)}><ArrowUp size={30} strokeWidth={2.6} /></button>)}
    <button className="core" title="Actions autour du personnage" aria-label="Actions autour du personnage" onClick={() => d(A.setPanel('actions'))}><Compass size={62} strokeWidth={1.4} /></button></div>;
}
const Gauge = ({ I, v, m, c, label }) => <div className="gauge" style={{ '--c': c, '--p': pct(v, m) }} title={`${label} ${v}/${m}`}><I size={16} /><div className="track"><i /></div><b>{v}<small>/{m}</small></b></div>;
const Chip = ({ I, v, t }) => <span className="chip" title={t}><I size={15} />{v}</span>;
export default function TopBar() {
  const { me, panel } = useSelector(s => s.game), d = useDispatch();
  const nav = (k, I, t) => <button key={k} className={'mainico' + (panel === k ? ' on' : '')} title={t} aria-label={t} onClick={() => d(A.setPanel(k))}><I size={46} strokeWidth={1.5} /></button>;
  const a = me?.actor, hero = a?.kind === 'hero', m = hero ? me.mount : null;
  return <><a className="logo" href="/">Angemoniaque</a><header className="hud"><nav className="mainnav">{nav('faith', Handshake, 'Pactes & Fidèles')}{nav('mounts', PawPrint, 'Invocations & Montures')}{me ? <Wheel /> : <span className="wheel" />}{nav('guild', Shield, 'Guilde')}{nav('world', MapIcon, 'Carte du monde')}</nav>
    {me && <div className={'glass gauges' + (hero ? '' : ' summoned')}>{!hero && <span className="tagline"><Sparkles size={15} /> Invocation : {a.name}</span>}
      <div className="grp"><Gauge I={Heart} v={a.hp_current} m={a.hp_max} c="var(--hp)" label="Points de vie" /><Gauge I={Zap} v={a.energy_current} m={a.energy_max} c="var(--en)" label="Énergie" />
        {hero && me.hasDivine && <Gauge I={Sparkles} v={me.divine_energy_current} m={me.divine_energy_max} c="var(--div)" label="Énergie divine" />}</div>
      <div className="grp"><Chip I={RefreshCw} v={`+${a.recovery}/h`} t="Régénération unique (Vie, Énergie et Énergie divine)" /><Chip I={Eye} v={a.see} t="Vision (cases)" /><Chip I={Wind} v={a.agility} t="Agilité — chance de toucher = (votre agilité + 5) ÷ (votre agilité + celle de la cible + 10), entre 10 % et 95 %" /><Chip I={Swords} v={a.strength} t="Force" /><Chip I={Crosshair} v={a.damage} t="Dégâts = arme × (Force − Force requise des équipements), réduits de l'armure de la cible" /><Chip I={ShieldHalf} v={`${a.armor}/${a.magic_armor ?? 0}`} t="Armure physique / magique — réduit directement les dégâts reçus" />
        {hero && <><Chip I={Star} v={me.xp} t="Expérience" /><Chip I={Coins} v={me.gold} t="Or" /></>}</div></div>}
    {m && <div className="glass gauges mountbar"><span className="tagline"><PawPrint size={15} /> {m.name}</span><div className="grp"><Gauge I={Heart} v={m.hp_current} m={m.hp_max} c="var(--hp)" label="Vie de la monture" /><Gauge I={Zap} v={m.energy_current} m={m.energy_max} c="var(--en)" label="Énergie de la monture" /></div>
      <div className="grp"><Chip I={RefreshCw} v={`+${m.recovery}/h`} t="Régénération unique (Vie et Énergie)" /><Chip I={Eye} v={`+${m.bonus_see}`} t="Bonus de vision" /><Chip I={Wind} v={m.agility} t="Agilité" /><Chip I={Swords} v={m.strength} t="Force" /><Chip I={Crosshair} v={m.special_attack_damage} t={m.special_attack_name ?? 'Dégâts'} /><Chip I={ShieldHalf} v={`${m.armor}/0`} t="Armure physique / magique" /></div></div>}</header></>;
}
