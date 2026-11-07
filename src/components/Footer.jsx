import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';
import { CATEGORIES } from '../data/events';

export default function Footer({ onSelectCategory, onNavigateHome, onNavigateEvents }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '80px',
        paddingBottom: '48px',
        marginTop: '96px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '56px',
          }}
        >
          {/* Brand Column */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
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
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                }}
              >
                K EXPLORE
              </span>
            </div>

            <p style={{ fontSize: '0.84rem', lineHeight: 1.65, marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
              An ultra-luxury campus event discovery and admission directory. Curated for academic excellence, creative ventures, and collegiate culture.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                style={socialIconStyle}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter Profile"
                style={socialIconStyle}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                style={socialIconStyle}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>
              DIRECTORY
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  style={footerLinkStyle}
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateEvents}
                  style={footerLinkStyle}
                >
                  Discover Events
                </button>
              </li>
              <li>
                <a href="#about" style={footerLinkStyle}>
                  About the Platform
                </a>
              </li>
              <li>
                <a href="#categories" style={footerLinkStyle}>
                  Curated Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>
              CATEGORIES
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    style={footerLinkStyle}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Desk */}
          <div>
            <span className="eyebrow" style={{ marginBottom: '14px' }}>
              CAMPUS DESK
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} style={{ color: 'var(--color-accent-deep)', marginTop: '3px', flexShrink: 0 }} />
                <span>Student Affairs Center, Central Campus, Block 1</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <span>events@k-explore.edu</span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '24px' }}
            >
              <ArrowUp size={13} /> Back to Top
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.78125rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span>&copy; {new Date().getFullYear()} K Explore. All rights reserved.</span>
            <span>Ultra-Luxury Editorial Experience for Campus Communities</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <strong>Demonstration Notice:</strong> K Explore is a university software project. All demonstration events, schedules, and registrations are persisted locally in the client's browser and do not represent legally binding contracts with university administration.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-secondary)',
  fontSize: '0.84rem',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  transition: 'color var(--motion-fast) ease',
};

const socialIconStyle = {
  width: '34px',
  height: '34px',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface-muted)',
  border: '1px solid var(--color-border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--color-text-primary)',
};
