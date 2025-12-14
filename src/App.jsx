import { Routes, Route } from 'react-router-dom';
import Gamemenu from './pages/Gamemenu.jsx';
import UsernameSelection from './pages/UsernameSelection.jsx';
import Game from './pages/Game.jsx';
import Highscores from './pages/Highscores.jsx';
import './styles/App.css';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Gamemenu />} />
      <Route path="/username" element={<UsernameSelection />} />
      <Route path="/jeu" element={<Game />} />
      <Route path="/highscores" element={<Highscores />} />
    </Routes>
  );
}

export default Main;
export { Main };