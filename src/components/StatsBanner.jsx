import React from 'react';
import { Calendar, Tag, ShieldCheck, QrCode } from 'lucide-react';

export default function StatsBanner() {
  const stats = [
    {
      icon: <Calendar size={22} style={{ color: 'var(--accent)' }} />,
      value: '12+',
      label: 'Curated Campus Events',
      desc: 'Updated for academic term',
    },
    {
      icon: <Tag size={22} style={{ color: 'var(--primary-brand)' }} />,
      value: '7',
      label: 'Specialized Categories',
      desc: 'Tech, Arts, Sports, Biz & more',
    },
    {
      icon: <ShieldCheck size={22} style={{ color: 'var(--status-open-text)' }} />,
      value: '100%',
      label: 'Complimentary Access',
      desc: 'Open to all university students',
    },
    {
      icon: <QrCode size={22} style={{ color: 'var(--accent)' }} />,
      value: 'Instant',
      label: 'Digital QR Passes',
      desc: 'Saved directly in your browser',
    },
  ];

  return (
    <section
      aria-label="Platform Statistics"
      style={{
        margin: '40px 0 64px 0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {stats.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              padding: '8px 4px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--muted-surface)',
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
                className="stat-value"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--primary-text)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--primary-text)',
                  marginTop: '2px',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--secondary-text)',
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
