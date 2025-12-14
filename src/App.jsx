import { Routes, Route } from 'react-router-dom';
import Menu_jeu from './Menu_jeu.jsx';
import UsernameSelection from './UsernameSelection.jsx';
import Game from './Game.jsx';
import Highscores from './HighScores.jsx';
import './App.css';

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