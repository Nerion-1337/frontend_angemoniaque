// Zones de paix des structures (migration 48 ; la zone sacrée codée en dur a disparu le 2026-11-28) : GET /map/{id}/zones.
// Le jeu affiche toujours attaques et sorts offensifs, mais les grise quand l'attaquant ou la cible est dans une zone.
/** Structure dont la zone couvre (x, y) (Chebyshev), en ignorant la structure `except` (elle reste attaquable de l'extérieur). */
export const peaceAt = (zones, x, y, except = 0) => (zones ?? []).find(z => z.id !== except && Math.max(Math.abs(x - z.x), Math.abs(y - z.y)) <= z.r) ?? null;
/** Raison du blocage d'une attaque de `from` vers `to` (null = permise). */
export const peaceBlock = (zones, from, to, except = 0) => { const z = peaceAt(zones, from.x, from.y) ?? (to && peaceAt(zones, to.x, to.y, except)); return z ? `Zone de paix de ${z.name} : aucune attaque possible` : null; };
/** Sort qui inflige des dégâts (attaque, dégâts instantanés ou sur la durée). */
export const harmfulFx = s => s?.kind === 'attack' || Number(s?.effects?.damage) > 0 || !!s?.effects?.dot;
