import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import Pick from './Pick.jsx'; import MiniMap from './MiniMap.jsx';
import { FIELDS, jsonOr, jsonText } from './entityFields.js';
import { RuleForms, RulesList } from './EntityRules.jsx';
import { lootLabel } from './bestiary.js';
import { SLOTS, SLOT_LABEL, SLOT_POS, spellLabel, capLabel, equipLabel, capsToMaxCaps, placeBody, linkedLabel, respawnIn } from './monsterDetails.js';
/**
 * Monstres (Étape 2 phase 3b) : liste des types (création) → clic sur un nom → onglets :
 *  1. Caractéristiques (édition des champs du type),
 *  2. Capacité (actives : sorts qu'il peut lancer ; passives : en continu, sans énergie),
 *  3. Spécificités (quantité max, parties du corps équipables — grille style personnage),
 *  4. Liste (tous les monstres sur les maps : coordonnées, lié/natif, sélection pour
 *     déplacer / éditer or + butin + équipement, ou ajouter un nouveau avec les mêmes options),
 *  5. Règles transverses (coûts / plafonds / modificateurs — phase 1, conservées).
 */
const TABS = [['data', 'Caractéristiques'], ['caps', 'Capacité'], ['spec', 'Spécificités'], ['list', 'Liste'], ['rules', 'Règles transverses']];
const EMPTY = () => Object.fromEntries(FIELDS.monster.map(([k, , t]) => [k, t === 'check' ? false : '']));
export default function MonsterDetails() {
  const d = useDispatch();
  const [monsters, setMonsters] = useState([]), [cats, setCats] = useState(null), [status, setStatus] = useState(null);
  const [sel, setSel] = useState(''), [tab, setTab] = useState('data'), [draft, setDraft] = useState(null);
  const [caps, setCaps] = useState([]), [actives, setActives] = useState(null), [passives, setPassives] = useState(null);
  const [slots, setSlots] = useState([]);
  const [capF, setCapF] = useState({ spellId: '', mode: 'active', target: 'enemy', radius: 3 });
  const [maxCaps, setMaxCaps] = useState({ inGame: '', perPlayer: '' });
  const [instSel, setInstSel] = useState(null), [iLoot, setILoot] = useState([]), [iEquips, setIEquips] = useState([]), [iGrid, setIGrid] = useState([]);
  const [iGold, setIGold] = useState(''), [pend, setPend] = useState(null), [instMap, setInstMap] = useState('');
  const [nl, setNl] = useState({ type: 'item', itemId: '', resource: 'bois', dropRate: 100 });
  const [ne, setNe] = useState({ itemId: '', slot: 'mains' });
  const [nw, setNw] = useState({ type: '', mapId: '', x: 1, y: 1, gold: '' });
  const load = () => {
    api('/admin/content/monsters').then(setMonsters).catch(e => d(Ad.msg(e.message)));
    api('/admin/catalog').then(setCats).catch(() => {});
    api('/admin/bestiary/status').then(setStatus).catch(() => {});
  };
  useEffect(() => { load(); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const open = async id => {
    setSel(id); setTab('data'); setInstSel(null); setPend(null);
    const det = await api(`/admin/content/monsters/${id}`).catch(e => { d(Ad.msg(e.message)); return null; });
    if (!det) return;
    setDraft({ ...det }); setCaps(det.caps ?? []); setMaxCaps(capsToMaxCaps(det.caps ?? []));
    const sp = await api(`/admin/content/monsters/${id}/spells`).catch(() => []);
    setActives(sp.filter(x => x.mode === 'active')); setPassives(sp.filter(x => x.mode === 'passive'));
    setSlots((await api(`/admin/content/monsters/${id}/slots`).catch(() => [])).map(x => x.slot));
  };
  const newOne = () => { setSel('new'); setTab('data'); setDraft(EMPTY()); setCaps([]); setActives([]); setPassives([]); setSlots([]); };
  const set = (k, v) => setDraft({ ...draft, [k]: v });
  const save = async () => {
    const body = {};
    for (const [k, , t] of FIELDS.monster) {
      if (t === 'check') { body[k] = !!draft[k]; continue; }
      if (draft[k] === undefined || draft[k] === '') continue;
      if (t === 'json') { const v = jsonOr(draft[k], undefined); if (v === undefined) { d(Ad.msg(`JSON invalide : ${k}`)); return; } body[k] = v; }
      else if (t === 'number') body[k] = Number(draft[k]);
      else body[k] = String(draft[k]);
    }
    try {
      const r = sel === 'new' ? await api('/admin/content/monsters', body, 'POST') : await api(`/admin/content/monsters/${sel}`, body, 'PUT');
      d(Ad.msg('Enregistré')); load(); open(r.id);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const remove = async () => { try { await api(`/admin/content/monsters/${sel}`, undefined, 'DELETE'); d(Ad.msg('Supprimé')); setSel(''); load(); } catch (e) { d(Ad.msg(e.message)); } };
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
  const delCap = run(async row => { await api(`/admin/content/monsters/${sel}/spells/${row.id}`, undefined, 'DELETE'); d(Ad.msg('Capacité retirée')); const sp = await api(`/admin/content/monsters/${sel}/spells`).catch(() => []); setActives(sp.filter(x => x.mode === 'active')); setPassives(sp.filter(x => x.mode === 'passive')); });
  const toggleSlot = run(async slot => {
    const on = slots.includes(slot);
    on ? await api(`/admin/content/monsters/${sel}/slots/${slot}`, undefined, 'DELETE') : await api(`/admin/content/monsters/${sel}/slots`, { slot });
    setSlots(on ? slots.filter(x => x !== slot) : [...slots, slot]);
    d(Ad.msg(on ? `${SLOT_LABEL[slot]} : non équipables` : `${SLOT_LABEL[slot]} : équipables`));
  });
  const saveCaps = run(async () => {
    const base = `/admin/content/monsters/${sel}/caps`;
    if (maxCaps.inGame !== '') await api(base, { scope: 'global', value: Number(maxCaps.inGame) });
    if (maxCaps.perPlayer !== '') await api(base, { scope: 'per_player', value: Number(maxCaps.perPlayer) });
    setCaps((await api(`/admin/content/monsters/${sel}`).catch(() => null))?.caps ?? []);
    d(Ad.msg('Spécificités enregistrées'));
  });
  const delCapScope = run(async scope => { await api(`/admin/content/monsters/${sel}/caps/${scope}`, undefined, 'DELETE'); setCaps((await api(`/admin/content/monsters/${sel}`).catch(() => null))?.caps ?? []); setMaxCaps({ inGame: '', perPlayer: '' }); d(Ad.msg('Plafond retiré')); });
  // ── Onglet Liste : instances sur les maps + édition (position / or / butin / équipement) ──
  const selectInst = run(async id => {
    const i = ((await api('/admin/bestiary/status').catch(() => null))?.instances ?? []).find(x => x.id === id);
    if (!i) return;
    setInstSel(i); setIGold(i.gold ?? ''); setInstMap(i.map_id); setPend(null); setILoot([]); setIEquips([]);
    setIEquips(await api(`/admin/content/monsters/${id}/equips`).catch(() => []));
    setILoot(await api(`/admin/content/monsters/${id}/loot`).catch(() => []));
    setIGrid((await api(`/admin/content/monsters/${i.prototype ?? id}/slots`).catch(() => [])).map(x => x.slot));
  });
  const moveInst = run(async () => {
    if (!pend || !instSel) return;
    const body = { x: pend.x, y: pend.y };
    if (String(instMap) !== String(instSel.map_id)) body.mapId = Number(instMap);
    await api(`/admin/bestiary/place/${instSel.pos_id}`, body, 'PUT');
    d(Ad.msg(`Déplacé en ${pend.x},${pend.y}`)); setPend(null); refresh(); selectInst(instSel.id);
  });
  const saveGold = run(async () => { if (!instSel) return; await api(`/admin/content/monsters/${instSel.id}`, { gold_current: iGold === '' ? 0 : Number(iGold) }, 'PUT'); d(Ad.msg('Or enregistré')); refresh(); });
  const addLoot = run(async () => {
    if (!instSel) return;
    const b = { dropRate: Number(nl.dropRate) };
    if (nl.type === 'item') b.itemId = Number(nl.itemId); else b.resource = nl.resource;
    await api(`/admin/content/monsters/${instSel.id}/loot`, b);
    d(Ad.msg('Butin ajouté')); setILoot(await api(`/admin/content/monsters/${instSel.id}/loot`).catch(() => []));
  });
  const delLoot = run(async id => { if (!instSel) return; await api(`/admin/content/monsters/${instSel.id}/loot/${id}`, undefined, 'DELETE'); d(Ad.msg('Retiré')); setILoot(await api(`/admin/content/monsters/${instSel.id}/loot`).catch(() => [])); });
  const addEquip = run(async () => {
    if (!instSel) return;
    if (!ne.itemId) return d(Ad.msg('Rechercher et choisir un objet'));
    await api(`/admin/content/monsters/${instSel.id}/equips`, { itemId: Number(ne.itemId), slot: ne.slot });
    d(Ad.msg('Équipement enregistré')); setIEquips(await api(`/admin/content/monsters/${instSel.id}/equips`).catch(() => []));
  });
  const delEquip = run(async itemId => { if (!instSel) return; await api(`/admin/content/monsters/${instSel.id}/equips/${itemId}`, undefined, 'DELETE'); d(Ad.msg('Retiré')); setIEquips(await api(`/admin/content/monsters/${instSel.id}/equips`).catch(() => [])); });
  const removeInst = run(async () => { if (!instSel) return; await api(`/admin/bestiary/place/${instSel.pos_id}`, undefined, 'DELETE'); d(Ad.msg('Monstre retiré de la map')); setInstSel(null); refresh(); });
  const addNew = async () => {
    if (!nw.type) return d(Ad.msg('Choisir un type de monstre'));
    try {
      const r = await api('/admin/bestiary/place', placeBody({ ...nw, reincarnateH: '' }));
      d(Ad.msg(`« ${r.name} » ajouté en ${r.x},${r.y} — édition possible ci-dessous`));
      refresh(); selectInst(r.id);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const mapDim = (cats?.maps ?? []).find(m => m.id === Number(instMap)) ?? (cats?.maps ?? [])[0];
  const F = FIELDS.monster;
  const typeOf = i => i.spawned ? 'sauvage (spawn)' : i.placed ? 'placé' : 'ancré (prototype)';
  return <section>
    <div className="headrow"><h2>Monstres</h2><span className="sub">liste des types · capacités · spécificités · positions sur les maps</span>
      <span className="grow"></span>{sel === '' && <button className="sm" onClick={newOne}>+ Nouveau type</button>}</div>
    {sel === '' && <div className="list">{monsters.map(m =>
      <button key={m.id} className="item row2" onClick={() => open(m.id)}><b>{m.name}</b>
        <small>{m.guards_item ? `garde ${m.guards_item} · ` : ''}PV {m.hp_max} · n°{m.id}{(status?.instances ?? []).some(i => i.prototype === m.id || i.id === m.id) ? ' · sur map(s)' : ''}</small></button>)}
      {monsters.length === 0 && <p className="note">Aucun type de monstre.</p>}</div>}
    {sel !== '' && <div className="editor">
      <div className="headrow"><h2>{sel === 'new' ? 'Nouveau type' : (draft?.name ?? '…')}</h2>
        <button className="sm" onClick={() => setSel('')}>← Liste</button></div>
      <div className="tabs">{TABS.map(([k, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}</div>

      {tab === 'data' && <div className="form">{F.map(([k, label, t]) =>
        t === 'check' ? <label key={k} className="sm"><input type="checkbox" checked={!!draft?.[k]} onChange={e => set(k, e.target.checked)} /> {label}</label>
          : t === 'json' ? <div key={k}><small>{label}</small><textarea rows="3" value={jsonText(draft?.[k] ?? null)} onChange={e => set(k, e.target.value)} /></div>
            : <div key={k} className="cell"><small>{label}</small><input type={t === 'number' ? 'number' : 'text'} value={draft?.[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>)}
        <button onClick={save}>{sel === 'new' ? 'Créer' : 'Enregistrer'}</button>
        {sel !== 'new' && <button className="danger sm" onClick={remove}>Supprimer le type</button>}
      </div>}

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
        <p className="note">Quantité maximale (dans le jeu / par joueur) et parties du corps pouvant être équipées (même style que l'équipement personnage) : cochez les parties — rien coché = aucune restriction.</p>
        <div className="form">
          <div className="cell"><small>Quantité max dans le jeu</small><input type="number" min="1" value={maxCaps.inGame} onChange={e => setMaxCaps({ ...maxCaps, inGame: e.target.value })} /></div>
          <div className="cell"><small>Quantité max par joueur</small><input type="number" min="1" value={maxCaps.perPlayer} onChange={e => setMaxCaps({ ...maxCaps, perPlayer: e.target.value })} /></div>
          <button className="sm" onClick={saveCaps}>Enregistrer</button>
        </div>
        {(caps ?? []).map(c => <span key={c.scope} className="tag"><b>{c.scope === 'global' ? `jeu ≤ ${c.value}` : c.scope === 'per_player' ? `joueur ≤ ${c.value}` : `${c.scope} ≤ ${c.value}`}</b>
          <button className="sm danger" onClick={() => delCapScope(c.scope)}>×</button></span>)}
        <div className="body">{SLOTS.map(s =>
          <button key={s} className={`chip${slots.includes(s) ? ' on' : ''}`} style={{ left: `${SLOT_POS[s][0]}%`, top: `${SLOT_POS[s][1]}%` }} onClick={() => toggleSlot(s)}>
            <input type="checkbox" checked={slots.includes(s)} readOnly /> {SLOT_LABEL[s]}</button>)}
        </div>
        <p className="note">Ces parties bornent l'équipement des instances (onglet Liste) : une pièce ne peut être portée que sur une partie cochée.</p>
      </div>}

      {tab === 'list' && <div>
        <div className="editor"><h3>Tous les monstres sur les maps ({(status?.instances ?? []).length})</h3>
          {(status?.instances ?? []).length === 0 && <p className="note">Aucun monstre sur les maps.</p>}
          {(status?.instances ?? []).length > 0 && <table>
            <thead><tr><th>Monstre</th><th>Type</th><th>Carte</th><th>Position</th><th>PV</th><th>Or</th><th>Liaison</th><th>Réincarnation</th><th></th></tr></thead>
            <tbody>{status.instances.map(i => <tr key={i.id}>
              <td>{i.name}</td><td>{typeOf(i)}</td><td>{i.map_id}</td><td>{i.x},{i.y}</td>
              <td>{i.hp_current}/{i.hp_max}</td><td>{i.gold ?? 0}</td>
              <td>{linkedLabel(i)}</td>
              <td>{i.reincarnate_h > 0 ? `${i.reincarnate_h} h${respawnIn(i) ? ` · ${respawnIn(i)}` : ''}` : '—'}</td>
              <td><button className="sm" onClick={() => selectInst(i.id)}>Sélectionner</button></td></tr>)}</tbody>
          </table>}
        </div>
        {instSel && <div className="editor"><h3>Édition — {instSel.name} (n°{instSel.id})</h3>
          <p className="note">Modifier sa position sur la map (choisir la carte si besoin, cliquer une case, puis « Déplacer »), l'or qu'il détient et donnera au joueur qui le tue, le butin qu'il porte et son équipement (parties cochées en Spécificités).</p>
          <div className="form">
            <div className="cell"><small>Carte</small><select value={instMap} onChange={e => { setInstMap(e.target.value); setPend(null); }}>
              {(cats?.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file}</option>)}</select></div>
            <div className="cell"><small>Or détenu</small><input type="number" min="0" value={iGold} onChange={e => setIGold(e.target.value)} />
              <button className="sm" onClick={saveGold}>OK</button></div>
            <div className="cell"><small>Déplacer</small>
              <button className="sm" disabled={!pend} onClick={moveInst}>{pend ? `→ ${pend.x},${pend.y}` : 'Cliquer une case'}</button></div>
            <button className="sm danger" onClick={removeInst}>Retirer de la map</button>
          </div>
          {mapDim && <MiniMap width={mapDim.width} height={mapDim.height} mapId={instMap}
            items={(status?.instances ?? []).filter(i => i.map_id === Number(instMap))}
            selected={instSel.id} pending={pend} onPick={p => setPend(p)} />}
          <h4>Butin (donné au tueur)</h4>
          {iLoot.map(l => <span key={l.id} className="tag"><b>{lootLabel(l)}</b> {l.drop_rate} %<button className="sm danger" onClick={() => delLoot(l.id)}>×</button></span>)}
          {iLoot.length === 0 && <p className="note">Aucun butin.</p>}
          <div className="form">
            <div className="cell"><small>Type</small><select value={nl.type} onChange={e => setNl({ ...nl, type: e.target.value })}>
              <option value="item">Objet</option><option value="resource">Ressource</option></select></div>
            {nl.type === 'item' && <div className="cell"><small>Objet</small>
              <Pick options={cats?.items ?? []} value={nl.itemId} onPick={v => setNl({ ...nl, itemId: v })} labelOf={o => `${o.name} (n°${o.id})`} placeholder="Rechercher…" /></div>}
            {nl.type === 'resource' && <div className="cell"><small>Ressource</small><input value={nl.resource} onChange={e => setNl({ ...nl, resource: e.target.value })} placeholder="bois, fer…" /></div>}
            <div className="cell"><small>Chance (%)</small><input type="number" min="0" max="100" value={nl.dropRate} onChange={e => setNl({ ...nl, dropRate: e.target.value })} /></div>
            <button className="sm" onClick={addLoot}>+ Ajouter au butin</button>
          </div>
          <h4>Équipement porté (parties : {iGrid.length ? iGrid.map(s => SLOT_LABEL[s]).join(', ') : 'aucune restriction'})</h4>
          {iEquips.map(x => <span key={x.item_id} className="tag"><b>{equipLabel(x)}</b><button className="sm danger" onClick={() => delEquip(x.item_id)}>×</button></span>)}
          <div className="form">
            <div className="cell"><small>Objet</small>
              <Pick options={cats?.items ?? []} value={ne.itemId} onPick={v => setNe({ ...ne, itemId: v })} labelOf={o => `${o.name} (n°${o.id})`} placeholder="Rechercher…" /></div>
            <div className="cell"><small>Partie du corps</small><select value={ne.slot} onChange={e => setNe({ ...ne, slot: e.target.value })}>
              {(iGrid.length ? iGrid : SLOTS).map(s => <option key={s} value={s}>{SLOT_LABEL[s]}</option>)}</select></div>
            <button className="sm" onClick={addEquip}>+ Équiper</button>
          </div>
        </div>}
        <div className="editor"><h3>Ajouter un monstre sur une map</h3>
          <p className="note">Mêmes options que l'édition ci-dessus : après l'ajout, l'instance s'ouvre en édition (position, or, butin, équipement).</p>
          <div className="form">
            <div className="cell"><small>Type</small><Pick options={monsters} value={nw.type} onPick={v => setNw({ ...nw, type: v })} labelOf={m => `${m.name} · n°${m.id}`} placeholder="— Choisir —" /></div>
            <div className="cell"><small>Carte</small><select value={nw.mapId} onChange={e => setNw({ ...nw, mapId: e.target.value })}>
              <option value="">—</option>{(cats?.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file}</option>)}</select></div>
            <div className="cell"><small>x</small><input type="number" value={nw.x} onChange={e => setNw({ ...nw, x: e.target.value })} /></div>
            <div className="cell"><small>y</small><input type="number" value={nw.y} onChange={e => setNw({ ...nw, y: e.target.value })} /></div>
            <div className="cell"><small>Or</small><input type="number" min="0" value={nw.gold} onChange={e => setNw({ ...nw, gold: e.target.value })} /></div>
            <button onClick={addNew}>+ Ajouter</button>
          </div>
        </div>
      </div>}

      {tab === 'rules' && sel !== 'new' && <div><RuleForms kind="monster" id={sel} onSaved={() => open(sel)} /><RulesList kind="monster" id={sel} extra={{ costs: [], caps, modifiers: [] }} onSaved={() => open(sel)} /></div>}
    </div>}
  </section>;
}
