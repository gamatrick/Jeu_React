import { useNavigate } from 'react-router-dom';
import './Menu_jeu.css';

export default function Menu_jeu() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      {/* Étoiles d'arrière-plan */}
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="menu-content">
        {/* Titre principal */}
        <div className="menu-title-section">
          <h1 className="menu-title">
            ⚔️ Donjon Mystique
          </h1>
          <p className="menu-subtitle">
            Explorez les profondeurs du royaume oublié
          </p>
        </div>

        {/* Boutons */}
        <div className="menu-buttons">
          <button
            onClick={() => navigate('/username')}
            className="menu-button menu-button-play"
          >
            <span className="menu-button-content">
              <span className="menu-button-icon">⚔️</span>
              <span>Nouvelle Aventure</span>
            </span>
          </button>

          <button
            onClick={() => navigate('/highscores')}
            className="menu-button menu-button-highscores"
          >
            <span className="menu-button-content">
              <span className="menu-button-icon">🏆</span>
              <span>Tableau des Héros</span>
            </span>
          </button>
        </div>

        {/* Texte décoratif */}
        <p className="menu-footer-text">
          Collectez des armes légendaires, combattez des monstres et devenez une légende
        </p>
      </div>
    </div>
  );
}