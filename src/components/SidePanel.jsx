import { useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { Backpack, ScrollText, Lock, TrendingUp, Package } from 'lucide-react'; import Info from './Info'; import { worldName } from '../lib/worlds.js';
import Modal from './Modal'; import { GROUP } from '../lib/equipment'; import { api } from '../lib/api'; import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import { useRefreshMe } from './GameCanvas';
const DEFAULT = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#2b2842"/><circle cx="48" cy="38" r="18" fill="#8a85a8"/><rect x="20" y="62" width="56" height="30" rx="14" fill="#8a85a8"/></svg>');
const LABEL = { hp_max: 'Vie max', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max', recovery: 'Régénération (Vie, Énergie & Énergie divine /h)', see: 'Vision (cases)', range: 'Portée', agility: 'Agilité (toucher / esquive)', strength: 'Force', armor: 'Armure physique', magic_armor: 'Armure magique' };
const RACES = { human: 'Humain', demon: 'Démon', angel: 'Ange' };
const kindOf = a => (/PV|Attaque|Attaqué|ratée/.test(a) ? 'combat' : /Déplacement|Franchit|approche/.test(a) ? 'move' : 'other'), FILTERS = [['all', 'Tout'], ['combat', 'Combats & attaques'], ['move', 'Déplacements'], ['other', 'Pactes, sorts & bâtiments']];
function History({ id, close }) {
  const [h] = useData(`/characters/${id}/history`), [f, setF] = useState('all'), list = (h ?? []).filter(x => f === 'all' || kindOf(x.action) === f);
  return <Modal onClose={close} className="scroll" label="Historique"><h3><ScrollText size={18} /> Parchemin d'historique</h3><small>Journal des <b>{h?.length ?? 0} / 100</b> dernières actions réalisées ou attaques subies</small>
    <div className="seg filters">{FILTERS.map(([k, l]) => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>)}</div>
    <div className="log">{list.map((x, i) => <div key={i} className={'k-' + kindOf(x.action)}><small>{new Date(x.created_at).toLocaleTimeString()}</small> {x.action}</div>)}</div></Modal>;
}
// Silhouette en étoile (bras tendus, jambes écartées) : coordonnées dans un repère 120 × 100. Chaque emplacement est posé sur le segment du corps concerné.
// Mains : deux blocs superposés (arme/bouclier au-dessus, bague en dessous) avec la main au centre, entre les deux.
const SLOTS = [['head', 'Tête', 60, 7.7], ['amulet', 'Collier', 60, 41], ['chest', 'Plastron', 60, 56], ['foot', 'Chaussures', 60, 90], ['weapon_main', 'Arme (main G.)', 11, 20.5], ['ring_l', 'Bague G.', 11, 45.5], ['weapon_off', 'Bouclier / 2ᵉ arme', 109, 20.5], ['ring_r', 'Bague D.', 109, 45.5],
  ['bracelet_l', 'Bracelet G.', 33, 17], ['bracelet_r', 'Bracelet D.', 87, 17]];
const LEADERS = [[60, 15.3, 60, 17], [33, 24, 24, 33], [87, 24, 96, 33], [60, 83, 36, 95], [60, 83, 84, 95]];
const TYPE = { weapon: 'Arme', shield: 'Bouclier', head: 'Casque', chest: 'Plastron', foot: 'Chaussures', amulet: 'Collier', ring: 'Bague', bracelet: 'Bracelet', special: 'Objet spécial', scroll: 'Parchemin', tool: 'Outil' };
const BONUS_LABEL = { hp_max: 'PV max', recovery: 'Régén./h', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max', see: 'Vue', range: 'Portée' };
const statLine = i => [i.data?.kind === 'bag' ? `Agrandit le sac : +${i.data.add} (max ${i.data.max})` : i.data?.kind === 'resource_map' ? `Carte des ressources : ${worldName(i.data.map_id)}` : null, i.weapon_damage ? `Arme ×${i.weapon_damage}${i.two_handed ? ' (deux mains)' : ''}` : i.two_handed ? 'Deux mains' : null, i.reach > 1 ? `Portée ${i.reach}${i.full_power_at ? ` (${i.power_start ?? 100} % → 100 % à ${i.full_power_at} → ${i.power_end ?? 100} % à ${i.reach})` : ''}` : null, i.armor || i.magic_armor ? `Armure ${i.armor ?? 0}/${i.magic_armor ?? 0}` : null, i.strength_bonus ? `${i.strength_bonus > 0 ? '+' : ''}${i.strength_bonus} Force` : null, i.agility_bonus ? `${i.agility_bonus > 0 ? '+' : ''}${i.agility_bonus} Agilité` : null,
  ...Object.entries(i.bonuses ?? {}).filter(([, v]) => v).map(([k, v]) => `${v > 0 ? '+' : ''}${v} ${BONUS_LABEL[k] ?? k}`), i.req_strength ? `Force req. ${i.req_strength}` : null].filter(Boolean).join(' · ');
const fmtLock = sec => { const h = Math.floor(sec / 3600), m = Math.ceil((sec % 3600) / 60); return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`; };
/** Passage au rang suivant par conditions : une ligne et un bouton par voie proposée (définitive, temporaire) ; rang temporaire affiché avec son échéance. */
const condText = (c, xp) => [...(c.items ?? []).map(i => `objet n°${i.itemId} ×${i.qty}`), ...Object.entries(c.resources ?? {}).map(([k, q]) => `${k} ×${q}`), c.energyCost ? `⚡${c.energyCost}` : null, c.divineEnergyCost ? `✦${c.divineEnergyCost} énergie divine` : null, xp != null ? `${xp} XP` : null].filter(Boolean).join(', ') || 'aucune condition';
function RankUp({ me, after }) {
  const run = useDo(), [r, load] = useData(`/characters/${me.id}/rank-up`, [me.xp, me.energy_current]);
  if (!r) return null;
  const req = r.requirements, paths = req ? [['permanent', 'définitif'], ['temporary', 'temporaire']].filter(([m]) => req[m]) : [];
  return <div className="item rankup"><div><b>Rang : {me.rank?.rank_name ?? '—'}</b>
    {r.temp && <><br /><small>Rang temporaire jusqu'au {new Date(r.temp.until).toLocaleString()}</small></>}
    {!r.next ? <><br /><small>Rang maximal.</small></> : !paths.length ? <><br /><small>Prochain : {r.next.name} — passage non disponible par conditions.</small></>
      : paths.map(([m, l]) => { const c = req[m], miss = r.missing?.[m] ?? [];
        return <div key={m} className="rankpath"><small>Prochain : <b>{r.next.name}</b> ({l}{m === 'temporary' ? ` ${c.durationH} h` : ''}) — {condText(c, r.next.prereq_xp)}{c.consume === false ? ' · non consommés' : ''}</small>
          {miss.length > 0 && <><br /><small className="err">Manque : {miss.join(', ')}</small></>}
          <br /><button className="primary sm" disabled={!!r.temp || miss.length > 0} onClick={() => run(() => api(`/characters/${me.id}/rank-up`, { mode: m }), () => { load(); after(); })}>Passer {r.next.name} ({l})</button></div>; })}</div></div>;
}
const DLABEL = { hp_max: 'Vie max', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max', recovery: 'Régénération', see: 'Vision', range: 'Portée', strength: 'Force', agility: 'Agilité', armor: 'Armure physique', magic_armor: 'Armure magique' };
const sg = v => (v > 0 ? `+${v}` : `${v}`);
const KIND_FR = { item: 'objet', buff: 'effet', mount: 'monture', building: 'bâtiment', height: 'hauteur' };
/** Détail d'une caractéristique au survol : base, puis chaque objet / sort / pacte / monture qui l'ajoute ou la retire. */
export function StatDetail({ keys, B, note }) {
  const rows = keys.map(k => [k, B[k]]).filter(([, b]) => b);
  if (!rows.length) return null;
  return <div className="bd" role="tooltip">{rows.map(([k, b]) => <div key={k} className="bdsec">{keys.length > 1 && <b>{DLABEL[k]}</b>}
    <div className="bdl"><span>Base</span><span>{b.base}</span></div>
    {b.parts.map((p, i) => <div key={i} className={`bdl ${p.value < 0 ? 'neg' : 'pos'}`}><span>{p.label}<small>{KIND_FR[p.kind] ?? p.kind}</small></span><span>{sg(p.value)}</span></div>)}
    <div className="bdl tot"><span>Total</span><span>{b.final}</span></div></div>)}{note && <small className="bdnote">{note}</small>}</div>;
}
function Inventory({ close }) {
  const { me } = useSelector(s => s.game), refresh = useRefreshMe(), run = useDo(), [inv, load] = useData(`/inventory/${me.id}`), [up, loadUp] = useData(`/characters/${me.id}/upgrades`, [me.xp]), [sel, setSel] = useState(null), [tab, setTab] = useState('equip'), st = me.stats;
  const act = f => run(f, () => { load(); loadUp(); refresh(); }), eq = s => inv?.items.find(i => i.equipped_slot === s), bag = inv?.items.filter(i => !i.equipped_slot) ?? [], selItem = bag.find(i => i.id === sel), bagMax = inv?.bagMax ?? 20, cells = [...bag.map(it => ({ it })), ...(inv?.resStacks ?? []).map(rs => ({ rs }))],   // objets puis piles de ressources (une pile = un emplacement)
     okSlots = selItem ? (selItem.two_handed ? ['weapon_main'] : GROUP[selItem.slot] ?? []) : [], twoHanded = !!eq('weapon_main')?.two_handed;
  const click = s => act(async () => { const e = eq(s); if (e) await api('/inventory/equip', { characterId: me.id, itemId: e.id, slot: null }); else if (sel) { await api('/inventory/equip', { characterId: me.id, itemId: sel, slot: s }); setSel(null); } });
  const Slot = ({ k, label, x, y, flow }) => { const it = eq(k), lock = it?.lock_seconds > 0, held = k === 'weapon_off' && !it && twoHanded;   // main prise par l'arme à deux mains
    return <button type="button" className={'slot2' + (it ? ' full' : '') + (lock ? ' locked' : '') + (!it && okSlots.includes(k) ? ' ok' : '') + (flow ? ' flow' : '')} style={flow ? undefined : { left: `${x / 1.2}%`, top: `${y}%` }} onClick={() => click(k)}
      title={it ? `${it.name} — ${statLine(it) || TYPE[it.slot]}${lock ? ` — verrouillé encore ${fmtLock(it.lock_seconds)}` : ''}` : `${label} : vide`} aria-label={`${label} : ${it?.name ?? 'vide'}`}>
      <span className="sl-label">{label}{lock && <em className="lk"><Lock size={11} />{fmtLock(it.lock_seconds)}</em>}</span><b className={'sl-item' + (it ? '' : ' none')}>{it?.name ?? (held ? `(${eq('weapon_main').name})` : 'Vide')}</b></button>; };
  const B = me.breakdown ?? {};
  // Valeur finale ; au survol, le détail : base, objets, sorts / pactes, monture (statBreakdown du serveur).
  const T = [['Vie', `${me.hp_current}/${me.hp_max}`, 'var(--hp)', ['hp_max']], ['Énergie', `${me.energy_current}/${me.energy_max}`, 'var(--en)', ['energy_max']],
    ...(me.hasDivine ? [['Én. divine', `${me.divine_energy_current}/${me.divine_energy_max}`, 'var(--div)', ['divine_energy_max']]] : []),
    ['Régénération', `+${me.recovery}/h`, '#b6dd6a', ['recovery'], null, <Info title="Régénération unique">Une seule statistique restaure chaque heure votre <b>Vie</b>, votre <b>Énergie</b> et votre <b>Énergie divine</b>. Elle vaut pour tous : joueurs, montures, invocations et monstres.</Info>],
    ['Vision', me.see_eff, '#7fe0ff', ['see']], ['Portée', me.range_eff, '#c8a2ff', ['range']],
    ['Agilité', st.agility, 'var(--ok)', ['agility'], null, <Info title="Agilité : toucher et esquiver">Elle détermine vos chances de toucher et d'esquiver.<br />Chance de toucher = (votre agilité + 5) ÷ (votre agilité + celle de la cible + 10), bornée entre 10 % et 95 %. À agilité égale : 50 %. L'esquive est le complément.</Info>],
    ['Force', st.strength, '#ff9a5a', ['strength'], st.reqStrength ? `Force requise par l'équipement : ${st.reqStrength}` : null],
    ['Dégâts', st.damage, 'var(--hp)', null, null, <Info title="Dégâts infligés">Dégâts = dégâts de l'arme × (votre Force − la Force requise par <b>tous</b> vos équipements). À mains nues : 1.<br />Exemple : Force 10, épée 5 dégâts et 2 Force requise → 5 × (10 − 2) = <b>40</b>. Avec une armure demandant 5 Force en plus : 5 × (10 − 7) = <b>15</b>.<br />Ces dégâts sont ensuite réduits de l'armure de la cible.<br /><em>Actuellement : {st.weaponDamage ? `${st.weaponDamage} × (${st.strength} − ${st.reqStrength}) = ${st.damage}` : 'mains nues = 1'}.</em></Info>],
    ['Armure', `${st.armor}/${st.magicArmor}`, '#8fc2ff', ['armor', 'magic_armor'], null, <Info title="Armure physique / magique">L'armure <b>réduit directement les dégâts reçus</b> : dégâts subis = dégâts − armure (minimum 1).<br />Affichée <b>physique/magique</b> : « 5/0 » = 5 contre les attaques physiques, 0 contre la magie (sorts).</Info>]];
  return <Modal onClose={close} className="inv big" label="Inventaire">
    <div className="seg tabs4"><button className={tab === 'equip' ? 'on' : ''} onClick={() => setTab('equip')}><Package size={15} /> 1. Équipement & sac</button><button className={tab === 'up' ? 'on' : ''} onClick={() => setTab('up')}><TrendingUp size={15} /> 2. Amélioration ({me.xp} XP)</button></div>
    <div className="sumgrid" style={{ '--n': T.length }}>{T.map(([l, v, c, keys, note, info]) => <div key={l} className="sumc" style={{ '--c': c }} tabIndex={keys ? 0 : undefined}>
      <small>{l}</small><b>{v}</b>{info && <span className="corner">{info}</span>}{keys && <StatDetail keys={keys} B={B} note={note} />}</div>)}</div>
    {tab === 'equip' && <><p className="formula">{st.weaponName ? <>Dégâts = <b>{st.weaponDamage}</b> (arme « {st.weaponName} ») × (Force <b>{st.strength}</b> − Force requise <b>{st.reqStrength}</b>) = <b>{st.damage}</b></> : <>Dégâts = mains nues : <b>1</b></>} · réduits de l'armure de la cible · Limite d'invocations : <b>{me.maxSummons}</b></p>
      <div className="invbody2"><div><div className="eqtitle"><h4>Équipement</h4><Info title="Un équipement posé est verrouillé 12 h">Une fois un équipement mis en place, vous ne pouvez <b>ni le retirer ni le remplacer pendant 12 heures</b> : un cadenas indique le temps restant sur l'emplacement.<br />Poser un objet sur un emplacement vide reste immédiat. Choisissez bien votre équipement !</Info></div>
        <div className="star2"><svg className="body" viewBox="0 0 120 100" aria-hidden="true"><g className="limbs"><circle cx="60" cy="22" r="6.5" /><path d="M50 29 L70 29 L66 66 L54 66 Z" /><line x1="52" y1="31" x2="11" y2="33" /><line x1="68" y1="31" x2="109" y2="33" /><line x1="56" y1="66" x2="36" y2="96" /><line x1="64" y1="66" x2="84" y2="96" /></g>
          {LEADERS.map((l, i) => <line key={i} className="leader" x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} />)}<circle className="hand" cx="11" cy="33" r="3.4" /><circle className="hand" cx="109" cy="33" r="3.4" /></svg>
          {SLOTS.map(([k, label, x, y]) => <Slot key={k} k={k} label={label} x={x} y={y} />)}</div>
        <h4>Objets spéciaux <small>({inv?.specialSlots ?? 4} emplacements pour {me.race === 'human' ? 'un Humain' : 'un Ange / Démon'})</small></h4>
        <div className="specials2" style={{ '--n': inv?.specialSlots ?? 4 }}>{Array.from({ length: inv?.specialSlots ?? 4 }, (_, i) => <Slot key={i} k={`special_${i + 1}`} label={`Spécial ${i + 1}`} flow />)}</div>
        <small className="hint">Cliquez un objet du sac (les emplacements compatibles s'illuminent) puis l'emplacement ; cliquez un emplacement pour déséquiper (si le verrou de 12 h est écoulé).</small></div>
        <div><h4>Sac à dos <small>{inv?.bagUsed ?? bag.length}/{bagMax} emplacements</small></h4>
          {selItem?.data?.kind === 'bag' && <div className="baguse"><span>{selItem.name} : +{selItem.data.add} emplacements (jusqu'à {selItem.data.max})</span>
            <button className="primary sm" disabled={bagMax >= selItem.data.max} title={bagMax >= selItem.data.max ? `Sac déjà à ${bagMax} emplacements` : ''} onClick={() => act(async () => { await api('/inventory/use', { characterId: me.id, itemId: selItem.id }); setSel(null); })}>Utiliser</button></div>}
          {selItem?.data?.kind === 'resource_map' && <div className="baguse"><span>{selItem.name} : ouvre la carte des ressources — {worldName(selItem.data.map_id)}</span>
            <button className="primary sm" disabled={(me.map_worlds ?? []).includes(selItem.data.map_id)} title={(me.map_worlds ?? []).includes(selItem.data.map_id) ? 'Carte de ce monde déjà ouverte' : ''} onClick={() => act(async () => { await api('/inventory/use', { characterId: me.id, itemId: selItem.id }); setSel(null); })}>Utiliser</button></div>}
          <div className="bag2">{Array.from({ length: Math.max(bagMax, cells.length) }, (_, i) => { const c = cells[i], it = c?.it, rs = c?.rs;
          if (rs) return <div key={i} className="bagcell full res" title={`${rs.name} : ${rs.qty} / ${rs.stack} par emplacement`}><b>{rs.name}</b><small>×{rs.qty}<em> / {rs.stack}</em></small></div>;
          return <button type="button" key={i} className={'bagcell' + (it ? ' full' : '') + (it && it.id === sel ? ' sel' : '') + (i >= bagMax ? ' over' : '')} onClick={() => it && setSel(it.id === sel ? null : it.id)} title={it ? `${it.name} — ${statLine(it) || TYPE[it.slot]}` : 'Emplacement libre'}>
          {it ? <><b>{it.name}</b><small>{statLine(it) || TYPE[it.slot] || ''}</small></> : <span className="free">{i + 1}</span>}</button>; })}</div></div></div></>}
    {tab === 'up' && <RankUp me={me} after={() => { loadUp(); refresh(); }} />}
    {tab === 'up' && <div className="upgrades"><small>Le coût en XP suit les paliers de la table (×1, ×2, ×3). Chaque amélioration donne +1.</small>
      {up?.filter(u => !u.needsDivine || me.hasDivine).map(u => <div key={u.stat} className="item row2"><div><b>{LABEL[u.stat]}</b> <span className="pill">{u.value}</span> <span className="pill">Palier ×{u.tier}</span><br /><small>{u.untilNextTier} amélioration(s) avant le palier suivant · {u.count} effectuée(s)</small></div>
        <button className="primary" disabled={me.xp < u.nextCost} onClick={() => act(() => api(`/characters/${me.id}/upgrade/${u.stat}`, undefined, 'POST'))}>+1 ({u.nextCost} XP)</button></div>)}</div>}</Modal>;
}
export default function SidePanel() {
  const { me } = useSelector(s => s.game), d = useDispatch(), refresh = useRefreshMe(), [modal, setModal] = useState(null), [chars] = useData('/characters', [me?.id]), [hist] = useData(`/characters/${me?.id}/history`, [me?.xp, me?.energy_current]); if (!me) return null;
  const pick = e => { const f = e.target.files[0]; if (!f) return; const img = new Image(); img.onload = async () => { const c = document.createElement('canvas'); c.width = c.height = 128; c.getContext('2d').drawImage(img, 0, 0, 128, 128); await api(`/characters/${me.id}/portrait`, { data: c.toDataURL('image/jpeg', .8) }); refresh(); }; img.src = URL.createObjectURL(f); };
  return <aside className={`glass portrait race-${me.race}`}><button className="ring" aria-label="Ouvrir l'inventaire" onClick={() => setModal('inv')}><img alt="" src={me.portrait ?? DEFAULT} /></button>
    <label className="chg">Changer l'image (2 Mo max)<input type="file" accept="image/*" hidden onChange={pick} /></label>
    <div className="pseudo" title="Le pseudo ne peut pas être modifié">{me.pseudo} <Lock size={12} /></div><div className="rank">{RACES[me.race]} · {me.rank.rank_name}</div><small>{me.actor.kind === 'summon' ? `Contrôle : ${me.actor.name}` : 'Héros principal'}</small>
    <div className="tools"><button className="ico sm" title="Inventaire en étoile" onClick={() => setModal('inv')}><Backpack size={18} /></button><button className="ico sm histbtn" title="Parchemin d'historique" onClick={() => setModal('hist')}><ScrollText size={18} /><i className="badge">{hist?.length ?? 0}</i></button></div>
    <div className="chars-mini"><small>Personnages ({chars?.length ?? 0}/3)</small>{chars?.map(c => <button key={c.id} className={c.id === me.id ? 'on' : ''} onClick={() => { d(A.setMe(null)); d(A.setChar(c.id)); }}><span>{c.pseudo}</span><small>({c.x},{c.y})</small></button>)}</div>
    {modal === 'hist' && <History id={me.id} close={() => setModal(null)} />}{modal === 'inv' && <Inventory close={() => setModal(null)} />}</aside>;
}
