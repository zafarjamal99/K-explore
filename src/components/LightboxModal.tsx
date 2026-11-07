import React, { useEffect } from 'react';
import { X, MapPin, Camera } from 'lucide-react';
import { MediaItem } from '../types';

interface LightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '920px',
          width: '100%',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-border)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo view"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(28, 29, 27, 0.75)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          <X size={18} />
        </button>

        {/* Full Image */}
        <div style={{ maxHeight: '68vh', overflow: 'hidden', backgroundColor: '#000000' }}>
          <img
            src={item.url}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '68vh',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Caption & Metadata */}
        <div style={{ padding: '24px 28px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              margin: '0 0 8px 0',
            }}
          >
            {item.title}
          </h3>
          {item.caption && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0 0 16px 0' }}>
              {item.caption}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '14px',
              flexWrap: 'wrap',
            }}
          >
            {item.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} style={{ color: 'var(--color-accent)' }} />
                {item.location} {item.year ? `(${item.year})` : ''}
              </span>
            )}
            {item.photographer && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Camera size={13} style={{ color: 'var(--color-accent-deep)' }} />
                Photography: {item.photographer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
