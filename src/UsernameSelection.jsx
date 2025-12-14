import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsernameSelection.css';

function UsernameSelection() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim().length === 0) {
            setError('Veuillez entrer un pseudo (minimum 1 caractère)');
            return;
        }

        localStorage.setItem('playerUsername', username.trim());

        navigate('/jeu');
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
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            placeholder="Votre nom légendaire..."
                            className="username-input"
                            maxLength={20}
                            autoFocus
                        />
                        {error && (
                            <p className="username-error">
                                ⚠️ {error}
                            </p>
                        )}
                        <p className="username-char-count">
                            {username.length}/20 caractères
                        </p>
                    </div>

                    <div className="username-buttons">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
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