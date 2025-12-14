import React, { useEffect } from 'react';

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

    const getTypeStyles = () => {
        switch (type) {
            case 'error':
                return 'bg-red-600 border-red-500';
            case 'warning':
                return 'bg-yellow-600 border-yellow-500';
            case 'success':
                return 'bg-green-600 border-green-500';
            case 'info':
                return 'bg-blue-600 border-blue-500';
            default:
                return 'bg-gray-700 border-gray-600';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'success':
                return '✅';
            case 'info':
                return 'ℹ️';
            default:
                return '💬';
        }
    };

    return (
        <div className={`${getTypeStyles()} text-white px-6 py-3 rounded-lg border-2 shadow-lg animate-bounce-in`}>
            <div className="flex items-center gap-3">
                <span className="text-2xl">{getIcon()}</span>
                <p className="text-lg font-semibold">{message}</p>
            </div>
        </div>
    );
}

export default Toast;