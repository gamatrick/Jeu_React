// Fonctions utilitaires pour gérer l'inventaire du joueur

// Vérifie si le joueur possède une clé d'une couleur donnée
export const hasKey = (inventory, color) => {
    return inventory.includes(`key_${color}`);
};

// Vérifie si le joueur possède un objet donné
export const hasItem = (inventory, itemId) => {
    return inventory.includes(itemId);
};

// Ajoute un objet à l'inventaire s'il n'y est pas déjà
export const addItemToInventory = (inventory, itemId) => {
    if (inventory.includes(itemId)) {
        return inventory;
    }
    return [...inventory, itemId];
};
