import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { HomePageBBC } from './pages/HomePageBBC';
import './styles/globals.css';
import './styles/bbc-style.css';

// Inicializar i18n
import './lib/i18n';

function App() {
  const { i18n } = useTranslation();

  return (
    <HelmetProvider>
      <div className="App">
        <Switch>
          <Route path="/" component={HomePageBBC} />
          <Route path="/en/" component={HomePageBBC} />
          <Route path="/fr/" component={HomePageBBC} />
          <Route path="/pt/" component={HomePageBBC} />
          <Route path="/:rest*" component={HomePageBBC} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;