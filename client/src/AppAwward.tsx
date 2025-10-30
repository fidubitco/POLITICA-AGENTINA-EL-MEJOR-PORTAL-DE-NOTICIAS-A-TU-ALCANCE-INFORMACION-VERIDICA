/**
 * 🚀 APP AWWARD - WORLD-CLASS APPLICATION
 * Aplicación simplificada y optimizada con diseño premium
 */

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';
import { ThemeProvider } from './contexts/ThemeContext';
import HomeAwward from './pages/HomeAwward';
import NotFoundPage from './pages/NotFoundPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPageWorking } from './pages/CategoryPageWorking';
import { Login } from './pages/admin/Login';
import AdminPanelAwward from './pages/admin/AdminPanelAwward';
import { ProtectedRoute } from './components/ProtectedRoute';
import './styles/globals.css';
import './lib/i18n';

function AppAwward() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Switch>
          {/* Home */}
          <Route path="/" component={HomeAwward} />
          
          {/* Artículos */}
          <Route path="/noticia/:id" component={ArticleDetailPage} />
          
          {/* Categorías */}
          <Route path="/:category" component={CategoryPageWorking} />
          
          {/* Admin */}
          <Route path="/admin/login" component={Login} />
          <Route path="/admin">
            {() => (
              <ProtectedRoute>
                <AdminPanelAwward />
              </ProtectedRoute>
            )}
          </Route>
          <Route path="/admin/dashboard">
            {() => (
              <ProtectedRoute>
                <AdminPanelAwward />
              </ProtectedRoute>
            )}
          </Route>
          
          {/* 404 */}
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default AppAwward;

