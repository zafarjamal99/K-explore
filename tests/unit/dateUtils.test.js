import { describe, it, expect } from 'vitest';
import {
  formatEventDate,
  formatShortDate,
  getCountdown,
  isDeadlinePassed,
} from '../../src/utils/dateUtils';

describe('dateUtils Unit Tests', () => {
  it('formats event date strings legibly', () => {
    const formatted = formatEventDate('2026-11-20T09:00:00');
    expect(formatted).toContain('Nov');
    expect(formatted).toContain('2026');
  });

  it('formats short date objects', () => {
    const short = formatShortDate('2026-11-20T09:00:00');
    expect(short.month).toBe('Nov');
    expect(short.day).toBe(20);
  });

  it('calculates countdown for future dates', () => {
    const futureDate = new Date(Date.now() + 86400000 * 2 + 3600000 * 3).toISOString();
    const countdown = getCountdown(futureDate);
    expect(countdown.isExpired).toBe(false);
    expect(countdown.days).toBeGreaterThanOrEqual(1);
  });

  it('flags expired dates gracefully', () => {
    const pastDate = '2020-01-01T00:00:00';
    const countdown = getCountdown(pastDate);
    expect(countdown.isExpired).toBe(true);
    expect(isDeadlinePassed(pastDate)).toBe(true);
  });
});
