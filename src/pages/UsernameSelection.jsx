import React from 'react';
import { useNavigate } from 'react-router-dom';
import useUsernameValidation from '../hooks/useUsernameValidation';
import '../styles/Usernameselection.css';


// Composant UsernameSelection - Écran de sélection du nom du joueur
// Permet au joueur de saisir son nom avant de commencer la partie
function UsernameSelection() {
    const navigate = useNavigate();
    const {
        username,
        error,
        maxLength,
        handleUsernameChange,
        validate,
        saveUsername
    } = useUsernameValidation();


    // Gère la soumission du formulaire
    // Valide le nom d'utilisateur et navigue vers le jeu si 
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        saveUsername();
        navigate('/jeu');
    };

    // Navigue vers le menu principal
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="username-container">
            <div className="username-card">
                <div className="username-header">
                    <h1 className="username-title">
                        🛡️ Nom du Héros
                    </h1>
                    <p className="username-subtitle">
                        Quel sera votre nom dans les légendes ?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="username-form">
                    <div className="username-input-group">
                        <label htmlFor="username" className="username-label">
                            Entrez votre nom d'aventurier :
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            placeholder="Votre nom légendaire..."
                            className="username-input"
                            maxLength={maxLength}
                            autoFocus
                        />
                        {error && (
                            <p className="username-error">
                                ⚠️ {error}
                            </p>
                        )}
                        <p className="username-char-count">
                            {username.length}/{maxLength} caractères
                        </p>
                    </div>

                    <div className="username-buttons">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="username-button username-button-back"
                        >
                            ← Retour
                        </button>
                        <button
                            type="submit"
                            className="username-button username-button-submit"
                        >
                            Commencer ⚔️
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UsernameSelection;