import React from 'react';
import { ArrowUp, Disc3, Radio, Calendar, Mail, ExternalLink } from 'lucide-react';
import { ArtistProfile } from '../types';

interface FooterProps {
  artist: ArtistProfile;
  onOpenAdmin: () => void;
}

export default function Footer({ artist, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '72px',
        paddingBottom: '44px',
        marginTop: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand & Artist Overview */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 48 48" width="16" height="16">
                  <path d="M14 12V36" stroke="var(--color-background)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M14 24L32 12" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M14 24L32 36" stroke="var(--color-background)" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                K EXPLORE &middot; NOCTURNE
              </span>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              The official archival home and global touring platform for {artist.name}. Master recordings, live broadcast feeds, and promoter relations.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={artist.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="Spotify"
              >
                Spotify
              </a>
              <a
                href={artist.appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="Apple Music"
              >
                Apple
              </a>
              <a
                href={artist.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                aria-label="YouTube"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('artist-bio')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Artist Biography
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('discography')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Discography &amp; Audio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('tour-dates')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  World Tour Schedule
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('live-broadcast')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Live Stream Broadcast
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('gallery')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Photography &amp; Film
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('news-press')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  News &amp; Press Dispatches
                </button>
              </li>
            </ul>
          </div>

          {/* Industry & Booking */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
              }}
            >
              Industry &amp; Booking
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('booking-inquiry')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Promoter Tour Booking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact-section')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.875rem' }}
                >
                  Press &amp; Sync Inquiries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-champagne)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Tour Manager Portal &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Global Representation */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
              }}
            >
              Management
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              <strong>Nocturne Artist Management</strong><br />
              London &middot; New York &middot; Berlin<br />
              management@nocturnearchive.com<br />
              booking@kexplore.agency
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} K Explore Recordings &middot; Nocturne Collective. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
