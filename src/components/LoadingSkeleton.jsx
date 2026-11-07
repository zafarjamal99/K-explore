import React from 'react';

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="events-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
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
              height: '190px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-muted)',
              animation: 'pulseGlow 1.5s infinite ease-in-out',
            }}
          />
          {/* Category & Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '70px',
                height: '18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-muted)',
              }}
            />
            <div
              style={{
                width: '90px',
                height: '18px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-muted)',
              }}
            />
          </div>
          {/* Title */}
          <div
            style={{
              width: '85%',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-muted)',
            }}
          />
          {/* Description */}
          <div
            style={{
              width: '100%',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-muted)',
            }}
          />
          {/* Footer CTA */}
          <div
            style={{
              marginTop: 'auto',
              width: '100%',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-muted)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
