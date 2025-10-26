import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { useTranslation } from 'react-i18next';
import { HomePageBBC } from './pages/HomePageBBC';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPageBBC } from './pages/CategoryPageBBC';
import { DashboardAnalytics } from './pages/admin/DashboardAnalytics';
import { CreateNews } from './pages/admin/CreateNews';
import { AutoNews } from './pages/admin/AutoNews';
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
          <Route path="/admin/dashboard" component={DashboardAnalytics} />
          <Route path="/admin/crear-noticia" component={CreateNews} />
          <Route path="/admin/auto-noticias" component={AutoNews} />
          
          {/* Fallback */}
          <Route path="/:rest*" component={HomePageBBC} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;