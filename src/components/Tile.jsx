import React from 'react';
import { parseCellValue, getTileBackgroundClass, getTileFontSizeClass, getTileIcon } from '../utils/tileHelpers';
import '../styles/Tile.css';

const ENEMY_INDICATOR_SIZE_RATIO = 0.6;
const PLAYER_INDICATOR_SIZE_RATIO = 0.35;
const PLAYER_BORDER_SIZE_RATIO = 0.04;
const MIN_PLAYER_SIZE = 16;
const MIN_BORDER_SIZE = 2;

// Composant Tile - Représente une case individuelle de la grille de jeu
function Tile({
    cell,
    isRevealed,
    hasPlayer,
    onClick,
    isDefeated,
    isCleared,
    hasKey,
    tileSize = 64,
    isBlocked,
    enemyColor
}) {
    const cellInfo = parseCellValue(cell);
    const backgroundClass = getTileBackgroundClass(cellInfo, isRevealed, isBlocked, isDefeated, isCleared);
    const fontSizeClass = getTileFontSizeClass(tileSize);

    const playerSize = Math.max(MIN_PLAYER_SIZE, tileSize * PLAYER_INDICATOR_SIZE_RATIO);
    const playerBorderSize = Math.max(MIN_BORDER_SIZE, tileSize * PLAYER_BORDER_SIZE_RATIO);

    // Génère le contenu visuel de la tuile (icône ou indicateur d'ennemi)
    const renderTileContent = () => {
        if (!isRevealed) return null;

        if (isBlocked && cellInfo.type === 'enemy' && enemyColor) {
            const indicatorSize = tileSize * ENEMY_INDICATOR_SIZE_RATIO;
            return (
                <div
                    className="enemy-color-indicator"
                    style={{
                        width: `${indicatorSize}px`,
                        height: `${indicatorSize}px`,
                        backgroundColor: enemyColor
                    }}
                />
            );
        }

        return getTileIcon(cellInfo, isDefeated, isCleared, hasKey);
    };

    return (
        <div
            onClick={onClick}
            className={`tile ${backgroundClass} ${isRevealed ? 'tile-revealed' : 'tile-unrevealed'} ${fontSizeClass}`}
            style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`
            }}
        >
            {renderTileContent()}
            {hasPlayer && (
                <div
                    className="player-indicator"
                    style={{
                        width: `${playerSize}px`,
                        height: `${playerSize}px`,
                        border: `${playerBorderSize}px solid #fbbf24`
                    }}
                />
            )}
        </div>
    );
}

export default Tile;
