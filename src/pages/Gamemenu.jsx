import { useNavigate } from 'react-router-dom';
import StarField from '../components/StarField';
import '../styles/Gamemenu.css';


// Composant Menu_jeu - Écran d'accueil principal du jeu
// Affiche le titre du jeu, les options de navigation et un arrière-plan étoilé
function Menu_jeu() {
    const navigate = useNavigate();

    // Navigue vers l'écran de sélection du nom d'utilisateur
    const handleStartGame = () => {
        navigate('/username');
    };

    // Navigue vers l'écran des scores
    const handleViewHighscores = () => {
        navigate('/highscores');
    };

    return (
        <div className="menu-container">
            <StarField count={50} />

            <div className="menu-content">
                <div className="menu-title-section">
                    <h1 className="menu-title">
                        ⚔️ Donjon Mystique
                    </h1>
                    <p className="menu-subtitle">
                        Explorez les profondeurs du royaume oublié
                    </p>
                </div>

                <div className="menu-buttons">
                    <button
                        onClick={handleStartGame}
                        className="menu-button menu-button-play"
                    >
                        <span className="menu-button-content">
                            <span className="menu-button-icon">⚔️</span>
                            <span>Nouvelle Aventure</span>
                        </span>
                    </button>

                    <button
                        onClick={handleViewHighscores}
                        className="menu-button menu-button-highscores"
                    >
                        <span className="menu-button-content">
                            <span className="menu-button-icon">🏆</span>
                            <span>Tableau des Héros</span>
                        </span>
                    </button>
                </div>

                <p className="menu-footer-text">
                    Collectez des armes légendaires, combattez des monstres et devenez une légende
                </p>
            </div>
        </div>
    );
}

export default Menu_jeu;