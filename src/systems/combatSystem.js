// Module de gestion des combats
// Gère la logique de combat entre le joueur et les ennemis

// Calcule les dégâts infligés par une arme
export const getWeaponDamage = (weaponId) => {
    const weaponDamages = {
        'dagger': 8,
        'sword': 15,
        'axe': 25
    };
    return weaponDamages[weaponId] || 0;
};

// Vérifie si le joueur peut combattre un ennemi (a une arme assez puissante)
export const canFightEnemy = (inventory, weaponsCatalog, enemyType) => {
    // Trouver toutes les armes dans l'inventaire
    const playerWeapons = inventory.filter(item => {
        const weapon = weaponsCatalog.find(w => w.id === item);
        return weapon !== undefined;
    });

    // Chercher la meilleure arme qui peut vaincre cet ennemi
    let bestWeapon = null;
    let maxDamage = 0;

    for (const weaponId of playerWeapons) {
        const weapon = weaponsCatalog.find(w => w.id === weaponId);
        if (weapon && weapon.canDefeat && weapon.canDefeat.includes(enemyType)) {
            const damage = getWeaponDamage(weaponId);
            if (damage > maxDamage) {
                maxDamage = damage;
                bestWeapon = weapon;
            }
        }
    }

    return {
        canFight: bestWeapon !== null,
        weapon: bestWeapon,
        damage: maxDamage
    };
};

// Simule un combat entre le joueur et un ennemi
export const simulateCombat = (playerHP, weaponDamage, enemy) => {
    let currentPlayerHP = playerHP;
    let currentEnemyHP = enemy.hp;
    let turns = 0;

    // Combat tour par tour
    while (currentPlayerHP > 0 && currentEnemyHP > 0) {
        turns++;
        
        // Le joueur attaque en premier
        currentEnemyHP -= weaponDamage;
        
        // Si l'ennemi est vaincu, le combat s'arrête
        if (currentEnemyHP <= 0) {
            break;
        }
        
        // L'ennemi contre-attaque
        currentPlayerHP -= enemy.attack;
    }

    const playerHPLost = playerHP - Math.max(0, currentPlayerHP);
    const victory = currentEnemyHP <= 0;

    return {
        victory,
        playerHPLost,
        turnsCount: turns,
        remainingPlayerHP: Math.max(0, currentPlayerHP)
    };
};

// Calcule les dégâts d'un piège
export const getTrapDamage = (trapType) => {
    const trapDamages = {
        'spike': 5,
        'poison': 3,
        'arrow': 8
    };
    return trapDamages[trapType] || 5;
};

// Génère un message de résultat de combat
export const getCombatMessage = (combatResult, enemy) => {
    if (combatResult.victory) {
        return `⚔️ Victoire contre ${enemy.name} !\n\n` +
               `Tours de combat : ${combatResult.turnsCount}\n` +
               `HP perdus : ${combatResult.playerHPLost}\n` +
               `HP restants : ${combatResult.remainingPlayerHP}`;
    } else {
        return `💀 Défaite contre ${enemy.name} !\n\n` +
               `Vous avez été vaincu...\n` +
               `Game Over`;
    }
};