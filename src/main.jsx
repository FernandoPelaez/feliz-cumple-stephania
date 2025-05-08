import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom'; // 👈 CAMBIO AQUÍ
import './index.css';
import App from './App.jsx';
import Sorpresa from './components/Sorpresa.jsx';
import Layout from './components/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="sorpresa" element={<Sorpresa />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
