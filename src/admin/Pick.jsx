import { useState } from 'react'; import { pickFilter } from './monsterDetails.js';
/**
 * Menu déroulant avec recherche (catalogues du jeu) : une case de filtre + la liste filtrée
 * (libellé + sous-libellé) ; `onPick(id)` remonte le choix. Utilisé par le panneau Détails de
 * monstre (sorts, objets, monstres) — les catalogues sont lus tels quels (pas d'état interne
 * persistant : le panneau rechargue à chaque sélection).
 */
export default function Pick({ options, value, onPick, labelOf, subOf, placeholder = '—' }) {
  const [q, setQ] = useState('');
  const list = pickFilter(options, q, labelOf);
  const sel = (options ?? []).find(o => String(o.id) === String(value));
  return <span className="pick">
    <input className="sm" placeholder={placeholder} value={q} onChange={e => setQ(e.target.value)} />
    <small className="pickv">{q ? `${list.length} résultat(s)` : sel ? labelOf(sel) : placeholder}</small>
    {q && <div className="picklist">{list.map(o =>
      <button key={o.id} className="sm" onClick={() => { onPick(o.id); setQ(''); }}>
        <b>{labelOf(o)}</b>{subOf ? <small>{subOf(o)}</small> : null}</button>
    )}{list.length === 0 && <small className="note">Aucun résultat</small>}</div>}
  </span>;
}
