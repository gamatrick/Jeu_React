import React from 'react';
import Tile from './Tile';

function Grid({ level, revealed, playerPos, onMove }) {
    const handleTileClick = (row, col) => {
        onMove(row, col);
    };

    return (
        <>
            <div className="w-full flex justify-center">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${level.cols}, 64px)`,
                        gap: '0px',
                        backgroundColor: '#1f2937',
                        padding: '8px',
                        borderRadius: '8px',
                    }}
                >
                    {level.grid.map((row, rowIdx) =>
                        row.map((cell, colIdx) => {
                            const key = `${rowIdx},${colIdx}`;
                            const hasPlayer = playerPos.row === rowIdx && playerPos.col === colIdx;

                            return (
                                <Tile
                                    key={key}
                                    cell={cell}
                                    isRevealed={revealed[key] || false}
                                    hasPlayer={hasPlayer}
                                    onClick={() => handleTileClick(rowIdx, colIdx)}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default Grid;