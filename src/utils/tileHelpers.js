// Parse une cellule de la grille et retourne ses informations
export const parseCellValue = (cellValue) => {
    if (!cellValue) {
        return { type: 'empty' };
    }

    const [prefix, value] = cellValue.split(':');

    switch (prefix) {
        case 'M':
            return { type: 'enemy', enemyType: value };
        case 'K':
            return { type: 'key', keyColor: value };
        case 'D':
            return { type: 'door', doorColor: value };
        case 'O':
            return { type: 'obstacle', obstacleType: value };
        case 'I':
            return { type: 'item', itemId: value };
        default:
            return { type: cellValue };
    }
};

// Détermine la classe CSS de fond pour une tuile
export const getTileBackgroundClass = (cellInfo, isRevealed, isBlocked, isDefeated, isCleared) => {
    if (!isRevealed) {
        return 'tile-bg-hidden';
    }

    if (isBlocked && cellInfo.type === 'enemy') {
        return 'tile-bg-blocked-enemy';
    }

    switch (cellInfo.type) {
        case 'S':
            return 'tile-bg-start';
        case 'C':
            return 'tile-bg-corridor';
        case 'W':
            return 'tile-bg-wall';
        case 'E':
            return 'tile-bg-end';
        case 'enemy':
            return isDefeated ? 'tile-bg-enemy-defeated' : 'tile-bg-enemy';
        case 'obstacle':
            return isCleared ? 'tile-bg-obstacle-cleared' : 'tile-bg-obstacle';
        case 'door':
            return cellInfo.doorColor === 'red' ? 'tile-bg-door-red' : 'tile-bg-door-blue';
        case 'key':
        case 'item':
            return 'tile-bg-item';
        default:
            return 'tile-bg-hidden';
    }
};

// Détermine la classe CSS de taille de police pour une tuile
export const getTileFontSizeClass = (tileSize) => {
    if (tileSize < 56) return 'tile-text-small';
    if (tileSize < 64) return 'tile-text-medium';
    return 'tile-text-large';
};

// Icônes pour les ennemis
const ENEMY_ICONS = {
    goblin: '🟢',
    slime: '🟣',
    orc: '🔴'
};

// Icônes pour les obstacles
const OBSTACLE_ICONS = {
    fire: '🔥',
    rock: '🪨',
    water: '💧'
};

// Icônes pour les objets
const ITEM_ICONS = {
    water_bucket: '🪣',
    pickaxe: '⛏️',
    swim_boots: '🥾',
    dagger: '🗡️',
    sword: '⚔️',
    axe: '🪓'
};

// Retourne l'icône appropriée pour une tuile
export const getTileIcon = (cellInfo, isDefeated, isCleared, hasKey) => {
    switch (cellInfo.type) {
        case 'enemy':
            if (isDefeated) return null;
            return ENEMY_ICONS[cellInfo.enemyType] || '👹';

        case 'obstacle':
            if (isCleared) return null;
            return OBSTACLE_ICONS[cellInfo.obstacleType] || '🚧';

        case 'door':
            if (hasKey) return '🚪✔';
            return cellInfo.doorColor === 'red' ? '🔴🚪' : '🔵🚪';

        case 'key':
            if (hasKey) return null;
            return cellInfo.keyColor === 'red' ? '🟥' : '🟦';

        case 'item':
            if (hasKey) return null;
            return ITEM_ICONS[cellInfo.itemId] || '🎁';

        case 'E':
            return '🏆';

        default:
            return null;
    }
};
