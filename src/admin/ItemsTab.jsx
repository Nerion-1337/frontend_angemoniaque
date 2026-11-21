// Onglet admin « Objets » (phase 4) : sous-onglets par rareté (le sous-onglet Divin
// embarque les objets uniques artefacts/arcanes/reliques — panneau Divine existant),
// liste des objets filtrable par type d'équipement (slot) avec décompte « détenu par N »,
// et le paramètre « qui peut s'en équiper » (usable_by).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { SLOTS, SLOT_LABEL } from './monsterDetails.js';
import { RARITIES, RARITY_LABEL, USABLE_KINDS, USABLE_LABEL, usableBadge } from './rarity.js';
import Divine from './Divine.jsx';

const blank = { name: '', slot: '', rarity: 'commun', price: '', armor: '', strength_bonus: '', agility_bonus: '', durability: '', weapon_damage: '', magic_armor: '', quantity_max: '', usable_by: [] };

export default function ItemsTab() {
  const d = useDispatch();
  const [rar, setRar] = useState('');            // '' = toutes raretés
  const [slot, setSlot] = useState('');          // '' = tous / 'none' = sans slot
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(null);        // id en cours | 'new' | null
  const [f, setF] = useState(blank);             // formulaire (édition ou création)

  const load = () => {
    const p = new URLSearchParams();
    if (rar) p.set('rarity', rar);
    if (slot) p.set('slot', slot);
    const qs = p.toString();
    api(`/admin/content/items${qs ? `?${qs}` : ''}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  };
  useEffect(() => { load(); setEdit(null); setF(blank); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [rar, slot]);
  const open = row => { setEdit(row ? row.id : 'new'); setF({ ...blank, ...row, rarity: row?.rarity_n ?? row?.rarity ?? 'commun', usable_by: typeof row?.usable_by === 'string' ? JSON.parse(row.usable_by || '[]') : (row?.usable_by ?? []) }); };
  const save = async () => {
    try {
      const body = { ...f };
      Object.keys(body).forEach(k => { if (body[k] === '' && k !== 'usable_by') delete body[k]; });
      body.usable_by = f.usable_by;
      if (edit === 'new') await api('/admin/content/items', body, 'POST');
      else await api(`/admin/content/items/${edit}`, body, 'PUT');
      d(Ad.msg(edit === 'new' ? 'Objet créé' : 'Objet mis à jour')); setEdit(null); load();
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async id => { try { await api(`/admin/content/items/${id}`, undefined, 'DELETE'); d(Ad.msg('Supprimé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const setU = k => setF(v => ({ ...v, usable_by: v.usable_by.includes(k) ? v.usable_by.filter(x => x !== k) : [...v.usable_by, k] }));
  const num = (k, v) => setF(x => ({ ...x, [k]: v === '' ? '' : Number(v) }));

  return <section>
    <h2>Objets</h2>
    <div className="tabs">{['', ...RARITIES].map(r =>
      <button key={r || 'all'} className={rar === r ? 'on' : ''} onClick={() => setRar(r)}>{r === '' ? 'Toutes raretés' : RARITY_LABEL[r]}</button>)}
    </div>
    {rar === 'divin' ? <div>
      <p className="note">Rareté <b>Divin</b> : objets uniques — artefacts, arcanes et reliques (plafonds globaux,
        jamais de duplication) avec le porteur (personnage / gardien monstre).</p>
      <Divine />
    </div> : <div>
      <div className="filterrow">
        <small>Type d'équipement</small>
        <select value={slot} onChange={e => setSlot(e.target.value)}>
          <option value="">Tous</option>
          {SLOTS.map(s => <option key={s} value={s}>{SLOT_LABEL[s]}</option>)}
          <option value="none">Sans type (ressource, consommable…)</option>
        </select>
        <button className="sm" onClick={() => { setEdit('new'); setF({ ...blank, rarity: rar || 'commun' }); }}>+ Nouvel objet</button>
      </div>
      <table><thead><tr>
        <th>Nom</th><th>Type</th><th>Rareté</th><th>Équippable par</th><th>Détenu par</th><th>Prix</th><th />
      </tr></thead><tbody>
        {rows.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
          <td><b>{r.name}</b> <button className="sm" onClick={() => open(r.id)}>{edit === r.id ? '×' : 'Éditer'}</button></td>
          <td>{r.slot ? SLOT_LABEL[r.slot] ?? r.slot : '—'}</td>
          <td><span className={`rar ${r.rarity_n ?? r.rarity ?? 'commun'}`}>{RARITY_LABEL[r.rarity_n ?? r.rarity ?? 'commun'] ?? r.rarity}</span></td>
          <td className="ux">{usableBadge(r.usable_by)}</td>
          <td>{r.holders ? `${r.holders} joueur(s)` : '—'}</td>
          <td>{r.price ?? ''}</td>
          <td><button className="sm danger" onClick={() => del(r.id)}>Suppr.</button></td>
        </tr>)}</tbody></table>

      {edit && <div className="editor">
        <h3>{edit === 'new' ? 'Nouvel objet' : 'Édition'}</h3>
        <div className="form">
          <div className="cell"><small>Nom</small><input value={f.name} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></div>
          <div className="cell"><small>Type (slot)</small>
            <select value={f.slot} onChange={e => setF(x => ({ ...x, slot: e.target.value }))}>
              <option value="">Sans type</option>{SLOTS.map(s => <option key={s} value={s}>{SLOT_LABEL[s]}</option>)}</select></div>
          <div className="cell"><small>Rareté</small>
            <select value={f.rarity} onChange={e => setF(x => ({ ...x, rarity: e.target.value }))}>
              {RARITIES.filter(x => x !== 'divin').map(r => <option key={r} value={r}>{RARITY_LABEL[r]}</option>)}</select></div>
          <div className="cell"><small>Prix</small><input type="number" value={f.price} onChange={e => num('price', e.target.value)} /></div>
          <div className="cell"><small>Bligne</small><input type="number" value={f.armor} onChange={e => num('armor', e.target.value)} /></div>
          <div className="cell"><small>Dégâts d'arme</small><input type="number" value={f.weapon_damage} onChange={e => num('weapon_damage', e.target.value)} /></div>
          <div className="cell"><small>Force +</small><input type="number" value={f.strength_bonus} onChange={e => num('strength_bonus', e.target.value)} /></div>
          <div className="cell"><small>Agilité +</small><input type="number" value={f.agility_bonus} onChange={e => num('agility_bonus', e.target.value)} /></div>
          <div className="cell"><small>Durabilité</small><input type="number" value={f.durability} onChange={e => num('durability', e.target.value)} /></div>
          <div className="cell"><small>Armure magique</small><input type="number" value={f.magic_armor} onChange={e => num('magic_armor', e.target.value)} /></div>
          <div className="cell"><small>Plafond (quantité)</small><input type="number" value={f.quantity_max} onChange={e => num('quantity_max', e.target.value)} /></div>
          <div className="cell"><small>Force requise</small><input value={f.req_strength ?? ''} onChange={e => setF(x => ({ ...x, req_strength: e.target.value === '' ? '' : Number(e.target.value) }))} /></div>
          <div className="cell span2"><small>Qui peut s'en équiper</small>
            <div className="ux">{USABLE_KINDS.map(k =>
              <button key={k} className={`chip${f.usable_by.includes(k) ? ' on' : ''}`} onClick={() => setU(k)}>{USABLE_LABEL[k]}</button>)}
            </div>
            <p className="note">Rien de coché = tout le monde peut s'en équiper.</p></div>
        </div>
        <div className="actions">
          <button onClick={save}>{edit === 'new' ? 'Créer le nouvel objet' : 'Enregistrer'}</button>
          <button className="ghost" onClick={() => setEdit(null)}>Annuler</button>
        </div>
      </div>}
    </div>}
  </section>;
};
