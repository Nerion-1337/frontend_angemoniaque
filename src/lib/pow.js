// Preuve de travail anti-robot de l'inscription (miroir de back/src/lib/security.ts:verifyPow) : trouver un nonce tel que
// SHA-256("sel:nonce") commence par `bits` bits nuls. Lancée en arrière-plan dès l'ouverture du formulaire d'inscription.
export const zeroBits = bytes => { let n = 0; for (const x of bytes) { if (x === 0) { n += 8; continue; } n += Math.clz32(x) - 24; break; } return n; };
export async function solve(token, { signal, digest = d => crypto.subtle.digest('SHA-256', d) } = {}) {
  const ch = JSON.parse(atob(token.split('.')[0].replace(/-/g, '+').replace(/_/g, '/'))), enc = new TextEncoder();
  for (let n = 0; ; n++) {
    if (signal?.aborted) throw new Error('annulé');
    if (zeroBits(new Uint8Array(await digest(enc.encode(`${ch.s}:${n}`)))) >= ch.b) return { token, nonce: n };
  }
}
