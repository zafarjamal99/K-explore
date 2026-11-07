import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getCountdown } from '../utils/dateUtils';

export default function CountdownTimer({ targetDate, label = 'Starts in', compact = false }) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (countdown.isExpired) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78125rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
        }}
      >
        <Clock size={13} />
        Registration Closed
      </span>
    );
  }

  if (compact) {
    return (
      <span
        className="tabular-nums"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.78125rem',
          color: 'var(--color-accent-deep)',
          fontWeight: 600,
        }}
      >
        <Clock size={13} />
        {countdown.days}d {countdown.hours}h {countdown.minutes}m left
      </span>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      )}
      <div
        className="tabular-nums"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={timerBoxStyle}>
          <span style={numberStyle}>{String(countdown.days).padStart(2, '0')}</span>
          <span style={unitStyle}>Days</span>
        </div>
        <span style={colonStyle}>:</span>
        <div style={timerBoxStyle}>
          <span style={numberStyle}>{String(countdown.hours).padStart(2, '0')}</span>
          <span style={unitStyle}>Hours</span>
        </div>
        <span style={colonStyle}>:</span>
        <div style={timerBoxStyle}>
          <span style={numberStyle}>{String(countdown.minutes).padStart(2, '0')}</span>
          <span style={unitStyle}>Mins</span>
        </div>
        <span style={colonStyle}>:</span>
        <div style={timerBoxStyle}>
          <span style={numberStyle}>{String(countdown.seconds).padStart(2, '0')}</span>
          <span style={unitStyle}>Secs</span>
        </div>
      </div>
    </div>
  );
}

const timerBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-surface-elevated)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  minWidth: '56px',
  padding: '8px 8px',
};

const numberStyle = {
  fontSize: '1.45rem',
  fontWeight: 400,
  color: 'var(--color-text-primary)',
  lineHeight: 1,
  fontFamily: 'var(--font-display)',
};

const unitStyle = {
  fontSize: '0.625rem',
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.06em',
  marginTop: '3px',
};

const colonStyle = {
  fontWeight: 400,
  fontSize: '1.25rem',
  color: 'var(--color-text-secondary)',
  marginBottom: '8px',
};
