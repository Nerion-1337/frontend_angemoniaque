// Onglet admin « Sorts » (phase 4) : catalogue global des sorts (blessures/bonus/malus/
// structure…), sous-onglets par rareté (Commun → Divin), décompte « appris par N »
// (personnages qui le possèdent) et le paramètre « qui peut l'apprendre » (usable_by).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx';
import { RARITIES, RARITY_LABEL, USABLE_KINDS, USABLE_LABEL, usableBadge } from './rarity.js';

const blank = { name: '', kind: '', rarity: 'commun', energyCost: '', damage: '', description: '', price: '', durationH: '', usableBy: [] };

export default function SpellsTab() {
  const d = useDispatch();
  const [rar, setRar] = useState('');            // '' = toutes raretés
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(null);        // id en cours | 'new' | null
  const [f, setF] = useState(blank);
  const [q, setQ] = useState('');               // recherche locale (nom, genre/type)

  const load = () => {
    const qs = rar ? `?rarity=${rar}` : '';
    api(`/admin/content/spells${qs}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  };
  useEffect(() => { load(); setEdit(null); setF(blank); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [rar]);
  const open = row => { setEdit(row ? row.id : 'new'); setF({ ...blank, ...row, usableBy: typeof row?.usable_by === 'string' ? JSON.parse(row.usable_by || '[]') : (row?.usable_by ?? []) }); };
  const save = async () => {
    try {
      const body = { ...f };
      Object.keys(body).forEach(k => { if (body[k] === '') delete body[k]; });
      body.usableBy = f.usableBy;
      if (edit === 'new') await api('/admin/content/spells', body, 'POST');
      else await api(`/admin/content/spells/${edit}`, body, 'PUT');
      d(Ad.ok(edit === 'new' ? 'Sort créé' : 'Sort mis à jour')); setEdit(null); load();
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async row => { if (!confirmDel(`le sort « ${row.name} »`)) return; try { await api(`/admin/content/spells/${row.id}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const setU = k => setF(v => ({ ...v, usableBy: v.usableBy.includes(k) ? v.usableBy.filter(x => x !== k) : [...v.usableBy, k] }));
  const num = (k, v) => setF(x => ({ ...x, [k]: v === '' ? '' : Number(v) }));

  const view = rows.filter(r => matches(q, r.name, r.kind, r.slot));
  return <section>
    <div className="tabs">{['', ...RARITIES].map(r =>
      <button key={r || 'all'} className={rar === r ? 'on' : ''} onClick={() => setRar(r)}>{r === '' ? 'Toutes raretés' : RARITY_LABEL[r]}</button>)}
    </div>
    <div>
      <div className="filterrow">
        <Search value={q} onChange={setQ} />
        <small>{view.length} sort(s)</small><span className="grow" />
        <button className="sm" onClick={() => { setEdit('new'); setF({ ...blank, rarity: rar === 'divin' ? 'divin' : (rar || 'commun') }); }}>+ Nouveau sort</button>
      </div>
      {edit && <div className="editor apanel">
        <h3>{edit === 'new' ? 'Nouveau sort' : 'Édition du sort'}</h3>
        <div className="form">
          <div className="cell"><small>Nom</small><input value={f.name} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></div>
          <div className="cell"><small>Genre (blessure, bonus, malus, structure…)</small>
            <input value={f.kind} onChange={e => setF(x => ({ ...x, kind: e.target.value }))} /></div>
          <div className="cell"><small>Rareté</small>
            <select value={f.rarity} onChange={e => setF(x => ({ ...x, rarity: e.target.value }))}>
              {RARITIES.map(r => <option key={r} value={r}>{RARITY_LABEL[r]}</option>)}</select></div>
          <div className="cell"><small>Coût en énergie</small><input type="number" value={f.energyCost} onChange={e => num('energyCost', e.target.value)} /></div>
          <div className="cell"><small>Dégâts / effet</small><input type="number" value={f.damage} onChange={e => num('damage', e.target.value)} /></div>
          <div className="cell"><small>Durée (heures ; 0 = instantané)</small><input type="number" value={f.durationH} onChange={e => num('durationH', e.target.value)} /></div>
          <div className="cell"><small>Prix (apprentissage)</small><input type="number" value={f.price} onChange={e => num('price', e.target.value)} /></div>
          <div className="cell span2"><small>Description</small>
            <input value={f.description ?? ''} onChange={e => setF(x => ({ ...x, description: e.target.value }))} /></div>
          <div className="cell span2"><small>Qui peut l'apprendre</small>
            <div className="ux">{USABLE_KINDS.map(k =>
              <button key={k} className={`chip${f.usableBy.includes(k) ? ' on' : ''}`} onClick={() => setU(k)}>{USABLE_LABEL[k]}</button>)}
            </div>
            <p className="note">Rien de coché = tout le monde peut l'apprendre.</p></div>
        </div>
        <div className="actions">
          <button onClick={save}>{edit === 'new' ? 'Créer le sort' : 'Enregistrer'}</button>
          <button className="ghost" onClick={() => setEdit(null)}>Annuler</button>
        </div>
      </div>}
      <div className="tablewrap"><table><thead><tr>
        <th>Nom</th><th>Genre</th><th>Rareté</th><th>Énergie</th><th>Dégâts</th><th>Durée</th><th>Apprenable par</th><th>Appris par</th><th />
      </tr></thead><tbody>
        {view.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
          <td><b>{r.name}</b> <button className="sm" onClick={() => edit === r.id ? setEdit(null) : open(r)}>{edit === r.id ? 'Fermer' : 'Éditer'}</button></td>
          <td>{r.kind ?? '—'}</td>
          <td><span className={`rar ${r.rarity ?? 'commun'}`}>{RARITY_LABEL[r.rarity ?? 'commun']}</span></td>
          <td>{r.energy_cost ?? ''}</td>
          <td>{r.damage ?? ''}</td>
          <td>{r.duration_h ? `${r.duration_h} h` : '—'}</td>
          <td className="ux">{usableBadge(r.usable_by)}</td>
          <td>{r.learners ? `${r.learners} joueur(s)` : '—'}</td>
          <td><button className="sm danger" onClick={() => del(r)}>Suppr.</button></td>
        </tr>)}</tbody></table></div>
      {!view.length && <Empty>{rows.length ? 'Aucun résultat pour cette recherche.' : 'Aucun élément dans cette catégorie.'}</Empty>}

    </div>
  </section>;
};
