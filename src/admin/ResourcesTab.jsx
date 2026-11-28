// Section admin « Ressources » : carte du monde (terrain + ressource de chaque case), ressources naturelles du terrain, secteurs
// tracés sur la carte. Un secteur contient une ou plusieurs ressources : part des cases (%), type de case éventuel, stock propre,
// régénération, quantité par récolte. Une seule ressource par case ; la part restante garde la ressource naturelle.
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { terrain } from '../lib/terrain';
import { Plus, Trash2, Move, SquareDashed, X, Lock } from 'lucide-react';
import { ActivationEditor } from './BuildingExtras.jsx'; import { groupDraft, activationBody, activationSummary } from './building.js';
import Pick from './Pick.jsx';
import { Empty, confirmDel } from './ui.jsx';
import ResourceMap, { RES_COLOR } from './ResourceMap.jsx';
import { KINDS, KIND_NAME, sectorDraft, sectorBody, zoneLabel, shareTotals, overLimit, newShare, naturalScan, cellResource, sortSectors } from './deposits.js';
import { WORLD_LABEL } from './tiles.js';

const Dot = ({ id }) => <i className="resdot" style={{ background: RES_COLOR[id] ?? '#ccc' }} />;
export default function ResourcesTab() {
  const d = useDispatch();
  const [cat, setCat] = useState({}), [rules, setRules] = useState([]), [rule, setRule] = useState(null);
  const [maps, setMaps] = useState([]), [res, setRes] = useState([]), [world, setWorld] = useState(1), [rows, setRows] = useState(null);
  const [edit, setEdit] = useState(null), [f, setF] = useState(sectorDraft()), [tool, setTool] = useState('select'), [showRes, setShowRes] = useState(true), [focus, setFocus] = useState(null), [hover, setHover] = useState(null);
  const load = () => api(`/admin/content/deposits?mapId=${world}`).then(setRows).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { load(); setEdit(null); setFocus(null); }, [world]);   // corps de bloc
  const loadRules = () => api('/admin/content/resource-rules').then(setRules).catch(e => d(Ad.msg(e.message)));
  useEffect(() => { api('/admin/catalog').then(c => { setCat(c); setMaps(c.maps ?? []); setRes(c.resources ?? []); }).catch(() => {}); loadRules(); }, []);
  const m = maps.find(x => x.id === world) ?? { width: 200, height: 200 };
  const nameOf = Object.fromEntries(res.map(r => [r.id, r.name]));
  const ruleOf = Object.fromEntries(rules.filter(r => r.harvest?.groups?.length).map(r => [r.resource, r.harvest]));   // ressources à conditions de récolte
  const stackOf = Object.fromEntries(rules.map(r => [r.resource, r.stack_max ?? 20]));
  const tuned = rules.filter(r => r.harvest?.groups?.length || (r.stack_max ?? 20) !== 20);
  const openRule = id => { setEdit(null); setRule({ resource: id, stack: stackOf[id] ?? 20, groups: (ruleOf[id]?.groups ?? []).map(groupDraft) }); };
  const saveRule = async () => {
    try { const id = encodeURIComponent(rule.resource);
      await api(`/admin/content/resource-stack/${id}`, { stackMax: Math.max(1, Math.trunc(Number(rule.stack) || 20)) }, 'PUT');
      await api(`/admin/content/resource-rules/${id}`, activationBody(rule.groups), 'PUT'); d(Ad.ok('Réglages de la ressource enregistrés')); setRule(null); loadRules(); }
    catch (e) { d(Ad.msg(e.message)); }
  };
  const Locked = ({ id }) => (ruleOf[id] ? <Lock size={11} className="reslock" aria-label="conditions de récolte" /> : null);
  const natural = useMemo(() => naturalScan(m.width, m.height, (x, y) => terrain(x, y, world)), [world, m.width, m.height]);
  const natList = Object.entries(natural).sort((a, b) => b[1].n - a[1].n);

  const open = (r, zone) => { setRule(null); setEdit(r ? r.id : 'new'); setF(sectorDraft(r, world, zone)); };
  const u = (k, v) => setF({ ...f, [k]: v });
  const us = (i, k, v) => setF({ ...f, resources: f.resources.map((s, j) => (j === i ? { ...s, [k]: v } : s)) });
  const body = edit ? sectorBody(f, world) : null, over = edit ? overLimit(f.resources) : [];
  // Aperçu en direct : le secteur en cours d'édition remplace sa version enregistrée sur la carte.
  const preview = useMemo(() => {
    if (!rows) return [];
    if (!body) return rows;
    const me = { id: edit === 'new' ? -1 : edit, active: body.active, x_min: body.xMin, x_max: body.xMax, y_min: body.yMin, y_max: body.yMax, resources: body.resources };
    return [...rows.filter(r => r.id !== edit), me];
  }, [rows, edit, f]);
  const save = async () => {
    try { await api(edit === 'new' ? '/admin/content/deposits' : `/admin/content/deposits/${edit}`, body, edit === 'new' ? 'POST' : 'PUT'); d(Ad.ok('Secteur enregistré')); setEdit(null); load(); }
    catch (e) { d(Ad.msg(e.message)); }
  };
  const del = async r => { if (!confirmDel(`le secteur ${r.name || zoneLabel(r)}`)) return; try { await api(`/admin/content/deposits/${r.id}`, undefined, 'DELETE'); d(Ad.ok('Secteur supprimé')); setEdit(null); load(); } catch (e) { d(Ad.msg(e.message)); } };
  const covering = t => sortSectors(rows).find(r => t.x >= r.x_min && t.x <= r.x_max && t.y >= r.y_min && t.y <= r.y_max) ?? rows?.find(r => t.x >= r.x_min && t.x <= r.x_max && t.y >= r.y_min && t.y <= r.y_max);
  const onCell = t => { if (edit) return; const r = covering(t); if (r) open(r); else if (tool === 'select') open(null, { xMin: t.x, yMin: t.y, xMax: t.x, yMax: t.y }); };
  const onZone = z => (edit ? setF({ ...f, ...z }) : open(null, z));
  const ht = hover && terrain(hover.x, hover.y, world), hr = hover && cellResource(hover.x, hover.y, ht, sortSectors(preview));
  const totals = edit ? shareTotals(f.resources) : {};

  return <section className="restab">
    <p className="note">Chaque case du terrain porte déjà une ressource naturelle (récolte illimitée, +1). Un secteur tracé sur la carte la remplace par ses propres
      ressources : part des cases en %, type de case éventuel (ex. bois → forêt), stock partagé par ses cases, régénération par heure. Une seule ressource par case ; la part restante garde la ressource naturelle.</p>
    <div className="tabs">{(maps.length ? maps : [{ id: 1 }, { id: 2 }, { id: 3 }]).map(x => <button key={x.id} className={world === x.id ? 'on' : ''} onClick={() => setWorld(x.id)}>{WORLD_LABEL[x.id] ?? x.name_file}</button>)}</div>
    <div className="resgrid">
      <div className="resmapcol">
        <div className="filterrow">
          <div className="seg2">
            <button className={`chip${tool === 'select' ? ' on' : ''}`} onClick={() => setTool('select')}><SquareDashed size={13} /> Tracer un secteur</button>
            <button className={`chip${tool === 'pan' ? ' on' : ''}`} onClick={() => setTool('pan')}><Move size={13} /> Déplacer</button>
          </div><span className="grow" />
          <label className="check"><input type="checkbox" checked={showRes} onChange={e => setShowRes(e.target.checked)} /> Ressources</label>
          {focus && <button className="chip on" onClick={() => setFocus(null)}><Dot id={focus} /> {nameOf[focus] ?? focus} <X size={12} /></button>}
        </div>
        <ResourceMap width={m.width} height={m.height} mapId={world} sectors={preview} selected={edit === 'new' ? -1 : edit} draft={null} focus={focus} showRes={showRes} tool={tool}
          onZone={onZone} onCell={onCell} onHover={setHover} />
        <small className="reshover">{hover ? <>Case {hover.x}, {hover.y} · {KIND_NAME[ht.kind]}{ht.zone ? ` (${ht.zone})` : ''} · {hr
          ? <><Dot id={hr.id} /> {nameOf[hr.id] ?? hr.id} {hr.sector ? `— secteur ${hr.sector.name || zoneLabel(hr.sector)}` : '— naturelle'}</> : 'aucune ressource'}</>
          : tool === 'select' ? 'Glissez sur la carte pour tracer un secteur ; cliquez un secteur pour l’ouvrir. Molette : zoom.' : 'Glissez pour déplacer la vue. Molette : zoom.'}</small>
      </div>

      <aside className="resside">
        {rule ? <div className="editor apanel">
          <h3><Dot id={rule.resource} /> Réglages — {nameOf[rule.resource] ?? rule.resource}</h3>
          <div className="form"><div className="cell"><small>Quantité par emplacement (sac et coffre)</small><input type="number" min="1" value={rule.stack} onChange={e => setRule({ ...rule, stack: e.target.value })} /></div>
            <div className="cell"><small>&nbsp;</small><small className="note">Ex. 20 : 45 unités occupent 3 emplacements du sac.</small></div></div>
          <h4>Conditions de récolte</h4>
          <ActivationEditor groups={rule.groups} set={g => setRule({ ...rule, groups: g })} cat={cat} title={null} itemHint="— Objet (équipé ou sac) —"
            consumeLabel="Consommés à chaque récolte (objets, ressources, or)"
            note="Valent partout : terrain naturel et secteurs. Il suffit de remplir UNE option ; dans une option, tout ce qui est renseigné est exigé (ex. une hache OU le sort « Sève »). Un objet compte s'il est équipé ou dans le sac. Aucune option : récolte libre." />
          <div className="actions"><span className="grow" /><button className="ghost" onClick={() => setRule(null)}>Annuler</button><button className="primary" onClick={saveRule}>Enregistrer</button></div>
        </div> : edit ? <div className="editor apanel">
          <h3>{edit === 'new' ? 'Nouveau secteur' : 'Secteur'} — {WORLD_LABEL[world] ?? `monde ${world}`}</h3>
          <div className="form">
            <div className="cell span2"><small>Nom</small><input value={f.name} maxLength={60} placeholder="ex. Forêt des Brumes" onChange={e => u('name', e.target.value)} /></div>
            <div className="cell"><small>X min</small><input type="number" min="0" value={f.xMin} onChange={e => u('xMin', e.target.value)} /></div>
            <div className="cell"><small>Y min</small><input type="number" min="0" value={f.yMin} onChange={e => u('yMin', e.target.value)} /></div>
            <div className="cell"><small>X max</small><input type="number" min="0" value={f.xMax} onChange={e => u('xMax', e.target.value)} /></div>
            <div className="cell"><small>Y max</small><input type="number" min="0" value={f.yMax} onChange={e => u('yMax', e.target.value)} /></div>
            <div className="cell span-all"><small>{zoneLabel({ x_min: body.xMin, x_max: body.xMax, y_min: body.yMin, y_max: body.yMax })} — retracez sur la carte pour changer la zone.</small>
              <label className="check"><input type="checkbox" checked={f.active} onChange={e => u('active', e.target.checked)} /> Actif</label></div>
          </div>
          <h4>Ressources du secteur</h4>
          {!f.resources.length && <Empty>Ajoutez au moins une ressource.</Empty>}
          {f.resources.map((s, i) => <div key={s.resource} className="shareline">
            <div className="sharehead"><Dot id={s.resource} /><b>{nameOf[s.resource] ?? s.resource}</b><Locked id={s.resource} /><span className="grow" />
              <button className="sm" title="Objets ou sorts exigés pour récolter cette ressource" onClick={() => openRule(s.resource)}>Conditions</button>
              <button className="sm danger" title="Retirer" onClick={() => setF({ ...f, resources: f.resources.filter((_, j) => j !== i) })}><Trash2 size={13} /></button></div>
            <div className="form">
              <div className="cell"><small>Part des cases</small><div className="pct"><input type="number" min="1" max="100" value={s.percent} onChange={e => us(i, 'percent', e.target.value)} /><span>%</span></div></div>
              <div className="cell"><small>Type de case</small><select value={s.kind} onChange={e => us(i, 'kind', e.target.value)}><option value="">Toute case</option>{KINDS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div>
              <div className="cell"><small>Stock max</small><input type="number" min="1" value={s.stockMax} onChange={e => us(i, 'stockMax', e.target.value)} /></div>
              <div className="cell"><small>Stock actuel</small><input type="number" min="0" value={s.stock} onChange={e => us(i, 'stock', e.target.value)} /></div>
              <div className="cell"><small>Régén. / heure</small><input type="number" min="0" value={s.regenPerH} onChange={e => us(i, 'regenPerH', e.target.value)} /></div>
              <div className="cell"><small>Par récolte</small><input type="number" min="1" value={s.yieldPerHarvest} onChange={e => us(i, 'yieldPerHarvest', e.target.value)} /></div>
            </div></div>)}
          <div className="cell"><Pick options={res.filter(r => !f.resources.some(s => s.resource === r.id))} value="" placeholder="+ Ajouter une ressource"
            labelOf={o => `${o.name}${natural[o.id] ? ` · ${KIND_NAME[natural[o.id].kind]}` : o.group ? ` · ${o.group}` : ''}`}
            onPick={id => id && setF({ ...f, resources: [...f.resources, newShare(id, natural[id]?.kind ?? '', f.resources)] })} /></div>
          {Object.keys(totals).length > 0 && <div className="sharetotals">{Object.entries(totals).map(([k, v]) => <div key={k} className={v > 100 ? 'over' : ''}>
            <small>{KIND_NAME[k]}</small><span className="stockbar"><i style={{ '--p': Math.min(100, v) }} /></span><small>{v} %{v < 100 ? ` · ${100 - v} % naturel` : v > 100 ? ' — trop !' : ''}</small></div>)}</div>}
          {over.length > 0 && <p className="note err">Le total des parts dépasse 100 % : {over.join(', ')}.</p>}
          <div className="actions">{edit !== 'new' && <button className="danger" onClick={() => del(rows.find(r => r.id === edit))}><Trash2 size={13} /> Supprimer</button>}<span className="grow" />
            <button className="ghost" onClick={() => setEdit(null)}>Annuler</button>
            <button className="primary" disabled={!f.resources.length || over.length > 0} onClick={save}>Enregistrer</button></div>
        </div> : <>
          <div className="filterrow"><h4>Secteurs <small>{rows ? rows.length : '…'}</small></h4><span className="grow" />
            <button className="sm" onClick={() => open(null, { xMin: 0, yMin: 0, xMax: Math.min(9, m.width - 1), yMax: Math.min(9, m.height - 1) })}><Plus size={14} /> Nouveau</button></div>
          {rows && !rows.length && <Empty>Aucun secteur : tracez-en un sur la carte.</Empty>}
          <div className="sectorlist">{rows?.map(r => <button key={r.id} className={`sector${r.active ? '' : ' off'}`} onClick={() => open(r)}>
            <b>{r.name || 'Secteur sans nom'}</b><small>{zoneLabel(r)}{r.active ? '' : ' · inactif'}</small>
            {r.resources.map(s => <span key={s.id} className="shareline sm"><Dot id={s.resource} />{s.resource_name}<Locked id={s.resource} /> <small>{s.percent} %{s.kind ? ` · ${KIND_NAME[s.kind]}` : ''}</small><span className="grow" />
              <span className={`stockbar${s.stock ? '' : ' empty0'}`}><i style={{ '--p': (100 * s.stock) / s.stock_max }} /></span><small>{s.stock}/{s.stock_max}</small></span>)}
          </button>)}</div>
          <h4>Carte des ressources <small>amélioration vendue à l'Hôtel de ville</small></h4>
          <small className="note">Prix : celui du parchemin de carte des ressources du monde (catalogue Objets) ; il suit ses changements.</small>
          <small className="note">Le joueur qui l'achète peut, sur sa carte du monde, choisir une ressource pour la mettre en valeur (comme cette carte). Accordable aussi depuis la fiche du joueur.</small>
          <h4>Réglages des ressources <small>quantité par emplacement · conditions de récolte</small></h4>
          {tuned.length > 0 && <div className="sectorlist">{tuned.map(r => <button key={r.resource} className="sector" onClick={() => openRule(r.resource)}>
            <span className="shareline sm"><Dot id={r.resource} /><b>{r.resource_name}</b><span className="grow" /><small>{r.stack_max ?? 20} / emplacement</small></span>
            <small>{r.harvest?.groups?.length ? `Récolte : ${r.needs || activationSummary(r.harvest)}` : 'Récolte libre'}</small></button>)}</div>}
          <Pick options={res} value="" placeholder="+ Régler une ressource (par emplacement, conditions)" labelOf={o => `${o.name} · ${stackOf[o.id] ?? 20} / emplacement`} onPick={id => id && openRule(id)} />
          <h4>Ressources naturelles <small>{natList.length} · cliquez pour les repérer</small></h4>
          <div className="natlist">{natList.map(([id, e]) => <button key={id} className={`chip${focus === id ? ' on' : ''}`} onClick={() => setFocus(focus === id ? null : id)}>
            <Dot id={id} />{nameOf[id] ?? id}<Locked id={id} /><small>{e.n} · {KIND_NAME[e.kind]}</small></button>)}</div>
        </>}
      </aside>
    </div>
  </section>;
}
