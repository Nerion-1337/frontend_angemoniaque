import { useEffect, useRef } from 'react';
import { terrain } from '../lib/terrain';
/**
 * Mini-carte admin (onglet Liste du détail de monstre) : grille colorée par type de terrain
 * (même source de données que le jeu — `lib/terrain`), points des instances de la carte,
 * clic → renvoie la case (x, y) pour le déplacement / le placement.
 */
const COLORS = { plain: '#2c3a2c', forest: '#1d3020', mountain: '#454550', arid: '#443927', snow: '#5c6875', ether: '#372c4e', volcano: '#4b2419', shallow: '#1c3241', deep: '#12202c' };
export default function MiniMap({ width, height, mapId, items, selected, pending, onPick }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const S = 2; cv.width = width * S; cv.height = height * S;
    const g = cv.getContext('2d');
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      g.fillStyle = COLORS[terrain(x, y, mapId).kind] ?? '#222222';
      g.fillRect(x * S, y * S, S, S);
    }
    for (const it of items ?? []) {
      g.fillStyle = it.id === selected ? '#ff5252' : '#f0d48a';
      g.beginPath(); g.arc(it.x * S + S / 2, it.y * S + S / 2, S, 0, 7); g.fill();
    }
    if (pending) { g.strokeStyle = '#ffffff'; g.lineWidth = 1.5; g.strokeRect(pending.x * S, pending.y * S, S, S); }
  }, [width, height, mapId, items, selected, pending]);
  return <canvas ref={ref} className="minimap" title="Cliquez sur une case pour la sélectionner" onClick={e => {
    const cv = ref.current, r = cv.getBoundingClientRect();
    const x = Math.floor((e.clientX - r.left) / (r.width / width)), y = Math.floor((e.clientY - r.top) / (r.height / height));
    if (x >= 0 && y >= 0 && x < width && y < height) onPick(x, y);
  }} />;
}
