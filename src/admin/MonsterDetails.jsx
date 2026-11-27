import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import Pick from './Pick.jsx'; import { confirmDel, Search, matches, Empty } from './ui.jsx'; import MiniMap from './MiniMap.jsx';
import { Plus, Save, Trash2 } from 'lucide-react';
import { BodyParts } from './MonsterParts.jsx'; import { ElementSpells } from './SpellFx.jsx';
import { FIELDS, jsonOr, jsonText } from './entityFields.js';
import { RARITIES, RARITY_LABEL } from './rarity.js';
import { SLOT_LABEL, MONSTER_GROUPS, LOCO, toggleLoco, locoLabel, respawnSummary, spellLabel, capLabel, equipLabel, capsToMaxCaps, placeBody, linkedLabel, respawnIn } from './monsterDetails.js';
import Appearance from './Appearance.jsx';
/**
 * Monstres (Étape 2 phase 3b) : liste des types (création) → clic sur un nom → onglets :
 *  1. Caractéristiques (édition des champs du type),
 *  2. Capacité (actives : sorts qu'il peut lancer ; passives : en continu, sans énergie),
 *  3. Spécificités (quantité max, parties du corps équipables — grille style personnage),
 *  4. Liste (tous les monstres sur les maps : coordonnées, lié/natif, sélection pour
 *     déplacer / éditer or + butin + équipement, ou ajouter un nouveau avec les mêmes options),
 *  5. Règles transverses (coûts / plafonds / modificateurs — phase 1, conservées).
 */
// Réapparition et objet divin porté : réglés sur chaque monstre posé (onglet « Sur les cartes »), plus sur le type (migration 35).
const TABS = [['data', 'Caractéristiques'], ['caps', 'Capacités'], ['spec', 'Équipement et quantité'], ['list', 'Sur les cartes']];
const EMPTY = () => Object.fromEntries(FIELDS.monster.map(([k, , t]) => [k, t === 'check' ? false : '']));
/** XP de CE monstre posé (copiée du type au placement, réglable ici) : au tueur et à chaque coup porté. */
function InstXp({ row, onSaved }) {
  const d = useDispatch(), [f, setF] = useState({ xp_reward: row.xp_reward ?? 0, xp_hit: row.xp_hit ?? 0 });
  const save = async () => { try { const b = { xp_reward: Math.max(0, Math.trunc(Number(f.xp_reward) || 0)), xp_hit: Math.max(0, Math.trunc(Number(f.xp_hit) || 0)) };
    await api(`/admin/content/monsters/${row.id}`, b, 'PUT'); onSaved(b); d(Ad.ok('XP du monstre enregistrée')); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="form"><div className="cell"><small>XP donnée au tueur</small><input type="number" min="0" value={f.xp_reward} onChange={e => setF({ ...f, xp_reward: e.target.value })} /></div>
    <div className="cell"><small>XP à chaque coup porté (touché)</small><input type="number" min="0" value={f.xp_hit} onChange={e => setF({ ...f, xp_hit: e.target.value })} /></div>
    <button className="sm primary" onClick={save}>Enregistrer l'XP</button></div>;
}
export default function MonsterDetails() {
  const d = useDispatch();
  const [monsters, setMonsters] = useState([]), [cats, setCats] = useState(null), [status, setStatus] = useState(null);
  const [sel, setSel] = useState(''), [tab, setTab] = useState('data'), [draft, setDraft] = useState(null), [q, setQ] = useState(''), [dirty, setDirty] = useState(false);
  const [caps, setCaps] = useState([]), [actives, setActives] = useState(null), [passives, setPassives] = useState(null);
  const [slots, setSlots] = useState([]);
  const [capF, setCapF] = useState({ spellId: '', mode: 'active', target: 'enemy', radius: 3 });
  const [maxCaps, setMaxCaps] = useState({ inGame: '', perPlayer: '' });
  const [instSel, setInstSel] = useState(null), [iLoot, setILoot] = useState([]), [iEquips, setIEquips] = useState([]), [iGrid, setIGrid] = useState([]);
  const [instMap, setInstMap] = useState(''), [mx, setMx] = useState(''), [my, setMy] = useState('');
  const [lMode, setLMode] = useState('');   // '' = section fermée ; 'edit' = édition ; 'new' = création (même section)
  const [nl, setNl] = useState({ type: 'item', itemId: '', resId: '', dropRate: 100, qty: 1 });
  const [ne, setNe] = useState({ itemId: '', slot: 'weapon_main' }), [instRow, setInstRow] = useState(null);
  const [nw, setNw] = useState({ type: '', mapId: '', x: 1, y: 1 });
  const load = () => {
    api('/admin/content/monsters').then(setMonsters).catch(e => d(Ad.msg(e.message)));
    api('/admin/catalog').then(setCats).catch(() => {});
    api('/admin/bestiary/status').then(setStatus).catch(() => {});
  };
  useEffect(() => { load(); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const leave = () => !dirty || window.confirm('Modifications non enregistrées : les abandonner ?');
  const open = async (id, force) => {
    if (!force && !leave()) return;
    setSel(id); setTab(t => (force ? t : 'data')); setInstSel(null); setDirty(false); setLMode('');
    const det = await api(`/admin/content/monsters/${id}`).catch(e => { d(Ad.msg(e.message)); return null; });
    if (!det) return;
    setDraft({ ...det }); setCaps(det.caps ?? []); setMaxCaps(capsToMaxCaps(det.caps ?? []));
    const sp = await api(`/admin/content/monsters/${id}/spells`).catch(() => []);
    setActives(sp.filter(x => x.mode === 'active')); setPassives(sp.filter(x => x.mode === 'passive'));
    setSlots((await api(`/admin/content/monsters/${id}/slots`).catch(() => [])).map(x => x.slot));
  };
  const newOne = () => { if (!leave()) return; setDirty(false); setSel('new'); setTab('data'); setDraft(EMPTY()); setCaps([]); setActives([]); setPassives([]); setSlots([]); };
  const set = (k, v) => { setDraft({ ...draft, [k]: v }); setDirty(true); };
  const save = async () => {
    const body = {};
    for (const [k, , t] of FIELDS.monster) {
      if (t === 'check') { body[k] = !!draft[k]; continue; }
      if (t === 'look') { body[k] = draft[k] || null; continue; }   // design / icône : vide = automatique
      if (draft[k] === undefined || draft[k] === '') continue;
      if (t === 'json') { const v = jsonOr(draft[k], undefined); if (v === undefined) { d(Ad.msg(`JSON invalide : ${k}`)); return; } body[k] = v; }
      else if (t === 'number') body[k] = Number(draft[k]);
      else if (t === 'loco') body[k] = draft[k].length ? draft[k] : ['land'];
      else body[k] = String(draft[k]);
    }
    try {
      const r = sel === 'new' ? await api('/admin/content/monsters', body, 'POST') : await api(`/admin/content/monsters/${sel}`, body, 'PUT');
      d(Ad.ok('Enregistré')); setDirty(false); load(); open(r.id, true);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const remove = async () => { if (!confirmDel('ce type de monstre')) return; try { await api(`/admin/content/monsters/${sel}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); setSel(''); setDraft(null); setDirty(false); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const run = f => async (...a) => { try { await f(...a); } catch (e) { d(Ad.msg(e.message)); } };
  const refresh = () => { api('/admin/bestiary/status').then(setStatus).catch(() => {}); };
  const addCap = run(async () => {
    if (!capF.spellId) return d(Ad.msg('Rechercher et choisir un sort'));
    const b = capF.mode === 'passive' ? { spellId: Number(capF.spellId), mode: 'passive', target: capF.target, radius: Number(capF.radius) }
      : { spellId: Number(capF.spellId), mode: 'active' };
    await api(`/admin/content/monsters/${sel}/spells`, b);
    d(Ad.msg(capF.mode === 'passive' ? 'Capacité passive ajoutée (en continu, sans énergie)' : 'Capacité active ajoutée'));
    const sp = await api(`/admin/content/monsters/${sel}/spells`).catch(() => []);
    setActives(sp.filter(x => x.mode === 'active')); setPassives(sp.filter(x => x.mode === 'passive'));
  });
  const delCap = run(async row => { await api(`/admin/content/monsters/${sel}/spells/${row.id}`, undefined, 'DELETE'); d(Ad.ok('Capacité retirée')); const sp = await api(`/admin/content/monsters/${sel}/spells`).catch(() => []); setActives(sp.filter(x => x.mode === 'active')); setPassives(sp.filter(x => x.mode === 'passive')); });
  const toggleSlot = run(async slot => {
    const on = slots.includes(slot);
    on ? await api(`/admin/content/monsters/${sel}/slots/${slot}`, undefined, 'DELETE') : await api(`/admin/content/monsters/${sel}/slots`, { slot });
    setSlots(on ? slots.filter(x => x !== slot) : [...slots, slot]);
    d(Ad.ok(on ? `${SLOT_LABEL[slot]} : non équipable` : `${SLOT_LABEL[slot]} : équipable`));
  });
  const saveCaps = run(async () => {
    const base = `/admin/content/monsters/${sel}/caps`;
    if (maxCaps.inGame !== '') await api(base, { scope: 'global', value: Number(maxCaps.inGame) });
    if (maxCaps.perPlayer !== '') await api(base, { scope: 'per_player', value: Number(maxCaps.perPlayer) });
    setCaps((await api(`/admin/content/monsters/${sel}`).catch(() => null))?.caps ?? []);
    d(Ad.ok('Spécificités enregistrées'));
  });
  const delCapScope = run(async scope => { await api(`/admin/content/monsters/${sel}/caps/${scope}`, undefined, 'DELETE'); setCaps((await api(`/admin/content/monsters/${sel}`).catch(() => null))?.caps ?? []); setMaxCaps({ inGame: '', perPlayer: '' }); d(Ad.ok('Plafond retiré')); });
  // ── Onglet Liste : instances sur les maps + édition (position / or / butin / équipement) ──
  const selectInst = run(async id => {
    const i = ((await api('/admin/bestiary/status').catch(() => null))?.instances ?? []).find(x => x.id === id);
    if (!i) return;
    setInstSel(i); setInstMap(i.map_id); setMx(i.x); setMy(i.y); setLMode('edit'); setILoot([]); setIEquips([]); setInstRow(null);
    setInstRow(await api(`/admin/content/monsters/${id}`).catch(() => null));
    setIEquips(await api(`/admin/content/monsters/${id}/equips`).catch(() => []));
    setILoot(await api(`/admin/content/monsters/${id}/loot`).catch(() => []));
    const grid = (await api(`/admin/content/monsters/${i.prototype ?? id}/slots`).catch(() => [])).map(x => x.slot);
    setIGrid(grid);
    setNe(n => ({ ...n, slot: grid[0] ?? n.slot }));
  });
  // Déplacement : case saisie manuellement (x, y) OU cliquée sur la mini-carte (le clic remplit x, y).
  const moveTo = run(async () => {
    if (!instSel || mx === '' || my === '') return;
    const body = { x: Number(mx), y: Number(my) };
    if (String(instMap) !== String(instSel.map_id)) body.mapId = Number(instMap);
    await api(`/admin/bestiary/place/${instSel.pos_id}`, body, 'PUT');
    d(Ad.msg(`Déplacé en ${mx},${my}`)); refresh();
  });
  const pickTile = p => { setMx(p.x); setMy(p.y); };
  const addLoot = run(async () => {
    if (!instSel) return;
    const q = Number(nl.qty) || 1;
    const b = { dropRate: Number(nl.dropRate), qtyMin: q, qtyMax: q };
    if (nl.type === 'item') { if (!nl.itemId) return d(Ad.msg('Rechercher et choisir un objet')); b.itemId = Number(nl.itemId); }
    else if (nl.type === 'resource') { if (!nl.resId) return d(Ad.msg('Rechercher et choisir une ressource')); b.resource = ((cats?.resources ?? []).find(r => String(r.id) === String(nl.resId)) ?? { id: '', name: '' }).id; }
    else b.resource = 'or';   // « or » : fait partie du butin donné au tueur
    await api(`/admin/content/monsters/${instSel.id}/loot`, b);
    d(Ad.ok('Butin ajouté')); setILoot(await api(`/admin/content/monsters/${instSel.id}/loot`).catch(() => []));
  });
  const delLoot = run(async id => { if (!instSel) return; await api(`/admin/content/monsters/${instSel.id}/loot/${id}`, undefined, 'DELETE'); d(Ad.ok('Retiré')); setILoot(await api(`/admin/content/monsters/${instSel.id}/loot`).catch(() => [])); });
  const addEquip = run(async () => {
    if (!instSel) return;
    if (!ne.itemId) return d(Ad.msg('Rechercher et choisir un objet'));
    await api(`/admin/content/monsters/${instSel.id}/equips`, { itemId: Number(ne.itemId), slot: ne.slot });
    d(Ad.ok('Équipement enregistré')); setIEquips(await api(`/admin/content/monsters/${instSel.id}/equips`).catch(() => []));
  });
  const delEquip = run(async slot => { if (!instSel) return; await api(`/admin/content/monsters/${instSel.id}/equips/${slot}`, undefined, 'DELETE'); d(Ad.ok('Retiré')); setIEquips(await api(`/admin/content/monsters/${instSel.id}/equips`).catch(() => [])); });
  const removeInst = run(async () => { if (!instSel || !confirmDel('ce monstre de la carte')) return; await api(`/admin/bestiary/place/${instSel.pos_id}`, undefined, 'DELETE'); d(Ad.ok('Monstre retiré de la map')); setInstSel(null); refresh(); });
  const addNew = async () => {
    if (!nw.type || !nw.mapId) return d(Ad.msg('Choisir le type et la carte'));
    try {
      const r = await api('/admin/bestiary/place', placeBody({ ...nw, reincarnateH: '' }));
      d(Ad.msg(`« ${r.name} » ajouté en ${r.x},${r.y} — édition ouverte ci-dessous`));
      refresh(); selectInst(r.id);   // la même section repasse en mode édition
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const mine = sel !== 'new' ? (status?.instances ?? []).filter(i => i.prototype === Number(sel) || i.id === Number(sel)) : [];   // onglet Liste : le type sélectionné uniquement
  const mapDim = (cats?.maps ?? []).find(m => m.id === Number(lMode === 'new' ? nw.mapId : instMap)) ?? (cats?.maps ?? [])[0];
  const F = FIELDS.monster;
  const typeOf = i => i.spawned ? 'sauvage (spawn)' : i.placed ? 'placé' : 'ancré (prototype)';
  const lootTag = l => l.item_name ? `objet ${l.item_name}` : (l.divine_ref || l.divine_kind) ? `divin ${l.divine_kind} n°${l.divine_ref}` : l.resource === 'or' ? `or x${l.qty_min ?? 1}` : `ressource ${l.resource} x${l.qty_min ?? 1}`;
  const fieldOf = k => F.find(f => f[0] === k);
  const input = ([k, label, t]) => t === 'check' ? <div key={k} className="cell span-all"><label className="check"><input type="checkbox" checked={!!draft?.[k]} onChange={e => set(k, e.target.checked)} /> {label}</label></div>
    : t === 'rarity' ? <div key={k} className="cell"><small>{label}</small><select value={draft?.[k] || 'commun'} onChange={e => set(k, e.target.value)}>{RARITIES.map(r => <option key={r} value={r}>{RARITY_LABEL[r]}</option>)}</select></div>
      : t === 'loco' ? <div key={k} className="cell span2"><small>{label} (combinable)</small><div className="seg2">{LOCO.map(([v, l]) =>
        <button key={v} type="button" className={`chip${(draft?.[k] || ['land']).includes(v) ? ' on' : ''}`} aria-pressed={(draft?.[k] || ['land']).includes(v)} onClick={() => set(k, toggleLoco(draft?.[k], v))}>{l}</button>)}</div></div>
        : <div key={k} className="cell"><small>{label}</small><input type={t === 'number' ? 'number' : 'text'} value={draft?.[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>;
  /** Groupe « Invocation et monte » : la taille ne sert qu'à un type montable. */
  const groupKeys = (title, keys) => (title === 'Invocation et monte' && !draft?.mountable ? keys.filter(k => k !== 'size') : keys);
  const view = monsters.filter(m => matches(q, m.name, m.id));
  const onMap = m => (status?.instances ?? []).some(i => i.prototype === m.id || i.id === m.id);
  return <section className="split">
    <div className="listpane apanel">
      <div className="headrow"><Search value={q} onChange={setQ} /><button className="sm" onClick={newOne}><Plus size={14} /> Nouveau type</button></div>
      <small className="count">{view.length} / {monsters.length}</small>
      <div className="list">{view.map(m => <button key={m.id} className={`item row2${String(sel) === String(m.id) ? ' on' : ''}`} onClick={() => open(m.id)}><b>{m.name}</b>
        <small>{RARITY_LABEL[m.rarity] ?? 'Commun'}{m.mountable ? ` · montable (${locoLabel(m.locomotion)})` : ''} · PV {m.hp_max}{m.xp_reward ? ` · ${m.xp_reward} XP` : ''}{onMap(m) ? ' · sur carte(s)' : ''} · n°{m.id}</small></button>)}
        {!view.length && <Empty>Aucun type de monstre.</Empty>}</div>
    </div>
    <div className="detailpane">
    {sel === '' && <div className="apanel"><Empty>Sélectionnez un type de monstre dans la liste ou créez-en un nouveau.</Empty></div>}
    {sel !== '' && <div className="editor apanel">
      <div className="headrow"><h3>{sel === 'new' ? 'Nouveau type de monstre' : draft?.name ?? `n°${sel}`}</h3>{dirty && <span className="dirty">non enregistré</span>}</div>
      {sel !== 'new' && <div className="tabs">{TABS.map(([k, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}</div>}

      {tab === 'data' && <>
        {MONSTER_GROUPS.map(([title, keys]) => <div key={title} className="fgroup"><h5>{title}</h5>{title === 'Apparence' ? <Appearance draft={draft} set={set} />
          : <div className="form">{groupKeys(title, keys).map(k => input(fieldOf(k)))}</div>}</div>)}
        <details className="fgroup"><summary><h5>Avancé : comportement (JSON)</h5></summary>
          <textarea className="mono" rows="4" value={typeof draft?.data === 'string' ? draft.data : jsonText(draft?.data ?? null)} onChange={e => set('data', e.target.value)} /></details>
        <div className="actions sticky">
          {sel !== 'new' && <button className="danger" onClick={remove}><Trash2 size={14} /> Supprimer le type</button>}
          <span className="grow" /><button className="primary" onClick={save}><Save size={14} /> {sel === 'new' ? 'Créer' : 'Enregistrer'}</button>
        </div>
      </>}

      {tab === 'caps' && <div>
        <p className="note">Capacités piochées dans la base de sorts globale (recherche). <b>Actives</b> : sorts que le monstre peut lancer. <b>Passives</b> : sorts qu'il possède par défaut, appliqués en continu et sans consommation d'énergie (cible + périmètre).</p>
        <div className="form">
          <div className="cell"><small>Sort (recherche)</small>
            <Pick options={cats?.spells ?? []} value={capF.spellId} onPick={v => setCapF({ ...capF, spellId: v })} labelOf={spellLabel} placeholder="Rechercher un sort…" /></div>
          <div className="cell"><small>Type de capacité</small><select value={capF.mode} onChange={e => setCapF({ ...capF, mode: e.target.value })}>
            <option value="active">Active (lancée à la demande)</option><option value="passive">Passive (en continu)</option></select></div>
          {capF.mode === 'passive' && <>
            <div className="cell"><small>Atteint</small><select value={capF.target} onChange={e => setCapF({ ...capF, target: e.target.value })}>
              <option value="enemy">Ennemis</option><option value="ally">Alliés</option></select></div>
            <div className="cell"><small>Périmètre (cases)</small><input type="number" min="1" max="50" value={capF.radius} onChange={e => setCapF({ ...capF, radius: e.target.value })} /></div></>}
          <button className="sm" onClick={addCap}>+ Activer</button>
        </div>
        <h4>Actives ({actives?.length ?? 0})</h4>
        {(actives ?? []).map(x => <span key={x.id} className="tag"><b>{capLabel(x)}</b><button className="sm danger" onClick={() => delCap(x)}>×</button></span>)}
        <h4>Passives ({passives?.length ?? 0})</h4>
        {(passives ?? []).map(x => <span key={x.id} className="tag"><b>{capLabel(x)}</b><button className="sm danger" onClick={() => delCap(x)}>×</button></span>)}
        {actives?.length === 0 && passives?.length === 0 && <p className="note">Aucune capacité.</p>}
      </div>}

      {tab === 'spec' && <div>
        <h5>Quantité maximale</h5>
        <div className="form">
          <div className="cell"><small>Quantité max dans le jeu</small><input type="number" min="1" value={maxCaps.inGame} onChange={e => setMaxCaps({ ...maxCaps, inGame: e.target.value })} /></div>
          <div className="cell"><small>Quantité max par joueur</small><input type="number" min="1" value={maxCaps.perPlayer} onChange={e => setMaxCaps({ ...maxCaps, perPlayer: e.target.value })} /></div>
        </div>
        <div className="actions"><button className="sm" onClick={saveCaps}>Enregistrer les quantités</button></div>
        {(caps ?? []).map(c => <span key={c.scope} className="tag"><b>{c.scope === 'global' ? `jeu ≤ ${c.value}` : c.scope === 'per_player' ? `joueur ≤ ${c.value}` : `${c.scope} ≤ ${c.value}`}</b>
          <button className="sm danger" onClick={() => delCapScope(c.scope)}>×</button></span>)}
        <h5>Parties du corps équipables</h5>
        <BodyParts slots={slots} toggle={toggleSlot} />
      </div>}


      {tab === 'list' && <div>
        <div className="actions"><button className="sm" onClick={() => { setNw({ type: sel, mapId: '', x: 1, y: 1 }); setLMode('new'); }}>+ Ajouter</button></div>
        {mine.length === 0 && <p className="note">Aucun monstre de ce type sur les maps.</p>}
        {mine.length > 0 && <div className="tablewrap"><table>
          <thead><tr><th>Monstre</th><th>Type</th><th>Carte</th><th>Position</th><th>PV</th><th>Liaison</th><th>Réapparition</th><th></th></tr></thead>
          <tbody>{mine.map(i => <tr key={i.id}>
            <td>{i.name}</td><td>{typeOf(i)}</td><td>{i.map_id}</td><td>{i.x},{i.y}</td>
            <td>{i.hp_current}/{i.hp_max}</td>
            <td>{linkedLabel(i)}</td>
            <td>{i.spawned ? 'disparaît (sauvage)' : respawnSummary({ ...i, reincarnate_delay_h: i.reincarnate_h })}{respawnIn(i) ? ` · ${respawnIn(i)}` : ''}{i.divine_family ? ` · porte ${i.divine_carried ? '1' : '0'} ${i.divine_family}` : ''}</td>
            <td><button className={`sm${instSel?.id === i.id && lMode === 'edit' ? ' on' : ''}`} onClick={() => selectInst(i.id)}>Sélectionner</button></td>
          </tr>)}</tbody>
        </table></div>}
        {lMode !== '' && <div className="editor">
          {lMode === 'edit'
            ? <h3>Édition — {instSel?.name} (n°{instSel?.id})</h3>
            : <h3>Ajouter un monstre {monsters.find(m => m.id === Number(nw.type))?.name ?? '…'} sur une map</h3>}
          <p className="note">Position : saisir x / y manuellement, ou zoomer / naviguer sur la mini-carte et cliquer une case (le clic remplit x, y).
            L'or détenu n'est plus un champ à part : il fait partie du <b>butin donné au tueur</b> (section ci-dessous, type « Or »).</p>
          <div className="form">
            <div className="cell"><small>Carte</small>
              <select value={lMode === 'edit' ? instMap : nw.mapId}
                onChange={e => { if (lMode === 'edit') setInstMap(e.target.value); else setNw({ ...nw, mapId: e.target.value }); setMx('1'); setMy('1'); }}>
                <option value="">—</option>{(cats?.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file}</option>)}</select></div>
            <div className="cell"><small>x</small><input type="number" value={lMode === 'edit' ? mx : nw.x}
              onChange={e => (lMode === 'edit' ? setMx(e.target.value) : setNw({ ...nw, x: e.target.value }))} /></div>
            <div className="cell"><small>y</small><input type="number" value={lMode === 'edit' ? my : nw.y}
              onChange={e => (lMode === 'edit' ? setMy(e.target.value) : setNw({ ...nw, y: e.target.value }))} /></div>
            {lMode === 'edit' && <button className="sm" onClick={moveTo}>Déplacer en {mx},{my}</button>}
          </div>
          {(lMode === 'edit' || nw.mapId) && mapDim && <MiniMap width={mapDim.width} height={mapDim.height}
            mapId={lMode === 'new' ? nw.mapId : instMap}
            items={mine.filter(i => i.map_id === Number(lMode === 'edit' ? instMap : nw.mapId))}
            selected={lMode === 'edit' ? instSel?.id : null}
            pending={(lMode === 'edit' ? (mx !== '' && my !== '') : nw.mapId !== '') ? { x: Number(lMode === 'edit' ? mx : nw.x), y: Number(lMode === 'edit' ? my : nw.y) } : null}
            onPick={p => lMode === 'edit' ? pickTile(p) : setNw({ ...nw, x: p.x, y: p.y })} />}
          {lMode === 'new' && <div className="form">
            <div className="cell"><small>Type de monstre</small>
              <Pick options={monsters} value={nw.type} onPick={v => setNw({ ...nw, type: v })} labelOf={m => `${m.name} · n°${m.id}`} placeholder="— Choisir —" /></div>
            <button onClick={addNew}>+ Ajouter</button>
            <p className="note">Mêmes options que l'édition : après l'ajout, l'instance s'ouvre en mode édition (position, butin, équipement).</p>
          </div>}
          {lMode === 'edit' && <>
            <button className="sm danger" onClick={removeInst}>Retirer de la map</button>
            {instSel?.spawned && <p className="note">Monstre sauvage (règle d'apparition) : il disparaît à sa mort.</p>}
            <h4>Butin (donné au tueur, or compris)</h4>
            {iLoot.map(l => <span key={l.id} className="tag"><b>{lootTag(l)}</b> · {l.drop_rate} %
              <button className="sm danger" onClick={() => delLoot(l.id)}>×</button></span>)}
            {iLoot.length === 0 && <p className="note">Aucun butin.</p>}
            <div className="form">
              <div className="cell"><small>Type</small>
                <select value={nl.type} onChange={e => setNl({ ...nl, type: e.target.value })}>
                  <option value="item">Objet</option><option value="resource">Ressource</option><option value="or">Or</option></select></div>
              {nl.type === 'item' && <div className="cell"><small>Objet (recherche)</small>
                <Pick options={cats?.items ?? []} value={nl.itemId} onPick={v => setNl({ ...nl, itemId: v })} labelOf={o => `${o.name} (n°${o.id})`} perPage={20} /></div>}
              {nl.type === 'resource' && <div className="cell"><small>Ressource (recherche)</small>
                <Pick options={cats?.resources ?? []} value={nl.resId} onPick={v => setNl({ ...nl, resId: v })} labelOf={o => `${o.name} (${o.group})`} perPage={20} /></div>}
              <div className="cell"><small>Quantité</small><input type="number" min="1" value={nl.qty} onChange={e => setNl({ ...nl, qty: e.target.value })} /></div>
              <div className="cell"><small>Chance (%)</small><input type="number" min="0" max="100" value={nl.dropRate} onChange={e => setNl({ ...nl, dropRate: e.target.value })} /></div>
              <button className="sm" onClick={addLoot}>+ Ajouter au butin</button>
            </div>
            {instRow && <InstXp key={instRow.id} row={instRow} onSaved={v => setInstRow({ ...instRow, ...v })} />}
            {iGrid.length === 0 && <p className="note">Aucune partie du corps n'est cochée en <b>Spécificités</b> pour ce type : ce monstre ne peut porter aucun équipement
              (cochez au moins une partie sur ce type pour autoriser l'équipement).</p>}
            {iGrid.length > 0 && <h4>Équipement porté (parties équipables : {iGrid.map(s => SLOT_LABEL[s]).join(', ')})</h4>}
            {iEquips.map(x => <span key={x.slot} className="tag"><b>{equipLabel(x)}</b><button className="sm danger" onClick={() => delEquip(x.slot)}>×</button></span>)}
            {iGrid.length > 0 && <div className="form">
              <div className="cell"><small>Objet</small>
                <Pick options={cats?.items ?? []} value={ne.itemId} onPick={v => setNe({ ...ne, itemId: v })} labelOf={o => `${o.name} (n°${o.id})`} perPage={20} /></div>
              <div className="cell"><small>Partie du corps</small>
                <select value={ne.slot} onChange={e => setNe({ ...ne, slot: e.target.value })}>
                  {iGrid.map(s => <option key={s} value={s}>{SLOT_LABEL[s]}</option>)}</select></div>
              <button className="sm" onClick={addEquip}>+ Équiper</button>
            </div>}
          </>}
        </div>}
      </div>}

    </div>}
    </div>
  </section>;
}
