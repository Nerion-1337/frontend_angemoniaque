import * as THREE from 'three'; import { noiseAt, terrain } from './terrain';
// Eau : le fond descend en pente raide sous le niveau d'eau ; relief des montagnes accentué.
const base = v => (v < 0.22 ? (0.22 - 0.34) * 1.6 - (0.22 - v) * 5.5 : (v - 0.34) * 1.6 + Math.max(0, v - 0.58) ** 2 * 34);
export const WATER_Y = base(0.22);
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const micro = (x, y) => (noiseAt(x * 2.7 + 50, y * 2.7 + 50) - 0.5) * 0.09 + (noiseAt(x * 6.3 + 9, y * 6.3 + 9) - 0.5) * 0.04;
const ridge = (x, y) => 1 - Math.abs(noiseAt(x * 1.9 + 7, y * 1.9 + 3) * 2 - 1);
/** Hauteur continue : mêmes valeurs que le terrain logique aux cases entières, crêtes rocheuses sur les massifs. */
export const heightAt = (x, y) => { const v = noiseAt(x, y); return base(v) + micro(x, y) * (v > 0.22 ? 1 : 0.3) + ridge(x, y) * 0.55 * ss(0.7, 0.86, v); };
const C = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.SRGBColorSpace);
const DEEP = C(.03, .09, .18), SHALLOW = C(.2, .5, .55), SAND = C(.74, .66, .45), GRASS = C(.25, .43, .15), GRASS2 = C(.37, .5, .18), FOREST = C(.1, .24, .09), ROCK = C(.42, .4, .39), ROCK2 = C(.3, .29, .3), SNOW = C(.93, .95, .98);
const g2 = new THREE.Color();
// Teintes par type de case (fondues entre cases voisines) : terres arides, glaces, pics d'éther, volcan.
const ZT = { arid: [C(.76, .6, .34), 0.9], snow: [C(.9, .94, .98), 0.95], ether: [C(.16, .14, .22), 0.9], volcano: [C(.62, .13, .04), 0.92] }, zw = { arid: 0, snow: 0, ether: 0, volcano: 0 };
const ZC = new Map(), tc = new THREE.Color();
// Teinte de sol d'une case : sa zone si elle en définit une (monde Anges & Démons), sinon son type (arides, glaces, éther, volcan).
const cellTint = t => { if (t.ground != null) { let c = ZC.get(t.ground); if (!c) ZC.set(t.ground, c = new THREE.Color().setHex(t.ground, THREE.SRGBColorSpace)); return [c, 0.88]; } return ZT[t.kind]; };
function zoneTint(x, y, out) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0; let r = 0, g = 0, b = 0, s = 0;
  for (let i = 0; i < 4; i++) { const dx = i & 1, dy = i >> 1, w = (dx ? fx : 1 - fx) * (dy ? fy : 1 - fy), z = cellTint(terrain(x0 + dx, y0 + dy)); if (z) { const k = w * z[1]; r += z[0].r * k; g += z[0].g * k; b += z[0].b * k; s += k; } }
  if (s > 0.002) { tc.setRGB(r / s, g / s, b / s); out.lerp(tc, Math.min(1, s)); }
}
/** Couleur de sol : eau profonde → eau peu profonde → sable → herbe → forêt → roche → neige. */
export function groundColor(x, y, h, out) {
  const v = noiseAt(x, y), m = micro(x, y);
  out.copy(DEEP); out.lerp(SHALLOW, ss(0.1, 0.16, v)); out.lerp(SAND, ss(0.2, 0.225, v)); out.lerp(g2.copy(GRASS).lerp(GRASS2, ss(-0.05, 0.07, m)), ss(0.235, 0.27, v));
  out.lerp(FOREST, ss(0.56, 0.62, v)); out.lerp(g2.copy(ROCK).lerp(ROCK2, ss(0.4, 0.75, ridge(x, y))), ss(0.72, 0.78, v)); out.lerp(SNOW, ss(2.4, 3.2, h)); zoneTint(x, y, out); out.multiplyScalar(0.9 + m * 1.2); return out;
}
export const hash = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };
