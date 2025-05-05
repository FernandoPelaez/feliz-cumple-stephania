import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Sorpresa from './components/Sorpresa.jsx';
import Layout from './components/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Happy-Birthday-Maria-/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="sorpresa" element={<Sorpresa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
