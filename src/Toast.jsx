import React, { useEffect } from 'react';
import './Toast.css';

function Toast({ message, type = 'info', isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getTypeClass = () => {
        switch (type) {
            case 'error':
                return 'toast-error';
            case 'warning':
                return 'toast-warning';
            case 'success':
                return 'toast-success';
            case 'info':
                return 'toast-info';
            default:
                return 'toast-default';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'error':
                return '⚔️';
            case 'warning':
                return '🛡️';
            case 'success':
                return '✨';
            case 'info':
                return '📜';
            default:
                return '💬';
        }
    };

    return (
        <div className={`toast ${getTypeClass()}`}>
            <div className="toast-content">
                <span className="toast-icon">{getIcon()}</span>
                <p className="toast-message">{message}</p>
            </div>
        </div>
    );
}

export default Toast;