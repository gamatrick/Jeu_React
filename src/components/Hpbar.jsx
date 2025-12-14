import React from 'react';
import { calculateHPPercentage, getHeartIcon, getHPColorClass } from '../utils/hpHelpers';
import '../styles/Hpbar.css';

const LOW_HP_THRESHOLD = 30;


// Composant HPBar - Affiche la barre de vie du joueur
// Affiche les HP actuels, un indicateur visuel (cœur coloré) et une barre de progression
function HPBar({ currentHP, maxHP }) {
    const hpPercentage = calculateHPPercentage(currentHP, maxHP);
    const heartIcon = getHeartIcon(hpPercentage);
    const colorClass = getHPColorClass(hpPercentage);
    const isLowHP = hpPercentage < LOW_HP_THRESHOLD;

    return (
        <div className="hpbar-container">
            <div className="hpbar-content">
                <div className="hpbar-text-wrapper">
                    <span className="hpbar-text">
                        Vitalité {currentHP} / {maxHP}
                    </span>
                    <span className="hpbar-heart">{heartIcon}</span>
                </div>

                <div className="hpbar-bar-wrapper">
                    <div className="hpbar-bar-bg">
                        <div
                            className={`hpbar-bar-fill ${colorClass}`}
                            style={{ width: `${hpPercentage}%` }}
                        >
                            <div className="hpbar-bar-shine"></div>

                            {isLowHP && (
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