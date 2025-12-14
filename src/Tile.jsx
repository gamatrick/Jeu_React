import React from 'react';

function Tile({ cell, isRevealed, hasPlayer, onClick, isDefeated, isCleared, hasKey, tileSize = 64 }) {
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

    const getBackground = () => {
        if (!isRevealed) return '#6b7280';

        switch (cellInfo.type) {
            case 'S':
            case 'C':
                return '#16a34a';
            case 'W':
                return '#92400e';
            case 'E':
                return '#fbbf24';
            case 'enemy':
                return isDefeated ? '#16a34a' : '#dc2626';
            case 'obstacle':
                return isCleared ? '#16a34a' : '#f59e0b';
            case 'door':
                return cellInfo.doorColor === 'red' ? '#7f1d1d' : '#1e3a8a';
            case 'key':
            case 'item':
                return '#8b5cf6';
            default:
                return '#6b7280';
        }
    };

    const getIcon = () => {
        if (!isRevealed) return null;

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
                if (hasKey) return '🚪✓';
                return cellInfo.doorColor === 'red' ? '🔴🚪' : '🔵🚪';

            case 'key':
                if (hasKey) return null;
                return cellInfo.keyColor === 'red' ? '🟥' : '🟦';

            case 'item':
                if (hasKey) return null;
                const itemIcons = {
                    water_bucket: '🪣',
                    pickaxe: '⛏️',
                    swim_boots: '🥾'
                };
                return itemIcons[cellInfo.itemId] || '🎒';

            case 'E':
                return '🏆';

            default:
                return null;
        }
    };

    const fontSize = tileSize < 56 ? '16px' : tileSize < 64 ? '20px' : '24px';
    const playerSize = Math.max(16, tileSize * 0.35);

    return (
        <>
            <div
                onClick={onClick}
                style={{
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    backgroundColor: getBackground(),
                    border: '1px solid #1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    fontSize: fontSize,
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    boxShadow: isRevealed ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                    if (isRevealed) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = isRevealed ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none';
                }}
            >
                {getIcon()}
                {hasPlayer && (
                    <div style={{
                        position: 'absolute',
                        width: `${playerSize}px`,
                        height: `${playerSize}px`,
                        backgroundColor: '#3b82f6',
                        borderRadius: '50%',
                        border: `${Math.max(2, tileSize * 0.04)}px solid #ffffff`,
                        boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }} />
                )}
            </div>
        </>
    );
}

export default Tile;