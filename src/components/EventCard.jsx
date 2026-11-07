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
  const [isHovered, setIsHovered] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';

  const statusConfig = {
    open: { label: 'Open', className: 'badge-open' },
    closing_soon: { label: 'Closing Soon', className: 'badge-closing' },
    closed: { label: 'Closed', className: 'badge-closed' },
  };

  const status = statusConfig[event.status] || statusConfig.open;

  return (
    <article
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${isHovered ? 'var(--color-border-strong)' : 'var(--color-border)'}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform var(--motion-normal) var(--ease-luxury), box-shadow var(--motion-normal) var(--ease-luxury), border-color var(--motion-normal) var(--ease-luxury)',
        boxShadow: isHovered ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Event Photography Frame */}
      <div
        style={{
          position: 'relative',
          height: '210px',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface-muted)',
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
            filter: 'brightness(0.95)',
            transform: isHovered ? 'scale(1.035)' : 'scale(1)',
            transition: 'transform 750ms var(--ease-luxury)',
          }}
        />

        {/* Minimal Category Tag */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backgroundColor: 'rgba(28, 29, 27, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#F4F0E8',
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {event.category}
        </div>

        {/* Status Pill */}
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

        {/* Registered Stamp */}
        {isRegistered && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-success)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <CheckCircle2 size={13} /> Registered
          </div>
        )}
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Date and Countdown */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78125rem',
            color: 'var(--color-text-secondary)',
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
              color: 'var(--color-text-primary)',
            }}
          >
            <Calendar size={13} style={{ color: 'var(--color-accent)' }} />
            {event.displayDate}
          </span>
          <CountdownTimer targetDate={event.date} compact={true} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '10px',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
          onClick={() => onSelectEvent(event)}
        >
          {event.title}
        </h3>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.84rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.58,
            marginBottom: '18px',
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
            fontSize: '0.78125rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '16px',
          }}
        >
          <MapPin size={13} style={{ color: 'var(--color-accent-deep)', flexShrink: 0 }} />
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

        {/* Attendees & Admission Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '14px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <Users size={13} />
            {event.registeredCount} / {event.totalSeats} Attendees
          </span>
          <span style={{ fontWeight: 600, color: 'var(--color-accent-deep)' }}>
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
            style={{ width: '100%', fontWeight: 500 }}
          >
            Details
          </button>

          <button
            type="button"
            onClick={() => onRegisterClick(event)}
            className={`btn btn-sm ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
            style={{ width: '100%', fontWeight: 600 }}
          >
            <span>{isRegistered ? 'Ticket' : 'Register'}</span>
            <ArrowUpRight
              size={14}
              style={{
                transform: isHovered ? 'translate(2px, -2px)' : 'none',
                transition: 'transform 200ms ease',
              }}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
