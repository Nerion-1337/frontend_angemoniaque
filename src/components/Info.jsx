import { useRef, useState } from 'react'; import { createPortal } from 'react-dom'; import { Info as InfoIcon } from 'lucide-react';
/** Petite icône « i » : l'infobulle s'affiche au survol (ou au focus / clic sur mobile). Rendue dans <body> pour ne jamais être coupée par une fenêtre. */
export default function Info({ title, children, size = 14 }) {
  const ref = useRef(), [tip, setTip] = useState(null);
  const show = () => { const r = ref.current.getBoundingClientRect(), w = Math.min(340, innerWidth - 24), left = Math.min(Math.max(12, r.left + r.width / 2 - w / 2), innerWidth - w - 12), up = r.bottom + 240 > innerHeight && r.top > 240; setTip({ left, w, y: up ? r.top - 8 : r.bottom + 8, up }); };
  return <><button type="button" ref={ref} className="info" aria-label={`Informations : ${title}`} onMouseEnter={show} onMouseLeave={() => setTip(null)} onFocus={show} onBlur={() => setTip(null)} onClick={e => { e.stopPropagation(); tip ? setTip(null) : show(); }}><InfoIcon size={size} /></button>
    {tip && createPortal(<div className="tip" role="tooltip" style={{ left: tip.left, width: tip.w, top: tip.y, transform: tip.up ? 'translateY(-100%)' : 'none' }}><b>{title}</b>{children}</div>, document.body)}</>;
}
