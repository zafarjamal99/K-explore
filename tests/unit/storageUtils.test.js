import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredRegistrations,
  saveRegistration,
  deleteRegistration,
  isAlreadyRegistered,
  getStoredTheme,
  saveStoredTheme,
} from '../../src/utils/storageUtils';

describe('storageUtils Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no registrations exist', () => {
    expect(getStoredRegistrations()).toEqual([]);
  });

  it('saves registration and generates a unique ticket code', () => {
    const record = {
      fullName: 'Siddharth Rao',
      email: 'siddharth@kiit.ac.in',
      eventId: 'k-innovate-hackathon',
      eventTitle: 'K-Innovate',
    };

    const result = saveRegistration(record);
    expect(result.success).toBe(true);
    expect(result.registration.id).toMatch(/^KX-2026-[A-Z0-9]+$/);
    expect(result.registration.fullName).toBe('Siddharth Rao');

    const all = getStoredRegistrations();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(result.registration.id);
  });

  it('detects duplicate registrations case-insensitively', () => {
    saveRegistration({
      fullName: 'Priya Sharma',
      email: 'Priya.Sharma@Campus.Edu',
      eventId: 'dhwani-cultural-night',
    });

    expect(isAlreadyRegistered('dhwani-cultural-night', 'priya.sharma@campus.edu')).toBe(true);
    expect(isAlreadyRegistered('dhwani-cultural-night', 'other@campus.edu')).toBe(false);
    expect(isAlreadyRegistered('other-event', 'priya.sharma@campus.edu')).toBe(false);
  });

  it('deletes an existing registration by ID', () => {
    const r1 = saveRegistration({ eventId: 'ev1', email: 'u1@test.com' });
    const r2 = saveRegistration({ eventId: 'ev2', email: 'u2@test.com' });

    expect(getStoredRegistrations()).toHaveLength(2);

    const deleted = deleteRegistration(r1.registration.id);
    expect(deleted).toBe(true);

    const remaining = getStoredRegistrations();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(r2.registration.id);
  });

  it('persists and retrieves theme selection', () => {
    saveStoredTheme('dark');
    expect(getStoredTheme()).toBe('dark');

    saveStoredTheme('light');
    expect(getStoredTheme()).toBe('light');
  });
});
