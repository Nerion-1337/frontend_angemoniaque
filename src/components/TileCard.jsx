import { useEffect, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { api } from '../lib/api'; import { pathEnergy } from '../lib/energy'; import { A } from '../store'; import { useRefreshMe } from './GameCanvas';
const cache = new Map();
function useCell(t, mapId) { const [c, set] = useState(null); useEffect(() => { if (!t) return set(null); const k = `${mapId}:${t.x},${t.y}`; if (cache.has(k) && Date.now() - cache.get(k).at < 3000) return set(cache.get(k).v);
  api(`/map/${mapId}/cell?x=${t.x}&y=${t.y}`).then(v => { cache.set(k, { v, at: Date.now() }); set(v); }).catch(() => {}); }, [t?.x, t?.y]); return c; }
function Summary({ c }) { if (!c) return '…'; const e = c.entity; return <div><b>{c.terrain.kind}</b> · ressource : {c.terrain.resource ?? '—'} · énergie/case : {c.terrain.cost >= 99 ? '∞' : c.terrain.cost}
  <br />{e ? <>{e.kind === 'character' ? `${e.name} (${e.race}, ${e.rank_name}) ${e.hp_current}/${e.hp_max} PV` : e.name}</> : 'Case libre'}</div>; }
export default function TileCard() {
  const { hover, selected, me } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), mapId = me?.pos.map_id;
  const hc = useCell(!selected && hover, mapId), sc = useCell(selected, mapId); const [act, setAct] = useState(''), [info, setInfo] = useState(null), [kind, setKind] = useState('wall');
  if (!me) return null; const flying = me.mount?.flying;
  if (selected) {
    const e = sc?.entity, t = { x: selected.x, y: selected.y }, from = me.pos, range = me.range_eff;
    const actions = []; if (!e) { actions.push(['go', `S'y rendre`, pathEnergy(from, t, { flying })]); actions.push(['build', 'Poser un élément', pathEnergy(from, t, { flying, stopAt: 1 }) + 3]); }
    if (e && e.kind !== 'building' && e.char_id !== me.id) actions.push(['attack', 'Attaquer', pathEnergy(from, t, { flying, stopAt: range }) + 2]);
    if (e?.kind === 'building') actions.push(['interact', 'Interagir', 0]); actions.push(['info', 'Plus d\'informations', 0]);
    const run = async () => { try { setInfo(null);
      if (act === 'go') await api('/actions/move', { characterId: me.id, ...t });
      if (act === 'build') await api('/buildings/place', { characterId: me.id, kind, ...t });
      if (act === 'attack') { const r = await api('/combat/attack', { characterId: me.id, targetCharacterId: e.char_id, targetMonsterId: e.monster_id }); d(A.toast(`-${r.dmg} PV${r.killed ? ' — cible vaincue !' : ''}`)); }
      if (act === 'interact') { const r = await api(`/buildings/${e.building_id}/interact`, { characterId: me.id }); if (r.kind === 'door') { await api('/divine/door', { characterId: me.id, buildingId: r.id }); } else setInfo(r); }
      if (act === 'info') setInfo(sc); await refresh(); if (act !== 'info' && act !== 'interact') d(A.setSelected(null)); } catch (er) { d(A.toast(er.message)); } };
    return <div className="card" style={{ left: selected.sx + 12, top: selected.sy + 12 }}><button className="x" onClick={() => d(A.setSelected(null))}>×</button><Summary c={sc} />
      <select value={act} onChange={e => setAct(e.target.value)}><option value="">— Actions —</option>{actions.map(([k, l, en]) => <option key={k} value={k} disabled={en === Infinity}>{l}{k !== 'info' ? ` (⚡${en === Infinity ? '∞' : en})` : ''}</option>)}</select>
      {act === 'build' && <select value={kind} onChange={e => setKind(e.target.value)}>{['wall', 'tower', 'factory', 'totem'].map(k => <option key={k}>{k}</option>)}</select>}
      <button disabled={!act} onClick={run}>Valider</button>{info && <pre>{JSON.stringify(info, null, 1)}</pre>}</div>;
  }
  return hover ? <div className="card hover" style={{ left: hover.sx + 12, top: hover.sy + 12 }}><Summary c={hc} /> {hc && <small>⚡ trajet {pathEnergy(me.pos, hover, { flying })}</small>}</div> : null;
}
