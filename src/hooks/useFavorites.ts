import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'k_explore_favorite_events';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const item = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to persist favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((eventId: string) => {
    let nowActive = false;
    setFavorites((prev) => {
      if (prev.includes(eventId)) {
        nowActive = false;
        return prev.filter((id) => id !== eventId);
      } else {
        nowActive = true;
        return [...prev, eventId];
      }
    });
    return nowActive;
  }, []);

  const isFavorite = useCallback(
    (eventId: string) => favorites.includes(eventId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, count: favorites.length };
}
