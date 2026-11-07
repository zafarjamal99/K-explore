import React, { useState } from 'react';
import { Calendar, MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function EventCard({
  event,
  onSelectEvent,
  onRegisterClick,
  isRegistered = false,
}) {
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

  const statusConfig = {
    open: { label: 'Registration Open', className: 'badge-open' },
    closing_soon: { label: 'Closing Soon', className: 'badge-closing' },
    closed: { label: 'Closed', className: 'badge-closed' },
  };

  const status = statusConfig[event.status] || statusConfig.open;

  return (
    <article
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
      }}
      className="event-card-hover"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = 'var(--primary-brand)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Event Image Banner */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          overflow: 'hidden',
          backgroundColor: 'var(--muted-surface)',
        }}
      >
        <img
          src={imgError ? fallbackImage : event.image}
          alt={event.title}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-slow)',
          }}
        />

        {/* Floating Category Badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backgroundColor: 'rgba(25, 27, 31, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            letterSpacing: '0.03em',
          }}
        >
          {event.category}
        </div>

        {/* Registration Status Pill */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
          }}
        >
          <span className={`badge ${status.className}`}>
            {status.label}
          </span>
        </div>

        {/* Registered Stamp if already registered */}
        {isRegistered && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success-text)',
              border: '1px solid var(--success-border)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <CheckCircle2 size={14} /> Registered
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Date & Countdown */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem',
            color: 'var(--secondary-text)',
            marginBottom: '10px',
            gap: '8px',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              color: 'var(--primary-text)',
            }}
          >
            <Calendar size={14} style={{ color: 'var(--accent)' }} />
            {event.displayDate}
          </span>
          <CountdownTimer targetDate={event.date} compact={true} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.1875rem',
            fontWeight: 700,
            marginBottom: '8px',
            lineHeight: 1.35,
            color: 'var(--primary-text)',
            cursor: 'pointer',
          }}
          onClick={() => onSelectEvent(event)}
        >
          {event.title}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--secondary-text)',
            lineHeight: 1.55,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.shortDescription}
        </p>

        {/* Venue Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            color: 'var(--secondary-text)',
            marginBottom: '16px',
          }}
        >
          <MapPin size={14} style={{ color: 'var(--muted-text)', flexShrink: 0 }} />
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {event.venue}
          </span>
        </div>

        {/* Attendees & Seats Progress */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '14px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontSize: '0.75rem',
            color: 'var(--secondary-text)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Users size={14} />
            {event.registeredCount} / {event.totalSeats} Attendees
          </span>
          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
            {event.fee}
          </span>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}
        >
          <button
            type="button"
            onClick={() => onSelectEvent(event)}
            className="btn btn-secondary btn-sm"
            style={{
              width: '100%',
              fontWeight: 600,
            }}
          >
            Details
          </button>

          <button
            type="button"
            onClick={() => onRegisterClick(event)}
            className={`btn btn-sm ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
            style={{
              width: '100%',
              fontWeight: 600,
            }}
          >
            {isRegistered ? 'Ticket' : 'Register'}
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
