import { BookingInquiry, ContactSubmission, TourDate } from '../types';

const INQUIRIES_KEY = 'k_artist_booking_inquiries';
const CONTACTS_KEY = 'k_artist_contact_submissions';
const CUSTOM_TOURS_KEY = 'k_artist_custom_tour_dates';
const REGISTRATIONS_KEY = 'k_explore_registrations';
const THEME_KEY = 'k_explore_theme';

export interface LegacyRegistration {
  id: string;
  eventId: string;
  fullName: string;
  email: string;
  eventTitle?: string;
  registeredAt: string;
}

// -------------------------------------------------------------
// Legacy Registration Helpers (Backward compatibility & tests)
// -------------------------------------------------------------

export function getStoredRegistrations(): LegacyRegistration[] {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRegistration(record: {
  eventId: string;
  fullName?: string;
  email?: string;
  eventTitle?: string;
}): { success: boolean; registration: LegacyRegistration } {
  const existing = getStoredRegistrations();
  const id = `KX-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const newRegistration: LegacyRegistration = {
    id,
    eventId: record.eventId,
    fullName: record.fullName || 'Anonymous Participant',
    email: record.email || '',
    eventTitle: record.eventTitle,
    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([newRegistration, ...existing]));
  return { success: true, registration: newRegistration };
}

export function deleteRegistration(id: string): boolean {
  try {
    const existing = getStoredRegistrations();
    const filtered = existing.filter((r) => r.id !== id);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

export function isAlreadyRegistered(eventId: string, email: string): boolean {
  const existing = getStoredRegistrations();
  return existing.some(
    (r) => r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase()
  );
}

// -------------------------------------------------------------
// Artist & Tour Platform Persistence
// -------------------------------------------------------------

export function getStoredInquiries(): BookingInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookingInquiry(data: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): BookingInquiry {
  const existing = getStoredInquiries();
  const id = `INQ-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const newRecord: BookingInquiry = {
    ...data,
    id,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(INQUIRIES_KEY, JSON.stringify([newRecord, ...existing]));
  return newRecord;
}

export function updateInquiryStatus(id: string, status: BookingInquiry['status']): boolean {
  try {
    const existing = getStoredInquiries();
    const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
}

export function getStoredContacts(): ContactSubmission[] {
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveContactSubmission(data: Omit<ContactSubmission, 'id' | 'createdAt'>): ContactSubmission {
  const existing = getStoredContacts();
  const id = `MSG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const newRecord: ContactSubmission = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(CONTACTS_KEY, JSON.stringify([newRecord, ...existing]));
  return newRecord;
}

export function getCustomTourDates(): TourDate[] {
  try {
    const raw = localStorage.getItem(CUSTOM_TOURS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTourDate(tourDate: TourDate): void {
  const existing = getCustomTourDates();
  localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify([tourDate, ...existing]));
}

export function deleteTourDate(id: string): void {
  const existing = getCustomTourDates();
  localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify(existing.filter((d) => d.id !== id)));
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
