// Section admin « Structures », sur le modèle de « Monstres » (migration 50) : à gauche les TYPES de structure ; un type ouvert a ses
// onglets — Caractéristiques (réglages globaux), Règles transverses, Sur les cartes (ses structures posées : ajout sur la mini-carte,
// déplacement, retrait, et édition individuelle : chaque valeur suit le type sauf celles précisées sur la structure).
import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { Plus, Save, Trash2 } from 'lucide-react';
import { FIELDS, jsonOr, jsonText } from './entityFields.js';
import { RuleForms, RulesList } from './EntityRules.jsx';
import { BuildingExtras, BuildingSpells, ActivationEditor, ActivationElements } from './BuildingExtras.jsx';
import { buildingBody, buildingDraft, isTypeRow, changedOnly } from './building.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx'; import { RespawnPanel } from './MonsterParts.jsx'; import MiniMap from './MiniMap.jsx';
const F = FIELDS.building;
const TABS = [['data', 'Caractéristiques'], ['rules', 'Règles transverses'], ['list', 'Sur les cartes']];
const RACES = [['human', 'Hommes'], ['demon', 'Démons'], ['angel', 'Anges']];
const blank = () => { const o = { is_type: true, activationGroups: [], activations: [] }; for (const [k, , t] of F) o[k] = t === 'check' ? k === 'visible' : ''; return o; };

/** Fiche d'une structure : un type (réglages globaux) ou une structure posée (`det.type_id` : seules les valeurs changées partent et
 *  deviennent individuelles ; « individuel ↺ » remet la valeur du type). */
function StructForm({ det, cat, onSaved, onDeleted }) {
  const d = useDispatch(), [draft, setDraft] = useState(() => (det ? buildingDraft(det) : blank())), [dirty, setDirty] = useState(false);
  const inst = !!det?.type_id && !det?.is_type, set = (k, v) => { setDraft({ ...draft, [k]: v }); setDirty(true); };
  const err = e => d(Ad.msg(e.message));
  const save = async () => {
    const body = {};
    for (const [k, , t] of F) {
      if (t === 'check') { body[k] = !!draft[k]; continue; }
      if (t === 'opts') { body[k] = draft[k] || null; continue; }
      if (draft[k] === undefined || draft[k] === '') continue;
      if (t === 'json') { const v = jsonOr(draft[k], undefined); if (v === undefined) { d(Ad.msg(`JSON invalide : ${k}`)); return; } body[k] = v; }
      else if (t === 'number') body[k] = Number(draft[k]); else body[k] = String(draft[k]);
    }
    let payload = buildingBody(body, draft);
    if (inst) { payload = changedOnly(payload, det); if (!Object.keys(payload).length) { d(Ad.msg('Rien n\'a changé')); return; } }
    if (!det) payload.is_type = true;
    try { const r = det ? await api(`/admin/content/buildings/${det.id}`, payload, 'PUT') : await api('/admin/content/buildings', payload, 'POST'); d(Ad.ok('Enregistré')); setDirty(false); onSaved(r.id); } catch (e) { err(e); }
  };
  const inherit = async k => { try { await api(`/admin/content/buildings/${det.id}`, { inherit: [k] }, 'PUT'); d(Ad.ok('Valeur du type rétablie')); onSaved(det.id); } catch (e) { err(e); } };
  const remove = async () => { if (!confirmDel(`le type « ${det.name} » (ses structures posées gardent leurs valeurs, sans type)`)) return;
    try { await api(`/admin/content/buildings/${det.id}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); onDeleted(); } catch (e) { err(e); } };
  const hint = k => inst && (det.overrides?.includes(k) ? <button className="sm indiv" title="Valeur individuelle : revenir à celle du type" onClick={() => inherit(k)}>individuel ↺</button>
    : <small className="fromtype">type : {det.type?.[k] == null || det.type?.[k] === '' ? '—' : typeof det.type[k] === 'object' ? 'réglé' : String(det.type[k])}</small>);
  return <div className="editor">
    {inst && <p className="note">Structure du type « {det.type?.name} » : chaque valeur suit le type, sauf celles marquées « individuel » (toute valeur modifiée ici le devient).
      {Object.keys(det.own_data ?? {}).length > 0 && <> Données propres : {Object.keys(det.own_data).join(', ')} <button className="sm indiv" title="Revenir aux données du type" onClick={() => inherit('data')}>↺</button></>}</p>}
    {dirty && <span className="dirty">non enregistré</span>}
    <div className="form">{F.map(([k, label, t, opts]) =>
      t === 'check' ? <label key={k} className="sm check"><input type="checkbox" checked={!!draft[k]} onChange={e => set(k, e.target.checked)} /> {label} {hint(k)}</label>
        : t === 'opts' ? <div key={k} className="cell"><small>{label} {hint(k)}</small><select value={draft[k] ?? ''} onChange={e => set(k, e.target.value)}>{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
          : t === 'json' ? <div key={k} className="cell span-all"><small>{label} {hint(k)}</small><textarea className="mono" rows="4" value={typeof draft[k] === 'string' ? draft[k] : jsonText(draft[k] ?? null)} onChange={e => set(k, e.target.value)} /></div>
            : <div key={k} className="cell"><small>{label} {k !== 'name' && hint(k)}</small><input type={t === 'number' ? 'number' : 'text'} value={draft[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>)}</div>
    <BuildingExtras draft={draft} set={set} resources={cat.resources ?? []} />
    <ActivationElements list={draft.activations} set={v => set('activations', v)} cat={cat} />
    <ActivationEditor groups={draft.activationGroups} set={v => set('activationGroups', v)} cat={cat} title="Conditions supplémentaires (facultatif)"
      note="Exigées en plus de l'élément choisi (ex. rang minimum, sort connu). Il suffit d'une option ; dans une option, tout ce qui est renseigné est exigé. Sans élément d'activation, ces conditions activent seules la structure (sans durée) ; porte sans monde : conditions pour la franchir." />
    {det?.id && <BuildingSpells id={det.id} />}
    {det?.id && <div className="bldextras"><h5>Réapparition {inst ? '(cette structure)' : '(par défaut pour ce type)'}</h5>
      {det.destroyed_at && <p className="note">Détruite le {new Date(det.destroyed_at).toLocaleString('fr-FR')}{det.respawn_blockers?.length ? ` — bloquée : ${det.respawn_blockers.join(', ')}` : ''}.</p>}
      <RespawnPanel key={det.id} kind="building" monster={det} cats={cat} onSaved={() => onSaved(det.id)} /></div>}
    <div className="actions sticky">{det?.id && !inst && <button className="danger" onClick={remove}><Trash2 size={14} /> Supprimer le type</button>}<span className="grow" />
      <button className="primary" onClick={save}><Save size={14} /> {det ? 'Enregistrer' : 'Créer le type'}</button></div>
  </div>;
}

/** Onglet « Sur les cartes » d'un type : ses structures posées, ajout (mini-carte), puis édition individuelle d'une structure. */
function Placed({ type, rows, cat, reload }) {
  const d = useDispatch(), [mode, setMode] = useState(''), [inst, setInst] = useState(null), [pos, setPos] = useState({ mapId: '', x: '', y: '', name: '', race: '' });
  const err = e => d(Ad.msg(e.message));
  const openInst = async id => { try { const det = await api(`/admin/content/buildings/${id}`); setInst(det); setPos({ mapId: det.position?.map_id ?? det.home?.map ?? '', x: det.position?.coord_x ?? det.home?.x ?? '', y: det.position?.coord_y ?? det.home?.y ?? '', name: '', race: '' }); setMode('edit'); } catch (e) { err(e); } };
  const add = async () => { try { const r = await api('/admin/structures/place', { typeId: type.id, mapId: Number(pos.mapId), x: Number(pos.x), y: Number(pos.y), ...(pos.name.trim() ? { name: pos.name.trim() } : {}), ...(pos.race ? { race: pos.race } : {}) }, 'POST');
    d(Ad.ok('Structure ajoutée')); await reload(); openInst(r.id); } catch (e) { err(e); } };
  const move = async () => { try { await api(`/admin/structures/${inst.id}/position`, { mapId: Number(pos.mapId), x: Number(pos.x), y: Number(pos.y) }, 'PUT'); d(Ad.ok('Structure déplacée')); await reload(); openInst(inst.id); } catch (e) { err(e); } };
  const removeInst = async () => { if (!confirmDel(`la structure « ${inst.name} » de la carte`)) return;
    try { await api(`/admin/structures/${inst.id}`, undefined, 'DELETE'); d(Ad.ok('Structure retirée')); setInst(null); setMode(''); reload(); } catch (e) { err(e); } };
  const mapDim = (cat.maps ?? []).find(m => m.id === Number(pos.mapId));
  return <div>
    {type && <div className="actions"><button className="sm" onClick={() => { setInst(null); setPos({ mapId: '', x: '', y: '', name: '', race: '' }); setMode('new'); }}><Plus size={14} /> Ajouter</button></div>}
    {!rows.length && <Empty>{type ? 'Aucune structure de ce type sur les cartes.' : 'Aucune construction de joueur.'}</Empty>}
    {rows.length > 0 && <div className="tablewrap"><table><thead><tr><th>Structure</th><th>Carte</th><th>Position</th><th>Structure (points)</th><th>Propriétaire</th><th /></tr></thead>
      <tbody>{rows.map(r => <tr key={r.id}><td>{r.name}{r.overrides?.length ? <small className="fromtype"> · {r.overrides.length} individuel(s)</small> : null}</td>
        <td>{r.map_id ?? '—'}</td><td>{r.map_id != null ? `${r.coord_x},${r.coord_y}` : 'détruite'}</td>
        <td>{r.invulnerable ? 'invulnérable' : `${r.structure_current ?? r.structure}/${r.structure}`}</td><td>{r.owner ?? '—'}</td>
        <td><button className={`sm${inst?.id === r.id ? ' on' : ''}`} onClick={() => openInst(r.id)}>Sélectionner</button></td></tr>)}</tbody></table></div>}
    {mode !== '' && <div className="editor">
      <h3>{mode === 'edit' ? `Édition — ${inst?.name} (n°${inst?.id})` : `Ajouter une structure « ${type?.name} » sur une carte`}</h3>
      <p className="note">Position : saisir x / y, ou cliquer une case sur la mini-carte.</p>
      <div className="form">
        <div className="cell"><small>Carte</small><select value={pos.mapId} onChange={e => setPos({ ...pos, mapId: e.target.value })}><option value="">—</option>{(cat.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file}</option>)}</select></div>
        <div className="cell"><small>x</small><input type="number" min="0" value={pos.x} onChange={e => setPos({ ...pos, x: e.target.value })} /></div>
        <div className="cell"><small>y</small><input type="number" min="0" value={pos.y} onChange={e => setPos({ ...pos, y: e.target.value })} /></div>
        {mode === 'new' && <div className="cell"><small>Nom (défaut : {type?.name})</small><input value={pos.name} onChange={e => setPos({ ...pos, name: e.target.value })} /></div>}
        {mode === 'new' && type?.kind === 'capital' && <div className="cell"><small>Race rattachée</small><select value={pos.race} onChange={e => setPos({ ...pos, race: e.target.value })}><option value="">—</option>{RACES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>}
        {mode === 'new' ? <button className="sm primary" disabled={!pos.mapId || pos.x === '' || pos.y === ''} onClick={add}><Plus size={14} /> Ajouter</button>
          : <button className="sm" disabled={!pos.mapId || pos.x === '' || pos.y === ''} onClick={move}>{inst?.position ? 'Déplacer' : 'Reposer'} en {pos.x},{pos.y}</button>}
      </div>
      {mapDim && <MiniMap width={mapDim.width} height={mapDim.height} mapId={pos.mapId} items={rows.filter(r => r.map_id === Number(pos.mapId)).map(r => ({ id: r.id, x: r.coord_x, y: r.coord_y, name: r.name }))}
        selected={inst?.id} pending={pos.x !== '' && pos.y !== '' ? { x: Number(pos.x), y: Number(pos.y) } : null} onPick={p => setPos({ ...pos, x: p.x, y: p.y })} />}
      {mode === 'edit' && inst && <><button className="sm danger" onClick={removeInst}><Trash2 size={13} /> Retirer de la carte</button>
        <StructForm key={`${inst.id}:${JSON.stringify(inst.overrides)}:${inst.name}`} det={inst} cat={cat} onSaved={async () => { await reload(); openInst(inst.id); }} onDeleted={() => {}} /></>}
    </div>}
  </div>;
}

export default function StructuresTab() {
  const d = useDispatch(), [rows, setRows] = useState(null), [cat, setCat] = useState({}), [sel, setSel] = useState(null), [det, setDet] = useState(null), [tab, setTab] = useState('data'), [q, setQ] = useState('');
  const list = () => api('/admin/content/buildings').then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { list(); }, []);   // corps de bloc : jamais de Promise retournée
  useEffect(() => { api('/admin/catalog').then(setCat).catch(() => {}); }, []);
  const open = async (id, keepTab) => { setSel(id); if (!keepTab) setTab(id === 'free' ? 'list' : 'data');
    if (id === 'new' || id === 'free') { setDet(null); return; }
    try { setDet(await api(`/admin/content/buildings/${id}`)); } catch (e) { d(Ad.msg(e.message)); } };
  const types = (rows ?? []).filter(isTypeRow), free = (rows ?? []).filter(r => !isTypeRow(r) && !r.type_id);
  const view = types.filter(r => matches(q, r.name, r.kind, r.id)), count = id => (rows ?? []).filter(r => r.type_id === id).length;
  return <section className="split">
    <div className="listpane apanel">
      <div className="headrow"><Search value={q} onChange={setQ} /><button className="sm" onClick={() => open('new')}><Plus size={14} /> Nouveau type</button></div>
      <small className="count">{rows ? `${view.length} type(s)` : 'Chargement…'}</small>
      <div className="list">{view.map(r => <button key={r.id} className={`item row2${sel === r.id ? ' on' : ''}`} onClick={() => open(r.id)}><b>{r.name}</b><small>{r.kind ?? ''} · {r.is_type ? `${count(r.id)} sur les cartes` : 'modèle (parchemin)'} · n°{r.id}</small></button>)}
        {free.length > 0 && <button className={`item row2${sel === 'free' ? ' on' : ''}`} onClick={() => open('free')}><b>Constructions des joueurs</b><small>sans type · {free.length}</small></button>}
        {rows && !view.length && <Empty>Aucun type.</Empty>}</div>
    </div>
    <div className="detailpane">
      {sel == null && <div className="apanel"><Empty>Sélectionnez un type de structure ou créez-en un.</Empty></div>}
      {sel === 'new' && <div className="apanel"><h3>Nouveau type de structure</h3><StructForm det={null} cat={cat} onSaved={async id => { await list(); open(id); }} onDeleted={() => {}} /></div>}
      {sel === 'free' && <div className="apanel"><h3>Constructions des joueurs</h3><Placed type={null} rows={free} cat={cat} reload={list} /></div>}
      {det && sel === det.id && <div className="apanel">
        <div className="headrow"><h3>{det.name}</h3></div>
        <div className="tabs">{TABS.filter(([k]) => det.is_type || k !== 'list').map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</div>
        {tab === 'data' && <StructForm key={det.id} det={det} cat={cat} onSaved={async id => { await list(); open(id, true); }} onDeleted={() => { setSel(null); setDet(null); list(); }} />}
        {tab === 'rules' && <div><RuleForms kind="building" id={det.id} onSaved={() => open(det.id, true)} /><RulesList kind="building" id={det.id} extra={det} onSaved={() => open(det.id, true)} /></div>}
        {tab === 'list' && det.is_type && <Placed type={det} rows={(rows ?? []).filter(r => r.type_id === det.id)} cat={cat} reload={list} />}
      </div>}
    </div>
  </section>;
}
