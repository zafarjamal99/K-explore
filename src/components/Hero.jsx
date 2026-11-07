import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function Hero({ onExploreClick, onFeaturedClick }) {
  return (
    <section
      className="hero-luxury"
      style={{
        position: 'relative',
        minHeight: '88svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '48px',
        paddingBottom: '64px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'center',
          width: '100%',
        }}
        className="hero-grid-layout"
      >
        {/* Left Editorial Content */}
        <div style={{ maxWidth: '680px', zIndex: 2 }}>
          {/* Eyebrow Label */}
          <span className="eyebrow">
            CURATED EXPERIENCES
          </span>

          {/* Primary Editorial Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.6rem, 7.5vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 0.98,
              letterSpacing: '-0.04em',
              margin: '20px 0 24px 0',
            }}
          >
            Discover moments.
            <br />
            <em>That move you.</em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              maxWidth: '520px',
              marginBottom: '36px',
            }}
          >
            Explore exceptional events, inspiring communities, and experiences worth remembering. A quiet space for university culture, technology, and arts.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={onExploreClick}
              className="btn btn-primary btn-lg"
              style={{
                gap: '12px',
                padding: '0 28px',
              }}
            >
              Discover Events
              <ArrowRight size={17} style={{ transition: 'transform 200ms ease' }} />
            </button>

            <button
              type="button"
              onClick={onFeaturedClick}
              className="btn btn-secondary btn-lg"
            >
              Curator's Spotlight
              <ArrowDown size={16} />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div
            onClick={onExploreClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '56px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                width: '36px',
                height: '1px',
                backgroundColor: 'var(--color-accent)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontSize: '0.6875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
              }}
            >
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Right Cinematic Image Composition */}
        <div
          className="hide-mobile"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {/* Main Cinematic Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              height: '520px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-elevated)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-muted)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85"
              alt="Live classical fusion concert performance"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.92) contrast(1.05)',
                transition: 'transform 800ms var(--ease-luxury)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Subtle Gradient Veil */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(17,19,18,0.7) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Bottom In-Image Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                color: '#F4F0E8',
              }}
            >
              <span
                style={{
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Spotlight &middot; Fall 2026
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Dhwani Cultural Gala & Architecture
              </div>
            </div>
          </div>

          {/* Layered Accent Frame Card */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              left: '-24px',
              padding: '18px 22px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
              zIndex: 3,
              maxWidth: '240px',
            }}
          >
            <span
              style={{
                fontSize: '0.6875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-accent-deep)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '2px',
              }}
            >
              Verified Access
            </span>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              100% Free Campus RSVP
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Immediate digital passes
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid-layout {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
