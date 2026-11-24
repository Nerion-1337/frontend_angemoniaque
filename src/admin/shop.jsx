// Boutique de l'hôtel de ville (onglets Objets et Sorts) : en vente ou non, races autorisées ([] = toutes), stock pour un objet.
/** Libellé de la colonne « Boutique » : « — » (hors boutique), « Toutes races », ou les noms des races. */
export const shopLabel = (shop, raw, races) => {
  if (!shop) return '—';
  const keys = typeof raw === 'string' ? JSON.parse(raw || '[]') : (raw ?? []);
  return keys.length ? keys.map(k => races?.find(r => r.key === k)?.name ?? k).join(', ') : 'Toutes races';
};
/** Champs du formulaire : f.shop (bool), f.shop_races (clés de race), f.shop_stock si `stock`. */
export function ShopFields({ f, set, races, stock, what }) {
  const tog = k => set(x => ({ ...x, shop_races: x.shop_races.includes(k) ? x.shop_races.filter(r => r !== k) : [...x.shop_races, k] }));
  return <div className="cell span-all shopfields">
    <label className="check"><input type="checkbox" checked={!!f.shop} onChange={e => set(x => ({ ...x, shop: e.target.checked }))} /> En vente à la boutique de l'hôtel de ville</label>
    {f.shop ? <>
      <div className="ux">{(races ?? []).map(r => <button key={r.key} className={`chip${f.shop_races.includes(r.key) ? ' on' : ''}`} onClick={() => tog(r.key)}>{r.name}</button>)}</div>
      <p className="note">Rien de coché = toutes les races.{stock && ' Stock = réserve de la faction (diminue à chaque achat).'}</p>
      {stock && <div className="row"><small>Stock</small><input type="number" min="0" className="nb" value={f.shop_stock ?? ''} onChange={e => set(x => ({ ...x, shop_stock: e.target.value }))} /></div>}
    </> : <p className="note">Hors boutique : {what} ne s'obtient qu'en jeu (butin, récolte…) ou par fabrication (parchemin + ressources).</p>}
  </div>;
}
