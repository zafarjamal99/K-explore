/**
 * LocalStorage Persistence Utilities for K Explore
 * Note: Demonstration data is stored within the user's browser.
 */

const REGISTRATIONS_KEY = 'k_explore_registrations';
const THEME_KEY = 'k_explore_theme';

export function getStoredRegistrations() {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read registrations from localStorage:', error);
    return [];
  }
}

export function saveRegistration(registrationData) {
  try {
    const existing = getStoredRegistrations();

    // Generate unique confirmation ID
    const ticketId = `KX-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const newRecord = {
      ...registrationData,
      id: ticketId,
      registeredAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...existing];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return { success: true, registration: newRecord };
  } catch (error) {
    console.error('Failed to save registration to localStorage:', error);
    return { success: false, error: 'Storage operation failed.' };
  }
}

export function deleteRegistration(registrationId) {
  try {
    const existing = getStoredRegistrations();
    const updated = existing.filter((item) => item.id !== registrationId);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to remove registration:', error);
    return false;
  }
}

export function isAlreadyRegistered(eventId, email) {
  if (!eventId || !email) return false;
  const existing = getStoredRegistrations();
  const normalizedEmail = email.trim().toLowerCase();
  return existing.some(
    (item) => item.eventId === eventId && item.email?.trim().toLowerCase() === normalizedEmail
  );
}

export function getStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // Check system preference fallback
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch (err) {
    return 'light';
  }
}

export function saveStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.warn('Unable to persist theme to localStorage', err);
  }
}
