import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- important
import './index.css';
import Menu_jeu from './menu_jeu.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Menu_jeu />
    </BrowserRouter>
  </StrictMode>,
);
