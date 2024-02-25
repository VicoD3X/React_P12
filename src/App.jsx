import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css';

// Fonction composant App qui sert de point d'entrée pour l'application React
function App() {
  return (
    // Fragment React pour grouper une liste d'enfants sans ajouter de nœuds
    <>
      {/* card */}
      <Router>
        <Routes>
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;


