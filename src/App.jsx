import { Routes, Route } from 'react-router-dom';
import Menu_jeu from './Menu_jeu.jsx';
import Game from './Game.jsx';
import './App.css';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Menu_jeu />} />  
      <Route path="/jeu" element={<Game />} />    
    </Routes>
  );
}

export default Main;
export { Main };