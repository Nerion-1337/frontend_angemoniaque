import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { FIELDS, jsonOr, jsonText, URL_KIND } from './entityFields.js';
import { RuleForms, RulesList } from './EntityRules.jsx';
/** Éditeur générique d'entités (monstres, objets, montures, bâtiments) : liste + fiche + règles transverses. */
export default function Entities({ kind }) {
  const d = useDispatch(), [rows, setRows] = useState(null), [sel, setSel] = useState(null), [draft, setDraft] = useState(null), [tab, setTab] = useState('data');
  const url = URL_KIND[kind];
  const list = () => api(`/admin/content/${url}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(list, [kind]);
  const open = async id => { const det = await api(`/admin/content/${url}/${id}`).catch(e => { d(Ad.msg(e.message)); return null; }); if (!det) return; setSel(det); setDraft({ ...det }); setTab('data'); };
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
      const r = sel?.id ? await api(`/admin/content/${url}/${sel.id}`, body, 'PUT') : await api(`/admin/content/${url}`, body, 'POST');
      d(Ad.msg('Enregistré')); list(); await open(r.id);
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const remove = async () => { try { await api(`/admin/content/${url}/${sel.id}`, undefined, 'DELETE'); setSel(null); setDraft(null); list(); } catch (e) { d(Ad.msg(e.message)); } };
  const newOne = () => { const o = {}; for (const [k, , t] of FIELDS[kind]) o[k] = t === 'check' ? false : ''; setSel(null); setDraft(o); };
  const TITLES = { monster: 'Monstres', item: 'Objets', mount: 'Montures', building: 'Bâtiments' };
  const F = FIELDS[kind], set = (k, v) => setDraft({ ...draft, [k]: v });
  return <section>
    <div className="headrow"><h2>{TITLES[kind]}</h2><button className="sm" onClick={newOne}>+ Nouveau</button></div>
    {rows && <div className="list">{rows.map(r => <button key={r.id} className={`item row2${sel?.id === r.id ? ' on' : ''}`} onClick={() => open(r.id)}><b>{r.name ?? r.key ?? r.id}</b><small>{r.slot ?? r.kind ?? r.rarity ?? ''} {r.owner ? `· ${r.owner}` : ''} · n°{r.id}</small></button>)}</div>}
    {draft && <div className="editor">
      {sel?.id && <div className="tabs">{['data', 'rules'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'data' ? 'Caractéristiques' : 'Règles transverses'}</button>)}</div>}
      {tab === 'data' && <div className="form">{F.map(([k, label, t]) =>
        t === 'check' ? <label key={k} className="sm"><input type="checkbox" checked={!!draft[k]} onChange={e => set(k, e.target.checked)} /> {label}</label>
          : t === 'json' ? <div key={k}><small>{label}</small><textarea rows="3" value={jsonText(draft[k] ?? null)} onChange={e => set(k, e.target.value)} /></div>
            : <div key={k} className="cell"><small>{label}</small><input type={t === 'number' ? 'number' : 'text'} value={draft[k] ?? ''} onChange={e => set(k, e.target.value)} /></div>)}</div>}
      {tab === 'rules' && sel?.id && <div><RuleForms kind={kind} id={sel.id} onSaved={() => open(sel.id)} /><RulesList kind={kind} id={sel.id} extra={sel} onSaved={() => open(sel.id)} /></div>}
      {sel?.id && <button className="danger sm" onClick={remove}>Supprimer</button>}
      <button onClick={save}>{sel?.id ? 'Enregistrer' : 'Créer'}</button>
      {sel?.position && <p className="note">Position sur carte : {sel.position.map_id}:{sel.position.coord_x},{sel.position.coord_y}</p>}
    </div>}
  </section>;
}
