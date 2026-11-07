import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
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
    <section aria-labelledby="featured-event-heading" style={{ marginBottom: '56px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <Sparkles size={18} style={{ color: 'var(--accent)' }} />
        <span
          style={{
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 700,
            color: 'var(--accent)',
          }}
        >
          Curator's Spotlight
        </span>
      </div>

      <div className="featured-card">
        {/* Visual Cover */}
        <div
          style={{
            position: 'relative',
            minHeight: '280px',
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
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
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
          {isRegistered && (
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success-text)',
                border: '1px solid var(--success-border)',
                borderRadius: 'var(--radius-pill)',
                padding: '6px 14px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <CheckCircle2 size={16} /> Confirmed Registration
            </div>
          )}
        </div>

        {/* Content Side */}
        <div
          style={{
            padding: '36px',
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
                fontSize: '0.875rem',
                color: 'var(--secondary-text)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--primary-text)' }}>
                <Calendar size={16} style={{ color: 'var(--accent)' }} />
                {event.displayDate}
              </span>
            </div>

            <h3
              id="featured-event-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                fontWeight: 800,
                marginBottom: '12px',
                lineHeight: 1.25,
                color: 'var(--primary-text)',
              }}
            >
              {event.title}
            </h3>

            <p
              style={{
                fontSize: '0.9625rem',
                color: 'var(--secondary-text)',
                lineHeight: 1.6,
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
                fontSize: '0.875rem',
                color: 'var(--secondary-text)',
                marginBottom: '24px',
              }}
            >
              <MapPin size={16} style={{ color: 'var(--muted-text)', flexShrink: 0 }} />
              <span>{event.venue}</span>
            </div>
          </div>

          <div>
            {/* Live Countdown Box */}
            <div style={{ marginBottom: '24px' }}>
              <CountdownTimer targetDate={event.date} label="Registration closes in" />
            </div>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => onRegisterClick(event)}
                className={`btn btn-lg ${isRegistered ? 'btn-outline' : 'btn-accent'}`}
                style={{ flex: '1 1 180px' }}
              >
                {isRegistered ? 'View My Pass' : 'Register for Spotlight'}
                <ArrowRight size={18} />
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
