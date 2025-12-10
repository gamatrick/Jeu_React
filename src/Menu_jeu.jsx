// sonne de teste

import { useNavigate } from 'react-router-dom';

export default function Menu_jeu() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Menu jeu</h1>
      <button onClick={() => navigate('/Jeu')}>Jouer</button>
    </div>
  );
}
