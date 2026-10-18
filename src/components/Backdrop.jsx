import { useEffect, useRef } from 'react'; import { createScene } from '../three/scene';
/** Fond 3D vivant (même moteur que le jeu) : la caméra orbite lentement au-dessus du monde. */
export default function Backdrop() {
  const el = useRef(); useEffect(() => { const s = createScene(el.current, { orbit: true }); s.update({ id: 0, actor: { see: 18, pos: { x: 104, y: 96 } } }, []); return () => s.dispose(); }, []);
  return <div ref={el} className="canvas" aria-hidden />;
}
