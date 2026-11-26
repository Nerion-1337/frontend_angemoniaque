// Onglet admin « Objets » : sous-onglets par rareté, filtre par type d'équipement (slot),
// décompte « détenu par N », paramètre « qui peut s'en équiper » (usable_by).
// Rareté « Divin » : MÊME tableau et MÊME formulaire que les autres objets, plus la famille divine
// (relique / arcane / artefact ou famille créée ici, avec son plafond) et les exemplaires uniques (Divine.jsx).
import { ElementSpells } from './SpellFx.jsx'; import { WORLDS } from '../lib/worlds.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { ITEM_SLOTS as SLOT_OPTS, ITEM_SLOT_LABEL as SLOT_LABEL } from './divine.js';
import { Search, matches, Empty, confirmDel } from './ui.jsx';
import { RARITIES, RARITY_LABEL, USABLE_KINDS, USABLE_LABEL, usableBadge } from './rarity.js';
import { itemBody, familyLabel, ITEM_STATS, statsLine } from './divine.js';
import Divine, { Families } from './Divine.jsx'; import { ShopFields, shopLabel } from './shop.jsx';

const blank = { name: '', slot: '', rarity: 'commun', price: '', armor: '', strength_bonus: '', agility_bonus: '', durability: '', weapon_damage: '', magic_armor: '', quantity_max: '', req_strength: '', usable_by: [], divine_family: '', shop: false, shop_stock: '', shop_races: [], bonuses: {}, two_handed: false, bag_add: '', bag_max: '', was_bag: false, map_world: '', was_map: false, xp_use: '', reach: '', full_power_at: '', power_start: '', power_end: '' };

export default function ItemsTab() {
  const d = useDispatch();
  const [rar, setRar] = useState('');            // '' = toutes raretés
  const [slot, setSlot] = useState('');          // '' = tous / 'none' = sans slot
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(null);        // id en cours | 'new' | null
  const [f, setF] = useState(blank);             // formulaire (édition ou création)
  const [q, setQ] = useState('');                // recherche locale (nom, type)
  const [fams, setFams] = useState([]);          // familles divines
  const [races, setRaces] = useState([]);        // races (boutique)

  const load = () => {
    const p = new URLSearchParams();
    if (rar) p.set('rarity', rar);
    if (slot) p.set('slot', slot);
    const qs = p.toString();
    api(`/admin/content/items${qs ? `?${qs}` : ''}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  };
  const loadFams = () => api('/admin/content/divine-families').then(setFams).catch(() => setFams([]));
  useEffect(() => { load(); setEdit(null); setF(blank); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [rar, slot]);
  useEffect(() => { loadFams(); api('/admin/content/races').then(setRaces).catch(() => {}); }, []);
  const open = row => {
    setEdit(row ? row.id : 'new');
    const v = { ...blank };
    for (const k of Object.keys(blank)) if (row?.[k] != null) v[k] = row[k];
    v.rarity = row?.rarity_n ?? row?.rarity ?? 'commun';
    v.usable_by = typeof row?.usable_by === 'string' ? JSON.parse(row.usable_by || '[]') : (row?.usable_by ?? []);
    v.bonuses = { ...(row?.bonuses ?? {}) };
    const bagD = row?.data?.kind === 'bag' ? row.data : null; v.was_bag = !!bagD; v.bag_add = bagD?.add ?? ''; v.bag_max = bagD?.max ?? '';
    const mapD = row?.data?.kind === 'resource_map' ? row.data : null; v.was_map = !!mapD; v.map_world = mapD?.map_id ?? '';
    v.shop = !!row?.shop; v.shop_races = typeof row?.shop_races === 'string' ? JSON.parse(row.shop_races || '[]') : (row?.shop_races ?? []);
    setF(v);
  };
  const save = async () => {
    try {
      const body = itemBody(f);
      if (edit === 'new') await api('/admin/content/items', body, 'POST');
      else await api(`/admin/content/items/${edit}`, body, 'PUT');
      d(Ad.ok(edit === 'new' ? 'Objet créé' : 'Objet mis à jour')); setEdit(null); load(); loadFams();
    } catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async row => { if (!confirmDel(`l’objet « ${row.name} »`)) return; try { await api(`/admin/content/items/${row.id}`, undefined, 'DELETE'); d(Ad.ok('Supprimé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const setU = k => setF(v => ({ ...v, usable_by: v.usable_by.includes(k) ? v.usable_by.filter(x => x !== k) : [...v.usable_by, k] }));
  const num = (k, v) => setF(x => ({ ...x, [k]: v === '' ? '' : Number(v) }));
  const divine = rar === 'divin';

  const view = rows.filter(r => matches(q, r.name, r.slot, r.family_name));
  return <section>
    <div className="tabs">{['', ...RARITIES].map(r =>
      <button key={r || 'all'} className={rar === r ? 'on' : ''} onClick={() => setRar(r)}>{r === '' ? 'Toutes raretés' : RARITY_LABEL[r]}</button>)}
    </div>
    {divine && <Families fams={fams} reload={() => { loadFams(); load(); }} />}
    <div className="filterrow">
      <small>Type d'équipement</small>
      <select value={slot} onChange={e => setSlot(e.target.value)}>
        <option value="">Tous</option>
        {SLOT_OPTS.map(([s, l]) => <option key={s} value={s}>{l}</option>)}
        <option value="none">Sans type (ressource, consommable…)</option>
      </select>
      <Search value={q} onChange={setQ} />
      <small>{view.length} objet(s)</small><span className="grow" />
      <button className="sm" onClick={() => { setEdit('new'); setF({ ...blank, rarity: rar || 'commun', divine_family: divine ? fams[0]?.key ?? '' : '' }); }}>+ Nouvel objet</button>
    </div>
    {edit && <div className="editor apanel">
      <h3>{edit === 'new' ? 'Nouvel objet' : `Édition — ${f.name}`}</h3>
      <div className="form">
        <div className="cell"><small>Nom</small><input value={f.name} onChange={e => setF(x => ({ ...x, name: e.target.value }))} /></div>
        <div className="cell"><small>Type (slot)</small>
          <select value={f.slot} onChange={e => setF(x => ({ ...x, slot: e.target.value }))}>
            <option value="">Sans type</option>{SLOT_OPTS.map(([s, l]) => <option key={s} value={s}>{l}</option>)}</select></div>
        <div className="cell"><small>Rareté</small>
          <select value={f.rarity} onChange={e => setF(x => ({ ...x, rarity: e.target.value, divine_family: e.target.value === 'divin' ? (x.divine_family || fams[0]?.key || '') : '' }))}>
            {RARITIES.map(r => <option key={r} value={r}>{RARITY_LABEL[r]}</option>)}</select></div>
        {f.rarity === 'divin' && <div className="cell"><small>Famille divine</small>
          <select value={f.divine_family} onChange={e => setF(x => ({ ...x, divine_family: e.target.value }))}>
            {fams.map(fm => <option key={fm.key} value={fm.key}>{familyLabel(fm)}</option>)}</select></div>}
        <div className="cell"><small>Prix</small><input type="number" value={f.price} onChange={e => num('price', e.target.value)} /></div>
        <div className="cell"><small>Dégâts d'arme</small><input type="number" value={f.weapon_damage} onChange={e => num('weapon_damage', e.target.value)} /></div>
        {f.slot === 'scroll' && <><div className="cell"><small>Agrandit le sac de (emplacements)</small><input type="number" min="0" value={f.bag_add} placeholder="0 = non" onChange={e => setF(x => ({ ...x, bag_add: e.target.value }))} /></div>
          <div className="cell"><small>… jusqu'à (capacité max du sac)</small><input type="number" min="1" value={f.bag_max} placeholder="ex. 30" onChange={e => setF(x => ({ ...x, bag_max: e.target.value }))} /></div>
          <div className="cell"><small>Ouvre la carte des ressources du monde</small><select value={f.map_world} onChange={e => setF(x => ({ ...x, map_world: e.target.value }))}>
            <option value="">— non</option>{Object.entries(WORLDS).map(([id, n]) => <option key={id} value={id}>{n}</option>)}</select></div></>}
        {f.slot === 'weapon' && <><div className="cell"><small>Portée (cases ; 1 = corps à corps)</small><input type="number" min="1" max="20" value={f.reach} placeholder="1" onChange={e => num('reach', e.target.value)} /></div>
          {Number(f.reach) > 1 && <div className="cell span2 powercurve"><small>Puissance selon la distance (grande portée)</small>
            <div className="pc-row"><label><small>Case 1</small><input type="number" min="0" max="100" value={f.power_start ?? ''} placeholder="100" onChange={e => num('power_start', e.target.value)} /> %</label>
              <label><small>100 % à la case</small><input type="number" min="1" max={Number(f.reach)} value={f.full_power_at ?? ''} placeholder="—" onChange={e => num('full_power_at', e.target.value)} /></label>
              <label><small>Case {f.reach} (dernière)</small><input type="number" min="0" max="100" value={f.power_end ?? ''} placeholder="100" onChange={e => num('power_end', e.target.value)} /> %</label></div>
            <small className="note">{f.full_power_at ? `Montée de ${f.power_start === '' ? 100 : f.power_start} % (case 1) à 100 % (case ${f.full_power_at}), puis baisse jusqu'à ${f.power_end === '' ? 100 : f.power_end} % (case ${f.reach}). Dégâts arrondis au supérieur.` : 'Sans case de pleine puissance : 100 % à toute distance.'}</small></div>}</>}
        {f.slot === 'weapon' && <div className="cell"><small>Mains</small><label className="check"><input type="checkbox" checked={!!f.two_handed} onChange={e => setF(x => ({ ...x, two_handed: e.target.checked }))} /> Deux mains (arc, grande arme : l'autre main reste vide)</label></div>}
        <div className="cell"><small>XP par utilisation {f.slot === 'weapon' ? '(chaque coup porté)' : f.slot === 'scroll' ? '(parchemin utilisé)' : ''}</small><input type="number" min="0" value={f.xp_use} onChange={e => num('xp_use', e.target.value)} /></div>
        <div className="cell"><small>Durabilité</small><input type="number" value={f.durability} onChange={e => num('durability', e.target.value)} /></div>
        <div className="cell"><small>Plafond (quantité)</small><input type="number" value={f.quantity_max} onChange={e => num('quantity_max', e.target.value)} /></div>
        <div className="cell"><small>Force requise</small><input type="number" value={f.req_strength} onChange={e => num('req_strength', e.target.value)} /></div>
        <div className="cell span-all fgroup"><h5>Caractéristiques offertes à qui le porte (négatif = malus)</h5><div className="form">
          {ITEM_STATS.map(([k, l, col]) => <div key={k} className="cell"><small>{l}</small><input type="number" value={col ? f[col] : (f.bonuses[k] ?? '')}
            onChange={e => col ? num(col, e.target.value) : setF(x => ({ ...x, bonuses: { ...x.bonuses, [k]: e.target.value } }))} /></div>)}</div>
          <p className="note">Force, agilité et armures comptent tant que l'objet est porté ; PV, régénération, énergie, vue et portée s'ajoutent à la fiche du personnage à l'équipement et sont retirés au déséquipement. Armure magique : réduit les dégâts des sorts (directs et sur la durée).</p></div>
        <div className="cell span-all"><small>Qui peut s'en équiper</small>
          <div className="ux">{USABLE_KINDS.map(k =>
            <button key={k} className={`chip${f.usable_by.includes(k) ? ' on' : ''}`} onClick={() => setU(k)}>{USABLE_LABEL[k]}</button>)}
          </div>
          <p className="note">Rien de coché = tout le monde peut s'en équiper.</p></div>
        <ShopFields f={f} set={setF} races={races} stock what="l’objet" />
        {edit !== 'new' && <div className="cell span-all"><ElementSpells kind="item" refId={edit} /></div>}
      </div>
      {f.rarity === 'divin' && edit !== 'new' && <Divine itemId={edit} onChange={load} />}
      {f.rarity === 'divin' && edit === 'new' && <p className="note">Les exemplaires uniques se créent une fois l’objet enregistré.</p>}
      <div className="actions">
        <button className="ghost" onClick={() => setEdit(null)}>Annuler</button>
        <button className="primary" onClick={save}>{edit === 'new' ? 'Créer le nouvel objet' : 'Enregistrer'}</button>
      </div>
    </div>}
    <div className="tablewrap"><table><thead><tr>
      <th>Nom</th><th>Type</th><th>Rareté</th>{divine && <th>Famille · exemplaires</th>}<th>Équipable par</th><th>Détenu par</th><th>Prix</th><th>Boutique</th><th />
    </tr></thead><tbody>
      {view.map(r => <tr key={r.id} className={edit === r.id ? 'sel' : ''}>
        <td><b>{r.name}</b>{statsLine(r) && <><br /><small>{statsLine(r)}</small></>} <button className="sm" onClick={() => edit === r.id ? setEdit(null) : open(r)}>{edit === r.id ? 'Fermer' : 'Éditer'}</button></td>
        <td>{r.slot ? SLOT_LABEL[r.slot] ?? r.slot : '—'}</td>
        <td><span className={`rar ${r.rarity_n ?? r.rarity ?? 'commun'}`}>{RARITY_LABEL[r.rarity_n ?? r.rarity ?? 'commun'] ?? r.rarity}</span></td>
        {divine && <td>{r.divine_family ? `${r.family_name ?? r.divine_family} · ${r.copies ?? 0} / ${r.family_cap ?? '∞'}` : <small>sans famille</small>}</td>}
        <td>{usableBadge(r.usable_by)}</td>
        <td>{r.holders ? `${r.holders} joueur(s)` : '—'}</td>
        <td>{r.price ?? ''}</td>
        <td>{shopLabel(r.shop, r.shop_races, races)}</td>
        <td><button className="sm danger" onClick={() => del(r)}>Suppr.</button></td>
      </tr>)}</tbody></table></div>
    {!view.length && <Empty>{rows.length ? 'Aucun résultat pour cette recherche.' : 'Aucun élément dans cette catégorie.'}</Empty>}
  </section>;
};
