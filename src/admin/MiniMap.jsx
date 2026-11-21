import { useEffect, useRef, useState } from 'react';
import { terrain } from '../lib/terrain';
/**
 * Mini-carte admin (détail de monstre — onglet Liste) : grille colorée par le terrain du jeu
 * (`lib/terrain`), points des instances de la carte. Vues :
 *  - **zoom** (molette ou +/−, autour du curseur) et **pan** (glisser la carte) ;
 *  - un clic (sans glisser) renvoie la case (x, y) via `onPick` (déplacement / placement).
 */
const COLORS = { plain: '#2c3a2c', forest: '#1d3020', mountain: '#454550', arid: '#443927', snow: '#5c6875', ether: '#372c4e', volcano: '#4b2419', shallow: '#1c3241', deep: '#12202c' };
const CSS_W = 420;   // largeur d'affichage (px) — la hauteur suit l'aspect de la carte
export default function MiniMap({ width, height, mapId, items, selected, pending, onPick }) {
  const ref = useRef(null), drag = useRef(null);
  // Vue en cases : { x, y, w } (haut-gauche + nombre de cases visibles en large ; h suit l'aspect)
  const [view, setView] = useState({ x: 0, y: 0, w: width });
  const h = view.w * height / width;
  useEffect(() => { setView({ x: 0, y: 0, w: width }); }, [mapId, width]);   // nouvelle carte → vue pleine
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const S = 2; const cssW = CSS_W, cssH = cssW * height / width;
    cv.width = cssW * S; cv.height = cssH * S; cv.style.width = cssW + 'px'; cv.style.height = cssH + 'px';
    const g = cv.getContext('2d');
    const sc = cssW / view.w;   // px par case
    const x0 = Math.max(0, Math.floor(view.x)), y0 = Math.max(0, Math.floor(view.y));
    const x1 = Math.min(width, Math.ceil(view.x + view.w)), y1 = Math.min(height, Math.ceil(view.y + h));
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      g.fillStyle = COLORS[terrain(x, y, mapId).kind] ?? '#222222';
      g.fillRect((x - view.x) * sc * S, (y - view.y) * sc * S, Math.ceil(sc * S), Math.ceil(sc * S));
    }
    for (const it of items ?? []) {
      g.fillStyle = it.id === selected ? '#ff5252' : '#f0d48a';
      g.beginPath(); g.arc((it.x - view.x) * sc * S + sc * S / 2, (it.y - view.y) * sc * S + sc * S / 2, Math.max(2, sc * S / 3), 0, 7); g.fill();
    }
    if (pending) { g.strokeStyle = '#ffffff'; g.lineWidth = 2; g.strokeRect((pending.x - view.x) * sc * S, (pending.y - view.y) * sc * S, sc * S, sc * S); }
  }, [view, items, selected, pending, mapId, width, height]);
  const zoom = (f, px = null, py = null) => {
    setView(v => {
      const nh = v.w * height / width;
      const w2 = Math.min(width, Math.max(8, v.w / f));
      // pivot au curseur (px proportionnel de la vue) sinon au centre
      const fx = px != null ? px : 0.5, fy = py != null ? py : 0.5;
      const cx = v.x + v.w * fx, cy = v.y + nh * fy;
      return { x: cx - w2 * fx, y: cy - (w2 * height / width) * fy, w: w2 };
    });
  };
  // Molette : écouteur natif non-passif (React rend preventDefault impossible en passif)
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const onWheel = e => {
      e.preventDefault();
      const r = cv.getBoundingClientRect();
      zoom(e.deltaY < 0 ? 1.25 : 0.8, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };
    cv.addEventListener('wheel', onWheel, { passive: false });
    return () => cv.removeEventListener('wheel', onWheel);
  }, [width, height]);
  const tileAt = (e, v = view) => {
    const cv = ref.current, r = cv.getBoundingClientRect();
    const scale = r.width / v.w;
    return { x: Math.floor(v.x + (e.clientX - r.left) / scale), y: Math.floor(v.y + (e.clientY - r.top) / scale) };
  };
  return <div className="minimapwrap">
    <div className="minimapctl">
      <button className="sm" title="Zoom avant" onClick={() => zoom(1.4)}>+</button>
      <button className="sm" title="Zoom arrière" onClick={() => zoom(1 / 1.4)}>−</button>
      <button className="sm" title="Vue complète" onClick={() => setView({ x: 0, y: 0, w: width })}>⌂</button>
    </div>
    {pending && <div className="minimapinfo">case {pending.x},{pending.y}</div>}
    <canvas ref={ref} className="minimap"
      onPointerDown={e => { drag.current = { sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => {
        const d = drag.current; if (!d) return;
        const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
        if (d.moved) { const scale = ref.current.getBoundingClientRect().width / view.w; setView({ ...view, x: d.vx - dx / scale, y: d.vy - dy / scale }); }
      }}
      onPointerUp={e => {
        const d = drag.current; drag.current = null;
        if (d && !d.moved) { const t = tileAt(e); if (t.x >= 0 && t.y >= 0 && t.x < width && t.y < height) onPick(t); }
      }} />
  </div>;
}
