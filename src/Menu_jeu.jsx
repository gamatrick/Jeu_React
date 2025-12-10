import { useNavigate } from 'react-router-dom';

export default function Menu_jeu() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-12">
          🎮 Menu Principal
        </h1>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/username')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
          >
            🎯 Jouer
          </button>
          
          <button 
            onClick={() => alert('High scores à venir !')}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-lg transition-colors shadow-lg"
          >
            🏆 High Scores
          </button>
        </div>
      </div>
    </div>
  );
}