import { useEffect, useMemo, useRef, useState } from 'react';
import { terrain } from '../lib/terrain';
import { RESOURCES } from '../lib/resources'; import { RESOURCES2 } from '../lib/resources2';
import { cellResource, sortSectors } from './deposits.js';
/**
 * Carte des ressources (admin « Ressources ») : terrain du jeu (`lib/terrain`), ressource de chaque case (naturelle ou attribuée
 * par un secteur, `cellResource`), contours des secteurs. Molette / +− : zoom ; outil « Déplacer » : glisser = pan ;
 * outil « Tracer » : glisser = nouvelle zone (`onZone`) ; un clic sans glisser = `onCell` (ouvre le secteur de la case).
 */
export const RES_COLOR = Object.fromEntries([...RESOURCES, ...RESOURCES2].map(r => [r.id, r.color ?? '#cccccc']));
const KIND_COLOR = { plain: '#2c3a2c', forest: '#1d3020', mountain: '#454550', arid: '#443927', snow: '#5c6875', ether: '#372c4e', volcano: '#4b2419', shallow: '#1c3241', deep: '#12202c' };
const CSS_W = 640, S = 2;
export default function ResourceMap({ width, height, mapId, sectors, selected, draft, focus, showRes, tool, onZone, onCell, onHover }) {
  const ref = useRef(null), drag = useRef(null);
  const [view, setView] = useState({ x: 0, y: 0, w: width }), [sel, setSel] = useState(null);
  const vh = view.w * height / width, sorted = useMemo(() => sortSectors(sectors), [sectors]);
  useEffect(() => { setView({ x: 0, y: 0, w: width }); }, [mapId, width]);   // nouvelle carte → vue pleine
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const cssH = CSS_W * height / width; cv.width = CSS_W * S; cv.height = cssH * S;
    const g = cv.getContext('2d'), sc = (CSS_W / view.w) * S, px = Math.ceil(sc);
    const x0 = Math.max(0, Math.floor(view.x)), y0 = Math.max(0, Math.floor(view.y)), x1 = Math.min(width, Math.ceil(view.x + view.w)), y1 = Math.min(height, Math.ceil(view.y + vh));
    g.fillStyle = '#0b1218'; g.fillRect(0, 0, cv.width, cv.height);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const t = terrain(x, y, mapId), X = (x - view.x) * sc, Y = (y - view.y) * sc;
      g.globalAlpha = 1; g.fillStyle = KIND_COLOR[t.kind] ?? '#222'; g.fillRect(X, Y, px, px);
      if (!showRes) continue;
      const r = cellResource(x, y, t, sorted); if (!r) continue;
      g.globalAlpha = focus ? (r.id === focus ? 1 : 0.12) : r.sector ? 0.95 : 0.55;
      g.fillStyle = RES_COLOR[r.id] ?? '#ccc';
      if (sc >= 16) g.fillRect(X + sc * 0.2, Y + sc * 0.2, sc * 0.6, sc * 0.6); else g.fillRect(X, Y, px, px);
    }
    g.globalAlpha = 1;
    const rect = (r, color, w, dash = []) => { g.setLineDash(dash); g.strokeStyle = color; g.lineWidth = w;
      g.strokeRect((r.x_min - view.x) * sc, (r.y_min - view.y) * sc, (r.x_max - r.x_min + 1) * sc, (r.y_max - r.y_min + 1) * sc); };
    for (const d of sectors) if (d.id !== selected) rect(d, d.active ? 'rgba(255,255,255,.55)' : 'rgba(160,160,160,.5)', 2, d.active ? [] : [4, 4]);
    const cur = sectors.find(d => d.id === selected); if (cur) rect(cur, '#f0d48a', 4);
    const z = sel ?? draft; if (z) rect({ x_min: Math.min(z.xMin, z.xMax), x_max: Math.max(z.xMin, z.xMax), y_min: Math.min(z.yMin, z.yMax), y_max: Math.max(z.yMin, z.yMax) }, '#ffffff', 3, [8, 6]);
    g.setLineDash([]);
  }, [view, sectors, sorted, selected, draft, sel, focus, showRes, mapId, width, height]);
  const zoom = (f, fx = 0.5, fy = 0.5) => setView(v => {
    const w2 = Math.min(width, Math.max(10, v.w / f)), cx = v.x + v.w * fx, cy = v.y + (v.w * height / width) * fy;
    return { x: cx - w2 * fx, y: cy - (w2 * height / width) * fy, w: w2 };
  });
  useEffect(() => {   // molette : écouteur natif non passif
    const cv = ref.current; if (!cv) return;
    const onWheel = e => { e.preventDefault(); const r = cv.getBoundingClientRect(); zoom(e.deltaY < 0 ? 1.25 : 0.8, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); };
    cv.addEventListener('wheel', onWheel, { passive: false }); return () => cv.removeEventListener('wheel', onWheel);
  }, [width, height]);
  const tileAt = e => { const r = ref.current.getBoundingClientRect(), k = r.width / view.w;
    return { x: Math.min(width - 1, Math.max(0, Math.floor(view.x + (e.clientX - r.left) / k))), y: Math.min(height - 1, Math.max(0, Math.floor(view.y + (e.clientY - r.top) / k))) }; };
  return <div className="resmapwrap">
    <div className="minimapctl">
      <button className="sm" title="Zoom avant" onClick={() => zoom(1.4)}>+</button>
      <button className="sm" title="Zoom arrière" onClick={() => zoom(1 / 1.4)}>−</button>
      <button className="sm" title="Vue complète" onClick={() => setView({ x: 0, y: 0, w: width })}>⌂</button>
    </div>
    <canvas ref={ref} className={`resmap ${tool}`} aria-label="Carte des ressources du monde"
      onPointerDown={e => { const t = tileAt(e); drag.current = { sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, t, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => {
        const t = tileAt(e); onHover?.(t);
        const d = drag.current; if (!d) return;
        const dx = e.clientX - d.sx, dy = e.clientY - d.sy; if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
        if (!d.moved) return;
        if (tool === 'select') setSel({ xMin: d.t.x, yMin: d.t.y, xMax: t.x, yMax: t.y });
        else { const k = ref.current.getBoundingClientRect().width / view.w; setView({ ...view, x: d.vx - dx / k, y: d.vy - dy / k }); }
      }}
      onPointerLeave={() => onHover?.(null)}
      onPointerUp={e => {
        const d = drag.current; drag.current = null; if (!d) return;
        const t = tileAt(e);
        if (!d.moved) onCell?.(t);
        else if (tool === 'select') { setSel(null); onZone?.({ xMin: Math.min(d.t.x, t.x), yMin: Math.min(d.t.y, t.y), xMax: Math.max(d.t.x, t.x), yMax: Math.max(d.t.y, t.y) }); }
      }} />
  </div>;
}
