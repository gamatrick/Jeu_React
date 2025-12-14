import { useState } from 'react';

const MIN_USERNAME_LENGTH = 1;
const MAX_USERNAME_LENGTH = 20;

// Hook personnalisé pour gérer la validation du nom d'utilisateur
function useUsernameValidation() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    // Met à jour le nom d'utilisateur et efface les erreurs
    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
        setError('');
    };

    // Valide le nom d'utilisateur
    const validate = () => {
        const trimmedUsername = username.trim();

        if (trimmedUsername.length < MIN_USERNAME_LENGTH) {
            setError(`Veuillez entrer un pseudo (minimum ${MIN_USERNAME_LENGTH} caractère)`);
            return false;
        }

        return true;
    };

    // Sauvegarde le nom d'utilisateur dans le localStorage
    const saveUsername = () => {
        localStorage.setItem('playerUsername', username.trim());
    };

    return {
        username,
        error,
        maxLength: MAX_USERNAME_LENGTH,
        handleUsernameChange,
        validate,
        saveUsername
    };
}

export default useUsernameValidation;
