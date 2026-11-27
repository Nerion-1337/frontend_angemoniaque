import { Fragment, useEffect, useState } from 'react'; import { api } from '../lib/api';
import XpRank from './XpRank.jsx'; import CombatXp from './CombatXp.jsx'; import { COMBAT_KEYS, rankCombatValue } from './combatXp.js';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
import { FIELDS, jsonOr, jsonText } from './entityFields.js';
import { confirmDel } from './ui.jsx'; import { RaceRules, rulesDraft, rulesBody, rulesLabel } from './raceRules.jsx'; import StartKit from './StartKit.jsx'; import RankReq from './RankReq.jsx'; import { reqSummary } from './rankReq.js'; import { kitSummary, kitDraft } from './startKit.js';
/** Races (stats de base) + arbre des rangs : paliers d'évolution, prérequis, multiplicateurs de caractéristiques. */
export default function Races() {
  const d = useDispatch(), [cat, setCat] = useState(null), [kitFor, setKitFor] = useState(null), [reqFor, setReqFor] = useState(null), maps = cat?.maps ?? [], [races, setRaces] = useState(null), [sel, setSel] = useState(null), [raceDraft, setRaceDraft] = useState(null), [rank, setRank] = useState(null);
  const [gen, setGen] = useState(null);   // valeurs générales (XP de combat / entraînement) : indication sur les rangs
  useEffect(() => { api("/admin/content/combat-xp").then(setGen).catch(() => {}); }, []);
  const load = () => api('/admin/content/races').then(setRaces).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, []);
  useEffect(() => { api('/admin/catalog').then(setCat).catch(() => {}); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader (crash unmount « destroy is not a function »)
  const openRace = r => { setSel(r.key); setRaceDraft({ id: r.id, key: r.key, name: r.name, color: r.color ?? '', active: r.active, base_stats: jsonText(r.base_stats ?? null), ...rulesDraft(r) }); };
  const newRace = () => { setSel(null); setRaceDraft({ id: null, key: '', name: '', color: '', active: true, base_stats: '', ...rulesDraft(null) }); };
  const delRace = async r => { if (!confirmDel(`la race « ${r.name} » et ses paliers`)) return; try { await api(`/admin/content/races/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Race supprimée')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const saveRace = async () => {
    const body = { key: raceDraft.key, name: raceDraft.name, color: raceDraft.color || undefined, active: raceDraft.active,
      base_stats: raceDraft.base_stats ? jsonOr(raceDraft.base_stats, undefined) : null, ...rulesBody(raceDraft) };
    if (body.base_stats === undefined && raceDraft.base_stats) { d(Ad.msg('JSON invalide : base_stats')); return; }
    try { await api(raceDraft.id ? `/admin/content/races/${raceDraft.id}` : '/admin/content/races', body, raceDraft.id ? 'PUT' : 'POST');
      d(Ad.ok('Enregistré')); setRaceDraft(null); load(); } catch (e) { d(Ad.msg(e.message)); }
  };
  const openRank = (r, s) => setRank({ id: s?.id ?? null, values: { race: s?.race ?? r.key, name: s?.name ?? '', current_rank: s?.current_rank ?? 1, max_population_percent: s?.max_population_percent ?? 100, gain_xp_hour: s?.gain_xp_hour ?? 1, hp_max: s?.hp_max, recovery: s?.recovery, see: s?.see, strength: s?.strength, agility: s?.agility, energy_max: s?.energy_max, divine_energy_max: s?.divine_energy_max, prereq_xp: s?.prereq_xp, xp_hit_player: s?.xp_hit_player ?? '', xp_dodge: s?.xp_dodge ?? '', train_energy: s?.train_energy ?? '', train_xp: s?.train_xp ?? '', multipliers: jsonText(s?.multipliers ?? null), evolution: s?.evolution ?? '' } });
  const saveRank = async () => {
    const v = rank.values, body = {};
    for (const [k, , t] of FIELDS.rank) {
      if (COMBAT_KEYS.includes(k)) { if (rank.id || v[k] !== '') body[k] = rankCombatValue(v[k]); continue; }   // vide = valeur générale (null)
      if (v[k] === undefined || v[k] === '') continue;
      if (k === 'multipliers') { const m = jsonOr(v[k], undefined); if (m === undefined && v[k]) { d(Ad.msg('JSON invalide : multipliers')); return; } if (v[k]) body.multipliers = m; continue; }
      body[k] = t === 'number' ? Number(v[k]) : v[k];
    }
    try { await api(rank.id ? `/admin/content/ranks/${rank.id}` : '/admin/content/ranks', body, rank.id ? 'PUT' : 'POST');
      d(Ad.ok('Enregistré')); setRank(null); load(); } catch (e) { d(Ad.msg(e.message)); }
  };
  const delRank = async s => { if (!confirmDel(`le palier « ${s.name} »`)) return; try { await api(`/admin/content/ranks/${s.id}`, undefined, 'DELETE'); d(Ad.ok('Palier supprimé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <section>
    <XpRank />
    <CombatXp onSaved={setGen} />
    <div className="headrow"><span className="grow" /><button className="sm" onClick={newRace}>+ Race</button></div>
    {races?.map(r => <div key={r.id} className="race apanel">
      <div className="headrow"><b>{r.name}</b><small>({r.key}){r.active ? '' : ' · inactive'} · {rulesLabel(r)}</small>
        <button className={`sm${kitFor === r.id ? ' on' : ''}`} title={kitSummary(kitDraft(r.start_kit))} onClick={() => setKitFor(kitFor === r.id ? null : r.id)}>Départ</button>
        <button className="sm" onClick={() => openRace(r)}>✎</button>
        <button className="sm danger" onClick={() => delRace(r)}>×</button></div>
      {kitFor === r.id && <StartKit race={r} catalog={cat} onSaved={load} />}
      {raceDraft?.id === r.id && <div className="form">
        {FIELDS.race.map(([k, label, t]) => t === 'check'
          ? <label key={k} className="sm check"><input type="checkbox" checked={!!raceDraft[k]} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.checked })} /> {label}</label>
          : t === 'json'
            ? <div key={k} className="cell span-all"><small>{label}</small><textarea rows="4" className="mono" value={raceDraft[k] ?? ''} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.value })} /></div>
            : <div key={k} className="cell"><small>{label}</small><input value={raceDraft[k] ?? ''} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.value })} /></div>)}
        <RaceRules draft={raceDraft} set={setRaceDraft} maps={maps} />
        <div className="row"><button onClick={saveRace}>Enregistrer</button>
          <button className="sm" onClick={() => setRaceDraft(null)}>Annuler</button></div>
      </div>}
      <div className="ranks">{r.ranks.map(s => <Fragment key={s.id}><div className="rank">
        <small>Palier {s.current_rank}</small><b>{s.name}</b>
        <small>{s.hp_max} PV · {s.strength} F · {s.agility} A{s.prereq_xp != null ? ` · prérequis ${s.prereq_xp} XP` : ''}{s.multipliers && Object.keys(s.multipliers).length ? ` · ×${JSON.stringify(s.multipliers)}` : ''}{reqSummary(s.requirements) ? ` · passage : ${reqSummary(s.requirements)}` : ''}</small>
        <span className="rankbtns"><button className={`sm${reqFor === s.id ? ' on' : ''}`} title="Conditions pour passer à ce rang" onClick={() => setReqFor(reqFor === s.id ? null : s.id)}>Passage</button>
        <button className="sm" onClick={() => openRank(r, s)}>✎</button>
        <button className="sm danger" onClick={() => delRank(s)}>×</button></span>
      </div>{reqFor === s.id && <RankReq rank={s} catalog={cat} onSaved={load} />}</Fragment>)}
        <button className="sm" onClick={() => openRank(r, null)}>+ Palier</button>
      </div>
    </div>)}
    {raceDraft && !raceDraft.id && <div className="editor">
      <h3>Nouvelle race</h3>
      <div className="form">{FIELDS.race.map(([k, label, t]) => t === 'check'
        ? <label key={k} className="sm check"><input type="checkbox" checked={!!raceDraft[k]} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.checked })} /> {label}</label>
        : t === 'json'
          ? <div key={k} className="cell span-all"><small>{label}</small><textarea rows="4" className="mono" value={raceDraft[k] ?? ''} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.value })} /></div>
          : <div key={k} className="cell"><small>{label}</small><input value={raceDraft[k] ?? ''} onChange={e => setRaceDraft({ ...raceDraft, [k]: e.target.value })} /></div>)}
        <RaceRules draft={raceDraft} set={setRaceDraft} maps={maps} />
        <div className="row"><button onClick={saveRace}>Créer</button>
          <button className="sm" onClick={() => setRaceDraft(null)}>Annuler</button></div>
      </div>
    </div>}
    {rank && <div className="editor">
      <h3>{rank.id ? `Rang « ${rank.values.name} »` : `Nouveau palier (${rank.values.race})`}</h3>
      <div className="form">{FIELDS.rank.map(([k, label, t]) =>
        t === 'json' ? <div key={k} className="cell span-all"><small>{label}</small><textarea rows="4" className="mono" value={rank.values[k] ?? ''} onChange={e => setRank({ ...rank, values: { ...rank.values, [k]: e.target.value } })} /></div>
          : k === 'race'
            ? <div key={k} className="cell"><small>{label}</small><select value={rank.values[k] ?? ''} onChange={e => setRank({ ...rank, values: { ...rank.values, [k]: e.target.value } })}>{races.map(x => <option key={x.key} value={x.key}>{x.key}</option>)}</select></div>
            : <div key={k} className="cell"><small>{label}</small><input type={t === 'number' ? 'number' : 'text'} placeholder={COMBAT_KEYS.includes(k) && gen ? `générale : ${gen[k]}` : undefined} value={rank.values[k] ?? ''} onChange={e => setRank({ ...rank, values: { ...rank.values, [k]: e.target.value } })} disabled={!rank.id && false} /></div>)}
        <div className="row"><button onClick={saveRank}>{rank.id ? 'Enregistrer' : 'Créer'}</button>
          <button className="sm" onClick={() => setRank(null)}>Annuler</button></div>
      </div>
    </div>}
  </section>;
}
