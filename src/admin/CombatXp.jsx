// Races & rangs : valeurs GÉNÉRALES de l'XP de combat et de l'entraînement (game_config.combat_xp, migration 47), appliquées à
// chaque race et chaque rang qui ne précise rien (champ vide sur le rang).
import { useEffect, useState } from 'react'; import { useDispatch } from 'react-redux';
import { Save, Swords } from 'lucide-react';
import { api } from '../lib/api'; import { Ad } from '../store/admin.js';
import { COMBAT_FIELDS, combatBody } from './combatXp.js';
export default function CombatXp({ onSaved }) {
  const d = useDispatch(), [v, setV] = useState(null);
  useEffect(() => { api('/admin/content/combat-xp').then(setV).catch(e => d(Ad.msg(e.message))); }, []);   // corps de bloc
  const save = async () => { try { const r = await api('/admin/content/combat-xp', combatBody(v), 'PUT'); setV(r); onSaved?.(r); d(Ad.ok('Valeurs générales enregistrées')); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="race apanel xprank">
    <div className="headrow"><Swords size={16} /><b>XP de combat et entraînement (valeurs générales)</b><span className="grow" /></div>
    <p className="note">S'appliquent à chaque race et chaque rang qui ne précise rien (champ laissé vide sur le rang). Un rang qui précise une valeur l'emporte.
      Entraînement : XP 0 = pas d'entraînement.</p>
    {v && <div className="form">{COMBAT_FIELDS.map(([k, l]) => <div key={k} className="cell"><small>{l}</small>
      <input type="number" min="0" value={v[k] ?? 0} onChange={e => setV({ ...v, [k]: e.target.value })} /></div>)}</div>}
    <div className="actions"><span className="grow" /><button className="primary" disabled={!v} onClick={save}><Save size={14} /> Enregistrer</button></div>
  </div>;
}
