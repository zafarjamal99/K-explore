import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../../src/hooks/useFavorites';

describe('useFavorites hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with an empty list when localStorage is empty', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.isFavorite('ev-101')).toBe(false);
  });

  it('initializes with existing saved favorites from localStorage', () => {
    localStorage.setItem('k_explore_favorite_events', JSON.stringify(['ev-101', 'ev-202']));
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(['ev-101', 'ev-202']);
    expect(result.current.count).toBe(2);
    expect(result.current.isFavorite('ev-101')).toBe(true);
    expect(result.current.isFavorite('ev-999')).toBe(false);
  });

  it('adds an event to favorites and persists to localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      const isNowActive = result.current.toggleFavorite('ev-symphony');
      expect(isNowActive).toBe(true);
    });

    expect(result.current.favorites).toEqual(['ev-symphony']);
    expect(result.current.count).toBe(1);
    expect(result.current.isFavorite('ev-symphony')).toBe(true);
  });

  it('removes an existing event when toggled again', () => {
    localStorage.setItem('k_explore_favorite_events', JSON.stringify(['ev-symphony', 'ev-cricket']));
    const { result } = renderHook(() => useFavorites());

    act(() => {
      const isNowActive = result.current.toggleFavorite('ev-symphony');
      expect(isNowActive).toBe(false);
    });

    expect(result.current.favorites).toEqual(['ev-cricket']);
    expect(result.current.count).toBe(1);
    expect(result.current.isFavorite('ev-symphony')).toBe(false);
  });
});
