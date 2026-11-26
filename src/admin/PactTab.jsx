// Section admin « Pacte » : caractéristiques transférées, compositions (XP / or par heure pour l'Ange / le Démon, % transféré à
// l'Humain, durée du bonus, délai avant réactivation), nombre de pactes simultanés par rang (toutes races).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Save, Trash2 } from 'lucide-react';
import { Ad } from '../store/admin.js'; import { api } from '../lib/api.js'; import { confirmDel, Empty } from './ui.jsx';
import { RACE_LABEL } from './players.js';
import { STAT_LABEL, tierBody, tierExample } from './faithPact.js';
const FIELDS = [['name', 'Nom (vu par l\'Humain)', 'text'], ['xp_hour', 'XP / h (Ange·Démon)'], ['gold_hour', 'Or / h (Ange·Démon)'], ['percent', '% transféré'], ['duration_h', 'Durée du bonus (h)'], ['cooldown_h', 'Délai avant réactivation (h)']];
const blank = { name: '', xp_hour: 1, gold_hour: 1, percent: 10, duration_h: 1, cooldown_h: 0 };

export default function PactTab() {
  const d = useDispatch(), [p, setP] = useState(null), [tiers, setTiers] = useState([]), [nw, setNw] = useState(blank), [lim, setLim] = useState([]);
  const err = e => d(Ad.msg(e.message));
  const load = () => { api('/admin/content/pact').then(x => { setP(x); setTiers(x.tiers); }).catch(err); api('/admin/content/pact-limits').then(setLim).catch(err); };
  useEffect(() => { load(); }, []);
  if (!p) return <p className="note">Chargement…</p>;
  const toggle = s => setP({ ...p, stats: p.stats.includes(s) ? p.stats.filter(x => x !== s) : [...p.stats, s] });
  const ok = m => () => { d(Ad.ok(m)); load(); };
  const saveStats = () => api('/admin/content/pact', { stats: p.stats }, 'PUT').then(ok('Caractéristiques enregistrées')).catch(err);
  const saveTier = t => api(`/admin/content/pact-tiers/${t.id}`, tierBody(t), 'PUT').then(ok(`« ${t.name} » enregistrée`)).catch(err);
  const delTier = t => confirmDel(`la composition « ${t.name} » (les pactes qui l'utilisent devront en choisir une autre)`) && api(`/admin/content/pact-tiers/${t.id}`, undefined, 'DELETE').then(ok('Composition supprimée')).catch(err);
  const addTier = () => api('/admin/content/pact-tiers', tierBody(nw), 'POST').then(() => { setNw(blank); ok('Composition ajoutée')(); }).catch(err);
  const saveLim = r => api(`/admin/content/pact-limits/${r.id}`, { maxPacts: r.max_pacts === '' || r.max_pacts == null ? null : Math.max(0, Math.trunc(Number(r.max_pacts)) || 0) }, 'PUT').then(ok(`${r.name} : enregistré`)).catch(err);
  const ut = (id, k, v) => setTiers(tiers.map(t => (t.id === id ? { ...t, [k]: v } : t)));
  const input = (t, k, type, set) => <input type={type ?? 'number'} min="0" step={k.endsWith('_h') ? '0.5' : '1'} value={t[k] ?? ''} onChange={e => set(k, e.target.value)} style={{ width: type === 'text' ? '10em' : '6em' }} />;
  return <section>
    <p className="note">Un pacte lie un Humain à un Ange ou un Démon. L'Ange / le Démon choisit pour chaque pacte une composition : elle lui rapporte de l'XP et de l'or chaque heure ;
      quand l'Humain l'active, le pourcentage de chaque caractéristique cochée (arrondi au supérieur) passe de l'Ange / Démon à l'Humain pendant la durée du bonus.
      Impossible si les PV de l'Ange / Démon ne suffisent pas. L'Humain ne voit que le nom de la composition.</p>
    <div className="apanel"><h4>Caractéristiques transférées</h4><div className="chips">{p.all.map(s => <label key={s} className={`chip${p.stats.includes(s) ? ' on' : ''}`}>
      <input type="checkbox" checked={p.stats.includes(s)} onChange={() => toggle(s)} /> {STAT_LABEL[s] ?? s}</label>)}</div>
      <div className="actions"><span className="grow" /><button className="primary sm" onClick={saveStats}><Save size={13} /> Enregistrer</button></div></div>
    <div className="apanel"><h4>Compositions</h4>
      <div className="tablewrap"><table><thead><tr>{FIELDS.map(([k, l]) => <th key={k}>{l}</th>)}<th>Exemple</th><th /></tr></thead><tbody>
        {tiers.map(t => <tr key={t.id}>{FIELDS.map(([k, , ty]) => <td key={k}>{input(t, k, ty, (kk, v) => ut(t.id, kk, v))}</td>)}<td><small>{tierExample(t)}</small></td>
          <td className="row"><button className="sm primary" title="Enregistrer" onClick={() => saveTier(t)}><Save size={13} /></button><button className="sm danger" title="Supprimer" onClick={() => delTier(t)}><Trash2 size={13} /></button></td></tr>)}
        <tr>{FIELDS.map(([k, , ty]) => <td key={k}>{input(nw, k, ty, (kk, v) => setNw({ ...nw, [kk]: v }))}</td>)}<td><small>{tierExample(nw)}</small></td>
          <td><button className="sm" disabled={!nw.name.trim()} onClick={addTier}><Plus size={13} /> Ajouter</button></td></tr>
      </tbody></table></div>{!tiers.length && <Empty>Aucune composition : les pactes ne peuvent pas être activés.</Empty>}</div>
    <div className="apanel"><h4>Pactes simultanés par rang</h4><small className="note">Vide = règle par défaut (Humain 1 ; Ange / Démon 3, +1 par rang au-dessus de 2 ; autres 0).</small>
      <div className="tablewrap"><table><thead><tr><th>Race</th><th>Rang</th><th>Pactes max</th><th>Défaut</th><th /></tr></thead><tbody>
        {lim.map(r => <tr key={r.id}><td>{RACE_LABEL[r.race] ?? r.race}</td><td>{r.current_rank} · {r.name}</td>
          <td><input type="number" min="0" placeholder="défaut" value={r.max_pacts ?? ''} onChange={e => setLim(lim.map(x => (x.id === r.id ? { ...x, max_pacts: e.target.value } : x)))} style={{ width: '6em' }} /></td>
          <td><small>{r.default_max}</small></td><td><button className="sm primary" title="Enregistrer" onClick={() => saveLim(r)}><Save size={13} /></button></td></tr>)}
      </tbody></table></div></div>
  </section>;
}
