import React, { useEffect } from 'react';
import { getToastTypeClass, getToastIcon, TOAST_DURATION } from '../utils/toastConfig';
import '../styles/Toast.css';

// Composant Toast - Affiche des notifications temporaires
function Toast({ message, type = 'info', isVisible, onClose }) {
    // Gère la fermeture automatique du toast après un délai
    useEffect(() => {
        if (!isVisible) return;

        const timer = setTimeout(() => {
            onClose();
        }, TOAST_DURATION);

        return () => clearTimeout(timer);
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const typeClass = getToastTypeClass(type);
    const icon = getToastIcon(type);

    return (
        <div className={`toast ${typeClass}`}>
            <div className="toast-content">
                <span className="toast-icon">{icon}</span>
                <p className="toast-message">{message}</p>
            </div>
        </div>
    );
}

export default Toast;