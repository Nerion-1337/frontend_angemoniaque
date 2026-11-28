// Section admin « Règles générales » (migration 48) : perte à la mort, bonus des portes ouvertes par camp.
import { useEffect, useState } from 'react'; import { useDispatch } from 'react-redux'; import { Save } from 'lucide-react';
import { api } from '../lib/api.js'; import { Ad } from '../store/admin.js'; import { STAT_LABEL } from './faithPact.js'; import { FACTION_FR, rulesBody } from './rules.js';
export default function RulesTab() {
  const d = useDispatch(), [r, setR] = useState(null);
  useEffect(() => { api('/admin/content/rules').then(setR).catch(e => d(Ad.msg(e.message))); }, []);   // corps de bloc
  if (!r) return <p className="note">Chargement…</p>;
  const save = async () => { try { await api('/admin/content/rules', rulesBody(r), 'PUT'); d(Ad.ok('Règles enregistrées')); } catch (e) { d(Ad.msg(e.message)); } };
  const setB = (f, k, v) => setR({ ...r, gate_bonus: { ...r.gate_bonus, [f]: { ...(r.gate_bonus[f] ?? {}), [k]: v } } });
  return <section>
    <div className="apanel"><h4>Mort</h4>
      <div className="form"><div className="cell"><small>Perte à la mort : % de l'XP non dépensée et de l'or porté</small>
        <input type="number" min="0" max="100" value={r.death_loss_pct} onChange={e => setR({ ...r, death_loss_pct: e.target.value })} /></div></div>
      <p className="note">Le joueur mort arrive au Royaume des Morts, autour de la porte centrale qui le ramène dans son monde.</p></div>
    {['demon', 'angel'].map(f => <div key={f} className="apanel"><h4>Bonus des portes ouvertes — {FACTION_FR[f]}</h4>
      <p className="note">Tant que la porte des {FACTION_FR[f]} ET au moins une porte des Hommes qui mène chez eux sont activées, chaque {f === 'demon' ? 'Démon' : 'Ange'} et chaque Humain
        en pacte avec l'un d'eux reçoit ces bonus (0 = aucun). Retirés dès qu'un des deux côtés se ferme.</p>
      <div className="form">{r.stats.map(k => <div key={k} className="cell"><small>{STAT_LABEL[k] ?? k}</small>
        <input type="number" value={r.gate_bonus?.[f]?.[k] ?? 0} onChange={e => setB(f, k, e.target.value)} /></div>)}</div></div>)}
    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer</button></div>
  </section>;
}
