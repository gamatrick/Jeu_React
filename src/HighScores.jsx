import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:4000/api';
let timer = null;
let time = 0;



function HighScores()
{
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-8">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-12">
                    🎮 High Scores
                </h1>
                <button onClick={() => navigate('/')}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                            ← Retour
                        </button>
            </div>
        </div>
    );
}


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
  try {
    const response = await fetch(`${API_URL}/highscores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName: username,
        score: time,
        levelId: levelId,
      }),
    });

    if (!response.ok) {
      console.error(
        "Erreur lors de l'enregistrement du highscore",
        response.status
      );
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur réseau lors de l'enregistrement du highscore",
      error
    );
    return null;
  }
}


export default HighScores;