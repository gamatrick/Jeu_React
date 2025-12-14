import React from 'react';
import './Hpbar.css';

/**
 * Composant HPBar - Affiche la barre de vie du joueur
 * @param {number} currentHP - HP actuels
 * @param {number} maxHP - HP maximum
 */
function HPBar({ currentHP, maxHP }) {
    const hpPercentage = Math.max(0, Math.min(100, (currentHP / maxHP) * 100));

    const getHPColorClass = () => {
        if (hpPercentage > 60) return 'hpbar-bar-fill-high';
        if (hpPercentage > 30) return 'hpbar-bar-fill-medium';
        return 'hpbar-bar-fill-low';
    };

    const getHeartIcon = () => {
        if (hpPercentage > 60) return '💚';
        if (hpPercentage > 30) return '💛';
        return '❤️';
    };

    return (
        <div className="hpbar-container">
            <div className="hpbar-content">
                {/* Texte HP + cœur de couleur */}
                <div className="hpbar-text-wrapper">
                    <span className="hpbar-text">
                        Vitalité {currentHP} / {maxHP}
                    </span>
                    <span className="hpbar-heart">{getHeartIcon()}</span>
                </div>

                {/* Barre de vie fantasiste */}
                <div className="hpbar-bar-wrapper">
                    <div className="hpbar-bar-bg">
                        {/* Barre de HP avec gradient */}
                        <div
                            className={`hpbar-bar-fill ${getHPColorClass()}`}
                            style={{ width: `${hpPercentage}%` }}
                        >
                            {/* Effet de brillance */}
                            <div className="hpbar-bar-shine"></div>

                            {/* Animation de pulsation si HP bas */}
                            {hpPercentage < 30 && (
                                <div className="hpbar-bar-pulse"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HPBar;