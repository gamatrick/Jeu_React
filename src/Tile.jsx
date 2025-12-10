import React from 'react';

function Tile({ cell, isRevealed, hasPlayer, onClick }) {
    const getBackground = () => {
        if (!isRevealed) {
            return '#6b7280';
        }

        if (cell === 'S' || cell === 'C') return '#16a34a'; 
        if (cell === 'W') return '#92400e';
        if (cell === 'E') return '#ffffff';

        return '#6b7280'; 
    };

    return (
        <>
            <div
                onClick={onClick}
                style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: getBackground(),
                    border: '2px solid #374151',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                {hasPlayer && (
                    <div style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#000000',
                        borderRadius: '4px'
                    }} />
                )}
            </div>
        </>
    );
}

export default Tile;