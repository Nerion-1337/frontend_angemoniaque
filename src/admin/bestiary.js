/** Bestiaire (Étape 2 phase 2) : aides pures du panneau (affichage du butin, corps de spawn). */
/** Libellé lisible d'une entrée de butin : objet classique, objet divin ou ressource. */
export const lootLabel = l => l.item_name ? `objet ${l.item_name}` : (l.divine_ref || l.divine_kind) ? `divin ${l.divine_kind} n°${l.divine_ref}` : `ressource ${l.resource}`;
/** Corps d'ajout de règle de spawn : conversion numérique de chaque champ. */
export const spawnBody = ns => Object.fromEntries(Object.entries(ns).map(([k, v]) => [k, Number(v)]));
