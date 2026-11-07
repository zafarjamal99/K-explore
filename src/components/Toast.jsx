import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'info', onClose, duration = 3500 }) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 size={18} style={{ color: 'var(--success-text)', flexShrink: 0 }} />,
    error: <AlertCircle size={18} style={{ color: 'var(--error-text)', flexShrink: 0 }} />,
    info: <Info size={18} style={{ color: 'var(--primary-brand)', flexShrink: 0 }} />,
  };

  const bgStyles = {
    success: { background: 'var(--success-bg)', border: '1px solid var(--success-border)', color: 'var(--success-text)' },
    error: { background: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)' },
    info: { background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--primary-text)' },
  };

  return (
    <div
      role="alert"
      className="fade-in"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '420px',
        fontSize: '0.9rem',
        fontWeight: 500,
        ...bgStyles[type],
      }}
    >
      {icons[type]}
      <span style={{ flex: 1 }}>{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        style={{
          background: 'none',
          border: 'none',
          padding: '4px',
          cursor: 'pointer',
          color: 'inherit',
          opacity: 0.7,
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
