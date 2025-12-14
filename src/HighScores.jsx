import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api';
let timer = null;
let time = 0;

function HighScores() {
    const navigate = useNavigate();
    const [highscores, setHighscores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupedScores, setGroupedScores] = useState({});

    useEffect(() => {
        fetchHighscores();
    }, []);

    const fetchHighscores = async () => {
        try {
            const response = await fetch(`${API_URL}/highscores`);
            if (response.ok) {
                const data = await response.json();
                setHighscores(data);
                groupScoresByPlayer(data);
            }
        } catch (error) {
            console.error('Erreur chargement highscores:', error);
        } finally {
            setLoading(false);
        }
    };

    // Grouper les scores par joueur et niveau
    const groupScoresByPlayer = (scores) => {
        const grouped = {};
        scores.forEach(score => {
            if (!grouped[score.playerName]) {
                grouped[score.playerName] = {};
            }
            grouped[score.playerName][score.levelId] = score.score;
        });
        setGroupedScores(grouped);
    };

    const players = Object.keys(groupedScores).sort();
    const levels = [1, 2, 3, 4];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
                <div className="text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-12">
                        🎮 HighScores
                    </h1>
                    <p className="text-xl text-gray-300">Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-6xl">
                <div className="text-center space-y-8 mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider">
                        🎮 HighScores
                    </h1>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl"
                    >
                        ← Retour au menu
                    </button>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <button 
                            onClick={fetchHighscores}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                        >
                             Actualiser
                        </button>
                    </div>

                    {players.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-2xl text-gray-400 mb-4">📭 Aucun highscore</p>
                            <p className="text-gray-500">Terminez un niveau pour apparaître ici !</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left bg-gray-800/50 rounded-xl border border-gray-600">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="p-4 font-bold text-lg text-white min-w-[150px]">👤 Joueur</th>
                                        {levels.map(level => (
                                            <th key={level} className="p-30 font-bold text-lg text-white text-center min-w-[100px] text-gray-400">
                                                 Niv. {level}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player, index) => (
                                        <tr 
                                            key={player}
                                            className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="p-4 font-semibold text-white text-lg">
                                                #{index + 1} {player}
                                            </td>
                                            {levels.map(level => {
                                                const score = groupedScores[player][level];
                                                const cellClass = score 
                                                    ? "p-4 text-center font-bold text-green-400 bg-green-900/30 rounded-lg" 
                                                    : "p-4 text-center text-gray-500";
                                                return (
                                                    <td key={level} className={cellClass}>
                                                        {score !== undefined ? `${score}s` : '—'}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ... reste des fonctions inchangées (Scores, startChrono, stopChrono, saveHighScore)

export function Scores() {
    const navigate = useNavigate();
}

export function startChrono(updateTime) {
    if (!timer) {
        timer = setInterval(() => {
            time++;
            if (typeof updateTime === 'function') {
                updateTime(time);
            } else {
                console.log("Chrono :", time, "s");
            }
        }, 1000);
    }
}

export function stopChrono() {
    clearInterval(timer);
    timer = null;
    console.log("Chrono arrêté à :", time, "s");
    return time;
}

export async function saveHighScore(username, time, levelId) {
    const response = await fetch(`${API_URL}/highscores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerName: username,
            score: Number(time),
            levelId: Number(levelId),
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error('Erreur lors de l\'enregistrement du highscore', response.status, err);
        return null;
    }

    return response.json();
}

export default HighScores;
