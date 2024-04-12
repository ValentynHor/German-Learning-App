import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/AnnieUseYourTelescope-Regular.ttf';
import './fonts/SF-Pro-Display-Regular.otf';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
