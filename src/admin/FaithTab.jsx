// Section admin « Foi » : gains horaires d'un dieu par tranche de fidèles, prières (nombre par période), bénédictions par
// caractéristique (valeur max, durée max, coût en énergie divine pour ce maximum ; le reste au prorata, arrondi au supérieur).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Save } from 'lucide-react';
import { Ad } from '../store/admin.js'; import { api } from '../lib/api.js';
import { STAT_LABEL, faithBody, blessingCost } from './faithPact.js';

export default function FaithTab() {
  const d = useDispatch(), [f, setF] = useState(null), [stats, setStats] = useState([]);
  const load = () => api('/admin/content/faith').then(x => { setStats(x.stats); setF({ ...x, blessings: Object.fromEntries(Object.entries(x.blessings).map(([k, b]) => [k, { ...b, on: true }])) }); }).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, []);
  if (!f) return <p className="note">Chargement…</p>;
  const u = (k, v) => setF({ ...f, [k]: v }), ub = (s, k, v) => setF({ ...f, blessings: { ...f.blessings, [s]: { max: 1, maxH: 1, cost: 0, ...f.blessings[s], [k]: v } } });
  const save = async () => { try { await api('/admin/content/faith', faithBody(f), 'PUT'); d(Ad.ok('Foi enregistrée')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const num = (k, label, min = 0, step = 1) => <div className="cell"><small>{label}</small><input type="number" min={min} step={step} value={f[k]} onChange={e => u(k, e.target.value)} /></div>;
  return <section>
    <p className="note">Un joueur devient fidèle d'un dieu de sa race (rang ≥ 5). Le dieu gagne de l'XP et de l'or chaque heure pour chaque tranche complète de fidèles ;
      il bénit ses fidèles (en réponse à une prière ou de lui-même) en choisissant la valeur et la durée, pour un coût en énergie divine proportionnel.</p>
    <div className="apanel"><h4>Gains du dieu et prières</h4><div className="form">
      {num('followersStep', 'Par tranche de … fidèles', 1)}{num('xpHour', 'XP par heure et par tranche')}{num('goldHour', 'Or par heure et par tranche')}
      {num('prayers', 'Prières par joueur (0 = aucune)')}{num('prayerPeriodH', 'Toutes les … heures', 1, 0.5)}</div></div>
    <div className="apanel"><h4>Bénédictions possibles</h4><small className="note">Cochez les caractéristiques qu'un dieu peut accorder. Le coût indiqué vaut pour la valeur et la durée maximales ;
      en dessous il est proportionnel, arrondi au supérieur (durée minimale : 1 h). PV / énergie max : augmente aussi les PV / l'énergie.</small>
      <div className="tablewrap"><table><thead><tr><th /><th>Caractéristique</th><th>Valeur max</th><th>Durée max (h)</th><th>Coût ÉD (au max)</th><th>Exemple : moitié valeur, 1 h</th></tr></thead><tbody>
        {stats.map(s => { const b = f.blessings[s], on = !!b?.on;
          return <tr key={s}><td><input type="checkbox" aria-label={`Accorder ${STAT_LABEL[s] ?? s}`} checked={on} onChange={e => ub(s, 'on', e.target.checked)} /></td><td>{STAT_LABEL[s] ?? s}</td>
            {['max', 'maxH', 'cost'].map(k => <td key={k}><input type="number" min={k === 'cost' ? 0 : 1} disabled={!on} value={b?.[k] ?? ''} onChange={e => ub(s, k, e.target.value)} style={{ width: '6em' }} /></td>)}
            <td>{on && Number(b.max) > 0 && Number(b.maxH) > 0 ? `+${Math.max(1, Math.round(b.max / 2))} · ${blessingCost({ max: +b.max, maxH: +b.maxH, cost: +b.cost }, Math.max(1, Math.round(b.max / 2)), 1)} ÉD` : '—'}</td></tr>; })}
      </tbody></table></div></div>
    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer</button></div>
  </section>;
}
