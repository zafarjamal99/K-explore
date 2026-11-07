import React, { useState } from 'react';
import { Send, Shield, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { saveContactSubmission } from '../utils/storageUtils';
import { ContactSubmission } from '../types';

interface ContactFormProps {
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onContactCreated?: (contact: ContactSubmission) => void;
}

export default function ContactForm({ showToast, onContactCreated }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'General' as ContactSubmission['category'],
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.fullName.trim()) errs.fullName = 'Your full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject line is required.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters in your message.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Please correct form errors.', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 450));

    try {
      const created = saveContactSubmission({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        category: formData.category,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setIsSuccess(true);
      onContactCreated?.(created);
      showToast('Message sent to management office.', 'success');
      setFormData({
        fullName: '',
        email: '',
        category: 'General',
        subject: '',
        message: '',
      });
    } catch {
      showToast('Failed to submit message.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="eyebrow">DIRECT COMMUNICATIONS</span>
          <h2 id="contact-heading" style={{ margin: '4px 0 10px 0' }}>
            Contact Management &amp; Press Desk
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9625rem', maxWidth: '560px', margin: '0 auto' }}>
            For interview inquiries, sync &amp; film score licensing, festival curation, and fan community assistance.
          </p>
        </div>

        {isSuccess ? (
          <div
            style={{
              padding: '36px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-card)',
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
                marginBottom: '16px',
              }}
            >
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
              Message Received
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Thank you. Our artist management team typically responds within 24 to 48 business hours.
            </p>
            <button type="button" onClick={() => setIsSuccess(false)} className="btn btn-secondary btn-sm">
              Send Another Note
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
                  Your Name <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Clara Schumann"
                  style={inputStyle(!!errors.fullName)}
                />
                {errors.fullName && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.fullName}</span>}
              </div>

              <div>
                <label style={labelStyle}>
                  Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="clara@example.com"
                  style={inputStyle(!!errors.email)}
                />
                {errors.email && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.email}</span>}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '18px',
                marginBottom: '18px',
              }}
            >
              <div>
                <label style={labelStyle}>Inquiry Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  style={inputStyle(false)}
                >
                  <option value="General">General Inquiry</option>
                  <option value="Press & Media">Press &amp; Media Credentials</option>
                  <option value="Licensing">Sync &amp; Film Licensing</option>
                  <option value="VIP Fan Club">VIP Fan Club &amp; Merch</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  Subject Line <span style={{ color: 'var(--color-error)' }}>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of message"
                  style={inputStyle(!!errors.subject)}
                />
                {errors.subject && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.subject}</span>}
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={labelStyle}>
                Message <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your note to artist management..."
                style={{ ...inputStyle(!!errors.message), height: 'auto', padding: '12px 14px' }}
              />
              {errors.message && <span style={errorSpanStyle}><AlertCircle size={13} /> {errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Dispatching Message...
                </>
              ) : (
                'Send Message'
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
