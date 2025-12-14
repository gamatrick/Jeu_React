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
            // Trier par meilleur temps (score le plus bas)
            const sortedScores = storedScores.sort((a, b) => a.score - b.score);
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
                        <div className="display: flex text-center">
                            <table className="w-full border-collapse mx-auto margin-right: auto margin-left: auto">
                                <thead>
                                    <tr className="border-b-2 border-gray-600 text-center ">
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Nom
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Temps
                                        </th>
                                        <th className="text-center py-4 px-6 text-gray-300 font-bold text-xl">
                                            Mouvements
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((score, index) => (
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