import React, { useState, useEffect, useRef } from 'react';
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
    const [timer, setTimer] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const navigate = useNavigate();
    const timerIntervalRef = useRef(null);

    useEffect(() => {
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

    // Gestion du chronomètre
    useEffect(() => {
        if (hasStarted && !isComplete) {
            timerIntervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [hasStarted, isComplete]);

    // Gestion des touches clavier
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!playerPos || isComplete || !level) return;

            let newRow = playerPos.row;
            let newCol = playerPos.col;

            // Flèches directionnelles
            if (e.key === 'ArrowUp') {
                newRow -= 1;
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                newRow += 1;
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                newCol -= 1;
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                newCol += 1;
                e.preventDefault();
            }
            // ZQSD
            else if (e.key.toLowerCase() === 'z') {
                newRow -= 1;
                e.preventDefault();
            } else if (e.key.toLowerCase() === 's') {
                newRow += 1;
                e.preventDefault();
            } else if (e.key.toLowerCase() === 'q') {
                newCol -= 1;
                e.preventDefault();
            } else if (e.key.toLowerCase() === 'd') {
                newCol += 1;
                e.preventDefault();
            }

            // Vérifier si la position a changé et si elle est valide
            if ((newRow !== playerPos.row || newCol !== playerPos.col) &&
                newRow >= 0 && newRow < level.rows &&
                newCol >= 0 && newCol < level.cols) {
                handleMove(newRow, newCol);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playerPos, isComplete, level]);

    const loadLevel = (levelId) => {
        setLoading(true);
        setIsComplete(false);
        setInventory([]);
        setDefeatedEnemies([]);
        setClearedObstacles([]);

        fetch(`${API_URL}/levels/${levelId}`)
            .then(res => res.json())
            .then(data => {
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

    const saveScore = (finalTime) => {
        try {
            // Récupérer les scores existants depuis localStorage
            const existingScores = JSON.parse(localStorage.getItem('highscores') || '[]');
            
            const newScore = {
                id: existingScores.length ? Math.max(...existingScores.map(s => s.id)) + 1 : 1,
                playerName: username,
                score: finalTime,
                moveCount: moveCount + 1,
                createdAt: new Date().toISOString()
            };
            
            existingScores.push(newScore);
            
            // Trier par meilleur temps et garder seulement les 20 meilleurs
            existingScores.sort((a, b) => a.score - b.score);
            const topScores = existingScores.slice(0, 20);
            
            localStorage.setItem('highscores', JSON.stringify(topScores));
            
            console.log('Score sauvegardé avec succès');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du score:', error);
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

            // Démarrer le chrono au premier mouvement
            if (!hasStarted) {
                setHasStarted(true);
            }

            // Incrémenter le compteur de mouvements et ajouter 1 seconde
            setMoveCount(prev => prev + 1);
            setTimer(prev => prev + 1);

            switch (cellInfo.type) {
                case 'W':
                    return;

                case 'door': {
                    const hasKey = inventory.includes(`key_${cellInfo.doorColor}`);
                    if (!hasKey) {
                        alert(`🚪 Porte ${cellInfo.doorColor} verrouillée ! Trouvez la clé ${cellInfo.doorColor}.`);
                        return;
                    }
                    break;
                }

                case 'enemy':
                    if (!defeatedEnemies.includes(targetKey)) {
                        const enemy = level.enemies.find(e => e.type === cellInfo.enemyType);
                        const confirmed = window.confirm(`⚔️ Combat contre ${enemy?.name || 'un ennemi'} (HP: ${enemy?.hp}, ATK: ${enemy?.attack}) !`);
                        if (confirmed) {
                            setDefeatedEnemies(prev => [...prev, targetKey]);
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
                    }
                    break;

                case 'key': {
                    const keyId = `key_${cellInfo.keyColor}`;
                    if (!inventory.includes(keyId)) {
                        setInventory(prev => [...prev, keyId]);
                    }
                    break;
                }

                case 'item':
                    if (!inventory.includes(cellInfo.itemId)) {
                        setInventory(prev => [...prev, cellInfo.itemId]);
                        const item = level.items.find(i => i.id === cellInfo.itemId);
                    }
                    break;
            }

            setPlayerPos({ row: targetRow, col: targetCol });

            if (cellInfo.type === 'E') {
                setIsComplete(true);

                const nextLevel = currentLevelId + 1;
                if (nextLevel <= 4) {
                    setTimeout(() => {
                        setCurrentLevelId(nextLevel);
                        setIsComplete(false);
                    }, 2000);
                } else {
                    // Dernier niveau terminé - sauvegarder le score
                    const finalTime = timer + 1; // +1 pour le dernier mouvement
                    saveScore(finalTime);
                    
                    setTimeout(() => {
                        alert(`🎉 Félicitations ${username} !\nVous avez terminé tous les niveaux en ${Math.floor(finalTime / 60)}:${(finalTime % 60).toString().padStart(2, '0')} !\nMovements: ${moveCount + 1}\n\nLe score a été sauvegardé !`);
                        navigate('/highscores');
                    }, 1000);
                }
            }
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        <p className="text-sm">Vérifiez que l'API tourne sur le bon port</p>
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
                            <p className="text-gray-400 text-sm mt-1">
                                ⌨️ Utilisez les flèches ou ZQSD pour vous déplacer
                            </p>
                        </div>

                        <div className="w-24"></div>
                    </div>

                    {/* Chronomètre et compteur de mouvements */}
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white px-8 py-4 rounded-xl shadow-lg mb-6 border-2 border-blue-500">
                        <div className="flex items-center justify-center gap-8">
                            <div className="text-center">
                                <p className="text-sm text-gray-300 mb-1">Temps</p>
                                <p className="text-3xl font-bold font-mono">
                                    ⏱️ {formatTime(timer)}
                                </p>
                            </div>
                            <div className="w-px h-12 bg-gray-500"></div>
                            <div className="text-center">
                                <p className="text-sm text-gray-300 mb-1">Mouvements</p>
                                <p className="text-3xl font-bold">
                                    🚶 {moveCount}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isComplete && (
                        <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-bold animate-pulse mb-6 text-center">
                            ✅ Niveau terminé ! {currentLevelId < 4 ? 'Niveau suivant dans 2 secondes...' : 'Calcul du score final...'}
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