import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import Pick from './Pick.jsx';
import { SLOTS, SLOT_LABEL, spellLabel, equipLabel, auraLabel, capsToMaxCaps, placeBody, respawnIn } from './monsterDetails.js';
/**
 * Détails de monstre (Étape 2 phase 3) : liste des monstres (noms cliquables) puis onglets
 *  - Compétences/sorts : menu déroulant avec recherche sur la base de sorts globale,
 *  - Équipements : objet du catalogue + slot (mains/tête/torse/pieds/collier/bracelet/bague),
 *  - Auras : bonus/malus appliqués en continu par un sort (sans énergie), alliés/ennemis + périmètre,
 *  - Plafonds : nombre max dans le jeu (global) et par invocation (par joueur),
 *  - Placements : tous les monstres sur les cartes + ajout spontané (drops à la mort :
 *    objets/ressources/divins + or, réincarnation automatique après délai).
 */
const TABS = [['spells', 'Compétences & sorts'], ['equips', 'Équipement'], ['auras', 'Auras (bonus/malus en continu)'], ['caps', 'Plafonds'], ['place', 'Placements sur carte']];
export default function MonsterDetails() {
  const d = useDispatch();
  const [monsters, setMonsters] = useState([]), [cats, setCats] = useState(null), [status, setStatus] = useState(null);
  const [sel, setSel] = useState(''), [tab, setTab] = useState('spells');
  const [spellsL, setSpellsL] = useState(null), [equips, setEquips] = useState(null), [auras, setAuras] = useState(null), [caps, setCaps] = useState([]);
  const [sp, setSp] = useState(''), [eq, setEq] = useState({ itemId: '', slot: 'mains' }), [au, setAu] = useState({ spellId: '', target: 'enemy', radius: 3 });
  const [maxCaps, setMaxCaps] = useState({ inGame: '', perPlayer: '' });
  const [pl, setPl] = useState({ monsterId: '', mapId: '', x: 1, y: 1, gold: '', items: true, resources: true, divine: false, reincarnateH: '' });
  const load = () => {
    api('/admin/content/monsters').then(setMonsters).catch(e => d(Ad.msg(e.message)));
    api('/admin/catalog').then(setCats).catch(() => {});
    api('/admin/bestiary/status').then(setStatus).catch(() => {});
  };
  useEffect(() => { load(); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const open = async id => {
    setSel(id); setSpellsL(null); setEquips(null); setAuras(null); setCaps([]);
    const [sp, eq, au, det] = await Promise.all([
      api(`/admin/content/monsters/${id}/spells`).catch(e => { d(Ad.msg(e.message)); return []; }),
      api(`/admin/content/monsters/${id}/equips`).catch(() => []),
      api(`/admin/content/monsters/${id}/auras`).catch(() => []),
      api(`/admin/content/monsters/${id}`).catch(() => null)
    ]);
    setSpellsL(sp); setEquips(eq); setAuras(au); setCaps(det?.caps ?? []); setMaxCaps(capsToMaxCaps(det?.caps ?? []));
  };
  const run = f => async () => { try { await f(); open(sel); } catch (e) { d(Ad.msg(e.message)); } };
  const addSpell = run(async () => { if (!sp) return d(Ad.msg('Choisir un sort')); await api(`/admin/content/monsters/${sel}/spells`, { spellId: Number(sp) }); setSp(''); d(Ad.msg('Sort attribué')); });
  const delSpell = run(async spellId => { await api(`/admin/content/monsters/${sel}/spells/${spellId}`, undefined, 'DELETE'); d(Ad.msg('Retiré')); });
  const addEquip = run(async () => { if (!eq.itemId) return d(Ad.msg('Choisir un objet')); await api(`/admin/content/monsters/${sel}/equips`, { itemId: Number(eq.itemId), slot: eq.slot }); d(Ad.msg('Équipement enregistré')); });
  const delEquip = run(async itemId => { await api(`/admin/content/monsters/${sel}/equips/${itemId}`, undefined, 'DELETE'); d(Ad.msg('Retiré')); });
  const addAura = run(async () => { if (!au.spellId) return d(Ad.msg('Choisir un sort')); await api(`/admin/content/monsters/${sel}/auras`, { spellId: Number(au.spellId), target: au.target, radius: Number(au.radius) }); d(Ad.msg('Aura créée')); });
  const delAura = run(async id => { await api(`/admin/content/monsters/${sel}/auras/${id}`, undefined, 'DELETE'); d(Ad.msg('Aura supprimée')); });
  const saveCaps = run(async () => {
    const base = `/admin/content/monsters/${sel}/caps`;
    if (maxCaps.inGame !== '') await api(base, { scope: 'global', value: Number(maxCaps.inGame) });
    if (maxCaps.perPlayer !== '') await api(base, { scope: 'per_player', value: Number(maxCaps.perPlayer) });
    d(Ad.msg('Plafonds enregistrés'));
  });
  const delCap = run(async scope => { await api(`/admin/content/monsters/${sel}/caps/${scope}`, undefined, 'DELETE'); d(Ad.msg('Plafond retiré')); });
  const place = async () => {
    const b = placeBody({ ...pl, monsterId: pl.monsterId || sel });
    if (!b.monsterId) return d(Ad.msg('Choisir un monstre'));
    try {
      const r = await api('/admin/bestiary/place', b);
      d(Ad.msg(`« ${r.name} » placé en ${r.x},${r.y} (or ${r.gold}, ${r.dropsCopied} drop(s) copié(s))`));
      setStatus(await api('/admin/bestiary/status'));
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const unplace = async posId => { try { await api(`/admin/bestiary/place/${posId}`, undefined, 'DELETE'); d(Ad.msg('Placement retiré')); setStatus(await api('/admin/bestiary/status')); } catch (e) { d(Ad.msg(e.message)); } };
  const typeOf = i => i.spawned ? 'sauvage (spawn)' : i.placed ? 'placé' : 'ancré (prototype)';
  return <section>
    <div className="headrow"><h2>Détails de monstre</h2><span className="sub">compétences · équipement · auras · plafonds · placements</span></div>
    <div className="form">
      <div className="cell"><small>Monstre (cliquer sur un nom)</small>
        <Pick options={monsters} value={sel} onPick={open} labelOf={m => `${m.name} · n°${m.id}`} placeholder="— Choisir un monstre —" /></div>
      {(status?.instances ?? []).length > 0 && <small className="note">{status.instances.length} monstre(s) actuellement sur les cartes → onglet Placements</small>}
    </div>
    {sel && <div className="editor">
      <div className="tabs">{TABS.map(([k, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}</div>
      {tab === 'spells' && <div>
        <p className="note">Compétences piochées dans la base de sorts globale (recherche) : le monstre possède ces sorts.</p>
        <div className="row"><Pick options={cats?.spells ?? []} value={sp} onPick={setSp} labelOf={s => spellLabel(s)} placeholder="Rechercher un sort…" />
          <button className="sm" onClick={addSpell}>+ Attribuer</button></div>
        {(spellsL ?? []).map(x => <span key={x.spell_id} className="tag"><b>{spellLabel(cats?.spells?.find(s => s.id === x.spell_id) ?? { name: x.spell_name, id: x.spell_id, kind: x.kind, energy_cost: x.energy_cost })}</b>
          <button className="sm danger" onClick={() => delSpell(x.spell_id)}>×</button></span>)}
        {(spellsL ?? []).length === 0 && <p className="note">Aucun sort attribué.</p>}
      </div>}
      {tab === 'equips' && <div>
        <p className="note">Pièce d'équipement + slot où le monstre la porte ({SLOTS.map(s => SLOT_LABEL[s]).join(', ')}).</p>
        <div className="row">
          <Pick options={cats?.items ?? []} value={eq.itemId} onPick={v => setEq({ ...eq, itemId: v })} labelOf={o => `${o.name} (n°${o.id})`} placeholder="Rechercher un objet…" />
          <select value={eq.slot} onChange={e => setEq({ ...eq, slot: e.target.value })}>
            {SLOTS.map(s => <option key={s} value={s}>{SLOT_LABEL[s]}</option>)}</select>
          <button className="sm" onClick={addEquip}>+ Équiper</button></div>
        {(equips ?? []).map(x => <span key={x.item_id} className="tag"><b>{equipLabel(x)}</b>
          <button className="sm danger" onClick={() => delEquip(x.item_id)}>×</button></span>)}
        {(equips ?? []).length === 0 && <p className="note">Aucun équipement.</p>}
      </div>}
      {tab === 'auras' && <div>
        <p className="note">Bonus/malus appliqués <b>en continu</b> par un sort, sans consommation de l'énergie du sort : cible (alliés/ennemis) et périmètre en cases.</p>
        <div className="row">
          <Pick options={cats?.spells ?? []} value={au.spellId} onPick={v => setAu({ ...au, spellId: v })} labelOf={s => spellLabel(s)} placeholder="Rechercher un sort…" />
          <select value={au.target} onChange={e => setAu({ ...au, target: e.target.value })}>
            <option value="enemy">ennemis</option><option value="ally">alliés</option></select>
          <input type="number" min="1" max="50" value={au.radius} onChange={e => setAu({ ...au, radius: e.target.value })} /> <small>cases</small>
          <button className="sm" onClick={addAura}>+ Créer l'aura</button></div>
        {(auras ?? []).map(x => <span key={x.id} className="tag"><b>{auraLabel(x)}</b>
          <button className="sm danger" onClick={() => delAura(x.id)}>×</button></span>)}
        {(auras ?? []).length === 0 && <p className="note">Aucune aura.</p>}
      </div>}
      {tab === 'caps' && <div>
        <p className="note">Nombre maximum de monstres : dans le jeu (plafond global) et par invocation — c'est-à-dire par joueur (plafond par joueur).</p>
        <div className="row"><small>Max dans le jeu</small>
          <input type="number" min="1" value={maxCaps.inGame} onChange={e => setMaxCaps({ ...maxCaps, inGame: e.target.value })} />
          <small>Max par joueur (invocation)</small>
          <input type="number" min="1" value={maxCaps.perPlayer} onChange={e => setMaxCaps({ ...maxCaps, perPlayer: e.target.value })} />
          <button className="sm" onClick={saveCaps}>Enregistrer</button></div>
        {(caps ?? []).map(c => <span key={c.scope} className="tag"><b>{c.scope === 'global' ? `global ≤ ${c.value}` : c.scope === 'per_player' ? `par joueur ≤ ${c.value}` : `${c.scope} ≤ ${c.value}`}</b>
          <button className="sm danger" onClick={() => delCap(c.scope)}>×</button></span>)}
      </div>}
      {tab === 'place' && <div>
        <div className="editor"><h3>Tous les monstres sur le jeu ({(status?.instances ?? []).length})</h3>
          {(status?.instances ?? []).length === 0 && <p className="note">Aucun monstre placé.</p>}
          {(status?.instances ?? []).length > 0 && <table>
            <thead><tr><th>Monstre</th><th>Carte</th><th>Case</th><th>PV</th><th>Type</th><th>Or</th><th>Réincarnation</th><th></th></tr></thead>
            <tbody>{status.instances.map(i => <tr key={i.id}>
              <td>{i.name}</td><td>{i.map_id}</td><td>{i.x},{i.y}</td><td>{i.hp_current}/{i.hp_max}</td>
              <td>{typeOf(i)}</td><td>{i.gold ?? 0}</td>
              <td>{i.reincarnate_h > 0 ? `${i.reincarnate_h} h ${respawnIn(i) ? `· ${respawnIn(i)}` : ''}` : '—'}</td>
              <td><button className="sm danger" onClick={() => unplace(i.pos_id)}>Retirer</button></td></tr>)}</tbody>
          </table>}
        </div>
        <div className="editor"><h3>Ajouter un monstre sur une carte</h3>
          <div className="form">
            <div className="cell"><small>Monstre</small><Pick options={monsters} value={pl.monsterId || sel} onPick={v => setPl({ ...pl, monsterId: v })} labelOf={m => `${m.name} · n°${m.id}`} placeholder="— Choisir —" /></div>
            <div className="cell"><small>Carte</small><select value={pl.mapId} onChange={e => setPl({ ...pl, mapId: e.target.value })}>
              <option value="">—</option>{(cats?.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file} ({m.width}×{m.height})</option>)}</select></div>
            <div className="cell"><small>x</small><input type="number" value={pl.x} onChange={e => setPl({ ...pl, x: e.target.value })} /></div>
            <div className="cell"><small>y</small><input type="number" value={pl.y} onChange={e => setPl({ ...pl, y: e.target.value })} /></div>
            <div className="cell"><small>Or à la mort</small><input type="number" min="0" value={pl.gold} onChange={e => setPl({ ...pl, gold: e.target.value })} /></div>
            <div className="cell"><small>Réincarnation après (h, 0 = instantané)</small><input type="number" min="0" value={pl.reincarnateH} onChange={e => setPl({ ...pl, reincarnateH: e.target.value })} /></div>
            <div className="cell"><small>Contient à la mort</small>
              <label className="sm"><input type="checkbox" checked={pl.items} onChange={e => setPl({ ...pl, items: e.target.checked })} /> objets</label>
              <label className="sm"><input type="checkbox" checked={pl.resources} onChange={e => setPl({ ...pl, resources: e.target.checked })} /> ressources</label>
              <label className="sm"><input type="checkbox" checked={pl.divine} onChange={e => setPl({ ...pl, divine: e.target.checked })} /> divins</label></div>
            <button onClick={place}>+ Placer</button>
          </div>
          <p className="note">Le placement crée une instance du monstre (cloné, comme les sauvages) avec les drops choisis : les entrées de butin du prototype sont copiées selon les cases cochées, l'or est fixé sur l'instance. Le monstre tué ne réapparaît que si une réincarnation est définie (délai en heures ; le tick horaire le régénère à l'échéance, les corps en attente ne régénèrent pas avant).</p>
        </div>
      </div>}
    </div>}
  </section>;
}
