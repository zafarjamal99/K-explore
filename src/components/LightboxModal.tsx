import React, { useEffect } from 'react';
import { X, MapPin, Camera, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types';

interface LightboxModalProps {
  item: MediaItem | null;
  items?: MediaItem[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
  onClose: () => void;
}

export default function LightboxModal({
  item,
  items = [],
  currentIndex = 0,
  onNavigate,
  onClose,
}: LightboxModalProps) {
  const currentItem = items.length > 0 && items[currentIndex] ? items[currentIndex] : item;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onNavigate && items.length > 1) {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight' && onNavigate && items.length > 1) {
        onNavigate((currentIndex + 1) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, currentIndex, items.length]);

  if (!currentItem) return null;

  const hasNavigation = items.length > 1 && onNavigate;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
    >
      <div
        className="card-surface"
        style={{
          position: 'relative',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--color-border)',
          animation: 'fadeIn 0.22s ease-out',
        }}
      >
        {/* Top Controls Bar */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {items.length > 1 && (
            <span
              style={{
                backgroundColor: 'rgba(28, 29, 27, 0.72)',
                backdropFilter: 'blur(6px)',
                color: '#F4F0E8',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {currentIndex + 1} / {items.length}
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close media viewer"
            style={{
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
              transition: 'background-color 0.15s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Frame: Image OR Video Embed */}
        <div
          style={{
            position: 'relative',
            maxHeight: '66vh',
            minHeight: '360px',
            backgroundColor: '#0A0B0A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {currentItem.type === 'VIDEO_EMBED' ? (
            <div style={{ width: '100%', height: '100%', minHeight: '460px', position: 'relative' }}>
              <iframe
                src={`${currentItem.url}?autoplay=1&rel=0`}
                title={currentItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '460px',
                  border: 'none',
                  display: 'block',
                }}
              />
            </div>
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              style={{
                width: '100%',
                maxHeight: '66vh',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
              }}
            />
          )}

          {/* Previous / Next Arrow Controls */}
          {hasNavigation && (
            <>
              <button
                type="button"
                onClick={() => onNavigate!((currentIndex - 1 + items.length) % items.length)}
                aria-label="Previous photo or video"
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 29, 27, 0.72)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  zIndex: 10,
                  transition: 'all 0.15s ease',
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate!((currentIndex + 1) % items.length)}
                aria-label="Next photo or video"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(28, 29, 27, 0.72)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  zIndex: 10,
                  transition: 'all 0.15s ease',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Caption & Metadata Details */}
        <div style={{ padding: '22px 28px', backgroundColor: 'var(--color-surface)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {currentItem.type === 'VIDEO_EMBED' && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(229, 62, 62, 0.15)',
                  color: '#E53E3E',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                <Play size={10} fill="#E53E3E" /> Concert Film
              </span>
            )}
            <span className="eyebrow" style={{ margin: 0 }}>
              {currentItem.location || 'Archival Capture'}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              margin: '0 0 6px 0',
            }}
          >
            {currentItem.title}
          </h3>

          {currentItem.caption && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0 0 14px 0', lineHeight: 1.55 }}>
              {currentItem.caption}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '0.78125rem',
              color: 'var(--color-text-muted)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            {currentItem.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} style={{ color: 'var(--color-champagne)' }} />
                {currentItem.location} {currentItem.year ? `(${currentItem.year})` : ''}
              </span>
            )}
            {currentItem.photographer && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Camera size={13} style={{ color: 'var(--color-accent-deep)' }} />
                {currentItem.type === 'VIDEO_EMBED' ? 'Cinematography' : 'Photography'}: {currentItem.photographer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
