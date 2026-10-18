// Copie exacte de backend/src/game/terrain.ts (règle de coût partagée)
const h = (x, y) => { const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return n - Math.floor(n); };
export function noiseAt(x, y) {
  const s = 8, gx = Math.floor(x / s), gy = Math.floor(y / s), ex = x / s - gx, ey = y / s - gy, fx = ex * ex * (3 - 2 * ex), fy = ey * ey * (3 - 2 * ey);
  return h(gx, gy) * (1 - fx) * (1 - fy) + h(gx + 1, gy) * fx * (1 - fy) + h(gx, gy + 1) * (1 - fx) * fy + h(gx + 1, gy + 1) * fx * fy;
}

export function terrain(x, y) {
  const v = noiseAt(x, y);
  if (v < 0.14) return { kind: 'deep', cost: 99, resource: 'perle' };          // eau profonde : navire, monture volante ou aquatique
  if (v < 0.22) return { kind: 'shallow', cost: 4, resource: 'eau' };          // eau peu profonde : accessible à pied / en monture terrestre (4)
  if (v < 0.58) return { kind: 'plain', cost: 1, resource: 'herbe' };
  if (v < 0.74) return { kind: 'forest', cost: 2, resource: 'bois' };
  return { kind: 'mountain', cost: 3, resource: 'pierre' };
}
