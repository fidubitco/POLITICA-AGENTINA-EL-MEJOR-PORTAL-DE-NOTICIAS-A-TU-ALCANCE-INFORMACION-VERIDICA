import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import './styles/globals.css';

// Inicializar i18n
import './lib/i18n';

function App() {
  const { i18n } = useTranslation();

  return (
    <HelmetProvider>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/en/" component={HomePage} />
          <Route path="/fr/" component={HomePage} />
          <Route path="/pt/" component={HomePage} />
          <Route path="/:rest*" component={HomePage} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;