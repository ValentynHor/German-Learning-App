import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerbsPage from './pages/material/VerbsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verbs" element={<VerbsPage />} />
      </Routes>
    </>
  );
}

export default App;
