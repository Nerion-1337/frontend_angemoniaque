import { useEffect, useRef, useState, Fragment } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { ShieldCheck, Users, MessageSquare, Settings, Upload, UserPlus, Eye, Shield, Plus, Pencil, ArrowLeft, ChevronUp, ChevronDown, Trash2, MoveRight, X } from 'lucide-react';
import Modal from './Modal'; import { api } from '../lib/api'; import { A } from '../store'; import { useDo } from '../lib/hooks'; import { useRefreshMe } from './GameCanvas'; import { lastChef, displayRanks, moveRankRow, dropRankRow, insertRankTarget, effWrite, canEditTopic } from '../lib/guild'; import { useDrag } from '../lib/drag'; import { fmt } from '../lib/fmt'; import { FmtBar, FmtField, FPrev, useFmt } from './fmtbar'; import Confirm from './Confirm';
const PERMS = [['accept_applicants', 'Accepter des postulants'], ['send_invites', 'Envoyer des invitations'], ['create_topics', 'Créer catégories et sujets'], ['assign_ranks', 'Attribuer des rangs']], words = t => (t.trim() ? t.trim().split(/\s+/).length : 0);
const RankPick = ({ ranks, value, onChange }) => <div className="gear">{ranks.map(r => <button type="button" key={r.id} className={'pill' + (value.includes(r.name) ? ' on' : '')} onClick={() => onChange(value.includes(r.name) ? value.filter(x => x !== r.name) : [...value, r.name])}>{r.name}</button>)}</div>;
function Pres({ g, me, run, load, leave }) {
  const lead = g.me.leader, [mantra, setMantra] = useState(g.guild.mantra || ''), [desc, setDesc] = useState(g.guild.description || ''), d = useDispatch();
  const upload = e => { const f = e.target.files[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) return d(A.toast('Image trop lourde (2 Mo maximum)')); const r = new FileReader(); r.onload = () => run(() => api('/guilds/presentation', { characterId: me.id, logo: r.result }), load); r.readAsDataURL(f); };
  return <div className="cols"><div className="emblem">{g.guild.logo ? <img alt="" src={g.guild.logo} /> : <Shield size={64} />}<h3>{g.guild.name}</h3><span className="pill">[{g.guild.tag}]</span>{lead && <label className="btnlike"><Upload size={14} /> Modifier le logo (2 Mo max)<input type="file" accept="image/*" hidden onChange={upload} /></label>}</div>
    <div className="form"><label>Mantra de la guilde <small>{mantra.length} / 120 caractères</small><input maxLength={120} readOnly={!lead} value={mantra} onChange={e => setMantra(e.target.value.slice(0, 120))} /></label>
      <label>Histoire & description <small>{words(desc)} / 1000 mots</small><textarea rows={8} readOnly={!lead} value={desc} onChange={e => words(e.target.value) <= 1000 && setDesc(e.target.value)} /></label>
      {lead && <button className="primary" onClick={() => run(() => api('/guilds/presentation', { characterId: me.id, mantra, description: desc }), () => { load(); d(A.toast('Présentation enregistrée')); })}>Enregistrer</button>}{lastChef(g) ? <small>Le dernier Chef ne peut pas quitter la guilde tant qu'un autre membre n'a pas ce rang.</small> : <button className="danger" onClick={leave}>Quitter la guilde</button>}</div></div>;
}
function Members({ g, me, run, load }) {
  const P = g.me.permissions, [pseudo, setPseudo] = useState('');
  return <div className="cols"><div className="form"><h4>Membres ({g.members.length}) <small>{P.assign_ranks ? 'Vous pouvez attribuer des rangs' : 'Lecture seule'}</small></h4>
    {g.members.map(m => <div key={m.id} className="item row2"><span><b>{m.pseudo}</b> <small>{m.race}</small></span>{P.assign_ranks ? <select value={m.rank_id} disabled={m.id === me.id && lastChef(g)} title={m.id === me.id && lastChef(g) ? 'Le dernier Chef ne peut pas changer de rang' : ''} onChange={e => run(() => api('/guilds/members/rank', { characterId: me.id, memberId: m.id, rankId: +e.target.value }), load)}>{g.ranks.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select> : <span className="pill">{m.rank}</span>}</div>)}</div>
    <div className="form"><h4><UserPlus size={14} /> Inviter un joueur</h4>{P.send_invites ? <div className="row"><input placeholder="Pseudo du joueur…" value={pseudo} onChange={e => setPseudo(e.target.value)} /><button onClick={() => run(() => api('/guilds/invite', { characterId: me.id, pseudo }), () => setPseudo(''))}>Inviter</button></div> : <small>Votre rang ne permet pas d'envoyer des invitations.</small>}
      <h4>Postulants en attente ({g.applicants.length})</h4>{!P.accept_applicants && <small>Droit requis pour voir et accepter les postulants.</small>}
      {g.applicants.map(a => <div key={a.id} className="item row2"><span>{a.pseudo} <small>{a.race}</small></span><span className="row"><button className="primary" onClick={() => run(() => api(`/guilds/applicants/${a.id}/answer`, { characterId: me.id, accept: true }), load)}>Accepter</button><button onClick={() => run(() => api(`/guilds/applicants/${a.id}/answer`, { characterId: me.id, accept: false }), load)}>Refuser</button></span></div>)}</div></div>;
}
const AV = ['#c8a24a', '#7fa8d9', '#9d7fce', '#7fce9d', '#d98f7f', '#69c9c9'];
const Avatar = ({ p }) => <span className="avatar" style={{ background: AV[[...p].reduce((h, c) => h + c.charCodeAt(0), 0) % AV.length] }}>{(p[0] || '?').toUpperCase()}</span>;
// Carte de message : bloc auteur vertical centré (avatar 40 px → rang → pseudo), corps aéré, date bas-droite.
const Post = ({ p }) => <div className="post"><div className="pauthor"><Avatar p={p.pseudo} />{p.rank && <span className="prank">{p.rank}</span>}<b>{p.pseudo}</b></div>
  <div className="postbody" dangerouslySetInnerHTML={{ __html: fmt(p.body) }} /><small className="ptime">{new Date(p.created_at).toLocaleString('fr-FR')}</small></div>;
function NewFolderModal({ g, me, run, load, onClose, onCreated }) {
  const [name, setName] = useState(''), [desc, setDesc] = useState(''), [fr, setFr] = useState(g.ranks.map(r => r.name)), [wr, setWr] = useState(g.ranks.map(r => r.name));
  const fm = useFmt(); // le SEUL groupe d'icônes de la modale, partagé par les deux champs
  return <Modal onClose={onClose} className="inv guild" label="Nouvelle catégorie"><div className="form"><h4><Plus size={14} /> Nouvelle catégorie</h4>
    <FmtField value={name} onChange={setName} fm={fm} placeholder="Titre…" />
    <FmtField value={desc} onChange={setDesc} fm={fm} bar={false} multiline placeholder="Description (facultative) (formattable : [g]gras[/g] · [i]italique[/i] · [rgb:R.G.B]couleur[/rgb])…" />
    <small>Qui peut VOIR :</small><RankPick ranks={g.ranks} value={fr} onChange={setFr} />
    <small>Qui peut ÉCRIRE (créer des sujets) :</small><RankPick ranks={g.ranks} value={wr} onChange={setWr} />
    <button className="primary" disabled={!name.trim()} onClick={() => run(() => api('/guilds/folders', { characterId: me.id, name: name.trim(), description: desc.trim() || undefined, visibleRanks: fr, writeRanks: wr }), () => { onClose(); (onCreated ?? load)(); })}>Créer la catégorie</button></div></Modal>;
}
function NewTopicModal({ g, folder, me, run, load, onClose, onCreated }) {
  const [t, setT] = useState({ title: '', body: '', description: '' }), [tr, setTr] = useState([]), [tw, setTw] = useState([]), [inhR, setInhR] = useState(true), [inhW, setInhW] = useState(true);
  const set = k => v => setT(x => ({ ...x, [k]: v }));
  const fm = useFmt(); // le SEUL groupe d'icônes de la modale, partagé par les trois champs
  return <Modal onClose={onClose} className="inv guild" label="Nouveau sujet"><div className="form"><h4><Plus size={14} /> Nouveau sujet — {folder.name}</h4>
    <FmtField value={t.title} onChange={set('title')} fm={fm} placeholder="Titre du sujet…" />
    <FmtField value={t.body} onChange={set('body')} fm={fm} bar={false} multiline rows={4} placeholder="Contenu… ([g]gras[/g] · [i]italique[/i] · [rgb:R.G.B]couleur[/rgb])" />
    <FmtField value={t.description} onChange={set('description')} fm={fm} bar={false} multiline placeholder="Description (facultative, formattable)…" />
    <label className="chk"><input type="checkbox" checked={inhR} onChange={e => setInhR(e.target.checked)} /> Lecture héritée de la catégorie</label>
    {!inhR && <><small>Qui peut VOIR :</small><RankPick ranks={g.ranks} value={tr} onChange={setTr} /></>}
    <label className="chk"><input type="checkbox" checked={inhW} onChange={e => setInhW(e.target.checked)} /> Écriture héritée de la catégorie</label>
    {!inhW && <><small>Qui peut ÉCRIRE :</small><RankPick ranks={g.ranks} value={tw} onChange={setTw} /></>}
    <button className="primary" disabled={!t.title.trim() || !t.body.trim()} onClick={() => run(() => api('/guilds/topics', { characterId: me.id, folderId: folder.id, title: t.title.trim(), body: t.body, description: t.description.trim() || undefined, visibleRanks: inhR ? [] : tr, writeRanks: inhW ? undefined : tw }), () => { onClose(); (onCreated ?? load)(); })}>Publier le sujet</button></div></Modal>;
}
function Perks({ g, kind, value, onChange }) {
  const setR = (rn, v) => v
    ? onChange({ ...value, read: value.read.includes(rn) ? value.read : [...value.read, rn] })
    : onChange({ ...value, read: value.read.filter(x => x !== rn), write: value.write.filter(x => x !== rn) }); // voir décoché → écrire aussi
  const setW = (rn, v) => v
    ? onChange({ ...value, write: value.write.includes(rn) ? value.write : [...value.write, rn], read: value.read.includes(rn) ? value.read : [...value.read, rn] }) // écrire coché → voir coché
    : onChange({ ...value, write: value.write.filter(x => x !== rn) });
  return <div className="ppanel">
    <div className="pprow">
      {kind === 'topics' && <label className="chk"><input type="checkbox" checked={value.iR} onChange={e => onChange({ ...value, iR: e.target.checked })} /> Lecture héritée de la catégorie</label>}
      <label className="chk"><input type="checkbox" checked={value.iW} onChange={e => onChange({ ...value, iW: e.target.checked })} /> Écriture héritée de la lecture</label></div>
    <div className="pgrid"><div className="pp ph"><label>Voir</label><label>Écrire</label><b>Rang</b></div>
      {g.ranks.map(r => <div key={r.id} className="pp">
        <input type="checkbox" disabled={value.iR} checked={value.read.includes(r.name)} onChange={e => setR(r.name, e.target.checked)} />
        <input type="checkbox" disabled={value.iW} checked={value.write.includes(r.name)} onChange={e => setW(r.name, e.target.checked)} />
        <b>{r.name}</b>{r.is_leader && <small> (tous droits)</small>}</div>)}</div>
    <small>Le Chef dépasse toujours ces droits ; écrire est limité à « voir ». Tout est enregistré avec le titre et la description.</small>
  </div>;
}
// ---- Facteurs communs (Rangs / Catégories / Sujets) : carte d'ajout, réorganisation. Le
// formatage ([g]/[i]/[rgb:R.G.B]) et l'aperçu sont dans src/components/fmtbar.jsx (FmtBar,
// FmtField, FPrev, useFmt) ; la confirmation dans src/components/Confirm.jsx ----
/** Carte d'ajout standardisée (Rangs / Catégories / Sujets) : fond discret, croix + dans un
 *  cercle bordé ; le toggle d'insertion (au-dessus par défaut) est sur la même ligne, à côté des
 *  boutons d'action, conformément au layout de la section Rangs. */
function AddCard({ i, len, onOpen, dnd, below, setBelow, label, canMove, onMove }) {
  return <div className={'item radd' + (dnd.drag?.from === i ? ' rkdr' : '')} title={label} onClick={() => { if (dnd.justDrag.current) return; onOpen(); }} {...dnd.rowProps(i)}>
    <span />
    <button className="plus" aria-label={label} onClick={onOpen}><Plus size={26} strokeWidth={2.5} /></button>
    <span className="aacts">
      <label className="tgl" title="Position d'insertion de la nouvelle entrée" onClick={e => e.stopPropagation()}>
        <span>{below ? 'insertion en dessous' : 'insertion au-dessus'}</span>
        <span className="trk"><input type="checkbox" checked={below} onChange={e => setBelow(e.target.checked)} /><span className="knob" /></span></label>
      {canMove && <Arrows i={i} len={len} onMove={onMove} />}
    </span></div>;
}
/** Contrôles de réorganisation partagés : drag & drop (appui 8 px + glissement, opacité réduite +
 *  ligne dorée d'insertion) et flèches ↑/↓ par ligne ; au drop `onReorder(from, to)` — le parent
 *  recalcule la séquence et persiste (POST /guilds/reorder). */
function DndList({ rows, onReorder, renderRow, className = 'dlist' }) {
  const ref = useRef(null);
  const dnd = useDrag(rows.length, onReorder, ref);
  return <div className={className} ref={ref}>
    {dnd.drag && <div className="inl" style={{ top: dnd.lineY + 'px' }} />}
    {rows.map((row, i) => <Fragment key={row.add ? 'add' : row.id}>{renderRow(row, i, dnd)}</Fragment>)}
  </div>;
}
function Forum({ g, me, run, load }) {
  const can = g.me.permissions.create_topics, lead = g.me.leader;
  const [fid, setFid] = useState(null), [tid, setTid] = useState(null), [posts, setPosts] = useState([]), [reply, setReply] = useState('');
  const [nfold, setNfold] = useState(false), [ntopic, setNtopic] = useState(false);
  const [fAdd, setFAdd] = useState(null), [fBelow, setFBelow] = useState(false);
  const [tAdd, setTAdd] = useState(null), [tBelow, setTBelow] = useState(false);
  /** Édition unifiée (titre + description + droits) : le crayon REMPLACE les balises
   *  d'affichage par des champs pré-remplis (useState portés ici) ; 1er clic = ouvrir,
   *  2e clic = enregistrer — avec l'écran de confirmation si des modifications existent
   *  (« valider ou annuler les changements »). draft/base = brouillon courant et
   *  instantané à l'ouverture (détection des modifications). */
  const [ed, setEd] = useState(null), [draft, setDraft] = useState(null), [base, setBase] = useState(null);
  const [cSave, setCSave] = useState(false), [cDel, setCDel] = useState(null), [move, setMove] = useState(null);
  const fmRep = useFmt(); // composeur de réponse
  const fmEd = useFmt(); // session d'édition : le SEUL groupe d'icônes (au-dessus du bloc) sert tous ses champs (dernier focalisé)
  const folder = g.folders.find(f => f.id === fid), topic = folder?.topics.find(x => x.id === tid);
  const open = async x => { setTid(x.id); setEd(null); setDraft(null); setPosts(await api(`/guilds/topics/${me.id}/${x.id}`).catch(() => [])); load(); }; // ouverture → messages marqués lus (back) + résync des badges
  const back = () => { if (tid !== null) setTid(null); else setFid(null); setEd(null); setDraft(null); };
  const fIds = g.folders.map(f => f.id), tIds = (folder?.topics ?? []).map(t => t.id);
  const fRows = displayRanks(fIds, fAdd), tRows = displayRanks(tIds, tAdd);
  const persistF = n => { setFAdd(n.addPos); if (n.ids.join() !== fIds.join()) run(() => api('/guilds/reorder', { characterId: me.id, kind: 'folders', ids: n.ids }), load); };
  const persistT = n => { setTAdd(n.addPos); if (n.ids.join() !== tIds.join()) run(() => api('/guilds/reorder', { characterId: me.id, kind: 'topics', folderId: fid, ids: n.ids }), load); };
  const afterFold = () => api(`/guilds/${me.id}`).then(s2 => {
    const newId = s2.folders[s2.folders.length - 1].id, prev = s2.folders.slice(0, -1).map(x => x.id);
    const target = insertRankTarget(prev, fAdd, newId, fBelow);
    if (target.join() !== s2.folders.map(x => x.id).join()) return api('/guilds/reorder', { characterId: me.id, kind: 'folders', ids: target }).then(load).catch(load);
    return load(); }).catch(() => load());
  const afterTopic = () => api(`/guilds/${me.id}`).then(s2 => {
    const fl = s2.folders.find(f => f.id === fid), newId = fl.topics[fl.topics.length - 1].id, prev = fl.topics.slice(0, -1).map(x => x.id);
    const target = insertRankTarget(prev, tAdd, newId, tBelow);
    if (target.join() !== fl.topics.map(x => x.id).join()) return api('/guilds/reorder', { characterId: me.id, kind: 'topics', folderId: fid, ids: target }).then(load).catch(load);
    return load(); }).catch(() => load());
  const unread = g.unread ?? { topics: {}, folders: {} };
  /** Ouverture d'une édition : le brouillon est pré-rempli avec le contenu courant
   *  (lecture/écriture matérialisées : « hérité » = liste de la catégorie pour un sujet,
   *  write_ranks null = écriture héritée de la lecture). */
  const openFoldEdit = f => {
    const d = { title: f.name, desc: f.description ?? '', read: [...(f.visible_ranks ?? [])], write: [...(f.write_ranks ?? [])], iR: false, iW: f.write_ranks === null };
    setEd({ kind: 'f', id: f.id }); setDraft(d); setBase(d); setCSave(false);
  };
  const openTopicEdit = (x, cat) => {
    const inherit = !(x.visible_ranks ?? []).length;
    const d = { title: x.title, desc: x.description ?? '', read: inherit ? [...(cat.visible_ranks ?? [])] : [...x.visible_ranks], write: [...(x.write_ranks ?? [])], iR: inherit, iW: x.write_ranks === null };
    setEd({ kind: 't', id: x.id }); setDraft(d); setBase(d); setCSave(false);
  };
  const closeEdit = () => { setEd(null); setDraft(null); setBase(null); setCSave(false); };
  const dirty = () => !!draft && !!base && (draft.title !== base.title || draft.desc !== base.desc || draft.iR !== base.iR || draft.iW !== base.iW
    || JSON.stringify(draft.read) !== JSON.stringify(base.read) || JSON.stringify(draft.write) !== JSON.stringify(base.write));
  /** Bouton crayon : 1er clic = ouvrir les champs ; 2e clic = enregistrer — si modifications,
   *  l'écran de confirmation demande de valider ou d'ANNULER les changements (Annuler =
   *  abandonner le brouillon). */
  const pencil = (kind, id, item, cat) => {
    if (ed?.id !== id) return kind === 'f' ? openFoldEdit(item) : openTopicEdit(item, cat);
    dirty() ? setCSave(true) : closeEdit();
  };
  /** Enregistrement unifié : titre + description (POST /edit, auteur ou create_topics) et,
   *  Chef, les droits (POST /perms). Erreur → toast par `run`, les champs restent ouverts.
   *  ATTENTION au nom de champ : le schéma back attend `name` pour une CATEGORIE et `title`
   *  pour un SUJET — zod supprime silencieusement tout champ inconnu et le COALESCE back
   *  garde alors l'ancienne valeur (c'était le bug « la sauvegarde échoue » : on envoyait
   *  `title` pour les deux, le nom de catégorie restait inchangé sur un 200). */
  const saveAll = () => {
    if (!ed || !draft) return;
    const isF = ed.kind === 'f';
    run(async () => {
      await api(`/guilds/${isF ? 'folders' : 'topics'}/${ed.id}/edit`, { characterId: me.id, ...(isF ? { name: draft.title.trim() } : { title: draft.title.trim() }), description: draft.desc });
      if (lead) await api(`/guilds/${isF ? 'folders' : 'topics'}/${ed.id}/perms`, { characterId: me.id, readRanks: isF ? draft.read : (draft.iR ? [] : draft.read), writeRanks: draft.iW ? null : draft.write });
      closeEdit(); load();
    });
  };
  /** Suppression (Chef seul, côté serveur) : la catégorie emporte sujets et messages ;
   *  confirmation explicite (le retour est définitif). */
  const doDel = () => {
    if (!cDel) return;
    run(async () => {
      await api(`/guilds/${cDel.kind === 'f' ? 'folders' : 'topics'}/${cDel.id}/delete`, { characterId: me.id });
      if (cDel.kind === 'f' && fid === cDel.id) setFid(null);
      if (cDel.kind === 't' && tid === cDel.id) setTid(null);
      setCDel(null); closeEdit(); load();
    });
  };
  /** Transfert d'un sujet vers une autre catégorie (create_topics / Chef ; rangé en fin de
   *  liste cible, messages et droits conservés). */
  const doMove = () => {
    if (!move?.to) return;
    run(async () => {
      await api(`/guilds/topics/${move.id}/move`, { characterId: me.id, folderId: move.to });
      if (tid === move.id) setTid(null);
      setMove(null); closeEdit(); load();
    });
  };
  const setD = patch => setDraft(d => (d ? { ...d, ...patch } : d));
  /** Bloc d'édition d'un sujet (vue liste ou vue sujet) : description + droits (Chef).
   *  L'annulation est le X empilé juste au-dessus du crayon (plus de bouton texte en bas). */
  const TopicEditBlock = () => <><FmtField fm={fmEd} bar={false} inrow value={draft.desc} onChange={v => setD({ desc: v })} multiline placeholder="Description…" />
    {lead && <Perks g={g} kind="topics" value={draft} onChange={setDraft} />}</>;
  return <div className="forum">
    {!folder && <div className="fview">
      <div className="row2 fhead2"><span /><h4 className="rhead">Catégories</h4><span /></div>
      <DndList rows={fRows} onReorder={(from, to) => persistF(dropRankRow(fIds, fAdd, from, to))} renderRow={(row, i, dnd) => {
        if (row.add) return <AddCard i={i} len={fRows.length} onOpen={() => setNfold(true)} dnd={dnd} below={fBelow} setBelow={setFBelow} label="Ajouter une catégorie" canMove={can} onMove={(a, d) => persistF(moveRankRow(fIds, fAdd, a, d))} />;
        const f = g.folders.find(x => x.id === row.id), u = unread.folders[f.id] ?? 0, editing = ed?.id === f.id;
        return <div className={'item fcard' + (dnd.drag?.from === i ? ' rkdr' : '')} {...dnd.rowProps(i)}>
          {editing && <FmtBar onFmt={fmEd.fmt} onColor={fmEd.color} />}
          <div className={'row2 sel' + (editing ? ' edit' : '')}>{editing
            ? <FmtField fm={fmEd} bar={false} inrow value={draft.title} onChange={v => setD({ title: v })} placeholder="Nom de la catégorie…" />
            : <button className="selitem" onClick={() => { setFid(f.id); setTid(null); }}><span><b dangerouslySetInnerHTML={{ __html: fmt(f.name) }} />{u > 0 && <span className="unread">{u}</span>}</span><small><Eye size={12} /> {f.visible_ranks.length ? f.visible_ranks.join(', ') : 'personne (hors Chef)'}</small></button>}
            <span className="row">{can && <span className="vstack">
              {editing && <button title="Annuler les changements" className="xbtn" onClick={closeEdit}><X size={13} /></button>}
              <button title={editing ? 'Sauvegarder les modifications' : 'Éditer (titre, description, droits)'} onClick={() => pencil('f', f.id, f)}><Pencil size={13} /></button></span>}
              {can && <Arrows i={i} len={fRows.length} onMove={(a, d) => persistF(moveRankRow(fIds, fAdd, a, d))} />}
              {lead && <button title="Supprimer la catégorie" className="delb" onClick={() => setCDel({ kind: 'f', id: f.id, name: f.name })}><Trash2 size={13} /></button>}</span></div>
          {editing
            ? <><FmtField fm={fmEd} bar={false} inrow value={draft.desc} onChange={v => setD({ desc: v })} multiline placeholder="Description…" />
              {lead && <Perks g={g} kind="folders" value={draft} onChange={setDraft} />}</>
            : <>{f.description && <div className="fsep">-----</div>}
              {f.description && <small className="fdesc" dangerouslySetInnerHTML={{ __html: fmt(f.description) }} />}</>}
        </div>;
      }} />
      {!g.folders.length && <small>Aucune catégorie : créez-en une avec la carte +.</small>}
    </div>}
    {folder && tid === null && <div className="fview">
      <div className="row2 fhead2"><button className="backbtn" onClick={back} title="Retour aux catégories"><ArrowLeft size={15} /> Catégories</button>
        <h4 className="rhead" dangerouslySetInnerHTML={{ __html: fmt(folder.name) }} /><span /></div>
      {folder.description && <div className="fsep">-----</div>}
      {folder.description && <small className="fdesc" dangerouslySetInnerHTML={{ __html: fmt(folder.description) }} />}
      <DndList rows={tRows} onReorder={(from, to) => persistT(dropRankRow(tIds, tAdd, from, to))} renderRow={(row, i, dnd) => {
        if (row.add) return <AddCard i={i} len={tRows.length} onOpen={() => setNtopic(true)} dnd={dnd} below={tBelow} setBelow={setTBelow} label="Ajouter un sujet" canMove={can} onMove={(a, d) => persistT(moveRankRow(tIds, tAdd, a, d))} />;
        const x = folder.topics.find(t => t.id === row.id), un = unread.topics[x.id] ?? 0, editable = canEditTopic(x, folder, g.me, me.id), editing = ed?.id === x.id;
        return <div className={'item fcard' + (dnd.drag?.from === i ? ' rkdr' : '')} {...dnd.rowProps(i)}>
          {editing && <FmtBar onFmt={fmEd.fmt} onColor={fmEd.color} />}
          <div className={'row2 sel' + (editing ? ' edit' : '')}>{editing
            ? <FmtField fm={fmEd} bar={false} inrow value={draft.title} onChange={v => setD({ title: v })} placeholder="Titre du sujet…" />
            : <button className="selitem" onClick={() => open(x)}><span><b dangerouslySetInnerHTML={{ __html: fmt(x.title) }} />{un > 0 && <span className="unread">{un}</span>}</span><small>par {x.author} · {(x.visible_ranks ?? []).length ? `voir : ${x.visible_ranks.join(', ')}` : 'lecture héritée'}</small></button>}
            <span className="row">{editable && <span className="vstack">
              {editing && <button title="Annuler les changements" className="xbtn" onClick={closeEdit}><X size={13} /></button>}
              <button title={editing ? 'Sauvegarder les modifications' : 'Éditer (titre, description, droits)'} onClick={() => pencil('t', x.id, x, folder)}><Pencil size={13} /></button></span>}
              {can && <Arrows i={i} len={tRows.length} onMove={(a, d) => persistT(moveRankRow(tIds, tAdd, a, d))} />}
              {can && <button title="Transférer vers une autre catégorie" onClick={() => setMove({ id: x.id, name: x.title, from: folder.id, to: null })}><MoveRight size={13} /></button>}
              {lead && <button title="Supprimer le sujet" className="delb" onClick={() => setCDel({ kind: 't', id: x.id, name: x.title })}><Trash2 size={13} /></button>}</span></div>
          {editing ? TopicEditBlock()
            : <>{x.description && <div className="fsep">-----</div>}
              {x.description && <small className="fdesc" dangerouslySetInnerHTML={{ __html: fmt(x.description) }} />}</>}
        </div>;
      }} />
      {!(folder.topics?.length) && <small>Aucun sujet dans cette catégorie.</small>}
    </div>}
    {topic && <div className="fview">
      {ed?.id === topic.id && <FmtBar onFmt={fmEd.fmt} onColor={fmEd.color} />}
      <div className="row2 fhead2"><button className="backbtn" onClick={back} title="Retour aux sujets"><ArrowLeft size={15} /> Sujets</button>
        {ed?.id === topic.id
          ? <FmtField fm={fmEd} bar={false} value={draft.title} onChange={v => setD({ title: v })} placeholder="Titre du sujet…" />
          : <h4 className="rhead" dangerouslySetInnerHTML={{ __html: fmt(topic.title) }} />}
        {canEditTopic(topic, folder, g.me, me.id) && <span className="vstack">
          {ed?.id === topic.id && <button title="Annuler les changements" className="xbtn" onClick={closeEdit}><X size={13} /></button>}
          <button className="btnlike" title={ed?.id === topic.id ? 'Sauvegarder les modifications' : 'Éditer'} onClick={() => pencil('t', topic.id, topic, folder)}><Pencil size={13} /></button></span>}</div>
      {ed?.id === topic.id
        ? TopicEditBlock()
        : <>{topic.description && <div className="fsep">-----</div>}
          {topic.description && <small className="fdesc" dangerouslySetInnerHTML={{ __html: fmt(topic.description) }} />}</>}
      <div className="posts">{posts.map((p, i) => <Post key={p.id ?? i} p={p} />)}{!posts.length && <small>Aucun message pour l'instant.</small>}</div>
      {lead || effWrite(topic, folder).includes(g.me.rank)
        ? <div className="replywrap"><FmtBar onFmt={fmRep.fmt} onColor={fmRep.color} />
            <div className="replyrow"><input {...fmRep.bind(setReply)} value={reply} onChange={e => setReply(e.target.value)} placeholder="Répondre… ([g]gras[/g] · [i]italique[/i] · [rgb:R.G.B]couleur[/rgb])" /><button className="primary" onClick={() => run(() => api('/guilds/posts', { characterId: me.id, topicId: topic.id, body: reply }), () => { setReply(''); open(topic); })}>Envoyer</button></div>
            <FPrev text={reply} /></div>
        : <small>Votre rang ne permet pas de répondre dans ce sujet.</small>}
    </div>}
    {nfold && <NewFolderModal g={g} me={me} run={run} load={load} onCreated={afterFold} onClose={() => setNfold(false)} />}
    {ntopic && <NewTopicModal g={g} folder={folder} me={me} run={run} load={load} onCreated={afterTopic} onClose={() => setNtopic(false)} />}
    {cSave && <Confirm msg="Des modifications sont présentes — valider l'enregistrement ?" ok="Valider" cancel="Annuler" onOk={saveAll} onCancel={() => { setCSave(false); closeEdit(); }} />}
    {cDel && <Confirm msg={cDel.kind === 'f' ? `Supprimer la catégorie « ${cDel.name} » ? Tous ses sujets et leurs messages seront supprimés définitivement.` : `Supprimer le sujet « ${cDel.name} » ? Ses messages seront supprimés définitivement.`} ok="Supprimer" cancel="Annuler" onOk={doDel} onCancel={() => setCDel(null)} />}
    {move && <MoveModal g={g} move={move} setMove={setMove} doMove={doMove} />}
  </div>;
}
/** Transfert de sujet : choix de la catégorie cible (radio) ; le sujet est rangé en fin de
 *  liste de la cible (back), ses messages et ses droits voyagent avec lui. */
function MoveModal({ g, move, setMove, doMove }) {
  const others = g.folders.filter(f => f.id !== move.from);
  return <Modal onClose={() => setMove(null)} className="inv guild" label={`Transférer le sujet « ${move.name} »`}><div className="form"><h4><MoveRight size={14} /> Transférer le sujet « {move.name} »</h4>
    {others.length ? <small>Vers quelle catégorie (le sujet ira en fin de liste) :</small> : <small>Créez d'abord une autre catégorie.</small>}
    {others.map(f => <label key={f.id} className="selitem mov"><input type="radio" name="forum-move" checked={move.to === f.id} onChange={() => setMove({ ...move, to: f.id })} /><span><b>{f.name}</b><small>{f.visible_ranks.length ? f.visible_ranks.join(', ') : 'personne (hors Chef)'}</small></span></label>)}
    <div className="row"><button className="primary" disabled={!move.to} onClick={doMove}>Transférer</button><button className="btnlike" onClick={() => setMove(null)}>Annuler</button></div></div></Modal>;
}
function NewRankModal({ me, run, load, onClose, onCreated }) {
  const [name, setName] = useState(''), [perms, setPerms] = useState({ create_topics: true });
  return <Modal onClose={onClose} className="inv guild" label="Nouveau rang"><div className="form"><h4><Plus size={14} /> Créer un rang</h4><input placeholder="Nom (ex : Sénéchal, Recrue…)" value={name} onChange={e => setName(e.target.value)} />
    {PERMS.map(([k, l]) => <label key={k} className="chk"><input type="checkbox" checked={!!perms[k]} onChange={e => setPerms({ ...perms, [k]: e.target.checked })} /> {l}</label>)}
    <button className="primary" disabled={name.trim().length < 2} onClick={() => run(() => api('/guilds/ranks', { characterId: me.id, name: name.trim(), permissions: perms }), () => { onClose(); (onCreated ?? load)(); })}>Créer le rang</button></div></Modal>;
}
function Arrows({ i, len, onMove }) {
  return <span className="ord"><button title="Monter" disabled={i === 0} onClick={e => { e.stopPropagation(); onMove(i, -1); }}><ChevronUp size={14} /></button><button title="Descendre" disabled={i === len - 1} onClick={e => { e.stopPropagation(); onMove(i, 1); }}><ChevronDown size={14} /></button></span>;
}
function Manage({ g, me, run, load }) {
  const [open, setOpen] = useState(false), [ren, setRen] = useState(null), [rname, setRname] = useState('');
  const [addPos, setAddPos] = useState(null), [below, setBelow] = useState(false);
  const ids = g.ranks.map(r => r.id), rows = displayRanks(ids, addPos);
  const persistOrder = n => { setAddPos(n.addPos);
    if (n.ids.join() !== ids.join()) run(() => api('/guilds/reorder', { characterId: me.id, kind: 'ranks', ids: n.ids }), load); };
  const moveRow = (i, dir) => persistOrder(moveRankRow(ids, addPos, i, dir));
  const saveRename = r => run(() => api(`/guilds/ranks/${r.id}/rename`, { characterId: me.id, name: rname }), () => { setRen(null); load(); });
  // Toggle d'insertion : par défaut le nouveau rang s'insère AU-DESSUS de la carte d'ajout ; quand on coche
  // « en dessous », l'ordre cible est persisté juste après la création (le rang est créé en fin de liste
  // par l'API, l'endpoint de réorganisation recalcule ensuite les sort_order).
  const afterCreate = () => api(`/guilds/${me.id}`).then(s2 => {
    const newId = s2.ranks[s2.ranks.length - 1].id, prev = s2.ranks.slice(0, -1).map(r => r.id);
    const target = insertRankTarget(prev, addPos, newId, below);
    if (target.join() !== s2.ranks.map(r => r.id).join()) return api('/guilds/reorder', { characterId: me.id, kind: 'ranks', ids: target }).then(load).catch(load);
    return load();
  }).catch(() => load());
  // Drag & drop + flèches : contrôles partagés par <DndList> (aussi utilisé par le forum).
  return <div className="form ranks"><h4 className="rhead">Rangs & privilèges</h4>
    <DndList rows={rows} onReorder={(from, to) => persistOrder(dropRankRow(ids, addPos, from, to))} renderRow={(row, i, dnd) => {
      if (row.add) return <AddCard i={i} len={rows.length} onOpen={() => setOpen(true)} dnd={dnd} below={below} setBelow={setBelow} label="Ajouter un rang" canMove onMove={moveRow} />;
      const r = g.ranks.find(x => x.id === row.id);
      return <div className={'item rcard' + (dnd.drag?.from === i ? ' rkdr' : '')} {...dnd.rowProps(i)}><div className="head"><b>{r.name}</b>
        <span className="row">{r.is_leader && <span className="pill">Chef — tous les droits</span>}
          {ren === r.id ? <span className="row"><input value={rname} onChange={e => setRname(e.target.value)} /><button className="primary" onClick={() => saveRename(r)}>Renommer</button></span>
            : <button title={`Renommer « ${r.name} »`} onClick={() => { setRen(r.id); setRname(r.name); }}><Pencil size={13} /></button>}
          <Arrows i={i} len={rows.length} onMove={moveRow} /></span></div>
        <div className="grid2">{PERMS.map(([k, l]) => <label key={k} className="chk"><input type="checkbox" disabled={r.is_leader} checked={r.is_leader || !!r.permissions[k]} onChange={e => run(() => api(`/guilds/ranks/${r.id}/permission`, { characterId: me.id, permission: k, value: e.target.checked }), load)} /> {l}</label>)}</div></div>;
    }} />
    <div className="item drank"><div className="head"><b>Rang par défaut des nouveaux arrivants</b></div>
      <div className="drow">{[<label key="auto" className="chk"><input type="radio" name="drank" checked={g.guild.default_rank_id == null} onChange={() => run(() => api('/guilds/default-rank', { characterId: me.id, rankId: null }), load)} /> Automatique (rang le plus bas)</label>,
        ...g.ranks.filter(r => !r.is_leader).map(r => <label key={r.id} className="chk"><input type="radio" name="drank" checked={g.guild.default_rank_id === r.id} onChange={() => run(() => api('/guilds/default-rank', { characterId: me.id, rankId: r.id }), load)} /> {r.name}</label>)]}
      </div><small>Un candidat accepté ou une invitation acceptée reçoit ce rang. « Automatique » = le rang non-Chef le plus bas.</small></div>
    {open && <NewRankModal me={me} run={run} load={load} onCreated={afterCreate} onClose={() => setOpen(false)} />}
  </div>;
}
function NoGuild({ me, run, reload }) {
  const [name, setName] = useState(''), [tag, setTag] = useState(''), [inv, setInv] = useState([]); useEffect(() => { api(`/guilds/invitations/${me.id}`).then(setInv).catch(() => {}); }, []);
  return <div className="cols"><div className="form"><h3>Fonder une guilde</h3><input placeholder="Nom de la guilde" value={name} onChange={e => setName(e.target.value)} /><input placeholder="Tag (2-6 lettres)" maxLength={6} value={tag} onChange={e => setTag(e.target.value)} /><button className="primary" onClick={() => run(() => api('/guilds', { characterId: me.id, name, tag: tag || undefined }), reload)}>Créer</button>
    <h3>Postuler</h3><div className="row"><input placeholder="Nom de la guilde" value={name} onChange={e => setName(e.target.value)} /><button onClick={() => run(() => api('/guilds/apply', { characterId: me.id, name }), () => alert('Candidature envoyée'))}>Postuler</button></div></div>
    <div className="form"><h3>Invitations reçues</h3>{!inv.length && <small>Aucune invitation.</small>}{inv.map(i => <div key={i.id} className="item row2"><span>{i.guild} [{i.tag}]</span><span className="row"><button className="primary" onClick={() => run(() => api(`/guilds/invitations/${i.id}/accept`, { characterId: me.id, accept: true }), reload)}>Rejoindre</button><button onClick={() => run(() => api(`/guilds/invitations/${i.id}/accept`, { characterId: me.id, accept: false }), reload)}>Refuser</button></span></div>)}</div></div>;
}
export default function GuildModal() {
  const { me } = useSelector(s => s.game), d = useDispatch(), run = useDo(), refresh = useRefreshMe(), [g, setG] = useState(undefined), [tab, setTab] = useState('pres');
  const load = () => api(`/guilds/${me.id}`).then(setG).catch(() => setG(null)); useEffect(() => { load(); }, []); const reload = () => { load(); refresh(); }, leave = () => run(() => api('/guilds/leave', { characterId: me.id }), reload);
  const TABS = [['pres', ShieldCheck, '1. Présentation'], ['list', Users, `2. Liste (${g?.members.length ?? 0})`], ['forum', MessageSquare, '3. Forum'], ...(g?.me.leader ? [['manage', Settings, '4. Gestion (Chef)']] : [])];
  if (g === undefined) return null;
  return <Modal onClose={() => d(A.setPanel(null))} className="inv guild" label="Guilde">
    {g ? <><div className="seg tabs4">{TABS.map(([k, I, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><I size={15} /> {l}</button>)}</div><small className="rankline">Votre rang : <b>{g.me.rank}</b></small>
      {tab === 'pres' && <Pres g={g} me={me} run={run} load={load} leave={leave} />}{tab === 'list' && <Members g={g} me={me} run={run} load={load} />}{tab === 'forum' && <Forum g={g} me={me} run={run} load={load} />}{tab === 'manage' && g.me.leader && <Manage g={g} me={me} run={run} load={load} />}</>
      : <NoGuild me={me} run={run} reload={reload} />}</Modal>;
}
