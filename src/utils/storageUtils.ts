import { BookingInquiry, ContactSubmission, TourDate, OrderBooking, DomainEvent, CurrencyCode } from '../types';
import { CURRENCY_RATES } from '../data/multiDomainData';

const INQUIRIES_KEY = 'k_artist_booking_inquiries';
const CONTACTS_KEY = 'k_artist_contact_submissions';
const CUSTOM_TOURS_KEY = 'k_artist_custom_tour_dates';
const REGISTRATIONS_KEY = 'k_explore_registrations';
const BOOKINGS_KEY = 'k_explore_user_bookings';
const CUSTOM_EVENTS_KEY = 'k_explore_custom_events';
const CURRENCY_KEY = 'k_explore_currency';
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

  try {
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([newRegistration, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to save registration:', err);
  }
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
// Multi-Domain Bookings & Currency
// -------------------------------------------------------------

export function getStoredBookings(): OrderBooking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrderBooking(data: Omit<OrderBooking, 'id' | 'bookedAt' | 'qrData'>): OrderBooking {
  const existing = getStoredBookings();
  const id = `KX-BOOKING-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const newBooking: OrderBooking = {
    ...data,
    id,
    bookedAt: new Date().toISOString(),
    qrData: `TICKET-AUTH:${id}-${data.customerEmail}`,
  };

  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([newBooking, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to persist booking to localStorage:', err);
  }
  return newBooking;
}

export function getStoredCurrency(): CurrencyCode {
  try {
    const saved = localStorage.getItem(CURRENCY_KEY) as CurrencyCode;
    if (saved && ['INR', 'USD', 'EUR', 'GBP'].includes(saved)) return saved;
    return 'USD';
  } catch {
    return 'USD';
  }
}

export function saveStoredCurrency(currency: CurrencyCode): void {
  try {
    localStorage.setItem(CURRENCY_KEY, currency);
  } catch {}
}

export function formatPrice(priceUsd: number, currency: CurrencyCode): string {
  const meta = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(priceUsd * meta.rateFromUsd);
  if (currency === 'INR') {
    return `${meta.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${meta.symbol}${converted.toLocaleString()}`;
}

export function getCustomDomainEvents(): DomainEvent[] {
  try {
    const raw = localStorage.getItem(CUSTOM_EVENTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomDomainEvent(event: DomainEvent): void {
  const existing = getCustomDomainEvents();
  try {
    localStorage.setItem(CUSTOM_EVENTS_KEY, JSON.stringify([event, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to save custom event:', err);
  }
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

  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([newRecord, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to save inquiry:', err);
  }
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

  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify([newRecord, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to save contact submission:', err);
  }
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
  try {
    localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify([tourDate, ...existing]));
  } catch (err) {
    console.warn('[Storage] Failed to save tour date:', err);
  }
}

export function deleteTourDate(id: string): void {
  const existing = getCustomTourDates();
  try {
    localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify(existing.filter((d) => d.id !== id)));
  } catch (err) {
    console.warn('[Storage] Failed to delete tour date:', err);
  }
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
