// Chargement des zones de paix d'un monde (GET /map/{id}/zones) ; calculs purs dans peace.js.
import { useEffect, useState } from 'react'; import { api } from './api';
const cache = new Map();
/** Zones du monde, rechargées au plus toutes les 30 s. */
export default function usePeaceZones(mapId) {
  const [z, setZ] = useState(cache.get(mapId)?.v ?? []);
  useEffect(() => { if (!mapId) return; const c = cache.get(mapId); if (c && Date.now() - c.at < 30000) { setZ(c.v); return; }
    api(`/map/${mapId}/zones`).then(v => { cache.set(mapId, { v, at: Date.now() }); setZ(v); }).catch(() => {}); }, [mapId]);
  return z;
}
