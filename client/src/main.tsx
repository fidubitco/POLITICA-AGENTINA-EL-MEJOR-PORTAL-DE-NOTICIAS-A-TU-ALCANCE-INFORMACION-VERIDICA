import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Service Worker deshabilitado temporalmente para evitar errores 404
// TODO: Implementar Service Worker correctamente con Workbox

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);