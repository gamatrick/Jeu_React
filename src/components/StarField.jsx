import React from 'react';

// Génère un nombre aléatoire entre min et max
const randomBetween = (min, max) => Math.random() * (max - min) + min;

// Génère les propriétés CSS aléatoires pour une étoile
const generateStarStyle = () => ({
    width: `${randomBetween(1, 4)}px`,
    height: `${randomBetween(1, 4)}px`,
    top: `${randomBetween(0, 100)}%`,
    left: `${randomBetween(0, 100)}%`,
    animationDelay: `${randomBetween(0, 3)}s`,
    animationDuration: `${randomBetween(2, 5)}s`
});

// Composant StarField - Affiche un champ d'étoiles animées en arrière-plan
function StarField({ count = 50 }) {
    return (
        <div className="stars-container">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="star"
                    style={generateStarStyle()}
                />
            ))}
        </div>
    );
}

export default StarField;
