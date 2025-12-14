import { useState, useEffect, useRef } from 'react';

// Hook personnalisé pour gérer le chronomètre du jeu
function useTimer(isActive) {
    const [timer, setTimer] = useState(0);
    const timerIntervalRef = useRef(null);

    // Démarre ou arrête le timer en fonction de isActive
    useEffect(() => {
        if (isActive) {
            timerIntervalRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [isActive]);

    // Réinitialise le timer à zéro
    const resetTimer = () => {
        setTimer(0);
    };

    // Incrémente manuellement le timer d'une seconde
    const incrementTimer = () => {
        setTimer(prev => prev + 1);
    };

    return {
        timer,
        resetTimer,
        incrementTimer
    };
}

export default useTimer;
