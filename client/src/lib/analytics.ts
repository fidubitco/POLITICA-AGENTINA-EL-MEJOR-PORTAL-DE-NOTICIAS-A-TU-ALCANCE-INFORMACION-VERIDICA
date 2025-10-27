/**
 * 📊 GOOGLE ANALYTICS 4 - ENTERPRISE GRADE
 * Sistema completo de analytics y tracking
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Inicializar Google Analytics 4
 */
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics ID not configured');
    return;
  }

  // Cargar script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inicializar dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // Manejamos pageviews manualmente
    anonymize_ip: true, // GDPR compliance
  });

  console.log('✅ Google Analytics 4 initialized');
};

/**
 * Trackear pageview
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

/**
 * Trackear evento personalizado
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Trackear lectura de artículo
 */
export const trackArticleView = (articleId: string, title: string, category: string): void => {
  trackEvent('view_article', 'engagement', `${category}:${articleId}`);
  
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      item_id: articleId,
      item_name: title,
      item_category: category,
    });
  }
};

/**
 * Trackear tiempo de lectura
 */
export const trackReadingTime = (articleId: string, seconds: number): void => {
  trackEvent('reading_time', 'engagement', articleId, seconds);
};

/**
 * Trackear scroll depth
 */
export const trackScrollDepth = (depth: number): void => {
  trackEvent('scroll_depth', 'engagement', `${depth}%`, depth);
};

/**
 * Trackear búsqueda
 */
export const trackSearch = (searchTerm: string, results: number): void => {
  if (!window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
    search_results: results,
  });
};

/**
 * Trackear compartir en redes sociales
 */
export const trackShare = (platform: string, url: string): void => {
  trackEvent('share', 'social', `${platform}:${url}`);
};

/**
 * Trackear click en categoría
 */
export const trackCategoryClick = (category: string): void => {
  trackEvent('click_category', 'navigation', category);
};

/**
 * Trackear error
 */
export const trackError = (error: string, fatal: boolean = false): void => {
  if (!window.gtag) return;

  window.gtag('event', 'exception', {
    description: error,
    fatal: fatal,
  });
};

/**
 * Hook de React para tracking automático
 */
export const usePageTracking = () => {
  const trackPage = (path: string, title?: string) => {
    trackPageView(path, title);
  };

  return { trackPage };
};

/**
 * Componente para tracking de scroll
 */
export class ScrollTracker {
  private tracked: Set<number> = new Set();
  private articleId: string;

  constructor(articleId: string) {
    this.articleId = articleId;
    this.init();
  }

  private init(): void {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll(): void {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    // Trackear en intervalos de 25%
    const milestones = [25, 50, 75, 100];
    milestones.forEach(milestone => {
      if (scrollPercent >= milestone && !this.tracked.has(milestone)) {
        this.tracked.add(milestone);
        trackScrollDepth(milestone);
      }
    });
  }

  public destroy(): void {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}

/**
 * Tracking de tiempo de lectura
 */
export class ReadingTimeTracker {
  private startTime: number;
  private articleId: string;
  private reported: boolean = false;

  constructor(articleId: string) {
    this.articleId = articleId;
    this.startTime = Date.now();
    this.init();
  }

  private init(): void {
    // Reportar cuando el usuario sale de la página
    window.addEventListener('beforeunload', this.report.bind(this));
    
    // Reportar cada 30 segundos si el usuario sigue leyendo
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.report();
      }
    }, 30000);
  }

  private report(): void {
    if (this.reported) return;
    
    const seconds = Math.round((Date.now() - this.startTime) / 1000);
    if (seconds > 5) { // Solo reportar si leyó más de 5 segundos
      trackReadingTime(this.articleId, seconds);
      this.reported = true;
    }
  }

  public destroy(): void {
    this.report();
    window.removeEventListener('beforeunload', this.report.bind(this));
  }
}

