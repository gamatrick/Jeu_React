// Fonctions utilitaires pour gérer les déplacements du joueur

// Vérifie si le mouvement est adjacent (une case horizontale ou verticale)
export const isAdjacentMove = (currentRow, currentCol, targetRow, targetCol) => {
    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

// Vérifie si une position est dans les limites de la grille
export const isValidPosition = (row, col, maxRows, maxCols) => {
    return row >= 0 && row < maxRows && col >= 0 && col < maxCols;
};

// Calcule la nouvelle position du joueur en fonction d'une touche pressée
export const calculateNewPosition = (key, currentRow, currentCol) => {
    let newRow = currentRow;
    let newCol = currentCol;

    // Flèches directionnelles
    if (key === 'ArrowUp') {
        newRow -= 1;
    } else if (key === 'ArrowDown') {
        newRow += 1;
    } else if (key === 'ArrowLeft') {
        newCol -= 1;
    } else if (key === 'ArrowRight') {
        newCol += 1;
    }
    // ZQSD
    else if (key.toLowerCase() === 'z') {
        newRow -= 1;
    } else if (key.toLowerCase() === 's') {
        newRow += 1;
    } else if (key.toLowerCase() === 'q') {
        newCol -= 1;
    } else if (key.toLowerCase() === 'd') {
        newCol += 1;
    }

    return { row: newRow, col: newCol };
};

// Vérifie si une touche est une touche de mouvement valide
export const isMovementKey = (key) => {
    const movementKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'z', 'Z', 's', 'S', 'q', 'Q', 'd', 'D'
    ];
    return movementKeys.includes(key);
};
