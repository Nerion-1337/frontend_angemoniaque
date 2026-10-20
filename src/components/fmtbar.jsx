import { useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { fmt, wrapSel, colorSel } from '../lib/fmt';
import { applyColorToSelection } from '../lib/rich';
/** Barre d'outils de formatage compacte (Gras / Italique / Nuancier) : agit sur la sélection du
 *  dernier champ focalisé ; n'insère que des balises texte supportées par `fmt` (le rendu reste
 *  assaini par fmt.js — jamais de HTML brut). La couleur s'applique au COMMIT du sélecteur
 *  natif (onChange) : un click sur la pastille ouvre un dialog natif où aucun mouseup ne se
 *  déclenche sur l'élément — d'où l'application sur l'événement d'engagement uniquement. */
export function FmtBar({ onFmt, onColor }) {
  const [hex, setHex] = useState('#c8a24a');
  return <span className="fmtbar">
    <button type="button" title="Gras : entoure la sélection de **" onClick={() => onFmt('**')}><b>B</b></button>
    <button type="button" title="Italique : entoure la sélection de *" onClick={() => onFmt('*')}><i>I</i></button>
    <label title="Couleur : insère le code #rrggbb à la suite de la sélection">
      <input type="color" value={hex} onChange={e => { setHex(e.target.value); onColor(e.target.value); }} /></label>
  </span>;
}
/** Aperçu live du rendu `fmt` (gras / italique / couleur) sous un champ de saisie : l'utilisateur
 *  voit le RÉSULTAT, pas seulement les balises. Sûr : le texte passe par `fmt` (échappement
 *  HTML d'abord) ; jamais de HTML brut. */
export function FPrev({ text }) {
  return (text ?? '').trim() ? <div className="fprev"><small>Aperçu</small><div dangerouslySetInnerHTML={{ __html: fmt(text) }} /></div> : null;
}
/** Barre de l'éditeur riche WYSIWYG (contentEditable) : B/I via `document.execCommand` sur le
 *  champ (le focus reste dans l'éditeur — onMouseDown préventif), couleur via la Range API
 *  (rich.js : zéro code visible), puis les actions ✓ Enregistrer / ✕ Annuler du parent.
 *  Les boutons n'insèrent AUCUNE balise texte : le rendu visuel est direct. */
export function RichBar({ elRef, onOk, onCancel }) {
  const [hex, setHex] = useState('#c8a24a');
  const cmd = c => { elRef.current?.focus(); document.execCommand(c); };
  return <span className="richbar">
    <button type="button" title="Gras" onMouseDown={e => e.preventDefault()} onClick={() => cmd('bold')}><b>B</b></button>
    <button type="button" title="Italique" onMouseDown={e => e.preventDefault()} onClick={() => cmd('italic')}><i>I</i></button>
    <label title="Couleur du texte">
      <input type="color" value={hex} onChange={e => { setHex(e.target.value); elRef.current && applyColorToSelection(elRef.current, e.target.value); }} /></label>
    <span className="ractions">
      <button type="button" title="Enregistrer" className="ok" onClick={onOk}><Check size={14} /></button>
      <button type="button" title="Annuler" onClick={onCancel}><X size={14} /></button>
    </span>
  </span>;
}
/** `bind(setter)` se répand sur le <input>/<textarea> cible : `onFocus` retient le champ pour
 *  la barre d'outils, `onChange` garde le champ éditable (un champ contrôlé SANS onChange est
 *  gelé par React — c'était le bug « impossible d'ajouter/effacer du texte »). Les balises ne
 *  sont insérées QUE par `fmt`/`color` sur la sélection du dernier champ focalisé
 *  (wrapSel/colorSel pures, unitaires dans test/fmt.test.js). */
export const useFmt = () => {
  const f = useRef(null);
  const bind = set => ({ onFocus: e => { f.current = { el: e.target, set }; }, onChange: e => set(e.target.value) });
  const apply = make => { const x = f.current; if (!x) return;
    const s = x.el.selectionStart ?? 0, e = x.el.selectionEnd ?? 0, r = make(x.el.value, s, e);
    x.set(r.text); requestAnimationFrame(() => x.el.setSelectionRange?.(r.cursor, r.cursor)); };
  return { bind, fmt: m => apply((v, s, e) => wrapSel(v, s, e, m)), color: h => apply((v, s, e) => colorSel(v, s, e, h)) }; };
