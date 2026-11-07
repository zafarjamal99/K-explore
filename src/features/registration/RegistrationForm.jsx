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
        showToast?.('Registration confirmed successfully.', 'success');

        try {
          confetti({
            particleCount: 70,
            spread: 55,
            origin: { y: 0.6 },
            colors: ['#B99A70', '#92704C', '#1C1D1B', '#F6F3ED'],
          });
        } catch (err) {
          // ignore
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
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-deep)',
              }}
            >
              <Ticket size={18} />
            </div>
            <div>
              <h2
                id="registration-dialog-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {confirmedTicket ? 'Admission Confirmed' : 'Event Registration'}
              </h2>
              <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                {confirmedTicket
                  ? 'Your bespoke digital campus pass is active'
                  : 'Complimentary admission pass &middot; Stored locally'}
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
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
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
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success-bg)',
                    color: 'var(--color-success)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    border: '1px solid rgba(82, 116, 95, 0.3)',
                  }}
                >
                  <CheckCircle2 size={28} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    marginBottom: '4px',
                  }}
                >
                  You are registered.
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                  A copy of this digital invitation has been safely recorded in your browser's LocalStorage.
                </p>
              </div>

              {/* Bespoke Ticket Badge Card */}
              <div
                className="printable-ticket"
                style={{
                  backgroundColor: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px 24px',
                  marginBottom: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                {/* Thin Top Accent Stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'var(--gradient-champagne)',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '18px',
                    borderBottom: '1px dashed var(--color-border)',
                    paddingBottom: '14px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'var(--color-accent-deep)',
                        fontWeight: 700,
                      }}
                    >
                      K EXPLORE &middot; OFFICIAL PASS
                    </span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 400,
                        marginTop: '3px',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {confirmedTicket.eventTitle}
                    </h4>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78125rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--color-accent-deep)',
                      border: '1px solid var(--color-border)',
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
                      width: '96px',
                      height: '96px',
                      backgroundColor: '#FFFFFF',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <QrCode size={70} style={{ color: '#1C1D1B' }} />
                    <span style={{ fontSize: '0.5rem', color: '#696B68', fontWeight: 600, letterSpacing: '0.06em', marginTop: '2px' }}>
                      SCAN AT DESK
                    </span>
                  </div>

                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Registered Attendee
                      </span>
                      <div style={{ fontSize: '0.9625rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {confirmedTicket.fullName}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                        {confirmedTicket.email}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} style={{ color: 'var(--color-accent)' }} />
                        {confirmedTicket.eventDate}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} style={{ color: 'var(--color-accent-deep)' }} />
                        {confirmedTicket.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--color-border)',
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  * Saved in client-side LocalStorage. You may present this digital pass on your screen at the venue reception.
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handlePrintTicket}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  <Download size={15} />
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
            /* Form Fields */
            <form onSubmit={handleSubmit} noValidate>
              {/* Event Selector */}
              <div style={{ marginBottom: '18px' }}>
                <label
                  htmlFor="eventId"
                  style={{
                    display: 'block',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    marginBottom: '6px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Selected Event <span style={{ color: 'var(--color-error)' }}>*</span>
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
                    height: '46px',
                    padding: '0 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: `1px solid ${errors.eventId ? 'var(--color-error)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
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
                    <AlertCircle size={13} /> {errors.eventId}
                  </p>
                )}
              </div>

              {/* Current Event Preview */}
              {currentEvent && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-surface-muted)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '20px',
                    fontSize: '0.78125rem',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span className="badge badge-open" style={{ fontSize: '0.65rem' }}>
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
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    marginBottom: '6px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Participant Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
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
                    height: '46px',
                    padding: '0 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: `1px solid ${errors.fullName ? 'var(--color-error)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                  }}
                />
                {errors.fullName && (
                  <p id="fullName-error" style={errorTextStyle}>
                    <AlertCircle size={13} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
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
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
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
                      height: '46px',
                      padding: '0 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-border)'}`,
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  {errors.email && (
                    <p id="email-error" style={errorTextStyle}>
                      <AlertCircle size={13} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Phone Number <span style={{ color: 'var(--color-error)' }}>*</span>
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
                      height: '46px',
                      padding: '0 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--color-border)'}`,
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  {errors.phone && (
                    <p id="phone-error" style={errorTextStyle}>
                      <AlertCircle size={13} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Department & Year */}
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
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    Academic Faculty / Society
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science"
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="academicYear"
                    style={{
                      display: 'block',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--color-text-primary)',
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
                      height: '46px',
                      padding: '0 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
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
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.45,
                  }}
                >
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    style={{ marginTop: '2px', accentColor: 'var(--color-accent-deep)' }}
                  />
                  <span>
                    I confirm adherence to the university code of conduct and event hall guidelines.
                    I understand this demonstration RSVP is stored within this browser's LocalStorage.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p style={errorTextStyle}>
                    <AlertCircle size={13} /> {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Validating & Confirming...
                  </>
                ) : (
                  'Confirm Free Admission Pass'
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
  color: 'var(--color-error)',
  fontSize: '0.75rem',
  marginTop: '5px',
  fontWeight: 500,
};
