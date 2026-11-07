import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Clock, CheckCircle2, Printer, Download, Sparkles, QrCode } from 'lucide-react';
import { TourDate } from '../types';
import { downloadTourIcs } from '../utils/calendarUtils';

interface TicketRsvpModalProps {
  tour: TourDate;
  artistName: string;
  onClose: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function TicketRsvpModal({
  tour,
  artistName,
  onClose,
  showToast,
}: TicketRsvpModalProps) {
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [passTier, setPassTier] = useState<'General Admission' | 'Golden Circle' | 'VIP Soundcheck'>('General Admission');
  const [generatedPassId, setGeneratedPassId] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      showToast('Please provide your name and email to issue the pass.', 'error');
      return;
    }
    const passCode = `VNC-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedPassId(passCode);
    showToast(`Pass issued for ${guestName}!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCalendar = () => {
    downloadTourIcs(tour, artistName);
    showToast('Calendar invite (.ics) downloaded.', 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-surface"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '16px',
          border: '1px solid var(--color-champagne)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45)',
          padding: '0',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface)',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>
              OFFICIAL CONCERT PASS &middot; 2026
            </span>
            <h3 id="ticket-modal-title" style={{ margin: '4px 0 0 0', fontSize: '1.25rem' }}>
              {artistName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket pass dialog"
            className="btn btn-secondary"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {!generatedPassId ? (
            /* RSVP Generation Form */
            <form onSubmit={handleGeneratePass}>
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'var(--color-stone)',
                  marginBottom: '20px',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '6px' }}>
                  {tour.venue}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                  <MapPin size={14} />
                  <span>{tour.city}{tour.state ? `, ${tour.state}` : ''}, {tour.country}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    {new Date(tour.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    Doors: {tour.doorTime || '7:00 PM'} &middot; Show: {tour.showTime || '8:00 PM'}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Passholder Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Montgomery"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Email Address (for Digital Delivery) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '8px' }}>
                  Access Tier
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {(['General Admission', 'Golden Circle', 'VIP Soundcheck'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setPassTier(tier)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: passTier === tier ? '2px solid var(--color-champagne)' : '1px solid var(--color-border)',
                        background: passTier === tier ? 'var(--color-stone)' : 'transparent',
                        color: 'var(--color-text)',
                        fontWeight: passTier === tier ? 600 : 400,
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Sparkles size={16} />
                Generate Official Digital Pass
              </button>
            </form>
          ) : (
            /* Ticket Pass Card Preview */
            <div>
              <div
                style={{
                  border: '2px dashed var(--color-champagne)',
                  borderRadius: '14px',
                  padding: '24px',
                  background: 'var(--color-surface)',
                  position: 'relative',
                  marginBottom: '24px',
                }}
              >
                {/* Perforated Notch accents */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>
                      NOCTURNE COLLECTIVE ARCHIVE
                    </span>
                    <h4 style={{ margin: '4px 0 0 0', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                      {artistName}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                      The Solstice World Tour &middot; Official Pass
                    </p>
                  </div>
                  <span className="badge badge-open">{passTier}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                      Passholder
                    </span>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{guestName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                      Pass ID
                    </span>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-champagne)' }}>
                      #{generatedPassId}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                      Date & Time
                    </span>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {new Date(tour.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &middot; {tour.doorTime || '7:00 PM'}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>
                      Venue & City
                    </span>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                      {tour.venue}, {tour.city}
                    </div>
                  </div>
                </div>

                {/* Barcode & Security Hologram */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'var(--color-text)',
                        color: 'var(--color-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                      }}
                    >
                      <QrCode size={32} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      <div>VALIDATED ENTRY</div>
                      <div style={{ fontFamily: 'monospace' }}>SEC-AUTH-2026-OK</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} /> Confirmed
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary"
                  style={{ flex: 1, minWidth: '140px', justifyContent: 'center' }}
                >
                  <Printer size={16} /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '140px', justifyContent: 'center' }}
                >
                  <Download size={16} /> Add to Calendar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
