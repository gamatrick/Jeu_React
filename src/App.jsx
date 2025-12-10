import { Routes, Route } from 'react-router-dom';
import Menu_jeu from './menu_jeu.jsx';
import Jeu from './Jeu.jsx';
import './App.css'
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

function Main() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu_jeu />} />
        <Route path="/Jeu" element={<App/>} />
      </Routes>
    </>
  )
}

export default App
export { Main }
