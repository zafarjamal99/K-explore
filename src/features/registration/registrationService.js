/**
 * Registration Service
 * Manages validation, persistence, and ticket pass creation
 */
import { validateRegistrationForm } from './registrationValidation';
import { saveRegistration } from '../../utils/storageUtils';

export async function submitRegistration(formData, availableEvents = []) {
  // Simulate standard client-side async process
  await new Promise((resolve) => setTimeout(resolve, 450));

  const validation = validateRegistrationForm(formData, availableEvents);
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      isDuplicate: !!validation.errors.isDuplicate,
    };
  }

  const selectedEvent = availableEvents.find((e) => e.id === formData.eventId);

  const registrationRecord = {
    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    department: formData.department?.trim() || 'General Admission',
    academicYear: formData.academicYear || 'Undergraduate',
    eventId: formData.eventId,
    eventTitle: selectedEvent ? selectedEvent.title : 'Campus Event',
    eventDate: selectedEvent ? selectedEvent.displayDate : '',
    venue: selectedEvent ? selectedEvent.venue : '',
    category: selectedEvent ? selectedEvent.category : 'General',
  };

  const saveResult = saveRegistration(registrationRecord);

  if (!saveResult.success) {
    return {
      success: false,
      errors: { general: 'Failed to save registration to browser storage.' },
    };
  }

  return {
    success: true,
    registration: saveResult.registration,
  };
}
