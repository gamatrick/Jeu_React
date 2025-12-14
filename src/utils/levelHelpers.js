// Configuration et constantes pour les niveaux du jeu

export const API_URL = 'http://localhost:4000/api';
export const MAX_LEVELS = 4;

// Crée l'objet initial de tuiles révélées pour un niveau
export const createInitialRevealed = (start, end) => {
    const startKey = `${start.row},${start.col}`;
    const endKey = `${end.row},${end.col}`;

    return {
        [startKey]: true,
        [endKey]: true
    };
};

// Génère la clé d'une tuile à partir de sa position
export const getTileKey = (row, col) => {
    return `${row},${col}`;
};

// Vérifie si un niveau donné existe
export const isValidLevel = (levelId) => {
    return levelId >= 1 && levelId <= MAX_LEVELS;
};

// Vérifie si un niveau donné est le dernier niveau
export const isLastLevel = (levelId) => {
    return levelId >= MAX_LEVELS;
};
