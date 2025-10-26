import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './contexts/AuthContext';
import { HomePageBBC } from './pages/HomePageBBC';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPageBBC } from './pages/CategoryPageBBC';
import { DashboardAnalytics } from './pages/admin/DashboardAnalytics';
import { DashboardEnhanced } from './pages/admin/DashboardEnhanced';
import { CreateNews } from './pages/admin/CreateNews';
import { CreateNewsEnhanced } from './pages/admin/CreateNewsEnhanced';
import { AutoNews } from './pages/admin/AutoNews';
import { PoliticalAdmin } from './pages/admin/PoliticalAdmin';
import { Candidatos } from './pages/Candidatos';
import { Encuestas } from './pages/Encuestas';
import { ResultadosElectorales } from './pages/ResultadosElectorales';
import { Finanzas } from './pages/Finanzas';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import './styles/design-system.css';
import './styles/globals.css';
import './styles/bbc-style.css';
import './styles/dashboard-premium.css';

// Inicializar i18n
import './lib/i18n';

function App() {
  const { i18n } = useTranslation();

  return (
    <HelmetProvider>
      <AuthProvider>
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
          
          {/* Category routes */}
          <Route path="/categoria/:category" component={CategoryPageBBC} />
          <Route path="/en/categoria/:category" component={CategoryPageBBC} />
          <Route path="/fr/categoria/:category" component={CategoryPageBBC} />
          <Route path="/pt/categoria/:category" component={CategoryPageBBC} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" component={DashboardEnhanced} />
          <Route path="/admin/dashboard-simple" component={DashboardAnalytics} />
          <Route path="/admin/crear-noticia" component={CreateNewsEnhanced} />
          <Route path="/admin/crear-noticia-simple" component={CreateNews} />
          <Route path="/admin/auto-noticias" component={AutoNews} />
          <Route path="/admin/politica" component={PoliticalAdmin} />
          
          {/* Auth routes */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
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
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;