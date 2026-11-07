import React, { useState } from 'react';
import { Camera, Play, Maximize2 } from 'lucide-react';
import { MediaItem } from '../types';
import LightboxModal from './LightboxModal';

interface MediaGalleryProps {
  media: MediaItem[];
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');

  const filtered = media.filter((item) => {
    if (filterType === 'IMAGE') return item.type === 'IMAGE';
    if (filterType === 'VIDEO') return item.type === 'VIDEO_EMBED';
    return true;
  });

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <div>
          <span className="eyebrow">
            VISUAL ARCHIVE &middot; 35MM &amp; CONCERT FILM
          </span>
          <h2 id="gallery-heading" style={{ margin: '4px 0 10px 0' }}>
            Media Gallery
          </h2>
          <p style={{ maxWidth: '540px', color: 'var(--color-text-secondary)', fontSize: '0.9625rem' }}>
            Capturing the raw energy, backstage solitude, and sonic architecture of the world tour.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              setFilterType('ALL');
              setSelectedIndex(null);
            }}
            className={`btn btn-sm ${filterType === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Media ({media.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterType('IMAGE');
              setSelectedIndex(null);
            }}
            className={`btn btn-sm ${filterType === 'IMAGE' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Photography ({media.filter((m) => m.type === 'IMAGE').length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterType('VIDEO');
              setSelectedIndex(null);
            }}
            className={`btn btn-sm ${filterType === 'VIDEO' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Concert Films ({media.filter((m) => m.type === 'VIDEO_EMBED').length})
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(idx)}
            style={{
              position: 'relative',
              height: '240px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: 'var(--color-surface-muted)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <img
              src={item.type === 'VIDEO_EMBED' && item.thumbnailUrl ? item.thumbnailUrl : item.url}
              alt={item.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 600ms var(--ease-luxury), filter 600ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(17,19,18,0.85) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '16px',
                color: '#F4F0E8',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontSize: '0.625rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-accent)',
                      fontWeight: 700,
                    }}
                  >
                    {item.type === 'VIDEO_EMBED' ? 'CONCERT FILM' : item.location}
                  </span>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', margin: '2px 0 0 0' }}>
                    {item.title}
                  </h4>
                </div>

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.type === 'VIDEO_EMBED' ? <Play size={14} fill="#FFFFFF" /> : <Maximize2 size={13} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <LightboxModal
          item={filtered[selectedIndex]}
          items={filtered}
          currentIndex={selectedIndex}
          onNavigate={(newIdx) => setSelectedIndex(newIdx)}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
