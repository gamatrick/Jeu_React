import React, { useState, useEffect, useRef } from 'react';
import Grid from './Grid';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';
const TIME_PENALTY = 10; // Pénalité de 10 secondes si on essaie de combattre sans arme

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
    const [blockedEnemies, setBlockedEnemies] = useState([]);
    const [username, setUsername] = useState('');
    const [timer, setTimer] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [weaponsCatalog, setWeaponsCatalog] = useState([]);
    const navigate = useNavigate();
    const timerIntervalRef = useRef(null);

    // État pour les toasts
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    });

    useEffect(() => {
        const savedUsername = localStorage.getItem('playerUsername');
        if (!savedUsername) {
            navigate('/username');
            return;
        }
        setUsername(savedUsername);
    }, [navigate]);

    useEffect(() => {
        // Charger le catalogue des armes
        fetch(`${API_URL}/weapons`)
            .then(res => res.json())
            .then(data => setWeaponsCatalog(data))
            .catch(err => console.error('Erreur chargement armes:', err));
    }, []);

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
        setBlockedEnemies([]);

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

    const showToast = (message, type = 'info') => {
        setToast({
            isVisible: true,
            message,
            type
        });
    };

    const closeToast = () => {
        setToast({
            isVisible: false,
            message: '',
            type: 'info'
        });
    };

    const canDefeatEnemy = (enemyType) => {
        console.log('=== canDefeatEnemy Debug ===');
        console.log('Enemy type:', enemyType);
        console.log('Inventory:', inventory);
        console.log('Weapons catalog:', weaponsCatalog);
        
        // Vérifier si le catalogue des armes est chargé
        if (weaponsCatalog.length === 0) {
            console.warn('Weapons catalog is empty!');
            return false;
        }
        
        const weapons = inventory.filter(item => {
            const weapon = weaponsCatalog.find(w => w.id === item);
            return weapon !== undefined;
        });

        console.log('Weapons in inventory:', weapons);

        for (const weaponId of weapons) {
            const weapon = weaponsCatalog.find(w => w.id === weaponId);
            console.log('Checking weapon:', weapon);
            if (weapon && weapon.canDefeat && weapon.canDefeat.includes(enemyType)) {
                console.log('✅ Can defeat with', weapon.name);
                return true;
            }
        }

        console.log('❌ Cannot defeat');
        return false;
    };

    const confirmCombat = () => {
        if (!pendingCombat) return;

        setDefeatedEnemies(prev => [...prev, pendingCombat.key]);
        setBlockedEnemies(prev => prev.filter(key => key !== pendingCombat.key));
        setPlayerPos({ row: pendingCombat.row, col: pendingCombat.col });
        setPendingCombat(null);
        showToast('Victoire ! Ennemi vaincu !', 'success');
    };

    const cancelCombat = () => {
        setPendingCombat(null);
    };

    const saveScore = (finalTime) => {
        try {
            const existingScores = JSON.parse(localStorage.getItem('highscores') || '[]');
            
            const newScore = {
                id: existingScores.length ? Math.max(...existingScores.map(s => s.id)) + 1 : 1,
                playerName: username,
                score: finalTime,
                moveCount: moveCount + 1,
                createdAt: new Date().toISOString()
            };
            
            existingScores.push(newScore);
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

            if (!hasStarted) {
                setHasStarted(true);
            }

            setMoveCount(prev => prev + 1);
            setTimer(prev => prev + 1);

            switch (cellInfo.type) {
                case 'W':
                    return;

                case 'door': {
                    const hasKey = inventory.includes(`key_${cellInfo.doorColor}`);
                    if (!hasKey) {
                        showToast(`🚪 Porte ${cellInfo.doorColor} verrouillée ! Trouvez la clé.`, 'warning');
                        return;
                    }
                    break;
                }

                case 'enemy':
                    if (!defeatedEnemies.includes(targetKey)) {
                        const enemy = level.enemies.find(e => e.type === cellInfo.enemyType);
                        
                        if (!canDefeatEnemy(cellInfo.enemyType)) {
                            setBlockedEnemies(prev => [...prev, targetKey]);
                            setTimer(prev => prev + TIME_PENALTY);
                            showToast(`⚔️ Arme insuffisante ! +${TIME_PENALTY}s de pénalité`, 'error');
                            return;
                        }

                        // A la bonne arme - vaincre automatiquement l'ennemi
                        setDefeatedEnemies(prev => [...prev, targetKey]);
                        setBlockedEnemies(prev => prev.filter(key => key !== targetKey));
                        showToast(`⚔️ ${enemy?.name} vaincu !`, 'success');
                    }
                    break;

                case 'obstacle':
                    if (!clearedObstacles.includes(targetKey)) {
                        const obstacle = level.obstacles.find(o => o.type === cellInfo.obstacleType);
                        const hasItem = inventory.includes(obstacle?.requiredItem);
                        if (!hasItem) {
                            showToast(`🚧 ${obstacle?.name} ! Besoin de : ${obstacle?.requiredItem}`, 'warning');
                            return;
                        }
                        setClearedObstacles(prev => [...prev, targetKey]);
                    }
                    break;

                case 'key': {
                    const keyId = `key_${cellInfo.keyColor}`;
                    if (!inventory.includes(keyId)) {
                        setInventory(prev => [...prev, keyId]);
                        showToast(`🔑 Clé ${cellInfo.keyColor} récupérée !`, 'success');
                    }
                    break;
                }

                case 'item':
                    if (!inventory.includes(cellInfo.itemId)) {
                        setInventory(prev => [...prev, cellInfo.itemId]);
                        const item = level.items?.find(i => i.id === cellInfo.itemId);
                        showToast(`${item?.icon || '📦'} ${item?.name || cellInfo.itemId} récupéré !`, 'success');
                    }
                    break;
            }

            setPlayerPos({ row: targetRow, col: targetCol });

            if (cellInfo.type === 'E') {
                setIsComplete(true);

                const nextLevel = currentLevelId + 1;
                if (nextLevel <= 4) {
                    showToast('✅ Niveau terminé !', 'success');
                    setTimeout(() => {
                        setCurrentLevelId(nextLevel);
                        setIsComplete(false);
                    }, 2000);
                } else {
                    const finalTime = timer + 1;
                    saveScore(finalTime);
                    
                    showToast('🎉 Tous les niveaux terminés !', 'success');
                    setTimeout(() => navigate('/highscores'), 3000);
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
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <p className="text-2xl">Chargement du niveau {currentLevelId}...</p>
            </div>
        );
    }

    if (!level) {
        return (
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
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-7xl">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        ← Retour
                    </button>

                    <div className="flex-1 text-center">
                        <h1 className="text-2xl md:text-4xl font-bold text-white">
                            Niveau {level.id} - {level.name} | 👤 {username}
                        </h1>
                    </div>

                    <div className="w-24"></div>
                </div>

                <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="bg-blue-900 text-white px-4 py-2 rounded-lg border-2 border-blue-500">
                        <span className="font-bold">⏱️ {formatTime(timer)}</span>
                    </div>
                    <div className="bg-purple-900 text-white px-4 py-2 rounded-lg border-2 border-purple-500">
                        <span className="font-bold">🚶 {moveCount}</span>
                    </div>
                </div>

                {inventory.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-6 py-3 rounded-xl shadow-lg mb-4 border-2 border-purple-500">
                        <div className="flex items-center justify-center flex-wrap gap-3">
                            <span className="font-bold text-lg mr-2">🎒 Inventaire :</span>
                            {inventory.map((item, idx) => {
                                const itemIcons = {
                                    'key_red': '🔴',
                                    'key_blue': '🔵',
                                    'water_bucket': '🪣',
                                    'pickaxe': '⛏️',
                                    'swim_boots': '🥾',
                                    'dagger': '🗡️',
                                    'sword': '⚔️',
                                    'axe': '🪓'
                                };
                                const itemNames = {
                                    'key_red': 'Clé rouge',
                                    'key_blue': 'Clé bleue',
                                    'water_bucket': 'Seau d\'eau',
                                    'pickaxe': 'Pioche',
                                    'swim_boots': 'Bottes',
                                    'dagger': 'Dague',
                                    'sword': 'Épée',
                                    'axe': 'Hache'
                                };
                                const icon = itemIcons[item] || '📦';
                                const name = itemNames[item] || item;

                                return (
                                    <div
                                        key={idx}
                                        className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg border-2 border-purple-400 shadow-md transform hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        <span className="text-xl">{icon}</span>
                                        <span className="text-sm font-medium">{name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Toast de notification */}
                <div className="flex justify-center mb-4 min-h-[60px]">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        isVisible={toast.isVisible}
                        onClose={closeToast}
                    />
                </div>

                <div className="flex justify-center">
                    <Grid
                        level={level}
                        revealed={revealed}
                        playerPos={playerPos}
                        onMove={handleMove}
                        defeatedEnemies={defeatedEnemies}
                        clearedObstacles={clearedObstacles}
                        blockedEnemies={blockedEnemies}
                        inventory={inventory}
                    />
                </div>
            </div>
        </div>
    );
}

export default Game;