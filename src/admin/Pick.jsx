import { useState } from 'react';
/**
 * Menu déroulant avec recherche (catalogues du bestiaire — sorts / objets / ressources) :
 * libellé visible de la sélection, champ de recherche filtrant la liste, et **pagination de
 * 20 éléments par page** (`perPage`) de la liste complète filtrée. Usage : onglets du détail
 * de monstre (capacités, butin objet / ressource, placement).
 */
export default function Pick({ options, value, onPick, labelOf, placeholder = '— Choisir —', perPage = 20 }) {
  const [q, setQ] = useState(''), [open, setOpen] = useState(false), [page, setPage] = useState(0);
  const sel = (options ?? []).find(o => String(value) === String(o.id ?? o.value ?? o));
  const label = sel ? labelOf(sel) : (sel != null && sel !== '' ? String(sel) : placeholder);
  const filter = o => {
    const s = String(q ?? '').trim().toLowerCase();
    return !s || String(labelOf(o) ?? '').toLowerCase().includes(s);
  };
  const list = (options ?? []).filter(filter);
  const pages = Math.max(1, Math.ceil(list.length / perPage));
  const cur = Math.min(page, pages - 1);
  const view = list.slice(cur * perPage, (cur + 1) * perPage);
  return <div className="pick" onClick={() => setOpen(true)}>
    <button type="button" className="pickv">{label}</button>
    {open && <div className="picklist" onClick={e => e.stopPropagation()}>
      <input autoFocus value={q} onChange={e => { setQ(e.target.value); setPage(0); }} placeholder="Rechercher…" />
      <div className="pickscroll">{view.map(o =>
        <button key={String(o.id ?? o.value ?? o)} className={String(value) === String(o.id ?? o.value ?? o) ? 'on' : ''}
          onClick={() => { onPick(o.id ?? o.value ?? o); setOpen(false); }}>{labelOf(o)}</button>)}
        {list.length === 0 && <small className="note">Aucun résultat.</small>}</div>
      {list.length > perPage && <div className="pickpg">
        <button className="sm" disabled={cur === 0} onClick={() => setPage(cur - 1)}>‹</button>
        <small>page {cur + 1}/{pages} · {list.length} éléments</small>
        <button className="sm" disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}>›</button>
      </div>}
    </div>}
  </div>;
}
