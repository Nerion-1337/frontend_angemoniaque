// Onglet admin « Sorts » (phase 4) : catalogue global des sorts (blessures/bonus/malus/
// structure…), sous-onglets par rareté (Commun → Divin), décompte « appris par N »
// (personnages qui le possèdent) et le paramètre « qui peut l'apprendre » (usable_by).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx';
import { ShopFields, shopLabel } from './shop.jsx';
import { SpellEffects, SpellLinks } from './SpellFx.jsx'; import { fxDraft, fxBody, fxSummary } from './spellFx.js';
import { RARITIES, RARITY_LABEL, USABLE_KINDS, USABLE_LABEL, usableBadge } from './rarity.js';

const blank = { name: '', kind: '', rarity: 'commun', energyCost: '', damage: '', description: '', price: '', durationH: '', usableBy: [], shop: true, shop_races: [], fx: fxDraft({}) };

export default function SpellsTab() {
  const d = useDispatch();
  const [rar, setRar] = useState('');            // '' = toutes raretés
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(null);        // id en cours | 'new' | null
  const [f, setF] = useState(blank);
  const [races, setRaces] = useState([]);
  useEffect(() => { api('/admin/content/races').then(setRaces).catch(() => {}); }, []);
  const [q, setQ] = useState('');               // recherche locale (nom, genre/type)

  const load = () => {
    const qs = rar ? `?rarity=${rar}` : '';
    api(`/admin/content/spells${qs}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  };
  useEffect(() => { load(); setEdit(null); setF(blank); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [rar]);
  const js = v => (typeof v === 'string' ? JSON.parse(v || '[]') : (v ?? []));
  // La ligne de l'API est en snake_case (energy_cost…) ; le formulaire en camelCase : correspondance explicite (avant : énergie et durée vides à l'édition).
  const open = row => { setEdit(row ? row.id : 'new'); setF(row ? { ...blank, name: row.name ?? '', kind: row.kind ?? '', rarity: row.rarity ?? 'commun', energyCost: row.energy_cost ?? '', damage: row.damage ?? '', description: row.description ?? '', price: row.price ?? '', durationH: row.duration_h ?? '', usableBy: js(row.usable_by), shop: row.shop !== false, shop_races: js(row.shop_races), fx: fxDraft(row.effects) } : blank); };
  const save = async () => {
    try {
      const body = { ...f };
      Object.keys(body).forEach(k => { if (body[k] === '') delete body[k]; });
      body.usableBy = f.usableBy;
      body.shop = !!f.shop; body.shopRaces = f.shop ? f.shop_races : []; delete body.shop_races; body.effects = fxBody(f.fx); delete body.fx;
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
          <ShopFields f={f} set={setF} races={races} what="le sort" />
          <div className="cell span-all"><SpellEffects fx={f.fx} set={fx => setF(x => ({ ...x, fx }))} /></div>
          {edit !== 'new' && <div className="cell span-all"><SpellLinks spellId={edit} /></div>}
        </div>
        <div className="actions">
          <button onClick={save}>{edit === 'new' ? 'Créer le sort' : 'Enregistrer'}</button>
          <button className="ghost" onClick={() => setEdit(null)}>Annuler</button>
        </div>
      </div>}
      <div className="tablewrap"><table><thead><tr>
        <th>Nom</th><th>Genre</th><th>Rareté</th><th>Énergie</th><th>Dégâts</th><th>Durée</th><th>Apprenable par</th><th>Appris par</th><th>Boutique</th><th />
      </tr></thead><tbody>
        {view.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
          <td><b>{r.name}</b> <button className="sm" onClick={() => edit === r.id ? setEdit(null) : open(r)}>{edit === r.id ? 'Fermer' : 'Éditer'}</button></td>
          <td>{r.kind ?? '—'}{fxSummary(r.effects) && <><br /><small>{fxSummary(r.effects)}</small></>}</td>
          <td><span className={`rar ${r.rarity ?? 'commun'}`}>{RARITY_LABEL[r.rarity ?? 'commun']}</span></td>
          <td>{r.energy_cost ?? ''}</td>
          <td>{r.damage ?? ''}</td>
          <td>{r.duration_h ? `${r.duration_h} h` : '—'}</td>
          <td className="ux">{usableBadge(r.usable_by)}</td>
          <td>{r.learners ? `${r.learners} joueur(s)` : '—'}</td>
          <td>{shopLabel(r.shop, r.shop_races, races)}</td>
          <td><button className="sm danger" onClick={() => del(r)}>Suppr.</button></td>
        </tr>)}</tbody></table></div>
      {!view.length && <Empty>{rows.length ? 'Aucun résultat pour cette recherche.' : 'Aucun élément dans cette catégorie.'}</Empty>}

    </div>
  </section>;
};
