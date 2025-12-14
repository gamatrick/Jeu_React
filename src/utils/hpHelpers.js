// Calcule le pourcentage de HP restants
export const calculateHPPercentage = (currentHP, maxHP) => {
    return Math.max(0, Math.min(100, (currentHP / maxHP) * 100));
};

// Détermine l'icône de cœur en fonction du pourcentage de HP
export const getHeartIcon = (hpPercentage) => {
    if (hpPercentage > 60) return '💚';
    if (hpPercentage > 30) return '💛';
    return '❤️';
};

// Détermine la classe CSS pour la couleur de la barre HP
export const getHPColorClass = (hpPercentage) => {
    if (hpPercentage > 60) return 'hpbar-bar-fill-high';
    if (hpPercentage > 30) return 'hpbar-bar-fill-medium';
    return 'hpbar-bar-fill-low';
};
