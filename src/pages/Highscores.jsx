import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../utils/timeFormatter';
import {
    calculateFinalScore,
    loadScoresFromStorage,
    clearScoresFromStorage,
    getMedalForPosition
} from '../utils/scoreHelpers';
import '../styles/Highscores.css';

// Composant Highscores - Affiche le tableau des meilleurs scores
// Montre les statistiques de toutes les parties terminées triées par score
function Highscores() {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    // Charge les scores au montage du composant
    useEffect(() => {
        loadHighscores();
    }, []);

    // Charge et trie les scores depuis le localStorage
    const loadHighscores = () => {
        const loadedScores = loadScoresFromStorage();
        setScores(loadedScores);
    };

    // Efface tous les scores après confirmation de l'utilisateur
    const handleClearScores = () => {
        if (window.confirm('Voulez-vous vraiment effacer tous les scores ?')) {
            clearScoresFromStorage();
            setScores([]);
        }
    };

    // Navigue vers le menu principal
    const handleBackToMenu = () => {
        navigate('/');
    };

    // Affiche un message quand aucun score n'existe
    const renderEmptyState = () => (
        <div className="highscores-empty">
            <p className="highscores-empty-title">
                Le hall est vide...
            </p>
            <p className="highscores-empty-subtitle">
                Soyez le premier héros à graver votre nom dans l'histoire !
            </p>
        </div>
    );

    // Affiche une ligne du tableau de scores
    const renderScoreRow = (score, index) => {
        const medal = getMedalForPosition(index);

        return (
            <tr key={score.id}>
                <td>
                    <div className="highscores-player-cell">
                        {medal && (
                            <span className="highscores-medal">
                                {medal}
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
        );
    };

    // Affiche le tableau complet des scores
    const renderScoresTable = () => (
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
                    {scores.map((score, index) => renderScoreRow(score, index))}
                </tbody>
            </table>
        </div>
    );

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
                    {scores.length === 0 ? renderEmptyState() : renderScoresTable()}
                </div>

                <div className="highscores-buttons">
                    <button
                        onClick={handleBackToMenu}
                        className="highscores-button highscores-button-back"
                    >
                        ← Retour au Royaume
                    </button>

                    {scores.length > 0 && (
                        <button
                            onClick={handleClearScores}
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
