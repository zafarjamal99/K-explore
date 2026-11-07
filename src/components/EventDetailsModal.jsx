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
    // Lock scroll on background
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
      showToast?.('Event link copied to clipboard!', 'success');
    } else {
      showToast?.('Share this event with your friends: ' + event.title, 'info');
    }
  };

  const handleCalendarExport = () => {
    downloadCalendarEvent(event);
    showToast?.('Downloaded .ics calendar file for this event.', 'success');
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
            height: '280px',
            backgroundColor: 'var(--muted-surface)',
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
            }}
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 27, 31, 0.75)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'background var(--transition-fast)',
            }}
          >
            <X size={20} />
          </button>

          {/* Category Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              backgroundColor: 'rgba(25, 27, 31, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            {event.category}
          </div>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '28px 24px 36px 24px' }}>
          {/* Header Row: Title & Status */}
          <div style={{ marginBottom: '20px' }}>
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
                    backgroundColor: 'var(--success-bg)',
                    color: 'var(--success-text)',
                    border: '1px solid var(--success-border)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle2 size={14} /> You are registered
                </span>
              )}

              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--secondary-text)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Users size={14} />
                {event.registeredCount} / {event.totalSeats} Registered
              </span>
            </div>

            <h2
              id="modal-event-title"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'var(--primary-text)',
                lineHeight: 1.25,
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
              backgroundColor: 'var(--muted-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              marginBottom: '28px',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--secondary-text)',
                  marginBottom: '4px',
                }}
              >
                <Calendar size={14} style={{ color: 'var(--accent)' }} />
                Date & Time
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--primary-text)' }}>
                {event.displayDate}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--secondary-text)',
                  marginBottom: '4px',
                }}
              >
                <MapPin size={14} style={{ color: 'var(--primary-brand)' }} />
                Venue Location
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--primary-text)' }}>
                {event.venue}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                {event.campusLocation}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--secondary-text)',
                  marginBottom: '4px',
                }}
              >
                <Clock size={14} style={{ color: 'var(--accent)' }} />
                Deadline
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--primary-text)' }}>
                {event.fee}
              </div>
            </div>
          </div>

          {/* Countdown Section */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              marginBottom: '28px',
            }}
          >
            <CountdownTimer targetDate={event.date} label="Countdown to Event Commencement" />
          </div>

          {/* Detailed Description */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.1875rem', marginBottom: '12px', fontWeight: 700 }}>
              About this Event
            </h3>
            <div
              style={{
                fontSize: '0.9625rem',
                color: 'var(--secondary-text)',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {event.description}
            </div>
          </div>

          {/* Agenda Timeline if available */}
          {event.agenda && event.agenda.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.1875rem', marginBottom: '14px', fontWeight: 700 }}>
                Program Agenda & Schedule
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderLeft: '2px solid var(--border)',
                  paddingLeft: '16px',
                  marginLeft: '8px',
                }}
              >
                {event.agenda.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: '-22px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                      }}
                    />
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        marginBottom: '2px',
                      }}
                    >
                      {item.time}
                    </div>
                    <div
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--primary-text)',
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speaker / Curator Spotlight */}
          {event.speaker && (
            <div
              style={{
                padding: '18px 20px',
                backgroundColor: 'var(--muted-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-brand)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={22} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: 'var(--accent)',
                  }}
                >
                  Featured Speaker / Judge
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-text)' }}>
                  {event.speaker.name}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)', fontWeight: 500 }}>
                  {event.speaker.role}
                </div>
                {event.speaker.bio && (
                  <p style={{ fontSize: '0.8125rem', marginTop: '6px', color: 'var(--secondary-text)' }}>
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
            {/* Organizer */}
            <div
              style={{
                padding: '16px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4 style={{ fontSize: '0.9375rem', marginBottom: '8px' }}>Organized By</h4>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-text)' }}>
                {event.organizer.name}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)', marginTop: '4px' }}>
                Email: {event.organizer.email}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                Help Desk: {event.organizer.contact}
              </div>
            </div>

            {/* Rules */}
            {event.rules && event.rules.length > 0 && (
              <div
                style={{
                  padding: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <h4
                  style={{
                    fontSize: '0.9375rem',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <ShieldAlert size={16} style={{ color: 'var(--accent)' }} />
                  Guidelines & Requirements
                </h4>
                <ul
                  style={{
                    paddingLeft: '18px',
                    fontSize: '0.8125rem',
                    color: 'var(--secondary-text)',
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
              borderTop: '1px solid var(--border)',
              paddingTop: '24px',
            }}
          >
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegisterClick(event);
              }}
              className={`btn btn-lg ${isRegistered ? 'btn-outline' : 'btn-accent'}`}
              style={{ flex: '1 1 200px' }}
            >
              {isRegistered ? 'View Registration Ticket' : 'Register for this Event'}
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={handleCalendarExport}
              className="btn btn-secondary btn-lg"
              title="Add event to iCal, Google Calendar, or Outlook"
            >
              <CalendarPlus size={18} />
              Add to Calendar
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary btn-lg"
              title="Share event link"
            >
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
