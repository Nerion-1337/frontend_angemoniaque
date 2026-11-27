import { useEffect, useRef, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Dices, Ban, Info, X, Footprints, Swords, Hammer, Pickaxe, DoorOpen, Crosshair, PawPrint, Eye, Zap, MapPin } from 'lucide-react'; import Modal from './Modal'; import { api } from '../lib/api'; import { pathEnergy } from '../lib/energy'; import { setTileCosts, spellLine } from '../lib/tiles'; import { inSafeZone } from '../lib/terrain'; import { A } from '../store'; import { useRefreshMe } from './GameCanvas'; import { levelAt, levelLabel } from '../lib/levels';
const cache = new Map(), HEALTH = { 'En pleine forme': '#5fd08a', 'Bon état': '#b6dd6a', 'Blessé': '#f2b84b', 'Souffrant': '#e5545a' }, KIND = { plain: 'Plaine', forest: 'Forêt', mountain: 'Massif rocheux', shallow: 'Eau peu profonde', deep: 'Eau profonde', arid: 'Terre aride', snow: 'Pics glacés', ether: 'Pics d’éther', volcano: 'Volcan (brûlure : 10/h)' };
function useCell(t, mapId, extra = '') { const [c, set] = useState(null); useEffect(() => { if (!t) return set(null); const k = `${mapId}:${t.x},${t.y}${extra}`; if (cache.has(k) && Date.now() - cache.get(k).at < 3000) return set(cache.get(k).v);
  api(`/map/${mapId}/cell?x=${t.x}&y=${t.y}${extra}`).then(v => { cache.set(k, { v, at: Date.now() }); set(v); }).catch(() => {}); }, [t?.x, t?.y]); return c; }
const cellCost = c => c?.tile?.cost ?? c?.terrain.cost;   // coût admin « Cases » du monde, sinon celui du terrain
const divCost = c => (c?.tile?.divineCost > 0 ? ` ✦ ${c.tile.divineCost}` : '');   // énergie divine par case (admin, 0 par défaut)
/** Description du type de case + sort passif (effet continu) — textes saisis en admin, rendus comme texte. */
function TileInfo({ tile }) {
  if (!tile?.description && !tile?.spell) return null;
  return <div className="note tileinfo">{tile.description && <div>{tile.description}</div>}{tile.spell && <div className={tile.spell.mode}>✦ Effet continu — {spellLine(tile.spell)}</div>}</div>;
}
function Entity({ e }) {   // joueur : pseudo, race, guilde (jamais PV ni armure) ; monstre : PV et armure ; invocation : son maître
  if (!e) return <span>Case libre</span>;
  if (e.kind === 'character') return <div className="ent"><b>{e.name}</b> <small>{e.race} · {e.rank_name}</small><br /><small>Guilde : {e.guild ?? 'Aucune guilde'}</small></div>;
  if (e.kind === 'summon') return <div className="ent"><b>🔮 {e.name}</b> <small>Invocation</small><br /><small>Invoquée par : {e.owner}</small></div>;
  if (e.kind === 'monster') return <div className="ent"><b>{e.name}</b> <small>Monstre</small><br /><small>PV : {e.mhp}/{e.mhpmax} · Armure : {e.marmor}/{e.mmarmor ?? 0}</small></div>;
  return <div className="ent"><b>{e.name}</b> <small>Structure</small></div>;
}
function InfoModal({ cell, close }) {
  const e = cell.entity; return <Modal onClose={close} className="inv small" label=""><h3>Case ({cell.x}, {cell.y}) — {cell.terrain.zone ?? KIND[cell.terrain.kind]}</h3>
    {e?.kind === 'character' ? <><p><b>{e.name}</b> · {e.race} · {e.rank_name}<br />Guilde : {e.guild ?? 'Aucune guilde'}</p><p>État de forme : <b style={{ color: HEALTH[e.health] }}>{e.health}</b></p>
      <h4>Équipements visibles</h4><div className="gear">{(e.visibleGear?.length ? e.visibleGear : ['Aucun équipement visible']).map(g => <span key={g} className="pill">{g}</span>)}</div></>
      : e ? <p><b>{e.name}</b>{e.kind === 'monster' && <><br />PV : {e.mhp}/{e.mhpmax} · Armure : {e.marmor}/{e.mmarmor ?? 0}</>}</p> : <p>Case libre. Ressource : {cell.terrain.resource ?? 'aucune'}.</p>}</Modal>;
}
export default function TileCard() {
  const { hover, selected, me } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), mapId = me?.actor.pos.map_id;
  const hc = useCell(!selected && hover, mapId), sc = useCell(selected, mapId, `&characterId=${me?.id}`); /* + ce qui manque à CE personnage pour récolter */ const buildKind = useRef(null), [layer, setLayer] = useState(0), [building, setBuilding] = useState(false), [kind, setKind] = useState('wall'), [prev, setPrev] = useState(null), [info, setInfo] = useState(null);
  useEffect(() => { setBuilding(false); setLayer(0); }, [selected?.x, selected?.y]);
  // jusqu'à deux entités par case (une au sol, une dans les airs, migration 46) : `layer` = celle choisie
  const ents = sc?.entities ?? (sc?.entity ? [sc.entity] : []), cur = ents[Math.min(layer, ents.length - 1)] ?? null;
  useEffect(() => { if (mapId) api(`/map/${mapId}/tile-types`).then(setTileCosts).catch(() => setTileCosts([])); }, [mapId]);   // coûts admin « Cases » du monde
  useEffect(() => { const e = cur; setPrev(null); if (selected && e && ['character', 'monster', 'summon'].includes(e.kind) && e.char_id !== me.id) api(`/combat/preview/${me.id}/${selected.x}/${selected.y}?air=${e.air ? 1 : 0}`).then(setPrev).catch(() => {}); }, [sc, layer]);
  if (!me) return null; const P = me.actor.pos, hero = me.actor.kind === 'hero', mount = hero ? me.mount : null, loco = mount ?? (hero ? null : me.actor.loco), fly = !!loco?.flying, aq = !!loco?.aquatic, land = loco ? loco.terrestrial ?? !aq : true,   /* créature contrôlée : sa locomotion (volante = 1/case) */ pe = (t, o = {}) => pathEnergy(P, t, { flying: fly, aquatic: aq, terrestrial: land, ...o }), kinds = Object.keys(me.scrolls ?? {}).filter(k => k !== 'ship' && me.scrolls[k] > 0),
    E = (mv, ac = 0) => mv === Infinity ? '∞' : mount && mv ? `⚡${mv} monture${ac ? ` + ⚡${ac}` : ''}` : `⚡${mv + ac}`;   // seuls les déplacements paient la monture
  if (selected) {
    const e = cur, t = { x: selected.x, y: selected.y }, dist = Math.max(Math.abs(t.x - P.x), Math.abs(t.y - P.y)), range = me.attack_range ?? me.range_eff, attackable = e && ['character', 'monster', 'summon'].includes(e.kind) && e.char_id !== me.id && !(e.kind !== 'monster' && (inSafeZone(P.map_id, P.x, P.y) || inSafeZone(P.map_id, t.x, t.y))), res = sc?.terrain;
    const acts = [], myLayerFree = !ents.some(x => x.kind === 'building' || !!x.air === fly); if (myLayerFree && (t.x !== P.x || t.y !== P.y)) acts.push(['go', 'S\'y rendre', pe(t), 0]);
    if (e && dist > 1 && e.char_id !== me.id) acts.push(['approach', `S'approcher à côté de ${e.name}`, pe(t, { stopAt: 1 }), 0]);
    if (attackable) { acts.push(['attack', `Attaquer ${e.name}`, pe(t, { stopAt: range }), 5]); }
    const ownMount = e?.kind === 'summon' && hero && !mount && me.summons.find(x => x.id === e.summon_id && x.mountable && !x.ridden);   // son invocation montable : monter dessus depuis la case voisine
    if (ownMount) acts.push(['ride', `Monter sur ${e.name}`, dist > 1 ? pe(t, { stopAt: 1 }) : 0, 0]);
    if (e?.kind === 'building') acts.push(['interact', e.building_kind === 'door' ? `Franchir ${e.name}` : `Interagir avec ${e.name} (ou l'activer)`, 0, 0]);
    const dep = sc?.deposit, miss = sc?.harvestMissing, canTry = hero && !ents.some(x => !x.air) && (res?.resource || dep) && !(res?.kind === 'deep' && !fly && !aq), noTool = canTry && miss?.length > 0;   // pas équipé : pas d'action de récolte
    if (canTry && !noTool) acts.push(['harvest', dep ? `Récolter ${dep.resource} (gisement ${dep.stock}/${dep.stockMax})` : `Récolter ${res.resource}`, pe(t), 4]); if (!ents.length && kinds.length) acts.push(['build', 'Poser un élément', pe(t, { stopAt: 1 }), 10]);
    acts.push(['info', 'Plus d\'informations (état de forme & équipement)', 0, 0]);
    const ids = { characterId: me.id, targetCharacterId: e?.char_id, targetMonsterId: e?.monster_id, targetSummonId: e?.summon_id };
    const run = async act => { try {
      if (act === 'info') { setInfo(await api(`/map/${mapId}/cell?x=${t.x}&y=${t.y}&details=1`)); return; }
      let msg = null;
      if (act === 'ride') { if (dist > 1) await api('/actions/approach', { characterId: me.id, ...t }); await api('/summons/ride', { characterId: me.id, summonId: ownMount.id }); }
      if (act === 'go') await api('/actions/move', { characterId: me.id, ...t }); if (act === 'approach') await api('/actions/approach', { characterId: me.id, ...t });
      if (act === 'build') await api('/buildings/place', { characterId: me.id, kind: buildKind.current ?? kinds[0], ...t }); if (act === 'harvest') await api('/actions/gather', { characterId: me.id, ...t });
      if (act === 'attack') { const r = await api('/combat/attack', ids); msg = r.missed ? `Raté ! (${r.hitChance}% de chances de toucher)` : `Touché : -${r.dmg} PV${r.killed ? ' — cible vaincue !' : ''}`; }
      if (act === 'interact') { const r = await api(`/buildings/${e.building_id}/interact`, { characterId: me.id }); if (r.kind === 'door') await api('/divine/door', { characterId: me.id, buildingId: r.id }); else if (r.kind === 'capital') d(A.setPanel('capital'));
        else if (r.activation) { const x = await api(`/buildings/${r.id}/activate`, { characterId: me.id }); msg = `${r.name} activé${x.results?.length ? ` : ${x.results.map(y => `${y.spell} → ${y.effect}`).join(' ; ')}` : ''}`; }   // conditions d'activation (lot E)
        else msg = r.name; }
      if (msg) d(A.toast(msg)); await refresh(); d(A.setSelected(null)); } catch (er) { d(A.toast(er.message)); } };
    const ICON = { go: Footprints, approach: Footprints, attack: Swords, breath: Crosshair, interact: DoorOpen, ride: PawPrint, harvest: Pickaxe, build: Hammer, info: Eye };
    const resName = sc?.deposit?.resource ?? res?.resource, lvl = levelAt(t.x, t.y, mapId), cost = res ? (cellCost(sc) >= 99 ? '∞' : cellCost(sc)) + divCost(sc) : '…';
    const costOf = ([k, , mv, ac, mc]) => k === 'info' ? null : mv === Infinity ? 'impossible' : mc ? `⚡${mc} monture${mv ? ` + ${E(mv)}` : ''}` : E(mv, ac);
    const pos = { left: Math.max(8, Math.min(selected.sx + 14, innerWidth - 348)), top: Math.max(8, Math.min(selected.sy + 14, innerHeight - 440)) };   // reste dans l'écran
    return <><div className="card tcard" style={pos} role="dialog" aria-label={`Case ${t.x}, ${t.y}`}>
      <header className="tc-head"><div className="grow"><b>{res?.zone ?? sc?.tile?.name ?? KIND[res?.kind] ?? '…'}</b>{res?.zone && sc?.tile?.name && <small> · {sc.tile.name}</small>}
        <div className="tc-tags"><span><MapPin size={11} /> {t.x}, {t.y}</span><span>niveau {levelLabel(lvl)}</span><span><Zap size={11} /> {cost}/case</span>{resName && <span className="res">{resName}</span>}</div></div>
        <button className="x" aria-label="Fermer" onClick={() => d(A.setSelected(null))}><X size={14} /></button></header>
      <TileInfo tile={sc?.tile} />
      {sc?.deposit && <div className="note">Gisement{sc.deposit.sector ? ` « ${sc.deposit.sector} »` : ''} : {sc.deposit.resource} — {sc.deposit.stock}/{sc.deposit.stockMax} (+{sc.deposit.regenPerH}/h, {sc.deposit.yieldPerHarvest} par récolte)</div>}
      {noTool ? <div className="note tc-need" tabIndex={0} aria-label={`Il manque : ${miss.join(' ; ')}`}><Ban size={14} /> Vous n'êtes pas équipé pour récolter {dep?.resource ?? res?.resource}
          <div className="bd" role="tooltip"><b>Pour récolter, il faut :</b>{miss.map((m, i) => <div key={i} className="bdl neg"><span>{m}</span></div>)}{miss.length > 1 && <small className="bdnote">Une seule de ces options suffit.</small>}</div></div>
        : sc?.harvestNeeds && <div className="note">Récolte : nécessite {sc.harvestNeeds}</div>}
      {ents.length > 1 && <div className="tc-layers" role="tablist" aria-label="Éléments sur la case">{ents.map((x, i) => <button key={i} role="tab" aria-selected={i === layer} className={i === layer ? 'on' : ''} onClick={() => setLayer(i)}>{x.air ? 'Dans les airs' : 'Au sol'} : {x.name}</button>)}</div>}
      <div className="tc-ent"><Entity e={e} /></div>
      {e && dist === 1 && !attackable && e.kind !== 'building' && <div className="note"><Ban size={14} /> Case occupée (vous êtes juste à côté).</div>}
      {prev?.hitChance != null && <div className="tc-hit"><Dices size={14} /> Toucher <b>{prev.hitChance}%</b><span className="tc-bar"><i style={{ width: `${prev.hitChance}%` }} /></span><small>esquive {prev.dodge}%</small></div>}
      {prev?.range != null && <div className={`tc-reach${prev.reachable ? '' : ' no'}`}><Crosshair size={14} />{!prev.reachable ? <span>Hors d'atteinte : {prev.height} niveau(x) d'écart de hauteur, votre portée ({prev.range}) ne suffit pas</span>
        : <span>Distance <b>{prev.distance}</b>{prev.height ? ` (dont ${prev.height} de hauteur)` : ''} · portée {prev.range}{prev.inRange ? '' : ' · il faut s\'approcher'}{prev.power < 100 ? ` · puissance ${prev.power} %` : ''}</span>}</div>}
      <div className="tc-acts">{acts.map(a => { const [k, l, mv] = a, I = ICON[k] ?? Zap, c = costOf(a);
        return <button key={k} className={`tc-act${k === 'attack' || k === 'breath' ? ' danger' : ''}${k === 'build' && building ? ' on' : ''}`} disabled={mv === Infinity} onClick={() => (k === 'build' ? setBuilding(!building) : run(k))}>
          <I size={15} /><span className="grow">{l}</span>{c && <em>{c}</em>}</button>; })}</div>
      {building && <div className="tc-build">{[['wall', 'Muraille de pierre'], ['tower', 'Tour de garde'], ['factory', 'Usine de production'], ['totem', 'Totem de zone']].filter(([k]) => kinds.includes(k)).map(([k, l]) =>
        <button key={k} className="sm" onClick={() => { buildKind.current = k; setKind(k); run('build'); }}>{l} <small>×{me.scrolls[k]}</small></button>)}</div>}
    </div>{info && <InfoModal cell={info} close={() => setInfo(null)} />}</>;
  }
  return hover ? <div className="card hover" style={{ left: hover.sx + 14, top: hover.sy + 14 }}>{hc ? <><div><b>{hc.terrain.zone ?? hc.tile?.name ?? KIND[hc.terrain.kind]}</b> <small>({hc.x}, {hc.y}) · ⚡ {cellCost(hc) >= 99 ? '∞' : cellCost(hc)}{divCost(hc)}/case · {hc.terrain.resource ?? 'aucune ressource'}</small></div><Entity e={hc.entity} /><small>Trajet : {E(pe(hover))}</small></> : '…'}</div> : null;
}
