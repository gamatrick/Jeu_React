import React, { useState, useEffect } from 'react';
import Grid from './Grid';

const API_URL = 'http://localhost:4000/api';

export default function App() {
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState({});
  const [playerPos, setPlayerPos] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/levels/1`)
      .then(res => res.json())
      .then(data => {
        console.log('Niveau chargé:', data);
        setLevel(data);

        const startKey = `${data.start.row},${data.start.col}`;
        const endKey = `${data.end.row},${data.end.col}`;
        console.log('Clé de départ:', startKey);
        console.log('Clé de fin:', endKey);
        const revealedData = {
          [startKey]: true,
          [endKey]: true
        };
        console.log('Revealed data:', revealedData);
        setRevealed(revealedData);

        setPlayerPos(data.start);

        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur API:', err);
        setLoading(false);
      });
  }, []);

  const handleMove = (targetRow, targetCol) => {
    if (!level || !playerPos) return;

    const { row: currentRow, col: currentCol } = playerPos;

    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      const targetKey = `${targetRow},${targetCol}`;
      const targetCell = level.grid[targetRow][targetCol];

      setRevealed(prev => ({ ...prev, [targetKey]: true }));

      if (targetCell === 'W') {
        console.log('Mur ! Le joueur reste sur place.');
        return;
      }

      setPlayerPos({ row: targetRow, col: targetCol });

      if (targetCell === 'E') {
        setTimeout(() => {
          alert("ez");
        }, 100);
      }
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
          <p className="text-2xl">Chargement...</p>
        </div>
      </>
    );
  }

  if (!level) {
    return (
      <>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
          <div className="text-center">
            <p className="text-2xl mb-4">❌ Erreur de chargement</p>
            <p className="text-sm">Vérifiez que l'API tourne sur le port 4000</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-8 md:space-y-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            Level {level.id} - {level.rows}×{level.cols}
          </h1>

          <Grid
            level={level}
            revealed={revealed}
            playerPos={playerPos}
            onMove={handleMove}
          />
        </div>
      </div>
    </>
  );
}