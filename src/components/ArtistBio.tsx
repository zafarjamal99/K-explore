import React from 'react';
import { Sparkles, Award, Radio } from 'lucide-react';
import { ArtistProfile } from '../types';

interface ArtistBioProps {
  artist: ArtistProfile;
}

export default function ArtistBio({ artist }: ArtistBioProps) {
  return (
    <section
      id="artist-bio"
      aria-labelledby="bio-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'center',
        }}
        className="bio-grid"
      >
        {/* Left Column: Portrait */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-muted)',
              maxHeight: '560px',
            }}
          >
            <img
              src={artist.portraitImageUrl}
              alt="Aurelia Vance portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.95)',
              }}
            />
          </div>

          {/* Accolades Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '24px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              boxShadow: 'var(--shadow-elevated)',
              maxWidth: '260px',
            }}
            className="hide-mobile"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Award size={16} style={{ color: 'var(--color-accent)' }} />
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, color: 'var(--color-accent-deep)' }}>
                Billboard #1 Debut
              </span>
            </div>
            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Classical Crossover Chart
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div>
          <span className="eyebrow">
            THE ARTIST &middot; BIOGRAPHY
          </span>
          <h2
            id="bio-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              marginBottom: '24px',
            }}
          >
            Where classical rigor dissolves into modular transcendence.
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontSize: '0.9625rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            {artist.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Quick Ensemble Specs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Origin
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                Berlin &middot; London
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Ensemble
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                12-Piece Live Chamber
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Current Staging
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-accent-deep)', marginTop: '2px' }}>
                360&deg; Spatial Audio
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .bio-grid {
            grid-template-columns: 1fr 1.25fr !important;
            gap: 64px !important;
          }
        }
      `}</style>
    </section>
  );
}
