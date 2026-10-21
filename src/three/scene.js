import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js'; import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'; import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { noiseAt, terrain, setWorld, FEATURES } from '../lib/terrain'; import { heightAt, groundColor, hash, WATER_Y } from '../lib/relief'; import { makeEntity } from './entities';
const noiseTex = () => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); g.fillStyle = '#d8d8d8'; g.fillRect(0, 0, 256, 256);
  for (const [n, a] of [[8, .3], [32, .25], [128, .15], [256, .1]]) { const s = document.createElement('canvas'); s.width = s.height = n; const sg = s.getContext('2d'), id = sg.createImageData(n, n);
    for (let i = 0; i < n * n; i++) { const v = Math.random() * 255; id.data.set([v, v, v, 255], i * 4); } sg.putImageData(id, 0, 0); g.globalAlpha = a; g.drawImage(s, 0, 0, 256, 256); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

/** Scène réaliste : terrain en relief continu, ciel physique (cycle jour/nuit sur l'heure locale), ombres, eau, végétation instanciée,
 *  brume aux limites de la vision. Caméra asservie au personnage ; clic droit = pivoter, molette = zoom. */
export function createScene(el, { onClick = () => {}, onHover = () => {}, orbit = false } = {}) {
  const W = () => el.clientWidth || innerWidth, H = () => el.clientHeight || innerHeight;
  const r = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(W(), H());
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; r.toneMapping = THREE.ACESFilmicToneMapping; el.appendChild(r.domElement);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38, W() / H(), 0.1, 400), fog = new THREE.FogExp2(0xa9c2dc, 0.02); scene.fog = fog;
  const hemi = new THREE.HemisphereLight(0xcfe4ff, 0x3a2f22, 0.6), sun = new THREE.DirectionalLight(0xfff1d6, 2.4); scene.add(hemi, sun, sun.target);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.04; sun.shadow.radius = 4;
  const rt = new THREE.WebGLRenderTarget(W(), H(), { samples: 4, type: THREE.HalfFloatType }), comp = new EffectComposer(r, rt), bloom = new UnrealBloomPass(new THREE.Vector2(W(), H()), 0.3, 0.6, 0.92);
  comp.addPass(new RenderPass(scene, cam)); comp.addPass(bloom); comp.addPass(new OutputPass());

  // ---- ciel + éclairage selon l'heure locale
  const skyScene = new THREE.Scene(), sky = new Sky(); sky.scale.setScalar(1000); skyScene.add(sky); const pmrem = new THREE.PMREMGenerator(r); let env = null, elev = 30;
  const NIGHT = new THREE.Color(0x2a3858), DUSK = new THREE.Color(0x8a6a78), DAY = new THREE.Color(0xa9c0d8);
  function applyTime() {
    const d = new Date(), hr = d.getHours() + d.getMinutes() / 60; elev = Math.max(-6, 58 * Math.sin(Math.PI * (hr - 6) / 12));
    const L = THREE.MathUtils.lerp, S = THREE.MathUtils.smoothstep, day = S(elev, -3, 12), warm = 1 - S(elev, 4, 24), u = sky.material.uniforms;
    const sp = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - Math.max(elev, 3)), THREE.MathUtils.degToRad(150));       // position réelle du soleil dans le ciel
    u.sunPosition.value.copy(sp); u.turbidity.value = 4 + warm * 4; u.rayleigh.value = 1.4 + warm * 1.6; u.mieCoefficient.value = 0.004; u.mieDirectionalG.value = 0.85;
    env?.dispose(); env = pmrem.fromScene(skyScene); scene.environment = env.texture; scene.background = env.texture; scene.backgroundBlurriness = 0.03; scene.backgroundIntensity = L(0.75, 0.85, day); scene.environmentIntensity = L(0.7, 1, day);
    // La direction de la lumière reste haute (>= 34°) même à l'aube/au crépuscule/la nuit : le sol est toujours lisible. Seule l'ambiance (teinte, intensité) suit l'heure.
    sun.userData.dir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - Math.max(elev, 34)), THREE.MathUtils.degToRad(150));
    sun.intensity = L(1.7, 3.1, day) * (1 - warm * 0.15); sun.color.set(day < 0.45 ? 0xa9c0ff : warm > 0.3 ? 0xffc890 : 0xfff1d6);
    hemi.intensity = L(1.0, 0.95, day); hemi.color.set(day < 0.45 ? 0x8ea3e6 : 0xdfeeff); hemi.groundColor.set(day < 0.45 ? 0x353c5c : 0x6b5a45); r.toneMappingExposure = L(1.25, 1.3, day);
    fog.color.copy(NIGHT).lerp(DUSK, S(elev, -4, 6)).lerp(DAY, S(elev, 8, 28)); fog.density = 0.009 + (1 - day) * 0.003; bloom.strength = 0.22 + (1 - day) * 0.1; if (last) buildTerrain();
  }

  // ---- terrain (maillage continu), eau, végétation
  let R = 0, N = 0, geo, terr, ox, oz, last = null; const tex = noiseTex(), tmat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.95, metalness: 0 });
  const wgeo = new THREE.PlaneGeometry(1, 1, 56, 56).rotateX(-Math.PI / 2), water = new THREE.Mesh(wgeo, new THREE.MeshPhysicalMaterial({ color: 0x2a7fa3, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.6, clearcoat: 1, envMapIntensity: 1.3 })); water.receiveShadow = true; scene.add(water);
  const IM = (g, m, n) => { const o = new THREE.InstancedMesh(g, m, n); o.castShadow = o.receiveShadow = true; o.frustumCulled = false; o.count = 0; scene.add(o); return o; };      // frustumCulled=false : la sphère englobante initiale devient fausse dès qu'on se déplace
  const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, ...o });
  const trunk = IM(new THREE.CylinderGeometry(0.05, 0.085, 0.55, 6).translate(0, 0.27, 0), std(0x4a3322, { roughness: 1 }), 6000), pine1 = IM(new THREE.ConeGeometry(0.34, 0.8, 8).translate(0, 0.85, 0), std(0x1d4a22), 6000), pine2 = IM(new THREE.ConeGeometry(0.24, 0.6, 8).translate(0, 1.3, 0), std(0x2a5d28), 6000);
  const oak = IM(new THREE.IcosahedronGeometry(0.34, 1).translate(0, 0.78, 0), std(0x3f7a2a, { flatShading: true }), 3000), grass = IM(new THREE.ConeGeometry(0.045, 0.24, 4).translate(0, 0.12, 0), std(0x5f9a35), 9000), boulders = IM(new THREE.DodecahedronGeometry(0.3, 1), std(0x77736d, { flatShading: true, map: tex }), 3000);
  const spires = IM(new THREE.ConeGeometry(0.34, 1, 6).translate(0, 0.5, 0), std(0x6e6a68, { flatShading: true, map: tex }), 3000);
  // minerais (un maillage émissif par type), flore des ressources (plantes) et teintes d'arbres par essence
  let world = 1;
  const ORE_FX = { adamantine: [0x8fa4b8, 0x2b4a73], mithril: [0xcfe8ff, 0x5aa0ff], uru: [0xd9a04a, 0xb86a10], ebonite: [0x2b2733, 0x7a3aba], verre_dragon: [0x140606, 0xff3a10], cristal_givre: [0xd8f4ff, 0x6fd8ff], prisme_ether: [0xe8c4ff, 0xa060ff] };
  const oreGeo = new THREE.OctahedronGeometry(0.12).scale(1, 1.9, 1).translate(0, 0.12, 0), ores = {};
  for (const k in ORE_FX) ores[k] = IM(oreGeo, std(ORE_FX[k][0], { emissive: ORE_FX[k][1], emissiveIntensity: 1.7, roughness: 0.25 }), 1500);
  const FLORA_FX = { pissenlit_tempete: [0xf2e04a, 0], tresle_six_feuilles: [0x5fd06a, 1], lavande_crepusculaire: [0x8a63d8, 2], chardon_sang: [0xc02a3a, 2], rose_sables: [0xe8c9a0, 1], nenuphar_spectres: [0x7fe0c0, 1], gingembre_marees: [0xe0a050, 2] };
  const FGEO = [new THREE.SphereGeometry(0.07, 8, 6).translate(0, 0.22, 0), new THREE.CylinderGeometry(0.16, 0.16, 0.02, 8).translate(0, 0.02, 0), new THREE.ConeGeometry(0.05, 0.3, 5).translate(0, 0.15, 0)], flora = {};
  for (const k in FLORA_FX) flora[k] = IM(FGEO[FLORA_FX[k][1]], std(FLORA_FX[k][0], { emissive: FLORA_FX[k][0], emissiveIntensity: 0.25 }), 6000);
  [trunk, pine1, pine2, oak, spires, boulders].forEach(m => m.material.color.set(0xffffff));      // teintes appliquées par instance
  const ALL = [trunk, pine1, pine2, oak, grass, boulders, spires, ...Object.values(ores), ...Object.values(flora)];
  // Yggdrasil : l'arbre unique de 8 cases (4x2), dessiné une seule fois
  const ygg = new THREE.Group(); {
    const bark = std(0x5a4128), leaf = std(0x4fae3a, { emissive: 0x1d5a18, emissiveIntensity: 0.5 }), part = (g, m, x, y, z) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; ygg.add(o); };
    part(new THREE.CylinderGeometry(0.9, 1.5, 7, 14), bark, 0, 3.5, 0);
    for (const [x, y, z, r] of [[0, 8.4, 0, 3.6], [-2.2, 7.4, 0.6, 2.6], [2.4, 7.6, -0.4, 2.8], [0.4, 10.3, 0.2, 2.4]]) part(new THREE.IcosahedronGeometry(r, 1), leaf, x, y, z);
    ygg.visible = false; scene.add(ygg);
  }
  const cur = { x: 0, y: 0 }, focus = new THREE.Vector3(), tmpC = new THREE.Color(), dum = new THREE.Object3D(); let see = 5;
  function allocate(s) { see = s; R = Math.min(s + 3, 22); N = R * 2 * 3; geo?.dispose(); geo = new THREE.PlaneGeometry(R * 2, R * 2, N, N).rotateX(-Math.PI / 2); ox = geo.attributes.position.array.slice(); oz = null;
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3)); if (terr) scene.remove(terr); terr = new THREE.Mesh(geo, tmat); terr.receiveShadow = true; terr.castShadow = true; scene.add(terr); wgeo.scale(1, 1, 1); water.scale.set(R * 2 + 8, 1, R * 2 + 8); }
  const ss = (a, b, x) => THREE.MathUtils.smoothstep(x, a, b);
  function buildTerrain() {
    const p = geo.attributes.position.array, c = geo.attributes.color.array, uv = geo.attributes.uv.array;
    for (let i = 0, k = 0; i < p.length; i += 3, k += 2) { const x = cur.x + ox[i], z = cur.y + ox[i + 2], h = heightAt(x, z); p[i] = x; p[i + 1] = h; p[i + 2] = z; uv[k] = x * 0.35; uv[k + 1] = z * 0.35;
      groundColor(x, z, h, tmpC); const d = Math.max(Math.abs(x - cur.x), Math.abs(z - cur.y)); tmpC.lerp(fog.color, ss(see + 0.4, see + 2.4, d)); c[i] = tmpC.r; c[i + 1] = tmpC.g; c[i + 2] = tmpC.b; }
    geo.attributes.position.needsUpdate = geo.attributes.color.needsUpdate = geo.attributes.uv.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingSphere(); geo.computeBoundingBox(); water.position.set(cur.x, WATER_Y, cur.y);
  }
  const WOOD = { lorien: [0xe0b93d, 0x7a5a30], shinju: [0xf2a0c0, 0x4a2f28], adam: [0xa84a2a, 0x3a2418], weirwood: [0xb3262e, 0xf0ece4] }, GREEN = [0x2f6d2a, 0x4a3322], ROCK = { mountain: 0x77736d, snow: 0xeef4fb, ether: 0x3a3448, volcano: 0x241512 };
  function buildVegetation(occ) {
    const cnt = new Map(), put = (m, x, y, z, sx, ry, sy = sx, c) => { const i = cnt.get(m) ?? 0; if (i >= m.instanceMatrix.count) return; cnt.set(m, i + 1); dum.position.set(x, y, z); dum.rotation.set(0, ry, 0); dum.scale.set(sx, sy, sx); dum.updateMatrix(); m.setMatrixAt(i, dum.matrix); if (c !== undefined) m.setColorAt(i, tmpC.set(c)); };
    for (let dx = -see - 1; dx <= see + 1; dx++) for (let dy = -see - 1; dy <= see + 1; dy++) {
      const cx = cur.x + dx, cy = cur.y + dy; if (occ.has(cx + ',' + cy)) continue;       // une case occupée : ce qui l'occupe prime
      const fade = 1 - ss(see - 0.5, see + 1.2, Math.max(Math.abs(dx), Math.abs(dy))); if (fade <= 0.05) continue;
      const t = terrain(cx, cy), k = t.kind, id = t.resourceId, fl = flora[id], jit = (i, j) => (hash(cx * 3 + i, cy * 5 + j) - 0.5) * 0.86;
      if (k === 'deep') continue;
      if (k === 'shallow') { if (fl && hash(cx, cy * 3) < 0.7) { const x = cx + jit(1, 1), z = cy + jit(2, 2); put(fl, x, WATER_Y + 0.03, z, fade, hash(x, z) * 6); } continue; }
      if (fl) for (let i = 0; i < 2; i++) { const x = cx + jit(i, 6), z = cy + jit(i, 7); put(fl, x, heightAt(x, z), z, (0.8 + hash(x, z) * 0.6) * fade, hash(z, x) * 6); }   // plante récoltable visible sur la case
      if (k === 'forest') { if (id === 'yggdrasil') continue;       // l'arbre unique est dessiné à part
        const [leaf, bark] = WOOD[id] ?? GREEN;
        for (let i = 0; i < 5; i++) { const x = cx + jit(i, 1), z = cy + jit(i, 2), h = heightAt(x, z), sc = (0.7 + hash(cx + i, cy * 7) * 0.8) * fade;
          put(trunk, x, h, z, sc, hash(x, z) * 6, sc, bark); if (hash(cx + i * 9, cy) < 0.7) { put(pine1, x, h, z, sc, 0, sc, leaf); put(pine2, x, h, z, sc, 0, sc, leaf); } else put(oak, x, h, z, sc * 1.1, hash(z, x) * 6, sc * 1.1, leaf); }
        continue; }
      if (k === 'plain') { for (let i = 0; i < 3; i++) { const x = cx + jit(i, 3), z = cy + jit(i, 4); put(grass, x, heightAt(x, z), z, (0.7 + hash(x, z) * 0.8) * fade, hash(z, x) * 6, (0.8 + hash(x, z * 2)) * fade); }
        if (hash(cx, cy) < 0.07) { const x = cx + jit(0, 1), z = cy + jit(0, 2), h = heightAt(x, z), sc = (0.7 + hash(cx, cy * 7) * 0.8) * fade; put(trunk, x, h, z, sc, hash(x, z) * 6, sc, GREEN[1]); put(pine1, x, h, z, sc, 0, sc, GREEN[0]); put(pine2, x, h, z, sc, 0, sc, GREEN[0]); }
        continue; }
      if (k === 'arid') { if (hash(cx + 4, cy) < 0.08) { const x = cx + jit(0, 7), z = cy + jit(1, 8); put(boulders, x, heightAt(x, z) + 0.08, z, (0.4 + hash(x, z) * 0.5) * fade, hash(z, x) * 6, undefined, 0xa08a62); } continue; }
      // massifs, glaces, pics d'éther, volcan : aiguilles + rochers teintés, et cristaux du minerai de la case
      const rock = ROCK[k], hk = 1 + Math.max(0, noiseAt(cx, cy) - 0.74) * 7;
      for (let i = 0; i < 2; i++) { const x = cx + jit(i, 5) * 0.8, z = cy + jit(i, 6) * 0.8, sc = (0.7 + hash(cx + i, cy + 3) * 0.9) * fade; put(spires, x, heightAt(x, z) - 0.1, z, sc, hash(x, z) * 6, sc * (1.1 + hash(z, x) * 1.3) * hk, rock); }
      for (let i = 0; i < 2; i++) { const x = cx + jit(i, 7), z = cy + jit(i, 8); put(boulders, x, heightAt(x, z) + 0.1, z, (0.5 + hash(x, z) * 1.1) * fade, hash(z, x) * 6, undefined, rock); }
      const ore = ores[id]; if (ore && hash(cx, cy * 2) < (k === 'volcano' ? 0.95 : 0.6)) { const x = cx + jit(1, 9) * 0.6, z = cy + jit(2, 9) * 0.6, h = heightAt(x, z); for (let i = 0; i < 3; i++) put(ore, x + (i - 1) * 0.1, h, z + (i % 2 ? 0.08 : -0.08), (0.8 + hash(i, cx) * 0.8) * fade, i); }
    }
    for (const m of ALL) { m.count = cnt.get(m) ?? 0; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    const g = FEATURES.ygg, gx = g.x + (g.w - 1) / 2, gz = g.y + (g.h - 1) / 2;
    ygg.visible = world === 1 && Math.max(Math.abs(gx - cur.x), Math.abs(gz - cur.y)) <= see + 5; if (ygg.visible) ygg.position.set(gx, Math.max(heightAt(gx, gz), WATER_Y), gz);
  }
  // ---- quadrillage léger au sol (suit le relief, s'estompe aux limites de la vision)
  const grid = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); grid.frustumCulled = false; grid.renderOrder = 2; scene.add(grid);
  function buildGrid() {
    const pos = [], col = [], s = see, line = (x0, z0, x1, z1) => { const n = Math.max(1, Math.round(Math.hypot(x1 - x0, z1 - z0) / 0.5));
      for (let i = 0; i < n; i++) for (const t of [i / n, (i + 1) / n]) { const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t, f = 1 - ss(s - 0.4, s + 0.6, Math.max(Math.abs(x - cur.x), Math.abs(z - cur.y))) , k = 0.2 * f;
        pos.push(x, Math.max(heightAt(x, z), WATER_Y) + 0.04, z); col.push(k, k, k * 0.92); } };
    for (let i = 0; i <= 2 * s + 1; i++) { const b = -s - 0.5 + i; line(cur.x + b, cur.y - s - 0.5, cur.x + b, cur.y + s + 0.5); line(cur.x - s - 0.5, cur.y + b, cur.x + s + 0.5, cur.y + b); }
    grid.geometry.dispose(); grid.geometry = new THREE.BufferGeometry(); grid.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); grid.geometry.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  }
  // ---- curseurs de case
  const cursor = (col, op) => { const g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, depthTest: false }); g.add(new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.96).rotateX(-Math.PI / 2), m));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.96, 0.96).rotateX(-Math.PI / 2)), new THREE.LineBasicMaterial({ color: col, depthTest: false }))); g.renderOrder = 10; g.visible = false; scene.add(g); return g; };
  const hov = cursor(0xf0d28a, 0.16), selc = cursor(0xffffff, 0.28), put2 = (g, c) => { g.visible = !!c; if (c) g.position.set(c.x, Math.max(heightAt(c.x, c.y), WATER_Y) + 0.06, c.y); };

  // ---- points cardinaux posés au sol sur le pourtour de la vision : ils tournent avec la carte (Nord = haut de la grille)
  const CARD = [['Nord', 0, -1, '#f0d28a'], ['Est', 1, 0, '#ffffff'], ['Sud', 0, 1, '#ffffff'], ['Ouest', -1, 0, '#ffffff']].map(([txt, dx, dz, col]) => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 96; const g = c.getContext('2d'); g.font = '700 54px Cinzel, Georgia, serif'; g.textAlign = 'center'; g.lineWidth = 9; g.strokeStyle = 'rgba(8,8,16,.9)'; g.strokeText(txt, 128, 66); g.fillStyle = col; g.fillText(txt, 128, 66);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, depthTest: false, transparent: true, opacity: 0.92, fog: false })); s.scale.set(2.8, 1.05, 1); s.renderOrder = 15; scene.add(s); return { s, dx, dz }; });
  const placeCardinals = () => { for (const { s, dx, dz } of CARD) { const x = cur.x + dx * (see + 1.4), z = cur.y + dz * (see + 1.4); s.position.set(x, Math.max(heightAt(x, z), WATER_Y) + 1.1, z); } };
  // ---- entités (diff par clé, déplacement interpolé)
  const ents = new Map(), root = new THREE.Group(); scene.add(root);
  function syncEntities(me, list) {
    const keep = new Set();
    for (const e of list) { if (Math.max(Math.abs(e.x - me.pos.x), Math.abs(e.y - me.pos.y)) > see) continue; const key = `${e.kind}:${e.char_id ?? e.monster_id ?? e.summon_id ?? e.building_id ?? e.x + ',' + e.y}:${e.mount_name ?? ''}`; keep.add(key);
      const y = Math.max(heightAt(e.x, e.y), WATER_Y); let o = ents.get(key); if (!o) { o = { g: makeEntity(e, e.char_id === me.id), t: new THREE.Vector3(e.x, y, e.y) }; o.g.position.copy(o.t); root.add(o.g); ents.set(key, o); }
      o.t.set(e.x, y, e.y); o.g.userData.cell = { x: e.x, y: e.y }; }
    for (const [k, o] of ents) if (!keep.has(k)) { root.remove(o.g); ents.delete(k); }
  }
  // ---- caméra, interactions, boucle
  let yaw = 0.35, zoom = 1, dragging = false, raf = 0, t0 = performance.now(); const ray = new THREE.Raycaster(), v2 = new THREE.Vector2(), resetYaw = () => { yaw = 0; }; let lastYaw = NaN; addEventListener('ange:yaw-reset', resetYaw);
  const pick = e => { const b = r.domElement.getBoundingClientRect(); v2.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(v2, cam);
    const hit = ray.intersectObjects([...root.children, terr], true)[0]; if (!hit) return null; let o = hit.object; while (o && !o.userData.cell) o = o.parent; const c = o?.userData.cell ?? { x: Math.round(hit.point.x), y: Math.round(hit.point.z) };
    return Math.max(Math.abs(c.x - cur.x), Math.abs(c.y - cur.y)) <= see ? c : null; };
  const d = r.domElement; d.oncontextmenu = e => e.preventDefault(); d.onwheel = e => { zoom = THREE.MathUtils.clamp(zoom * (e.deltaY > 0 ? 1.08 : 0.92), 0.55, 1.7); };
  d.onpointerdown = e => { if (e.button === 2) dragging = true; }; addEventListener('pointerup', () => { dragging = false; });
  if (!orbit) { d.onpointermove = e => { if (dragging) { yaw -= e.movementX * 0.005; return; } const c = pick(e); put2(hov, c); onHover(c, e.clientX, e.clientY); }; d.onpointerleave = () => { put2(hov, null); onHover(null); };
    d.onclick = e => { const c = pick(e); put2(selc, c); if (c) onClick(c, e.clientX, e.clientY); }; }
  const resize = () => { r.setSize(W(), H()); comp.setSize(W(), H()); cam.aspect = W() / H(); cam.updateProjectionMatrix(); }; addEventListener('resize', resize);
  function frame(now) {
    raf = requestAnimationFrame(frame); const dt = Math.min(0.05, (now - t0) / 1000); t0 = now; const tt = now / 1000; if (orbit) yaw += dt * 0.06; else if (yaw !== lastYaw) { lastYaw = yaw; dispatchEvent(new CustomEvent('ange:yaw', { detail: yaw })); }   // la boussole suit la rotation
    for (const o of ents.values()) { const dx = o.t.x - o.g.position.x, dz = o.t.z - o.g.position.z; if (dx * dx + dz * dz > 1e-4) o.g.rotation.y = THREE.MathUtils.lerp(o.g.rotation.y, Math.atan2(dx, dz), 0.2); o.g.position.lerp(o.t, 1 - Math.exp(-dt * 8)); o.g.userData.tick?.(tt); }
    focus.lerp(new THREE.Vector3(cur.x, heightAt(cur.x, cur.y), cur.y), 1 - Math.exp(-dt * 6)); const dist = (see * 0.85 + 6) * zoom, pit = 0.92;
    cam.position.set(focus.x + Math.sin(yaw) * Math.cos(pit) * dist, focus.y + Math.sin(pit) * dist, focus.z + Math.cos(yaw) * Math.cos(pit) * dist); cam.lookAt(focus);
    sun.position.copy(focus).addScaledVector(sun.userData.dir ?? new THREE.Vector3(0.5, 1, 0.3), 30); sun.target.position.copy(focus); const sc = see + 4; Object.assign(sun.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc, near: 1, far: 80 }); sun.shadow.camera.updateProjectionMatrix();
    const wp = wgeo.attributes.position, S = R * 2 + 8; for (let i = 0; i < wp.count; i++) { const x = wp.getX(i) * S + cur.x, z = wp.getZ(i) * S + cur.y; wp.setY(i, Math.sin(x * 1.3 + tt * 1.1) * 0.018 + Math.cos(z * 1.7 + tt * 0.9) * 0.014); } wp.needsUpdate = true; wgeo.computeVertexNormals();
    comp.render();
  }
  applyTime(); const clock = setInterval(applyTime, 60000); raf = requestAnimationFrame(frame);
  return {
    update(me, entities) { world = me.actor.pos.map_id ?? 1; setWorld(world); me = { ...me, pos: me.actor.pos, see_eff: me.actor.see }; const s = me.see_eff; if (s !== see || !geo) allocate(s); const moved = !last || me.pos.x !== cur.x || me.pos.y !== cur.y || s !== last.s;
      if (moved) { cur.x = me.pos.x; cur.y = me.pos.y; if (!last) focus.set(cur.x, heightAt(cur.x, cur.y), cur.y); last = { s }; buildTerrain(); buildGrid(); placeCardinals(); }
      syncEntities(me, entities); buildVegetation(new Set(entities.map(e => e.x + ',' + e.y))); },
    setSelected: c => put2(selc, c),
    dispose() { cancelAnimationFrame(raf); clearInterval(clock); removeEventListener('resize', resize); removeEventListener('ange:yaw-reset', resetYaw); comp.dispose(); r.dispose(); env?.dispose(); d.remove(); },
  };
}
