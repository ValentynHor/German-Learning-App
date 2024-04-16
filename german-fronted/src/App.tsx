import './App.css';
import ScrollToHashElement from './ScrollToHashElement ';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerbsPage from './pages/VerbsPage';
import AdminPage from './pages/admin/AdminPage';
import { ModalProvider } from './components/modalWindow/confirmModal/ModalContext';
import ModalWindow from './components/modalWindow/confirmModal/ModalWindow';

function App() {
  return (
    <>
      <ModalProvider>
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verbs" element={<VerbsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <ModalWindow />
      </ModalProvider>
    </>
  );
}

export default App;
