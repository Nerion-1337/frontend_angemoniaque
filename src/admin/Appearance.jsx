// Admin « Monstres » › Apparence : design 3D (catalogue de 85 créatures, aperçu animé) et icône (médaillon + initiales).
// Vide = automatique : design reconnu par le nom, sinon tiré dans le milieu ; icône du design.
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CREATURES, HABITATS, designFor } from '../lib/creatureCatalog.js'; import { ICONS } from '../lib/creatureIcons.js';
import { buildCreature } from '../three/creatures.js'; import CreatureIcon, { Glyph } from '../components/CreatureIcon.jsx';
/** Aperçu 3D tournant d'un design. */
export function Preview({ design, size = 220 }) {
  const el = useRef();
  useEffect(() => {
    if (!design) return; const r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(size, size); r.toneMapping = THREE.ACESFilmicToneMapping; el.current.appendChild(r.domElement);
    const sc = new THREE.Scene(); sc.add(new THREE.HemisphereLight(0xdde8ff, 0x3a3040, 1.5)); const dl = new THREE.DirectionalLight(0xffffff, 2.4); dl.position.set(3, 6, 5); sc.add(dl);
    const g = buildCreature(design), box = new THREE.Box3().setFromObject(g), c = box.getCenter(new THREE.Vector3()), R = box.getSize(new THREE.Vector3()).length();
    const piv = new THREE.Group(); g.position.sub(new THREE.Vector3(c.x, 0, c.z)); piv.add(g); sc.add(piv);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(R * 0.55, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 })); sc.add(disc);
    const cam = new THREE.PerspectiveCamera(30, 1, 0.05, 100); cam.position.set(0, c.y + R * 0.6, R * 2.15); cam.lookAt(0, c.y, 0);
    let raf, t0 = performance.now(); const loop = () => { const t = (performance.now() - t0) / 1000; piv.rotation.y = t * 0.5; g.userData.tick?.(t); r.render(sc, cam); raf = requestAnimationFrame(loop); }; loop();
    return () => { cancelAnimationFrame(raf); r.dispose(); r.domElement.remove(); };
  }, [design?.key, size]);
  return <div className="lookpreview" ref={el} style={{ width: size, height: size }} />;
}
export default function Appearance({ draft, set }) {
  const [hab, setHab] = useState(() => designFor({ model: draft?.model, name: draft?.name, loco: draft?.locomotion }).hab), [iq, setIq] = useState('');
  const D = designFor({ model: draft?.model, name: draft?.name, loco: draft?.locomotion }), auto = !draft?.model;
  const icons = ICONS.filter(i => !iq || i.label.toLowerCase().includes(iq.toLowerCase()));
  return <div className="look">
    <div className="lookhead"><Preview design={D} />
      <div className="lookinfo"><b>{D.name}</b><small>{auto ? 'Automatique (d’après le nom ou le milieu)' : 'Design choisi'} · {HABITATS.find(h => h[0] === D.hab)?.[1]}</small>
        <div className="lookicon"><CreatureIcon c={{ ...draft, model: D.key }} size={56} /><small>Icône affichée pour une invocation, montée ou non (initiales du nom).</small></div>
        {!auto && <button className="sm" onClick={() => set('model', '')}>Revenir à l’automatique</button>}</div></div>
    <div className="seg2">{HABITATS.map(([k, l]) => <button key={k} type="button" className={`chip${hab === k ? ' on' : ''}`} onClick={() => setHab(k)}>{l} ({CREATURES.filter(c => c.hab === k).length})</button>)}</div>
    <div className="lookgrid">{CREATURES.filter(c => c.hab === hab).map(c => <button key={c.key} type="button" className={`lookcard${draft?.model === c.key ? ' on' : ''}`} onClick={() => set('model', c.key)} title={c.name}>
      <Glyph k={c.icon} size={22} /><span>{c.name}</span></button>)}</div>
    <h5 className="looksub">Icône <small>{draft?.icon ? '' : '(automatique : celle du design)'}</small></h5>
    <div className="row"><input placeholder="Filtrer les icônes" value={iq} onChange={e => setIq(e.target.value)} />{draft?.icon && <button className="sm" onClick={() => set('icon', '')}>Automatique</button>}</div>
    <div className="iconpick">{icons.map(i => <button key={i.key} type="button" className={`iconcell${draft?.icon === i.key ? ' on' : ''}`} title={i.label} aria-label={i.label} onClick={() => set('icon', i.key)}><Glyph k={i.key} size={26} /><small>{i.label}</small></button>)}</div>
  </div>;
}
