import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately on first render', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('delays updating the debounced value until specified timeout expires', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'alpha' },
    });

    expect(result.current).toBe('alpha');

    // Update the input value
    rerender({ val: 'beta' });

    // Value should still be 'alpha' before 300ms
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('alpha');

    // Advance remaining time
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('beta');
  });

  it('cancels previous pending timers when new value arrives quickly', () => {
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 250), {
      initialProps: { val: 'first' },
    });

    rerender({ val: 'second' });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ val: 'third' });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // 200ms elapsed since first, but only 100ms since 'third'
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('third');
  });
});
