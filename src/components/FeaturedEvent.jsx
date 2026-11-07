import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function FeaturedEvent({
  event,
  onSelectEvent,
  onRegisterClick,
  isRegistered = false,
}) {
  const [imgError, setImgError] = useState(false);

  if (!event) return null;

  return (
    <section
      aria-labelledby="featured-event-heading"
      className="reveal"
      style={{ marginBottom: '64px' }}
    >
      <div style={{ marginBottom: '16px' }}>
        <span className="eyebrow">
          CURATOR'S SPOTLIGHT
        </span>
      </div>

      <div className="featured-card">
        {/* Dominant Photographic Visual */}
        <div
          style={{
            position: 'relative',
            minHeight: '340px',
            backgroundColor: 'var(--color-surface-muted)',
            overflow: 'hidden',
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
              filter: 'brightness(0.94)',
              transition: 'transform 800ms var(--ease-luxury)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.035)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />

          {/* Minimal Category Tag */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
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

          {isRegistered && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-success)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <CheckCircle2 size={15} /> Confirmed Registration
            </div>
          )}
        </div>

        {/* Content Column */}
        <div
          style={{
            padding: '36px 36px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '14px',
                fontSize: '0.84rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                <Calendar size={15} style={{ color: 'var(--color-accent)' }} />
                {event.displayDate}
              </span>
            </div>

            <h3
              id="featured-event-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 400,
                lineHeight: 1.12,
                marginBottom: '14px',
                color: 'var(--color-text-primary)',
              }}
            >
              {event.title}
            </h3>

            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.62,
                marginBottom: '20px',
              }}
            >
              {event.shortDescription}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '28px',
              }}
            >
              <MapPin size={15} style={{ color: 'var(--color-accent-deep)', flexShrink: 0 }} />
              <span>{event.venue}</span>
            </div>
          </div>

          <div>
            {/* Live Countdown Box */}
            <div style={{ marginBottom: '28px' }}>
              <CountdownTimer targetDate={event.date} label="Countdown to Registration Deadline" />
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => onRegisterClick(event)}
                className={`btn btn-lg ${isRegistered ? 'btn-outline' : 'btn-primary'}`}
                style={{ flex: '1 1 200px' }}
              >
                {isRegistered ? 'View My Pass' : 'Reserve Admission'}
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => onSelectEvent(event)}
                className="btn btn-secondary btn-lg"
                style={{ flex: '1 1 140px' }}
              >
                Event Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
