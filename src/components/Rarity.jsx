// Rareté visible en jeu (objets, sorts) : pastille colorée + liseré des cases d'inventaire (classe `rar-<clé>`).
// Mêmes clés et couleurs que l'admin (admin/rarity.js), recopiées ici : le code admin n'est pas livré aux joueurs.
export const RARITY_LABEL = { commun: 'Commun', rare: 'Rare', epique: 'Épique', legendaire: 'Légendaire', divin: 'Divin', unique: 'Unique' };
export const rarClass = r => `rar-${RARITY_LABEL[r] ? r : 'commun'}`;
export const Rarity = ({ r }) => <span className={`rtag ${rarClass(r)}`} title={`Rareté : ${RARITY_LABEL[r] ?? 'Commun'}`}>{RARITY_LABEL[r] ?? 'Commun'}</span>;
