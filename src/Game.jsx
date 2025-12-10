import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';

function Game() {
    const [currentLevelId, setCurrentLevelId] = useState(1);
    const [level, setLevel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [revealed, setRevealed] = useState({});
    const [playerPos, setPlayerPos] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [inventory, setInventory] = useState([]);
    const [defeatedEnemies, setDefeatedEnemies] = useState([]);
    const [clearedObstacles, setClearedObstacles] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si l'utilisateur a un pseudo
        const savedUsername = localStorage.getItem('playerUsername');
        if (!savedUsername) {
            navigate('/username');
            return;
        }
        setUsername(savedUsername);
    }, [navigate]);

    useEffect(() => {
        if (username) {
            loadLevel(currentLevelId);
        }
    }, [currentLevelId, username]);

    const loadLevel = (levelId) => {
        setLoading(true);
        setIsComplete(false);
        setInventory([]);
        setDefeatedEnemies([]);
        setClearedObstacles([]);

        fetch(`${API_URL}/levels/${levelId}`)
            .then(res => res.json())
            .then(data => {
                console.log('Niveau chargé:', data);
                setLevel(data);

                const startKey = `${data.start.row},${data.start.col}`;
                const endKey = `${data.end.row},${data.end.col}`;

                const revealedData = {
                    [startKey]: true,
                    [endKey]: true
                };

                setRevealed(revealedData);
                setPlayerPos(data.start);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erreur API:', err);
                setLoading(false);
            });
    };

    const getCellType = (cellValue) => {
        if (!cellValue) return { type: 'empty' };

        const prefix = cellValue.split(':')[0];
        const value = cellValue.split(':')[1];

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

    const handleMove = (targetRow, targetCol) => {
        if (!level || !playerPos || isComplete) return;

        const { row: currentRow, col: currentCol } = playerPos;

        const rowDiff = Math.abs(targetRow - currentRow);
        const colDiff = Math.abs(targetCol - currentCol);

        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
            const targetKey = `${targetRow},${targetCol}`;
            const targetCell = level.grid[targetRow][targetCol];
            const cellInfo = getCellType(targetCell);

            setRevealed(prev => ({ ...prev, [targetKey]: true }));

            switch (cellInfo.type) {
                case 'W':
                    console.log('Mur ! Le joueur reste sur place.');
                    return;

                case 'door': {
                    const hasKey = inventory.includes(`key_${cellInfo.doorColor}`);
                    if (!hasKey) {
                        alert(`🚪 Porte ${cellInfo.doorColor} verrouillée ! Trouvez la clé ${cellInfo.doorColor}.`);
                        return;
                    }
                    console.log(`Porte ${cellInfo.doorColor} ouverte !`);
                    break;
                }

                case 'enemy':
                    if (!defeatedEnemies.includes(targetKey)) {
                        const enemy = level.enemies.find(e => e.type === cellInfo.enemyType);
                        const confirmed = window.confirm(`⚔️ Combat contre ${enemy?.name || 'un ennemi'} (HP: ${enemy?.hp}, ATK: ${enemy?.attack}) !`);
                        if (confirmed) {
                            setDefeatedEnemies(prev => [...prev, targetKey]);
                            console.log(`Ennemi vaincu : ${enemy?.name}`);
                        } else {
                            return;
                        }
                    }
                    break;

                case 'obstacle':
                    if (!clearedObstacles.includes(targetKey)) {
                        const obstacle = level.obstacles.find(o => o.type === cellInfo.obstacleType);
                        const hasItem = inventory.includes(obstacle?.requiredItem);
                        if (!hasItem) {
                            alert(`🚧 ${obstacle?.name || 'Obstacle'} ! Vous avez besoin de : ${obstacle?.requiredItem}`);
                            return;
                        }
                        setClearedObstacles(prev => [...prev, targetKey]);
                        console.log(`Obstacle franchi : ${obstacle?.name}`);
                    }
                    break;

                case 'key': {
                    const keyId = `key_${cellInfo.keyColor}`;
                    if (!inventory.includes(keyId)) {
                        setInventory(prev => [...prev, keyId]);
                        console.log(`🔑 Clé ${cellInfo.keyColor} récupérée !`);
                    }
                    break;
                }

                case 'item':
                    if (!inventory.includes(cellInfo.itemId)) {
                        setInventory(prev => [...prev, cellInfo.itemId]);
                        const item = level.items.find(i => i.id === cellInfo.itemId);
                        console.log(`🎒 ${item?.name || 'Item'} récupéré !`);
                    }
                    break;
            }

            setPlayerPos({ row: targetRow, col: targetCol });

            if (cellInfo.type === 'E') {
                setIsComplete(true);
                console.log(`Niveau ${currentLevelId} terminé !`);

                setTimeout(() => {
                    const nextLevel = currentLevelId + 1;
                    if (nextLevel <= 4) {
                        setCurrentLevelId(nextLevel);
                    } else {
                        alert('🎉 Félicitations ! Vous avez terminé tous les niveaux !');
                        navigate('/');
                    }
                }, 5000);
            }
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                    <p className="text-2xl">Chargement du niveau {currentLevelId}...</p>
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
                        <button
                            onClick={() => navigate('/')}
                            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                        >
                            Retour au menu
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-7xl">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            ← Retour
                        </button>

                        <div className="flex-1 text-center">
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider">
                                Level {level.id} - {level.name}
                            </h1>
                            <p className="text-blue-400 text-lg mt-2">
                                👤 {username}
                            </p>
                        </div>

                        <div className="w-24"></div>
                    </div>

                    {isComplete && (
                        <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-bold animate-pulse mb-6 text-center">
                            ✅ Niveau terminé ! Niveau suivant dans 5 secondes...
                        </div>
                    )}

                    {inventory.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-8 py-4 rounded-xl shadow-lg mb-6 border-2 border-purple-500">
                            <div className="flex items-center justify-center flex-wrap gap-3">
                                <span className="font-bold text-lg mr-2">🎒 Inventaire :</span>
                                {inventory.map((item, idx) => {
                                    const itemIcons = {
                                        'key_red': '🔴',
                                        'key_blue': '🔵',
                                        'water_bucket': '🪣',
                                        'pickaxe': '⛏️',
                                        'swim_boots': '🥾'
                                    };
                                    const icon = itemIcons[item] || '📦';
                                    const displayName = item.replace('key_', 'Clé ').replace('_', ' ');

                                    return (
                                        <div
                                            key={idx}
                                            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border-2 border-purple-400 shadow-md transform hover:scale-105 transition-all flex items-center gap-2"
                                        >
                                            <span className="text-2xl">{icon}</span>
                                            <span className="text-sm font-medium capitalize">{displayName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="text-white text-sm mb-4 text-center">
                        {level.rows}×{level.cols} - {level.difficulty}
                    </div>

                    <div className="flex justify-center">
                        <Grid
                            level={level}
                            revealed={revealed}
                            playerPos={playerPos}
                            onMove={handleMove}
                            defeatedEnemies={defeatedEnemies}
                            clearedObstacles={clearedObstacles}
                            inventory={inventory}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;