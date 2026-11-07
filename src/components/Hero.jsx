import React from 'react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onFeaturedClick }) {
  return (
    <section
      style={{
        paddingTop: '48px',
        paddingBottom: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
        }}
      >
        {/* Subtle Announcement Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--muted-surface)',
            border: '1px solid var(--border)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--primary-text)',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span>Curated Campus Events &middot; Fall / Winter Semester 2026</span>
        </div>

        {/* Editorial Headline */}
        <h1
          style={{
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            fontWeight: 800,
          }}
        >
          Where Campus Culture Meets Discovery.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
            color: 'var(--secondary-text)',
            lineHeight: 1.6,
            maxWidth: '680px',
            marginBottom: '32px',
          }}
        >
          Explore hackathons, music showcases, systems engineering workshops, venture pitch days, and athletic cups. One unified platform to discover, RSVP, and confirm your passes.
        </p>

        {/* Primary and Secondary CTAs */}
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
            onClick={onExploreClick}
            className="btn btn-primary btn-lg"
          >
            <Compass size={18} />
            Explore All Events
          </button>

          <button
            type="button"
            onClick={onFeaturedClick}
            className="btn btn-secondary btn-lg"
          >
            Featured Spotlight
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
