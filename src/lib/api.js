let token = localStorage.getItem('token');
export const setToken = t => { token = t; t ? localStorage.setItem('token', t) : localStorage.removeItem('token'); };
export const hasToken = () => !!token;
export async function api(path, body, method) {
  let r; try { r = await fetch('/api' + path, { method: method ?? (body ? 'POST' : 'GET'), headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: body ? JSON.stringify(body) : undefined }); }
  catch { throw new Error('Serveur injoignable'); }
  const j = await r.json().catch(() => null); if (!r.ok) throw new Error(typeof j?.error === 'string' ? j.error : `Erreur ${r.status}`); return j;
}
