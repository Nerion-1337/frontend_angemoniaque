import { useEffect, useRef } from 'react';
import './compass.css';
/** Rose des vents : le N pointe toujours vers le Nord réel de la carte, quelle que soit la rotation de la caméra (clic droit + glisser).
 *  Un clic recale la vue avec le Nord en haut. Communique avec la scène 3D par événements (ange:yaw / ange:yaw-reset). */
export default function Compass() {
  const rose = useRef();
  useEffect(() => { const f = e => { if (rose.current) rose.current.style.transform = `rotate(${e.detail}rad)`; }; addEventListener('ange:yaw', f); return () => removeEventListener('ange:yaw', f); }, []);
  return <button className="glass compass" title="Boussole — clic : remettre le Nord en haut" aria-label="Boussole : remettre le Nord en haut" onClick={() => dispatchEvent(new Event('ange:yaw-reset'))}>
    <svg ref={rose} viewBox="-50 -50 100 100" width="84" height="84" aria-hidden>
      <circle r="44" className="ring" /><path d="M0 -38 L7 0 L0 6 L-7 0 Z" className="needle" /><path d="M0 38 L6 0 L0 -4 L-6 0 Z" className="tail" />
      <text y="-27" className="n">N</text><text x="31" y="5" className="l">E</text><text y="37" className="l">S</text><text x="-31" y="5" className="l">O</text>
    </svg></button>;
}
