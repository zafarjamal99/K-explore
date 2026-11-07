import React from 'react';

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="events-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Image skeleton */}
          <div
            style={{
              height: '180px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--muted-surface)',
              animation: 'pulseGlow 1.5s infinite ease-in-out',
            }}
          />
          {/* Category & Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '80px',
                height: '20px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--muted-surface)',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '20px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--muted-surface)',
              }}
            />
          </div>
          {/* Title */}
          <div
            style={{
              width: '90%',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--muted-surface)',
            }}
          />
          {/* Description */}
          <div
            style={{
              width: '100%',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--muted-surface)',
            }}
          />
          {/* Footer CTA */}
          <div
            style={{
              marginTop: 'auto',
              width: '100%',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--muted-surface)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
