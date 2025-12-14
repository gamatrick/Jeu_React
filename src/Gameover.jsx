import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gameover.css';

/**
 * Composant GameOver - Affiche l'écran de défaite
 * @param {string} username - Nom du joueur
 * @param {number} level - Niveau atteint
 * @param {number} moveCount - Nombre de mouvements
 * @param {number} timeElapsed - Temps écoulé
 */
function GameOver({ username, level, moveCount, timeElapsed }) {
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="gameover-overlay">
            <div className="gameover-card">
                <div className="gameover-content">
                    <div className="gameover-icon">⚰️</div>

                    <h1 className="gameover-title">
                        Défaite
                    </h1>

                    <p className="gameover-subtitle">
                        {username}, votre quête s'achève ici...
                    </p>

                    <div className="gameover-stats">
                        <h2 className="gameover-stats-title">📜 Chronique de votre Aventure</h2>
                        <div className="gameover-stats-list">
                            <div className="gameover-stat-row">
                                <span>Niveau atteint :</span>
                                <span className="gameover-stat-value">{level}</span>
                            </div>
                            <div className="gameover-stat-row">
                                <span>Temps de quête :</span>
                                <span className="gameover-stat-value">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="gameover-stat-row">
                                <span>Pas effectués :</span>
                                <span className="gameover-stat-value">{moveCount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="gameover-buttons">
                        <button
                            onClick={() => window.location.reload()}
                            className="gameover-button gameover-button-restart"
                        >
                            ⚔️ Renaître
                        </button>

                        <button
                            onClick={() => navigate('/')}
                            className="gameover-button gameover-button-home"
                        >
                            🏰 Retour au Château
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameOver;