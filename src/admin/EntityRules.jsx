import { useState } from 'react'; import { api } from '../lib/api';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { URL_KIND } from './entityFields.js';
/** Éditeur des règles transverses d'une entité : coûts, plafonds (caps), modificateurs bonus/malus & effets. */
export function RuleForms({ kind, id, onSaved }) {
  const d = useDispatch(), [cost, setCost] = useState({ resource: '', qty: '' }), [cap, setCap] = useState({ scope: 'global', value: '' }), [mod, setMod] = useState({ stat: '', value: '', is_percent: false });
  const base = `/admin/content/${URL_KIND[kind]}/${id}`;
  const run = f => async () => { try { await f(); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  const in2 = (v, set, ph, type) => <input placeholder={ph} type={type} value={v} onChange={e => set(e.target.value)} />;
  return <div className="rules">
    <div className="rulebox"><h4>Coût en ressources</h4>
      <div className="row">{in2(cost.resource, r => setCost({ ...cost, resource: r }), 'ressource (ex: granit)')}
        {in2(cost.qty, q => setCost({ ...cost, qty: q }), 'qté', 'number')}
        <button onClick={run(() => api(`${base}/costs`, { resource: cost.resource, qty: +cost.qty }, 'POST'))}>+</button></div></div>
    <div className="rulebox"><h4>Plafonds (instances simultanées)</h4>
      <div className="row">
        <select value={cap.scope} onChange={e => setCap({ ...cap, scope: e.target.value })}>
          {['global', 'per_player', 'per_zone'].map(s => <option key={s}>{s}</option>)}
        </select>
        {in2(cap.value, v => setCap({ ...cap, value: v }), 'max', 'number')}
        <button onClick={run(() => api(`${base}/caps`, { scope: cap.scope, value: +cap.value }, 'POST'))}>+</button></div></div>
    <div className="rulebox"><h4>Modificateurs (bonus/malus, effets actifs/passifs)</h4>
      <div className="row">{in2(mod.stat, s => setMod({ ...mod, stat: s }), 'stat (ex: defense)')}
        {in2(mod.value, v => setMod({ ...mod, value: v }), 'valeur', 'number')}
        <label className="sm"><input type="checkbox" checked={mod.is_percent} onChange={e => setMod({ ...mod, is_percent: e.target.checked })} /> %</label>
        <button onClick={run(() => api(`${base}/modifiers`, { stat: mod.stat, value: +mod.value, is_percent: mod.is_percent }, 'POST'))}>+</button></div></div>
  </div>;
}
/** Liste des règles existantes (jointes au détail de l'entité) avec suppression. */
export function RulesList({ kind, id, extra, onSaved }) {
  const d = useDispatch(), base = `/admin/content/${URL_KIND[kind]}/${id}`;
  const del = path => async () => { try { await api(`${base}${path}`, undefined, 'DELETE'); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  const none = !extra.costs?.length && !extra.caps?.length && !extra.modifiers?.length;
  return <div className="ruleslist">
    {extra.costs?.length > 0 && <p><b>Coûts</b> : {extra.costs.map(c => <span key={c.resource} className="tag">{c.resource} ×{c.qty} <button onClick={() => del(`/costs/${encodeURIComponent(c.resource)}`)}>×</button></span>)}</p>}
    {extra.caps?.length > 0 && <p><b>Caps</b> : {extra.caps.map(c => <span key={c.scope} className="tag">{c.scope} ≤ {c.value} <button onClick={() => del(`/caps/${c.scope}`)}>×</button></span>)}</p>}
    {extra.modifiers?.length > 0 && <p><b>Modificateurs</b> : {extra.modifiers.map(m => <span key={m.id} className="tag">{m.stat} {m.is_percent ? '+' : ''}{m.value}{m.is_percent ? '%' : ''}{m.effect_key ? ` · ${m.effect_key}` : ''} <button onClick={() => del(`/modifiers/${m.id}`)}>×</button></span>)}</p>}
    {none && <p className="note">Aucune règle transverse définie.</p>}
  </div>;
}
