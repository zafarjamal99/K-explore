import { useEffect } from 'react';

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to all elements with class '.reveal'
 * Observes entrance and toggles '.is-visible'
 * Respects prefers-reduced-motion and gracefully falls back if IntersectionObserver is absent
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback if IntersectionObserver is unsupported in the current runtime (e.g., node / jsdom)
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    // If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.10,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal:not(.is-visible)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
