import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch, useLocation } from 'wouter';
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
import { supportedLanguages } from './lib/i18n';

// Sistema completo funcional - v3.0 MULTI-LANGUAGE
function App() {
  const { i18n } = useTranslation();
  const [location] = useLocation();

  // Detectar idioma desde URL y actualizar i18n
  useEffect(() => {
    const pathParts = location.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    
    const langCode = supportedLanguages.find(l => l.code === firstPart)?.code;
    if (langCode && i18n.language !== langCode) {
      i18n.changeLanguage(langCode);
    } else if (!langCode && i18n.language !== 'es') {
      i18n.changeLanguage('es');
    }
  }, [location, i18n]);

  return (
    <HelmetProvider>
      <div className="App">
        <Switch>
          {/* Home routes - TODOS LOS IDIOMAS */}
          <Route path="/" component={HomePageBBC} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`home-${lang.code}`} path={`/${lang.code}`} component={HomePageBBC} />
          ))}
          
          {/* Article detail routes - TODOS LOS IDIOMAS */}
          <Route path="/noticia/:id" component={ArticleDetailPage} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`article-${lang.code}`} path={`/${lang.code}/noticia/:id`} component={ArticleDetailPage} />
          ))}
          
          {/* Category routes - TODOS LOS IDIOMAS */}
          <Route path="/categoria/:category" component={CategoryPageWorking} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`category-${lang.code}`} path={`/${lang.code}/categoria/:category`} component={CategoryPageWorking} />
          ))}
          
          {/* Admin routes - FUNCIONALES */}
          <Route path="/admin" component={AdminIndex} />
          <Route path="/admin/dashboard" component={AdminDashboardFull} />
          <Route path="/admin/editar/:id" component={EditArticle} />
          <Route path="/admin/crear-noticia" component={CreateNewsEnhanced} />
          
          {/* Political routes - TODOS LOS IDIOMAS */}
          <Route path="/candidatos" component={Candidatos} />
          <Route path="/encuestas" component={Encuestas} />
          <Route path="/resultados" component={ResultadosElectorales} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <React.Fragment key={`political-${lang.code}`}>
              <Route path={`/${lang.code}/candidatos`} component={Candidatos} />
              <Route path={`/${lang.code}/encuestas`} component={Encuestas} />
              <Route path={`/${lang.code}/resultados`} component={ResultadosElectorales} />
            </React.Fragment>
          ))}
          
          {/* Finance routes - TODOS LOS IDIOMAS */}
          <Route path="/finanzas" component={Finanzas} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`finance-${lang.code}`} path={`/${lang.code}/finanzas`} component={Finanzas} />
          ))}
          
          {/* Fallback */}
          <Route path="/:rest*" component={HomePageBBC} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;