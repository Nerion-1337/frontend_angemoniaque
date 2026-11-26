import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { Plus, Save, Trash2 } from 'lucide-react';
import { FIELDS, jsonOr, jsonText, URL_KIND } from './entityFields.js';
import { RuleForms, RulesList } from './EntityRules.jsx';
import { BuildingExtras, BuildingSpells, ActivationEditor } from './BuildingExtras.jsx'; import { buildingBody, buildingDraft } from './building.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx';
/** Éditeur générique d'entités (bâtiments) : liste filtrable à gauche + fiche à droite (caractéristiques, règles transverses). */
export default function Entities({ kind }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [sel, setSel] = useState(null), [draft, setDraft] = useState(null), [tab, setTab] = useState('data'), [q, setQ] = useState(''), [dirty, setDirty] = useState(false);
  const url = URL_KIND[kind], [cat, setCat] = useState({});
  useEffect(() => { if (kind === 'building') api('/admin/catalog').then(setCat).catch(() => {}); }, [kind]);
  const list = () => api(`/admin/content/${url}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { list(); }, [kind]);   // corps de bloc : l'effet ne retourne jamais la Promise du loader (crash unmount « destroy is not a function »)
  const leave = () => !dirty || window.confirm('Modifications non enregistrées : les abandonner ?');
  const open = async (id, force) => { if (!force && !leave()) return; const det = await api(`/admin/content/${url}/${id}`).catch(e => { d(Ad.msg(e.message)); return null; }); if (!det) return; setSel(det); setDraft(kind === 'building' ? buildingDraft(det) : { ...det }); setTab('data'); setDirty(false); };
  const save = async () => {
    const body = {};
    for (const [k, , t] of FIELDS[kind]) {
      if (t === 'check') { body[k] = !!draft[k]; continue; }
      if (draft[k] === undefined || draft[k] === '') continue;
      if (t === 'json') { const v = jsonOr(draft[k], undefined); if (v === undefined) { d(Ad.msg(`JSON invalide : ${k}`)); return; } body[k] = v; }
      else if (t === 'number') body[k] = Number(draft[k]);
      else body[k] = String(draft[k]);
    }
    try {
      const payload = kind === 'building' ? buildingBody(body, draft) : body;
      const r = sel?.id ? await api(`/admin/content/${url}/${sel.id}`, payload, 'PUT') : await api(`/admin/content/${url}`, payload, 'POST');
      d(Ad.ok('Enregistré')); setDirty(false); list(); await open(r.id, true);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const remove = async () => { if (!confirmDel(`« ${sel.name ?? sel.id} »`)) return; try { await api(`/admin/content/${url}/${sel.id}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); setSel(null); setDraft(null); setDirty(false); list(); } catch (e) { d(Ad.msg(e.message)); } };
  const newOne = () => { if (!leave()) return; const o = {}; for (const [k, , t] of FIELDS[kind]) o[k] = t === 'check' ? false : ''; setSel(null); setDraft(o); setTab('data'); setDirty(false); };
  const F = FIELDS[kind], set = (k, v) => { setDraft({ ...draft, [k]: v }); setDirty(true); };
  const view = (rows ?? []).filter(r => matches(q, r.name, r.key, r.kind, r.id));
  return <section className="split">
    <div className="listpane apanel">
      <div className="headrow"><Search value={q} onChange={setQ} /><button className="sm" onClick={newOne}><Plus size={14} /> Nouveau</button></div>
      <small className="count">{rows ? `${view.length} / ${rows.length}` : 'Chargement…'}</small>
      <div className="list">{view.map(r => <button key={r.id} className={`item row2${sel?.id === r.id ? ' on' : ''}`} onClick={() => open(r.id)}><b>{r.name ?? r.key ?? r.id}</b><small>{r.slot ?? r.kind ?? r.rarity ?? ''} {r.owner ? `· ${r.owner}` : ''} · n°{r.id}</small></button>)}
        {rows && !view.length && <Empty>Aucun résultat.</Empty>}</div>
    </div>
    <div className="detailpane">
      {!draft && <div className="apanel"><Empty>Sélectionnez un élément dans la liste ou créez-en un nouveau.</Empty></div>}
      {draft && <div className="editor apanel">
        <div className="headrow"><h3>{sel?.id ? (sel.name ?? `n°${sel.id}`) : 'Nouvel élément'}</h3>{dirty && <span className="dirty">non enregistré</span>}</div>
        {sel?.id && <div className="tabs">{['data', 'rules'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'data' ? 'Caractéristiques' : 'Règles transverses'}</button>)}</div>}
        {tab === 'data' && <div className="form">{F.map(([k, label, t]) =>
          t === 'check' ? <label key={k} className="sm check"><input type="checkbox" checked={!!draft[k]} onChange={e => set(k, e.target.checked)} /> {label}</label>
            : t === 'json' ? <div key={k} className="cell span-all"><small>{label}</small><textarea className="mono" rows="4" value={typeof draft[k] === 'string' ? draft[k] : jsonText(draft[k] ?? null)} onChange={e => set(k, e.target.value)} /></div>
              : <div key={k} className="cell"><small>{label}</small><input type={t === 'number' ? 'number' : 'text'} value={draft[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>)}</div>}
        {tab === 'data' && kind === 'building' && <BuildingExtras draft={draft} set={set} resources={cat.resources ?? []} />}
        {tab === 'data' && kind === 'building' && <ActivationEditor groups={draft.activationGroups} set={v => set('activationGroups', v)} cat={cat} />}
        {tab === 'data' && kind === 'building' && sel?.id && <BuildingSpells id={sel.id} />}
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
