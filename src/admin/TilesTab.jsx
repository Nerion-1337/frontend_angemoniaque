// Section admin « Cases » : types de case par monde — nom, description, coût d'énergie d'un pas,
// et sort appliqué EN CONTINU (bonus = +PV / malus = -PV, chaque heure passée sur la case).
// La géométrie des cartes (quel type sur quelle case) reste générée dans le code : on édite les types, pas les cases.
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { COLORS } from '../lib/energy.js';
import Pick from './Pick.jsx';
import { Empty } from './ui.jsx';
import { WORLD_LABEL, tileBody, hpPerHour, spellSummary } from './tiles.js';

const hex = c => `#${(c ?? 0x888888).toString(16).padStart(6, '0')}`;
export default function TilesTab() {
  const d = useDispatch();
  const [rows, setRows] = useState(null), [spells, setSpells] = useState([]), [world, setWorld] = useState(null);
  const [edit, setEdit] = useState(null), [f, setF] = useState(null);
  const load = () => api('/admin/content/tiles').then(r => { setRows(r); setWorld(w => w ?? r[0]?.map_id ?? null); }).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); api('/admin/content/spells').then(setSpells).catch(() => {}); }, []);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const worlds = [...new Map((rows ?? []).map(r => [r.map_id, r.map_name])).entries()];
  const view = (rows ?? []).filter(r => r.map_id === world);
  const open = r => { setEdit(r.kind); setF({ name: r.name, description: r.description ?? '', energyCost: r.energy_cost, divineEnergyCost: r.divine_energy_cost ?? 0, spellId: r.spell_id ?? '', spellMode: r.spell_mode ?? 'malus' }); };
  const save = async () => {
    try {
      await api(`/admin/content/tiles/${world}/${edit}`, tileBody(f), 'PUT');
      d(Ad.ok('Type de case enregistré')); setEdit(null); load();
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const sp = spells.find(s => String(s.id) === String(f?.spellId));
  return <section>
    <p className="note">Chaque monde a ses propres types de case. Le coût d'énergie s'applique à chaque pas (à pied ou sur une invocation montée terrestre ;
      une invocation montée volante paie toujours 1, l'eau profonde reste infranchissable à pied). Un sort passif agit à chaque tick horaire sur les personnages présents sur la case.</p>
    <div className="tabs">{worlds.map(([id, file]) =>
      <button key={id} className={world === id ? 'on' : ''} onClick={() => { setWorld(id); setEdit(null); }}>{WORLD_LABEL[id] ?? file}</button>)}</div>
    {rows && !rows.length && <Empty>Aucun type de case en base : appliquer la migration 15_types_de_case.sql.</Empty>}

    {edit && f && <div className="editor apanel">
      <div className="headrow"><span className="swatch lg" style={{ background: hex(COLORS[edit]) }} /><h3>{f.name || edit}</h3><small>{WORLD_LABEL[world]} · type <code>{edit}</code></small></div>
      <div className="form">
        <div className="cell"><small>Nom affiché</small><input value={f.name} maxLength={80} onChange={e => setF({ ...f, name: e.target.value })} /></div>
        <div className="cell"><small>Coût d'énergie par case</small><input type="number" min="0" max="99" value={f.energyCost} onChange={e => setF({ ...f, energyCost: e.target.value === '' ? '' : Number(e.target.value) })} />
          {edit === 'deep' && <small>Infranchissable à pied quel que soit ce coût.</small>}</div>
        <div className="cell"><small title="0 = aucune (par défaut) ; payée par le personnage, même monté">Énergie divine par case (0 = aucune)</small><input type="number" min="0" max="99" value={f.divineEnergyCost} onChange={e => setF({ ...f, divineEnergyCost: e.target.value === '' ? '' : Number(e.target.value) })} /></div>
        <div className="cell span-all"><small>Description (affichée dans la carte de case du jeu)</small>
          <textarea rows="2" maxLength={500} value={f.description} onChange={e => setF({ ...f, description: e.target.value })} /></div>
        <div className="cell span2"><small>Sort appliqué en continu</small>
          <Pick options={[{ id: '', name: '— Aucun sort —' }, ...spells]} value={f.spellId} onPick={v => setF({ ...f, spellId: v })}
            labelOf={s => s.id === '' ? s.name : `${s.name}${s.kind ? ` · ${s.kind}` : ''}${s.damage ? ` · ${s.damage}` : ''}`} /></div>
        {f.spellId !== '' && <div className="cell"><small>Effet</small>
          <div className="seg2">{[['bonus', 'Bonus'], ['malus', 'Malus']].map(([k, l]) =>
            <button key={k} className={`chip${f.spellMode === k ? ' on' : ''} ${k}`} onClick={() => setF({ ...f, spellMode: k })}>{l}</button>)}</div></div>}
      </div>
      {f.spellId !== '' && <p className="note">Par heure passée sur la case : <b className={f.spellMode}>{hpPerHour(f.spellMode, sp?.damage) > 0 ? '+' : ''}{hpPerHour(f.spellMode, sp?.damage)} PV</b>
        {' '}(dégâts / effet du sort{sp && !sp.damage ? ' = 0 : sans effet, renseigner « Dégâts / effet » dans l’onglet Sorts' : ''}). Les PV restent entre 1 et le maximum.</p>}
      <div className="actions"><button className="ghost" onClick={() => setEdit(null)}>Annuler</button><button className="primary" onClick={save}>Enregistrer</button></div>
    </div>}

    {view.length > 0 && <div className="tablewrap"><table><thead><tr>
      <th /><th>Nom</th><th>Type</th><th>Énergie / case</th><th>Description</th><th>Sort en continu</th><th />
    </tr></thead><tbody>
      {view.map(r => <tr key={r.kind} className={edit === r.kind ? 'sel' : ''}>
        <td><span className="swatch" style={{ background: hex(COLORS[r.kind]) }} /></td>
        <td><b>{r.name}</b></td>
        <td><code>{r.kind}</code></td>
        <td>⚡ {r.kind === 'deep' ? `${r.energy_cost} (∞ à pied)` : r.energy_cost}{r.divine_energy_cost > 0 && <small className="divcost"> ✦{r.divine_energy_cost}</small>}</td>
        <td className="desc">{r.description || '—'}</td>
        <td>{r.spell_id ? <span className={r.spell_mode}>{spellSummary(r)}</span> : '—'}</td>
        <td><button className="sm" onClick={() => edit === r.kind ? setEdit(null) : open(r)}>{edit === r.kind ? 'Fermer' : 'Éditer'}</button></td>
      </tr>)}</tbody></table></div>}
  </section>;
}
