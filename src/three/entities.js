import * as THREE from 'three'; import { hash } from '../lib/relief';
const M = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });
const stone = () => M(0x8a867f, { roughness: 0.95 }), mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; return o; };
function label(text, color = '#fff') { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d'); g.font = '600 30px "Alegreya Sans", system-ui, sans-serif'; g.textAlign = 'center'; g.lineWidth = 6; g.strokeStyle = 'rgba(8,8,16,.85)'; g.strokeText(text, 128, 40); g.fillStyle = color; g.fillText(text, 128, 40);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true })); s.scale.set(1.9, 0.48, 1); s.renderOrder = 20; return s; }
function person(race, me) {
  const g = new THREE.Group(), robe = { human: 0x7a5a3a, demon: 0x3b0f12, angel: 0xeef1fb }[race] ?? 0x888, skin = 0xd9a77e;
  g.add(mesh(new THREE.CapsuleGeometry(0.2, 0.5, 6, 14), M(robe, { roughness: 0.6 }), 0, 0.55, 0), mesh(new THREE.SphereGeometry(0.13, 20, 16), M(skin, { roughness: 0.55 }), 0, 1.13, 0), mesh(new THREE.TorusGeometry(0.2, 0.025, 8, 20), M(0x2a2018), 0, 0.62, 0));
  g.children[2].rotation.x = Math.PI / 2;
  if (race === 'angel') { for (const s of [-1, 1]) { const w = mesh(new THREE.SphereGeometry(0.4, 18, 12), M(0xffffff, { roughness: 0.4, emissive: 0x9fb8ff, emissiveIntensity: 0.25 }), s * 0.3, 0.85, -0.18); w.scale.set(0.09, 1.05, 0.55); w.rotation.z = s * 0.35; g.add(w); }
    g.add(mesh(new THREE.TorusGeometry(0.13, 0.015, 8, 28), M(0xffe6a0, { emissive: 0xffd36a, emissiveIntensity: 2.2 }), 0, 1.42, 0)); g.children.at(-1).rotation.x = Math.PI / 2; }
  if (race === 'demon') { for (const s of [-1, 1]) { const h = mesh(new THREE.ConeGeometry(0.035, 0.24, 8), M(0x1a0c0c, { roughness: 0.4 }), s * 0.09, 1.3, 0); h.rotation.z = -s * 0.5; g.add(h); const e = mesh(new THREE.SphereGeometry(0.018, 8, 8), M(0xff3b1a, { emissive: 0xff3b1a, emissiveIntensity: 4 }), s * 0.05, 1.15, 0.12); g.add(e); } }
  if (race === 'human') g.add(mesh(new THREE.BoxGeometry(0.34, 0.5, 0.04), M(0x24406b, { roughness: 0.9 }), 0, 0.62, -0.2));
  if (me) { const r = mesh(new THREE.RingGeometry(0.34, 0.4, 36).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xf0d28a, transparent: true, opacity: 0.9 }), 0, 0.03, 0); r.castShadow = false; g.add(r); }
  return g;
}
const BEAST = { 'Léviathan': [0x1d5878, 0x2bd0ff], Balrog: [0x3a0f08, 0xff5a1f], Minotaure: [0x5b3b24, 0xffc060] };
function beast(name) {
  const [col, glow] = BEAST[name] ?? [0x444444, 0xff0000], g = new THREE.Group(), body = mesh(new THREE.SphereGeometry(0.5, 20, 16), M(col, { roughness: 0.55 }), 0, 0.85, 0); body.scale.set(1, 0.85, 1.5); g.add(body);
  for (const [x, z] of [[-.3, .45], [.3, .45], [-.3, -.45], [.3, -.45]]) g.add(mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.7, 8), M(col), x, 0.35, z));
  g.add(mesh(new THREE.SphereGeometry(0.28, 18, 14), M(col, { roughness: 0.5 }), 0, 1.25, 0.8));
  for (const s of [-1, 1]) { const h = mesh(new THREE.ConeGeometry(0.07, 0.55, 8), M(0xe9e2cf, { roughness: 0.4 }), s * 0.22, 1.6, 0.8); h.rotation.z = -s * 0.7; g.add(h); g.add(mesh(new THREE.SphereGeometry(0.04, 8, 8), M(glow, { emissive: glow, emissiveIntensity: 5 }), s * 0.1, 1.3, 1.04)); }
  g.add(new THREE.PointLight(glow, 3, 4)); g.scale.setScalar(1.7); return g;
}
function building(e) {
  const g = new THREE.Group(), k = e.building_kind;
  if (k === 'capital') { g.add(mesh(new THREE.BoxGeometry(1.5, 1.2, 1.5), stone(), 0, 0.6, 0)); for (const [x, z] of [[-.8, -.8], [.8, -.8], [-.8, .8], [.8, .8]]) { g.add(mesh(new THREE.CylinderGeometry(0.28, 0.32, 1.8, 12), stone(), x, 0.9, z)); g.add(mesh(new THREE.ConeGeometry(0.4, 0.7, 12), M(0x6b2a24, { roughness: 0.7 }), x, 2.15, z)); }
    g.add(mesh(new THREE.BoxGeometry(0.4, 0.7, 0.05), M(0x2a1a0e), 0, 0.35, 0.76), mesh(new THREE.BoxGeometry(0.1, 0.15, 0.05), M(0xffd27a, { emissive: 0xffb347, emissiveIntensity: 2 }), 0.4, 0.9, 0.76)); g.scale.setScalar(1.1); }
  else if (k === 'door') { for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.28, 2.2, 0.4), stone(), s * 0.5, 1.1, 0)); g.add(mesh(new THREE.BoxGeometry(1.3, 0.3, 0.45), stone(), 0, 2.25, 0));
    const p = mesh(new THREE.PlaneGeometry(0.75, 2), new THREE.MeshBasicMaterial({ color: 0xa87bff, transparent: true, opacity: 0.55, side: THREE.DoubleSide }), 0, 1.1, 0); p.castShadow = false; g.add(p); g.add(new THREE.PointLight(0xa87bff, 4, 5).translateY(1.2));
    g.userData.tick = t => { p.material.opacity = 0.45 + Math.sin(t * 2) * 0.12; }; }
  else if (k === 'tower') { g.add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 2.2, 14), stone(), 0, 1.1, 0), mesh(new THREE.ConeGeometry(0.58, 0.8, 14), M(0x56372a, { roughness: 0.8 }), 0, 2.6, 0)); }
  else if (k === 'factory') { g.add(mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), M(0x7a5a40, { roughness: 0.9 }), 0, 0.35, 0), mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.8, 8), stone(), 0.25, 1, 0.2), mesh(new THREE.BoxGeometry(0.2, 0.18, 0.04), M(0xffb347, { emissive: 0xff8c1a, emissiveIntensity: 2.5 }), -0.2, 0.4, 0.46)); }
  else if (k === 'totem') { g.add(mesh(new THREE.BoxGeometry(0.34, 1.6, 0.34), M(0x3d3a45, { roughness: 0.8 }), 0, 0.8, 0), mesh(new THREE.OctahedronGeometry(0.2), M(0x7be0ff, { emissive: 0x38c8ff, emissiveIntensity: 3 }), 0, 1.9, 0)); g.add(new THREE.PointLight(0x38c8ff, 2.5, 4).translateY(1.9)); g.userData.tick = t => { g.children[1].rotation.y = t; g.children[1].position.y = 1.9 + Math.sin(t * 2) * 0.06; }; }
  else g.add(mesh(new THREE.BoxGeometry(0.98, 1, 0.98), stone(), 0, 0.5, 0));       // mur
  return g;
}
function mountModel(flying) {
  const g = new THREE.Group(), col = flying ? 0xa3201c : 0xe9e6dc, body = mesh(new THREE.SphereGeometry(0.34, 18, 14), M(col, { roughness: 0.5 }), 0, 0.5, 0); body.scale.set(0.9, 0.8, 1.5); g.add(body);
  const neck = mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.45, 8), M(col), 0, 0.82, 0.42); neck.rotation.x = 0.6; g.add(neck, mesh(new THREE.SphereGeometry(0.13, 14, 12), M(col), 0, 1.05, 0.6));
  if (flying) { for (const s of [-1, 1]) { const w = mesh(new THREE.SphereGeometry(0.5, 16, 10), M(0xc4302a, { roughness: 0.6, emissive: 0x5a0c08, emissiveIntensity: 0.4 }), s * 0.55, 0.78, -0.05); w.scale.set(1, 0.06, 0.55); w.rotation.z = s * 0.25; g.add(w); } g.userData.tick = t => g.children.slice(3).forEach((w, i) => { w.rotation.z = (i ? -1 : 1) * (0.25 + Math.sin(t * 5) * 0.28); }); }
  else for (const [x, z] of [[-.16, .3], [.16, .3], [-.16, -.3], [.16, -.3]]) g.add(mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.45, 6), M(col), x, 0.22, z));
  return g;
}
function golem() {
  const g = new THREE.Group(), st = M(0x5d6b7a, { roughness: 0.9 }); g.add(mesh(new THREE.BoxGeometry(0.62, 0.7, 0.4), st, 0, 0.7, 0), mesh(new THREE.BoxGeometry(0.36, 0.3, 0.32), st, 0, 1.18, 0));
  for (const s of [-1, 1]) { g.add(mesh(new THREE.BoxGeometry(0.2, 0.7, 0.22), st, s * 0.45, 0.65, 0), mesh(new THREE.BoxGeometry(0.22, 0.5, 0.26), st, s * 0.17, 0.25, 0), mesh(new THREE.SphereGeometry(0.035, 8, 8), M(0x5fe8ff, { emissive: 0x5fe8ff, emissiveIntensity: 5 }), s * 0.08, 1.2, 0.17)); }
  g.add(new THREE.PointLight(0x5fe8ff, 1.5, 3).translateY(1.2)); return g;
}
const RACE_COL = { human: '#e8c89a', demon: '#ff8a70', angel: '#cfeaff' };
export function makeEntity(e, me) {
  let g = e.kind === 'monster' ? beast(e.name) : e.kind === 'building' ? building(e) : e.kind === 'summon' ? golem() : person(e.race, me);
  if (e.kind === 'character' && e.mount_name) { const m = mountModel(e.mount_flying), rider = g; rider.position.y = 0.42; m.add(rider); m.userData.tick = m.userData.tick; g = m; }
  const h = e.mount_name ? 2.2 : e.kind === 'summon' ? 1.9 : e.kind === 'monster' ? 3.3 : e.kind === 'building' ? (e.building_kind === 'capital' ? 3.3 : 2.9) : 1.75;
  const wrap = new THREE.Group(); wrap.add(g); wrap.userData.tick = g.userData.tick; const l = label(e.name ?? '', e.kind === 'character' ? RACE_COL[e.race] ?? '#fff' : e.kind === 'monster' ? '#ff9a8a' : e.kind === 'summon' ? '#8fe9ff' : '#f0d28a'); l.position.y = h; wrap.add(l); return wrap;
}
