import React, { useState } from 'react';
import { Send, Shield, CheckCircle2, DollarSign, Calendar, MapPin, Building, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveBookingInquiry } from '../utils/storageUtils';
import { BookingInquiry } from '../types';

interface BookingFormProps {
  artistName: string;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onInquiryCreated?: (inquiry: BookingInquiry) => void;
}

export default function BookingForm({ artistName, showToast, onInquiryCreated }: BookingFormProps) {
  const [formData, setFormData] = useState({
    promoterName: '',
    organization: '',
    promoterEmail: '',
    promoterPhone: '',
    eventDate: '2026-12-15',
    venueName: '',
    cityCountry: '',
    capacity: 2500,
    offeredBudgetUsd: 125000,
    eventDetails: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedInquiry, setConfirmedInquiry] = useState<BookingInquiry | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.promoterName.trim()) errs.promoterName = 'Promoter name is required.';
    if (!formData.promoterEmail.trim()) {
      errs.promoterEmail = 'Valid business email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.promoterEmail.trim())) {
      errs.promoterEmail = 'Please provide a valid email address.';
    }
    if (!formData.promoterPhone.trim()) errs.promoterPhone = 'Direct telephone / agency line is required.';
    if (!formData.venueName.trim()) errs.venueName = 'Venue name is required.';
    if (!formData.cityCountry.trim()) errs.cityCountry = 'City & Country are required.';
    if (formData.offeredBudgetUsd <= 0) errs.offeredBudgetUsd = 'Please specify proposed budget.';
    if (!formData.agreeTerms) errs.agreeTerms = 'You must confirm booking agent representation terms.';

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Please complete all required booking fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate server-side reCAPTCHA v3 & DB latency
    await new Promise((r) => setTimeout(r, 600));

    try {
      const created = saveBookingInquiry({
        artistName,
        promoterName: formData.promoterName.trim(),
        organization: formData.organization.trim() || undefined,
        promoterEmail: formData.promoterEmail.trim(),
        promoterPhone: formData.promoterPhone.trim(),
        eventDate: formData.eventDate,
        venueName: formData.venueName.trim(),
        cityCountry: formData.cityCountry.trim(),
        capacity: Number(formData.capacity),
        offeredBudgetUsd: Number(formData.offeredBudgetUsd),
        eventDetails: formData.eventDetails.trim(),
      });

      setConfirmedInquiry(created);
      onInquiryCreated?.(created);
      showToast('Tour booking inquiry submitted to representation.', 'success');

      try {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#B99A70', '#92704C', '#1C1D1B'],
        });
      } catch {}
    } catch {
      showToast('Error processing booking submission.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="eyebrow">
            AGENCY REPRESENTATION &middot; TOURING INQUIRIES
          </span>
          <h2 id="booking-heading" style={{ margin: '4px 0 10px 0' }}>
            Book the Artist &amp; Ensemble
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9625rem', maxWidth: '600px', margin: '0 auto' }}>
            For festival headlining, orchestral engagements, hall residencies, and private symposia worldwide. All inquiries routed directly to management.
          </p>
        </div>

        {confirmedInquiry ? (
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-accent-deep)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 400,
                marginBottom: '6px',
              }}
            >
              Inquiry Dispatched to Booking Agency
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Reference ID:{' '}
              <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-deep)' }}>
                {confirmedInquiry.id}
              </strong>
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                maxWidth: '540px',
                margin: '0 auto 28px',
                textAlign: 'left',
                fontSize: '0.84rem',
                display: 'grid',
                gap: '8px',
              }}
            >
              <div>
                Promoter: <strong>{confirmedInquiry.promoterName}</strong> ({confirmedInquiry.organization || 'Independent'})
              </div>
              <div>
                Venue: <strong>{confirmedInquiry.venueName}</strong> &middot; {confirmedInquiry.cityCountry}
              </div>
              <div>
                Target Date: <strong>{confirmedInquiry.eventDate}</strong> &middot; Capacity: {confirmedInquiry.capacity.toLocaleString()} seats
              </div>
              <div>
                Offered Budget: <strong>${confirmedInquiry.offeredBudgetUsd.toLocaleString()} USD</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConfirmedInquiry(null)}
              className="btn btn-secondary"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 36px 40px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Row 1: Promoter & Org */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '18px',
                marginBottom: '18px',
              }}
            >
              <div>
                <label style={labelStyle}>
                  Promoter / Agent Name <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="promoterName"
                  value={formData.promoterName}
                  onChange={handleChange}
                  placeholder="e.g. Sebastian Cole"
                  style={inputStyle(!!errors.promoterName)}
                />
                {errors.promoterName && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.promoterName}</span>}
              </div>

              <div>
                <label style={labelStyle}>Promoter Agency / Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. Horizon Live Entertainment"
                  style={inputStyle(false)}
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '18px',
                marginBottom: '18px',
              }}
            >
              <div>
                <label style={labelStyle}>
                  Business Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="email"
                  name="promoterEmail"
                  value={formData.promoterEmail}
                  onChange={handleChange}
                  placeholder="promoter@agency.com"
                  style={inputStyle(!!errors.promoterEmail)}
                />
                {errors.promoterEmail && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.promoterEmail}</span>}
              </div>

              <div>
                <label style={labelStyle}>
                  Direct Phone / WhatsApp <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="tel"
                  name="promoterPhone"
                  value={formData.promoterPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 019-2834"
                  style={inputStyle(!!errors.promoterPhone)}
                />
                {errors.promoterPhone && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.promoterPhone}</span>}
              </div>
            </div>

            {/* Row 3: Venue, City, Date */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '18px',
                marginBottom: '18px',
              }}
            >
              <div>
                <label style={labelStyle}>
                  Venue Name <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleChange}
                  placeholder="e.g. Symphony Hall"
                  style={inputStyle(!!errors.venueName)}
                />
                {errors.venueName && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.venueName}</span>}
              </div>

              <div>
                <label style={labelStyle}>
                  City &amp; Country <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="cityCountry"
                  value={formData.cityCountry}
                  onChange={handleChange}
                  placeholder="e.g. Amsterdam, Netherlands"
                  style={inputStyle(!!errors.cityCountry)}
                />
                {errors.cityCountry && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.cityCountry}</span>}
              </div>

              <div>
                <label style={labelStyle}>
                  Proposed Event Date <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  style={inputStyle(false)}
                />
              </div>
            </div>

            {/* Row 4: Capacity & Offered Budget */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '18px',
                marginBottom: '22px',
              }}
            >
              <div>
                <label style={labelStyle}>Hall / Festival Capacity (Seats)</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min={100}
                  step={50}
                  style={inputStyle(false)}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Offered Performance Fee (USD) <span style={{ color: 'var(--color-accent-deep)' }}>(${Number(formData.offeredBudgetUsd).toLocaleString()})</span>
                </label>
                <input
                  type="number"
                  name="offeredBudgetUsd"
                  value={formData.offeredBudgetUsd}
                  onChange={handleChange}
                  min={5000}
                  step={5000}
                  style={inputStyle(!!errors.offeredBudgetUsd)}
                />
                {errors.offeredBudgetUsd && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.offeredBudgetUsd}</span>}
              </div>
            </div>

            {/* Technical Rider / Details */}
            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>Event Scope &amp; Production Details</label>
              <textarea
                name="eventDetails"
                value={formData.eventDetails}
                onChange={handleChange}
                rows={4}
                placeholder="Describe ticketing tiering, stage dimensions, acoustic specs, or preferred flight / hospitality rider allowances..."
                style={{
                  ...inputStyle(false),
                  height: 'auto',
                  padding: '12px 14px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* reCAPTCHA & Terms Notice */}
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
                  I confirm that I am an authorized promoter or talent buyer. This inquiry will be routed to agency management and stored locally for audit.
                </span>
              </label>
              {errors.agreeTerms && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.agreeTerms}</span>}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '10px',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <Shield size={12} style={{ color: 'var(--color-success)' }} />
                <span>Protected by automated reCAPTCHA v3 anti-spam defense.</span>
              </div>
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
                  Routing to Booking Management...
                </>
              ) : (
                'Submit Tour Booking Offer'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8125rem',
  fontWeight: 600,
  marginBottom: '6px',
  color: 'var(--color-text-primary)',
};

const inputStyle = (isError: boolean): React.CSSProperties => ({
  width: '100%',
  height: '46px',
  padding: '0 14px',
  backgroundColor: 'var(--color-surface)',
  border: `1px solid ${isError ? 'var(--color-error)' : 'var(--color-border)'}`,
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.875rem',
  color: 'var(--color-text-primary)',
  transition: 'border-color var(--motion-fast) ease',
});

const errorSpanStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  color: 'var(--color-error)',
  fontSize: '0.75rem',
  marginTop: '4px',
  fontWeight: 500,
};
