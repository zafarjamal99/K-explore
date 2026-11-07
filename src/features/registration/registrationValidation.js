/**
 * Registration Validation Rules and Helper Methods
 */
import { isAlreadyRegistered } from '../../utils/storageUtils';

export function validateFullName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters long.';
  }
  if (!/^[a-zA-Z\s\-'.]+$/.test(trimmed)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
  }
  return null;
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  const trimmed = email.trim();
  // Standard RFC 5322 simplified pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g., student@university.edu).';
  }
  return null;
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return 'Phone number is required.';
  }
  const cleanPhone = phone.trim().replace(/[\s\-\(\)]/g, '');
  // Matches 10 digits or 10-14 digits with optional '+' prefix
  const phoneRegex = /^\+?[0-9]{10,14}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return 'Please enter a valid 10-digit phone number.';
  }
  return null;
}

export function validateEventSelection(eventId, availableEvents = []) {
  if (!eventId) {
    return 'Please select an event to register for.';
  }
  if (availableEvents.length > 0) {
    const exists = availableEvents.some((ev) => ev.id === eventId);
    if (!exists) {
      return 'The selected event is invalid or no longer available.';
    }
  }
  return null;
}

export function validateRegistrationForm(formData, availableEvents = []) {
  const errors = {};

  const nameError = validateFullName(formData.fullName);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const eventError = validateEventSelection(formData.eventId, availableEvents);
  if (eventError) errors.eventId = eventError;

  if (!formData.agreeTerms) {
    errors.agreeTerms = 'You must confirm attendance terms to complete registration.';
  }

  // Duplicate Check if basic fields are valid
  if (!errors.email && !errors.eventId) {
    if (isAlreadyRegistered(formData.eventId, formData.email)) {
      errors.email = 'This email address is already registered for the selected event.';
      errors.isDuplicate = true;
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
