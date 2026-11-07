import React from 'react';
import { Calendar, Tag, ShieldCheck, QrCode } from 'lucide-react';

export default function StatsBanner() {
  const stats = [
    {
      icon: <Calendar size={20} style={{ color: 'var(--color-accent)' }} />,
      value: '12+',
      label: 'Curated Campus Events',
      desc: 'Updated for academic term',
    },
    {
      icon: <Tag size={20} style={{ color: 'var(--color-accent-deep)' }} />,
      value: '7',
      label: 'Specialized Categories',
      desc: 'Tech, Arts, Sports & Ventures',
    },
    {
      icon: <ShieldCheck size={20} style={{ color: 'var(--color-success)' }} />,
      value: '100%',
      label: 'Complimentary Access',
      desc: 'Open to all university students',
    },
    {
      icon: <QrCode size={20} style={{ color: 'var(--color-accent)' }} />,
      value: 'Instant',
      label: 'Digital QR Passes',
      desc: 'Saved directly in your browser',
    },
  ];

  return (
    <section
      aria-label="Platform Statistics"
      className="reveal"
      style={{
        margin: '32px 0 56px 0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {stats.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '6px 4px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div>
              <div
                className="stat-value tabular-nums"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginTop: '4px',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
