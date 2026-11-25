// Emplacements de l'inventaire acceptés par type d'objet (miroir de back/src/routes/inventory.ts:GROUP).
// Plus d'emplacement « arc » : un arc (comme toute arme « à deux mains ») se pose en main principale et occupe aussi l'autre main.
export const GROUP = { weapon: ['weapon_main', 'weapon_off'], shield: ['weapon_off'], head: ['head'], chest: ['chest'], foot: ['foot'], amulet: ['amulet'], ring: ['ring_l', 'ring_r'], bracelet: ['bracelet_l', 'bracelet_r'], special: [1, 2, 3, 4, 5].map(n => 'special_' + n) };
