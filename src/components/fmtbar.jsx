import { useRef, useState } from 'react';
import { fmt, wrapSel } from '../lib/fmt';
const rgbOf = h => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255}.${(n >> 8) & 255}.${n & 255}`; };
/** Barre d'outils de formatage compacte (Gras / Italique / Nuancier), affichée AU-DESSUS de
 *  l'élément modifié : agit sur la sélection du dernier champ focalisé et n'insère que des
 *  balises texte supportées par `fmt` — [g]…[/g] (gras), [i]…[/i] (italique),
 *  [rgb:R.G.B]…[/rgb] (couleur, canaux 0-255 déduits du sélecteur #rrggbb). Le rendu reste
 *  assaini par fmt.js (échappement d'abord) : jamais de HTML brut. */
export function FmtBar({ onFmt, onColor }) {
  const [hex, setHex] = useState('#c8a24a');
  return <span className="fmtbar">
    <button type="button" title="Gras : entoure la sélection de [g]…[/g]" onClick={() => onFmt('[g]', '[/g]')}><b>B</b></button>
    <button type="button" title="Italique : entoure la sélection de [i]…[/i]" onClick={() => onFmt('[i]', '[/i]')}><i>I</i></button>
    <label title="Couleur : entoure la sélection de [rgb:R.G.B]…[/rgb]">
      <input type="color" value={hex} onChange={e => { setHex(e.target.value); onColor(e.target.value); }} /></label>
  </span>;
}
/** Aperçu live du rendu `fmt` (gras / italique / couleur) sous un champ de saisie :
 *  l'utilisateur voit le RÉSULTAT, pas seulement les balises. Sûr : le texte passe par `fmt`
 *  (échappement HTML d'abord) ; jamais de HTML brut. */
export function FPrev({ text }) {
  return (text ?? '').trim() ? <div className="fprev"><small>Aperçu</small><div dangerouslySetInnerHTML={{ __html: fmt(text) }} /></div> : null;
}
/** Champ modifiable avec formatage : barre d'outils EN HAUT, input/textarea pré-rempli
 *  (composant contrôlé générique : value/onChange portés par le parent — useState côté
 *  parent), aperçu du rendu live en dessous. Les balises sont tapées par la barre, jamais
 *  visibles au rendu final (elles ne restent que dans le texte stocké). */
export function FmtField({ value, onChange, multiline, rows = 3, placeholder }) {
  const fm = useFmt();
  return <div className="fmtf">
    <FmtBar onFmt={fm.fmt} onColor={fm.color} />
    {multiline
      ? <textarea rows={rows} value={value ?? ''} {...fm.bind(onChange)} placeholder={placeholder} />
      : <input value={value ?? ''} {...fm.bind(onChange)} placeholder={placeholder} />}
    <FPrev text={value} />
  </div>;
}
/** `bind(setter)` se répand sur le <input>/<textarea> cible : `onFocus` retient le champ pour
 *  la barre d'outils, `onChange` garde le champ éditable (un champ contrôlé SANS onChange est
 *  gelé par React — c'était le bug « impossible d'ajouter/effacer du texte »). Les balises ne
 *  sont insérées QUE par `fmt`/`color` sur la sélection du dernier champ focalisé
 *  (wrapSel pure, unitaire dans test/fmt.test.js). */
export const useFmt = (set) => {
  const f = useRef(null);
  const bind = s => ({ onFocus: e => { f.current = { el: e.target, set: s ?? set }; }, onChange: e => (s ?? set)(e.target.value) });
  const apply = make => { const x = f.current; if (!x) return;
    const s = x.el.selectionStart ?? 0, e = x.el.selectionEnd ?? 0, r = make(x.el.value, s, e);
    x.set(r.text); requestAnimationFrame(() => x.el.setSelectionRange?.(r.cursor, r.cursor)); };
  return { bind, fmt: (m, after) => apply((v, s, e) => wrapSel(v, s, e, m, after ?? m)), color: h => apply((v, s, e) => wrapSel(v, s, e, `[rgb:${rgbOf(h)}]`, '[/rgb]')) }; };
