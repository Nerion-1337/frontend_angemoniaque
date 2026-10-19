/** Intégrité des rangs (miroir de back/src/routes/guilds.ts) : le dernier porteur du rang Chef
 *  ne peut ni quitter la guilde ni changer de rang tant qu'un autre membre n'a pas ce rang. */
export const lastChef = g => g.me.leader && g.members.filter(m => g.ranks.find(r => r.id === m.rank_id)?.is_leader).length === 1;
