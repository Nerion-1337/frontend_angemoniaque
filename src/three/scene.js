import * as THREE from 'three'; import { terrain } from '../lib/terrain'; import { COLORS } from '../lib/energy';
const RACE = { human: 0xe8c07a, demon: 0xd04040, angel: 0xf4f4ff }, mats = {}; const mat = c => mats[c] ??= new THREE.MeshStandardMaterial({ color: c });
/** Caméra asservie au personnage : seules les cases à `see` autour de lui sont rendues, la carte commune est observée localement. */
export function createScene(el, { onClick, onHover }) {
  const r = new THREE.WebGLRenderer({ antialias: true }); r.setSize(el.clientWidth, el.clientHeight); el.appendChild(r.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x14141c); scene.add(new THREE.AmbientLight(0xffffff, 0.7)); const sun = new THREE.DirectionalLight(0xffffff, 0.8); sun.position.set(5, 10, 5); scene.add(sun);
  const cam = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 200), world = new THREE.Group(); scene.add(world);
  const box = new THREE.BoxGeometry(0.96, 0.1, 0.96), cone = new THREE.ConeGeometry(0.28, 0.8, 8), tall = new THREE.BoxGeometry(0.7, 1.2, 0.7), cap = new THREE.CapsuleGeometry(0.25, 0.5);
  function render(me, entities) {
    world.clear(); const s = me.see_eff, { x: cx, y: cy } = me.pos;
    for (let dx = -s; dx <= s; dx++) for (let dy = -s; dy <= s; dy++) {
      const t = terrain(cx + dx, cy + dy); const m = new THREE.Mesh(box, mat(COLORS[t.kind])); m.position.set(dx, t.kind === 'mountain' ? 0.25 : t.kind === 'lake' ? -0.08 : 0, dy); m.scale.y = t.kind === 'mountain' ? 5 : 1; m.userData = { x: cx + dx, y: cy + dy }; world.add(m);
    }
    for (const e of entities) { const dx = e.x - cx, dy = e.y - cy; if (Math.max(Math.abs(dx), Math.abs(dy)) > s) continue;
      const isMe = e.char_id === me.id; const m = new THREE.Mesh(e.kind === 'monster' ? cone : e.kind === 'building' ? tall : cap,
        mat(e.kind === 'monster' ? 0x8a1f1f : e.kind === 'building' ? (e.building_kind === 'door' ? 0xb070ff : 0xc9a24a) : isMe ? 0xffcc33 : RACE[e.race] ?? 0xffffff));
      m.position.set(dx, e.kind === 'monster' ? 0.5 : 0.55, dy); if (e.kind === 'monster') m.scale.setScalar(1.6); m.userData = { x: e.x, y: e.y }; world.add(m); }
    cam.position.set(0, s + 3, s + 3); cam.lookAt(0, 0, 0); r.render(scene, cam);
  }
  const ray = new THREE.Raycaster(), pick = e => { const b = r.domElement.getBoundingClientRect(); ray.setFromCamera(new THREE.Vector2(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1), cam);
    const h = ray.intersectObjects(world.children)[0]; return h ? { x: h.object.userData.x, y: h.object.userData.y } : null; };
  r.domElement.onclick = e => { const t = pick(e); if (t) onClick(t, e.clientX, e.clientY); };
  r.domElement.onmousemove = e => onHover(pick(e), e.clientX, e.clientY); r.domElement.onmouseleave = () => onHover(null);
  return { render, dispose: () => { r.dispose(); r.domElement.remove(); } };
}
