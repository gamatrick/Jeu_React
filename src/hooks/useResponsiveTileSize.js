import { useState, useEffect } from 'react';

// Calcule la taille optimale des tuiles en fonction de la largeur d'écran
const calculateTileSize = (screenWidth, maxCols) => {
    if (screenWidth < 400) {
        return Math.min(48, Math.floor((screenWidth - 40) / maxCols));
    }
    if (screenWidth < 640) {
        return Math.min(56, Math.floor((screenWidth - 40) / maxCols));
    }
    if (screenWidth < 1024) {
        return Math.min(64, Math.floor((screenWidth - 60) / maxCols));
    }
    return 64;
};

// Hook personnalisé pour gérer la taille responsive des tuiles
function useResponsiveTileSize(cols) {
    const [tileSize, setTileSize] = useState(() => {
        if (typeof window === 'undefined') return 64;
        return calculateTileSize(window.innerWidth, cols);
    });

    useEffect(() => {
        // Met à jour la taille des tuiles lors du redimensionnement de la fenêtre
        const handleResize = () => {
            setTileSize(calculateTileSize(window.innerWidth, cols));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [cols]);

    return tileSize;
}

export default useResponsiveTileSize;
