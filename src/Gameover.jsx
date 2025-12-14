import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-md w-full border-4 border-red-600 p-8">
                <div className="text-center">
                    <div className="text-8xl mb-6 animate-pulse">💀</div>
                    
                    <h1 className="text-5xl font-bold text-red-500 mb-4">
                        GAME OVER
                    </h1>
                    
                    <p className="text-gray-300 text-xl mb-8">
                        {username}, vous avez été vaincu...
                    </p>

                    <div className="bg-gray-900 rounded-lg p-6 mb-8 border-2 border-gray-700">
                        <h2 className="text-white font-bold text-lg mb-4">📊 Statistiques</h2>
                        <div className="space-y-2 text-left">
                            <div className="flex justify-between text-gray-300">
                                <span>Niveau atteint :</span>
                                <span className="font-bold text-white">{level}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Temps écoulé :</span>
                                <span className="font-bold text-white">{formatTime(timeElapsed)}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                                <span>Mouvements :</span>
                                <span className="font-bold text-white">{moveCount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
                        >
                            🔄 Recommencer
                        </button>
                        
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white text-xl font-semibold rounded-lg transition-colors"
                        >
                            🏠 Menu principal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameOver;