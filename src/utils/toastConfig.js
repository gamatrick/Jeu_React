// Configuration des types de toast
export const TOAST_TYPES = {
    ERROR: 'error',
    WARNING: 'warning',
    SUCCESS: 'success',
    INFO: 'info'
};

// Durée d'affichage du toast en millisecondes
export const TOAST_DURATION = 2000;

// Mappe les types de toast vers leurs classes CSS
export const TOAST_TYPE_CLASSES = {
    [TOAST_TYPES.ERROR]: 'toast-error',
    [TOAST_TYPES.WARNING]: 'toast-warning',
    [TOAST_TYPES.SUCCESS]: 'toast-success',
    [TOAST_TYPES.INFO]: 'toast-info'
};

// Mappe les types de toast vers leurs icônes
export const TOAST_ICONS = {
    [TOAST_TYPES.ERROR]: '⚔️',
    [TOAST_TYPES.WARNING]: '🛡️',
    [TOAST_TYPES.SUCCESS]: '✨',
    [TOAST_TYPES.INFO]: '📜'
};

// Retourne la classe CSS pour un type de toast donné
export const getToastTypeClass = (type) => {
    return TOAST_TYPE_CLASSES[type] || 'toast-default';
};

// Retourne l'icône pour un type de toast donné
export const getToastIcon = (type) => {
    return TOAST_ICONS[type] || '💬';
};
