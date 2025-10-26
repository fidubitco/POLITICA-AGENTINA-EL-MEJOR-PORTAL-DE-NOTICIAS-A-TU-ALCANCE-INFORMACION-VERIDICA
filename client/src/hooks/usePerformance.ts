import { useState, useEffect, useCallback, useRef } from 'react';

// ===========================================
// HOOKS DE PERFORMANCE PROFESIONAL
// Optimización avanzada como BBC/NYTimes
// ===========================================

// ===========================================
// HOOK DE LAZY LOADING AVANZADO
// ===========================================
export const useLazyLoading = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, hasLoaded]);

  return { elementRef, isVisible, hasLoaded };
};

// ===========================================
// HOOK DE VIRTUAL SCROLLING
// ===========================================
export const useVirtualScroll = (
  items: any[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight)
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
    ...item,
    index: startIndex + index,
    top: (startIndex + index) * itemHeight
  }));

  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }, []);

  useEffect(() => {
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll, { passive: true });
      return () => containerRef.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef, handleScroll]);

  return {
    containerRef: setContainerRef,
    visibleItems,
    totalHeight,
    startIndex,
    endIndex
  };
};

// ===========================================
// HOOK DE DEBOUNCE AVANZADO
// ===========================================
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// ===========================================
// HOOK DE THROTTLE
// ===========================================
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

// ===========================================
// HOOK DE MEMOIZACIÓN AVANZADA
// ===========================================
export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  const ref = useRef<T | undefined>(undefined);
  const depsRef = useRef<React.DependencyList | undefined>(undefined);

  if (!depsRef.current || !deps.every((dep, i) => dep === depsRef.current![i])) {
    ref.current = callback;
    depsRef.current = deps;
  }

  return ref.current as T;
};

// ===========================================
// HOOK DE PERFORMANCE MONITORING
// ===========================================
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    renderTime: 0,
    isSlow: false
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrame = useRef<number | undefined>(undefined);

  const measurePerformance = useCallback(() => {
    const now = performance.now();
    frameCount.current++;

    if (now - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      
      // Memory usage (if available)
      const memory = (performance as any).memory 
        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        : 0;

      setMetrics(prev => ({
        ...prev,
        fps,
        memory,
        isSlow: fps < 30
      }));

      frameCount.current = 0;
      lastTime.current = now;
    }

    animationFrame.current = requestAnimationFrame(measurePerformance);
  }, []);

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(measurePerformance);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [measurePerformance]);

  return metrics;
};

// ===========================================
// HOOK DE IMAGE OPTIMIZATION
// ===========================================
export const useImageOptimization = (src: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
} = {}) => {
  const [optimizedSrc, setOptimizedSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Generate optimized URL
        const params = new URLSearchParams();
        if (options.width) params.set('w', options.width.toString());
        if (options.height) params.set('h', options.height.toString());
        if (options.quality) params.set('q', options.quality.toString());
        if (options.format) params.set('f', options.format);

        const optimizedUrl = params.toString() 
          ? `${src}?${params.toString()}`
          : src;

        // Preload image
        const img = new Image();
        img.onload = () => {
          setOptimizedSrc(optimizedUrl);
          setIsLoading(false);
        };
        img.onerror = () => {
          setHasError(true);
          setIsLoading(false);
        };
        img.src = optimizedUrl;
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    optimizeImage();
  }, [src, options.width, options.height, options.quality, options.format]);

  return { optimizedSrc, isLoading, hasError };
};

// ===========================================
// HOOK DE INFINITE SCROLL OPTIMIZADO
// ===========================================
export const useInfiniteScroll = (
  fetchMore: () => Promise<void>,
  hasMore: boolean,
  threshold: number = 100
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScroll = useThrottle(() => {
    if (isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, 100);

  const loadMore = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await fetchMore();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading more items');
    } finally {
      setIsLoading(false);
    }
  }, [fetchMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isLoading, error, loadMore };
};

// ===========================================
// HOOK DE CACHE AVANZADO
// ===========================================
export const useCache = <T>(key: string, fetcher: () => Promise<T>, ttl: number = 5 * 60 * 1000) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  const getCachedData = useCallback(() => {
    const cached = cacheRef.current.get(key);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    return null;
  }, [key, ttl]);

  const fetchData = useCallback(async () => {
    const cached = getCachedData();
    if (cached) {
      setData(cached);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const result = await fetcher();
      
      // Cache the result
      cacheRef.current.set(key, {
        data: result,
        timestamp: Date.now()
      });
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, getCachedData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cacheRef.current.delete(key);
    setData(null);
  }, [key]);

  const refresh = useCallback(() => {
    invalidate();
    fetchData();
  }, [invalidate, fetchData]);

  return { data, isLoading, error, invalidate, refresh };
};

// ===========================================
// HOOK DE PRELOADING
// ===========================================
export const usePreload = (urls: string[]) => {
  const [loadedUrls, setLoadedUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const preload = useCallback(async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        setLoadedUrls(prev => [...prev, url]);
      }
    } catch (error) {
      console.warn(`Failed to preload ${url}:`, error);
    }
  }, []);

  useEffect(() => {
    if (urls.length === 0) return;

    setIsLoading(true);
    const preloadPromises = urls.map(url => preload(url));
    
    Promise.allSettled(preloadPromises).finally(() => {
      setIsLoading(false);
    });
  }, [urls, preload]);

  return { loadedUrls, isLoading };
};

// ===========================================
// HOOK DE SERVICE WORKER
// ===========================================
export const useServiceWorker = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      setIsSupported(true);
      
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          setIsRegistered(true);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            setUpdateAvailable(true);
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const updateServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload();
        }
      });
    }
  }, []);

  return { isSupported, isRegistered, updateAvailable, updateServiceWorker };
};
