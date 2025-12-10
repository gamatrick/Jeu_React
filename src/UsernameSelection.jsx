import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <>
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-gray-700">
                    <h1 className="text-4xl font-bold text-white text-center mb-8">
                        🎮 Choisir un pseudo
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-white text-lg font-medium mb-2">
                                Votre pseudo :
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError('');
                                }}
                                placeholder="Entrez votre pseudo..."
                                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors text-lg"
                                maxLength={20}
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-2">⚠️ {error}</p>
                            )}
                            <p className="text-gray-400 text-sm mt-2">
                                {username.length}/20 caractères
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
                            >
                                ← Retour
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                            >
                                Jouer →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UsernameSelection;