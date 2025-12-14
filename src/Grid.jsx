import React from 'react';
import Tile from './Tile';

function Grid({ level, revealed, playerPos, onMove, defeatedEnemies, clearedObstacles, blockedEnemies, inventory }) {
    const handleTileClick = (row, col) => {
        onMove(row, col);
    };

    const getTileSize = () => {
        if (typeof window === 'undefined') return 64;

        const screenWidth = window.innerWidth;
        const maxCols = level.cols;

        if (screenWidth < 400) {
            return Math.min(48, Math.floor((screenWidth - 40) / maxCols));
        }
        if (screenWidth < 640) {
            return Math.min(56, Math.floor((screenWidth - 40) / maxCols));
        }
        if (screenWidth < 1024) {
            return Math.min(64, Math.floor((screenWidth - 60) / maxCols));
        }
        return 64;
    };

    const [tileSize, setTileSize] = React.useState(getTileSize());

    React.useEffect(() => {
        const handleResize = () => {
            setTileSize(getTileSize());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [level.cols]);

    const gapSize = 2;

    const getEnemyColor = (row, col) => {
        const cell = level.grid[row][col];
        if (!cell || !cell.startsWith('M:')) return null;
        
        const enemyType = cell.split(':')[1];
        const enemy = level.enemies?.find(e => e.type === enemyType);
        return enemy?.color || null;
    };

    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${level.cols}, ${tileSize}px)`,
                    gridTemplateRows: `repeat(${level.rows}, ${tileSize}px)`,
                    gap: `${gapSize}px`,
                    backgroundColor: '#0f172a',
                    padding: tileSize < 56 ? '8px' : '12px',
                    borderRadius: tileSize < 56 ? '12px' : '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
                    border: '3px solid #1e293b',
                    width: 'fit-content'
                }}
            >
                {level.grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => {
                        const key = `${rowIdx},${colIdx}`;
                        const hasPlayer = playerPos.row === rowIdx && playerPos.col === colIdx;
                        const isDefeated = defeatedEnemies.includes(key);
                        const isCleared = clearedObstacles.includes(key);
                        const isBlocked = blockedEnemies.includes(key);

                        let hasKey = false;
                        if (cell?.startsWith('K:')) {
                            const keyColor = cell.split(':')[1];
                            hasKey = inventory.includes(`key_${keyColor}`);
                        }
                        if (cell?.startsWith('I:')) {
                            const itemId = cell.split(':')[1];
                            hasKey = inventory.includes(itemId);
                        }
                        if (cell?.startsWith('D:')) {
                            const doorColor = cell.split(':')[1];
                            hasKey = inventory.includes(`key_${doorColor}`);
                        }

                        return (
                            <Tile
                                key={key}
                                cell={cell}
                                isRevealed={revealed[key] || false}
                                hasPlayer={hasPlayer}
                                onClick={() => handleTileClick(rowIdx, colIdx)}
                                isDefeated={isDefeated}
                                isCleared={isCleared}
                                isBlocked={isBlocked}
                                enemyColor={getEnemyColor(rowIdx, colIdx)}
                                hasKey={hasKey}
                                tileSize={tileSize}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
}

export default Grid;