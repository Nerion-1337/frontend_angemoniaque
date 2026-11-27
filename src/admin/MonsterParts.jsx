// Fiche monstre : emplacements équipables du type (silhouette cliquable).
import { Check } from 'lucide-react';
import { Empty } from './ui.jsx';
import { SLOTS, SLOT_LABEL, SLOT_SHORT, SLOT_POS } from './monsterDetails.js';

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
