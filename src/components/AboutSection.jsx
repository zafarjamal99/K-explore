import React from 'react';
import { Layers, CalendarCheck2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutSection({ onExploreClick }) {
  const pillars = [
    {
      icon: <Layers size={24} style={{ color: 'var(--primary-brand)' }} />,
      title: 'Centralized Discovery',
      description:
        'Say goodbye to scattered group chats and paper flyers. Every verified student society and faculty event is curated in one high-clarity interface.',
    },
    {
      icon: <CalendarCheck2 size={24} style={{ color: 'var(--accent)' }} />,
      title: 'Accurate Real-time Schedules',
      description:
        'Always know the exact campus hall, timing, speaker roster, and registration deadlines with live countdown clocks.',
    },
    {
      icon: <ShieldCheck size={24} style={{ color: 'var(--status-open-text)' }} />,
      title: 'Frictionless Registration',
      description:
        'Zero bloated sign-up walls. Register in seconds, inspect duplicate alerts, and retain downloadable offline QR tickets in your browser.',
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        margin: '80px 0 64px 0',
        padding: '56px 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
        <span
          style={{
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 700,
            color: 'var(--accent)',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          About The Platform
        </span>
        <h2 id="about-heading" style={{ marginBottom: '16px' }}>
          Crafted for Collegiate Excellence & Discovery.
        </h2>
        <p style={{ fontSize: '1.0625rem' }}>
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
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--muted-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pillar.icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{pillar.title}</h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--secondary-text)' }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* Final Call to Action Banner */}
      <div
        style={{
          backgroundColor: 'var(--primary-brand)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <h3
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: '10px',
              fontWeight: 800,
            }}
          >
            Find Your Next Breakthrough Experience.
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1rem' }}>
            Join hundreds of classmates expanding their technical and creative frontiers. Check upcoming dates and secure your spot today.
          </p>
        </div>

        <button
          type="button"
          onClick={onExploreClick}
          className="btn btn-accent btn-lg"
        >
          Browse All Events Now
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
