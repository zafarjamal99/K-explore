import React from 'react';
import { Layers, CalendarCheck2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  const pillars = [
    {
      icon: <Layers size={22} style={{ color: 'var(--color-accent)' }} />,
      title: 'Centralized Discovery',
      description:
        'Say goodbye to scattered messaging groups and forgotten flyers. Every verified collegiate society, research lab, and cultural event is presented with editorial clarity.',
    },
    {
      icon: <CalendarCheck2 size={22} style={{ color: 'var(--color-accent-deep)' }} />,
      title: 'Verified Schedules & Venues',
      description:
        'Accurate campus locations, room coordinates, curated speaker rosters, and live countdown clocks keep you informed with zero noise.',
    },
    {
      icon: <ShieldCheck size={22} style={{ color: 'var(--color-success)' }} />,
      title: 'Frictionless Admission',
      description:
        'Reserve seats in seconds. Instant client-side validation prevents duplicate RSVPs, issuing bespoke digital QR passes saved directly in your browser.',
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="reveal"
      style={{
        margin: '80px 0 64px 0',
        padding: '56px 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
        <span className="eyebrow">
          ABOUT THE PLATFORM
        </span>
        <h2 id="about-heading" style={{ marginBottom: '16px' }}>
          Crafted for Collegiate Excellence & Discovery.
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
          K Explore is designed to bridge the gap between ambitious university students and high-value campus initiatives. Whether you want to prototype algorithms at midnight or pitch to angel investors, discovery starts here.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '56px',
        }}
      >
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pillar.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500 }}>{pillar.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.62 }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Final Call to Action Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-text-primary)',
          color: 'var(--color-background)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <span
            style={{
              fontSize: '0.6875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--color-accent)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '8px',
            }}
          >
            CAMPUS INVITATION
          </span>
          <h3
            style={{
              color: 'var(--color-background)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              marginBottom: '12px',
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            Find your next breakthrough experience.
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9625rem' }}>
            Join hundreds of classmates expanding their technical and creative frontiers. Check upcoming dates and secure your pass today.
          </p>
        </div>

        <button
          type="button"
          onClick={onExploreClick}
          className="btn btn-champagne btn-lg"
        >
          Browse All Events Now
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
