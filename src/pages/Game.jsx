import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '../components/Grid';
import Toast from '../components/Toast';
import HPBar from '../components/Hpbar';
import GameOver from '../components/Gameover';
import { canFightEnemy, simulateCombat, getCombatMessage } from '../systems/combatSystem';
import { formatTime } from '../utils/timeFormatter';
import { parseCellValue } from '../utils/tileHelpers';
import { hasKey, hasItem, addItemToInventory } from '../utils/inventoryHelpers';
import { getItemIcon, getItemName } from '../utils/itemConfig';
import {
    API_URL,
    createInitialRevealed,
    getTileKey,
    isLastLevel
} from '../utils/levelHelpers';
import useTimer from '../hooks/useTimer';
import useKeyboardMovement from '../hooks/useKeyboardMovement';
import '../styles/Game.css';

const MAX_HP = 100;
const STARTING_HP = 100;
const DAMAGE_MULTIPLIER_NO_WEAPON = 2;
const LEVEL_TRANSITION_DELAY = 2000;
const GAME_END_DELAY = 3000;
const MAX_SCORES_TO_KEEP = 20;


// Composant Game - Composant principal du jeu gérant toute la logique de gameplay
// Gère les niveaux, les déplacements, les combats, l'inventaire et les scores
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
    const [hasStarted, setHasStarted] = useState(false);
    const [moveCount, setMoveCount] = useState(0);
    const [weaponsCatalog, setWeaponsCatalog] = useState([]);
    const [playerHP, setPlayerHP] = useState(STARTING_HP);
    const [isGameOver, setIsGameOver] = useState(false);
    const [toast, setToast] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    });

    const navigate = useNavigate();
    const { timer, incrementTimer } = useTimer(hasStarted && !isComplete && !isGameOver);

    // Vérifie la présence du nom d'utilisateur au montage
    useEffect(() => {
        const savedUsername = localStorage.getItem('playerUsername');
        if (!savedUsername) {
            navigate('/username');
            return;
        }
        setUsername(savedUsername);
    }, [navigate]);

    
    // Charge le catalogue des armes au montage
    useEffect(() => {
        fetch(`${API_URL}/weapons`)
            .then(res => res.json())
            .then(data => setWeaponsCatalog(data))
            .catch(err => console.error('Erreur chargement armes:', err));
    }, []);

    // Charge le niveau quand l'ID change
    useEffect(() => {
        if (username) {
            loadLevel(currentLevelId);
        }
    }, [currentLevelId, username]);

    // Active les contrôles clavier
    useKeyboardMovement(
        playerPos,
        level,
        !isComplete && !isGameOver,
        handleMove
    );

    // Charge un niveau depuis l'API
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

                const revealedData = createInitialRevealed(data.start, data.end);
                setRevealed(revealedData);
                setPlayerPos(data.start);
                setLoading(false);
            })
            .catch(err => {
                console.error('Erreur API:', err);
                setLoading(false);
            });
    };

    // Affiche un toast de notification
    const showToast = (message, type = 'info') => {
        setToast({
            isVisible: true,
            message,
            type
        });
    };

    // Ferme le toast actuel
    const closeToast = () => {
        setToast({
            isVisible: false,
            message: '',
            type: 'info'
        });
    };

    // Fait perdre des HP au joueur
    const takeDamage = (damage) => {
        const newHP = Math.max(0, playerHP - damage);
        setPlayerHP(newHP);

        if (newHP <= 0) {
            setIsGameOver(true);
        }

        return newHP;
    };

    // Sauvegarde le score final dans le localStorage
    const saveScore = (finalTime) => {
        try {
            const existingScores = JSON.parse(localStorage.getItem('highscores') || '[]');

            const newScore = {
                id: existingScores.length ? Math.max(...existingScores.map(s => s.id)) + 1 : 1,
                playerName: username,
                score: finalTime,
                moveCount: moveCount + 1,
                finalHP: playerHP,
                createdAt: new Date().toISOString()
            };

            existingScores.push(newScore);
            const topScores = existingScores.slice(-MAX_SCORES_TO_KEEP);

            localStorage.setItem('highscores', JSON.stringify(topScores));

            console.log('Score sauvegardé avec succès');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du score:', error);
        }
    };

    // Gère l'interaction avec une porte
    const handleDoorInteraction = (cellInfo) => {
        const playerHasKey = hasKey(inventory, cellInfo.doorColor);
        if (!playerHasKey) {
            showToast(`🚪 Porte ${cellInfo.doorColor} verrouillée !`, 'warning');
            return true;
        }
        return false;
    };

    // Gère l'interaction avec un ennemi
    const handleEnemyInteraction = (targetKey, cellInfo) => {
        if (defeatedEnemies.includes(targetKey)) {
            return false;
        }

        const enemy = level.enemies.find(e => e.type === cellInfo.enemyType);
        const fightCheck = canFightEnemy(inventory, weaponsCatalog, cellInfo.enemyType);

        if (!fightCheck.canFight) {
            const damageReceived = enemy.attack * DAMAGE_MULTIPLIER_NO_WEAPON;
            const newHP = takeDamage(damageReceived);

            showToast(`⚔️ Arme insuffisante ! -${damageReceived} HP`, 'error');

            if (newHP <= 0) {
                return true;
            }
            return true;
        }

        const combatResult = simulateCombat(playerHP, fightCheck.damage, enemy);

        if (combatResult.victory) {
            const newHP = takeDamage(combatResult.playerHPLost);

            setDefeatedEnemies(prev => [...prev, targetKey]);
            setBlockedEnemies(prev => prev.filter(key => key !== targetKey));

            showToast(getCombatMessage(combatResult, enemy), 'success');

            if (newHP <= 0) {
                return true;
            }
        } else {
            takeDamage(combatResult.playerHPLost);
            showToast(getCombatMessage(combatResult, enemy), 'error');
            return true;
        }

        return false;
    };

    // Gère l'interaction avec un obstacle
    const handleObstacleInteraction = (targetKey, cellInfo) => {
        if (clearedObstacles.includes(targetKey)) {
            return false;
        }

        const obstacle = level.obstacles.find(o => o.type === cellInfo.obstacleType);
        const playerHasItem = hasItem(inventory, obstacle?.requiredItem);

        if (!playerHasItem) {
            showToast(`🚧 ${obstacle?.name} ! Besoin de : ${obstacle?.requiredItem}`, 'warning');
            return true;
        }

        setClearedObstacles(prev => [...prev, targetKey]);
        return false;
    };

    // Gère la collecte d'une clé
    const handleKeyCollection = (cellInfo) => {
        const keyId = `key_${cellInfo.keyColor}`;
        if (!inventory.includes(keyId)) {
            setInventory(prev => addItemToInventory(prev, keyId));
            showToast(`🔑 Clé ${cellInfo.keyColor} récupérée !`, 'success');
        }
    };

    // Gère la collecte d'un objet
    const handleItemCollection = (cellInfo) => {
        if (!inventory.includes(cellInfo.itemId)) {
            setInventory(prev => addItemToInventory(prev, cellInfo.itemId));
            const item = level.items?.find(i => i.id === cellInfo.itemId);
            showToast(`${item?.icon || '📦'} ${item?.name || cellInfo.itemId} récupéré !`, 'success');
        }
    };

    // Gère l'arrivée à la sortie du niveau
    const handleLevelCompletion = () => {
        setIsComplete(true);

        const nextLevel = currentLevelId + 1;

        if (!isLastLevel(currentLevelId)) {
            showToast('✅ Niveau terminé !', 'success');
            setTimeout(() => {
                setCurrentLevelId(nextLevel);
                setIsComplete(false);
            }, LEVEL_TRANSITION_DELAY);
        } else {
            const finalTime = timer + 1;
            saveScore(finalTime);

            showToast('🎉 Tous les niveaux terminés !', 'success');
            setTimeout(() => navigate('/highscores'), GAME_END_DELAY);
        }
    };

    // Gère le déplacement du joueur vers une tuile cible
    function handleMove(targetRow, targetCol) {
        if (!level || !playerPos || isComplete || isGameOver) return;

        const targetKey = getTileKey(targetRow, targetCol);
        const targetCell = level.grid[targetRow][targetCol];
        const cellInfo = parseCellValue(targetCell);

        setRevealed(prev => ({ ...prev, [targetKey]: true }));

        if (!hasStarted) {
            setHasStarted(true);
        }

        setMoveCount(prev => prev + 1);
        incrementTimer();

        // Gestion des différents types de tuiles
        switch (cellInfo.type) {
            case 'W':
                return;

            case 'door':
                if (handleDoorInteraction(cellInfo)) return;
                break;

            case 'enemy':
                if (handleEnemyInteraction(targetKey, cellInfo)) return;
                break;

            case 'obstacle':
                if (handleObstacleInteraction(targetKey, cellInfo)) return;
                break;

            case 'key':
                handleKeyCollection(cellInfo);
                break;

            case 'item':
                handleItemCollection(cellInfo);
                break;
        }

        setPlayerPos({ row: targetRow, col: targetCol });

        if (cellInfo.type === 'E') {
            handleLevelCompletion();
        }
    }

    // Navigue vers le menu principal
    const handleQuit = () => {
        navigate('/');
    };

    // Affiche l'écran de chargement
    const renderLoadingScreen = () => (
        <div className="game-loading">
            <p className="game-loading-text">Chargement du niveau {currentLevelId}...</p>
        </div>
    );

    // Affiche l'écran d'erreur
    const renderErrorScreen = () => (
        <div className="game-error">
            <div className="game-error-container">
                <p className="game-error-title">❌ Erreur de chargement</p>
                <p className="game-error-subtitle">Vérifiez que l'API tourne sur le bon port</p>
                <button
                    onClick={handleQuit}
                    className="game-error-button"
                >
                    Retour au menu
                </button>
            </div>
        </div>
    );

    // Affiche l'en-tête du jeu avec titre et bouton retour
    const renderHeader = () => (
        <div className="game-header">
            <button
                onClick={handleQuit}
                className="game-quit-button"
            >
                ← Quitter
            </button>

            <div className="game-title-section">
                <h1 className="game-title">
                    {level.name}
                </h1>
                <p className="game-subtitle">
                    Niveau {level.id} • Aventurier : {username}
                </p>
            </div>

            <div className="game-header-spacer"></div>
        </div>
    );

    // Affiche les statistiques du joueur (temps et pas)
    const renderStats = () => (
        <div className="game-stats">
            <div className="game-stat-timer">
                <span>⏱️ {formatTime(timer)}</span>
            </div>
            <div className="game-stat-moves">
                <span>👣 {moveCount}</span>
            </div>
        </div>
    );

    // Affiche l'inventaire du joueur
    const renderInventory = () => {
        if (inventory.length === 0) return null;

        return (
            <div className="game-inventory">
                <div className="game-inventory-content">
                    <span className="game-inventory-title">🎒 Sac d'Aventurier</span>
                    {inventory.map((item, idx) => {
                        const icon = getItemIcon(item);
                        const name = getItemName(item);

                        return (
                            <div
                                key={idx}
                                className="game-inventory-item"
                            >
                                <span className="game-inventory-item-icon">{icon}</span>
                                <span className="game-inventory-item-name">{name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (loading) {
        return renderLoadingScreen();
    }

    if (!level) {
        return renderErrorScreen();
    }

    if (isGameOver) {
        return (
            <GameOver
                username={username}
                level={currentLevelId}
                moveCount={moveCount}
                timeElapsed={timer}
            />
        );
    }

    return (
        <div className="game-container">
            <div className="game-content">
                {renderHeader()}

                <div className="game-hp-container">
                    <HPBar currentHP={playerHP} maxHP={MAX_HP} />
                </div>

                {renderStats()}

                {renderInventory()}

                <div className="game-toast-container">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        isVisible={toast.isVisible}
                        onClose={closeToast}
                    />
                </div>

                <div className="game-grid-container">
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
