import { describe, it, expect, beforeEach } from 'vitest';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateEventSelection,
  validateRegistrationForm,
} from '../../src/features/registration/registrationValidation';
import { saveRegistration } from '../../src/utils/storageUtils';

describe('registrationValidation Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('validateFullName', () => {
    it('rejects empty or whitespace-only names', () => {
      expect(validateFullName('')).toMatch(/required/i);
      expect(validateFullName('   ')).toMatch(/required/i);
      expect(validateFullName(null)).toMatch(/required/i);
    });

    it('rejects names shorter than 2 characters', () => {
      expect(validateFullName('A')).toMatch(/at least 2 characters/i);
    });

    it('rejects names with invalid digits or symbols', () => {
      expect(validateFullName('John123')).toMatch(/only contain letters/i);
      expect(validateFullName('Maya@Work')).toMatch(/only contain letters/i);
    });

    it('accepts valid full names with hyphens and spaces', () => {
      expect(validateFullName('Maya Bhattacharya')).toBeNull();
      expect(validateFullName('Jean-Pierre Dupont')).toBeNull();
      expect(validateFullName("O'Connor Smith")).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('rejects empty or missing email', () => {
      expect(validateEmail('')).toMatch(/required/i);
      expect(validateEmail('   ')).toMatch(/required/i);
      expect(validateEmail(null)).toMatch(/required/i);
    });

    it('rejects malformed email addresses', () => {
      expect(validateEmail('plainaddress')).toMatch(/valid email/i);
      expect(validateEmail('missingdomain@')).toMatch(/valid email/i);
      expect(validateEmail('@missinguser.com')).toMatch(/valid email/i);
      expect(validateEmail('user@domain')).toMatch(/valid email/i);
    });

    it('accepts valid university and student emails', () => {
      expect(validateEmail('student@university.edu')).toBeNull();
      expect(validateEmail('alex.doe@subdomain.k-explore.org')).toBeNull();
    });
  });

  describe('validatePhone', () => {
    it('rejects empty phone', () => {
      expect(validatePhone('')).toMatch(/required/i);
      expect(validatePhone(null)).toMatch(/required/i);
    });

    it('rejects phone numbers with too few digits', () => {
      expect(validatePhone('12345')).toMatch(/valid 10-digit/i);
    });

    it('rejects phone numbers with letters', () => {
      expect(validatePhone('98765abcde')).toMatch(/valid 10-digit/i);
    });

    it('accepts 10-digit numbers and numbers with standard country codes', () => {
      expect(validatePhone('9876543210')).toBeNull();
      expect(validatePhone('+919876543210')).toBeNull();
      expect(validatePhone('+1 415 555 2671')).toBeNull();
    });
  });

  describe('validateRegistrationForm', () => {
    const mockEvents = [
      { id: 'event-1', title: 'Campus Hackathon' },
      { id: 'event-2', title: 'Music Fest' },
    ];

    it('validates a complete valid form payload', () => {
      const validPayload = {
        fullName: 'Aarav Patel',
        email: 'aarav@university.edu',
        phone: '9876543210',
        eventId: 'event-1',
        agreeTerms: true,
      };

      const { isValid, errors } = validateRegistrationForm(validPayload, mockEvents);
      expect(isValid).toBe(true);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('flags unaccepted terms', () => {
      const payload = {
        fullName: 'Aarav Patel',
        email: 'aarav@university.edu',
        phone: '9876543210',
        eventId: 'event-1',
        agreeTerms: false,
      };

      const { isValid, errors } = validateRegistrationForm(payload, mockEvents);
      expect(isValid).toBe(false);
      expect(errors.agreeTerms).toMatch(/confirm attendance terms/i);
    });

    it('prevents duplicate registration for the same event and email', () => {
      // First registration
      saveRegistration({
        eventId: 'event-1',
        email: 'duplicate@campus.edu',
        fullName: 'Existing User',
      });

      // Attempt to register again
      const payload = {
        fullName: 'Another Person',
        email: 'duplicate@campus.edu',
        phone: '9876543210',
        eventId: 'event-1',
        agreeTerms: true,
      };

      const { isValid, errors } = validateRegistrationForm(payload, mockEvents);
      expect(isValid).toBe(false);
      expect(errors.email).toMatch(/already registered for the selected event/i);
      expect(errors.isDuplicate).toBe(true);
    });
  });
});
