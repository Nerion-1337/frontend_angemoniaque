import { useRef, useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import { fmt, wrapSel } from '../lib/fmt';
const rgbOf = h => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255}.${(n >> 8) & 255}.${n & 255}`; };
/** Barre d'outils de formatage compacte (Gras / Italique / Nuancier) : agit sur la sélection du
 *  dernier champ focalisé et n'insère que des balises texte supportées par `fmt` —
 *  [g]…[/g] (gras), [i]…[/i] (italique), [rgb:R.G.B]…[/rgb] (couleur, canaux 0-255 déduits du
 *  sélecteur #rrggbb). Le rendu reste assaini par fmt.js (échappement d'abord) : jamais de
 *  HTML brut. `disabled` (aperçu affiché) = groupe inactif et estompé. */
export function FmtBar({ onFmt, onColor, disabled }) {
  const [hex, setHex] = useState('#c8a24a');
  return <span className={'fmtbar' + (disabled ? ' dis' : '')}>
    <button type="button" title="Gras : entoure la sélection de [g]…[/g]" onClick={() => onFmt('[g]', '[/g]')}><b>B</b></button>
    <button type="button" title="Italique : entoure la sélection de [i]…[/i]" onClick={() => onFmt('[i]', '[/i]')}><i>I</i></button>
    <label title="Couleur : entoure la sélection de [rgb:R.G.B]…[/rgb]">
      <input type="color" value={hex} onChange={e => { setHex(e.target.value); onColor(e.target.value); }} /></label>
  </span>;
}
/** Aperçu live du rendu `fmt` (gras / italique / couleur) : rend le RÉSULTAT, pas seulement
 *  les balises. Sûr : le texte passe par `fmt` (échappement HTML d'abord). Utilisé par le
 *  composeur de réponse (la bascule d'aperçu des champs est intégrée à FmtField). */
export function FPrev({ text }) {
  return (text ?? '').trim() ? <div className="fprev"><small>Aperçu</small><div dangerouslySetInnerHTML={{ __html: fmt(text) }} /></div> : null;
}
/** Champ modifiable avec formatage, pré-rempli (composant contrôlé générique : value/onChange
 *  portés par le parent) :
 *  - le groupe d'icônes (`FmtBar`, 3 icônes) est affiché UNIQUEMENT une fois par formulaire,
 *    au-dessus du premier champ (`bar` par défaut) ; les autres champs reçoivent le même
 *    groupe partagé (`fm` = la même instance `useFmt`, l'aperçu cible le dernier champ
 *    focalisé) avec `bar={false}` ;
 *  - le bouton de bascule à côté du champ (œil / crayon) alterne, DANS LE MÊME ESPACE, entre
 *    le champ de saisie et le rendu formaté (pas de div d'aperçu séparée) ;
 *  - en mode aperçu le groupe d'icônes est inactif (la sélection serait perdue avec le
 *    champ démonté) — basculer de nouveau pour formater.
 *  `inrow` = aligné à gauche (variant des lignes de liste, coordonnées du <b> d'affichage). */
export function FmtField({ value, onChange, multiline, rows = 3, placeholder, bar = true, fm: fmProp, inrow }) {
  const own = useFmt(); const fm = fmProp ?? own; // instance partagée ou privée (règle des hooks : toujours appelée)
  const [preview, setPreview] = useState(false);
  const bind = fm.bind(onChange);
  return <div className={'fmtf' + (inrow ? ' inrow' : '')}>
    {bar && <FmtBar onFmt={fm.fmt} onColor={fm.color} disabled={preview} />}
    <div className="fmtf-body">
      {preview
        ? <div className="fmtprev" dangerouslySetInnerHTML={{ __html: fmt(value ?? '') }} />
        : multiline
          ? <textarea rows={rows} value={value ?? ''} {...bind} placeholder={placeholder} />
          : <input value={value ?? ''} {...bind} placeholder={placeholder} />}
      <button type="button" className="pvbtn" title={preview ? 'Revenir à la saisie' : 'Aperçu du rendu formaté'} onClick={() => setPreview(p => !p)}>{preview ? <Pencil size={13} /> : <Eye size={13} />}</button>
    </div>
  </div>;
}
/** `bind(setter)` se répand sur le <input>/<textarea> cible : `onFocus` retient le champ pour
 *  la barre d'outils (dernier champ focalisé — c'est ce qui permet à UN SEUL groupe
 *  d'icônes de servir tous les champs d'une session d'édition), `onChange` garde le champ
 *  éditable (un champ contrôlé SANS onChange est gelé par React). Les balises ne sont
 *  insérées QUE par `fmt`/`color` sur la sélection du dernier champ focalisé
 *  (wrapSel pure, unitaire dans test/fmt.test.js). */
export const useFmt = (set) => {
  const f = useRef(null);
  const bind = s => ({ onFocus: e => { f.current = { el: e.target, set: s ?? set }; }, onChange: e => (s ?? set)(e.target.value) });
  const apply = make => { const x = f.current; if (!x) return;
    const s = x.el.selectionStart ?? 0, e = x.el.selectionEnd ?? 0, r = make(x.el.value, s, e);
    x.set(r.text); requestAnimationFrame(() => x.el.setSelectionRange?.(r.cursor, r.cursor)); };
  return { bind, fmt: (m, after) => apply((v, s, e) => wrapSel(v, s, e, m, after ?? m)), color: h => apply((v, s, e) => wrapSel(v, s, e, `[rgb:${rgbOf(h)}]`, '[/rgb]')) }; };
