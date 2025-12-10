import { Routes, Route } from 'react-router-dom';
import Menu_jeu from './Menu_jeu.jsx';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Menu jeu</h1>
      <button onClick={() => navigate('/Jeu')}>Jouer</button>
      <button onClick={() => navigate('/')}>Hight score</button>
    </div>
  );
}

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Menu_jeu />} />  
      <Route path="/Jeu" element={<App />} />    
    </Routes>
  );
}

export default App;
export { Main };