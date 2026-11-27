import { useEffect, useState } from 'react'; import { useDispatch } from 'react-redux'; import { api } from './api'; import { A } from '../store';
/** `path` null / vide = rien à charger (ex. personnage pas encore chargé). */
export function useData(path, deps = []) { const [v, set] = useState(null); const load = () => (path ? api(path).then(set).catch(() => set(null)) : Promise.resolve(set(null))); useEffect(() => { load(); }, deps); return [v, load]; }
export function useDo() { const d = useDispatch(); return async (f, after) => { try { const r = await f(); after?.(r); } catch (e) { d(A.toast(e.message)); } }; }
export const pct = (v, m) => (m ? Math.min(100, v / m * 100) : 0);
