import React from 'react';
import { ArrowRight, Calendar, Music2, ExternalLink } from 'lucide-react';
import { ArtistProfile } from '../types';

interface HeroProps {
  artist: ArtistProfile;
  onExploreTour: () => void;
  onListenMusic: () => void;
}

export default function Hero({ artist, onExploreTour, onListenMusic }: HeroProps) {
  return (
    <section
      className="hero-luxury"
      style={{
        position: 'relative',
        minHeight: '88svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '40px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ margin: 0 }}>
              ARTIST &amp; WORLD TOUR
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>&middot;</span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--color-accent-deep)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {artist.currentTourName}
            </span>
          </div>

          {/* Primary Artist Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.4rem, 7vw, 5.8rem)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              margin: '16px 0 20px 0',
            }}
          >
            Aurelia Vance
            <br />
            <em>&amp; The Nocturne Collective</em>
          </h1>

          {/* Subtitle / Genre Overview */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.62,
              maxWidth: '540px',
              marginBottom: '32px',
            }}
          >
            {artist.tagline}. Sweeping orchestral acoustic piano layered over modular analog synthesis. Experiencing world stages across 2026.
          </p>

          {/* Quick Streaming Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>Spotify</span>
              <ExternalLink size={13} />
            </a>
            <a
              href={artist.appleMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>Apple Music</span>
              <ExternalLink size={13} />
            </a>
            <a
              href={artist.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>YouTube Music</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Primary CTAs */}
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
              onClick={onExploreTour}
              className="btn btn-primary btn-lg"
              style={{ gap: '10px' }}
            >
              <Calendar size={17} />
              <span>Tour Dates &amp; Tickets</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={onListenMusic}
              className="btn btn-secondary btn-lg"
              style={{ gap: '10px' }}
            >
              <Music2 size={17} />
              <span>Explore Discography</span>
            </button>
          </div>
        </div>

        {/* Right Cinematic Media Composition */}
        <div
          className="hide-mobile"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
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
              src={artist.heroImageUrl}
              alt={artist.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.92) contrast(1.05)',
                transition: 'transform 800ms var(--ease-luxury)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.035)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(17,19,18,0.75) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Bottom Caption Overlay */}
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
                LIVE WORLD PERFORMANCE
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                The Solstice World Tour &middot; 24 Global Cities
              </div>
            </div>
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
