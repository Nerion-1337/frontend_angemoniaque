import * as THREE from 'three';
/**
 * Générateur de créatures 3D (designs de lib/creatureCatalog.js). Chaque plan de corps assemble des pièces paramétrées :
 * corps à contre-ombrage (dos foncé, ventre clair, en couleurs de sommets), membres en chaînes articulées effilées, ailes
 * membraneuses ou à plumes, têtes (museau, bec, cornes, crocs), queues, nageoires, tentacules. Animation douce par `tick(t)`
 * (respiration, battements, ondulations). Repère : la créature regarde +z, pieds à y = 0 ; `userData.height` = hauteur
 * (étiquette) ; `userData.saddle` = point d'assise d'un cavalier.
 */
const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0, ...o });
const shadeMat = (top, bot, o = {}) => { const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, metalness: 0, ...o }); m.userData = { top, bot }; return m; };
const mk = (geo, m, x = 0, y = 0, z = 0) => { if (m.vertexColors && !geo.attributes.color) countershade(geo, m.userData.top ?? 0x888888, m.userData.bot ?? 0xcccccc); const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };
/** Contre-ombrage : couleurs de sommets du dos (`top`) au ventre (`bot`) selon la normale (et un léger bruit). */
function countershade(geo, top, bot) {
  const n = geo.attributes.normal, p = geo.attributes.position, col = new Float32Array(p.count * 3), a = new THREE.Color(top), b = new THREE.Color(bot), c = new THREE.Color();
  for (let i = 0; i < p.count; i++) { const k = THREE.MathUtils.smoothstep(n.getY(i), -0.55, 0.45), j = 0.94 + 0.06 * Math.sin(p.getX(i) * 41 + p.getZ(i) * 37);
    c.copy(b).lerp(a, k).multiplyScalar(j); col.set([c.r, c.g, c.b], i * 3); }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); return geo;
}
/** Ellipsoïde contre-ombré. */
const blob = (rx, ry, rz, top, bot, m, seg = 22) => { const g = countershade(new THREE.SphereGeometry(1, seg, Math.round(seg * 0.7)).scale(rx, ry, rz), top, bot); return mk(g, m); };
/** Tube effilé le long d'une courbe (rayon r0 → r1). */
function taper(curve, r0, r1, m, tub = 14, rad = 8) {
  const g = new THREE.TubeGeometry(curve, tub, 1, rad, false), p = g.attributes.position, fr = curve.computeFrenetFrames(tub, false), v = new THREE.Vector3(), q = new THREE.Vector3();
  for (let i = 0; i <= tub; i++) { const r = THREE.MathUtils.lerp(r0, r1, i / tub); curve.getPointAt(i / tub, q);
    for (let j = 0; j <= rad; j++) { const k = i * (rad + 1) + j; v.fromBufferAttribute(p, k).sub(q).multiplyScalar(r).add(q); p.setXYZ(k, v.x, v.y, v.z); } }
  g.computeVertexNormals(); return mk(g, m);
}
const curve = pts => new THREE.CatmullRomCurve3(pts.map(a => new THREE.Vector3(...a)));
/** Chaîne articulée (queue, cou, tentacule, membre) : segments effilés emboîtés ; renvoie { root, joints }. */
function chain(n, segLen, r0, r1, m, dir = [0, 0, 1]) {
  const root = new THREE.Group(), joints = []; let parent = root; const d = new THREE.Vector3(...dir).normalize();
  for (let i = 0; i < n; i++) { const j = new THREE.Group(), ra = THREE.MathUtils.lerp(r0, r1, i / n), rb = THREE.MathUtils.lerp(r0, r1, (i + 1) / n);
    const seg = mk(new THREE.CylinderGeometry(rb, ra, segLen * 1.08, 9).translate(0, segLen / 2, 0), m); seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
    j.add(seg, mk(new THREE.SphereGeometry(ra, 9, 7), m)); parent.add(j); if (i) j.position.copy(d).multiplyScalar(segLen); joints.push(j); parent = j; }
  const tip = new THREE.Group(); tip.position.copy(d).multiplyScalar(segLen); parent.add(tip); return { root, joints, tip };
}
const cone = (r, h, m, x, y, z, rx = 0, rz = 0) => { const o = mk(new THREE.ConeGeometry(r, h, 10), m, x, y, z); o.rotation.set(rx, 0, rz); return o; };
/** Corne courbe (tube effilé). */
function horn(kind, s, size, m) {
  const k = size, pts = { curved: [[0, 0, 0], [s * 0.05 * k, 0.1 * k, -0.05 * k], [s * 0.08 * k, 0.2 * k, -0.16 * k], [s * 0.06 * k, 0.24 * k, -0.28 * k]],
    straight: [[0, 0, 0], [s * 0.03 * k, 0.14 * k, -0.08 * k], [s * 0.05 * k, 0.28 * k, -0.18 * k]],
    ram: [[0, 0, 0], [s * 0.12 * k, 0.08 * k, -0.06 * k], [s * 0.16 * k, -0.04 * k, 0.04 * k], [s * 0.1 * k, -0.1 * k, 0.08 * k]],
    bull: [[0, 0, 0], [s * 0.18 * k, 0.03 * k, 0.02 * k], [s * 0.26 * k, 0.12 * k, 0.06 * k], [s * 0.24 * k, 0.22 * k, 0.08 * k]],
    antlers: [[0, 0, 0], [s * 0.06 * k, 0.16 * k, -0.04 * k], [s * 0.14 * k, 0.26 * k, -0.06 * k]] }[kind] ?? [[0, 0, 0], [0, 0.2 * k, -0.1 * k]];
  const o = taper(curve(pts), 0.035 * k, 0.004, m, 10, 7);
  if (kind === 'antlers') o.add(taper(curve([[s * 0.06 * k, 0.16 * k, -0.04 * k], [s * 0.02 * k, 0.24 * k, 0.04 * k]]), 0.015 * k, 0.003, m, 6, 5));
  return o;
}
/** Aile membraneuse (chauve-souris / dragon) : doigts osseux et membrane festonnée ; s = côté. */
function batWing(s, span, memM, boneM) {
  const w = new THREE.Group(), tips = [[0.95, 0.55], [1.0, 0.12], [0.78, -0.22], [0.48, -0.38]], sh = new THREE.Shape(); sh.moveTo(0, 0.05);
  sh.lineTo(0.42, 0.42); sh.lineTo(tips[0][0], tips[0][1]); tips.slice(1).forEach(([x, y], i) => { const [px, py] = tips[i]; sh.quadraticCurveTo((x + px) / 2 - 0.08, (y + py) / 2 + 0.02, x, y); });
  sh.quadraticCurveTo(0.2, -0.3, 0, -0.08); sh.closePath();
  const mem = mk(new THREE.ShapeGeometry(sh, 10), memM); w.add(mem);
  w.add(taper(curve([[0, 0.02, 0], [0.42, 0.42, 0.01], [0.95, 0.55, 0]]), 0.03, 0.008, boneM, 10, 6));
  for (const [x, y] of tips.slice(1)) w.add(taper(curve([[0.42, 0.42, 0.01], [x * 0.7 + 0.12, y * 0.7 + 0.1, 0.012], [x, y, 0]]), 0.014, 0.004, boneM, 8, 5));
  w.add(cone(0.02, 0.07, boneM, 0.42, 0.45, 0.01, 0, -0.4));
  w.scale.set(s * span, span, span); return w;
}
/** Aile à plumes : bras le long de x (bord d'attaque = +y), rémiges vers l'arrière (−y), plus longues et plus ouvertes vers le bout ;
 *  couvertures plus courtes par-dessus. */
function featherWing(s, span, m1, m2) {
  const w = new THREE.Group(), fg = new THREE.SphereGeometry(1, 10, 6).scale(0.5, 0.09, 0.02).translate(0.5, 0, 0);
  w.add(taper(curve([[0, 0, 0], [0.45, 0.06, 0.01], [1.0, 0.02, 0]]), 0.045, 0.015, m2, 10, 6));
  const n = 11; for (let i = 0; i < n; i++) { const u = i / (n - 1), x = 0.05 + u * 0.95, L = 0.32 + u * 0.28, a = -Math.PI / 2 + u * 1.05;
    const f = mk(fg, m1); f.scale.set(L, 1, 1); f.rotation.z = a; f.position.set(x, 0.02, -0.004); w.add(f);
    if (i % 2 === 0) { const cv = mk(fg, m2); cv.scale.set(L * 0.5, 1.1, 1); cv.rotation.z = a + 0.1; cv.position.set(x, 0.04, 0.006); w.add(cv); } }
  w.scale.set(s * span, span, span); return w;
}
/** Paire d'ailes : `pos(s)` = attache (côté s), `pitch` = relèvement (0 = à plat), battement `amp` à la vitesse `speed`.
 *  Membrane : bord d'attaque (bras) vers l'avant ; plumes : rémiges vers l'arrière. */
function wingPair(kind, span, mats, sm, pos, { pitch = 0.35, amp = 0.3, base = 0.3, speed = 1.6, sweep = 0.2 } = {}) {
  const pivots = [-1, 1].map(s => { const w = kind === 'bat' ? batWing(s, span, mats.membrane, sm) : featherWing(s, span, mats.feather, mats.feather2);
    w.rotation.x = Math.PI / 2 - pitch; const piv = new THREE.Group(); piv.position.copy(pos(s)); piv.add(w); return piv; });
  return { pivots, tick: t => pivots.forEach((w, i) => { const s = i ? 1 : -1; w.rotation.z = s * (base + Math.sin(t * speed) * amp); w.rotation.y = s * sweep; }) };
}
const eyes = (head, r, x, y, z, glow, n = 2) => { const em = mat(glow, { emissive: glow, emissiveIntensity: 2.2, roughness: 0.2 });
  if (n === 1) { const e = mk(new THREE.SphereGeometry(r * 1.6, 14, 10), mat(0xf4f0e8, { roughness: 0.2 }), 0, y, z); e.add(mk(new THREE.SphereGeometry(r * 0.8, 10, 8), em, 0, 0, r * 1.1)); head.add(e); return; }
  for (const s of [-1, 1]) head.add(mk(new THREE.SphereGeometry(r, 10, 8), em, s * x, y, z)); };
/** Animation : liste de fonctions t → void. */
const anim = (g, fns) => { g.userData.tick = t => fns.forEach(f => f(t)); };
const wave = (joints, axis, amp, speed, ph = 0, lag = 0.7) => t => joints.forEach((j, i) => { j.rotation[axis] = Math.sin(t * speed + ph - i * lag) * amp; });

// ---------------------------------------------------------------- têtes
function beastHead(D, mats, { size = 1, snout = 0.22 } = {}) {
  const { p, c } = D, h = new THREE.Group(), [skin, , glow] = c, k = size, sm = mats.shade;
  if (p.beak) { h.add(blob(0.13 * k, 0.12 * k, 0.15 * k, skin, c[1], sm)); const b1 = cone(0.06 * k, 0.2 * k, mats.horn, 0, -0.01 * k, 0.17 * k, Math.PI / 2); h.add(b1);
    h.add(cone(0.03 * k, 0.07 * k, mats.horn, 0, -0.06 * k, 0.24 * k, Math.PI * 0.85)); eyes(h, 0.022 * k, 0.07 * k, 0.04 * k, 0.08 * k, glow); return h; }
  if (p.humanHead) { h.add(blob(0.12 * k, 0.14 * k, 0.12 * k, c[0], c[0], sm)); eyes(h, 0.016 * k, 0.045 * k, 0.02 * k, 0.1 * k, glow);
    if (p.headdress) { const nem = mk(new THREE.ConeGeometry(0.2 * k, 0.3 * k, 4, 1, true), mat(c[1], { side: THREE.DoubleSide }), 0, -0.02 * k, -0.04 * k); nem.rotation.y = Math.PI / 4; h.add(nem); } return h; }
  const skull = blob(0.13 * k, 0.12 * k, 0.14 * k, skin, c[1], sm); h.add(skull);
  const sn = snout * (p.horse ? 1.25 : 1), muz = blob(0.075 * k, 0.07 * k, sn * 0.55 * k, skin, c[1], sm); muz.position.set(0, -0.03 * k, (0.1 + sn * 0.45) * k); h.add(muz);
  const jaw = blob(0.06 * k, 0.03 * k, sn * 0.45 * k, c[1], c[1], sm); jaw.position.set(0, -0.085 * k, (0.08 + sn * 0.4) * k); h.add(jaw);
  h.add(mk(new THREE.SphereGeometry(0.022 * k, 8, 6), mat(0x120a08), 0, -0.01 * k, (0.1 + sn * 0.98) * k));     // truffe / naseaux
  eyes(h, 0.021 * k, 0.075 * k, 0.04 * k, 0.09 * k, glow);
  if (p.ears === 'pointy') for (const s of [-1, 1]) h.add(cone(0.035 * k, 0.12 * k, sm, s * 0.08 * k, 0.12 * k, -0.02 * k, -0.2, -s * 0.25));
  if (p.ears === 'round') for (const s of [-1, 1]) h.add(mk(new THREE.SphereGeometry(0.04 * k, 10, 8).scale(1, 1, 0.4), sm, s * 0.1 * k, 0.1 * k, -0.02 * k));
  if (p.horse) for (const s of [-1, 1]) h.add(cone(0.028 * k, 0.11 * k, sm, s * 0.06 * k, 0.13 * k, -0.04 * k, -0.2, -s * 0.15));
  if (p.horns) { if (p.horns === 'unicorn') h.add(taper(curve([[0, 0.1 * k, 0.1 * k], [0, 0.26 * k, 0.2 * k], [0, 0.4 * k, 0.3 * k]]), 0.025 * k, 0.002, mats.horn, 10, 7));
    else if (p.horns === 'rhino') { h.add(cone(0.05 * k, 0.22 * k, mats.horn, 0, 0.06 * k, (0.12 + sn) * k, 0.5)); h.add(cone(0.03 * k, 0.1 * k, mats.horn, 0, 0.06 * k, (0.02 + sn * 0.7) * k, 0.4)); }
    else for (const s of [-1, 1]) { const o = horn(p.horns, s, k * (D.plan === 'quad' || D.plan === 'serpent' ? 1.1 : 0.7), mats.horn); o.position.set(s * 0.08 * k, 0.09 * k, -0.02 * k); h.add(o); } }
  if (p.tusks) for (const s of [-1, 1]) { const big = p.tusks === 'big'; h.add(taper(curve(big ? [[s * 0.05 * k, -0.08 * k, 0.12 * k], [s * 0.1 * k, -0.25 * k, 0.32 * k], [s * 0.04 * k, -0.15 * k, 0.5 * k]] : [[s * 0.05 * k, -0.07 * k, 0.2 * k], [s * 0.08 * k, 0.0, 0.27 * k]]), (big ? 0.03 : 0.015) * k, 0.003, mats.ivory, 8, 6)); }
  if (p.sabers) for (const s of [-1, 1]) h.add(cone(0.014 * k, 0.16 * k, mats.ivory, s * 0.035 * k, -0.15 * k, 0.2 * k, Math.PI, 0));
  if (p.trunk) { const tr = taper(curve([[0, -0.03 * k, 0.16 * k], [0, -0.2 * k, 0.26 * k], [0, -0.42 * k, 0.24 * k], [0, -0.5 * k, 0.3 * k]]), 0.05 * k, 0.02 * k, sm, 14, 8); h.add(tr); }
  if (p.crest) for (let i = 0; i < 5; i++) h.add(cone(0.02 * k, (0.12 - i * 0.015) * k, mat(c[2], { emissive: c[2], emissiveIntensity: 0.4 }), 0, 0.12 * k, (0.04 - i * 0.05) * k, -0.4));
  if (p.whiskers) for (const s of [-1, 1]) h.add(taper(curve([[s * 0.06 * k, -0.04 * k, (0.1 + sn) * k], [s * 0.2 * k, -0.08 * k, (0.08 + sn) * k], [s * 0.3 * k, -0.02 * k, sn * k]]), 0.008 * k, 0.002, mats.horn, 8, 4));
  if (p.frill) { const f = mk(new THREE.CircleGeometry(0.2 * k, 14, Math.PI * 0.05, Math.PI * 0.9), mat(c[2], { side: THREE.DoubleSide, emissive: c[2], emissiveIntensity: 0.2 }), 0, 0.02 * k, -0.08 * k); h.add(f); }
  if (p.fire || p.glow) h.add(new THREE.PointLight(glow, 0.8, 1.6).translateZ((0.2 + sn) * k));
  return h;
}

// ---------------------------------------------------------------- plans de corps
function quad(D, mats) {
  const { p, c } = D, g = new THREE.Group(), L = p.len ?? 1.1, G = p.girth ?? 1, legH = p.leg ?? 0.45, sm = mats.shade, ticks = [];
  const K = 0.75 + 0.25 * L, bodyY = legH + 0.2 * G * K, wy = !!p.wyvern;
  const body = blob(0.23 * G * K, 0.22 * G * K * (p.toad ? 0.8 : 1), L * 0.42, c[0], c[1], sm); body.position.y = bodyY; g.add(body);
  const chest = blob(0.23 * G * K, 0.24 * G * K, 0.24 * G * K, c[0], c[1], sm); chest.position.set(0, bodyY + (p.slope ? 0.05 : 0.02), L * 0.28); g.add(chest);
  if (p.hump) { const hm = blob(0.17 * G, 0.12 * G, 0.2 * G, c[0], c[0], sm); hm.position.set(0, bodyY + 0.16 * G, L * 0.2); g.add(hm); }
  // pattes : cuisse + jambe + pied (sabot, griffes) ; position « rampante » pour les lézards
  const legs = [], fx = 0.15 * G, sprawl = p.sprawl ? 0.16 : 0;
  for (const [x, z, front] of [[-1, 1, 1], [1, 1, 1], [-1, -1, 0], [1, -1, 0]]) {
    if (wy && front) continue;
    const leg = new THREE.Group(), lz = z * L * 0.3, upper = legH * 0.55, lower = legH * 0.55, kneeX = x * sprawl, fx = 0.16 * G * K;
    leg.position.set(x * fx, bodyY - 0.04, lz);
    leg.add(taper(curve([[0, 0, 0], [kneeX, -upper * 0.55, front ? 0.03 : -0.05], [kneeX + x * sprawl * 0.3, -upper, front ? -0.02 : 0.04]]), 0.105 * G * K, 0.06 * G * K, sm, 8, 8));
    leg.add(taper(curve([[kneeX + x * sprawl * 0.3, -upper, front ? -0.02 : 0.04], [kneeX + x * sprawl * 0.5, -upper - lower * 0.6, 0], [kneeX + x * sprawl * 0.6, -bodyY + 0.05, 0.02]]), 0.06 * G * K, 0.042 * G * K, sm, 8, 7));
    const fy = -bodyY + 0.03, fxp = kneeX + x * sprawl * 0.6;
    if (p.hooves) leg.add(mk(new THREE.CylinderGeometry(0.035 * G, 0.045 * G, 0.06, 10), mats.horn, fxp, fy, 0.02));
    else if (front && p.frontTalons) { for (let i = -1; i <= 1; i++) leg.add(cone(0.012, 0.08, mats.horn, fxp + i * 0.025, fy, 0.06, Math.PI / 2.4)); }
    else { leg.add(blob(0.045 * G, 0.03, 0.06 * G, c[1], c[1], sm)); leg.children.at(-1).position.set(fxp, fy, 0.03); for (let i = -1; i <= 1; i++) leg.add(cone(0.008 * G, 0.04, mats.horn, fxp + i * 0.022 * G, fy, 0.09 * G, Math.PI / 2)); }
    g.add(leg); legs.push(leg);
  }
  ticks.push(t => legs.forEach((l, i) => { l.rotation.x = Math.sin(t * 1.4 + i * 1.7) * 0.04; }));
  // cou(x) et tête(s)
  const heads = p.heads ?? 1, nk = p.neck ?? 0.3, neckBase = new THREE.Vector3(0, bodyY + 0.08 * G, L * 0.42);
  for (let i = 0; i < heads; i++) {
    const off = heads === 1 ? 0 : (i / (heads - 1) - 0.5) * (heads > 3 ? 0.5 : 0.3), ch = chain(nk > 0.45 ? 4 : 2, Math.max(0.06, nk / (nk > 0.45 ? 4 : 2)), (p.horse ? 0.11 : 0.095) * G * K, 0.07 * G * K, sm, [off * 0.8, 0.75, 0.6]);
    ch.root.position.copy(neckBase).add(new THREE.Vector3(off * 0.4, 0, 0)); g.add(ch.root);
    const hd = beastHead(D, mats, { size: (p.headSize ?? 1) * (heads > 3 ? 0.75 : heads > 1 ? 0.85 : 1) * (p.toad ? 1.3 : 1), snout: p.snout ?? 0.22 }); ch.tip.add(hd);
    hd.rotation.x = 0.35; ticks.push(wave(ch.joints, 'x', 0.05, 1.1, i * 1.3, 0.4), wave(ch.joints, 'z', nk > 0.45 ? 0.08 : 0.03, 0.7, i * 2.1, 0.3));
    if (p.mane && p.mane !== 'ridge') { const mn = new THREE.Group(); for (let j = 0; j < (p.horse ? 9 : 16); j++) { const a = (j / 16) * Math.PI * 2;
        mn.add(p.horse ? cone(0.03, 0.12, mats.hair, 0, 0.06 + j * 0.035, -0.02 - j * 0.02, -0.9) : cone(0.04, 0.16, mats.hair, Math.cos(a) * 0.12, Math.sin(a) * 0.12, -0.05, Math.sin(a) * 0.9 - 1.6, -Math.cos(a) * 0.9)); }
      if (p.horse) ch.root.add(mn); else { mn.position.set(0, 0, -0.04); hd.add(mn); } }
  }
  if (p.mane === 'ridge') for (let j = 0; j < 8; j++) g.add(cone(0.025, 0.1, mats.hair, 0, bodyY + 0.18 * G, L * (0.3 - j * 0.08), -0.3));
  // queue
  const tk = p.tail ?? 'long';
  if (tk !== 'none') {
    const n = tk === 'long' || tk === 'stinger' || tk === 'snake' ? 6 : tk === 'horse' || tk === 'bushy' ? 3 : 4, segL = tk === 'long' ? L * 0.16 : tk === 'stinger' ? L * 0.13 : 0.09;
    const tl = chain(n, segL, tk === 'thin' || tk === 'tuft' ? 0.02 : 0.07 * G, tk === 'club' ? 0.05 : 0.012, tk === 'horse' || tk === 'bushy' ? mats.hair : sm, tk === 'stinger' || tk === 'snake' ? [0, 0.6, -0.8] : [0, -0.35, -1]);
    tl.root.position.set(0, bodyY + 0.04, -L * 0.42); g.add(tl.root); ticks.push(wave(tl.joints, 'y', tk === 'snake' ? 0.25 : 0.12, 1.2, 0, 0.5));
    if (tk === 'stinger') { tl.joints.forEach((j, i) => { j.rotation.x = -0.35; }); tl.tip.add(cone(0.035, 0.14, mats.horn, 0, 0, 0.04, Math.PI * 0.6)); }
    if (tk === 'club') tl.tip.add(mk(new THREE.DodecahedronGeometry(0.08), mats.horn));
    if (tk === 'tuft') tl.tip.add(mk(new THREE.SphereGeometry(0.05, 8, 6).scale(1, 1, 1.6), mats.hair));
    if (tk === 'bushy' || tk === 'horse') tl.joints.forEach(j => j.children[0].scale.set(2.2, 1, 2.2));
    if (tk === 'snake') { const sh = beastHead({ ...D, p: { ...D.p, horns: null, ears: null, mane: false, tusks: false, crest: false, frill: false } }, mats, { size: 0.55, snout: 0.15 }); sh.rotation.x = -0.6; tl.tip.add(sh); }
  }
  if (p.spikes) for (let i = 0; i < p.spikes; i++) { const z = L * (0.32 - i * (0.75 / p.spikes)); g.add(cone(0.035 * G * K, 0.13 * G * K, p.crystals ? mats.glow : mats.horn, 0, bodyY + 0.22 * G * K * Math.cos(z / L * 1.2), z, -0.25)); }
  if (p.plates) for (let i = 0; i < 7; i++) for (const x of [-1, 0, 1]) { const pl = mk(new THREE.SphereGeometry(0.1 * G * K, 10, 6).scale(1, 0.35, 1.2), mats.horn, x * 0.12 * G * K, bodyY + (0.21 - Math.abs(x) * 0.05) * G * K, L * (0.3 - i * 0.1)); pl.rotation.z = -x * 0.5; g.add(pl); }
  if (p.stripes || p.spots) for (let i = 0; i < 9; i++) { const s = mk(p.spots ? new THREE.CircleGeometry(0.035, 10) : new THREE.PlaneGeometry(0.03, 0.16), mat(p.spots ? c[2] : 0x15100c, { side: THREE.DoubleSide, emissive: p.fire ? c[2] : 0, emissiveIntensity: p.fire ? 1 : 0 }), (i % 2 ? 1 : -1) * 0.2 * G, bodyY + 0.06, L * (0.3 - i * 0.07)); s.rotation.y = Math.PI / 2; g.add(s); }
  if (p.wings) { const wp = wingPair(p.wings, (p.wings === 'bat' ? 0.95 : 0.8) * L, mats, sm, s => new THREE.Vector3(s * 0.12 * G, bodyY + 0.16 * G, L * (wy ? 0.22 : 0.18)), { pitch: 0.25, base: 0.45, amp: 0.25 });
    wp.pivots.forEach(v => g.add(v)); ticks.push(wp.tick); }
  anim(g, [t => { body.scale.y = 1 + Math.sin(t * 1.5) * 0.012; }, ...ticks]);
  g.userData.saddle = new THREE.Vector3(0, bodyY + 0.17 * G, L * 0.05); return g;
}
function biped(D, mats) {
  const { p, c } = D, g = new THREE.Group(), H = p.h ?? 1, B = p.bulk ?? 1, sm = mats.shade, ticks = [], st = p.style;
  const skinM = st === 'rock' || st === 'lava' || st === 'ice' ? mats.rock : st === 'bone' ? mats.bone : sm;
  const hip = H * 0.45, torsoH = H * 0.33, sw = 0.14 * B;
  for (const s of [-1, 1]) { const leg = new THREE.Group(); leg.position.set(s * sw * 0.75, hip, 0);
    if (p.digi) leg.add(taper(curve([[0, 0, 0], [0, -hip * 0.35, 0.08], [0, -hip * 0.62, -0.08], [0, -hip + 0.04, 0.02]]), 0.07 * B, 0.035 * B, skinM, 12, 8));
    else leg.add(taper(curve([[0, 0, 0], [0, -hip * 0.5, 0.03], [0, -hip + 0.04, 0]]), 0.075 * B, 0.05 * B, skinM, 10, 8));
    leg.add(p.hooves ? mk(new THREE.CylinderGeometry(0.04 * B, 0.05 * B, 0.06, 10), mats.horn, 0, -hip + 0.03, 0.02) : blob(0.05 * B, 0.03, 0.08 * B, c[1], c[1], sm)); leg.children.at(-1).position.set(0, -hip + 0.02, 0.04);
    if (p.talons || p.claws) for (let i = -1; i <= 1; i++) leg.add(cone(0.01, 0.05, mats.horn, i * 0.025, -hip + 0.02, 0.12, Math.PI / 2));
    g.add(leg); }
  const torso = new THREE.Group(); torso.position.y = hip; torso.rotation.x = p.hunch ?? 0; g.add(torso);
  const chestM = st === 'bone' ? mats.bone : skinM;
  if (st === 'bone') { for (let i = 0; i < 4; i++) { const r = mk(new THREE.TorusGeometry(0.11 * B - i * 0.008, 0.012, 6, 16, Math.PI * 1.6), mats.bone, 0, torsoH * (0.45 + i * 0.13), 0); r.rotation.set(Math.PI / 2, 0, Math.PI * 0.7); torso.add(r); }
    torso.add(taper(curve([[0, 0, -0.06], [0, torsoH, -0.06]]), 0.02, 0.02, mats.bone, 6, 6)); torso.add(blob(0.12 * B, 0.06, 0.08, c[0], c[0], mats.bone)); }
  else { const pel = blob(0.15 * B, 0.1, 0.11 * B, c[0], c[1], chestM); torso.add(pel); const ch = blob(0.19 * B, torsoH * 0.62, 0.14 * B, c[0], c[1], chestM); ch.position.y = torsoH * 0.62; torso.add(ch);
    if (p.belly) { const bl = blob(0.17 * B, 0.15, 0.14 * B, c[1], c[1], sm); bl.position.set(0, torsoH * 0.35, 0.06); torso.add(bl); } }
  if (st === 'rock' || st === 'lava' || st === 'ice') for (let i = 0; i < 7; i++) { const r = mk(new THREE.DodecahedronGeometry(0.06 * B), i % 3 ? mats.rock : mats.glow, Math.sin(i * 2.3) * 0.16 * B, torsoH * (0.3 + (i % 4) * 0.2), Math.cos(i * 2.3) * 0.1 * B); torso.add(r); }
  if (st === 'fur') for (let i = 0; i < 10; i++) torso.add(cone(0.05 * B, 0.12, mats.hair, Math.sin(i * 1.7) * 0.18 * B, torsoH * (0.4 + (i % 5) * 0.12), Math.cos(i * 1.7) * 0.12 * B, Math.cos(i * 1.7) * 1.2, -Math.sin(i * 1.7) * 1.2));
  if (p.robe) torso.add(mk(new THREE.ConeGeometry(0.22 * B, hip * 1.05, 14, 1, true), mat(c[1], { side: THREE.DoubleSide, roughness: 0.85 }), 0, -hip * 0.45, 0));
  if (p.loincloth) torso.add(mk(new THREE.BoxGeometry(0.14 * B, 0.18, 0.02), mat(0x5a3a1a), 0, -0.06, 0.12 * B));
  if (p.armor) { torso.add(mk(new THREE.CylinderGeometry(0.17 * B, 0.15 * B, torsoH * 0.5, 12, 1, true), mats.metal, 0, torsoH * 0.6, 0)); for (const s of [-1, 1]) torso.add(mk(new THREE.SphereGeometry(0.07 * B, 10, 8).scale(1, 0.6, 1), mats.metal, s * 0.2 * B, torsoH * 0.95, 0)); }
  // bras
  const arms = [], armL = H * (p.longArms ? 0.5 : 0.38);
  for (const s of [-1, 1]) { const arm = new THREE.Group(); arm.position.set(s * 0.21 * B, torsoH * 0.95, 0); arm.rotation.z = s * 0.18;
    arm.add(taper(curve([[0, 0, 0], [s * 0.02, -armL * 0.5, 0.02], [0, -armL, 0.07]]), 0.06 * B, 0.04 * B, st === 'bone' ? mats.bone : skinM, 10, 8));
    const hand = blob(0.045 * B, 0.05 * B, 0.04 * B, c[1], c[1], sm); hand.position.set(0, -armL - 0.03, 0.08); arm.add(hand);
    if (p.claws) for (let i = -1; i <= 1; i++) arm.add(cone(0.008, 0.06, mats.horn, i * 0.015, -armL - 0.08, 0.1, Math.PI));
    if (s === 1 && p.weapon) arm.add(weapon(p.weapon, armL, mats, c));
    if (s === -1 && p.shield) { const sh = mk(new THREE.CylinderGeometry(0.13, 0.13, 0.025, 16), mats.metal, -0.04, -armL * 0.7, 0.06); sh.rotation.z = Math.PI / 2; arm.add(sh); }
    torso.add(arm); arms.push(arm); }
  ticks.push(t => arms.forEach((a, i) => { a.rotation.x = Math.sin(t * 1.3 + i * Math.PI) * 0.08 - 0.1; }));
  // tête
  const head = new THREE.Group(), hk = 0.85 + B * 0.15; head.position.set(0, torsoH * 1.18, 0.03); torso.add(head); head.rotation.x = -(p.hunch ?? 0) * 0.8;
  headKind(head, p.head, D, mats, hk);
  if (p.horns) for (const s of [-1, 1]) { const o = horn(p.horns, s, hk * 0.55, mats.horn); o.position.set(s * 0.07 * hk, 0.1 * hk, 0); head.add(o); }
  if (p.crown) for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; head.add(cone(0.012, 0.07, mats.gold, Math.cos(a) * 0.1, 0.13 * hk, Math.sin(a) * 0.1)); }
  if (p.tail) { const tl = chain(5, 0.11 * H, 0.04, 0.01, sm, [0, -0.3, -1]); tl.root.position.set(0, 0.02, -0.1); torso.add(tl.root); tl.tip.add(cone(0.03, 0.07, mats.horn, 0, 0, 0.02, -Math.PI / 2)); ticks.push(wave(tl.joints, 'y', 0.18, 1.4)); }
  if (p.wings) { const wp = wingPair(p.wings, H * (p.wings === 'bat' ? 0.75 : 0.6), mats, sm, s => new THREE.Vector3(s * 0.08 * B, torsoH * 0.85, -0.1 * B), { pitch: 0.9, base: 0.5, amp: 0.15, speed: 1.2, sweep: 0.5 });
    wp.pivots.forEach(v => torso.add(v)); ticks.push(wp.tick); }
  if (p.fire) { g.add(new THREE.PointLight(c[2], 2.5, 3).translateY(H * 0.6)); }
  anim(g, [t => { torso.position.y = hip + Math.sin(t * 1.5) * 0.008; }, ...ticks]);
  g.userData.saddle = new THREE.Vector3(0, H * 0.9, -0.05); return g;
}
function weapon(kind, armL, mats, c) {
  const w = new THREE.Group(); w.position.set(0, -armL - 0.03, 0.09);
  if (kind === 'club') { w.add(taper(curve([[0, 0.05, 0], [0, -0.15, 0.12], [0, -0.35, 0.3]]), 0.03, 0.08, mats.wood, 8, 8)); for (let i = 0; i < 4; i++) w.add(cone(0.015, 0.05, mats.horn, Math.sin(i) * 0.07, -0.3, 0.27 + Math.cos(i) * 0.06)); }
  else if (kind === 'axe') { w.add(taper(curve([[0, 0.1, 0], [0, -0.45, 0.06]]), 0.015, 0.015, mats.wood, 4, 6)); const b = mk(new THREE.CylinderGeometry(0.14, 0.14, 0.02, 16, 1, false, 0, Math.PI), mats.metal, 0.02, 0.05, 0.02); b.rotation.set(0, 0, Math.PI / 2); w.add(b); }
  else if (kind === 'sword' || kind === 'dagger') { const l = kind === 'sword' ? 0.42 : 0.16; w.add(mk(new THREE.BoxGeometry(0.03, l, 0.008).translate(0, l / 2, 0), mats.metal)); w.rotation.x = 1.3; w.add(mk(new THREE.BoxGeometry(0.1, 0.02, 0.02), mats.gold)); }
  else if (kind === 'staff') { w.add(taper(curve([[0, 0.3, 0], [0, -0.4, 0]]), 0.014, 0.014, mats.wood, 4, 6)); w.add(mk(new THREE.OctahedronGeometry(0.05), mats.glow, 0, 0.36, 0)); w.add(new THREE.PointLight(c[2], 1.2, 1.5).translateY(0.36)); }
  else if (kind === 'whip') { w.add(mk(new THREE.BoxGeometry(0.04, 0.5, 0.012).translate(0, 0.28, 0), mats.glow)); w.rotation.x = 1.1; w.add(taper(curve([[0, 0, 0], [0.15, -0.2, 0.2], [0.05, -0.4, 0.5], [0.3, -0.45, 0.7]]), 0.015, 0.004, mats.glow, 16, 5)); }
  return w;
}
function headKind(h, kind, D, mats, k) {
  const { c } = D, sm = mats.shade, glow = c[2];
  if (kind === 'skull') { h.add(mk(new THREE.SphereGeometry(0.1 * k, 14, 10).scale(1, 1.05, 1.1), mats.bone)); h.add(mk(new THREE.BoxGeometry(0.1 * k, 0.05 * k, 0.08 * k), mats.bone, 0, -0.08 * k, 0.03 * k)); eyes(h, 0.018 * k, 0.04 * k, 0.0, 0.085 * k, glow); return; }
  if (kind === 'rock') { h.add(mk(new THREE.DodecahedronGeometry(0.1 * k), mats.rock)); eyes(h, 0.018 * k, 0.04 * k, 0.01 * k, 0.085 * k, glow); return; }
  if (kind === 'cyclops') { h.add(blob(0.13 * k, 0.14 * k, 0.12 * k, c[0], c[1], sm)); eyes(h, 0.03 * k, 0, 0.03 * k, 0.09 * k, glow, 1); h.add(blob(0.09 * k, 0.04 * k, 0.06 * k, c[1], c[1], sm)); h.children.at(-1).position.set(0, -0.08 * k, 0.07 * k); return; }
  if (kind === 'bull' || kind === 'wolf' || kind === 'beast') { const hd = beastHead({ ...D, p: { ears: kind === 'wolf' ? 'pointy' : kind === 'bull' ? 'round' : null, fire: D.p.fire } }, mats, { size: k * (kind === 'beast' ? 0.9 : 1), snout: kind === 'wolf' ? 0.24 : kind === 'bull' ? 0.16 : 0.12 }); hd.rotation.x = 0.1; h.add(hd); return; }
  const skin = kind === 'orc' || kind === 'goblin' || kind === 'troll' ? c[0] : kind === 'ape' ? c[1] : 0xd8b090;
  h.add(blob(0.11 * k, 0.13 * k, 0.11 * k, skin, skin, sm)); eyes(h, 0.014 * k, 0.04 * k, 0.02 * k, 0.095 * k, kind === 'human' ? 0x2a4a8a : glow);
  h.add(cone(0.02 * k, 0.05 * k, sm, 0, -0.01 * k, 0.12 * k, Math.PI / 2));   // nez
  if (kind === 'orc' || kind === 'troll') for (const s of [-1, 1]) h.add(cone(0.01 * k, 0.05 * k, mats.ivory, s * 0.04 * k, -0.06 * k, 0.09 * k));
  if (kind === 'goblin' || kind === 'orc') for (const s of [-1, 1]) h.add(cone(0.03 * k, 0.14 * k, sm, s * 0.12 * k, 0.03 * k, 0, 0, -s * 1.3));
  if (kind === 'troll') h.add(cone(0.035 * k, 0.12 * k, sm, 0, -0.02 * k, 0.14 * k, Math.PI / 2.2));
  if (kind === 'ape') { h.add(blob(0.12 * k, 0.08 * k, 0.06 * k, c[0], c[0], mats.hair)); h.children.at(-1).position.set(0, 0.07 * k, -0.04 * k); }
  if (D.p.hair) h.add(mk(new THREE.SphereGeometry(0.12 * k, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), mats.hair, 0, 0.01, -0.01));
  if (D.p.beard) h.add(cone(0.08 * k, 0.2 * k, mats.glow, 0, -0.14 * k, 0.07 * k, Math.PI));
}
function bird(D, mats) {
  const { p, c } = D, g = new THREE.Group(), S = p.size ?? 1, sm = mats.shade, ticks = [], y = 0.5 * S;
  const body = blob(0.15 * S, 0.14 * S, 0.24 * S, c[0], c[1], sm); body.position.y = y; body.rotation.x = -0.15; g.add(body);
  const head = new THREE.Group(); head.position.set(0, y + 0.13 * S, 0.22 * S); g.add(head);
  if (p.bat) { head.add(blob(0.09 * S, 0.08 * S, 0.09 * S, c[0], c[1], sm)); for (const s of [-1, 1]) head.add(cone(0.035 * S, 0.14 * S, sm, s * 0.05 * S, 0.1 * S, 0, -0.1, -s * 0.3)); head.add(cone(0.03 * S, (p.longBeak ? 0.22 : 0.08) * S, mats.horn, 0, -0.02 * S, 0.1 * S, Math.PI / 2)); eyes(head, 0.016 * S, 0.04 * S, 0.02 * S, 0.07 * S, c[2]); }
  else if (p.owl) { head.add(blob(0.13 * S, 0.12 * S, 0.11 * S, c[0], c[1], sm)); for (const s of [-1, 1]) { head.add(mk(new THREE.CircleGeometry(0.05 * S, 14), mat(c[1]), s * 0.05 * S, 0.01 * S, 0.1 * S)); head.add(cone(0.025 * S, 0.08 * S, sm, s * 0.08 * S, 0.12 * S, 0, 0, -s * 0.2)); } eyes(head, 0.022 * S, 0.05 * S, 0.01 * S, 0.11 * S, c[2]); head.add(cone(0.015 * S, 0.05 * S, mats.horn, 0, -0.03 * S, 0.11 * S, Math.PI * 0.7)); }
  else { head.add(blob(0.08 * S, 0.08 * S, 0.09 * S, c[0], c[1], sm)); head.add(cone(0.032 * S, (p.hooked ? 0.08 : 0.07) * S, mats.beak, 0, -0.01 * S, 0.1 * S, Math.PI / 2)); if (p.hooked) head.add(cone(0.016 * S, 0.04 * S, mats.beak, 0, -0.035 * S, 0.13 * S, Math.PI * 0.85)); eyes(head, 0.016 * S, 0.045 * S, 0.02 * S, 0.06 * S, c[2]); }
  if (p.crest) for (let i = 0; i < 5; i++) head.add(cone(0.015 * S, 0.14 * S, mats.feather2, 0, 0.08 * S, -0.02 * S - i * 0.025 * S, -0.9 - i * 0.12));
  if (p.comb) for (let i = 0; i < 3; i++) head.add(mk(new THREE.SphereGeometry(0.03 * S, 8, 6), mat(c[2]), 0, 0.09 * S, 0.03 * S - i * 0.04 * S));
  const wp = wingPair(p.bat ? 'bat' : 'feather', 0.75 * S, mats, sm, s => new THREE.Vector3(s * 0.1 * S, y + 0.07 * S, 0.06 * S), { pitch: 0.1, base: 0.1, amp: 0.55, speed: 3.2, sweep: 0.1 });
  wp.pivots.forEach(v => g.add(v)); ticks.push(wp.tick);
  if (p.snakeTail) { const tl = chain(6, 0.08 * S, 0.035 * S, 0.008, sm, [0, -0.2, -1]); tl.root.position.set(0, y, -0.2 * S); g.add(tl.root); ticks.push(wave(tl.joints, 'y', 0.25, 1.6)); }
  else if (!p.bat) { const fan = new THREE.Group(); fan.position.set(0, y + 0.02, -0.2 * S); for (let i = 0; i < 7; i++) { const f = mk(new THREE.SphereGeometry(1, 8, 5).scale(0.03 * S, 0.008 * S, (p.tailLong ? 0.4 : 0.16) * S).translate(0, 0, -(p.tailLong ? 0.38 : 0.15) * S), i % 2 ? mats.feather : mats.feather2); f.rotation.y = (i - 3) * 0.12; fan.add(f); } fan.rotation.x = 0.2; g.add(fan); }
  for (const s of [-1, 1]) { const leg = taper(curve([[s * 0.05 * S, y - 0.08 * S, 0], [s * 0.05 * S, y - 0.2 * S, -0.03 * S], [s * 0.05 * S, y - 0.24 * S, -0.08 * S]]), 0.02 * S, 0.01 * S, mats.beak, 6, 5); g.add(leg);
    for (let i = -1; i <= 1; i++) g.add(cone(0.008 * S, 0.05 * S, mats.horn, s * 0.05 * S + i * 0.015 * S, y - 0.25 * S, -0.06 * S, -Math.PI / 2)); }
  if (p.fire || p.glow) g.add(new THREE.PointLight(c[2], p.fire ? 2.5 : 1.2, 2.5).translateY(y));
  anim(g, [t => { g.children[0].position.y = y + Math.sin(t * 3.2) * 0.02; }, ...ticks]);
  g.userData.saddle = new THREE.Vector3(0, y + 0.14 * S, 0); return g;
}
function serpent(D, mats) {
  const { p, c } = D, g = new THREE.Group(), L = p.len ?? 2.4, r = p.r ?? 0.1, sm = mats.shade, n = 12, ticks = [];
  const tl = chain(n, L / n, r, r * 0.2, sm, [0, 0, -1]); tl.root.position.set(0, p.float ? 0.9 : r, 0.2); g.add(tl.root);
  tl.joints.forEach((j, i) => { j.rotation.y = Math.sin(i * 0.9) * 0.45; });
  const head = beastHead({ ...D, p: { ...p, ears: null, tusks: false, mane: false, horse: false } }, mats, { size: r * 6.5, snout: 0.25 }); head.position.set(0, r * 2.2, 0.12); head.rotation.x = 0.15; tl.root.add(head);
  const neck = taper(curve([[0, 0, 0], [0, r * 1.2, 0.05], [0, r * 2.2, 0.1]]), r, r * 0.9, sm, 6, 9); tl.root.add(neck);
  ticks.push(t => tl.joints.forEach((j, i) => { j.rotation.y = Math.sin(i * 0.9 - t * 1.6) * 0.45; if (p.float) j.rotation.x = Math.sin(i * 0.7 - t * 1.2) * 0.12; }));
  if (p.fins) tl.joints.forEach((j, i) => { if (i % 2 === 0 && i < n - 1) j.add(cone(r * 0.6, r * 2.2, mats.membrane, 0, r * 1.1, L / n * 0.5, -0.6)); });
  if (p.wings) { const wp = wingPair(p.wings, L * 0.32, mats, sm, s => new THREE.Vector3(s * r, r, L / n * 0.5), { pitch: 0.2, base: 0.3, amp: 0.4, speed: 2 });
    wp.pivots.forEach(v => tl.joints[1].add(v)); ticks.push(wp.tick); }
  if (p.glow || p.gem) { g.add(new THREE.PointLight(c[2], 1.5, 2.5).translateY(p.float ? 1 : 0.4)); if (p.gem) head.add(mk(new THREE.OctahedronGeometry(0.04), mats.glow, 0, 0.12, 0.08)); }
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, (p.float ? 0.9 : r) + r * 1.5, -0.1); return g;
}
function bug(D, mats) {
  const { p, c } = D, g = new THREE.Group(), S = p.size ?? 1, sm = mats.shade, ticks = [], y = (p.fly ? 0.55 : p.crab ? 0.22 : 0.26) * S;
  const shellM = p.metal ? mats.metalShell : sm;
  const thor = blob(0.1 * S, 0.08 * S, 0.11 * S, c[0], c[1], shellM); thor.position.set(0, y, 0); g.add(thor);
  let abd;
  if (p.crab) { abd = blob(0.28 * S, 0.1 * S, 0.22 * S, c[0], c[1], shellM); abd.position.set(0, y, 0); }
  else { abd = blob((p.spider ? 0.17 : p.longAbdomen ? 0.05 : 0.12) * S, (p.spider ? 0.15 : p.longAbdomen ? 0.05 : 0.1) * S, (p.longAbdomen ? 0.42 : p.ant ? 0.15 : 0.2) * S, c[0], p.stripes ? c[1] : c[0], shellM); abd.position.set(0, y + (p.spider ? 0.06 : 0) * S, -(p.longAbdomen ? 0.48 : p.spider ? 0.26 : 0.25) * S); }
  g.add(abd);
  if (p.stripes) for (let i = 0; i < 3; i++) { const s = mk(new THREE.TorusGeometry(0.11 * S, 0.015 * S, 6, 18), mat(c[1]), 0, abd.position.y, abd.position.z - 0.06 * S + i * 0.07 * S); g.add(s); }
  if (p.shell) { const sh = mk(new THREE.SphereGeometry(0.2 * S, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.7, 1.4), mats.metalShell, 0, y, -0.12 * S); g.add(sh); }
  const head = blob(0.07 * S, 0.06 * S, 0.07 * S, c[0], c[1], shellM); head.position.set(0, y, 0.15 * S); g.add(head);
  if (p.spider) for (let i = 0; i < 4; i++) g.add(mk(new THREE.SphereGeometry(0.012 * S, 6, 5), mat(c[2], { emissive: c[2], emissiveIntensity: 2 }), (i - 1.5) * 0.025 * S, y + 0.04 * S, 0.21 * S));
  else for (const s of [-1, 1]) g.add(mk(new THREE.SphereGeometry(0.03 * S, 10, 8), mat(c[2], { emissive: c[2], emissiveIntensity: 1.2, roughness: 0.1 }), s * 0.05 * S, y + 0.02 * S, 0.19 * S));
  if (p.horn) g.add(taper(curve([[0, y + 0.03 * S, 0.18 * S], [0, y + 0.16 * S, 0.28 * S], [0, y + 0.24 * S, 0.24 * S]]), 0.03 * S, 0.004, mats.metalShell, 8, 6));
  if (p.mandibles || p.spider) for (const s of [-1, 1]) g.add(cone(0.012 * S, 0.08 * S, mats.horn, s * 0.03 * S, y - 0.03 * S, 0.22 * S, Math.PI / 2.3, s * 0.4));
  if (!p.fly) for (const s of [-1, 1]) g.add(taper(curve([[s * 0.02 * S, y + 0.05 * S, 0.18 * S], [s * 0.12 * S, y + 0.2 * S, 0.3 * S], [s * 0.2 * S, y + 0.16 * S, 0.42 * S]]), 0.006 * S, 0.002, mats.horn, 8, 4));   // antennes
  const n = p.legs ?? 6, legs = [];
  for (let i = 0; i < n / 2; i++) for (const s of [-1, 1]) { const z = (p.crab ? 0.1 : 0.06) * S - i * (p.crab ? 0.08 : 0.05) * S, reach = (p.spider ? 0.42 : p.crab ? 0.36 : 0.26) * S, leg = new THREE.Group(); leg.position.set(s * (p.crab ? 0.2 : 0.06) * S, y, z);
    const dz = (i - (n / 2 - 1) / 2) * 0.14 * S, knee = (p.fly ? 0.0 : p.spider ? 0.26 : 0.16) * S;
    leg.add(taper(curve([[0, 0, 0], [s * reach * 0.45, knee, dz * 0.6], [s * reach * 0.8, knee * 0.4, dz * 1.1], [s * reach, -y + 0.01, dz * 1.3]]), 0.024 * S, 0.006 * S, p.hairy ? mats.hair : shellM, 14, 6)); g.add(leg); legs.push(leg); }
  ticks.push(t => legs.forEach((l, i) => { l.rotation.y = Math.sin(t * 3 + i * 1.3) * 0.06; }));
  if (p.pincers) for (const s of [-1, 1]) { const arm = taper(curve([[s * 0.08 * S, y, 0.12 * S], [s * 0.2 * S, y + 0.08 * S, 0.3 * S], [s * 0.16 * S, y + 0.05 * S, 0.42 * S]]), 0.04 * S, 0.03 * S, shellM, 10, 8); g.add(arm);
    const cl = new THREE.Group(); cl.position.set(s * 0.16 * S, y + 0.05 * S, 0.46 * S); cl.add(blob(0.07 * S, 0.045 * S, 0.08 * S, c[0], c[1], shellM), cone(0.025 * S, 0.12 * S, shellM, s * 0.03 * S, 0, 0.1 * S, Math.PI / 2)); cl.children[1].rotation.z = s * 0.4; g.add(cl); }
  if (p.stinger && !p.fly) { const tl = chain(6, 0.1 * S, 0.04 * S, 0.02 * S, shellM, [0, 0.5, -0.7]); tl.root.position.set(0, y, abd.position.z - 0.18 * S); tl.joints.forEach(j => { j.rotation.x = 0.5; }); tl.tip.add(cone(0.03 * S, 0.12 * S, mat(c[2], { emissive: c[2], emissiveIntensity: 0.6 }), 0, 0, 0.03 * S, Math.PI * 0.75)); g.add(tl.root); ticks.push(wave(tl.joints, 'x', 0.08, 1.2)); }
  if (p.stinger && p.fly) g.add(cone(0.02 * S, 0.1 * S, mats.horn, 0, y, abd.position.z - 0.26 * S, -Math.PI / 2));
  if (p.wings) { const wm = new THREE.MeshPhysicalMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.35, roughness: 0.1, side: THREE.DoubleSide, iridescence: 1 }), wings = [];
    for (let i = 0; i < p.wings / 2; i++) for (const s of [-1, 1]) { const w = mk(new THREE.SphereGeometry(1, 14, 6).scale(0.4 * S, 0.01, 0.09 * S).translate(s * 0.4 * S, 0, 0), wm, s * 0.04 * S, y + 0.08 * S, (0.02 - i * 0.1) * S); w.castShadow = false; g.add(w); wings.push(w); }
    ticks.push(t => wings.forEach((w, i) => { w.rotation.z = (i % 2 ? 1 : -1) * Math.sin(t * 22 + i) * 0.35; })); }
  anim(g, [t => { abd.scale.y = 1 + Math.sin(t * 2) * 0.02; if (p.fly) g.position.y = Math.sin(t * 2.2) * 0.04; }, ...ticks]);
  g.userData.saddle = new THREE.Vector3(0, y + 0.1 * S, 0); return g;
}
/** Nageoire plate : polygone (u = vers l'arrière, v = hauteur) ×L ; 'vert' = dans le plan vertical, 'flat' = horizontal ; décalage z. */
function fin(pts, m, L, plane, z0) {
  const sh = new THREE.Shape(); pts.forEach(([u, v], i) => (i ? sh.lineTo(u * L, v * L) : sh.moveTo(u * L, v * L))); sh.closePath();
  const o = mk(new THREE.ShapeGeometry(sh), m), inner = new THREE.Group(), g = new THREE.Group(); o.castShadow = false; inner.add(o); g.add(inner);
  if (plane === 'vert') inner.rotation.y = Math.PI / 2;            // (u, v) → (0, v, −u)
  else { o.rotation.x = Math.PI / 2; inner.rotation.y = Math.PI / 2; }   // (u, v) → (v, 0, −u)
  g.position.z = z0; return g;
}
function fish(D, mats) {
  const { p, c } = D, g = new THREE.Group(), L = p.len ?? 1.2, sm = mats.shade, y = 0.35, ticks = [];
  const top = p.orca ? 0x0e1014 : c[0], bot = p.orca ? 0xf4f4f4 : c[1];
  const body = blob(0.13 * L, (p.angler ? 0.16 : 0.15) * L, 0.45 * L, top, bot, sm, 26); body.position.y = y; g.add(body);
  const finM = mats.membrane, tail = new THREE.Group(); tail.position.set(0, y, -0.44 * L); g.add(tail);
  const fm = p.orca ? mat(top, { side: THREE.DoubleSide }) : finM;
  tail.add(taper(curve([[0, 0, 0.12 * L], [0, 0, -0.08 * L]]), 0.07 * L, 0.03 * L, sm, 4, 8));
  if (p.orca || p.narwhal) tail.add(fin([[0, 0], [0.1, 0.24], [0.2, 0.28], [0.16, 0.04], [0.16, -0.04], [0.2, -0.28], [0.1, -0.24]], fm, L, 'flat', -0.06 * L));   // caudale horizontale (cétacés)
  else tail.add(fin([[0, 0], [0.22, 0.26], [0.26, 0.24], [0.14, 0], [0.26, -0.22], [0.22, -0.24]], fm, L, 'vert', -0.06 * L));
  ticks.push(t => { tail.rotation.y = Math.sin(t * 3) * 0.35; body.rotation.y = -Math.sin(t * 3) * 0.06; });
  const dh = p.orca ? 0.34 : p.shark ? 0.24 : p.narwhal ? 0.02 : 0.14, dor = fin([[0, 0], [0.1, dh], [0.16, dh * 0.9], [0.24, 0]], fm, L, 'vert', 0); dor.position.set(0, y + 0.12 * L, 0.06 * L); g.add(dor);
  for (const s of [-1, 1]) { const pf = fin([[0, 0], [0.18, 0.04], [0.2, 0.0], [0.08, -0.04]], fm, L, 'flat', 0); pf.position.set(s * 0.11 * L, y - 0.06 * L, 0.16 * L); pf.rotation.set(0, s * 0.9, s * -0.3); pf.scale.x = s; g.add(pf); }
  eyes(g, 0.018 * L, 0.1 * L, y + 0.04 * L, 0.32 * L, p.orca ? 0x111111 : c[2]);
  if (p.orca) for (const s of [-1, 1]) { const patch = mk(new THREE.SphereGeometry(0.035 * L, 10, 8).scale(1, 0.6, 1.6), mat(0xf6f6f6), s * 0.118 * L, y + 0.05 * L, 0.3 * L); g.add(patch); }
  if (p.shark || p.angler) { const mouth = mk(new THREE.TorusGeometry(0.06 * L, 0.012 * L, 6, 14, Math.PI), mat(0x3a0a0a), 0, y - 0.06 * L, 0.38 * L); mouth.rotation.x = Math.PI / 2.2; g.add(mouth);
    for (let i = 0; i < 8; i++) { const a = Math.PI * (i / 7); g.add(cone(0.008 * L, 0.03 * L, mats.ivory, Math.cos(a) * 0.055 * L, y - 0.06 * L, 0.38 * L + Math.sin(a) * 0.02 * L, Math.PI)); } }
  if (p.angler) { const lure = taper(curve([[0, y + 0.14 * L, 0.25 * L], [0, y + 0.32 * L, 0.38 * L], [0, y + 0.26 * L, 0.55 * L]]), 0.008 * L, 0.004, finM, 10, 4); g.add(lure); const bulb = mk(new THREE.SphereGeometry(0.035 * L, 10, 8), mats.glow, 0, y + 0.24 * L, 0.56 * L); g.add(bulb); g.add(new THREE.PointLight(c[2], 2, 2).translateY(y + 0.24 * L).translateZ(0.56 * L)); ticks.push(t => { bulb.material.emissiveIntensity = 2 + Math.sin(t * 4) * 1; }); }
  if (p.narwhal) g.add(taper(curve([[0, y, 0.44 * L], [0, y + 0.03 * L, 0.8 * L], [0, y + 0.05 * L, 1.05 * L]]), 0.018 * L, 0.002, mats.ivory, 10, 6));
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, y + 0.15 * L, 0); return g;
}
function cephalo(D, mats) {
  const { p, c } = D, g = new THREE.Group(), S = p.size ?? 1.2, sm = mats.shade, ticks = [], y = 0.45 * S;
  const mantle = blob(0.2 * S, (p.squid ? 0.42 : 0.26) * S, 0.2 * S, c[0], c[1], sm); mantle.position.set(0, y + (p.squid ? 0.36 : 0.22) * S, -0.05 * S); mantle.rotation.x = -0.35; g.add(mantle);
  if (p.squid) for (const s of [-1, 1]) { const f = cone(0.1 * S, 0.2 * S, mats.membrane, s * 0.15 * S, y + 0.66 * S, -0.2 * S, -0.3, -s * 1.2); f.scale.set(1, 1, 0.15); g.add(f); }
  const head = blob(0.17 * S, 0.14 * S, 0.16 * S, c[0], c[1], sm); head.position.set(0, y, 0.06 * S); g.add(head);
  for (const s of [-1, 1]) { const e = mk(new THREE.SphereGeometry(0.05 * S, 14, 10), mat(0xf0e0a0, { emissive: c[2], emissiveIntensity: 0.6 }), s * 0.14 * S, y + 0.03 * S, 0.12 * S); e.add(mk(new THREE.BoxGeometry(0.06 * S, 0.012 * S, 0.01), mat(0x050505), 0, 0, 0.05 * S)); g.add(e); }
  const n = p.arms ?? 8, arms = [];
  for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, len = (p.longArms ? 0.22 : 0.15) * S * (p.squid && i < 2 ? 1.5 : 1), ch = chain(6, len, 0.04 * S, 0.008 * S, sm, [Math.cos(a) * 0.9, -0.35, Math.sin(a) * 0.9 + 0.2]);
    ch.root.position.set(Math.cos(a) * 0.08 * S, y - 0.08 * S, 0.06 * S + Math.sin(a) * 0.08 * S); g.add(ch.root); arms.push(ch);
    ch.joints.forEach((j, k) => { for (const sgn of [-1, 1]) if (k % 2) j.add(mk(new THREE.SphereGeometry(0.008 * S, 5, 4), mat(c[1]), sgn * 0.01 * S, 0.02 * S, 0)); }); }
  ticks.push(t => arms.forEach((ch, i) => ch.joints.forEach((j, k) => { j.rotation.x = Math.sin(t * 1.4 + i * 0.8 + k * 0.6) * 0.28; j.rotation.z = Math.cos(t * 1.1 + i + k * 0.5) * 0.2; })));
  anim(g, [t => { mantle.scale.set(1 + Math.sin(t * 1.6) * 0.04, 1, 1 + Math.sin(t * 1.6) * 0.04); }, ...ticks]);
  g.userData.saddle = new THREE.Vector3(0, y + 0.3 * S, -0.05 * S); return g;
}
function jelly(D, mats) {
  const { c, p } = D, g = new THREE.Group(), S = p.size ?? 1, y = 0.9 * S, ticks = [];
  const bm = new THREE.MeshPhysicalMaterial({ color: c[0], emissive: c[2], emissiveIntensity: 0.6, transparent: true, opacity: 0.55, roughness: 0.1, transmission: 0.3, side: THREE.DoubleSide });
  const bell = mk(new THREE.SphereGeometry(0.32 * S, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), bm, 0, y, 0); g.add(bell);
  bell.add(mk(new THREE.SphereGeometry(0.16 * S, 16, 10), mat(c[1], { emissive: c[1], emissiveIntensity: 0.8, transparent: true, opacity: 0.8 }), 0, 0.06 * S, 0));
  const tent = [];
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2, ch = chain(6, 0.12 * S, 0.012 * S, 0.003 * S, bm, [0, -1, 0]); ch.root.position.set(Math.cos(a) * 0.26 * S, y, Math.sin(a) * 0.26 * S); g.add(ch.root); tent.push(ch); }
  for (let i = 0; i < 4; i++) { const ch = chain(5, 0.12 * S, 0.04 * S, 0.01 * S, mat(c[1], { transparent: true, opacity: 0.7, side: THREE.DoubleSide }), [0, -1, 0]); ch.root.position.set(Math.cos(i * 1.6) * 0.06 * S, y, Math.sin(i * 1.6) * 0.06 * S); g.add(ch.root); tent.push(ch); }
  g.add(new THREE.PointLight(c[2], 1.6, 2.5).translateY(y));
  ticks.push(t => { const b = Math.sin(t * 1.8); bell.scale.set(1 + b * 0.08, 1 - b * 0.1, 1 + b * 0.08); g.position.y = Math.sin(t * 0.9) * 0.08; tent.forEach((ch, i) => ch.joints.forEach((j, k) => { j.rotation.x = Math.sin(t * 1.5 + i + k * 0.7) * 0.15; j.rotation.z = Math.cos(t * 1.2 + i * 0.5 + k * 0.7) * 0.15; })); });
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, y + 0.3 * S, 0); return g;
}
function ray(D, mats) {
  const { c, p } = D, g = new THREE.Group(), S = p.size ?? 1.2, y = 0.4, sm = mats.shade;
  const sh = new THREE.Shape(); sh.moveTo(0, 0.32); sh.quadraticCurveTo(0.25, 0.25, 0.62, -0.05); sh.quadraticCurveTo(0.3, -0.12, 0, -0.3); sh.quadraticCurveTo(-0.3, -0.12, -0.62, -0.05); sh.quadraticCurveTo(-0.25, 0.25, 0, 0.32);
  const geo = countershade(new THREE.ExtrudeGeometry(sh, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 }).rotateX(Math.PI / 2).scale(S, S, S), c[0], c[1]);
  const body = mk(geo, sm, 0, y, 0); g.add(body);
  for (const s of [-1, 1]) g.add(cone(0.04 * S, 0.14 * S, sm, s * 0.08 * S, y, 0.34 * S, Math.PI / 2));
  eyes(g, 0.015 * S, 0.1 * S, y + 0.03, 0.26 * S, c[2]);
  const tl = chain(5, 0.12 * S, 0.02 * S, 0.004, sm, [0, 0, -1]); tl.root.position.set(0, y, -0.28 * S); g.add(tl.root);
  // battement : les sommets s'élèvent avec la distance à l'axe (ondulation des « ailes »), à partir des positions d'origine
  const pos = geo.attributes.position, base0 = Float32Array.from(pos.array);
  anim(g, [t => { for (let i = 0; i < pos.count; i++) { const x = base0[i * 3]; pos.array[i * 3 + 1] = base0[i * 3 + 1] + Math.sin(t * 1.8 - Math.abs(x) * 3) * Math.abs(x) * 0.25; } pos.needsUpdate = true; g.position.y = Math.sin(t * 0.8) * 0.05; }, wave(tl.joints, 'y', 0.15, 1.6)]);
  g.userData.saddle = new THREE.Vector3(0, y + 0.08, 0); return g;
}
function turtle(D, mats) {
  const { c, p } = D, g = new THREE.Group(), S = p.size ?? 1.1, sm = mats.shade, y = (p.flippers ? 0.32 : 0.26) * S, ticks = [];
  const shell = mk(countershade(new THREE.SphereGeometry(0.34 * S, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.62, 1.2), c[1], c[1]), mats.shadeRough, 0, y, 0); g.add(shell);
  for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; const sc = mk(new THREE.CylinderGeometry(0.07 * S, 0.08 * S, 0.02, 6), mats.horn, Math.cos(a) * 0.17 * S, y + 0.15 * S, Math.sin(a) * 0.2 * S); sc.lookAt(sc.position.clone().multiplyScalar(2).setY(y + 0.6)); g.add(sc); }
  if (p.spikes) for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI * 2; g.add(cone(0.035 * S, 0.14 * S, mats.horn, Math.cos(a) * 0.15 * S, y + 0.19 * S, Math.sin(a) * 0.18 * S)); }
  g.add(mk(new THREE.CylinderGeometry(0.33 * S, 0.33 * S, 0.04, 24).scale(1, 1, 1.2), sm, 0, y, 0));
  const head = new THREE.Group(); head.position.set(0, y + 0.02, 0.42 * S); g.add(head);
  head.add(taper(curve([[0, 0, -0.1 * S], [0, 0.02, 0]]), 0.07 * S, 0.06 * S, sm, 4, 9)); const hd = beastHead({ ...D, p: { horns: p.spikes ? 'straight' : null } }, mats, { size: 0.65 * S, snout: 0.12 }); head.add(hd);
  const limbs = [];
  for (const [x, z] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const l = new THREE.Group(); l.position.set(x * 0.28 * S, y - 0.02, z * 0.28 * S);
    if (p.flippers) { const f = mk(new THREE.SphereGeometry(1, 12, 6).scale((z > 0 ? 0.24 : 0.12) * S, 0.02, 0.07 * S).translate(x * (z > 0 ? 0.2 : 0.1) * S, 0, 0), sm); l.add(f); }
    else { l.add(taper(curve([[0, 0, 0], [x * 0.06 * S, -y * 0.6, 0], [x * 0.07 * S, -y + 0.03, 0.02]]), 0.07 * S, 0.06 * S, sm, 6, 8)); for (let i = -1; i <= 1; i++) l.add(cone(0.012, 0.05, mats.horn, x * 0.07 * S + i * 0.025, -y + 0.03, 0.08, Math.PI / 2)); }
    g.add(l); limbs.push(l); }
  ticks.push(t => limbs.forEach((l, i) => { l.rotation.y = Math.sin(t * (p.flippers ? 1.6 : 0.9) + i * 1.5) * (p.flippers ? 0.4 : 0.06); }), t => { head.rotation.y = Math.sin(t * 0.5) * 0.2; });
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, y + 0.22 * S, -0.02); return g;
}
function seahorse(D, mats) {
  const { c, p } = D, g = new THREE.Group(), S = p.size ?? 1, sm = mats.shade, ticks = [];
  const pts = [[0, 0.3, -0.08], [0, 0.42, 0.02], [0, 0.62, 0.06], [0, 0.82, 0.02], [0, 0.98, -0.02]].map(([x, y, z]) => [x, y * S, z * S]);
  g.add(taper(curve(pts), 0.09 * S, 0.07 * S, sm, 16, 12));
  const tail = taper(curve([[0, 0.3 * S, -0.08 * S], [0, 0.16 * S, -0.02 * S], [0, 0.1 * S, 0.1 * S], [0, 0.18 * S, 0.14 * S], [0, 0.22 * S, 0.06 * S]]), 0.06 * S, 0.01 * S, sm, 16, 8); g.add(tail);
  const head = new THREE.Group(); head.position.set(0, 1.02 * S, 0); g.add(head); head.add(blob(0.07 * S, 0.08 * S, 0.08 * S, c[0], c[1], sm));
  head.add(taper(curve([[0, -0.02 * S, 0.04 * S], [0, -0.06 * S, 0.14 * S], [0, -0.07 * S, 0.22 * S]]), 0.035 * S, 0.025 * S, sm, 6, 8)); eyes(head, 0.016 * S, 0.05 * S, 0.01 * S, 0.04 * S, c[2]);
  for (let i = 0; i < 5; i++) head.add(cone(0.012 * S, 0.06 * S, sm, 0, 0.07 * S, -0.02 * S - i * 0.02 * S, -0.8));
  for (let i = 0; i < 8; i++) g.add(cone(0.015 * S, 0.05 * S, mats.horn, 0, (0.38 + i * 0.08) * S, (-0.09 + Math.sin(i * 0.5) * 0.03) * S, -Math.PI / 2));
  const fin = mk(new THREE.CircleGeometry(0.08 * S, 12, Math.PI / 2, Math.PI), mats.membrane, 0, 0.62 * S, -0.08 * S); fin.rotation.y = Math.PI / 2; g.add(fin);
  ticks.push(t => { fin.scale.set(1, 1 + Math.sin(t * 14) * 0.15, 1); g.position.y = Math.sin(t * 1.1) * 0.06; g.rotation.x = Math.sin(t * 0.7) * 0.05; });
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, 0.82 * S, -0.1 * S); return g;
}
function tree(D, mats) {
  const { c, p } = D, g = new THREE.Group(), H = p.h ?? 1.8, bark = mats.bark, ticks = [];
  g.add(taper(curve([[0, 0.25, 0], [0.02, H * 0.45, 0.02], [0, H * 0.75, 0]]), 0.16, 0.1, bark, 12, 10));
  for (let i = 0; i < 5; i++) { const a = (i / 5) * Math.PI * 2; g.add(taper(curve([[0, 0.35, 0], [Math.cos(a) * 0.2, 0.15, Math.sin(a) * 0.2], [Math.cos(a) * 0.32, 0.0, Math.sin(a) * 0.32]]), 0.06, 0.015, bark, 8, 6)); }
  const arms = [-1, 1].map(s => { const a = new THREE.Group(); a.position.set(s * 0.1, H * 0.62, 0); a.add(taper(curve([[0, 0, 0], [s * 0.25, -0.05, 0.05], [s * 0.38, -0.3, 0.1], [s * 0.42, -0.5, 0.18]]), 0.06, 0.015, bark, 10, 7));
    for (let i = 0; i < 3; i++) a.add(taper(curve([[s * 0.42, -0.5, 0.18], [s * (0.44 + i * 0.03), -0.6, 0.22 + i * 0.03]]), 0.012, 0.003, bark, 4, 4)); g.add(a); return a; });
  for (let i = 0; i < 9; i++) { const a = i * 2.39, r = 0.12 + (i % 3) * 0.08; g.add(mk(new THREE.IcosahedronGeometry(0.16 + (i % 2) * 0.06, 1), mat(i % 3 ? c[1] : new THREE.Color(c[1]).multiplyScalar(0.75).getHex(), { flatShading: true }), Math.cos(a) * r, H * 0.85 + (i % 4) * 0.08, Math.sin(a) * r)); }
  eyes(g, 0.025, 0.05, H * 0.62, 0.11, c[2]); g.add(mk(new THREE.BoxGeometry(0.1, 0.025, 0.02), mat(0x120a04), 0, H * 0.52, 0.12));
  ticks.push(t => arms.forEach((a, i) => { a.rotation.z = (i ? -1 : 1) * Math.sin(t * 0.8) * 0.08; a.rotation.x = Math.sin(t * 0.6 + i) * 0.05; }));
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, H * 0.9, 0); return g;
}
function elemental(D, mats) {
  const { c, p } = D, g = new THREE.Group(), S = p.size ?? 1.2, ticks = [];
  const core = mk(new THREE.IcosahedronGeometry(0.16 * S, 1), mats.glow, 0, 0.8 * S, 0); g.add(core); g.add(new THREE.PointLight(c[2], 2, 3).translateY(0.8 * S));
  const rocks = []; for (let i = 0; i < 14; i++) { const r = mk(new THREE.DodecahedronGeometry((0.07 + (i % 4) * 0.025) * S), i % 5 ? mats.rock : mat(c[1], { flatShading: true }), 0, 0, 0); g.add(r); rocks.push({ r, a: i * 0.9, h: 0.35 + (i % 7) * 0.12, d: 0.2 + (i % 3) * 0.08 }); }
  for (const s of [-1, 1]) g.add(mk(new THREE.DodecahedronGeometry(0.14 * S), mats.rock, s * 0.12 * S, 0.12 * S, 0));
  ticks.push(t => { core.rotation.y = t * 0.6; rocks.forEach(({ r, a, h, d }, i) => { const k = a + t * (0.4 + (i % 3) * 0.15); r.position.set(Math.cos(k) * d * S, (h + Math.sin(t * 1.3 + i) * 0.03) * S, Math.sin(k) * d * S); r.rotation.set(t * 0.3 + i, t * 0.2, 0); }); });
  anim(g, ticks); g.userData.saddle = new THREE.Vector3(0, 1.1 * S, 0); return g;
}
const PLANS = { quad, biped, bird, serpent, bug, fish, cephalo, jelly, ray, turtle, seahorse, tree, elemental };
/** Matériaux d'un design (couleurs du catalogue). */
function materials(D) {
  const [a, b, glow] = D.c, ghost = D.p.ghost ? { transparent: true, opacity: 0.6, emissive: glow, emissiveIntensity: 0.35 } : {}, metal = D.p.metal ? { metalness: 0.55, roughness: 0.32 } : {};
  const fire = D.p.fire || D.p.style === 'lava';
  return { shade: shadeMat(a, b, { roughness: D.p.fur ? 0.95 : 0.55, ...metal, ...ghost }), shadeRough: shadeMat(b, b, { roughness: 0.85 }),
    horn: mat(0x2a2420, { roughness: 0.35 }), ivory: mat(0xeee4cc, { roughness: 0.3 }), beak: mat(0xd8a838, { roughness: 0.4 }), hair: mat(new THREE.Color(b).multiplyScalar(0.8).getHex(), { roughness: 0.95, ...ghost }),
    membrane: mat(new THREE.Color(a).lerp(new THREE.Color(glow), 0.18).multiplyScalar(0.85).getHex(), { side: THREE.DoubleSide, roughness: 0.7, transparent: D.p.ghost, opacity: D.p.ghost ? 0.5 : 1, emissive: fire ? glow : 0, emissiveIntensity: fire ? 0.15 : 0 }),
    feather: mat(a, { roughness: 0.8, side: THREE.DoubleSide, emissive: fire ? glow : 0, emissiveIntensity: fire ? 0.5 : 0 }), feather2: mat(b, { roughness: 0.8, side: THREE.DoubleSide, emissive: fire ? glow : 0, emissiveIntensity: fire ? 0.4 : 0 }),
    rock: mat(a, { roughness: 0.9, flatShading: true, emissive: D.p.style === 'lava' ? 0x3a0800 : 0, emissiveIntensity: 1 }), bone: mat(a, { roughness: 0.6 }), bark: mat(a, { roughness: 1 }),
    glow: mat(glow, { emissive: glow, emissiveIntensity: 2.2, roughness: 0.3 }), metal: mat(0x9aa0a8, { metalness: 0.8, roughness: 0.3 }), gold: mat(0xe0b040, { metalness: 0.9, roughness: 0.25 }),
    wood: mat(0x5a3a22, { roughness: 0.9 }), metalShell: shadeMat(a, b, { metalness: 0.5, roughness: 0.25 }) };
}
/** Modèle 3D d'un design du catalogue (créé à la demande). */
export function buildCreature(D) {
  const g = (PLANS[D.plan] ?? quad)(D, materials(D)), s = D.p.scale ?? 1; g.scale.setScalar(s);
  if (g.userData.saddle) g.userData.saddle.multiplyScalar(s);
  const box = new THREE.Box3().setFromObject(g); g.userData.height = Math.max(0.6, box.max.y); g.userData.design = D.key; return g;
}
