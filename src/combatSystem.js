/**
 * Module de gestion des combats
 * Gère la logique de combat entre le joueur et les ennemis
 */

/**
 * Calcule les dégâts infligés par une arme
 * @param {string} weaponId - ID de l'arme (dagger, sword, axe)
 * @returns {number} - Dégâts de l'arme
 */
export const getWeaponDamage = (weaponId) => {
    const weaponDamages = {
        'dagger': 8,   // Dague : 8 dégâts
        'sword': 15,   // Épée : 15 dégâts
        'axe': 25      // Hache : 25 dégâts
    };
    return weaponDamages[weaponId] || 0;
};

/**
 * Vérifie si le joueur peut combattre un ennemi (a une arme assez puissante)
 * @param {Array} inventory - Inventaire du joueur
 * @param {Array} weaponsCatalog - Catalogue des armes
 * @param {string} enemyType - Type d'ennemi (slime, goblin, orc)
 * @returns {Object} - { canFight: boolean, weapon: Object|null, damage: number }
 */
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

/**
 * Simule un combat entre le joueur et un ennemi
 * @param {number} playerHP - HP actuels du joueur
 * @param {number} weaponDamage - Dégâts de l'arme du joueur
 * @param {Object} enemy - Objet ennemi avec hp et attack
 * @returns {Object} - { victory: boolean, playerHPLost: number, turnsCount: number }
 */
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

/**
 * Calcule les dégâts d'un piège
 * @param {string} trapType - Type de piège
 * @returns {number} - Dégâts du piège
 */
export const getTrapDamage = (trapType) => {
    const trapDamages = {
        'spike': 5,
        'poison': 3,
        'arrow': 8
    };
    return trapDamages[trapType] || 5;
};

/**
 * Génère un message de résultat de combat
 * @param {Object} combatResult - Résultat du combat
 * @param {Object} enemy - Objet ennemi
 * @returns {string} - Message formaté
 */
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