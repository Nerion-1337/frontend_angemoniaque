import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Dices, Ban, Info } from 'lucide-react'; import Modal from './Modal'; import { api } from '../lib/api'; import { pathEnergy } from '../lib/energy'; import { A } from '../store'; import { useRefreshMe } from './GameCanvas';
const cache = new Map(), HEALTH = { 'En pleine forme': '#5fd08a', 'Bon état': '#b6dd6a', 'Blessé': '#f2b84b', 'Souffrant': '#e5545a' }, KIND = { plain: 'Plaine', forest: 'Forêt', mountain: 'Massif rocheux', shallow: 'Eau peu profonde', deep: 'Eau profonde' };
function useCell(t, mapId, extra = '') { const [c, set] = useState(null); useEffect(() => { if (!t) return set(null); const k = `${mapId}:${t.x},${t.y}${extra}`; if (cache.has(k) && Date.now() - cache.get(k).at < 3000) return set(cache.get(k).v);
  api(`/map/${mapId}/cell?x=${t.x}&y=${t.y}${extra}`).then(v => { cache.set(k, { v, at: Date.now() }); set(v); }).catch(() => {}); }, [t?.x, t?.y]); return c; }
function Entity({ e }) {   // joueur : pseudo, race, guilde (jamais PV ni armure) ; monstre : PV et armure ; invocation : son maître
  if (!e) return <span>Case libre</span>;
  if (e.kind === 'character') return <div className="ent"><b>{e.name}</b> <small>{e.race} · {e.rank_name}</small><br /><small>Guilde : {e.guild ?? 'Aucune guilde'}</small></div>;
  if (e.kind === 'summon') return <div className="ent"><b>🔮 {e.name}</b> <small>Invocation</small><br /><small>Invoquée par : {e.owner}</small></div>;
  if (e.kind === 'monster') return <div className="ent"><b>{e.name}</b> <small>Monstre</small><br /><small>PV : {e.mhp}/{e.mhpmax} · Armure : {e.marmor}/{e.mmarmor ?? 0}</small></div>;
  return <div className="ent"><b>{e.name}</b> <small>Structure</small></div>;
}
function InfoModal({ cell, close }) {
  const e = cell.entity; return <Modal onClose={close} className="inv small" label=""><h3>Case ({cell.x}, {cell.y}) — {KIND[cell.terrain.kind]}</h3>
    {e?.kind === 'character' ? <><p><b>{e.name}</b> · {e.race} · {e.rank_name}<br />Guilde : {e.guild ?? 'Aucune guilde'}</p><p>État de forme : <b style={{ color: HEALTH[e.health] }}>{e.health}</b></p>
      <h4>Équipements visibles</h4><div className="gear">{(e.visibleGear?.length ? e.visibleGear : ['Aucun équipement visible']).map(g => <span key={g} className="pill">{g}</span>)}</div></>
      : e ? <p><b>{e.name}</b>{e.kind === 'monster' && <><br />PV : {e.mhp}/{e.mhpmax} · Armure : {e.marmor}/{e.mmarmor ?? 0}</>}</p> : <p>Case libre. Ressource : {cell.terrain.resource ?? 'aucune'}.</p>}</Modal>;
}
export default function TileCard() {
  const { hover, selected, me } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), mapId = me?.actor.pos.map_id;
  const hc = useCell(!selected && hover, mapId), sc = useCell(selected, mapId); const [act, setAct] = useState(''), [kind, setKind] = useState('wall'), [prev, setPrev] = useState(null), [info, setInfo] = useState(null);
  useEffect(() => { setAct(''); }, [selected?.x, selected?.y]);
  useEffect(() => { const e = sc?.entity; setPrev(null); if (selected && e && ['character', 'monster', 'summon'].includes(e.kind) && e.char_id !== me.id) api(`/combat/preview/${me.id}/${selected.x}/${selected.y}`).then(setPrev).catch(() => {}); }, [sc]);
  if (!me) return null; const P = me.actor.pos, hero = me.actor.kind === 'hero', mount = hero ? me.mount : null, fly = !!mount?.flying, aq = !!mount?.aquatic, pe = (t, o = {}) => pathEnergy(P, t, { flying: fly, aquatic: aq, ...o }), kinds = Object.keys(me.scrolls ?? {}).filter(k => k !== 'ship' && me.scrolls[k] > 0),
    E = (mv, ac = 0) => mv === Infinity ? '∞' : mount && mv ? `⚡${mv} monture${ac ? ` + ⚡${ac}` : ''}` : `⚡${mv + ac}`;   // seuls les déplacements paient la monture
  if (selected) {
    const e = sc?.entity, t = { x: selected.x, y: selected.y }, dist = Math.max(Math.abs(t.x - P.x), Math.abs(t.y - P.y)), range = me.range_eff, attackable = e && ['character', 'monster', 'summon'].includes(e.kind) && e.char_id !== me.id, res = sc?.terrain;
    const acts = []; if (!e && (t.x !== P.x || t.y !== P.y)) acts.push(['go', 'S\'y rendre', pe(t), 0]);
    if (e && dist > 1 && e.char_id !== me.id) acts.push(['approach', `S'approcher à côté de ${e.name}`, pe(t, { stopAt: 1 }), 0]);
    if (attackable) { acts.push(['attack', `Attaquer ${e.name}`, pe(t, { stopAt: range }), 5]); if (mount?.special_attack_name) acts.push(['breath', `${mount.special_attack_name} (${mount.special_attack_damage} dég.)`, pe(t, { stopAt: range }), 0, mount.special_attack_energy]); }
    if (e?.kind === 'building') acts.push(['interact', e.building_kind === 'door' ? `Franchir ${e.name}` : `Interagir avec ${e.name}`, 0, 0]);
    if (!e && res?.resource && !(res.kind === 'deep' && !fly && !aq)) acts.push(['harvest', `Récolter ${res.resource}`, pe(t), 4]); if (!e && kinds.length) acts.push(['build', 'Poser un élément', pe(t, { stopAt: 1 }), 10]);
    acts.push(['info', 'Plus d\'informations (état de forme & équipement)', 0, 0]);
    const ids = { characterId: me.id, targetCharacterId: e?.char_id, targetMonsterId: e?.monster_id, targetSummonId: e?.summon_id };
    const run = async () => { try {
      if (act === 'info') { setInfo(await api(`/map/${mapId}/cell?x=${t.x}&y=${t.y}&details=1`)); return; }
      let msg = null;
      if (act === 'go') await api('/actions/move', { characterId: me.id, ...t }); if (act === 'approach') await api('/actions/approach', { characterId: me.id, ...t });
      if (act === 'build') await api('/buildings/place', { characterId: me.id, kind: kinds.includes(kind) ? kind : kinds[0], ...t }); if (act === 'harvest') await api('/actions/gather', { characterId: me.id, ...t });
      if (act === 'attack' || act === 'breath') { const r = await api('/combat/attack', { ...ids, useMountBreath: act === 'breath' }); msg = r.missed ? `Raté ! (${r.hitChance}% de chances de toucher)` : `Touché : -${r.dmg} PV${r.killed ? ' — cible vaincue !' : ''}`; }
      if (act === 'interact') { const r = await api(`/buildings/${e.building_id}/interact`, { characterId: me.id }); if (r.kind === 'door') await api('/divine/door', { characterId: me.id, buildingId: r.id }); else if (r.kind === 'capital') d(A.setPanel('capital')); else msg = r.name; }
      if (msg) d(A.toast(msg)); await refresh(); d(A.setSelected(null)); } catch (er) { d(A.toast(er.message)); } };
    return <><div className="card" style={{ left: selected.sx + 14, top: selected.sy + 14 }}><button className="x" aria-label="Fermer" onClick={() => d(A.setSelected(null))}>×</button>
      <div><b>{KIND[res?.kind] ?? '…'}</b> <small>({t.x}, {t.y})</small> · <small>⚡ {res ? (res.cost >= 99 ? '∞' : res.cost) : '…'}/case · {res?.resource ?? 'aucune ressource'}</small></div><Entity e={e} />
      {e && dist === 1 && !attackable && e.kind !== 'building' && <div className="note"><Ban size={14} /> Case occupée (vous êtes juste à côté).</div>}
      {prev?.hitChance != null && <div className="hit"><Dices size={14} /> Chance de toucher (agilité) : <b>{prev.hitChance}%</b> <small>esquive {prev.dodge}%</small></div>}
      <select value={act} onChange={x => setAct(x.target.value)}><option value="">— Actions possibles —</option>{acts.map(([k, l, mv, ac, mc]) => <option key={k} value={k} disabled={mv === Infinity}>{l}{k !== 'info' ? ` — ${mc ? `⚡${mc} monture` + (mv ? ` + ${E(mv)}` : '') : E(mv, ac)}` : ''}</option>)}</select>
      {act === 'build' && <select value={kinds.includes(kind) ? kind : kinds[0]} onChange={x => setKind(x.target.value)}>{[['wall', 'Muraille de pierre'], ['tower', 'Tour de garde'], ['factory', 'Usine de production'], ['totem', 'Totem de zone']].filter(([k]) => kinds.includes(k)).map(([k, l]) => <option key={k} value={k}>{l} (×{me.scrolls[k]})</option>)}</select>}
      <button className="primary" disabled={!act} onClick={run}>{act === 'info' ? <><Info size={14} /> Voir</> : 'Valider'}</button></div>{info && <InfoModal cell={info} close={() => setInfo(null)} />}</>;
  }
  return hover ? <div className="card hover" style={{ left: hover.sx + 14, top: hover.sy + 14 }}>{hc ? <><div><b>{KIND[hc.terrain.kind]}</b> <small>({hc.x}, {hc.y}) · ⚡ {hc.terrain.cost >= 99 ? '∞' : hc.terrain.cost}/case · {hc.terrain.resource ?? 'aucune ressource'}</small></div><Entity e={hc.entity} /><small>Trajet : {E(pe(hover))}</small></> : '…'}</div> : null;
}
