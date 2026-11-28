import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { Plus, Save, Trash2 } from 'lucide-react';
import { FIELDS, jsonOr, jsonText, URL_KIND } from './entityFields.js';
import { RuleForms, RulesList } from './EntityRules.jsx';
import { BuildingExtras, BuildingSpells, ActivationEditor, ActivationElements } from './BuildingExtras.jsx'; import { buildingBody, buildingDraft, isTypeRow, changedOnly } from './building.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx'; import { RespawnPanel } from './MonsterParts.jsx';
/** Éditeur générique d'entités (structures) : liste filtrable à gauche + fiche à droite (caractéristiques, règles transverses).
 *  Structures (migration 50) : « Types » (réglages globaux, pose sur la carte) et « Sur les cartes » (valeurs du type, sauf celles
 *  individualisées : seules les valeurs modifiées sont envoyées, « ↺ » remet une valeur sur celle du type). */
export default function Entities({ kind }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [sel, setSel] = useState(null), [draft, setDraft] = useState(null), [tab, setTab] = useState('data'), [q, setQ] = useState(''), [dirty, setDirty] = useState(false);
  const url = URL_KIND[kind], [cat, setCat] = useState({}), [scope, setScope] = useState('types'), [place, setPlace] = useState({ mapId: 1, x: '', y: '', name: '', race: '' });
  const inst = kind === 'building' && !!sel?.type_id && !sel?.is_type;   // structure posée rattachée à un type
  useEffect(() => { if (kind === 'building') api('/admin/catalog').then(setCat).catch(() => {}); }, [kind]);
  const list = () => api(`/admin/content/${url}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { list(); }, [kind]);   // corps de bloc : l'effet ne retourne jamais la Promise du loader (crash unmount « destroy is not a function »)
  const leave = () => !dirty || window.confirm('Modifications non enregistrées : les abandonner ?');
  const open = async (id, force) => { if (!force && !leave()) return; const det = await api(`/admin/content/${url}/${id}`).catch(e => { d(Ad.msg(e.message)); return null; }); if (!det) return; setSel(det); setDraft(kind === 'building' ? buildingDraft(det) : { ...det }); setTab('data'); setDirty(false); };
  const save = async () => {
    const body = {};
    for (const [k, , t] of FIELDS[kind]) {
      if (t === 'check') { body[k] = !!draft[k]; continue; }
      if (t === 'opts') { body[k] = draft[k] || null; continue; }
      if (draft[k] === undefined || draft[k] === '') continue;
      if (t === 'json') { const v = jsonOr(draft[k], undefined); if (v === undefined) { d(Ad.msg(`JSON invalide : ${k}`)); return; } body[k] = v; }
      else if (t === 'number') body[k] = Number(draft[k]);
      else body[k] = String(draft[k]);
    }
    try {
      let payload = kind === 'building' ? buildingBody(body, draft) : body;
      if (inst) { payload = changedOnly(payload, sel); if (!Object.keys(payload).length) { d(Ad.msg('Rien n\'a changé')); return; } }
      if (kind === 'building' && !sel?.id && scope === 'types') payload.is_type = true;
      const r = sel?.id ? await api(`/admin/content/${url}/${sel.id}`, payload, 'PUT') : await api(`/admin/content/${url}`, payload, 'POST');
      d(Ad.ok('Enregistré')); setDirty(false); list(); await open(r.id, true);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const inherit = async k => { try { await api(`/admin/content/${url}/${sel.id}`, { inherit: [k] }, 'PUT'); d(Ad.ok('Valeur du type rétablie')); await open(sel.id, true); } catch (e) { d(Ad.msg(e.message)); } };
  const placeIt = async () => { try { const r = await api('/admin/structures/place', { typeId: sel.id, mapId: Number(place.mapId), x: Number(place.x), y: Number(place.y), ...(place.name.trim() ? { name: place.name.trim() } : {}), ...(place.race ? { race: place.race } : {}) }, 'POST');
    d(Ad.ok('Structure posée')); setScope('placed'); list(); await open(r.id, true); } catch (e) { d(Ad.msg(e.message)); } };
  const remove = async () => { if (!confirmDel(`« ${sel.name ?? sel.id} »`)) return; try { await api(kind === 'building' && !isTypeRow(sel) ? `/admin/structures/${sel.id}` : `/admin/content/${url}/${sel.id}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); setSel(null); setDraft(null); setDirty(false); list(); } catch (e) { d(Ad.msg(e.message)); } };
  const newOne = () => { if (!leave()) return; const o = kind === 'building' ? { is_type: true } : {}; for (const [k, , t] of FIELDS[kind]) o[k] = t === 'check' ? k === 'visible' : ''; if (kind === 'building') { o.activationGroups = []; o.activations = []; } setSel(null); setDraft(o); setTab('data'); setDirty(false); };
  const F = FIELDS[kind], set = (k, v) => { setDraft({ ...draft, [k]: v }); setDirty(true); };
  const view = (rows ?? []).filter(r => matches(q, r.name, r.key, r.kind, r.id, r.type_name) && (kind !== 'building' || isTypeRow(r) === (scope === 'types')));
  const hint = k => inst && (sel.overrides?.includes(k) ? <button className="sm indiv" title="Valeur individuelle : revenir à celle du type" onClick={() => inherit(k)}>individuel ↺</button>
    : <small className="fromtype">type : {sel.type?.[k] == null || sel.type?.[k] === '' ? '—' : typeof sel.type[k] === 'object' ? 'réglé' : String(sel.type[k])}</small>);
  return <section className="split">
    <div className="listpane apanel">
      {kind === 'building' && <div className="tabs">{[['types', 'Types'], ['placed', 'Sur les cartes']].map(([k, l]) => <button key={k} className={scope === k ? 'on' : ''} onClick={() => { if (leave()) { setScope(k); setSel(null); setDraft(null); setDirty(false); } }}>{l}</button>)}</div>}
      <div className="headrow"><Search value={q} onChange={setQ} />{(kind !== 'building' || scope === 'types') && <button className="sm" onClick={newOne}><Plus size={14} /> Nouveau</button>}</div>
      <small className="count">{rows ? `${view.length} / ${rows.length}` : 'Chargement…'}</small>
      <div className="list">{view.map(r => <button key={r.id} className={`item row2${sel?.id === r.id ? ' on' : ''}`} onClick={() => open(r.id)}><b>{r.name ?? r.key ?? r.id}</b><small>{kind === 'building' && scope === 'placed' ? `${r.type_name ?? r.kind ?? ''}${r.owner ? ` · ${r.owner}` : ''} · ${r.map_id != null ? `monde ${r.map_id} (${r.coord_x}, ${r.coord_y})` : 'détruite'}` : `${r.slot ?? r.kind ?? r.rarity ?? ''} ${r.owner ? `· ${r.owner}` : ''}`} · n°{r.id}</small></button>)}
        {rows && !view.length && <Empty>Aucun résultat.</Empty>}</div>
    </div>
    <div className="detailpane">
      {!draft && <div className="apanel"><Empty>Sélectionnez un élément dans la liste ou créez-en un nouveau.</Empty></div>}
      {draft && <div className="editor apanel">
        <div className="headrow"><h3>{sel?.id ? (sel.name ?? `n°${sel.id}`) : kind === 'building' ? 'Nouveau type de structure' : 'Nouvel élément'}</h3>{dirty && <span className="dirty">non enregistré</span>}</div>
        {inst && <p className="note">Structure du type « {sel.type?.name} » : chaque valeur suit le type, sauf celles marquées « individuel » (toute valeur modifiée ici le devient).
          {Object.keys(sel.own_data ?? {}).length > 0 && <> Données propres : {Object.keys(sel.own_data).join(', ')} <button className="sm indiv" onClick={() => inherit('data')}>↺</button></>}</p>}
        {kind === 'building' && sel?.is_type && <div className="bldextras"><h5>Poser une structure de ce type</h5><div className="row add">
          <select aria-label="Monde" value={place.mapId} onChange={e => setPlace({ ...place, mapId: e.target.value })}>{(cat.maps ?? []).map(m => <option key={m.id} value={m.id}>Monde {m.id} ({m.width} × {m.height})</option>)}</select>
          <input type="number" min="0" className="nb" placeholder="x" value={place.x} onChange={e => setPlace({ ...place, x: e.target.value })} /><input type="number" min="0" className="nb" placeholder="y" value={place.y} onChange={e => setPlace({ ...place, y: e.target.value })} />
          <input placeholder={`Nom (défaut : ${sel.name})`} value={place.name} onChange={e => setPlace({ ...place, name: e.target.value })} />
          {sel.kind === 'capital' && <select aria-label="Race" value={place.race} onChange={e => setPlace({ ...place, race: e.target.value })}><option value="">Race…</option><option value="human">Hommes</option><option value="demon">Démons</option><option value="angel">Anges</option></select>}
          <button className="sm primary" disabled={place.x === '' || place.y === ''} onClick={placeIt}><Plus size={14} /> Poser</button></div>
          <p className="note">Les structures posées suivent ce type ; chacune peut ensuite préciser son nom, son apparence, sa race et n'importe quel réglage.</p></div>}
        {sel?.id && <div className="tabs">{['data', 'rules'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'data' ? 'Caractéristiques' : 'Règles transverses'}</button>)}</div>}
        {tab === 'data' && <div className="form">{F.map(([k, label, t]) =>
          t === 'check' ? <label key={k} className="sm check"><input type="checkbox" checked={!!draft[k]} onChange={e => set(k, e.target.checked)} /> {label} {hint(k)}</label>
            : t === 'opts' ? <div key={k} className="cell"><small>{label} {hint(k)}</small><select value={draft[k] ?? ''} onChange={e => set(k, e.target.value)}>{F.find(f => f[0] === k)[3].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
            : t === 'json' ? <div key={k} className="cell span-all"><small>{label} {hint(k)}</small><textarea className="mono" rows="4" value={typeof draft[k] === 'string' ? draft[k] : jsonText(draft[k] ?? null)} onChange={e => set(k, e.target.value)} /></div>
              : <div key={k} className="cell"><small>{label} {k !== 'name' && hint(k)}</small><input type={t === 'number' ? 'number' : 'text'} value={draft[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>)}</div>}
        {tab === 'data' && kind === 'building' && <BuildingExtras draft={draft} set={set} resources={cat.resources ?? []} />}
        {tab === 'data' && kind === 'building' && <ActivationElements list={draft.activations} set={v => set('activations', v)} cat={cat} />}
        {tab === 'data' && kind === 'building' && <ActivationEditor groups={draft.activationGroups} set={v => set('activationGroups', v)} cat={cat} title="Conditions supplémentaires (facultatif)" note="Exigées en plus de l'élément choisi (ex. rang minimum, sort connu). Il suffit d'une option ; dans une option, tout ce qui est renseigné est exigé. Sans élément d'activation, ces conditions activent seules la structure (sans durée) ; porte sans monde : conditions pour la franchir." />}
        {tab === 'data' && kind === 'building' && sel?.id && <BuildingSpells id={sel.id} />}
        {tab === 'data' && kind === 'building' && sel?.id && <div className="bldextras"><h5>Réapparition (cette structure)</h5>
          {sel.destroyed_at && <p className="note">Détruite le {new Date(sel.destroyed_at).toLocaleString('fr-FR')}{sel.respawn_blockers?.length ? ` — bloquée : ${sel.respawn_blockers.join(', ')}` : ''}.</p>}
          <RespawnPanel key={sel.id} kind="building" monster={sel} cats={cat} onSaved={() => open(sel.id, true)} /></div>}
        {tab === 'rules' && sel?.id && <div><RuleForms kind={kind} id={sel.id} onSaved={() => open(sel.id, true)} /><RulesList kind={kind} id={sel.id} extra={sel} onSaved={() => open(sel.id, true)} /></div>}
        {sel?.position && <p className="note">Position sur carte : {sel.position.map_id}:{sel.position.coord_x},{sel.position.coord_y}</p>}
        <div className="actions sticky">
          {sel?.id && <button className="danger" onClick={remove}><Trash2 size={14} /> Supprimer</button>}
          <span className="grow" />
          <button className="primary" onClick={save}><Save size={14} /> {sel?.id ? 'Enregistrer' : 'Créer'}</button>
        </div>
      </div>}
    </div>
  </section>;
}
