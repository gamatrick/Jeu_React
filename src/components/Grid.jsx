import React from 'react';
import Tile from './Tile';
import useResponsiveTileSize from '../hooks/useResponsiveTileSize';
import '../styles/Grid.css';

const GRID_GAP = 2;

// Composant Grid - Affiche la grille de jeu complète
function Grid({
    level,
    revealed,
    playerPos,
    onMove,
    defeatedEnemies,
    clearedObstacles,
    blockedEnemies,
    inventory
}) {
    const tileSize = useResponsiveTileSize(level.cols);

    // Gère le clic sur une tuile
    const handleTileClick = (row, col) => {
        onMove(row, col);
    };

    // Récupère la couleur d'un ennemi à une position donnée
    const getEnemyColor = (row, col) => {
        const cell = level.grid[row][col];
        if (!cell || !cell.startsWith('M:')) return null;

        const enemyType = cell.split(':')[1];
        const enemy = level.enemies?.find(e => e.type === enemyType);
        return enemy?.color || null;
    };

    // Vérifie si le joueur possède la clé/objet pour une tuile
    const hasRequiredItem = (cell) => {
        if (!cell) return false;

        if (cell.startsWith('K:')) {
            const keyColor = cell.split(':')[1];
            return inventory.includes(`key_${keyColor}`);
        }
        if (cell.startsWith('I:')) {
            const itemId = cell.split(':')[1];
            return inventory.includes(itemId);
        }
        if (cell.startsWith('D:')) {
            const doorColor = cell.split(':')[1];
            return inventory.includes(`key_${doorColor}`);
        }

        return false;
    };

    return (
        <div
            className={`grid-container ${tileSize < 56 ? 'grid-container-small' : ''}`}
            style={{
                gridTemplateColumns: `repeat(${level.cols}, ${tileSize}px)`,
                gridTemplateRows: `repeat(${level.rows}, ${tileSize}px)`,
                gap: `${GRID_GAP}px`
            }}
        >
            {level.grid.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                    const key = `${rowIdx},${colIdx}`;
                    const hasPlayer = playerPos.row === rowIdx && playerPos.col === colIdx;
                    const isDefeated = defeatedEnemies.includes(key);
                    const isCleared = clearedObstacles.includes(key);
                    const isBlocked = blockedEnemies.includes(key);
                    const hasKey = hasRequiredItem(cell);

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
    );
}

export default Grid;
