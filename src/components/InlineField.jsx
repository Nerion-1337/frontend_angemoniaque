import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { FmtBar, FPrev, useFmt } from './fmtbar';
/**
 * Champ éditable **en place** (composant générique, réutilisable dans tout composant) :
 * la balise qui AFICHÉ le texte se transforme elle-même en <input>/<textarea> — il n'est
 * créé AUCUN nouveau champ (pas de boîte d'édition ajoutée dans le flux de la page).
 *
 *  <InlineField
 *    value={item.name}                          // valeur courante (le parent est la source de vérité)
 *    display={txt => <b>{txt}</b>}              // la balise d'affichage (défaut : <b>{txt}</b>)
 *    pencil                                     // crayon interne (défaut : vrai ; false si le parent a son propre déclencheur)
 *    canEdit={perm}                             // masque le crayon interne sinon
 *    multiline rows={2} placeholder="…"
 *    fmt                                        // + FmtBar (B / I / #) + aperçu live du brouillon (FPrev)
 *    onSave={v => Promise}                      // le parent fait l'appel API :
 *                                                 //   résout  → retour à l'affichage
 *                                                 //   reste pending (erreur toastée) → le champ reste ouvert
 *
 * Clavier : Entrée = enregistrer (dans un textarea, Maj+Entrée saute une ligne), Échap = annuler.
 * Le texte est strictement du texte : le rendu affiché et l'aperçu passent par `fmt` (échappement
 * HTML d'abord) — jamais de HTML brut.
 */
export default function InlineField({ value, display, pencil = true, canEdit, multiline, rows = 2, placeholder, fmt: withFmt, onSave }) {
  const [ed, setEd] = useState(false);
  const [v, setV] = useState(value ?? '');
  const fm = useFmt();
  const start = () => { setV(value ?? ''); setEd(true); };
  const save = () => {
    onSave(v).then(() => setEd(false), () => { /* erreur (toastée par le parent) → le champ reste ouvert */ });
  };
  const cancel = () => setEd(false);
  if (ed) {
    const onKey = e => {
      if (e.key === 'Escape') cancel();
      if (e.key === 'Enter' && !(multiline && e.shiftKey)) { e.preventDefault(); save(); }
    };
    return <span className="infield edit">
      {withFmt && <FmtBar onFmt={fm.fmt} onColor={fm.color} />}
      {multiline
        ? <textarea rows={rows} autoFocus value={v} placeholder={placeholder} {...fm.bind(setV)} onKeyDown={onKey} />
        : <input autoFocus value={v} placeholder={placeholder} {...fm.bind(setV)} onKeyDown={onKey} />}
      {withFmt && <FPrev text={v} />}
      <small className="ihint">Entrée : enregistrer · Échap : annuler</small>
    </span>;
  }
  const D = display ?? (t => <b>{t ?? ''}</b>);
  return <span className="infield">
    {D(value)}
    {pencil && canEdit && <button className="btnlike itool" title="Éditer" onClick={start}><Pencil size={12} /></button>}
  </span>;
}
