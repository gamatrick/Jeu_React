import { useNavigate } from "react-router-dom";


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

let timer = null;
let time = 0;

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


export default HighScores;