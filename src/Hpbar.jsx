import React from 'react';

/**
 * Composant HPBar - Affiche la barre de vie du joueur
 * @param {number} currentHP - HP actuels
 * @param {number} maxHP - HP maximum
 */
function HPBar({ currentHP, maxHP }) {
    const hpPercentage = Math.max(0, Math.min(100, (currentHP / maxHP) * 100));
    
    const getHPColor = () => {
        if (hpPercentage > 60) return 'bg-green-500';
        if (hpPercentage > 30) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getHPGlow = () => {
        if (hpPercentage > 60) return 'shadow-green-500/50';
        if (hpPercentage > 30) return 'shadow-yellow-500/50';
        return 'shadow-red-500/50';
    };

    const getHeartIcon = () => {
        if (hpPercentage > 60) return '💚';
        if (hpPercentage > 30) return '💛';
        return '❤️';
    };

    return (
        <div className="bg-gray-800 px-6 py-3 rounded-xl border-2 border-gray-700 shadow-lg">
            <div className="flex items-center gap-4">
                {/* Texte HP + cœur de couleur sur la même ligne */}
                <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg whitespace-nowrap">
                        HP {currentHP} / {maxHP}
                    </span>
                    <span className="text-2xl">{getHeartIcon()}</span>
                </div>

                <div className="flex-1 min-w-[200px]">
                    <div className="relative h-8 bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-600">
                        {/* Barre de HP */}
                        <div
                            className={`h-full ${getHPColor()} transition-all duration-500 ease-out ${getHPGlow()} shadow-lg`}
                            style={{ width: `${hpPercentage}%` }}
                        >
                            {/* Animation de pulsation si HP bas */}
                            {hpPercentage < 30 && (
                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HPBar;