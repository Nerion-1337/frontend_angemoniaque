// Filtres de l'Hôtel de ville (2026-11-28) : catégorie (fournie par le serveur, `cat`) et rareté, sur la boutique, le marché et le coffre.
export const CATS = [['all', 'Tout'], ['sort', 'Sorts'], ['objet', 'Objets'], ['structure', 'Structures'], ['invocation', 'Invocations'], ['ressource', 'Ressources']];
export const NO_FILTER = { cat: 'all', rar: 'all' };
/** Vrai si l'entrée passe le filtre (rareté absente = commun). */
export const passes = (x, f = NO_FILTER) => (f.cat === 'all' || x.cat === f.cat) && (f.rar === 'all' || (x.rarity || 'commun') === f.rar);
/** Boutique : objets et sorts dans une seule liste, triés par prix. */
export const shopEntries = shop => [...(shop?.items ?? []).map(i => ({ ...i, type: 'item' })), ...(shop?.spells ?? []).map(s => ({ ...s, type: 'spell' }))].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
