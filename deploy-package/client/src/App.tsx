import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
const AIContent = lazy(() => import("@/pages/admin/AIContent"));
const AIJobs = lazy(() => import("@/pages/admin/AIJobs"));
const AITools = lazy(() => import("@/pages/admin/AITools"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const Articles = lazy(() => import("@/pages/admin/Articles"));
const Categories = lazy(() => import("@/pages/admin/Categories"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Users = lazy(() => import("@/pages/admin/Users"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import NewsControl from "./pages/admin/NewsControl";
import VisualNewsEditor from "./components/VisualNewsEditor";

function Router() {
  return (
    <Suspense fallback={<div className="container py-12">Cargando...</div>}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/article/:slug" component={ArticleDetail} />

        {/* Admin Routes */}
        <Route path="/admin" component={Dashboard} />
        <Route path="/admin/articles" component={Articles} />
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/analytics" component={Analytics} />
            <Route path="/admin/ai-content" component={AIContent} />
            <Route path="/admin/ai-jobs" component={AIJobs} />
            <Route path="/admin/ai-tools" component={AITools} />
            <Route path="/admin/news-control" component={NewsControl} />
            <Route path="/admin/news-editor" component={VisualNewsEditor} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

