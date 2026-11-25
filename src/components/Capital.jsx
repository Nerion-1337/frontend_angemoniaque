// Hôtel de ville / capitale de faction : un onglet à la fois — Boutique (objets), Sorts, Marché (acheter / vendre), Coffre.
import { useState } from 'react'; import { useSelector, useDispatch } from 'react-redux';
import { Store, ShoppingBag, Package, PlusCircle, Sparkles, X, Coins, ArrowRight, ArrowLeft, Check, Tag } from 'lucide-react';
import { A } from '../store'; import { useData, useDo } from '../lib/hooks'; import Modal from './Modal'; import { api } from '../lib/api'; import { useRefreshMe } from './GameCanvas';
import { Tabs, useTab } from './Tabs';
const CAP = { human: 'Hôtel de Ville', demon: 'Bastion Infernal', angel: 'Sanctuaire de la Providence' };
const RACE = { human: 'Humains', demon: 'Démons', angel: 'Anges' };
export const itemStat = i => i.weapon_damage ? `Arme ×${i.weapon_damage}` : i.armor ? `Armure +${i.armor}` : 'Outil / parchemin';
const Empty = ({ children }) => <p className="cap-empty">{children}</p>;
export default function Capital() {
  const { me } = useSelector(s => s.game), d = useDispatch(), run = useDo(), refresh = useRefreshMe();
  const [shop, ls] = useData(`/shop?characterId=${me.id}`), [mk, lm] = useData(`/market/${me.id}`), [ch, lc] = useData(`/chest/${me.id}`), [known, lk] = useData(`/spells/${me.id}`), [inv, li] = useData(`/inventory/${me.id}`);
  const [price, setPrice] = useState(150), [sell, setSell] = useState('');
  const all = () => { ls(); lm(); lc(); li(); lk(); refresh(); }, act = (f, ok, then) => run(f, () => { all(); then?.(); if (ok) d(A.toast(ok)); });
  const bag = inv?.items.filter(i => !i.equipped_slot && !i.in_chest) ?? [];
  const [tab, setTab] = useTab('capital', ['shop', 'spells', 'market', 'chest']);
  const tabs = [['shop', 'Boutique', Store], ['spells', 'Sorts', Sparkles], ['market', 'Marché', ShoppingBag, mk?.length], ['chest', 'Coffre', Package, ch?.items.length]];
  const full = ch ? ch.items.length >= ch.size : false;
  return <Modal onClose={() => d(A.setPanel(null))} className="inv capital" label="Capitale de faction">
    <header className="cap-head">
      <div><h3>{CAP[me.race]}</h3><small>Toutes les interactions ici coûtent 0 énergie.</small></div><span className="grow" />
      <span className="cap-gold"><Coins size={16} /> {me.gold} <small>or</small></span>
      <button className="x" aria-label="Fermer" onClick={() => d(A.setPanel(null))}><X size={14} /></button>
    </header>
    <Tabs tabs={tabs} value={tab} onChange={setTab} label="Services de la capitale" />

    {tab === 'shop' && <section className="cap-pane">
      <p className="cap-hint">Réserve de la faction : outils de récolte, armes, armures et parchemins de base.</p>
      {shop && !shop.items.length && <Empty>La réserve est vide.</Empty>}
      <div className="cap-grid">{shop?.items.map(i => { const poor = me.gold < i.price, out = i.stock <= 0;
        return <article key={i.id} className={`cap-card${out ? ' out' : ''}`}><b>{i.name}</b><small>{itemStat(i)}</small>
          <div className="cap-foot"><span className={`stock${out ? ' none' : ''}`}>{out ? 'Épuisé' : `Stock ${i.stock}`}</span>
            <button className="primary sm" disabled={out || poor} title={poor ? 'Or insuffisant' : ''} onClick={() => act(() => api('/shop/buy', { characterId: me.id, itemId: i.id }), `${i.name} acheté`)}><Coins size={13} /> {i.price}</button></div></article>; })}</div>
    </section>}

    {tab === 'spells' && <section className="cap-pane">
      <p className="cap-hint">Sorts de base enseignés par la faction.</p>
      {shop && !shop.spells.length && <Empty>Aucun sort enseigné ici.</Empty>}
      <div className="cap-grid">{shop?.spells.map(sp => { const has = known?.spells.some(k => k.id === sp.id), poor = me.gold < sp.price;
        return <article key={sp.id} className={`cap-card${has ? ' owned' : ''}`}><b>{sp.name}</b><small>{sp.description}</small>
          <div className="cap-foot"><span className="stock">⚡ {sp.energy_cost}</span>
            {has ? <span className="pill ok"><Check size={13} /> Appris</span>
              : <button className="primary sm" disabled={poor} title={poor ? 'Or insuffisant' : ''} onClick={() => act(() => api('/shop/learn', { characterId: me.id, spellId: sp.id }), `${sp.name} appris`)}><Coins size={13} /> {sp.price}</button>}</div></article>; })}</div>
    </section>}

    {tab === 'market' && <section className="cap-pane">
      <p className="cap-hint">Marché des {RACE[me.race] ?? 'joueurs'} : offres entre joueurs de votre race.</p>
      <h4>Offres en cours</h4>
      {mk && !mk.length && <Empty>Aucune offre pour le moment.</Empty>}
      <div className="cap-grid">{mk?.map(l => <article key={l.id} className="cap-card"><b>{l.name}</b><small>{l.kind === 'item' ? 'Objet' : l.kind}</small>
        <div className="cap-foot"><span className="grow" /><button className="primary sm" disabled={me.gold < l.price} onClick={() => act(() => api(`/market/${l.id}/buy`, { characterId: me.id }), `${l.name} acheté`)}><Coins size={13} /> {l.price}</button></div></article>)}</div>
      <h4><Tag size={14} /> Mettre en vente</h4>
      {bag.length ? <div className="cap-sell">
        <select value={sell} onChange={e => setSell(e.target.value)} aria-label="Objet du sac à vendre"><option value="">— Objet du sac —</option>{bag.map((b, i) => <option key={b.id + '-' + i} value={b.id}>{b.name}</option>)}</select>
        <label className="cap-price"><input type="number" min={10} step={10} value={price} onChange={e => setPrice(+e.target.value)} aria-label="Prix" /><small>or</small></label>
        <button className="primary" disabled={!sell || price < 10} onClick={() => act(() => api('/market/list', { characterId: me.id, kind: 'item', refId: Number(sell), price }), 'Offre publiée', () => setSell(''))}>Vendre</button>
      </div> : <Empty>Votre sac est vide.</Empty>}
    </section>}

    {tab === 'chest' && <section className="cap-pane">
      <div className="cap-chesthead"><div><b>Coffre personnel</b><small>{ch?.items.length ?? 0} / {ch?.size ?? '…'} espaces</small></div>
        <span className="cap-meter"><i style={{ '--p': ch ? (100 * ch.items.length) / Math.max(1, ch.size) : 0 }} /></span>
        <button disabled={!ch || me.gold < ch.nextCost} onClick={() => act(() => api('/chest/expand', { characterId: me.id }), 'Coffre agrandi')}><PlusCircle size={14} /> +1 espace — {ch?.nextCost ?? '…'} or</button></div>
      <div className="cap-cols">
        <div><h4>Coffre</h4>{ch && !ch.items.length && <Empty>Votre coffre est vide.</Empty>}
          {ch?.items.map((i, k) => <div key={i.id + '-' + k} className="cap-row"><span>{i.name}</span><button className="sm" onClick={() => act(() => api('/chest/move', { characterId: me.id, itemId: i.id, to: 'bag' }))}><ArrowLeft size={13} /> Sac</button></div>)}</div>
        <div><h4>Sac</h4>{!bag.length && <Empty>Votre sac est vide.</Empty>}
          {bag.map((b, i) => <div key={b.id + '-' + i} className="cap-row"><span>{b.name}</span><button className="sm" disabled={full} title={full ? 'Coffre plein' : ''} onClick={() => act(() => api('/chest/move', { characterId: me.id, itemId: b.id, to: 'chest' }))}>Coffre <ArrowRight size={13} /></button></div>)}</div>
      </div>
    </section>}
  </Modal>;
}
