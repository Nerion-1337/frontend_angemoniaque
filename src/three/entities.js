import * as THREE from 'three'; import { buildCreature } from './creatures.js'; import { designFor } from '../lib/creatureCatalog.js'; import { hash } from '../lib/relief';
const M = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0, ...o });
const stone = () => M(0x8a867f, { roughness: 0.95 }), mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; return o; };
function label(text, color = '#fff') { const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d'); g.font = '600 30px "Alegreya Sans", system-ui, sans-serif'; g.textAlign = 'center'; g.lineWidth = 6; g.strokeStyle = 'rgba(8,8,16,.85)'; g.strokeText(text, 128, 40); g.fillStyle = color; g.fillText(text, 128, 40);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true })); s.scale.set(1.9, 0.48, 1); s.renderOrder = 20; return s; }
// Personnage : jambes, torse, bras, tête (cheveux, yeux), tenue et attributs selon la race ; légère respiration et balancement des bras.
// Néphilim = hybride ange/démon : une aile de plumes et une aile membraneuse, une corne, un demi-halo brisé, yeux vairons, tenue blanc/pourpre.
// Le RANG (1 à 5) change l'allure : 2 épaulières et ceinture de bronze, 3 plastron d'argent et diadème, 4 or et aura au sol,
// 5 couronne rayonnante, orbes en orbite, lumière, silhouette plus grande ; ailes et cornes grandissent avec le rang.
const RACE_LOOK = {
  human: { cloth: 0x7a5a3a, cloth2: 0x24406b, skin: 0xd9a77e, hair: 0x4a3020, boots: 0x3a2a1c },
  angel: { cloth: 0xeef1fb, cloth2: 0xd9b45a, skin: 0xf1d2b8, hair: 0xf4e3a1, boots: 0xcfc6ad },
  demon: { cloth: 0x3b0f12, cloth2: 0x6a1a14, skin: 0xa8544a, hair: 0x1a0c0c, boots: 0x1d0d0d },
  nephilim: { cloth: 0xe9e4f2, cloth2: 0x5e1424, skin: 0xcdbfc4, hair: 0x2a2030, boots: 0x231a24 },
};
/** Métal d'ornement par rang (bronze, argent, or, lumière) ; null au rang 1. */
export const RANK_METAL = { 2: [0xa86b3c, 0], 3: [0xc8ccd6, 0], 4: [0xe0b54a, 0.25], 5: [0xfff0b0, 0.9] };
export const rankOf = r => Math.min(5, Math.max(1, Math.trunc(Number(r) || 1)));
const featherWing = (s, k) => { const w = new THREE.Group(), mat = M(0xffffff, { roughness: 0.45, emissive: 0x9fb8ff, emissiveIntensity: 0.2 });
  for (let j = 0; j < 3; j++) { const f = mesh(new THREE.SphereGeometry(0.36 - j * 0.06, 16, 10), mat, s * (0.22 + j * 0.05), 0.08 - j * 0.12, -j * 0.02); f.scale.set(0.95, 0.42 - j * 0.06, 0.08); f.rotation.z = s * (0.5 - j * 0.25); w.add(f); }
  w.scale.setScalar(k); return w; };
// Aile membraneuse : silhouette de chauve-souris (bord festonné entre les doigts), os sur chaque doigt ; s = côté (-1 / 1).
const BAT_PTS = [[0, 0], [0.18, 0.2], [0.42, 0.36], [0.62, 0.3], [0.5, 0.1], [0.52, -0.06], [0.36, -0.02], [0.3, -0.2], [0.18, -0.08], [0.06, -0.22]];
const batWing = (s, k, col = 0x2a0a10) => { const w = new THREE.Group(), mat = M(col, { roughness: 0.55, side: THREE.DoubleSide, emissive: 0x3a0508, emissiveIntensity: 0.3 });
  const sh = new THREE.Shape(); BAT_PTS.forEach(([x, y], i) => (i ? sh.lineTo(x, y) : sh.moveTo(x, y))); sh.closePath();
  const m = mesh(new THREE.ShapeGeometry(sh), mat); w.add(m);
  for (const [x, y] of [BAT_PTS[3], BAT_PTS[5], BAT_PTS[7], BAT_PTS[9]]) { const len = Math.hypot(x, y), bone = mesh(new THREE.CylinderGeometry(0.01, 0.006, len, 5).translate(0, len / 2, 0), M(0x120406), 0, 0, 0.003);
    bone.rotation.z = Math.atan2(y, x) - Math.PI / 2; w.add(bone); }
  w.scale.set(s * k * 1.1, k * 1.1, k); return w; };
const horn = (s, k) => { const h = mesh(new THREE.ConeGeometry(0.035 * k, 0.24 * k, 10), M(0x1a0c0c, { roughness: 0.4 }), s * 0.085, 0.13 + 0.03 * k, 0); h.rotation.z = -s * 0.55; return h; };
function person(race, me, rankIn) {
  const L = RACE_LOOK[race] ?? RACE_LOOK.human, rk = rankOf(rankIn), g = new THREE.Group(), body = new THREE.Group(); g.add(body);
  const neph = race === 'nephilim', grow = 0.85 + rk * 0.12;   // ailes et cornes : ×0,97 au rang 1 → ×1,45 au rang 5
  const cloth = M(L.cloth, { roughness: 0.7 }), cloth2 = M(L.cloth2, { roughness: 0.6, metalness: race === 'angel' ? 0.4 : 0 }), skin = M(L.skin, { roughness: 0.55 });
  const [mc, me2] = RANK_METAL[rk] ?? [], metal = mc ? M(mc, { roughness: 0.35, metalness: 0.45, emissive: mc, emissiveIntensity: me2 }) : null;
  const legs = [-1, 1].map(s => { const leg = new THREE.Group(); leg.position.set(s * 0.085, 0.42, 0);
    leg.add(mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.34, 10), cloth, 0, -0.17, 0), mesh(new THREE.BoxGeometry(0.11, 0.09, 0.17), M(L.boots, { roughness: 0.8 }), 0, -0.37, 0.02)); body.add(leg); return leg; });
  const torso = mesh(new THREE.CylinderGeometry(0.15, 0.19, 0.42, 14), cloth, 0, 0.63, 0); body.add(torso);
  if (race === 'angel') body.add(mesh(new THREE.ConeGeometry(0.27, 0.5, 18, 1, true), cloth, 0, 0.36, 0));      // robe longue
  if (neph) { const sash = mesh(new THREE.BoxGeometry(0.05, 0.46, 0.4), cloth2, 0.02, 0.64, 0); sash.rotation.z = 0.55; body.add(sash);   // écharpe pourpre en travers
    body.add(mesh(new THREE.ConeGeometry(0.25, 0.4, 18, 1, true, 0, Math.PI), cloth2, 0, 0.32, 0)); }                            // demi-jupe sombre
  const belt = mesh(new THREE.TorusGeometry(0.185, 0.022, 8, 24), metal ?? cloth2, 0, 0.47, 0); belt.rotation.x = Math.PI / 2; body.add(belt);
  const arms = [-1, 1].map(s => { const arm = new THREE.Group(); arm.position.set(s * 0.21, 0.8, 0);
    arm.add(mesh(new THREE.CapsuleGeometry(0.045, 0.28, 4, 10), cloth, 0, -0.17, 0), mesh(new THREE.SphereGeometry(0.045, 10, 8), skin, 0, -0.36, 0)); arm.rotation.z = s * 0.12; body.add(arm); return arm; });
  const head = new THREE.Group(); head.position.y = 1.0; body.add(head);
  head.add(mesh(new THREE.SphereGeometry(0.13, 22, 18), skin));
  const hair = mesh(new THREE.SphereGeometry(0.137, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), M(L.hair, { roughness: 0.8 }), 0, 0.012, -0.012); head.add(hair);
  const glowEye = c => M(c, { emissive: c, emissiveIntensity: 4 });
  for (const s of [-1, 1]) head.add(mesh(new THREE.SphereGeometry(0.018, 8, 8), race === 'demon' ? glowEye(0xff3b1a) : neph ? glowEye(s < 0 ? 0xffd36a : 0xff3b1a) : M(0x1a1410), s * 0.045, 0.01, 0.115));
  if (race === 'human') { const cape = mesh(new THREE.BoxGeometry(0.34, 0.6 + (rk - 1) * 0.06, 0.025), rk >= 4 ? M(0x7a1420, { roughness: 0.6 }) : cloth2, 0, 0.6 - (rk - 1) * 0.03, -0.19); cape.rotation.x = 0.12; body.add(cape); }
  let wings = [];
  if (race === 'angel') {
    wings = [-1, 1].map(s => { const w = featherWing(s, grow); w.position.set(s * 0.1, 0.78, -0.16); body.add(w); return w; });
    if (rk >= 5) wings.push(...[-1, 1].map(s => { const w = featherWing(s, grow * 0.6); w.position.set(s * 0.1, 0.5, -0.17); body.add(w); return w; }));   // séraphin : seconde paire
    const halo = mesh(new THREE.TorusGeometry(0.12 + rk * 0.008, 0.014, 8, 32), M(0xffe6a0, { emissive: 0xffd36a, emissiveIntensity: 1.6 + rk * 0.4 }), 0, 1.24, 0); halo.rotation.x = Math.PI / 2; body.add(halo);
  }
  if (race === 'demon') {
    for (const s of [-1, 1]) { head.add(horn(s, grow)); const pad = mesh(new THREE.SphereGeometry(0.08, 12, 8), metal ?? cloth2, s * 0.2, 0.83, 0); pad.scale.set(1, 0.6, 1); body.add(pad); }
    if (rk >= 3) wings = [-1, 1].map(s => { const w = batWing(s, grow * 0.9); w.position.set(s * 0.1, 0.8, -0.17); body.add(w); return w; });   // ailes de démon dès le rang 3
    const tail = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.45, -0.17), new THREE.Vector3(0, 0.3, -0.4), new THREE.Vector3(0, 0.18, -0.5), new THREE.Vector3(0, 0.28, -0.62)]), 16, 0.022, 6), M(0x2a0c0c), 0, 0, 0); body.add(tail);
    body.add(mesh(new THREE.ConeGeometry(0.04, 0.08, 4), M(0x2a0c0c), 0, 0.3, -0.64));
  }
  if (neph) {   // gauche : ange (plumes, demi-halo) ; droite : démon (membrane, corne)
    const wl = featherWing(-1, grow), wr = batWing(1, grow); wl.position.set(-0.1, 0.78, -0.16); wr.position.set(0.1, 0.8, -0.17); body.add(wl, wr); wings = [wl, wr];
    head.add(horn(1, grow));
    const half = mesh(new THREE.TorusGeometry(0.13, 0.014, 8, 24, Math.PI * 0.9), M(0xffe6a0, { emissive: 0xffc04a, emissiveIntensity: 1.4 + rk * 0.3 }), -0.01, 0.24, 0); half.rotation.set(Math.PI / 2, 0, Math.PI * 0.55); head.add(half);
  }
  // Ornements de rang
  if (metal && race !== 'demon') for (const s of [-1, 1]) { const pad = mesh(new THREE.SphereGeometry(0.075, 12, 8), metal, s * 0.2, 0.84, 0); pad.scale.set(1, 0.55, 1); body.add(pad); }
  if (metal && race === 'demon') for (const s of [-1, 1]) { const spike = mesh(new THREE.ConeGeometry(0.025, 0.1, 6), metal, s * 0.22, 0.9, 0); spike.rotation.z = -s * 0.4; body.add(spike); }   // épaulières à pointe
  if (rk >= 3) { const plate = mesh(new THREE.CylinderGeometry(0.158, 0.17, 0.2, 14, 1, true, -Math.PI / 2.4, Math.PI / 1.2), metal, 0, 0.7, 0.004); body.add(plate);
    if (rk < 5) { const circ = mesh(new THREE.TorusGeometry(0.135, 0.012, 6, 28), metal, 0, 0.06, 0); circ.rotation.x = Math.PI / 2; head.add(circ); } }
  let aura = null, orbs = [];
  if (rk >= 4) { aura = mesh(new THREE.RingGeometry(0.28, 0.46, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: mc, transparent: true, opacity: 0.35, depthWrite: false }), 0, 0.02, 0); aura.castShadow = false; g.add(aura); }
  if (rk >= 5) { const crown = new THREE.Group(); crown.position.y = 0.09; head.add(crown);
    crown.add(mesh(new THREE.CylinderGeometry(0.13, 0.12, 0.05, 20, 1, true), metal));
    for (let j = 0; j < 7; j++) { const a = (j / 7) * Math.PI * 2, sp = mesh(new THREE.ConeGeometry(0.018, 0.09, 6), metal, Math.cos(a) * 0.13, 0.06, Math.sin(a) * 0.13); crown.add(sp); }
    orbs = [0, 1, 2].map(j => { const o = mesh(new THREE.SphereGeometry(0.035, 10, 8), M(mc, { emissive: mc, emissiveIntensity: 3 })); o.castShadow = false; g.add(o); return o; });
    g.add(new THREE.PointLight(mc, 1.6, 3).translateY(1.1)); g.scale.setScalar(1.08); }
  g.userData.rank = rk; g.userData.wings = wings;
  if (me) { const r = mesh(new THREE.RingGeometry(0.34, 0.4, 36).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xf0d28a, transparent: true, opacity: 0.9 }), 0, 0.03, 0); r.castShadow = false; g.add(r); }
  const ph = hash(L.cloth % 97, 3) * 6;
  g.userData.tick = t => { const b = Math.sin(t * 1.6 + ph); torso.scale.set(1 + b * 0.012, 1 + b * 0.02, 1 + b * 0.012); head.position.y = 1.0 + b * 0.006;
    arms.forEach((a, i) => { a.rotation.x = Math.sin(t * 1.6 + ph + i * Math.PI) * 0.06; });
    wings.forEach((w, i) => { w.rotation.y = (i % 2 ? -1 : 1) * (0.25 + Math.sin(t * 1.3 + ph) * 0.12); });
    if (aura) aura.material.opacity = 0.25 + Math.sin(t * 2 + ph) * 0.1;
    orbs.forEach((o, j) => { const a = t * 1.2 + (j * Math.PI * 2) / 3; o.position.set(Math.cos(a) * 0.45, 0.9 + Math.sin(t * 2 + j) * 0.08, Math.sin(a) * 0.45); }); };
  return g;
}
export { person, capital };
/** Hôtel de ville selon la race de la capitale (data.race) :
 *  humain = hôtel de ville de pierre, toits d'ardoise, beffroi à horloge, bannières ; démon = bastion d'obsidienne à pointes,
 *  coulées de lave, braseros ; ange = sanctuaire de marbre blanc à colonnes, dôme d'or, anneaux de lumière en lévitation. */
function capital(race) {
  const g = new THREE.Group(), glowM = (c, i = 2) => M(c, { emissive: c, emissiveIntensity: i });
  let tick = null;
  if (race === 'demon') {
    const obs = M(0x1b1014, { roughness: 0.35, metalness: 0.3 }), lava = glowM(0xff5a1f, 3), bone = M(0xd9cdb4, { roughness: 0.6 });
    g.add(mesh(new THREE.CylinderGeometry(1.0, 1.25, 1.1, 6), obs, 0, 0.55, 0));                       // socle hexagonal
    g.add(mesh(new THREE.CylinderGeometry(0.55, 0.8, 1.3, 6), obs, 0, 1.75, 0), mesh(new THREE.ConeGeometry(0.55, 1.1, 6), obs, 0, 2.95, 0));
    for (let j = 0; j < 6; j++) { const a = (j / 6) * Math.PI * 2 + Math.PI / 6, x = Math.cos(a) * 1.05, z = Math.sin(a) * 1.05;
      const sp = mesh(new THREE.ConeGeometry(0.14, 1.3, 5), obs, x, 1.5, z); sp.rotation.set(Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35); g.add(sp);
      const lv = mesh(new THREE.BoxGeometry(0.06, 1.0, 0.02), lava, Math.cos(a) * 1.13, 0.55, Math.sin(a) * 1.13); lv.rotation.y = -a + Math.PI / 2; g.add(lv); }   // coulées de lave sur les faces
    for (const s of [-1, 1]) { const h = mesh(new THREE.ConeGeometry(0.12, 0.8, 8), bone, s * 0.45, 2.75, 0); h.rotation.z = -s * 0.9; g.add(h); }                    // cornes du donjon
    g.add(mesh(new THREE.BoxGeometry(0.45, 0.75, 0.05), glowM(0xff3b1a, 2.5), 0, 0.4, 1.12));            // gueule de la porte
    const fires = [-1, 1].map(s => { g.add(mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.35, 8), obs, s * 0.75, 1.27, 0.75)); const f = mesh(new THREE.ConeGeometry(0.1, 0.3, 8), glowM(0xffa030, 4), s * 0.75, 1.58, 0.75); g.add(f); return f; });
    g.add(new THREE.PointLight(0xff5a1f, 5, 6).translateY(1.4).translateZ(1));
    tick = t => fires.forEach((f, i) => { f.scale.set(1, 0.85 + Math.sin(t * 9 + i * 2) * 0.2, 1); });
  } else if (race === 'angel') {
    const marble = M(0xf3f1ea, { roughness: 0.35 }), gold = M(0xe0b54a, { roughness: 0.25, metalness: 0.9, emissive: 0x6a4a10, emissiveIntensity: 0.3 });
    for (let j = 0; j < 3; j++) g.add(mesh(new THREE.CylinderGeometry(1.25 - j * 0.12, 1.3 - j * 0.12, 0.12, 32), marble, 0, 0.06 + j * 0.12, 0));   // degrés
    g.add(mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.1, 24), marble, 0, 0.91, 0));
    for (let j = 0; j < 10; j++) { const a = (j / 10) * Math.PI * 2; g.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.25, 12), marble, Math.cos(a) * 1.0, 0.98, Math.sin(a) * 1.0)); }
    g.add(mesh(new THREE.CylinderGeometry(1.12, 1.12, 0.12, 32), marble, 0, 1.66, 0));                  // entablement
    g.add(mesh(new THREE.SphereGeometry(0.78, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2), gold, 0, 1.72, 0));   // dôme d'or
    g.add(mesh(new THREE.ConeGeometry(0.05, 0.5, 8), gold, 0, 2.7, 0));
    g.add(mesh(new THREE.BoxGeometry(0.4, 0.75, 0.05), glowM(0xfff2c4, 1.8), 0, 0.72, 0.76));
    const rings = [0, 1].map(j => { const r = mesh(new THREE.TorusGeometry(0.34 + j * 0.16, 0.02, 8, 48), glowM(0xffe6a0, 2.6), 0, 2.85 + j * 0.2, 0); r.rotation.x = Math.PI / 2; r.castShadow = false; g.add(r); return r; });
    g.add(new THREE.PointLight(0xfff0c0, 4, 6).translateY(2.9));
    tick = t => rings.forEach((r, j) => { r.rotation.y = t * (j ? -0.6 : 0.8); r.rotation.x = Math.PI / 2 + Math.sin(t + j) * 0.15; r.position.y = 2.85 + j * 0.2 + Math.sin(t * 1.5 + j) * 0.05; });
  } else {   // humain (et repli)
    const st = stone(), slate = M(0x3e4654, { roughness: 0.8 }), wood = M(0x5a3a22, { roughness: 0.85 }), lit = glowM(0xffd27a, 2);
    g.add(mesh(new THREE.BoxGeometry(2.0, 1.0, 1.2), st, 0, 0.5, 0));                                   // grande salle
    const gable = new THREE.Shape([new THREE.Vector2(-0.68, 0), new THREE.Vector2(0.68, 0), new THREE.Vector2(0, 0.62)]);   // toit à deux pans
    g.add(mesh(new THREE.ExtrudeGeometry(gable, { depth: 2.1, bevelEnabled: false }).translate(0, 0, -1.05).rotateY(Math.PI / 2), slate, 0, 1.0, 0));
    g.add(mesh(new THREE.BoxGeometry(0.62, 1.9, 0.62), st, 0, 1.35, 0.15));                             // beffroi
    g.add(mesh(new THREE.ConeGeometry(0.52, 0.9, 4), slate, 0, 2.75, 0.15).rotateY(Math.PI / 4));
    const clock = mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.03, 24), M(0xf4ecd2, { emissive: 0x403418, emissiveIntensity: 0.5 }), 0, 1.95, 0.47); clock.rotation.x = Math.PI / 2; g.add(clock);
    const hand = mesh(new THREE.BoxGeometry(0.02, 0.13, 0.01), M(0x1a1410), 0, 1.95, 0.49); g.add(hand);
    g.add(mesh(new THREE.BoxGeometry(0.42, 0.62, 0.05), wood, 0, 0.31, 0.61));
    for (const x of [-0.7, -0.4, 0.4, 0.7]) g.add(mesh(new THREE.BoxGeometry(0.14, 0.22, 0.03), lit, x, 0.62, 0.61));
    const flags = [-1, 1].map(s => { g.add(mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6), wood, s * 0.95, 1.4, 0.5)); const f = mesh(new THREE.BoxGeometry(0.3, 0.2, 0.01), M(0x24406b, { side: THREE.DoubleSide }), s * 0.95 + 0.15, 1.68, 0.5); g.add(f); return f; });
    tick = t => { hand.rotation.z = -t * 0.3; flags.forEach((f, i) => { f.rotation.y = Math.sin(t * 2.5 + i) * 0.35; }); };
  }
  g.userData.race = race ?? 'human'; g.userData.tick = tick; return g;
}
function building(e) {
  const g = new THREE.Group(), m = e.building_model, k = m ? m.split('_')[0] : e.building_kind;   // apparence choisie en admin (migration 50), sinon le type de construction
  if (k === 'capital') { const c = capital(m?.split('_')[1] ?? e.building_race); g.add(c); g.userData.tick = c.userData.tick; g.scale.setScalar(1.1); }
  else if (k === 'door') { for (const s of [-1, 1]) g.add(mesh(new THREE.BoxGeometry(0.28, 2.2, 0.4), stone(), s * 0.5, 1.1, 0)); g.add(mesh(new THREE.BoxGeometry(1.3, 0.3, 0.45), stone(), 0, 2.25, 0));
    const p = mesh(new THREE.PlaneGeometry(0.75, 2), new THREE.MeshBasicMaterial({ color: 0xa87bff, transparent: true, opacity: 0.55, side: THREE.DoubleSide }), 0, 1.1, 0); p.castShadow = false; g.add(p); g.add(new THREE.PointLight(0xa87bff, 4, 5).translateY(1.2));
    g.userData.tick = t => { p.material.opacity = 0.45 + Math.sin(t * 2) * 0.12; }; }
  else if (k === 'tower') { g.add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 2.2, 14), stone(), 0, 1.1, 0), mesh(new THREE.ConeGeometry(0.58, 0.8, 14), M(0x56372a, { roughness: 0.8 }), 0, 2.6, 0)); }
  else if (k === 'factory') { g.add(mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), M(0x7a5a40, { roughness: 0.9 }), 0, 0.35, 0), mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.8, 8), stone(), 0.25, 1, 0.2), mesh(new THREE.BoxGeometry(0.2, 0.18, 0.04), M(0xffb347, { emissive: 0xff8c1a, emissiveIntensity: 2.5 }), -0.2, 0.4, 0.46)); }
  else if (k === 'totem') { g.add(mesh(new THREE.BoxGeometry(0.34, 1.6, 0.34), M(0x3d3a45, { roughness: 0.8 }), 0, 0.8, 0), mesh(new THREE.OctahedronGeometry(0.2), M(0x7be0ff, { emissive: 0x38c8ff, emissiveIntensity: 3 }), 0, 1.9, 0)); g.add(new THREE.PointLight(0x38c8ff, 2.5, 4).translateY(1.9)); g.userData.tick = t => { g.children[1].rotation.y = t; g.children[1].position.y = 1.9 + Math.sin(t * 2) * 0.06; }; }
  else g.add(mesh(new THREE.BoxGeometry(0.98, 1, 0.98), stone(), 0, 0.5, 0));       // mur
  return g;
}
/** Créature d'un monstre / d'une invocation / d'une monture : design choisi en admin (`model`), sinon trouvé par le nom ou tiré
 *  dans son milieu (lib/creatureCatalog.designFor), ramené à une emprise d'environ une case (×1,3 pour les grandes créatures). */
export function creature(e) {
  const D = designFor({ model: e.model, name: e.name, loco: e.locomotion, flying: e.flying }), inner = buildCreature(D), box = new THREE.Box3().setFromObject(inner), sz = box.getSize(new THREE.Vector3());
  // Emprise : longueur / hauteur (l'envergure des ailes peut déborder) ; monture : selle à hauteur de cavalier (~0,62).
  const fit = e.mount ? 0.62 / Math.max(0.2, inner.userData.saddle?.y ?? 0.6) : (Number(e.size) >= 2 ? 1.6 : 1.25) / Math.max(sz.z, sz.y * 0.8, 0.01);
  const k = Math.min(e.mount ? 2.5 : 1.6, fit), g = new THREE.Group(); inner.scale.multiplyScalar(k); g.add(inner);
  g.userData = { tick: inner.userData.tick, height: inner.userData.height * k, saddle: (inner.userData.saddle ?? new THREE.Vector3(0, 0.6, 0)).clone().multiplyScalar(k), design: D.key }; return g;
}
/** Cavalier sur sa monture : posé sur la selle du design, hors de l'échelle de la créature ; chacun garde sa propre animation
 *  (les battements d'ailes de la monture ne font jamais pivoter le cavalier). */
export function mounted(mount, rider) {
  const g = new THREE.Group(), mt = mount.userData.tick, rt = rider.userData.tick; g.add(mount); rider.position.copy(mount.userData.saddle).add(new THREE.Vector3(0, -0.36, 0)); g.add(rider);
  g.userData = { tick: t => { mt?.(t); rt?.(t); }, height: Math.max(mount.userData.height, mount.userData.saddle.y + 1.2), rider }; return g;
}
const RACE_COL = { human: '#e8c89a', demon: '#ff8a70', angel: '#cfeaff', nephilim: '#e2b8ff' };
export function makeEntity(e, me) {
  let g = e.kind === 'monster' || e.kind === 'summon' ? creature(e) : e.kind === 'building' ? building(e) : person(e.race, me, e.rank);
  if (e.kind === 'character' && e.mount_name) g = mounted(creature({ mount: true, model: e.mount_model, name: e.mount_name, flying: e.mount_flying, locomotion: e.mount_loco, size: e.mount_size }), g);
  const h = g.userData.height ? g.userData.height + 0.4 : e.mount_name ? 2.2 : e.kind === 'summon' ? 1.9 : e.kind === 'monster' ? 3.3 : e.kind === 'building' ? (e.building_kind === 'capital' ? 3.9 : 2.9) : 1.75;
  const wrap = new THREE.Group(); wrap.add(g); wrap.userData.tick = g.userData.tick; const l = label(e.name ?? '', e.kind === 'character' ? RACE_COL[e.race] ?? '#fff' : e.kind === 'monster' ? '#ff9a8a' : e.kind === 'summon' ? '#8fe9ff' : '#f0d28a'); l.position.y = h; wrap.add(l); return wrap;
}
