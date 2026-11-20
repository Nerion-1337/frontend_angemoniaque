import { useEffect, useState } from 'react'; import { api } from '../lib/api';
import { lootLabel, spawnBody } from './bestiary.js';
import { useDispatch } from 'react-redux'; import { Ad } from '../store/admin.js';
/**
 * Bestiaire (Étape 2 phase 2) : tables de butin par monstre (objets, ressources, objets
 * divins avec chance % et quantité), règles de spawn (carte, zone, plafond, fréquence,
 * probabilité), présence sur carte et gardiens d'objets divins.
 */
export default function Bestiary() {
  const d = useDispatch();
  const [monsters, setMonsters] = useState([]), [cats, setCats] = useState(null), [divs, setDivs] = useState(null), [status, setStatus] = useState(null);
  const [sel, setSel] = useState(''), [loot, setLoot] = useState(null), [spawns, setSpawns] = useState(null);
  const [nl, setNl] = useState({ type: 'item', itemId: '', divineId: '', resource: 'bois', dropRate: 100, qtyMin: 1, qtyMax: 1 });
  const [ns, setNs] = useState({ mapId: 1, xMin: 100, yMin: 100, xMax: 104, yMax: 104, maxInstances: 1, intervalH: 1, probability: 100 });
  const load = () => {
    api('/admin/content/monsters').then(setMonsters).catch(e => d(Ad.msg(e.message)));
    api('/admin/catalog').then(setCats).catch(() => {});
    api('/admin/content/divine').then(setDivs).catch(() => {});
    api('/admin/bestiary/status').then(setStatus).catch(() => {});
  };
  useEffect(load, []);
  const open = async id => {
    setSel(id);
    const [l, sp] = await Promise.all([
      api(`/admin/content/monsters/${id}/loot`).catch(e => { d(Ad.msg(e.message)); return []; }),
      api(`/admin/content/monsters/${id}/spawns`).catch(e => { d(Ad.msg(e.message)); return []; })
    ]);
    setLoot(l); setSpawns(sp);
  };
  const addLoot = async () => {
    const body = { dropRate: Number(nl.dropRate), qtyMin: Number(nl.qtyMin), qtyMax: Number(nl.qtyMax) };
    if (nl.type === 'item') body.itemId = Number(nl.itemId);
    else if (nl.type === 'divine') body.divineId = Number(nl.divineId);
    else body.resource = nl.resource;
    try { await api(`/admin/content/monsters/${sel}/loot`, body); d(Ad.msg('Entrée de butin ajoutée')); await open(sel); } catch (e) { d(Ad.msg(e.message)); }
  };
  const delLoot = async id => { try { await api(`/admin/content/monsters/${sel}/loot/${id}`, undefined, 'DELETE'); d(Ad.msg('Supprimée')); await open(sel); } catch (e) { d(Ad.msg(e.message)); } };
  const addSpawn = async () => {
    const b = spawnBody(ns);
    try { await api(`/admin/content/monsters/${sel}/spawns`, b); d(Ad.msg('Règle de spawn ajoutée')); await open(sel); } catch (e) { d(Ad.msg(e.message)); }
  };
  const delSpawn = async id => { try { await api(`/admin/content/monsters/${sel}/spawns/${id}`, undefined, 'DELETE'); d(Ad.msg('Supprimée')); await open(sel); } catch (e) { d(Ad.msg(e.message)); } };
  const toggleSpawn = async r => { try { await api(`/admin/content/monsters/${sel}/spawns/${r.id}`, { active: !r.active }, 'PUT'); d(Ad.msg(r.active ? 'Règle désactivée' : 'Règle activée')); await open(sel); } catch (e) { d(Ad.msg(e.message)); } };
  const tick = async () => { try { await api('/admin/tick', {}); d(Ad.msg('Tick horaire simulé')); load(); } catch (e) { d(Ad.msg(e.message)); } };
  return <section>
    <div className="headrow"><h2>Bestiaire — butin &amp; apparitions</h2></div>
    <div className="form">
      <div className="cell"><small>Monstre</small><select value={sel} onChange={e => open(e.target.value)}>
        <option value="">— Choisir —</option>{monsters.map(m => <option key={m.id} value={m.id}>{m.name} · n°{m.id}</option>)}</select></div>
      {status && <button className="sm" onClick={tick}>+ Tick horaire (spawn)</button>}
    </div>
    {sel !== '' && (
      <>
        <div className="editor"><h3>Table de butin {loot?.length ? `(${loot.length})` : ''}</h3>
          {(loot ?? []).map(l => <span key={l.id} className="tag">
            <b>{lootLabel(l)}</b>
            {l.drop_rate} %{l.qty_min !== 1 ? ` ×${l.qty_min}–${l.qty_max}` : ''}
            <button className="sm danger" onClick={() => delLoot(l.id)}>×</button></span>)}
          <div className="form">
            <div className="cell"><small>Type</small><select value={nl.type} onChange={e => setNl({ ...nl, type: e.target.value })}>
              <option value="item">Objet classique</option><option value="divine">Objet divin</option><option value="resource">Ressource</option></select></div>
            {nl.type === 'item' && cats && <div className="cell"><small>Objet</small><select value={nl.itemId} onChange={e => setNl({ ...nl, itemId: e.target.value })}>
              <option value="">—</option>{cats.items.map(i => <option key={i.id} value={i.id}>{i.name} (n°{i.id})</option>)}</select></div>}
            {nl.type === 'divine' && divs && <div className="cell"><small>Objet divin</small><select value={nl.divineId} onChange={e => setNl({ ...nl, divineId: e.target.value })}>
              <option value="">—</option>{divs.map(i => <option key={i.id} value={i.id}>{i.kind} n°{i.id} {i.holder ? `(détenu : ${i.holder})` : '(libre)'}</option>)}</select></div>}
            {nl.type === 'resource' && <div className="cell"><small>Ressource</small><input value={nl.resource} onChange={e => setNl({ ...nl, resource: e.target.value })} placeholder="bois, fer, granit…" /></div>}
            <div className="cell"><small>Chance (%)</small><input type="number" min="0" max="100" value={nl.dropRate} onChange={e => setNl({ ...nl, dropRate: e.target.value })} /></div>
            {nl.type !== 'divine' && <div className="cell"><small>Qté min</small><input type="number" min="1" value={nl.qtyMin} onChange={e => setNl({ ...nl, qtyMin: e.target.value })} /></div>}
            {nl.type !== 'divine' && <div className="cell"><small>Qté max</small><input type="number" min="1" value={nl.qtyMax} onChange={e => setNl({ ...nl, qtyMax: e.target.value })} /></div>}
            <button onClick={addLoot}>+ Ajouter</button>
          </div>
          <p className="note">La chance affichée est multipliée par le paramètre global <code>drop_rate</code> (Pilotage → config). Les divins se transfèrent au vainqueur (plafonds de détention respectés, jamais de duplication).</p>
        </div>

        <div className="editor"><h3>Règles d'apparition {spawns?.length ? `(${spawns.length})` : ''}</h3>
          {(spawns ?? []).map(r => <div key={r.id} className="rank">
            <button className="sm" onClick={() => toggleSpawn(r)}>{r.active ? 'active' : 'désact.'}</button>
            <span>carte {r.map_name} · [{r.x_min},{r.y_min}]→[{r.x_max},{r.y_max}] · cap {r.max_instances} · tous les {r.interval_h} h · {r.probability} %</span>
            <button className="sm danger" onClick={() => delSpawn(r.id)}>×</button></div>)}
          <div className="form">
            <div className="cell"><small>Carte</small><select value={ns.mapId} onChange={e => setNs({ ...ns, mapId: e.target.value })}>
              {(cats?.maps ?? []).map(m => <option key={m.id} value={m.id}>{m.name_file} ({m.width}×{m.height})</option>)}</select></div>
            <div className="cell"><small>x min</small><input type="number" value={ns.xMin} onChange={e => setNs({ ...ns, xMin: e.target.value })} /></div>
            <div className="cell"><small>y min</small><input type="number" value={ns.yMin} onChange={e => setNs({ ...ns, yMin: e.target.value })} /></div>
            <div className="cell"><small>x max</small><input type="number" value={ns.xMax} onChange={e => setNs({ ...ns, xMax: e.target.value })} /></div>
            <div className="cell"><small>y max</small><input type="number" value={ns.yMax} onChange={e => setNs({ ...ns, yMax: e.target.value })} /></div>
            <div className="cell"><small>Max instances</small><input type="number" min="1" value={ns.maxInstances} onChange={e => setNs({ ...ns, maxInstances: e.target.value })} /></div>
            <div className="cell"><small>Fréquence (h)</small><input type="number" min="0" value={ns.intervalH} onChange={e => setNs({ ...ns, intervalH: e.target.value })} /></div>
            <div className="cell"><small>Probabilité (%)</small><input type="number" min="0" max="100" value={ns.probability} onChange={e => setNs({ ...ns, probability: e.target.value })} /></div>
            <button onClick={addSpawn}>+ Ajouter</button>
          </div>
          <p className="note">Au tick horaire, l'apparition ne se crée que si les plafonds (max instances + caps entity_caps global/per_zone) ne sont pas atteints et qu'une case libre existe dans la zone (unicité de case).</p>
        </div>
      </>
    )}
    {status && (
      <div className="editor"><h3>Présence sur les cartes ({status.instances.length})</h3>
        {status.instances.length === 0 && <p className="note">Aucun monstre placé.</p>}
        {status.instances.length > 0 && <table>
          <thead><tr><th>Monstre</th><th>Carte</th><th>Case</th><th>PV</th><th>Type</th></tr></thead>
          <tbody>{status.instances.map(i => <tr key={i.id}>
            <td>{i.name}</td><td>{i.map_id}</td><td>{i.x},{i.y}</td><td>{i.hp_current}/{i.hp_max}</td>
            <td>{i.spawned ? 'sauvage (spawn)' : 'ancré'}</td></tr>)}</tbody>
        </table>}
        <h3>Gardiens d'objets divins ({status.guardians.length})</h3>
        <table>
          <thead><tr><th>Kind</th><th>N°</th><th>Gardien (monstre)</th><th>Détenteur</th></tr></thead>
          <tbody>{status.guardians.map(g => <tr key={g.id}>
            <td>{g.kind}</td><td>n°{g.id}</td><td>{g.guardian ?? '—'}</td>
            <td>{g.holder || <b>libre</b>}</td></tr>)}</tbody>
        </table>
      </div>
    )}
  </section>;
}
