// Hôtel de ville / capitale de faction : un onglet à la fois — Boutique (objets et sorts), Marché (acheter / vendre), Coffre ;
// chaque onglet se filtre par catégorie (sort / objet / structure / invocation / ressource) et par rareté.
import { Rarity, rarClass, RARITY_LABEL } from './Rarity'; import { CATS, NO_FILTER, passes, shopEntries } from '../lib/shopFilter';
import { useState } from 'react'; import { useSelector, useDispatch } from 'react-redux';
import { Store, ShoppingBag, Package, PlusCircle, Sparkles, X, Coins, ArrowRight, ArrowLeft, Check, Tag, Map as MapIco, Landmark, Flame, Feather } from 'lucide-react';
import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import Modal from './Modal'; import { api } from '../lib/api'; import { useRefreshMe } from './GameCanvas';
import { Tabs, useTab } from './Tabs'; import { worldName } from '../lib/worlds.js';
/** Thème de chaque capitale (nom, devise, emblème) ; couleurs : classes CSS .cap-<race>. Race inconnue → thème humain. */
const THEME = {
  human: { name: 'Hôtel de Ville', people: 'Humains', motto: 'Par le fer et la foi, la cité tient bon.', Icon: Landmark },
  demon: { name: 'Bastion Infernal', people: 'Démons', motto: 'Ce que l’on prend, on le garde.', Icon: Flame },
  angel: { name: 'Sanctuaire de la Providence', people: 'Anges', motto: 'La lumière guide, la Providence pourvoit.', Icon: Feather },
};
export const capTheme = race => THEME[race] ? { key: race, ...THEME[race] } : { key: 'human', ...THEME.human };
export const itemStat = i => i.weapon_damage ? `Arme ×${i.weapon_damage}` : i.armor ? `Armure +${i.armor}` : 'Outil / parchemin';
const Empty = ({ children }) => <p className="cap-empty">{children}</p>;
/** Filtres d'un onglet : catégorie + rareté. */
function Filters({ f, set }) {
  return <div className="cap-filters" role="group" aria-label="Filtres">
    <select aria-label="Catégorie" value={f.cat} onChange={e => set({ ...f, cat: e.target.value })}>{CATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
    <select aria-label="Rareté" value={f.rar} onChange={e => set({ ...f, rar: e.target.value })}><option value="all">Toutes raretés</option>{Object.entries(RARITY_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
  </div>;
}
export default function Capital() {
  const { me } = useSelector(s => s.game), d = useDispatch(), run = useDo(), refresh = useRefreshMe();
  const [shop, ls] = useData(`/shop?characterId=${me.id}`), [mk, lm] = useData(`/market/${me.id}`), [ch, lc] = useData(`/chest/${me.id}`), [known, lk] = useData(`/spells/${me.id}`), [inv, li] = useData(`/inventory/${me.id}`);
  const [price, setPrice] = useState(150), [sell, setSell] = useState('');
  const all = () => { ls(); lm(); lc(); li(); lk(); refresh(); }, act = (f, ok, then) => run(f, () => { all(); then?.(); if (ok) d(A.toast(ok)); });
  const bag = inv?.items.filter(i => !i.equipped_slot && !i.in_chest) ?? [];
  const th = capTheme(me.race), Emblem = th.Icon, world = me.actor?.pos?.map_id ?? 1, hasMap = (me.map_worlds ?? []).includes(world);
  const [tab, setTab] = useTab('capital', ['shop', 'market', 'chest']), [flt, setFlt] = useState({ shop: NO_FILTER, market: NO_FILTER, chest: NO_FILTER });
  const tabs = [['shop', 'Boutique', Store], ['market', 'Marché', ShoppingBag, mk?.length], ['chest', 'Coffre', Package, ch?.items.length]];
  const F = flt[tab] ?? NO_FILTER, ok = x => passes(x, F), filters = <Filters f={F} set={v => setFlt({ ...flt, [tab]: v })} />;
  const full = ch ? (ch.used ?? ch.items.length) >= ch.size : false;
  const sumRes = list => Object.values((list ?? []).reduce((m, r) => { (m[r.id] ??= { id: r.id, name: r.name, qty: 0 }).qty += r.qty; return m; }, {}));   // piles regroupées par ressource
  const moveRes = (id, to) => act(() => api('/chest/resource', { characterId: me.id, resource: id, to }));
  return <Modal onClose={() => d(A.setPanel(null))} className={`inv capital cap-${th.key}`} label="Capitale de faction">
    <header className="cap-head">
      <span className="cap-emblem" aria-hidden="true"><Emblem size={26} /></span>
      <div><h3>{th.name}</h3><em className="cap-motto">{th.motto}</em><small>Capitale des {th.people} · toutes les interactions ici coûtent 0 énergie.</small></div><span className="grow" />
      <span className="cap-gold"><Coins size={16} /> {me.gold} <small>or</small></span>
      <button className="x" aria-label="Fermer" onClick={() => d(A.setPanel(null))}><X size={14} /></button>
    </header>
    <Tabs tabs={tabs} value={tab} onChange={setTab} label="Services de la capitale" />

    {tab === 'shop' && <section className="cap-pane">
      {shop?.mapUpgrade && <article className={`cap-feature${hasMap ? ' owned' : ''}`}><MapIco size={26} />
        <div><b>Carte des ressources — {worldName(world)}</b><small>Votre carte de ce monde met en valeur la ressource de votre choix, case par case. Elle ne vaut que pour ce monde : les autres s'ouvrent avec leur parchemin de carte des ressources.</small></div>
        {hasMap ? <span className="pill ok"><Check size={13} /> Acquise</span>
          : <button className="primary" disabled={me.gold < shop.mapUpgrade.price} title={me.gold < shop.mapUpgrade.price ? 'Or insuffisant' : ''} onClick={() => act(() => api('/shop/map-upgrade', { characterId: me.id }), 'Carte améliorée : ouvrez la carte du monde')}><Coins size={14} /> {shop.mapUpgrade.price}</button>}</article>}
      <p className="cap-hint">Réserve de la faction : outils de récolte, armes, armures, parchemins et sorts de base.</p>{filters}
      {shop && !shopEntries(shop).filter(ok).length && <Empty>{shopEntries(shop).length ? 'Rien ne correspond aux filtres.' : 'La réserve est vide.'}</Empty>}
      <div className="cap-grid">{shopEntries(shop).filter(ok).map(i => { const poor = me.gold < i.price;
        if (i.type === 'spell') { const has = known?.spells.some(k => k.id === i.id);
          return <article key={`s${i.id}`} className={`cap-card ${rarClass(i.rarity)}${has ? ' owned' : ''}`}><b><Sparkles size={13} /> {i.name}<Rarity r={i.rarity} /></b><small>{i.description}</small>
            <div className="cap-foot"><span className="stock">⚡ {i.energy_cost}{i.divine_energy_cost > 0 && <span className="divcost"> ✦ {i.divine_energy_cost}</span>}</span>
              {has ? <span className="pill ok"><Check size={13} /> Appris</span>
                : <button className="primary sm" disabled={poor} title={poor ? 'Or insuffisant' : ''} onClick={() => act(() => api('/shop/learn', { characterId: me.id, spellId: i.id }), `${i.name} appris`)}><Coins size={13} /> {i.price}</button>}</div></article>; }
        const out = i.stock <= 0;
        return <article key={`i${i.id}`} className={`cap-card ${rarClass(i.rarity)}${out ? ' out' : ''}`}><b>{i.name}<Rarity r={i.rarity} /></b><small>{itemStat(i)}</small>
          <div className="cap-foot"><span className={`stock${out ? ' none' : ''}`}>{out ? 'Épuisé' : `Stock ${i.stock}`}</span>
            <button className="primary sm" disabled={out || poor} title={poor ? 'Or insuffisant' : ''} onClick={() => act(() => api('/shop/buy', { characterId: me.id, itemId: i.id }), `${i.name} acheté`)}><Coins size={13} /> {i.price}</button></div></article>; })}</div>
    </section>}

    {tab === 'market' && <section className="cap-pane">
      <p className="cap-hint">Marché des {th.people} : offres entre joueurs de votre race.</p>
      <h4>Offres en cours</h4>{filters}
      {mk && !mk.filter(ok).length && <Empty>{mk.length ? 'Rien ne correspond aux filtres.' : 'Aucune offre pour le moment.'}</Empty>}
      <div className="cap-grid">{mk?.filter(ok).map(l => <article key={l.id} className={`cap-card ${rarClass(l.rarity)}`}><b>{l.name}<Rarity r={l.rarity} /></b><small>{CATS.find(c => c[0] === l.cat)?.[1] ?? 'Objet'}</small>
        <div className="cap-foot"><span className="grow" /><button className="primary sm" disabled={me.gold < l.price} onClick={() => act(() => api(`/market/${l.id}/buy`, { characterId: me.id }), `${l.name} acheté`)}><Coins size={13} /> {l.price}</button></div></article>)}</div>
      <h4><Tag size={14} /> Mettre en vente</h4>
      {bag.length ? <div className="cap-sell">
        <select value={sell} onChange={e => setSell(e.target.value)} aria-label="Objet du sac à vendre"><option value="">— Objet du sac —</option>{bag.map((b, i) => <option key={b.id + '-' + i} value={b.id}>{b.name}</option>)}</select>
        <label className="cap-price"><input type="number" min={10} step={10} value={price} onChange={e => setPrice(+e.target.value)} aria-label="Prix" /><small>or</small></label>
        <button className="primary" disabled={!sell || price < 10} onClick={() => act(() => api('/market/list', { characterId: me.id, kind: 'item', refId: Number(sell), price }), 'Offre publiée', () => setSell(''))}>Vendre</button>
      </div> : <Empty>Votre sac est vide.</Empty>}
    </section>}

    {tab === 'chest' && <section className="cap-pane">
      <div className="cap-chesthead"><div><b>Coffre personnel</b><small>{ch?.used ?? ch?.items.length ?? 0} / {ch?.size ?? '…'} emplacements</small></div>
        <span className="cap-meter"><i style={{ '--p': ch ? (100 * (ch.used ?? ch.items.length)) / Math.max(1, ch.size) : 0 }} /></span>
        <button disabled={!ch || me.gold < ch.nextCost} onClick={() => act(() => api('/chest/expand', { characterId: me.id }), 'Coffre agrandi')}><PlusCircle size={14} /> +1 espace — {ch?.nextCost ?? '…'} or</button></div>{filters}
      <div className="cap-cols">
        <div><h4>Coffre</h4>{ch && !ch.items.length && !ch.resources?.length && <Empty>Votre coffre est vide.</Empty>}
          {sumRes(ch?.resources).filter(x => ok({ cat: 'ressource' })).map(x => <div key={x.id} className="cap-row res"><span>{x.name} <small>×{x.qty}</small></span><button className="sm" onClick={() => moveRes(x.id, 'bag')}><ArrowLeft size={13} /> Sac</button></div>)}
          {ch?.items.filter(ok).map((i, k) => <div key={i.id + '-' + k} className="cap-row"><span>{i.name}</span><button className="sm" onClick={() => act(() => api('/chest/move', { characterId: me.id, itemId: i.id, to: 'bag' }))}><ArrowLeft size={13} /> Sac</button></div>)}</div>
        <div><h4>Sac</h4>{!bag.length && !inv?.resStacks?.length && <Empty>Votre sac est vide.</Empty>}
          {sumRes(inv?.resStacks).filter(x => ok({ cat: 'ressource' })).map(x => <div key={x.id} className="cap-row res"><span>{x.name} <small>×{x.qty}</small></span><button className="sm" disabled={full} title={full ? 'Coffre plein' : ''} onClick={() => moveRes(x.id, 'chest')}>Coffre <ArrowRight size={13} /></button></div>)}
          {bag.filter(ok).map((b, i) => <div key={b.id + '-' + i} className="cap-row"><span>{b.name}</span><button className="sm" disabled={full} title={full ? 'Coffre plein' : ''} onClick={() => act(() => api('/chest/move', { characterId: me.id, itemId: b.id, to: 'chest' }))}>Coffre <ArrowRight size={13} /></button></div>)}</div>
      </div>
    </section>}
  </Modal>;
}
