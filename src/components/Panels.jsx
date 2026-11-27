import { useEffect, useMemo, useRef, useState } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { X, Hammer, Sparkles, Castle, Swords, Pickaxe, Dices, ZoomIn, ZoomOut, Maximize, Handshake, Inbox, Flame, Crown, PawPrint, Ghost } from 'lucide-react'; import CreatureIcon from './CreatureIcon'; import { RankingTable, PlayerCard, RACE_NAME } from './Ranking';
import { Tabs, useTab } from './Tabs';
import { fxSummary } from '../lib/spellFx.js';
import Modal from './Modal'; import { api } from '../lib/api'; import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import { useRefreshMe } from './GameCanvas'; import { terrain, SAFE_ZONES } from '../lib/terrain'; import { COLORS } from '../lib/energy'; import MapLegend from './MapLegend'; import { RESOURCES } from '../lib/resources'; import { RESOURCES2 } from '../lib/resources2'; import { RESOURCES3 } from '../lib/resources3';
/** Fenêtre de jeu centrée (comme l'Hôtel de ville ou l'inventaire) : Échap ou clic hors de la fenêtre pour fermer. */
export const Panel = ({ title, wide, children }) => { const d = useDispatch(), close = () => d(A.setPanel(null));
  return <Modal onClose={close} className={'panel' + (wide ? ' wide' : '')} label={title}><header className="phead"><h3>{title}</h3><button className="x" aria-label="Fermer" onClick={close}><X size={14} /></button></header><div className="pbody">{children}</div></Modal>; };
const KV = ({ items }) => <div className="kv">{items.map(([k, v]) => <span key={k}>{k} <b>{v}</b></span>)}</div>;

export const STAT_FR = { strength: 'Force', agility: 'Agilité', armor: 'Armure', magic_armor: 'Armure magique', see: 'Vision', range: 'Portée', recovery: 'Régénération', hp_max: 'PV max', energy_max: 'Énergie max', divine_energy_max: 'Énergie divine max' };
/** Coût d'une bénédiction (miroir de back/game/faithPact.ts:blessingCost) : au prorata, arrondi au supérieur. */
export const blessCost = (b, v, h) => Math.ceil(b.cost * (v / b.max) * (h / b.maxH) - 1e-9);
const tierInfo = t => `${t.name} — vous rapporte ${t.xp_hour} XP et ${t.gold_hour} or / h ; transfère ${t.percent} % de vos caractéristiques à l'Humain pendant ${Number(t.duration_h)} h, réactivable ${Number(t.cooldown_h)} h après la fin${t.max_assign ? ` ; attribuable ${t.max_assign} fois (${t.used} utilisée${t.used > 1 ? 's' : ''})` : ''} ; changement de composition : une fois toutes les 48 h`;
/** Bénédiction d'un fidèle par le dieu : caractéristique, valeur (≤ max), durée (1 h à max) ; coût en énergie divine affiché. */
function Bless({ x, bl, me, run, reload }) {
  const keys = Object.keys(bl), [st, setSt] = useState(x.request_choice && bl[x.request_choice] ? x.request_choice : keys[0]), b = bl[st];
  const [v, setV] = useState(1), [h, setH] = useState(1), val = Math.min(Math.max(1, v | 0), b?.max ?? 1), hrs = Math.min(Math.max(1, h | 0), b?.maxH ?? 1), cost = b ? blessCost(b, val, hrs) : 0;
  if (!keys.length) return <small className="note">Aucune bénédiction réglée par l'administration.</small>;
  return <div className="row wrap"><select value={st} onChange={e => setSt(e.target.value)}>{keys.map(k => <option key={k} value={k}>{STAT_FR[k] ?? k}</option>)}</select>
    <label className="row">+<input type="number" min="1" max={b.max} value={v} onChange={e => setV(e.target.value)} style={{ width: '5em' }} /><small>/ {b.max}</small></label>
    <label className="row"><input type="number" min="1" max={b.maxH} value={h} onChange={e => setH(e.target.value)} style={{ width: '5em' }} /><small>h / {b.maxH}</small></label>
    <button className="primary" disabled={cost > me.divine_energy_current} onClick={() => run(() => api(`/faiths/${x.id}/bless`, { characterId: me.id, stat: st, value: val, hours: hrs }), reload)}>Bénir (−{cost} ÉD)</button></div>;
}
export function FaithPanel() {
  const d = useDispatch(), { me } = useSelector(s => s.game), run = useDo(), [pacts, lp] = useData(`/pacts/${me.id}`), [f, lf] = useData(`/faiths/${me.id}`), [gods, lg] = useData(`/faiths/gods/${me.id}`), [q, setQ] = useState(''), [pray, setPray] = useState({});
  const reload = () => { lp(); lf(); lg(); };
  const human = me.race === 'human', isGod = me.rank.current_rank >= 5;
  const [tab, setTab] = useTab('faith', ['pacts', 'requests', 'faith', ...(isGod ? ['altar'] : [])]);
  const nReq = (pacts?.incoming.length ?? 0) + (pacts?.outgoing.length ?? 0), pr = f?.prayers, bl = f?.blessings ?? {};
  return <Panel title="Pactes & Fidèles" wide>
    <Tabs label="Pactes et fidèles" value={tab} onChange={setTab} tabs={[['pacts', 'Pactes', Handshake, pacts?.active.length], ['requests', 'Demandes', Inbox, pacts?.incoming.length || null], ['faith', 'Foi', Flame], ...(isGod ? [['altar', 'Autel', Crown, f?.asGod.filter(x => x.status === 'pending' || x.request_choice).length || null]] : [])]} />
    {tab === 'requests' && <>
    <h4>Demander un pacte {pacts && <small>({pacts.limit.used} / {pacts.limit.max} pacte{pacts.limit.max > 1 ? 's' : ''} selon votre rang)</small>}</h4>
    <small>{human ? 'Nommez l\'Ange ou le Démon avec qui vous voulez vous lier' : 'Nommez l\'Humain avec qui vous voulez vous lier'} : l'autre partie doit accepter pour que le pacte soit conclu.</small>
    <div className="row"><input placeholder={human ? 'Nom de l\'Ange ou du Démon' : 'Nom de l\'Humain'} value={q} onChange={e => setQ(e.target.value)} /><button className="primary" disabled={!q.trim()} onClick={() => run(() => api('/pacts/request', { characterId: me.id, targetPseudo: q.trim() }), () => { setQ(''); reload(); })}>Demander</button></div>
    {nReq === 0 && <p className="empty">Aucune demande en cours.</p>}
    {pacts?.incoming.length > 0 && <h4>Demandes reçues ({pacts.incoming.length})</h4>}
    {pacts?.incoming.map(p => <div key={p.id} className="item row2"><span className="row"><PlayerCard p={p} /><small>souhaite conclure un pacte avec vous</small></span><span className="row"><button className="primary" onClick={() => run(() => api(`/pacts/${p.id}/answer`, { characterId: me.id, accept: true }), () => { reload(); d(A.toast('Pacte conclu')); })}>Accepter</button><button onClick={() => run(() => api(`/pacts/${p.id}/answer`, { characterId: me.id, accept: false }), reload)}>Refuser</button></span></div>)}
    {pacts?.outgoing.length > 0 && <h4>Demandes envoyées ({pacts.outgoing.length})</h4>}
    {pacts?.outgoing.map(p => <div key={p.id} className="item row2"><span className="row"><small>En attente de</small><PlayerCard p={p} /></span><button onClick={() => run(() => api(`/pacts/${p.id}/${me.id}`, undefined, 'DELETE'), reload)}>Annuler</button></div>)}
    </>}
    {tab === 'pacts' && <>
    <h4>Pactes conclus ({pacts?.active.length ?? 0})</h4>
    <small>{human ? 'Activer un pacte vous transfère, pour une durée limitée, une part des caractéristiques de l\'être lié (selon la force du pacte qu\'il a choisie) ; il les perd pendant ce temps.' : 'Choisissez pour chaque pacte sa composition (survolez pour le détail) : plus elle vous rapporte, plus elle transfère de vos caractéristiques à l\'Humain quand il l\'active. Une composition ne change qu\'une fois toutes les 48 h par pacte.'}</small>
    {!pacts?.active.length && <p className="empty">Aucun pacte conclu. Envoyez une demande depuis l'onglet « Demandes ».</p>}
    {pacts?.active.map(p => { const cur = pacts.tiers.find(t => t.id === p.tier_id); return <div key={p.id} className="item row2"><PlayerCard p={p} /><span className="row">
      <span className="pactinfo">{p.tier_id && <small title="Le délai de réactivation commence à la fin du bonus">Bonus {Number(p.duration_h)} h · réactivable {Number(p.cooldown_h)} h après la fin</small>}
        {p.bonus_left_s > 0 ? <small className="note">Bonus actif : encore {fmtWait(p.bonus_left_s)}{Number(p.cooldown_h) > 0 ? `, puis ${Number(p.cooldown_h)} h de recharge` : ''}</small> : p.ready_in_s > 0 ? <small className="err">Recharge : encore {fmtWait(p.ready_in_s)}</small> : null}
        {!human && p.tier_change_in_s > 0 && <small>Changement de composition dans {fmtWait(p.tier_change_in_s)}</small>}</span>
      {human ? <><span className="pill">Pacte {p.tier_name ?? '— (à choisir par l\'être lié)'}</span>
          <button disabled={!p.tier_id || p.bonus_left_s > 0 || p.ready_in_s > 0} onClick={() => run(() => api(`/pacts/${p.id}/activate`, { characterId: me.id }), r => { reload(); d(A.toast(`Bonus de pacte actif (${r?.hours ?? ''} h)`)); })}>Activer le bonus</button></>
        : <><select title={cur ? tierInfo(cur) : 'Choisir une composition'} disabled={p.tier_change_in_s > 0} value={p.tier_id ?? ''} onChange={e => run(() => api(`/pacts/${p.id}/tier`, { characterId: me.id, tierId: Number(e.target.value) }), reload)}>
            {!p.tier_id && <option value="">— Composition —</option>}{pacts.tiers.map(t => <option key={t.id} value={t.id} title={tierInfo(t)} disabled={t.full && t.id !== p.tier_id}>{t.name} · {t.xp_hour} XP / {t.gold_hour} or · {t.percent} %{t.max_assign ? ` · ${t.used}/${t.max_assign}` : ''}</option>)}</select>
</>}
      <button className="danger" onClick={() => run(() => api(`/pacts/${p.id}/${me.id}`, undefined, 'DELETE'), reload)}>Résilier</button></span></div>; })}
    </>}
    {tab === 'faith' && <>
    <h4>Mes dieux {pr && <small>· prières : {pr.left} / {pr.max} (toutes les {pr.periodH} h){pr.left === 0 && pr.nextInS > 0 ? ` — prochaine dans ${fmtWait(pr.nextInS)}` : ''}</small>}</h4>
    {!f?.asFollower.length && <p className="empty">Vous n'êtes fidèle d'aucun dieu.</p>}
    {f?.asFollower.map(x => <div key={x.id} className="item row2"><span className="row"><PlayerCard p={x} /><small>{x.status === 'accepted' ? 'fidèle' : 'demande en attente'}</small></span>
      {x.status === 'accepted' && <span className="row"><select value={pray[x.id] ?? ''} onChange={e => setPray({ ...pray, [x.id]: e.target.value })}><option value="">Prier pour…</option>{Object.keys(bl).map(k => <option key={k} value={k}>{STAT_FR[k] ?? k}</option>)}</select>
        <button disabled={!pray[x.id] || !pr?.left} onClick={() => run(() => api(`/faiths/${x.id}/pray`, { characterId: me.id, stat: pray[x.id] }), reload)}>Prier</button>{x.request_choice && <small>en attente : {STAT_FR[x.request_choice] ?? x.request_choice}</small>}</span>}</div>)}
    <h4>Dieux {RACE_NAME[me.race] ? `des ${RACE_NAME[me.race].toLowerCase()}s` : ''} ({gods?.length ?? 0})</h4>
    {gods && !gods.length && <p className="empty">Aucun dieu de votre race pour l'instant.</p>}
    {gods?.map(g => <div key={g.id} className="item row2"><span className="row"><PlayerCard p={g} /><small>{g.followers} fidèle{g.followers > 1 ? 's' : ''}</small></span>
      {g.my_status ? <span className="pill">{g.my_status === 'accepted' ? 'Votre dieu' : 'Demande envoyée'}</span> : <button className="primary" onClick={() => run(() => api('/faiths/join', { characterId: me.id, godId: g.id }), reload)}>Devenir fidèle</button>}</div>)}
    </>}
    {tab === 'altar' && isGod && <><h4>Autel — mes fidèles <small>ÉD {me.divine_energy_current}/{me.divine_energy_max} · rapportent {f?.income.xp ?? 0} XP et {f?.income.gold ?? 0} or / h (par tranche de {f?.followersStep} fidèle{f?.followersStep > 1 ? 's' : ''})</small></h4>
      {!f?.asGod.length && <p className="empty">Aucun fidèle.</p>}
      {f?.asGod.map(x => <div key={x.id} className="item"><div className="row2"><span className="row"><PlayerCard p={x} />{x.request_choice && <span className="pill">prie pour : {STAT_FR[x.request_choice] ?? x.request_choice}</span>}</span>
        {x.status === 'pending' && <span className="row"><button className="primary" onClick={() => run(() => api(`/faiths/${x.id}/accept`, { characterId: me.id, accept: true }), reload)}>Accepter</button><button onClick={() => run(() => api(`/faiths/${x.id}/accept`, { characterId: me.id, accept: false }), reload)}>Refuser</button></span>}</div>
        {x.status === 'accepted' && <Bless key={x.request_choice ?? 'x'} x={x} bl={bl} me={me} run={run} reload={reload} />}</div>)}</>}
  </Panel>;
}

const LOCO_FR = { land: 'terrestre', air: 'volante', water: 'aquatique' };
/** Délai restant lisible (secondes → « 1 h 05 » / « 12 min »). */
export const fmtWait = s => { const t = Math.ceil(s / 60), h = Math.floor(t / 60), m = t % 60; return h ? `${h} h${m ? ` ${String(m).padStart(2, '0')}` : ''}` : `${Math.max(1, m)} min`; };   // minutes arrondies au total (jamais « 47 h 60 »)
/** Invocations (créées par un sort) : contrôler, renvoyer, et MONTER dessus si leur type est montable (case voisine du héros) ;
 *  montée, elle porte le héros : ses déplacements et ses capacités consomment son énergie (migration 43). */
export function MountsPanel() {
  const { me } = useSelector(s => s.game), run = useDo(), refresh = useRefreshMe(), act = f => run(f, refresh);
  const hp = me.pos, near = s => s.x != null && Math.max(Math.abs(s.x - hp.x), Math.abs(s.y - hp.y)) <= 1;   // monter dessus : case voisine
  const hero = me.actor.kind === 'hero', ctlOf = id => me.actor.kind === 'summon' && me.actor.id === id, riding = me.summons.some(s => s.ridden);
  const control = id => act(() => api('/summons/control', { characterId: me.id, summonId: ctlOf(id) ? null : id }));
  return <Panel title="Invocations" wide>
    <div className="crhead"><p className="note">Une créature s'invoque par un sort, à côté de vous. Vous pouvez la contrôler (elle se déplace et lance ses capacités avec sa propre énergie). Si son type est montable, vous pouvez monter dessus (depuis une case voisine, ou dès le lancer du sort) : vos déplacements et ses capacités consomment alors son énergie. Volante : 1 énergie par case, au niveau +6.</p>
      <span className="pill">Invoquées : {me.summons.length} / {me.maxSummons}</span></div>
    {!me.summons.length && <p className="empty">Aucune créature invoquée. Les sorts d'invocation se lancent depuis « Actions › Sorts ».</p>}
    {me.summons.map(s => { const ctl = ctlOf(s.id), loco = (s.locomotion ?? []).map(l => LOCO_FR[l] ?? l).join(' · ') || 'terrestre', fly = (s.locomotion ?? []).includes('air');
      return <div key={s.id} className={`item mount${s.ridden ? ' riding' : ' called'}`}>
      <div className="head"><span className="row"><CreatureIcon c={s} size={34} /><b>{s.name}</b></span><span className="pill">{s.ridden ? 'Montée' : ctl ? 'Invoquée · contrôlée' : 'Invoquée'}</span></div>
      <small>{loco} · {s.mountable ? 'peut être montée' : 'ne se monte pas'}{s.x != null && ` · (${s.x}, ${s.y})`}</small>
      <KV items={[['Vie', `${s.hp_current}/${s.hp_max}`], ['Énergie', `${s.energy_current}/${s.energy_max}`], ['Régén.', `+${s.recovery}/h`], ...(s.mountable ? [['Taille', `${s.size ?? 1} (+${fly ? 6 : s.size ?? 1} vue / portée montée)`]] : []), ['Force', s.strength], ['Agilité', s.agility], ['Dégâts', s.damage], ['Armure', `${s.armor}/${s.magic_armor ?? 0}`]]} />
      <div className="row">
        {s.ridden ? <button className="danger" onClick={() => act(() => api('/summons/dismount', { characterId: me.id }))}>Descendre</button>
          : <>{s.mountable && hero && !riding && <button className="primary" disabled={!near(s)} title={near(s) ? '' : 'Approchez-vous (case voisine)'} onClick={() => act(() => api('/summons/ride', { characterId: me.id, summonId: s.id }))}>Monter dessus</button>}
            <button className={s.mountable ? '' : 'primary'} onClick={() => control(s.id)}>{ctl ? `Revenir sur ${me.pseudo}` : 'Contrôler'}</button>
            <button className="danger" onClick={() => act(() => api(`/summons/${s.id}/dismiss`, { characterId: me.id }, 'POST'))}>Renvoyer</button></>}
      </div>{s.mountable && !s.ridden && hero && !riding && !near(s) && <small className="note">Pour monter dessus, rejoignez une case voisine de la créature.</small>}</div>; })}
  </Panel>;
}

const OFFS = [[-1, -1, 'NO'], [0, -1, 'N'], [1, -1, 'NE'], [-1, 0, 'O'], [0, 0, ''], [1, 0, 'E'], [-1, 1, 'SO'], [0, 1, 'S'], [1, 1, 'SE']], BUILD = [['wall', 'Muraille de pierre'], ['tower', 'Tour de garde'], ['factory', 'Usine de production'], ['totem', 'Totem de zone']];
/** Fabrication par parchemin : recettes dont le parchemin est dans le sac ; ressources manquantes affichées ; un bâtiment se pose sur la case adjacente ciblée. */
function Craft({ rc, me, sel, blk, run, after }) {
  if (!rc?.length) return null;
  const lack = m => Object.entries(m ?? {}).map(([k, q]) => `${k} ×${q}`).join(', ');
  return <><h4><Hammer size={14} /> Fabrication <small>(parchemin + ressources)</small></h4>
    {rc.map(r => { const miss = Object.keys(r.missing ?? {}).length > 0, build = r.target_kind === 'building';
      return <div key={r.id} className="item row2"><div><b>{r.target_name}</b>{r.qty_out > 1 && <small> ×{r.qty_out}</small>}<br />
        <small>{r.scroll_name}{r.consume_scroll ? ' (consommé)' : ''} · {Object.entries(r.resources ?? {}).map(([k, q]) => `${k} ×${q}`).join(', ') || 'aucune ressource'}{r.energy_cost ? ` · ⚡${r.energy_cost}` : ''}{r.divine_energy_cost ? ` · ✦${r.divine_energy_cost} énergie divine` : ''}{r.at_capital ? ' · à la capitale' : ''}</small>
        {miss && <><br /><small className="err">Manque : {lack(r.missing)}</small></>}</div>
        <button disabled={miss || (build && !!blk)} title={build ? `Case (${sel.x}, ${sel.y})` : ''} onClick={() => run(() => api('/craft', { characterId: me.id, recipeId: r.id, ...(build ? sel : {}) }), after)}>{build ? 'Bâtir ici' : 'Fabriquer'}</button></div>; })}</>;
}
export function ActionsPanel() {
  const { me, entities } = useSelector(s => s.game), d = useDispatch(), P = me.actor.pos, run = useDo(), refresh = useRefreshMe(), [sp, loadSp] = useData(`/spells/${me.id}`, [me.summons.length, me.maxSummons]), [rc, loadRc] = useData(`/craft/${me.id}`, [me.energy_current]);
  const occ = (x, y) => entities.find(e => e.x === x && e.y === y && !(e.char_id === me.id && me.actor.kind === 'hero')), blocked = (x, y) => occ(x, y) || terrain(x, y).kind === 'deep';
  const free = OFFS.filter(o => o[0] || o[1]).map(o => ({ x: P.x + o[0], y: P.y + o[1] })).find(c => !blocked(c.x, c.y)) ?? { x: P.x + 1, y: P.y }; const [sel, setSel] = useState(free); useEffect(() => setSel(free), [P.x, P.y]);
  const blk = occ(sel.x, sel.y) || (terrain(sel.x, sel.y).kind === 'deep' && { name: 'terrain infranchissable' }), dist = e => Math.max(Math.abs(e.x - P.x), Math.abs(e.y - P.y)), after = () => { refresh(); loadSp(); };
  const targets = entities.filter(e => ['character', 'monster', 'summon'].includes(e.kind) && e.char_id !== me.id && dist(e) <= Math.max(2, me.range_eff)), bldgs = entities.filter(e => e.kind === 'building' && dist(e) <= 1);
  const [hits, setHits] = useState({}); useEffect(() => { targets.forEach(e => api(`/combat/preview/${me.id}/${e.x}/${e.y}`).then(r => setHits(h => ({ ...h, [`${e.x},${e.y}`]: r.hitChance }))).catch(() => {})); }, [entities.length, P.x, P.y]);
  const attack = e => run(async () => { const r = await api('/combat/attack', { characterId: me.id, targetCharacterId: e.char_id, targetMonsterId: e.monster_id, targetSummonId: e.summon_id }); d(A.toast(r.missed ? `Raté ! (${r.hitChance}%)` : `Touché : -${r.dmg} PV${r.killed ? ' — vaincu !' : ''}`)); }, after);
  const [tab, setTab] = useTab('actions', ['spells', 'build', 'gather', 'combat']);
  return <Panel title="Actions autour du personnage" wide>
    <Tabs label="Actions" value={tab} onChange={setTab} tabs={[['spells', 'Sorts', Sparkles, sp?.spells.length], ['build', 'Construire', Hammer], ['gather', 'Récolte & bâtiments', Pickaxe, bldgs.length || null], ['combat', 'Combat', Swords, targets.length || null]]} />
    {(tab === 'spells' || tab === 'build') && <>
    <h4><Castle size={14} /> Case adjacente ciblée</h4><small>Les cases occupées sont interdites pour bâtir ou invoquer.</small>
    <div className="grid33">{OFFS.map(([dx, dy, l]) => { const x = P.x + dx, y = P.y + dy; if (!dx && !dy) return <div key="c" className="cell you"><b>Vous</b><small>({x},{y})</small></div>; const b = occ(x, y) || terrain(x, y).kind === 'deep';
      return <button key={l} className={'cell' + (sel.x === x && sel.y === y ? ' on' : '') + (b ? ' busy' : '')} onClick={() => setSel({ x, y })}><b>{l}</b><small>{b ? 'Occupée' : 'Libre'}</small></button>; })}</div>
    <p className="status">Case ({sel.x}, {sel.y}) — {blk ? <span className="err">occupée par {blk.name}</span> : <span style={{ color: 'var(--ok)' }}>libre</span>}</p>
    </>}
    {tab === 'build' && <>
    <h4><Hammer size={14} /> Poser une structure <small>(parchemin requis · ⚡10)</small></h4>
    {BUILD.filter(([k]) => me.scrolls?.[k] > 0).length ? <div className="grid2">{BUILD.filter(([k]) => me.scrolls?.[k] > 0).map(([k, l]) => <button key={k} disabled={!!blk} onClick={() => run(() => api('/buildings/place', { characterId: me.id, kind: k, x: sel.x, y: sel.y }), after)}>{l} <small>×{me.scrolls[k]}</small></button>)}</div> : <p className="empty">Nécessite un parchemin de construction.</p>}
    <Craft rc={rc} me={me} sel={sel} blk={blk} run={run} after={() => { after(); loadRc(); }} />
    </>}
    {tab === 'spells' && <>
    <h4><Sparkles size={14} /> Sorts & invocations <span className="pill">{sp?.active ?? 0}/{sp?.maxSummons ?? 1} invoc.</span></h4>
    {sp && !sp.spells.length && <p className="empty">Aucun sort appris. Les sorts de base s'apprennent à la boutique de la capitale.</p>}
    {sp?.spells.map(s => { const wait = s.cooldown_left_s > 0, off = wait || (s.kind === 'summon' && (!!blk || sp.active >= sp.maxSummons)) || (s.kind === 'attack' && !occ(sel.x, sel.y));
      const cast = ride => run(() => api('/spells/cast', { characterId: me.id, spellId: s.id, x: sel.x, y: sel.y, ...(ride ? { ride: true } : {}) }), after), cost = <>⚡{s.energy_cost}{s.divine_energy_cost > 0 && ` ✦${s.divine_energy_cost}`}</>;
      const canRide = s.summon_mountable && me.actor.kind === 'hero' && !me.mount;   // invocation montable : monter dessus dès le lancer
      return <div key={s.id} className="item row2"><div><b>{s.name}</b>{s.source && s.source !== 'appris' && <small> · {s.source}</small>}<br /><small>{fxSummary(s.effects) || s.description}</small>
        {Number(s.cooldown_h) > 0 && <><br /><small className={wait ? 'err' : 'note'}>{wait ? `Recharge : encore ${fmtWait(s.cooldown_left_s)}` : `Délai de relance : ${fmtWait(Number(s.cooldown_h) * 3600)}`}</small></>}
        {wait && !(Number(s.cooldown_h) > 0) && <><br /><small className="err">Invocation morte : encore {fmtWait(s.cooldown_left_s)}</small></>}</div>
        <span className="row"><button disabled={off} onClick={() => cast(false)}>Lancer {cost}</button>{canRide && <button className="primary" disabled={off} onClick={() => cast(true)}>Lancer et monter {cost}</button>}</span></div>; })}
    </>}
    {tab === 'gather' && <>
    <h4><Pickaxe size={14} /> Bâtiments adjacents & récolte</h4>{!bldgs.length && <p className="empty">Aucun bâtiment sur une case voisine.</p>}
    {bldgs.map(b => <div key={b.building_id} className="item row2"><span>{b.name}</span><button onClick={() => run(async () => { const r = await api(`/buildings/${b.building_id}/interact`, { characterId: me.id }); if (r.kind === 'door') await api('/divine/door', { characterId: me.id, buildingId: r.id }); else if (r.kind === 'capital') d(A.setPanel('capital')); else d(A.toast(r.name)); }, refresh)}>Interagir ⚡0</button></div>)}
    <button className="wide" onClick={() => run(() => api('/actions/gather', { characterId: me.id }), refresh)}>Récolter la ressource sous vos pieds — ⚡4</button>
    </>}
    {tab === 'combat' && <>
    <h4><Swords size={14} /> Cibles à portée d'attaque ({targets.length})</h4>{!targets.length && <small>Aucun adversaire à portée immédiate.</small>}
    {targets.map(e => <div key={e.x + ',' + e.y} className="item row2"><span>{e.name} <small className="hit"><Dices size={12} /> {hits[`${e.x},${e.y}`] ?? '…'}%</small></span><span className="row"><button className="danger" onClick={() => attack(e)}>Attaquer ⚡5</button></span></div>)}</>}</Panel>;
}

/** Ressources présentes sur la carte : { id: nombre de cases } (carte des ressources, amélioration de l'Hôtel de ville). */
export const mapResources = (mapId, w, h) => { const n = {}; for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) { const id = terrain(i, j, mapId).resourceId; if (id) n[id] = (n[id] ?? 0) + 1; } return n; };
const RES_INFO = Object.fromEntries([...RESOURCES, ...RESOURCES2, ...RESOURCES3].map(r => [r.id, r]));
export function WorldPanel() {
  const { me } = useSelector(s => s.game), d = useDispatch(), P = me.actor.pos, [lm] = useData(`/map/${P.map_id}/landmarks`), cv = useRef(), base = useRef(), hl = useRef(), [view, setView] = useState({ z: 1, x: 0, y: 0 }), drag = useRef(null), S = 720;
  const [focus, setFocus] = useState(null), up = (me.map_worlds ?? []).includes(P.map_id);   // carte des ressources de CE monde (migration 38)
  const found = useMemo(() => (up ? Object.entries(mapResources(P.map_id, P.width, P.height)).sort((a, b) => b[1] - a[1]) : []), [up, P.map_id]);
  useEffect(() => { setFocus(null); }, [P.map_id]);
  useEffect(() => {   // calque de mise en valeur : tout est assombri sauf les cases de la ressource choisie
    if (!focus) { hl.current = null; setView(v => ({ ...v })); return; }
    const c = document.createElement('canvas'); c.width = P.width; c.height = P.height; const g = c.getContext('2d'), im = g.createImageData(P.width, P.height), col = parseInt((RES_INFO[focus]?.color ?? '#ffffff').slice(1), 16);
    for (let i = 0; i < P.width; i++) for (let j = 0; j < P.height; j++) { const o = (j * P.width + i) * 4; im.data.set(terrain(i, j, P.map_id).resourceId === focus ? [col >> 16, (col >> 8) & 255, col & 255, 255] : [8, 8, 16, 170], o); }
    g.putImageData(im, 0, 0); hl.current = c; setView(v => ({ ...v })); }, [focus, P.map_id]);
  useEffect(() => { const c = document.createElement('canvas'); c.width = P.width; c.height = P.height; const g = c.getContext('2d'), im = g.createImageData(P.width, P.height);
    for (let i = 0; i < P.width; i++) for (let j = 0; j < P.height; j++) { const tt = terrain(i, j, P.map_id), h = tt.ground ?? COLORS[tt.kind], o = (j * P.width + i) * 4; im.data.set([h >> 16, (h >> 8) & 255, h & 255, 255], o); } g.putImageData(im, 0, 0); base.current = c; setView(v => ({ ...v })); }, [P.map_id]);
  useEffect(() => { const c = cv.current, g = c?.getContext('2d'); if (!g || !base.current) return; const k = (S / P.width) * view.z; g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#0b0e18'; g.fillRect(0, 0, S, S); g.imageSmoothingEnabled = false; g.drawImage(base.current, view.x, view.y, P.width * k, P.height * k); if (hl.current) g.drawImage(hl.current, view.x, view.y, P.width * k, P.height * k);
    const X = x => view.x + x * k, Y = y => view.y + y * k; g.strokeStyle = 'rgba(255,255,255,.14)'; g.strokeRect(X(0), Y(0), P.width * k, P.height * k);
    const s = me.actor.see; g.strokeStyle = 'rgba(111,208,255,.95)'; g.lineWidth = 2; g.strokeRect(X(P.x - s - 0.5), Y(P.y - s - 0.5), (2 * s + 1) * k, (2 * s + 1) * k);
    for (const b of lm ?? []) { g.fillStyle = b.kind === 'door' ? '#b070ff' : '#ffd166'; g.fillRect(X(b.x) - 4, Y(b.y) - 4, 9, 9); g.strokeStyle = '#000'; g.lineWidth = 1; g.strokeRect(X(b.x) - 4, Y(b.y) - 4, 9, 9); }
    for (const z of SAFE_ZONES) if (z.map === P.map_id) { g.strokeStyle = 'rgba(255,255,255,.8)'; g.lineWidth = 1.5; g.setLineDash([5, 4]); g.strokeRect(X(z.x - z.r - 0.5), Y(z.y - z.r - 0.5), (2 * z.r + 1) * k, (2 * z.r + 1) * k); g.setLineDash([]); }
    g.font = '700 16px Cinzel, Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 4; g.strokeStyle = 'rgba(8,8,16,.92)';
    for (const [t, tx, ty, c] of [['N', S / 2, 16, '#f0d28a'], ['S', S / 2, S - 16, '#ffffff'], ['O', 16, S / 2, '#ffffff'], ['E', S - 16, S / 2, '#ffffff']]) { g.strokeText(t, tx, ty); g.fillStyle = c; g.fillText(t, tx, ty); }   // points cardinaux (carte fixe : Nord en haut)
    g.fillStyle = '#ff4d4d'; g.beginPath(); g.arc(X(P.x), Y(P.y), 5, 0, 7); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke(); }, [view, lm, P.x, P.y]);
  const zoomAt = (f, px = S / 2, py = S / 2) => setView(v => { const z = Math.min(14, Math.max(0.5, v.z * f)), r = z / v.z; return { z, x: px - (px - v.x) * r, y: py - (py - v.y) * r }; });
  const pt = e => { const b = cv.current.getBoundingClientRect(); return [(e.clientX - b.left) * S / b.width, (e.clientY - b.top) * S / b.height]; };
  const onWheel = e => { e.preventDefault(); const [px, py] = pt(e); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, px, py); };
  useEffect(() => { const c = cv.current; c.addEventListener('wheel', onWheel, { passive: false }); return () => c.removeEventListener('wheel', onWheel); }, []);
  const Dot = ({ c, t }) => <span className="leg"><i style={{ background: c }} />{t}</span>, center = () => setView(v => { const k = (S / P.width) * v.z; return { ...v, x: S / 2 - P.x * k, y: S / 2 - P.y * k }; });
  return <Modal onClose={() => d(A.setPanel(null))} className="inv worldmap" label="Carte du monde"><div className="banner"><h3>Carte globale du monde</h3>
    <span className="row"><button onClick={() => zoomAt(0.8)} title="Dézoomer" aria-label="Dézoomer"><ZoomOut size={16} /></button><button onClick={() => zoomAt(1.25)} title="Zoomer" aria-label="Zoomer"><ZoomIn size={16} /></button><button onClick={() => setView({ z: 1, x: 0, y: 0 })}><Maximize size={14} /> Tout voir</button><button onClick={center}><Crosshair size={14} /> Me centrer</button><button className="x2" onClick={() => d(A.setPanel(null))} aria-label="Fermer"><X size={14} /></button></span></div>
    <canvas ref={cv} width={S} height={S} className="wmcanvas" onPointerDown={e => { drag.current = { p: pt(e), v: view }; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current) { const [px, py] = pt(e); setView({ ...drag.current.v, x: drag.current.v.x + px - drag.current.p[0], y: drag.current.v.y + py - drag.current.p[1] }); } }} onPointerUp={() => { drag.current = null; }} />
    <div className="legend">{(P.map_id === 2 ? [] : [['#4a7a46', 'Plaines'], ['#c9a86a', 'Terres arides'], ['#e6eef7', 'Glaces'], ['#3a3548', 'Pics d’éther'], ['#d9481f', 'Volcan'], ['#77777f', 'Massifs'], ['#2d5a30', 'Forêts'], ['#4aa0b0', 'Eau peu profonde'], ['#1b3f7a', 'Eau profonde']]).map(([c, t]) => <Dot key={t} c={c} t={t} />)}<Dot c="#ffd166" t="Capitale" /><Dot c="#b070ff" t="Portes" /><Dot c="#ff4d4d" t="Vous" />{P.map_id === 1 && <Dot c="#ffffff" t="Zone sacrée (JcJ interdit)" />}</div><MapLegend mapId={P.map_id} />
    {up && <div className="wmres"><h4>Carte des ressources <small>{focus ? 'cliquez à nouveau pour revenir à la carte habituelle' : 'choisissez une ressource à mettre en valeur'}</small></h4>
      <div className="chips">{found.map(([id, n]) => <button key={id} className={`chip${focus === id ? ' on' : ''}`} onClick={() => setFocus(focus === id ? null : id)}><i className="resdot" style={{ background: RES_INFO[id]?.color ?? '#ccc' }} />{RES_INFO[id]?.name ?? id}<small>{n}</small></button>)}</div></div>}
    <small>Molette : zoom · glisser : déplacer · cadre bleu : votre vision ({me.actor.see} cases) autour de ({P.x}, {P.y}).{!up && ' La carte des ressources de ce monde s\'achète à l\'Hôtel de ville de ce monde ou s\'ouvre avec son parchemin.'}</small></Modal>;
}

/** Classement en jeu (bouton de la barre d'accès) : s'ouvre sur la page du joueur. */
export function RankingPanel() { const { me } = useSelector(s => s.game); return <Panel title="Classement" wide><RankingTable me={me.pseudo} /></Panel>; }
