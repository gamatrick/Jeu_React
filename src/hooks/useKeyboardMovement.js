import { useEffect } from 'react';
import { calculateNewPosition, isValidPosition, isMovementKey } from '../utils/movementHelpers';

// Hook personnalisé pour gérer les déplacements au clavier
function useKeyboardMovement(playerPos, level, isGameActive, onMove) {
    useEffect(() => {
        // Gère les pressions de touches du clavier
        const handleKeyPress = (e) => {
            if (!playerPos || !level || !isGameActive) return;

            if (!isMovementKey(e.key)) return;

            const newPos = calculateNewPosition(e.key, playerPos.row, playerPos.col);

            // Vérifier si la position a changé et si elle est valide
            if ((newPos.row !== playerPos.row || newPos.col !== playerPos.col) &&
                isValidPosition(newPos.row, newPos.col, level.rows, level.cols)) {

                e.preventDefault();
                onMove(newPos.row, newPos.col);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playerPos, level, isGameActive, onMove]);
}

export default useKeyboardMovement;
