import { useEffect } from 'react'; import { createPortal } from 'react-dom';
/** Fenêtre modale rendue dans <body> : indépendante des parents (un ancêtre avec backdrop-filter/transform devient le repère des éléments « fixed »
 *  et enfermait la fenêtre dans son propre cadre). Échap ou clic hors de la fenêtre pour fermer. */
export default function Modal({ onClose, className = 'inv', label, children }) {
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, [onClose]);
  return createPortal(<div className="modal" onClick={onClose}><div className={className} role="dialog" aria-modal="true" aria-label={label} onClick={e => e.stopPropagation()}>{children}</div></div>, document.body);
}
