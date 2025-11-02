'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<Element | null>, boolean] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<Element>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, JSON.stringify(threshold), root, rootMargin, frozen]);

  return [elementRef, !!entry?.isIntersecting];
}

// Hook más simple para animaciones básicas
export function useInView(options: UseIntersectionObserverOptions = {}) {
  return useIntersectionObserver(options);
}

// Hook para animaciones de scroll con opciones personalizadas
export function useScrollAnimation(threshold: number = 0.1) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin: '0px 0px -100px 0px',
    freezeOnceVisible: true,
  });

  return { ref: ref as React.RefObject<HTMLDivElement>, isVisible: isIntersecting };
}
