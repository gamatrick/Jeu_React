import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-5xl">
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-4">
                        🏆 High Scores
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Les meilleurs temps pour compléter tous les niveaux
                    </p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-700 mb-6">
                    {scores.length === 0 ? (
                        <p className="text-center text-gray-400 text-xl py-8">
                            Aucun score enregistré pour le moment.
                            <br />
                            Soyez le premier à terminer le jeu !
                        </p>
                    ) : (
                        <div className="overflow-x-auto flex justify-center">
                            <table className="border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-gray-600">
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Nom
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Temps
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Mouvements
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            HP
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((score) => (
                                        <tr
                                            key={score.id}
                                            className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                                        >
                                            <td className="py-5 px-6 text-center">
                                                <span className="text-white font-semibold text-xl">
                                                    {score.playerName}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="text-white font-bold text-2xl">
                                                    {formatTime(score.score)}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="text-white font-bold text-2xl">
                                                    {score.moveCount}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="text-green-400 font-bold text-2xl">
                                                    {score.finalHP || 0}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <span className="text-yellow-400 font-bold text-2xl">
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

                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
                    >
                        ← Retour au menu
                    </button>
                    
                    {scores.length > 0 && (
                        <button
                            onClick={clearScores}
                            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
                        >
                            🗑️ Effacer les scores
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Highscores;