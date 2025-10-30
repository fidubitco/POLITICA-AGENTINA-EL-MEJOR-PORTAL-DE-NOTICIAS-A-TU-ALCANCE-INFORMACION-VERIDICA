import React from 'react';
import ReactDOM from 'react-dom/client';
import AppAwward from './AppAwward';
import './styles/globals.css';
import './lib/i18n';
import './utils/logger';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppAwward />
  </React.StrictMode>
);
