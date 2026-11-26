// Noms des mondes (cartes 1..3) : affichage joueur et admin.
export const WORLDS = { 1: 'Monde des Hommes', 2: 'Monde des Anges et des Démons', 3: 'Monde des Morts' };
export const worldName = id => WORLDS[id] ?? `Monde ${id}`;
