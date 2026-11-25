// Races & rangs : gain d'XP selon l'écart de rang entre le personnage et ce qu'il frappe (game_config.xp_rank_diff, migration 35).
import { useEffect, useState } from 'react'; import { useDispatch } from 'react-redux';
import { Plus, Save, TrendingUp } from 'lucide-react';
import { api } from '../lib/api'; import { Ad } from '../store/admin.js';
import { rowsOf, tableOf, diffLabel } from './xpRank.js';
export default function XpRank() {
  const d = useDispatch(), [rows, setRows] = useState(null);
  useEffect(() => { api('/admin/content/xp-rank').then(r => setRows(rowsOf(r.table))).catch(e => d(Ad.msg(e.message))); }, []);   // corps de bloc
  const set = (i, k, v) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const save = async () => {
    const table = tableOf(rows); if (!Object.keys(table).length) return d(Ad.msg('Au moins une ligne'));
    try { setRows(rowsOf((await api('/admin/content/xp-rank', { table }, 'PUT')).table)); d(Ad.ok('Gains d\'XP par écart de rang enregistrés')); } catch (e) { d(Ad.msg(e.message)); }
  };
  const next = rows?.length ? Math.max(...rows.map(r => Number(r.diff) || 0)) + 1 : 0;
  return <div className="race apanel xprank">
    <div className="headrow"><TrendingUp size={16} /><b>Gain d'XP selon l'écart de rang</b><span className="grow" /></div>
    <p className="note">Pourcentage de l'XP gagnée en frappant une cible (personnage ou monstre) selon son rang comparé à celui du personnage : XP d'un monstre tué,
      XP des armes à chaque coup porté, XP des sorts. Écart absent de la table : la ligne la plus proche s'applique. Sans cible (sort sur soi, parchemin) : 100 %.</p>
    {rows && <div className="xprows">{rows.map((r, i) => <div key={i} className="xprow">
      <label><small>Écart</small><input type="number" min="-99" max="99" value={r.diff} onChange={e => set(i, 'diff', e.target.value)} /></label>
      <span className="xplabel">{Number.isFinite(Number(r.diff)) && r.diff !== '' ? diffLabel(Number(r.diff)) : '—'}</span>
      <label><small>XP</small><input type="number" min="0" max="1000" value={r.pct} onChange={e => set(i, 'pct', e.target.value)} /> %</label>
      <button className="sm danger" aria-label="Retirer la ligne" onClick={() => setRows(rows.filter((_, j) => j !== i))}>×</button></div>)}</div>}
    <div className="actions"><button className="sm" onClick={() => setRows([...(rows ?? []), { diff: next, pct: 100 }])}><Plus size={14} /> Ligne</button><span className="grow" />
      <button className="primary" disabled={!rows} onClick={save}><Save size={14} /> Enregistrer</button></div>
  </div>;
}
