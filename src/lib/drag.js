import { useRef, useState } from 'react';
/** Drag & drop des lignes d'affichage (appui + glissement, seuil 8 px pour préserver les clics).
 *  `count` = nombre de lignes (peut varier entre rendus), `onDrop(from, to)` appelé au relâchement
 *  (to = indice d'insertion 0..count), `listRef` = ref du conteneur (position:relative) servant de
 *  repère vertical. Le drag ne démarre jamais depuis un champ/bouton interne (input/button/…). */
export const useDrag = (count, onDrop, listRef) => {
  const pending = useRef(null), overRef = useRef(null), justDrag = useRef(false), rowRefs = useRef([]);
  const [drag, setDrag] = useState(null), [lineY, setLineY] = useState(0);
  const dropIndex = y => { const rr = listRef.current?.getBoundingClientRect(); if (!rr) return count;
    for (let j = 0; j < count; j++) { const el = rowRefs.current[j]; if (!el) continue;
      const r = el.getBoundingClientRect(); if (y < r.top + r.height / 2) return j; }
    return count; };
  const rowProps = i => ({
    ref: el => rowRefs.current[i] = el,
    onPointerDown: e => { if (e.target.closest('button,input,select,label,a,textarea')) return;
      pending.current = { from: i, startY: e.clientY, active: false }; e.currentTarget.setPointerCapture?.(e.pointerId); },
    onPointerMove: e => { const p = pending.current; if (!p) return;
      if (!p.active) { if (Math.abs(e.clientY - p.startY) < 8) return; p.active = true; setDrag({ from: p.from }); }
      e.preventDefault();
      const over = dropIndex(e.clientY); overRef.current = over;
      const rr = listRef.current?.getBoundingClientRect(), el = over > 0 ? rowRefs.current[over - 1] : rowRefs.current[over];
      if (!rr || !el) return;
      const b = el.getBoundingClientRect(); setLineY((over > 0 ? b.bottom : b.top) - rr.top); },
    onPointerUp: e => { const p = pending.current; pending.current = null; setDrag(null);
      if (!p?.active) return;
      justDrag.current = true; setTimeout(() => justDrag.current = false, 0);
      onDrop(p.from, overRef.current ?? dropIndex(e.clientY)); },
    onPointerCancel: () => { pending.current = null; setDrag(null); } });
  return { rowProps, drag, lineY, justDrag }; };
