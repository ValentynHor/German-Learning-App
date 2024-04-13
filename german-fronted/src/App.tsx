import './App.css';
import ScrollToHashElement from './ScrollToHashElement ';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerbsPage from './pages/VerbsPage';

function App() {
  return (
    <>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verbs" element={<VerbsPage />} />
      </Routes>
    </>
  );
}

export default App;
