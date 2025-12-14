import { Routes, Route } from 'react-router-dom';
import Menu_jeu from './pages/Menu_jeu.jsx';
import UsernameSelection from './pages/UsernameSelection.jsx';
import Game from './pages/Game.jsx';
import Highscores from './pages/Highscores.jsx';
import './styles/App.css';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Menu_jeu />} />
      <Route path="/username" element={<UsernameSelection />} />
      <Route path="/jeu" element={<Game />} />
      <Route path="/highscores" element={<Highscores />} />
    </Routes>
  );
}

export default Main;
export { Main };