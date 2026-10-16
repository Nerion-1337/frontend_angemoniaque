import { useEffect, useRef } from 'react'; import { useSelector, useDispatch } from 'react-redux'; import { createScene } from '../three/scene'; import { api } from '../lib/api'; import { A } from '../store';
export function useRefreshMe() {
  const d = useDispatch(), id = useSelector(s => s.game.charId);
  return async () => { const me = await api(`/characters/${id}`); d(A.setMe(me)); const ents = await api(`/map/${me.pos.map_id}/area?x=${me.pos.x}&y=${me.pos.y}&r=${me.see_eff}`); d(A.setEntities(ents)); return me; };
}
export default function GameCanvas() {
  const el = useRef(), api3 = useRef(), d = useDispatch(), { me, entities } = useSelector(s => s.game), refresh = useRefreshMe(), mapId = me?.pos.map_id;
  useEffect(() => { api3.current = createScene(el.current, { onClick: (t, x, y) => d(A.setSelected({ ...t, sx: x, sy: y })), onHover: (t, x, y) => d(A.setHover(t && { ...t, sx: x, sy: y })) }); return () => api3.current.dispose(); }, []);
  useEffect(() => { refresh(); const i = setInterval(refresh, 8000); return () => clearInterval(i); }, []);
  useEffect(() => { if (!mapId) return; const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/ws?map=${mapId}`);
    ws.onmessage = () => refresh(); return () => ws.close(); }, [mapId]);           // événements temps réel de la carte commune
  useEffect(() => { if (me) api3.current.render(me, entities); }, [me, entities]);
  return <div ref={el} className="canvas" />;
}
