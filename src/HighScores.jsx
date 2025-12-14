import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Highscores.css';

function Highscores() {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadHighscores();
    }, []);

    const loadHighscores = () => {
        try {
            const storedScores = JSON.parse(localStorage.getItem('highscores') || '[]');
            // Trier par meilleur score (score le plus élevé)
            const sortedScores = storedScores.sort((a, b) => calculateFinalScore(b) - calculateFinalScore(a));
            setScores(sortedScores);
        } catch (error) {
            console.error('Erreur lors du chargement des scores:', error);
            setScores([]);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    /**
     * Calcule le score final basé sur le temps et les HP
     * Temps a 70% de poids, HP a 30% de poids
     * Score plus élevé = meilleur
     */
    const calculateFinalScore = (scoreData) => {
        const time = scoreData.score || 0;
        const hp = scoreData.finalHP || 0;

        // Composante temps : plus le temps est bas, meilleur c'est
        // Inversé pour que moins de temps = plus de points
        // On utilise 1000 comme base, puis on soustrait le temps
        const timeScore = Math.max(0, 1000 - time);

        // Composante HP : plus de HP restants = meilleur
        // HP sur 100 max
        const hpScore = hp * 10; // Multiplié par 10 pour avoir une échelle de 0-1000

        // Score final : 70% temps + 30% HP
        const finalScore = Math.round(timeScore * 0.7 + hpScore * 0.3);

        return finalScore;
    };

    const clearScores = () => {
        if (window.confirm('Voulez-vous vraiment effacer tous les scores ?')) {
            localStorage.removeItem('highscores');
            setScores([]);
        }
    };

    return (
        <div className="highscores-container">
            <div className="highscores-content">
                <div className="highscores-header">
                    <h1 className="highscores-title">
                        🏆 Hall des Légendes
                    </h1>
                    <p className="highscores-subtitle">
                        Les plus grands héros du royaume
                    </p>
                </div>

                <div className="highscores-card">
                    {scores.length === 0 ? (
                        <div className="highscores-empty">
                            <p className="highscores-empty-title">
                                Le hall est vide...
                            </p>
                            <p className="highscores-empty-subtitle">
                                Soyez le premier héros à graver votre nom dans l'histoire !
                            </p>
                        </div>
                    ) : (
                        <div className="highscores-table-wrapper">
                            <table className="highscores-table">
                                <thead>
                                    <tr>
                                        <th>🛡️ Héros</th>
                                        <th>⏱️ Temps</th>
                                        <th>👣 Pas</th>
                                        <th>💚 Vitalité</th>
                                        <th>⭐ Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((score, index) => (
                                        <tr key={score.id}>
                                            <td>
                                                <div className="highscores-player-cell">
                                                    {index < 3 && (
                                                        <span className="highscores-medal">
                                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                                        </span>
                                                    )}
                                                    <span className="highscores-player-name">
                                                        {score.playerName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="highscores-time">
                                                    {formatTime(score.score)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="highscores-moves">
                                                    {score.moveCount}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="highscores-hp">
                                                    {score.finalHP || 0}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="highscores-score">
                                                    {calculateFinalScore(score)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="highscores-buttons">
                    <button
                        onClick={() => navigate('/')}
                        className="highscores-button highscores-button-back"
                    >
                        ← Retour au Royaume
                    </button>

                    {scores.length > 0 && (
                        <button
                            onClick={clearScores}
                            className="highscores-button highscores-button-clear"
                        >
                            🗑️ Effacer l'Histoire
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Highscores;