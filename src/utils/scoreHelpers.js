// Configuration du système de scoring
const SCORE_WEIGHTS = {
    TIME: 0.7,  // 70% du score basé sur le temps
    HP: 0.3     // 30% du score basé sur les HP restants
};

const MAX_TIME_SCORE = 1000;
const HP_MULTIPLIER = 10;

// Calcule le score final basé sur le temps et les HP
export const calculateFinalScore = (scoreData) => {
    const time = scoreData.score || 0;
    const hp = scoreData.finalHP || 0;

    const timeScore = Math.max(0, MAX_TIME_SCORE - time);
    const hpScore = hp * HP_MULTIPLIER;

    const finalScore = Math.round(
        timeScore * SCORE_WEIGHTS.TIME +
        hpScore * SCORE_WEIGHTS.HP
    );

    return finalScore;
};

// Trie les scores par score final décroissant
export const sortScoresByFinal = (scores) => {
    return [...scores].sort((a, b) => calculateFinalScore(b) - calculateFinalScore(a));
};

// Charge les scores depuis le localStorage
export const loadScoresFromStorage = () => {
    try {
        const storedScores = JSON.parse(localStorage.getItem('highscores') || '[]');
        return sortScoresByFinal(storedScores);
    } catch (error) {
        console.error('Erreur lors du chargement des scores:', error);
        return [];
    }
};

// Efface tous les scores du localStorage
export const clearScoresFromStorage = () => {
    localStorage.removeItem('highscores');
};

// Retourne la médaille pour une position donnée
export const getMedalForPosition = (index) => {
    const medals = {
        0: '🥇',
        1: '🥈',
        2: '🥉'
    };
    return medals[index] || null;
};
