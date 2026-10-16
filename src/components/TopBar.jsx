import { useSelector, useDispatch } from 'react-redux'; import { A } from '../store'; import { api } from '../lib/api'; import { useRefreshMe } from './GameCanvas'; import { useState } from 'react';
const DIRS = [[-1, -1, '↖'], [0, -1, '↑'], [1, -1, '↗'], [-1, 0, '←'], [0, 0, '✥'], [1, 0, '→'], [-1, 1, '↙'], [0, 1, '↓'], [1, 1, '↘']];
function ActionPad() {
  const { me, entities } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), [open, setOpen] = useState(false);
  const run = f => async () => { try { await f(); await refresh(); } catch (e) { d(A.toast(e.message)); } };
  const near = entities.filter(e => e.char_id !== me.id && Math.max(Math.abs(e.x - me.pos.x), Math.abs(e.y - me.pos.y)) <= me.range_eff);
  return <div className="pad"><div className="grid3">{DIRS.map(([dx, dy, l]) => <button key={l} onClick={dx || dy ? run(() => api('/actions/move', { characterId: me.id, x: me.pos.x + dx, y: me.pos.y + dy })) : () => setOpen(!open)}>{l}</button>)}</div>
    {open && <div className="menu"><button onClick={run(() => api('/actions/gather', { characterId: me.id }))}>Récolter (⚡2)</button>
      {near.map(e => <button key={e.x + ',' + e.y} onClick={run(async () => { if (e.kind === 'building') { const r = await api(`/buildings/${e.building_id}/interact`, { characterId: me.id }); d(A.toast(`${r.name}`)); if (r.kind === 'door') await api('/divine/door', { characterId: me.id, buildingId: r.id }); } else { const r = await api('/combat/attack', { characterId: me.id, targetCharacterId: e.char_id, targetMonsterId: e.monster_id }); d(A.toast(`-${r.dmg} PV`)); } })}>{e.kind === 'building' ? 'Interagir' : 'Attaquer'} : {e.name}</button>)}</div>}</div>;
}
const Bar = ({ l, v, m, c }) => <div className="bar" title={`${l} ${v}/${m}`}><i style={{ width: `${m ? Math.min(100, v / m * 100) : 0}%`, background: c }} /><span>{l} {v}/{m}</span></div>;
export default function TopBar() {
  const { me } = useSelector(s => s.game), d = useDispatch(); const ICON = [['faith', '🤝', 'Pactes & Fidèles'], ['mounts', '🐉', 'Invocations & Montures'], null, ['guild', '🛡', 'Guilde'], ['world', '🗺', 'Carte du monde']];
  return <header><div className="row"><a className="logo" href="/">Angemoniaque</a>
    {ICON.map((i, k) => i ? <button key={k} className="ico" title={i[2]} onClick={() => d(A.setPanel(i[0]))}>{i[1]}</button> : me && <ActionPad key={k} />)}</div>
    {me && <div className="row stats"><Bar l="PV" v={me.hp_current} m={me.hp_max} c="#c33" /><Bar l="⚡" v={me.energy_current} m={me.energy_max} c="#cb3" />{me.divine_energy_max > 0 && <Bar l="✨" v={me.divine_energy_current} m={me.divine_energy_max} c="#7be" />}
      {me.mount && <Bar l={me.mount.name} v={me.mount.energy_current} m={80} c="#9c5" />}<span>{me.rank.rank_name} · XP {me.xp} · 💰{me.gold} · 👁{me.see_eff} · ⚔{me.strength} · 🏃{me.agility} · 🛡{me.armor}</span></div>}</header>;
}
