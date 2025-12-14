// Configuration des icônes et noms d'objets de l'inventaire

// Mapping des identifiants d'objets vers leurs icônes
export const ITEM_ICONS = {
    'key_red': '🔴',
    'key_blue': '🔵',
    'water_bucket': '🪣',
    'pickaxe': '⛏️',
    'swim_boots': '🥾',
    'dagger': '🗡️',
    'sword': '⚔️',
    'axe': '🪓'
};

// Mapping des identifiants d'objets vers leurs noms en français
export const ITEM_NAMES = {
    'key_red': 'Clé Rouge',
    'key_blue': 'Clé Bleue',
    'water_bucket': 'Seau d\'Eau',
    'pickaxe': 'Pioche',
    'swim_boots': 'Bottes Magiques',
    'dagger': 'Dague',
    'sword': 'Épée',
    'axe': 'Hache de Guerre'
};

// Récupère l'icône d'un objet par son identifiant
export const getItemIcon = (itemId) => {
    return ITEM_ICONS[itemId] || '📦';
};

// Récupère le nom d'un objet par son identifiant
export const getItemName = (itemId) => {
    return ITEM_NAMES[itemId] || itemId;
};
