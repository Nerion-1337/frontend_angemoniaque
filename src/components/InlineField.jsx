import { useEffect, useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { fmt } from '../lib/fmt';
import { richToFmt } from '../lib/rich';
import { RichBar } from './fmtbar';
/**
 * Éditeur riche **WYSIWYG en place** (composant générique, réutilisable dans tout composant) :
 * au crayon, la balise qui AFICHÉ le texte se transforme en conteneur `contentEditable` —
 * aucun champ `<input>/<textarea>`, aucun code visible (zéro `**`, zéro `#hex` texte) :
 *
 *  - graine : `contentEditable.innerHTML = fmt(value)` (le texte est échappé AVANT formatage :
 *    les balises injectées ne proviennent QUE du jeu fixe de `fmt` → sûr) ;
 *  - Gras / Italique : `document.execCommand` sur la sélection (comportement type Word) ;
 *  - Couleur : enveloppement Range API du seul contenu sélectionné (src/lib/rich.js) ;
 *  - actions ✓ (title « Enregistrer ») / ✕ (title « Annuler ») à côté de la zone + clavier :
 *    Entrée = enregistrer (Ctrl/Cmd+Entrée en multiligne, Entrée = saut de ligne),
 *    Échap = annule et rétablit le texte d'origine ;
 *  - à la validation : le DOM est sérialisé vers le format texte `fmt` avec liste blanche
 *    stricte (seuls `**`, `*`, `#rrggbb:text#` et `\n` passent — tout autre HTML est réduit à
 *    son texte), `onSave(texte)` (Promise du parent) : résolution → retour affichage ;
 *    refus/erreur (toastée) → le champ reste ouvert avec le brouillon.
 *
 *  <InlineField value={item.name} display={t => <b>{t}</b>} canEdit={perm}
 *               multiline={false} placeholder="…" onSave={v => Promise} />
 */
export default function InlineField({ value, display, pencil = true, canEdit, multiline, placeholder, onSave }) {
  const [ed, setEd] = useState(false);
  const edRef = useRef(null);
  useEffect(() => {
    if (ed && edRef.current) edRef.current.innerHTML = fmt(value) || '<br>'; // graine visuelle (fmt = échappement + jeu de balises fixe)
  }, [ed]);
  const save = () => {
    const text = edRef.current ? richToFmt(edRef.current, { multiline }) : '';
    onSave(text).then(() => setEd(false), () => { /* erreur toastée par le parent → reste ouvert */ });
  };
  const cancel = () => setEd(false);
  const onKey = e => {
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    else if (e.key === 'Enter' && (!multiline || e.ctrlKey || e.metaKey)) { e.preventDefault(); save(); }
  };
  if (ed) {
    return <span className="infield edit rich">
      <RichBar elRef={edRef} onOk={save} onCancel={cancel} />
      <div ref={edRef} className="edbody" contentEditable suppressContentEditableWarning data-ph={placeholder}
        onPaste={e => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); }}
        onKeyDown={onKey} />
      <small className="ihint">{multiline ? 'Ctrl+Entrée : enregistrer · Échap : annuler' : 'Entrée : enregistrer · Échap : annuler'}</small>
    </span>;
  }
  const D = display ?? (t => <b>{t ?? ''}</b>);
  return <span className="infield">
    {D(value)}
    {pencil && canEdit && <button className="btnlike itool" title="Éditer" onClick={() => setEd(true)}><Pencil size={12} /></button>}
  </span>;
}
