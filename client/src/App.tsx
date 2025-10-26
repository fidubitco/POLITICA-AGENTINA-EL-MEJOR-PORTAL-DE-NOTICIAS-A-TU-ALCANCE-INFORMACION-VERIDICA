import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { HomePageBBC } from './pages/HomePageBBC';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPageWorking } from './pages/CategoryPageWorking';
import { AdminIndex } from './pages/admin/AdminIndex';
import { AdminDashboardFull } from './pages/admin/AdminDashboardFull';
import { EditArticle } from './pages/admin/EditArticle';
import { CreateNewsEnhanced } from './pages/admin/CreateNewsEnhanced';
import { Candidatos } from './pages/Candidatos';
import { Encuestas } from './pages/Encuestas';
import { ResultadosElectorales } from './pages/ResultadosElectorales';
import { Finanzas } from './pages/Finanzas';
import './styles/design-system.css';
import './styles/globals.css';
import './styles/bbc-style.css';
import './styles/dashboard-premium.css';

// Inicializar i18n
import './lib/i18n';

// Sistema completo funcional - v2.0
function App() {
  const { i18n } = useTranslation();

  return (
    <HelmetProvider>
      <div className="App">
        <Switch>
          {/* Home routes */}
          <Route path="/" component={HomePageBBC} />
          <Route path="/en/" component={HomePageBBC} />
          <Route path="/fr/" component={HomePageBBC} />
          <Route path="/pt/" component={HomePageBBC} />
          
          {/* Article detail routes */}
          <Route path="/noticia/:id" component={ArticleDetailPage} />
          <Route path="/en/noticia/:id" component={ArticleDetailPage} />
          <Route path="/fr/noticia/:id" component={ArticleDetailPage} />
          <Route path="/pt/noticia/:id" component={ArticleDetailPage} />
          
          {/* Category routes - FUNCIONALES */}
          <Route path="/categoria/:category" component={CategoryPageWorking} />
          <Route path="/en/categoria/:category" component={CategoryPageWorking} />
          <Route path="/fr/categoria/:category" component={CategoryPageWorking} />
          <Route path="/pt/categoria/:category" component={CategoryPageWorking} />
          
          {/* Admin routes - FUNCIONALES */}
          <Route path="/admin" component={AdminIndex} />
          <Route path="/admin/dashboard" component={AdminDashboardFull} />
          <Route path="/admin/editar/:id" component={EditArticle} />
          <Route path="/admin/crear-noticia" component={CreateNewsEnhanced} />
          
          {/* Political routes */}
          <Route path="/candidatos" component={Candidatos} />
          <Route path="/encuestas" component={Encuestas} />
          <Route path="/resultados" component={ResultadosElectorales} />
          
          {/* Finance routes */}
          <Route path="/finanzas" component={Finanzas} />
          
          {/* Fallback */}
          <Route path="/:rest*" component={HomePageBBC} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;