import React, { useEffect, useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Clock,
  User,
  Share2,
  CalendarPlus,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldAlert,
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { downloadCalendarEvent } from '../utils/calendarUtils';

export default function EventDetailsModal({
  event,
  onClose,
  onRegisterClick,
  isRegistered = false,
  showToast,
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!event) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast?.('Event link copied to clipboard.', 'success');
    } else {
      showToast?.('Share this event: ' + event.title, 'info');
    }
  };

  const handleCalendarExport = () => {
    downloadCalendarEvent(event);
    showToast?.('Exported .ics calendar file.', 'success');
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div className="details-dialog">
        {/* Cover Image Container */}
        <div
          style={{
            position: 'relative',
            height: '300px',
            backgroundColor: 'var(--color-surface-muted)',
          }}
        >
          <img
            src={
              imgError
                ? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
                : event.image
            }
            alt={event.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.92)',
            }}
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(28, 29, 27, 0.75)',
              color: '#F4F0E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'background var(--motion-fast) ease',
            }}
          >
            <X size={18} />
          </button>

          {/* Category Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '24px',
              backgroundColor: 'rgba(28, 29, 27, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#F4F0E8',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {event.category}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '32px 32px 40px 32px' }}>
          {/* Header Row */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '10px',
                flexWrap: 'wrap',
              }}
            >
              <span className={`badge badge-${event.status}`}>
                {event.status === 'open'
                  ? 'Registration Open'
                  : event.status === 'closing_soon'
                  ? 'Closing Soon'
                  : 'Closed'}
              </span>

              {isRegistered && (
                <span
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-success)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <CheckCircle2 size={13} /> You are registered
                </span>
              )}

              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Users size={13} />
                {event.registeredCount} / {event.totalSeats} Registered
              </span>
            </div>

            <h2
              id="modal-event-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                lineHeight: 1.12,
              }}
            >
              {event.title}
            </h2>
          </div>

          {/* Quick Meta Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              backgroundColor: 'var(--color-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 22px',
              marginBottom: '28px',
              border: '1px solid var(--color-border)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '4px',
                }}
              >
                <Calendar size={13} style={{ color: 'var(--color-accent)' }} />
                Schedule
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {event.displayDate}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '4px',
                }}
              >
                <MapPin size={13} style={{ color: 'var(--color-accent-deep)' }} />
                Venue Location
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {event.venue}
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                {event.campusLocation}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '4px',
                }}
              >
                <Clock size={13} style={{ color: 'var(--color-accent)' }} />
                Admission
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {event.fee}
              </div>
            </div>
          </div>

          {/* Countdown Section */}
          <div
            style={{
              padding: '18px 22px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '28px',
            }}
          >
            <CountdownTimer targetDate={event.date} label="Countdown to Event Commencement" />
          </div>

          {/* Detailed Description */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 500 }}>
              About this Event
            </h3>
            <div
              style={{
                fontSize: '0.9625rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {event.description}
            </div>
          </div>

          {/* Agenda Timeline */}
          {event.agenda && event.agenda.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', fontWeight: 500 }}>
                Program Agenda & Schedule
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  borderLeft: '1px solid var(--color-border)',
                  paddingLeft: '18px',
                  marginLeft: '8px',
                }}
              >
                {event.agenda.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '-23px',
                        top: '6px',
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                    <div
                      style={{
                        fontSize: '0.78125rem',
                        fontWeight: 600,
                        color: 'var(--color-accent-deep)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.time}
                    </div>
                    <div
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speaker Spotlight */}
          {event.speaker && (
            <div
              style={{
                padding: '20px 22px',
                backgroundColor: 'var(--color-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-text-primary)',
                  color: 'var(--color-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={20} />
              </div>
              <div>
                <span className="eyebrow" style={{ marginBottom: '4px', fontSize: '0.6875rem' }}>
                  FEATURED CURATOR / SPEAKER
                </span>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {event.speaker.name}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  {event.speaker.role}
                </div>
                {event.speaker.bio && (
                  <p style={{ fontSize: '0.8125rem', marginTop: '6px', color: 'var(--color-text-secondary)' }}>
                    {event.speaker.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Organizer Info & Rules */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '18px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                padding: '18px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <h4 style={{ fontSize: '0.875rem', marginBottom: '8px' }}>Curated By</h4>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {event.organizer.name}
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                Contact: {event.organizer.email}
              </div>
              <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                Desk: {event.organizer.contact}
              </div>
            </div>

            {event.rules && event.rules.length > 0 && (
              <div
                style={{
                  padding: '18px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <h4
                  style={{
                    fontSize: '0.875rem',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ShieldAlert size={14} style={{ color: 'var(--color-accent-deep)' }} />
                  Guidelines & Prerequisites
                </h4>
                <ul
                  style={{
                    paddingLeft: '18px',
                    fontSize: '0.78125rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {event.rules.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegisterClick(event);
              }}
              className={`btn btn-lg ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
              style={{ flex: '1 1 200px' }}
            >
              {isRegistered ? 'View Registration Ticket' : 'Register for this Event'}
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={handleCalendarExport}
              className="btn btn-secondary btn-lg"
              title="Add event to iCal, Google Calendar, or Outlook"
            >
              <CalendarPlus size={16} />
              Add to Calendar
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary btn-lg"
              title="Share event link"
            >
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
