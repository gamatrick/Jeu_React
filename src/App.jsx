import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HighScores from './HighScores.jsx';
import Menu_jeu from './Menu_jeu.jsx';
import UsernameSelection from './UsernameSelection.jsx';
import Game from './Game.jsx';
import './App.css';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Menu_jeu />} />
      <Route path="/username" element={<UsernameSelection />} />
      <Route path="/jeu" element={<Game />} /> 
      <Route path="/highscores" element={<HighScores />} />   
    </Routes>
  );
}


export default Main;
export { Main }
