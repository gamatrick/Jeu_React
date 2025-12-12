import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import HighScores from './HighScores.jsx';
import Menu_jeu from './Menu_jeu.jsx';
import Game from './Game.jsx';
import './App.css';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Menu_jeu />} />  
      <Route path="/jeu" element={<Game />} />
      <Route path="/HighScores" element={<HighScores />} />
    </Routes>
  );
}


export default Main;
