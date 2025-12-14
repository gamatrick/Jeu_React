import React from 'react';
import './Tile.css';

function Tile({ cell, isRevealed, hasPlayer, onClick, isDefeated, isCleared, hasKey, tileSize = 64, isBlocked, enemyColor }) {
    const getCellInfo = () => {
        if (!cell) return { type: 'empty' };

        const prefix = cell.split(':')[0];
        const value = cell.split(':')[1];

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
                return { type: cell };
        }
    };

    const cellInfo = getCellInfo();

    const getBackgroundClass = () => {
        if (!isRevealed) return 'tile-bg-hidden';

        // Si l'ennemi est bloqué (pas la bonne arme), case rouge dangereuse
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

    const getIcon = () => {
        if (!isRevealed) return null;

        // Si l'ennemi est bloqué, afficher un rond de couleur
        if (isBlocked && cellInfo.type === 'enemy' && enemyColor) {
            return (
                <div
                    className="enemy-color-indicator"
                    style={{
                        width: `${tileSize * 0.6}px`,
                        height: `${tileSize * 0.6}px`,
                        backgroundColor: enemyColor
                    }}
                />
            );
        }

        switch (cellInfo.type) {
            case 'enemy':
                if (isDefeated) return null;
                const enemyIcons = { goblin: '🟢', slime: '🟣', orc: '🔴' };
                return enemyIcons[cellInfo.enemyType] || '👹';

            case 'obstacle':
                if (isCleared) return null;
                const obstacleIcons = { fire: '🔥', rock: '🪨', water: '💧' };
                return obstacleIcons[cellInfo.obstacleType] || '🚧';

            case 'door':
                if (hasKey) return '🚪✔';
                return cellInfo.doorColor === 'red' ? '🔴🚪' : '🔵🚪';

            case 'key':
                if (hasKey) return null;
                return cellInfo.keyColor === 'red' ? '🟥' : '🟦';

            case 'item':
                if (hasKey) return null;
                const itemIcons = {
                    water_bucket: '🪣',
                    pickaxe: '⛏️',
                    swim_boots: '🥾',
                    dagger: '🗡️',
                    sword: '⚔️',
                    axe: '🪓'
                };
                return itemIcons[cellInfo.itemId] || '🎁';

            case 'E':
                return '🏆';

            default:
                return null;
        }
    };

    const fontSizeClass = tileSize < 56 ? 'tile-text-small' : tileSize < 64 ? 'tile-text-medium' : 'tile-text-large';
    const playerSize = Math.max(16, tileSize * 0.35);

    return (
        <div
            onClick={onClick}
            className={`tile ${getBackgroundClass()} ${isRevealed ? 'tile-revealed' : 'tile-unrevealed'} ${fontSizeClass}`}
            style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`
            }}
        >
            {getIcon()}
            {hasPlayer && (
                <div
                    className="player-indicator"
                    style={{
                        width: `${playerSize}px`,
                        height: `${playerSize}px`,
                        border: `${Math.max(2, tileSize * 0.04)}px solid #fbbf24`
                    }}
                />
            )}
        </div>
    );
}

export default Tile;