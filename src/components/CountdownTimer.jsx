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
          fontSize: '0.8125rem',
          color: 'var(--muted-text)',
          fontWeight: 500,
        }}
      >
        <Clock size={14} />
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
          fontSize: '0.8125rem',
          color: 'var(--accent)',
          fontWeight: 600,
        }}
      >
        <Clock size={14} />
        {countdown.days}d {countdown.hours}h {countdown.minutes}m left
      </span>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      {label && (
        <span
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--secondary-text)',
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
          gap: '10px',
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
  background: 'var(--muted-surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  minWidth: '58px',
  padding: '8px 10px',
};

const numberStyle = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--primary-text)',
  lineHeight: 1.1,
  fontFamily: 'var(--font-heading)',
};

const unitStyle = {
  fontSize: '0.6875rem',
  color: 'var(--secondary-text)',
  textTransform: 'uppercase',
  fontWeight: 600,
  letterSpacing: '0.04em',
  marginTop: '2px',
};

const colonStyle = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: 'var(--secondary-text)',
  marginBottom: '10px',
};
