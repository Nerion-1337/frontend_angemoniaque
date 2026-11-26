import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js'; import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'; import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'; import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'; import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { noiseAt, terrain, setWorld, FEATURES } from '../lib/terrain'; import { groundColor, hash } from '../lib/relief'; import { levelAt, LEVEL_H, WATER_Y, FLY_Y, standY } from '../lib/levels'; import { makeEntity } from './entities'; import { RESOURCES2 } from '../lib/resources2'; import { RESOURCES3 } from '../lib/resources3'; import { waterTint } from '../lib/world2';
/** Bruit doux et tuilable (nuages) : somme d'octaves d'un bruit de valeurs lissé. */
const cloudTex = () => { const n = 128, c = document.createElement('canvas'); c.width = c.height = n; const g = c.getContext('2d'), im = g.createImageData(n, n), rnd = (x, y, p) => { const h = Math.sin(((x % p) + p) % p * 127.1 + (((y % p) + p) % p) * 311.7) * 43758.5453; return h - Math.floor(h); };
  const vn = (x, y, p) => { const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy), a = rnd(xi, yi, p), b = rnd(xi + 1, yi, p), cc = rnd(xi, yi + 1, p), d = rnd(xi + 1, yi + 1, p); return a + (b - a) * u + (cc - a) * v + (a - b - cc + d) * u * v; };
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { let s = 0, amp = 0.55, f = 4; for (let o = 0; o < 4; o++) { s += vn(x / n * f, y / n * f, f) * amp; amp *= 0.5; f *= 2; } const v = Math.max(0, Math.min(255, s * 255)); im.data.set([v, v, v, 255], (y * n + x) * 4); }
  g.putImageData(im, 0, 0); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; };
const noiseTex = () => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); g.fillStyle = '#d8d8d8'; g.fillRect(0, 0, 256, 256);
  for (const [n, a] of [[8, .3], [32, .25], [128, .15], [256, .1]]) { const s = document.createElement('canvas'); s.width = s.height = n; const sg = s.getContext('2d'), id = sg.createImageData(n, n);
    for (let i = 0; i < n * n; i++) { const v = Math.random() * 255; id.data.set([v, v, v, 255], i * 4); } sg.putImageData(id, 0, 0); g.globalAlpha = a; g.drawImage(s, 0, 0, 256, 256); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

/** Scène réaliste : terrain en colonnes de cubes (niveaux −4 à +5, volants à +6, ciel à +8, lib/levels), ciel physique (cycle jour/nuit sur l'heure locale), ombres, eau, végétation instanciée,
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
  // Étalonnage final (après la sortie sRGB) : vignette douce, léger contraste et saturation.
  const grade = new ShaderPass({ uniforms: { tDiffuse: { value: null }, vig: { value: 0.32 }, sat: { value: 1.08 }, con: { value: 1.05 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D tDiffuse; uniform float vig, sat, con; varying vec2 vUv;
      void main(){ vec4 c = texture2D(tDiffuse, vUv); float l = dot(c.rgb, vec3(0.299, 0.587, 0.114)); c.rgb = mix(vec3(l), c.rgb, sat); c.rgb = (c.rgb - 0.5) * con + 0.5;
        vec2 d = vUv - 0.5; c.rgb *= 1.0 - vig * smoothstep(0.35, 0.85, length(d * vec2(1.25, 1.0))); gl_FragColor = c; }` });
  comp.addPass(grade);

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
  let R = 0, geo, terr, last = null; const tex = noiseTex(), tmat = new THREE.MeshStandardMaterial({ vertexColors: true, map: tex, roughness: 0.95, metalness: 0 });
  // Ombres de nuages qui défilent sur le sol (texture de bruit projetée en coordonnées monde, assombrit la couleur diffuse).
  const cloudU = { cloudMap: { value: cloudTex() }, cloudT: { value: 0 }, cloudK: { value: 0.26 } };
  tmat.onBeforeCompile = sh => { Object.assign(sh.uniforms, cloudU);
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWp;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWp = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWp; uniform sampler2D cloudMap; uniform float cloudT, cloudK;')
      .replace('#include <map_fragment>', '#include <map_fragment>\nfloat cl = texture2D(cloudMap, vWp.xz * 0.022 + vec2(cloudT * 0.006, cloudT * 0.0035)).r; diffuseColor.rgb *= 1.0 - cloudK * smoothstep(0.45, 0.8, cl);'); };
  const wgeo = new THREE.PlaneGeometry(1, 1, 56, 56).rotateX(-Math.PI / 2), water = new THREE.Mesh(wgeo, new THREE.MeshPhysicalMaterial({ color: 0xffffff, vertexColors: true, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.6, clearcoat: 1, envMapIntensity: 1.3 })); water.receiveShadow = true; wgeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(wgeo.attributes.position.count * 3).fill(1), 3)); scene.add(water);
  const IM = (g, m, n) => { const o = new THREE.InstancedMesh(g, m, n); o.castShadow = o.receiveShadow = true; o.frustumCulled = false; o.count = 0; scene.add(o); return o; };      // frustumCulled=false : la sphère englobante initiale devient fausse dès qu'on se déplace
  const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, ...o });
  const trunk = IM(new THREE.CylinderGeometry(0.05, 0.085, 0.55, 6).translate(0, 0.27, 0), std(0x4a3322, { roughness: 1 }), 6000), pine1 = IM(new THREE.ConeGeometry(0.34, 0.8, 8).translate(0, 0.85, 0), std(0x1d4a22), 6000), pine2 = IM(new THREE.ConeGeometry(0.24, 0.6, 8).translate(0, 1.3, 0), std(0x2a5d28), 6000);
  const oak = IM(new THREE.IcosahedronGeometry(0.34, 1).translate(0, 0.78, 0), std(0x3f7a2a, { flatShading: true }), 3000), grass = IM(new THREE.ConeGeometry(0.045, 0.24, 4).translate(0, 0.12, 0), std(0x5f9a35), 9000), boulders = IM(new THREE.DodecahedronGeometry(0.3, 1), std(0x77736d, { flatShading: true, map: tex }), 3000);
  const spires = IM(new THREE.ConeGeometry(0.34, 1, 6).translate(0, 0.5, 0), std(0x6e6a68, { flatShading: true, map: tex }), 3000);
  // minerais (un maillage émissif par type), flore des ressources (plantes) et teintes d'arbres par essence
  let world = 1;
  const ORE_FX = { adamantine: [0x8fa4b8, 0x2b4a73], mithril: [0xcfe8ff, 0x5aa0ff], uru: [0xd9a04a, 0xb86a10], ebonite: [0x2b2733, 0x7a3aba], verre_dragon: [0x140606, 0xff3a10], cristal_givre: [0xd8f4ff, 0x6fd8ff], prisme_ether: [0xe8c4ff, 0xa060ff] };
  for (const r of [...RESOURCES2, ...RESOURCES3]) if (r.look?.k === 'ore') ORE_FX[r.id] = [r.look.c, r.look.e];
  const oreGeo = new THREE.OctahedronGeometry(0.12).scale(1, 1.9, 1).translate(0, 0.12, 0), ores = {};
  for (const k in ORE_FX) ores[k] = IM(oreGeo, std(ORE_FX[k][0], { emissive: ORE_FX[k][1], emissiveIntensity: 1.7, roughness: 0.25 }), 1500);
  const FLORA_FX = { pissenlit_tempete: [0xf2e04a, 0], tresle_six_feuilles: [0x5fd06a, 1], lavande_crepusculaire: [0x8a63d8, 2], chardon_sang: [0xc02a3a, 2], rose_sables: [0xe8c9a0, 1], nenuphar_spectres: [0x7fe0c0, 1], gingembre_marees: [0xe0a050, 2] };
  for (const r of [...RESOURCES2, ...RESOURCES3]) if (r.look?.k === 'plant') FLORA_FX[r.id] = [r.look.c, r.look.shape];
  const FGEO = [new THREE.SphereGeometry(0.07, 8, 6).translate(0, 0.22, 0), new THREE.CylinderGeometry(0.16, 0.16, 0.02, 8).translate(0, 0.02, 0), new THREE.ConeGeometry(0.05, 0.3, 5).translate(0, 0.15, 0)], flora = {};
  for (const k in FLORA_FX) flora[k] = IM(FGEO[FLORA_FX[k][1]], std(FLORA_FX[k][0], { emissive: FLORA_FX[k][0], emissiveIntensity: 0.25 }), 6000);
  [trunk, pine1, pine2, oak, spires, boulders, grass].forEach(m => m.material.color.set(0xffffff));      // teintes appliquées par instance
  const ALL = [trunk, pine1, pine2, oak, grass, boulders, spires, ...Object.values(ores), ...Object.values(flora)];
  // Yggdrasil : l'arbre unique de 8 cases (4x2), dessiné une seule fois
  const ygg = new THREE.Group(); {
    const bark = std(0x5a4128), leaf = std(0x4fae3a, { emissive: 0x1d5a18, emissiveIntensity: 0.5 }), part = (g, m, x, y, z) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; ygg.add(o); };
    part(new THREE.CylinderGeometry(0.9, 1.5, 7, 14), bark, 0, 3.5, 0);
    for (const [x, y, z, r] of [[0, 8.4, 0, 3.6], [-2.2, 7.4, 0.6, 2.6], [2.4, 7.6, -0.4, 2.8], [0.4, 10.3, 0.2, 2.4]]) part(new THREE.IcosahedronGeometry(r, 1), leaf, x, y, z);
    ygg.visible = false; scene.add(ygg);
  }
  let curFly = false; const cur = { x: 0, y: 0 }, focus = new THREE.Vector3(), tmpC = new THREE.Color(), dum = new THREE.Object3D(); let see = 5;
  function allocate(s) { see = s; R = Math.min(s + 3, 22); if (!terr) { geo = new THREE.BufferGeometry(); terr = new THREE.Mesh(geo, tmat); terr.receiveShadow = true; terr.castShadow = true; scene.add(terr); } water.scale.set(R * 2 + 8, 1, R * 2 + 8); }
  const TOP = (x, y) => levelAt(x, y, world) * LEVEL_H, SY = (x, y) => standY(x, y, world);   // dessus de colonne ; position au sol (surface de l'eau)
  const ss = (a, b, x) => THREE.MathUtils.smoothstep(x, a, b);
  function tintWater() { const wp = wgeo.attributes.position, S = R * 2 + 8, col = wgeo.attributes.color; for (let i = 0; i < wp.count; i++) { tmpC.set(waterTint(world, wp.getX(i) * S + cur.x)); col.setXYZ(i, tmpC.r, tmpC.g, tmpC.b); } col.needsUpdate = true; }   // eau teintée selon la moitié (démons / anges)
  /** Terrain en cubes : dessus de chaque colonne + faces latérales découpées par niveau (un cube visible par niveau) là où le voisin est plus bas. */
  const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]], topC = new THREE.Color(), sideC = new THREE.Color(), bevC = new THREE.Color();
  function buildTerrain() {
    const P = [], Nn = [], Cc = [], U = [];
    const quad = (a, b, c, d, n, col) => { for (const v of [a, b, c, a, c, d]) { P.push(v[0], v[1], v[2]); Nn.push(n[0], n[1], n[2]); Cc.push(col.r, col.g, col.b); U.push((v[0] + v[1]) * 0.35, (v[2] + v[1] * 0.6) * 0.35); } };
    for (let dx = -R; dx <= R; dx++) for (let dy = -R; dy <= R; dy++) {
      const x = cur.x + dx, z = cur.y + dy, l = levelAt(x, z, world), h = l * LEVEL_H, fade = ss(see + 0.4, see + 2.4, Math.max(Math.abs(dx), Math.abs(dy)));
      groundColor(x, z, l * 0.6, topC); topC.multiplyScalar(0.965 + hash(x * 7, z * 13) * 0.07).lerp(fog.color, fade);   // léger damier naturel
      // Dessus biseauté : plateau central + quatre biseaux légèrement plus sombres (remplace un quadrillage marqué)
      const b = 0.06, e = 0.5, i = e - b, hb = h - 0.035; bevC.copy(topC).multiplyScalar(0.8);
      quad([x - i, h, z - i], [x - i, h, z + i], [x + i, h, z + i], [x + i, h, z - i], [0, 1, 0], topC);
      quad([x - e, hb, z + e], [x + e, hb, z + e], [x + i, h, z + i], [x - i, h, z + i], [0, 0.85, 0.53], bevC);
      quad([x + e, hb, z - e], [x - e, hb, z - e], [x - i, h, z - i], [x + i, h, z - i], [0, 0.85, -0.53], bevC);
      quad([x + e, hb, z + e], [x + e, hb, z - e], [x + i, h, z - i], [x + i, h, z + i], [0.53, 0.85, 0], bevC);
      quad([x - e, hb, z - e], [x - e, hb, z + e], [x - i, h, z + i], [x - i, h, z - i], [-0.53, 0.85, 0], bevC);
      for (const [sx, sz] of SIDES) {
        const nl = levelAt(x + sx, z + sz, world); if (nl >= l) continue;
        const fx = x + sx * 0.5, fz = z + sz * 0.5, tx = sz * 0.5, tz = -sx * 0.5;
        for (let k = l; k > nl; k--) {
          const y1 = k * LEVEL_H - (k === l ? 0.035 : 0), y0 = (k - 1) * LEVEL_H; sideC.copy(topC).multiplyScalar((sx ? 0.7 : 0.82) * (k & 1 ? 1 : 0.9) * (k <= 0 ? 0.8 : 1));   // un cube par niveau (teinte alternée)
          quad([fx + tx, y0, fz + tz], [fx + tx, y1, fz + tz], [fx - tx, y1, fz - tz], [fx - tx, y0, fz - tz], [sx, 0, sz], sideC);
        }
      }
    }
    geo.dispose(); geo = new THREE.BufferGeometry(); terr.geometry = geo;
    geo.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); geo.setAttribute('normal', new THREE.Float32BufferAttribute(Nn, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(Cc, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
    geo.computeBoundingSphere(); geo.computeBoundingBox(); water.position.set(cur.x, WATER_Y, cur.y); tintWater();
  }
  const WOOD = { lorien: [0xe0b93d, 0x7a5a30], shinju: [0xf2a0c0, 0x4a2f28], adam: [0xa84a2a, 0x3a2418], weirwood: [0xb3262e, 0xf0ece4] }, GREEN = [0x2f6d2a, 0x4a3322], ROCK = { mountain: 0x77736d, snow: 0xeef4fb, ether: 0x3a3448, volcano: 0x241512 };
  for (const r of [...RESOURCES2, ...RESOURCES3]) if (r.look?.k === 'tree') WOOD[r.id] = [r.look.leaf, r.look.bark, !!r.look.bare];
  function buildVegetation(occ) {
    const cnt = new Map(), put = (m, x, y, z, sx, ry, sy = sx, c) => { const i = cnt.get(m) ?? 0; if (i >= m.instanceMatrix.count) return; cnt.set(m, i + 1); dum.position.set(x, y, z); dum.rotation.set(0, ry, 0); dum.scale.set(sx, sy, sx); dum.updateMatrix(); m.setMatrixAt(i, dum.matrix); if (c !== undefined) m.setColorAt(i, tmpC.set(c)); };
    for (let dx = -see - 1; dx <= see + 1; dx++) for (let dy = -see - 1; dy <= see + 1; dy++) {
      const cx = cur.x + dx, cy = cur.y + dy; if (occ.has(cx + ',' + cy)) continue;       // une case occupée : ce qui l'occupe prime
      const fade = 1 - ss(see - 0.5, see + 1.2, Math.max(Math.abs(dx), Math.abs(dy))); if (fade <= 0.05) continue;
      const t = terrain(cx, cy), k = t.kind, id = t.resourceId, fl = flora[id], jit = (i, j) => (hash(cx * 3 + i, cy * 5 + j) - 0.5) * 0.86, top = TOP(cx, cy);   // tout pousse sur le dessus de la colonne
      if (k === 'deep') continue;
      if (k === 'shallow') { if (fl && hash(cx, cy * 3) < 0.7) { const x = cx + jit(1, 1), z = cy + jit(2, 2); put(fl, x, WATER_Y + 0.03, z, fade, hash(x, z) * 6); } continue; }
      if (fl) for (let i = 0; i < 2; i++) { const x = cx + jit(i, 6), z = cy + jit(i, 7); put(fl, x, top, z, (0.8 + hash(x, z) * 0.6) * fade, hash(z, x) * 6); }   // plante récoltable visible sur la case
      if (k === 'forest') { if (id === 'yggdrasil') continue;       // l'arbre unique est dessiné à part
        const [leaf, bark, bare] = WOOD[id] ?? GREEN;
        for (let i = 0; i < 3; i++) { const x = cx + jit(i, 1), z = cy + jit(i, 2), h = top, sc = (0.45 + hash(cx + i, cy * 7) * 0.5) * fade;   // arbres : de +1 à +3 niveaux
          put(trunk, x, h, z, sc, hash(x, z) * 6, sc, bark); if (bare) put(pine2, x, h - 0.25 * sc, z, sc * 0.5, 0, sc * 0.8, leaf); else if (hash(cx + i * 9, cy) < 0.7) { put(pine1, x, h, z, sc, 0, sc, leaf); put(pine2, x, h, z, sc, 0, sc, leaf); } else put(oak, x, h, z, sc * 1.1, hash(z, x) * 6, sc * 1.1, leaf); }
        continue; }
      if (k === 'plain') { if (t.grass !== false) for (let i = 0; i < 3; i++) { const x = cx + jit(i, 3), z = cy + jit(i, 4); put(grass, x, top, z, (0.7 + hash(x, z) * 0.8) * fade, hash(z, x) * 6, (0.8 + hash(x, z * 2)) * fade, t.grass ?? 0x5f9a35); }
        if (t.lone !== false && hash(cx, cy) < 0.07) { const [ll, lb] = t.lone ?? GREEN; const x = cx + jit(0, 1), z = cy + jit(0, 2), h = top, sc = (0.7 + hash(cx, cy * 7) * 0.8) * fade; put(trunk, x, h, z, sc, hash(x, z) * 6, sc, lb); put(pine1, x, h, z, sc, 0, sc, ll); put(pine2, x, h, z, sc, 0, sc, ll); }
        continue; }
      if (k === 'arid') { if (hash(cx + 4, cy) < 0.08) { const x = cx + jit(0, 7), z = cy + jit(1, 8); put(boulders, x, top + 0.08, z, (0.4 + hash(x, z) * 0.5) * fade, hash(z, x) * 6, undefined, t.rock ?? 0xa08a62); }
        const ao = ores[id]; if (ao && hash(cx, cy * 2) < 0.6) { const x = cx + jit(1, 9) * 0.6, z = cy + jit(2, 9) * 0.6, h = top; for (let i = 0; i < 3; i++) put(ao, x + (i - 1) * 0.1, h, z + (i % 2 ? 0.08 : -0.08), (0.8 + hash(i, cx) * 0.8) * fade, i); }
        continue; }
      // massifs, glaces, pics d'éther, volcan : aiguilles + rochers teintés, et cristaux du minerai de la case
      const rock = t.rock ?? ROCK[k], hk = 0.8;   // le relief vient des cubes : aiguilles discrètes
      if (!t.flat && hash(cx + 5, cy) < 0.35) for (let i = 0; i < 1; i++) { const x = cx + jit(i, 5) * 0.8, z = cy + jit(i, 6) * 0.8, sc = (0.35 + hash(cx + i, cy + 3) * 0.3) * fade; put(spires, x, top - 0.1, z, sc, hash(x, z) * 6, sc * (1.1 + hash(z, x) * 1.3) * hk, rock); }
      if (hash(cx, cy + 9) < 0.5) { const x = cx + jit(0, 7), z = cy + jit(0, 8); put(boulders, x, top + 0.05, z, (0.3 + hash(x, z) * 0.4) * fade, hash(z, x) * 6, undefined, rock); }
      const ore = ores[id]; if (ore && hash(cx, cy * 2) < (k === 'volcano' ? 0.95 : 0.6)) { const x = cx + jit(1, 9) * 0.6, z = cy + jit(2, 9) * 0.6, h = top; for (let i = 0; i < 3; i++) put(ore, x + (i - 1) * 0.1, h, z + (i % 2 ? 0.08 : -0.08), (0.8 + hash(i, cx) * 0.8) * fade, i); }
    }
    for (const m of ALL) { m.count = cnt.get(m) ?? 0; m.visible = m.count > 0; m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    const g = FEATURES.ygg, gx = g.x + (g.w - 1) / 2, gz = g.y + (g.h - 1) / 2;
    ygg.visible = world === 1 && Math.max(Math.abs(gx - cur.x), Math.abs(gz - cur.y)) <= see + 5; if (ygg.visible) ygg.position.set(gx, SY(Math.round(gx), Math.round(gz)), gz);
  }
  // ---- quadrillage léger au sol (suit le relief, s'estompe aux limites de la vision)
  const grid = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })); grid.frustumCulled = false; grid.renderOrder = 2; scene.add(grid);
  function buildGrid() {   // contour du dessus de chaque case visible, à sa hauteur
    const pos = [], col = [], s = see;
    for (let dx = -s; dx <= s; dx++) for (let dy = -s; dy <= s; dy++) {
      const x = cur.x + dx, z = cur.y + dy, y = SY(x, z) + 0.02, k = 0.07 * (1 - ss(1.5, 4.5, Math.hypot(dx, dy)));   // quadrillage discret, seulement près du personnage
      if (k <= 0.002) continue;
      for (const [a, b, c, d] of [[-0.5, -0.5, 0.5, -0.5], [0.5, -0.5, 0.5, 0.5], [0.5, 0.5, -0.5, 0.5], [-0.5, 0.5, -0.5, -0.5]]) { pos.push(x + a, y, z + b, x + c, y, z + d); col.push(k, k, k * 0.92, k, k, k * 0.92); }
    }
    grid.geometry.dispose(); grid.geometry = new THREE.BufferGeometry(); grid.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); grid.geometry.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  }
  // ---- curseurs de case
  // Curseurs de case : voile dégradé + quatre coins lumineux (pulsation dans la boucle).
  const cursor = (col, op) => { const g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color: col, map: softTile(), transparent: true, opacity: op, depthTest: false, depthWrite: false }); g.add(new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.98).rotateX(-Math.PI / 2), m));
    const cm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.95, depthTest: false });
    for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) for (const along of [0, 1]) { const bar = new THREE.Mesh(new THREE.PlaneGeometry(along ? 0.05 : 0.26, along ? 0.26 : 0.05).rotateX(-Math.PI / 2), cm);
      bar.position.set(sx * (0.47 - (along ? 0.025 : 0.13)) , 0.001, sz * (0.47 - (along ? 0.13 : 0.025))); g.add(bar); }
    g.renderOrder = 10; g.visible = false; g.userData.op = op; scene.add(g); return g; };
  function softTile() { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 4, 32, 32, 46); gr.addColorStop(0, 'rgba(255,255,255,.25)'); gr.addColorStop(1, 'rgba(255,255,255,1)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); }
  const hov = cursor(0xf0d28a, 0.16), selc = cursor(0xffffff, 0.28), put2 = (g, c) => { g.visible = !!c; if (c) g.position.set(c.x, SY(c.x, c.y) + 0.06, c.y); };

  // ---- points cardinaux posés au sol sur le pourtour de la vision : ils tournent avec la carte (Nord = haut de la grille)
  const CARD = [['Nord', 0, -1, '#f0d28a'], ['Est', 1, 0, '#ffffff'], ['Sud', 0, 1, '#ffffff'], ['Ouest', -1, 0, '#ffffff']].map(([txt, dx, dz, col]) => {
    const c = document.createElement('canvas'); c.width = 256; c.height = 96; const g = c.getContext('2d'); g.font = '700 54px Cinzel, Georgia, serif'; g.textAlign = 'center'; g.lineWidth = 9; g.strokeStyle = 'rgba(8,8,16,.9)'; g.strokeText(txt, 128, 66); g.fillStyle = col; g.fillText(txt, 128, 66);
    const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, depthTest: false, transparent: true, opacity: 0.92, fog: false })); s.scale.set(2.8, 1.05, 1); s.renderOrder = 15; scene.add(s); return { s, dx, dz }; });
  const placeCardinals = () => { for (const { s, dx, dz } of CARD) { const x = cur.x + dx * (see + 1.4), z = cur.y + dz * (see + 1.4); s.position.set(x, SY(Math.round(x), Math.round(z)) + 1.1, z); } };
  // ---- particules d'ambiance autour du personnage : pollen clair le jour, lucioles chaudes la nuit
  const NP = 140, pg = new THREE.BufferGeometry(), pp = new Float32Array(NP * 3), seeds = Float32Array.from({ length: NP * 3 }, () => Math.random());
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const dot = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d'), gr = x.createRadialGradient(16, 16, 0, 16, 16, 16); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); })();
  const motes = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.09, map: dot, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0xfff4d0, opacity: 0.55, sizeAttenuation: true })); motes.frustumCulled = false; scene.add(motes);
  function animMotes(tt) { const day = sun.intensity > 2.2, rad = see + 1; motes.material.color.set(day ? 0xfff4d0 : 0xffc860); motes.material.size = day ? 0.07 : 0.12; motes.material.opacity = day ? 0.4 : 0.85;
    for (let i = 0; i < NP; i++) { const a = seeds[i * 3], b = seeds[i * 3 + 1], c = seeds[i * 3 + 2], x = cur.x + (a - 0.5) * 2 * rad + Math.sin(tt * 0.3 + c * 20) * 0.6, z = cur.y + (b - 0.5) * 2 * rad + Math.cos(tt * 0.25 + a * 20) * 0.6;
      pp[i * 3] = x; pp[i * 3 + 1] = SY(Math.round(x), Math.round(z)) + 0.3 + ((c + tt * 0.04) % 1) * 1.6 + Math.sin(tt * 1.3 + a * 30) * 0.1; pp[i * 3 + 2] = z; }
    pg.attributes.position.needsUpdate = true; }
  // ---- entités (diff par clé, déplacement interpolé)
  const ents = new Map(), root = new THREE.Group(); scene.add(root);
  function syncEntities(me, list) {
    const keep = new Set();
    for (const e of list) { if (Math.max(Math.abs(e.x - me.pos.x), Math.abs(e.y - me.pos.y)) > see) continue; const key = `${e.kind}:${e.char_id ?? e.monster_id ?? e.summon_id ?? e.building_id ?? e.x + ',' + e.y}:${e.mount_name ?? ''}:${e.rank ?? ''}`; keep.add(key);
      const y = e.flying ? FLY_Y : SY(e.x, e.y); let o = ents.get(key); if (!o) { o = { g: makeEntity(e, e.char_id === me.id), t: new THREE.Vector3(e.x, y, e.y) }; o.g.position.copy(o.t); root.add(o.g); ents.set(key, o); }
      o.t.set(e.x, y, e.y); o.g.userData.cell = { x: e.x, y: e.y };
      if (e.flying) {   // volant au niveau +6 : fil et anneau vers la case survolée
        if (!o.tether) { o.tether = new THREE.Group(); const m = new THREE.MeshBasicMaterial({ color: 0xbfe3ff, transparent: true, opacity: 0.35, depthWrite: false });
          o.tether.add(new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1, 6).translate(0, -0.5, 0), m), new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 28).rotateX(-Math.PI / 2), m)); o.g.add(o.tether); }
        const drop = y - SY(e.x, e.y) - 0.02; o.tether.children[0].scale.y = drop; o.tether.children[1].position.y = -drop; } }
    for (const [k, o] of ents) if (!keep.has(k)) { root.remove(o.g); ents.delete(k); }
  }
  // ---- caméra, interactions, boucle
  let yaw = 0.35, zoom = 1, dragging = false, raf = 0, t0 = performance.now(); const ray = new THREE.Raycaster(), v2 = new THREE.Vector2(), resetYaw = () => { yaw = 0; }; let lastYaw = NaN; addEventListener('ange:yaw-reset', resetYaw);
  const pick = e => { const b = r.domElement.getBoundingClientRect(); v2.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(v2, cam);
    const hit = ray.intersectObjects([...root.children, terr], true)[0]; if (!hit) return null; let o = hit.object; while (o && !o.userData.cell) o = o.parent; const n = hit.face?.normal, inside = n && n.y < 0.5 ? hit.point.clone().addScaledVector(n, -0.01) : hit.point, c = o?.userData.cell ?? { x: Math.round(inside.x), y: Math.round(inside.z) };   // face latérale : case de la colonne
    return Math.max(Math.abs(c.x - cur.x), Math.abs(c.y - cur.y)) <= see ? c : null; };
  const d = r.domElement; d.oncontextmenu = e => e.preventDefault(); d.onwheel = e => { zoom = THREE.MathUtils.clamp(zoom * (e.deltaY > 0 ? 1.08 : 0.92), 0.55, 1.7); };
  d.onpointerdown = e => { if (e.button === 2) dragging = true; }; addEventListener('pointerup', () => { dragging = false; });
  if (!orbit) { d.onpointermove = e => { if (dragging) { yaw -= e.movementX * 0.005; return; } const c = pick(e); put2(hov, c); onHover(c, e.clientX, e.clientY); }; d.onpointerleave = () => { put2(hov, null); onHover(null); };
    d.onclick = e => { const c = pick(e); put2(selc, c); if (c) onClick(c, e.clientX, e.clientY); }; }
  const resize = () => { r.setSize(W(), H()); comp.setSize(W(), H()); cam.aspect = W() / H(); cam.updateProjectionMatrix(); }; addEventListener('resize', resize);
  function frame(now) {
    raf = requestAnimationFrame(frame); const dt = Math.min(0.05, (now - t0) / 1000); t0 = now; const tt = now / 1000; if (orbit) yaw += dt * 0.06; else if (yaw !== lastYaw) { lastYaw = yaw; dispatchEvent(new CustomEvent('ange:yaw', { detail: yaw })); }   // la boussole suit la rotation
    for (const o of ents.values()) { const dx = o.t.x - o.g.position.x, dz = o.t.z - o.g.position.z; if (dx * dx + dz * dz > 1e-4) o.g.rotation.y = THREE.MathUtils.lerp(o.g.rotation.y, Math.atan2(dx, dz), 0.2); o.g.position.lerp(o.t, 1 - Math.exp(-dt * 8)); o.g.userData.tick?.(tt); }
    focus.lerp(new THREE.Vector3(cur.x, curFly ? FLY_Y : SY(cur.x, cur.y), cur.y), 1 - Math.exp(-dt * 6)); const dist = (see * 0.85 + 6) * zoom, pit = 0.92;
    cam.position.set(focus.x + Math.sin(yaw) * Math.cos(pit) * dist, focus.y + Math.sin(pit) * dist, focus.z + Math.cos(yaw) * Math.cos(pit) * dist); cam.lookAt(focus);
    sun.position.copy(focus).addScaledVector(sun.userData.dir ?? new THREE.Vector3(0.5, 1, 0.3), 30); sun.target.position.copy(focus); const sc = see + 4; Object.assign(sun.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc, near: 1, far: 80 }); sun.shadow.camera.updateProjectionMatrix();
    const wp = wgeo.attributes.position, S = R * 2 + 8; for (let i = 0; i < wp.count; i++) { const x = wp.getX(i) * S + cur.x, z = wp.getZ(i) * S + cur.y; wp.setY(i, Math.sin(x * 1.3 + tt * 1.1) * 0.018 + Math.cos(z * 1.7 + tt * 0.9) * 0.014); } wp.needsUpdate = true; wgeo.computeVertexNormals();
    cloudU.cloudT.value = tt; animMotes(tt); for (const c of [hov, selc]) if (c.visible) c.children[0].material.opacity = c.userData.op * (0.75 + Math.sin(tt * 3.2) * 0.25);
    comp.render();
  }
  applyTime(); const clock = setInterval(applyTime, 60000); raf = requestAnimationFrame(frame);
  return {
    update(me, entities) { const w0 = world; world = me.actor.pos.map_id ?? 1; setWorld(world); curFly = me.actor.kind === 'hero' ? !!me.mount?.flying : !!me.actor.loco?.flying; /* caméra au niveau des volants (héros sur monture volante ou créature volante contrôlée) */ if (w0 !== world) last = null; me = { ...me, pos: me.actor.pos, see_eff: me.actor.see }; const s = me.see_eff; if (s !== see || !geo) allocate(s); const moved = !last || me.pos.x !== cur.x || me.pos.y !== cur.y || s !== last.s;
      if (moved) { cur.x = me.pos.x; cur.y = me.pos.y; if (!last) focus.set(cur.x, SY(cur.x, cur.y), cur.y); last = { s }; buildTerrain(); buildGrid(); placeCardinals(); }
      syncEntities(me, entities); buildVegetation(new Set(entities.map(e => e.x + ',' + e.y))); },
    setSelected: c => put2(selc, c),
    dispose() { cancelAnimationFrame(raf); clearInterval(clock); removeEventListener('resize', resize); removeEventListener('ange:yaw-reset', resetYaw); comp.dispose(); r.dispose(); env?.dispose(); d.remove(); },
  };
}
