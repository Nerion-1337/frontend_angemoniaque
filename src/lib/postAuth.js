import { setToken } from './api';
/** Suite d'une réponse /auth/login ou /auth/register réussie :
 *  stocke le token, calcule l'état `auth` (mêmes champs que /auth/me) et décide la
 *  navigation : un compte admin se rend directement à l'interface admin (#admin),
 *  un compte joueur reste sur la sélection de personnage.
 *  @returns {{ auth: object, hash: string|null }} hash à poser sur location (null = rester). */
export const postAuth = (r, email) => { setToken(r.token); return { auth: { admin: !!r.admin, role: r.role, email }, hash: r.admin ? '#admin' : null }; };
