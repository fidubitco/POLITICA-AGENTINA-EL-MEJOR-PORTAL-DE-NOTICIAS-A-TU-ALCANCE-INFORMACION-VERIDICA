import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomeWorldClass } from './pages/HomeWorldClass';
import HomeWorldClassPremium from './pages/HomeWorldClassPremium';
import { HomeSimple } from './pages/HomeSimple';
import NotFoundPage from './pages/NotFoundPage';
import ForbiddenPage from './pages/ForbiddenPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPageWorking } from './pages/CategoryPageWorking';
import { CategoryPage } from './pages/CategoryPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { Login } from './pages/admin/Login';
import { AdminDashboardEnterprise } from './pages/admin/AdminDashboardEnterprise';
import { EditArticle } from './pages/admin/EditArticle';
import NewsEditor from './pages/admin/NewsEditor';
import { CMSEditor } from './pages/admin/CMSEditor';
import { AINewsCreator } from './pages/admin/AINewsCreator';
import { SEOAuditor } from './pages/admin/SEOAuditor';
import { RealTimeAnalytics } from './pages/admin/RealTimeAnalytics';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Candidatos } from './pages/Candidatos';
import { Encuestas } from './pages/Encuestas';
import { ResultadosElectorales } from './pages/ResultadosElectorales';
import { Finanzas } from './pages/Finanzas';
import './styles/design-system.css';
import './styles/globals.css';
import './styles/bbc-style.css';
import './styles/dashboard-premium.css';
import './styles/categories-optimized.css';
import './styles/dark-mode.css';
import './styles/world-class-design.css';

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
    <ThemeProvider>
      <HelmetProvider>
        <div className="App">
      <Switch>
          {/* Home routes - TODOS LOS IDIOMAS */}
          <Route path="/" component={HomeWorldClassPremium} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`home-${lang.code}`} path={`/${lang.code}`} component={HomeWorldClassPremium} />
          ))}
          
          {/* Article detail routes - TODOS LOS IDIOMAS */}
          <Route path="/noticia/:id" component={ArticleDetailPage} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`article-${lang.code}`} path={`/${lang.code}/noticia/:id`} component={ArticleDetailPage} />
          ))}
          
          {/* Category routes - TODOS LOS IDIOMAS */}
          <Route path="/categoria/:category" component={CategoryPageWorking} />
          <Route path="/:category" component={CategoryPage} />
          <Route path="/:category/:slug" component={NewsArticlePage} />
          {supportedLanguages.filter(l => l.code !== 'es').map(lang => (
            <Route key={`category-${lang.code}`} path={`/${lang.code}/categoria/:category`} component={CategoryPageWorking} />
          ))}
          
          {/* Admin routes - PROTECTED */}
          <Route path="/admin/login" component={Login} />
          <Route path="/admin">
            {() => (
              <ProtectedRoute>
                <AdminDashboardEnterprise />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/dashboard">
            {() => (
              <ProtectedRoute>
                <AdminDashboardEnterprise />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/cms">
            {() => (
              <ProtectedRoute>
                <CMSEditor />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/editor">
            {() => (
              <ProtectedRoute>
                <CMSEditor />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/editar/:id">
            {() => (
              <ProtectedRoute>
                <EditArticle />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/editor/:id">
            {() => (
              <ProtectedRoute>
                <NewsEditor />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/crear-noticia">
            {() => (
              <ProtectedRoute>
                <CMSEditor />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/ai-creator">
            {() => (
              <ProtectedRoute>
                <AINewsCreator />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/seo-auditor">
            {() => (
              <ProtectedRoute>
                <SEOAuditor />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/analytics">
            {() => (
              <ProtectedRoute>
                <RealTimeAnalytics />
              </ProtectedRoute>
            )}
          </Route>
          
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
          
          {/* Fallback - Fixed HomeSimple import */}
          {/* Error pages */}
      <Route path="/404" component={NotFoundPage} />
      <Route path="/403" component={ForbiddenPage} />
      
      {/* Catch-all route */}
      <Route path="/:rest*" component={NotFoundPage} />
      </Switch>
        </div>
      </HelmetProvider>
      </ThemeProvider>
  );
}

export default App;