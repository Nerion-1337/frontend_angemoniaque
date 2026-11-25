// Fiche monstre : emplacements équipables du type (silhouette cliquable) et réapparition d'un monstre posé (par monstre, migration 35).
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ad } from '../store/admin.js';
import { api } from '../lib/api.js';
import { Check, Plus, Save } from 'lucide-react';
import Pick from './Pick.jsx';
import { Empty } from './ui.jsx';
import { SLOTS, SLOT_LABEL, SLOT_SHORT, SLOT_POS, LIMIT_KIND, respawnDraft, respawnBody } from './monsterDetails.js';

/** Silhouette : chaque partie est un bouton à bascule (cochée = équipable) ; la liste en dessous dit la même chose en texte. */
export function BodyParts({ slots, toggle }) {
  return <div className="bodyparts">
    <div className="bodymap" aria-label="Parties du corps équipables">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="50" cy="9" rx="7" ry="5.5" /><path d="M46 15h8v5h-8z" />
        <path d="M37 20h26l3 34h-32z" /><path d="M37 21 20 56l5 2 15-28M63 21l17 35-5 2-15-28" />
        <path d="M36 54h13l-1 38h-8zM51 54h13l-4 38h-8z" /></svg>
      {SLOTS.map(s => <button key={s} type="button" className={`bpart${slots.includes(s) ? ' on' : ''}`} style={{ left: `${SLOT_POS[s][0]}%`, top: `${SLOT_POS[s][1]}%` }}
        aria-pressed={slots.includes(s)} title={`${SLOT_LABEL[s]} : ${slots.includes(s) ? 'équipable (cliquer pour retirer)' : 'non équipable (cliquer pour autoriser)'}`} onClick={() => toggle(s)}>
        {slots.includes(s) && <Check size={11} />}{SLOT_SHORT[s]}</button>)}
    </div>
    <div className="bodylist">
      <small>Parties équipables</small>
      {slots.length ? <div className="chips">{slots.map(s => <span key={s} className="chip on">{SLOT_LABEL[s]}<button className="x-in" title="Retirer" onClick={() => toggle(s)}>×</button></span>)}</div>
        : <Empty>Aucune : les monstres de ce type ne peuvent rien porter.</Empty>}
      <p className="note">Mêmes emplacements qu'un personnage : deux armes, deux bracelets, deux bagues. Cliquez un emplacement sur la silhouette pour l'autoriser ou le retirer.
        L'équipement des monstres posés (onglet « Sur les cartes ») n'est possible que sur ces emplacements, avec les objets du bon type.</p>
    </div>
  </div>;
}

/** Réapparition d'UN monstre posé : recréé ou non, délai, conditions sur les éléments limités, objet divin porté (une pièce par vie). */
export function RespawnPanel({ monster, cats, onSaved }) {
  const d = useDispatch(), [r, setR] = useState(() => respawnDraft(monster)), [nl, setNl] = useState({ kind: 'item', ref: '', max: 1 }), [fams, setFams] = useState([]);
  useEffect(() => { api('/admin/content/divine-families').then(setFams).catch(() => {}); }, []);
  const fam = fams.find(f => f.key === r.divine);
  const lists = { item: cats?.items ?? [], spell: cats?.spells ?? [], resource: cats?.resources ?? [] };
  const nameOf = l => lists[l.kind].find(o => String(o.id) === String(l.ref))?.name ?? `n°${l.ref}`;
  const save = async () => { try { await api(`/admin/content/monsters/${monster.id}`, respawnBody(r), 'PUT'); d(Ad.ok('Réapparition enregistrée')); onSaved(); } catch (e) { d(Ad.msg(e.message)); } };
  return <div className="respawn">
    <div className="form"><div className="cell span2"><small>Objet divin porté</small>
        <select value={r.divine} onChange={e => setR({ ...r, divine: e.target.value })}><option value="">Aucun</option>
          {fams.map(f => <option key={f.key} value={f.key}>{f.name}{f.cap != null ? ` (${f.cap} au maximum dans le jeu)` : ''}</option>)}</select></div></div>
      {r.divine && <p className="note">Il porte un seul exemplaire de la famille à la fois. Tué, il le donne à son tueur et revient après le délai avec un nouvel exemplaire,
        tant que la famille n'est pas complète chez les joueurs{fam?.cap != null ? ` (${fam.held ?? 0} / ${fam.cap} détenus aujourd'hui)` : ''}. Famille complète : il ne revient plus.</p>}
    <label className="check"><input type="checkbox" checked={r.respawn} onChange={e => setR({ ...r, respawn: e.target.checked })} /> <b>Recréé après sa mort</b></label>
    {!r.respawn ? <p className="note">Une fois tué, il disparaît de la carte (le type reste au catalogue et peut être reposé). Les monstres sauvages (règles d'apparition) suivent leurs propres règles.</p> : <>
      <div className="form"><div className="cell"><small>Délai avant réapparition (heures, 0 = aussitôt)</small><input type="number" min="0" value={r.delayH} onChange={e => setR({ ...r, delayH: e.target.value })} /></div></div>
      <h5>Conditions (éléments limités)</h5>
      <p className="note">Tant qu'au moins le nombre indiqué d'exemplaires est chez les joueurs (objets : sac, coffre et équipés ; sorts : appris ; ressources : stocks),
        le monstre ne réapparaît pas. Revérifié chaque heure : il réapparaît dès que ce n'est plus le cas.</p>
      <div className="row add">
        <select value={nl.kind} onChange={e => setNl({ ...nl, kind: e.target.value, ref: '' })}>{Object.entries(LIMIT_KIND).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <Pick options={lists[nl.kind]} value={nl.ref} onPick={v => setNl({ ...nl, ref: v })} labelOf={o => o.name} placeholder={`— ${LIMIT_KIND[nl.kind]} —`} />
        <label className="inlabel"><small>bloque à</small><input type="number" min="1" className="nb" value={nl.max} onChange={e => setNl({ ...nl, max: e.target.value })} /></label>
        <button className="sm" disabled={!nl.ref} onClick={() => { setR({ ...r, limits: [...r.limits.filter(l => !(l.kind === nl.kind && String(l.ref) === String(nl.ref))), { ...nl }] }); setNl({ ...nl, ref: '' }); }}><Plus size={14} /> Ajouter</button>
      </div>
      {r.limits.length ? <div className="chips">{r.limits.map(l => <span key={`${l.kind}:${l.ref}`} className="chip on">{LIMIT_KIND[l.kind]} « {nameOf(l)} » : bloque à {l.max}
        <button className="x-in" onClick={() => setR({ ...r, limits: r.limits.filter(x => x !== l) })}>×</button></span>)}</div> : <Empty>Aucune condition.</Empty>}
    </>}
    <div className="actions"><span className="grow" /><button className="primary" onClick={save}><Save size={14} /> Enregistrer la réapparition</button></div>
  </div>;
}
