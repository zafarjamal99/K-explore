import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  Calendar,
  MapPin,
  QrCode,
  Ticket,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitRegistration } from './registrationService';
import { validateRegistrationForm } from './registrationValidation';

export default function RegistrationForm({
  selectedEvent,
  availableEvents = [],
  onClose,
  onRegistrationSuccess,
  showToast,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: 'School of Computer Science',
    academicYear: 'Sophomore (2nd Year)',
    eventId: selectedEvent ? selectedEvent.id : availableEvents[0]?.id || '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  useEffect(() => {
    if (selectedEvent) {
      setFormData((prev) => ({ ...prev, eventId: selectedEvent.id }));
    }
  }, [selectedEvent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear inline field error on input
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client validation first
    const clientValidation = validateRegistrationForm(formData, availableEvents);
    if (!clientValidation.isValid) {
      setErrors(clientValidation.errors);
      if (clientValidation.errors.isDuplicate) {
        showToast?.('You are already registered for this event with this email address.', 'error');
      } else {
        showToast?.('Please review the highlighted fields in the form.', 'error');
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitRegistration(formData, availableEvents);

      if (result.success) {
        setConfirmedTicket(result.registration);
        onRegistrationSuccess?.(result.registration);
        showToast?.('Registration confirmed successfully!', 'success');

        // Burst celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#243B53', '#C97958', '#1B7A53', '#F5F3EE'],
          });
        } catch (err) {
          // ignore if canvas unavailable
        }
      } else {
        setErrors(result.errors || {});
        if (result.isDuplicate) {
          showToast?.(
            'Duplicate detected: You are already registered for this event with this email.',
            'error'
          );
        } else {
          showToast?.(result.errors?.general || 'Submission failed. Please check form data.', 'error');
        }
      }
    } catch (err) {
      console.error(err);
      showToast?.('An unexpected error occurred while saving your registration.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const currentEvent = availableEvents.find((e) => e.id === formData.eventId) || selectedEvent;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-dialog-title"
    >
      <div className="registration-dialog">
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-brand-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-brand)',
              }}
            >
              <Ticket size={20} />
            </div>
            <div>
              <h2
                id="registration-dialog-title"
                style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}
              >
                {confirmedTicket ? 'Registration Confirmed' : 'Event Registration'}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)', margin: 0 }}>
                {confirmedTicket
                  ? 'Your digital campus access ticket is ready'
                  : 'Complete form to reserve your seat (Free admission)'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--secondary-text)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {confirmedTicket ? (
            /* Confirmation Pass Screen */
            <div className="fade-in">
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--success-bg)',
                    color: 'var(--success-text)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    border: '1px solid var(--success-border)',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '6px' }}>
                  You're Going!
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary-text)' }}>
                  A copy of this registration has been safely persisted to your browser's local storage.
                </p>
              </div>

              {/* Printable Ticket Badge Card */}
              <div
                className="printable-ticket"
                style={{
                  backgroundColor: 'var(--muted-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  marginBottom: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent top stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    backgroundColor: 'var(--accent)',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    borderBottom: '1px dashed var(--border)',
                    paddingBottom: '14px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--accent)',
                        fontWeight: 700,
                      }}
                    >
                      K EXPLORE OFFICIAL PASS
                    </span>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginTop: '2px' }}>
                      {confirmedTicket.eventTitle}
                    </h4>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: 'var(--primary-brand)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {confirmedTicket.id}
                  </div>
                </div>

                {/* QR Code and Attendee Details */}
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Generated QR Pass Vector */}
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: '#FFFFFF',
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-xs)',
                    }}
                  >
                    <QrCode size={76} style={{ color: '#191B1F' }} />
                    <span style={{ fontSize: '0.5625rem', color: '#686B70', fontWeight: 600 }}>
                      SCAN AT DOOR
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--secondary-text)' }}>
                        Attendee:
                      </span>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 700 }}>
                        {confirmedTicket.fullName}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                        {confirmedTicket.email}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} style={{ color: 'var(--accent)' }} />
                        {confirmedTicket.eventDate}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)', marginTop: '2px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} style={{ color: 'var(--primary-brand)' }} />
                        {confirmedTicket.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.75rem',
                    color: 'var(--secondary-text)',
                  }}
                >
                  * Stored in browser LocalStorage. No physical printing mandatory; showing this screen at the venue is accepted.
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={handlePrintTicket}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  <Download size={16} />
                  Print / Save Pass
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form Fields */
            <form onSubmit={handleSubmit} noValidate>
              {/* Event Selector */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="eventId"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Selected Event <span style={{ color: 'var(--error-text)' }}>*</span>
                </label>
                <select
                  id="eventId"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  aria-invalid={!!errors.eventId}
                  aria-describedby={errors.eventId ? 'eventId-error' : undefined}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px',
                    backgroundColor: 'var(--bg-primary)',
                    border: `1px solid ${errors.eventId ? 'var(--error-text)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--primary-text)',
                    cursor: 'pointer',
                  }}
                >
                  {availableEvents.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title} ({ev.category})
                    </option>
                  ))}
                </select>
                {errors.eventId && (
                  <p id="eventId-error" style={errorTextStyle}>
                    <AlertCircle size={14} /> {errors.eventId}
                  </p>
                )}
              </div>

              {/* Event Preview Pill */}
              {currentEvent && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--muted-surface)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '20px',
                    fontSize: '0.8125rem',
                    color: 'var(--secondary-text)',
                  }}
                >
                  <span className="badge badge-open" style={{ fontSize: '0.6875rem' }}>
                    {currentEvent.category}
                  </span>
                  <span>{currentEvent.displayDate}</span>
                </div>
              )}

              {/* Full Name */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="fullName"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  Participant Full Name <span style={{ color: 'var(--error-text)' }}>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Maya Bhattacharya"
                  value={formData.fullName}
                  onChange={handleChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 14px',
                    backgroundColor: 'var(--bg-primary)',
                    border: `1px solid ${errors.fullName ? 'var(--error-text)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--primary-text)',
                  }}
                />
                {errors.fullName && (
                  <p id="fullName-error" style={errorTextStyle}>
                    <AlertCircle size={14} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone in 2 Cols */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Email Address <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: `1px solid ${errors.email ? 'var(--error-text)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--primary-text)',
                    }}
                  />
                  {errors.email && (
                    <p id="email-error" style={errorTextStyle}>
                      <AlertCircle size={14} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Phone Number <span style={{ color: 'var(--error-text)' }}>*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: `1px solid ${errors.phone ? 'var(--error-text)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--primary-text)',
                    }}
                  />
                  {errors.phone && (
                    <p id="phone-error" style={errorTextStyle}>
                      <AlertCircle size={14} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Department & Year for University Context */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <label
                    htmlFor="department"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Academic Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science / Electronics"
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--primary-text)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="academicYear"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                    }}
                  >
                    Academic Standing
                  </label>
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '44px',
                      padding: '0 14px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--primary-text)',
                    }}
                  >
                    <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                    <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                    <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                    <option value="Senior (4th Year)">Senior (4th Year)</option>
                    <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                    <option value="Faculty / Staff">Faculty / Staff</option>
                  </select>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                    color: 'var(--secondary-text)',
                    lineHeight: 1.45,
                  }}
                >
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    style={{ marginTop: '2px', accentColor: 'var(--accent)' }}
                  />
                  <span>
                    I confirm that I will adhere to the venue guidelines and student code of conduct.
                    I acknowledge that this demonstration pass is stored within this browser's LocalStorage.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p style={errorTextStyle}>
                    <AlertCircle size={14} /> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-accent btn-lg"
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Validating & Confirming...
                  </>
                ) : (
                  'Confirm Free Registration'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const errorTextStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: 'var(--error-text)',
  fontSize: '0.78125rem',
  marginTop: '5px',
  fontWeight: 500,
};
