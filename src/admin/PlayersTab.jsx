// Section admin « Joueurs » : liste paginée de tous les personnages par race (pseudo, rang, position, XP, or),
// et fiche éditable : caractéristiques, XP, or, rang ; objets (équipés / sac / coffre-fort), sorts,
// bâtiments et objets divins possédés.
import { useEffect, useState } from 'react'; import { WORLDS } from '../lib/worlds.js';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Plus, Trash2, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import Pick from './Pick.jsx';
import { Search, Empty, confirmDel } from './ui.jsx';
import { RACE_LABEL, PLACE_LABEL, STAT_GROUPS, statDiff, posLabel, pageWindow } from './players.js';

const PER = 20;
export default function PlayersTab() {
  const d = useDispatch();
  const [race, setRace] = useState(''), [q, setQ] = useState(''), [page, setPage] = useState(1), [res, setRes] = useState(null), [sel, setSel] = useState(null);
  const load = () => {
    const p = new URLSearchParams({ page: String(page), per: String(PER) });
    if (race) p.set('race', race); if (q.trim()) p.set('q', q.trim());
    api(`/admin/players?${p}`).then(setRes).catch(e => d(Ad.msg(e.message)));
  };
  useEffect(() => { load(); }, [race, page, q]);   // corps de bloc : l'effet ne retourne jamais la Promise du loader
  const total = res?.races.reduce((a, r) => a + r.n, 0) ?? 0;
  return <section>
    <div className="tabs">
      <button className={race === '' ? 'on' : ''} onClick={() => { setRace(''); setPage(1); }}>Toutes races ({total})</button>
      {res?.races.map(r => <button key={r.race} className={race === r.race ? 'on' : ''} onClick={() => { setRace(r.race); setPage(1); }}>{RACE_LABEL[r.race] ?? r.race} ({r.n})</button>)}
    </div>
    {sel && <PlayerSheet id={sel} close={() => setSel(null)} onSaved={load} />}
    <div className="filterrow"><Search value={q} onChange={v => { setQ(v); setPage(1); }} placeholder="Pseudo ou e-mail…" /><small>{res ? `${res.total} joueur(s)` : 'Chargement…'}</small></div>
    <div className="tablewrap"><table><thead><tr><th>Pseudo</th><th>Race</th><th>Rang</th><th>Position</th><th>XP</th><th>Or</th><th /></tr></thead><tbody>
      {res?.rows.map(r => <tr key={r.id} className={sel === r.id ? 'sel' : ''}>
        <td><b>{r.pseudo}</b>{r.blocked && <span className="badge-blocked">bloqué</span>}<br /><small>{r.email}</small></td>
        <td>{RACE_LABEL[r.race] ?? r.race}</td>
        <td>{r.rank_name ?? '—'}{r.current_rank != null && <small> · palier {r.current_rank}</small>}</td>
        <td>{posLabel(r)}</td><td>{r.xp}</td><td>{r.gold}</td>
        <td><button className="sm" onClick={() => setSel(sel === r.id ? null : r.id)}>{sel === r.id ? 'Fermer' : 'Éditer'}</button></td>
      </tr>)}</tbody></table></div>
    {res && !res.rows.length && <Empty>Aucun joueur.</Empty>}
    {res && res.pages > 1 && <div className="pager">
      <button className="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}><ChevronLeft size={14} /></button>
      {pageWindow(page, res.pages).map(n => <button key={n} className={`sm${n === page ? ' on' : ''}`} onClick={() => setPage(n)}>{n}</button>)}
      <button className="sm" disabled={page >= res.pages} onClick={() => setPage(page + 1)}><ChevronRight size={14} /></button>
      <small>page {page} / {res.pages}</small>
    </div>}
  </section>;
}

const TABS = [['stats', 'Caractéristiques'], ['items', 'Objets'], ['spells', 'Sorts'], ['buildings', 'Structures'], ['divine', 'Objets divins']];
/** Fiche d'un joueur : onglets d'édition. */
function PlayerSheet({ id, close, onSaved }) {
  const d = useDispatch(), [p, setP] = useState(null), [tab, setTab] = useState('stats'), [form, setForm] = useState({}), [cat, setCat] = useState(null), [free, setFree] = useState([]);
  const [ni, setNi] = useState({ itemId: '', qty: 1, place: 'bag' }), [ns, setNs] = useState(''), [nd, setNd] = useState(''), [tp, setTp] = useState({ map: '', x: '', y: '' });
  const load = () => api(`/admin/players/${id}`).then(v => { setP(v); setForm({ ...v.character }); setTp({ map: v.character.map_id ?? 1, x: v.character.x ?? 0, y: v.character.y ?? 0 }); }).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); }, [id]);   // corps de bloc
  useEffect(() => { api('/admin/catalog').then(setCat).catch(() => {}); }, []);
  useEffect(() => { if (tab === 'divine') api('/admin/content/divine').then(r => setFree(r.filter(x => x.holder === 'libre'))).catch(() => {}); }, [tab, p]);
  const run = (f, ok) => async () => { try { await f(); if (ok) d(Ad.ok(ok)); load(); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  if (!p) return <div className="editor apanel"><Empty>Chargement…</Empty></div>;
  const ch = p.character, diff = statDiff(ch, form);
  const saveStats = run(() => api(`/admin/players/${id}`, diff, 'PUT'), 'Fiche enregistrée');
  const teleport = run(() => api(`/admin/players/${id}/teleport`, { map: +tp.map, x: +tp.x, y: +tp.y }, 'POST'), 'Joueur déplacé');
  const block = run(() => api(`/admin/players/${id}/block`, { blocked: !ch.blocked }, 'POST'), ch.blocked ? 'Joueur débloqué' : 'Joueur bloqué');
  const grant = (kind, refId, ok) => run(() => { if (!refId) throw new Error('Choisir un élément'); return api(`/admin/players/${id}/grant`, { kind, refId: Number(refId) }, 'POST'); }, ok);
  const delWith = (what, url, ok) => async () => { if (!confirmDel(what)) return; await run(() => api(url, undefined, 'DELETE'), ok)(); };
  return <div className="editor apanel sheet">
    <div className="headrow"><h3>{ch.pseudo}</h3><small>{RACE_LABEL[ch.race] ?? ch.race} · {ch.rank_name ?? 'sans rang'} · {posLabel(ch)} · {ch.email}</small><span className="grow" />
      <button className={`sm${ch.blocked ? '' : ' danger'}`} onClick={block}>{ch.blocked ? 'Débloquer' : 'Bloquer'}</button>
      <button className="sm ghost" onClick={close}>Fermer</button></div>
    <div className="tabs">{TABS.map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}{k !== 'stats' && ` (${p[k].length})`}</button>)}</div>

    {tab === 'stats' && <>
      <div className="form">
        <div className="fcell"><small>Rang (palier)</small><select value={form.specialization_id ?? ''} onChange={e => setForm({ ...form, specialization_id: e.target.value })}>
          {p.ranks.map(r => <option key={r.id} value={r.id}>{r.current_rank} · {r.name}</option>)}</select></div>
        <small className="hint">Changer de rang ajoute (ou retire) l'écart des caractéristiques de base entre les deux paliers ; les points achetés sont gardés. Une valeur modifiée ici en même temps prime.</small>
      </div>
      {STAT_GROUPS.map(([g, fields]) => <div key={g}><h4>{g}</h4><div className="form">{fields.map(([k, l]) =>
        <div key={k} className="fcell"><small>{l}</small><input type="number" min="0" value={form[k] ?? ''} onChange={e => setForm({ ...form, [k]: e.target.value })} /></div>)}</div></div>)}
      <h4>Améliorations</h4>
      <div className="row wrap">{Object.entries(WORLDS).map(([w, n]) => { const has = (ch.map_worlds ?? []).includes(+w), next = has ? ch.map_worlds.filter(x => x !== +w) : [...(ch.map_worlds ?? []), +w];
        return <label key={w} className="check"><input type="checkbox" checked={has} onChange={run(() => api(`/admin/players/${id}`, { map_worlds: next }, 'PUT'), has ? `Carte des ressources retirée (${n})` : `Carte des ressources accordée (${n})`)} /> Carte des ressources — {n}</label>; })}</div>
      <h4>Position</h4>
      <div className="row"><select value={tp.map} onChange={e => setTp({ ...tp, map: e.target.value })}>{(cat?.maps ?? [{ id: 1 }, { id: 2 }, { id: 3 }]).map(m => <option key={m.id} value={m.id}>Monde {m.id}{m.name_file ? ` (${m.name_file})` : ''}</option>)}</select>
        <input type="number" className="nb" value={tp.x} onChange={e => setTp({ ...tp, x: e.target.value })} /><input type="number" className="nb" value={tp.y} onChange={e => setTp({ ...tp, y: e.target.value })} />
        <button className="sm" onClick={teleport}>Téléporter</button><small>(case libre la plus proche)</small></div>
      <div className="actions"><small>{Object.keys(diff).length ? `${Object.keys(diff).length} champ(s) modifié(s)` : 'Aucune modification'}</small><span className="grow" />
        <button className="primary" disabled={!Object.keys(diff).length} onClick={saveStats}><Save size={14} /> Enregistrer</button></div>
    </>}

    {tab === 'items' && <>
      <div className="row add">
        <Pick options={cat?.items ?? []} value={ni.itemId} onPick={v => setNi({ ...ni, itemId: v })} labelOf={o => o.name} placeholder="— Objet —" />
        <input type="number" min="1" className="nb" value={ni.qty} onChange={e => setNi({ ...ni, qty: e.target.value })} />
        <select value={ni.place} onChange={e => setNi({ ...ni, place: e.target.value })}><option value="bag">Sac</option><option value="chest">Coffre-fort</option></select>
        <button className="sm" onClick={run(() => { if (!ni.itemId) throw new Error('Choisir un objet'); return api(`/admin/players/${id}/items`, { itemId: Number(ni.itemId), qty: Number(ni.qty) || 1, place: ni.place }, 'POST'); }, 'Objet ajouté')}><Plus size={14} /> Ajouter</button>
        <small>Coffre-fort : {p.items.filter(i => i.place === 'chest').length} / {ch.chest_size ?? '—'}</small>
      </div>
      {['equipped', 'bag', 'chest'].map(pl => { const list = p.items.filter(i => i.place === pl); return <div key={pl}><h4>{PLACE_LABEL[pl]} ({list.length})</h4>
        {list.length ? <div className="tablewrap"><table><thead><tr><th>Objet</th><th>Type</th><th>Emplacement</th><th>Qté</th><th /></tr></thead><tbody>
          {list.map((i, n) => <tr key={`${pl}${i.item_id}-${n}`}><td><b>{i.name}</b> <small>{i.rarity}</small></td><td>{i.slot ?? '—'}</td><td>{i.equipped_slot ?? '—'}</td><td>{i.qty}</td>
            <td><button className="sm danger" title="Retirer" onClick={delWith(`« ${i.name} » (${PLACE_LABEL[pl]})`, `/admin/players/${id}/items/${i.item_id}?place=${pl}`, 'Objet retiré')}><Trash2 size={13} /></button></td></tr>)}
        </tbody></table></div> : <Empty>Vide.</Empty>}</div>; })}
    </>}

    {tab === 'spells' && <>
      <div className="row add"><Pick options={cat?.spells ?? []} value={ns} onPick={setNs} labelOf={o => o.name} placeholder="— Sort —" />
        <button className="sm" onClick={grant('spell', ns, 'Sort ajouté')}><Plus size={14} /> Ajouter</button></div>
      {p.spells.length ? <div className="chips">{p.spells.map(s => <span key={s.spell_id} className="chip on">{s.name}{s.kind && <small> · {s.kind}</small>}
        <button className="x-in" title="Retirer" onClick={delWith(`le sort « ${s.name} »`, `/admin/players/${id}/spells/${s.spell_id}`, 'Sort retiré')}>×</button></span>)}</div> : <Empty>Aucun sort.</Empty>}
    </>}


    {tab === 'buildings' && (p.buildings.length ? <div className="tablewrap"><table><thead><tr><th>Structure</th><th>Type</th><th>Structure</th><th>Position</th><th /></tr></thead><tbody>
      {p.buildings.map(b => <tr key={b.id}><td><b>{b.name}</b> <small>n°{b.id}</small></td><td>{b.kind}</td><td>{b.structure}</td><td>{posLabel(b)}</td>
        <td><button className="sm danger" title="Détruire" onClick={delWith(`la structure « ${b.name} »`, `/admin/players/${id}/buildings/${b.id}`, 'Structure supprimée')}><Trash2 size={13} /></button></td></tr>)}
    </tbody></table></div> : <Empty>Aucune structure.</Empty>)}

    {tab === 'divine' && <>
      <div className="row add"><Pick options={free} value={nd} onPick={setNd} labelOf={o => `${o.item_name ?? o.kind} · n°${o.id}${o.guardian ? ` (gardé par ${o.guardian})` : ''}`} placeholder="— Exemplaire libre —" />
        <button className="sm" onClick={grant('divine', nd, 'Objet divin attribué')}><Plus size={14} /> Attribuer</button></div>
      {p.divine.length ? <div className="tablewrap"><table><thead><tr><th>Objet</th><th>Famille</th><th>Exemplaire</th><th /></tr></thead><tbody>
        {p.divine.map(x => <tr key={x.id}><td><b>{x.name ?? x.kind}</b></td><td>{x.kind}</td><td>n°{x.id}</td>
          <td><button className="sm" onClick={run(() => api(`/admin/players/${id}/divine/${x.id}/release`, undefined, 'POST'), 'Exemplaire libéré')}>Libérer</button></td></tr>)}
      </tbody></table></div> : <Empty>Aucun objet divin.</Empty>}
    </>}
  </div>;
}
