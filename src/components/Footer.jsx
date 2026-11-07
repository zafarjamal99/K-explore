import React from 'react';
import { ArrowUp, Mail, MapPin, Globe } from 'lucide-react';
import { CATEGORIES } from '../data/events';

export default function Footer({ onSelectCategory, onNavigateHome, onNavigateEvents }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        paddingTop: '64px',
        paddingBottom: '40px',
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
          {/* Brand Column */}
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
                  backgroundColor: 'var(--primary-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 48 48" width="18" height="18">
                  <path d="M14 12V36" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                  <path d="M14 24L32 12" stroke="#C97958" strokeWidth="6" strokeLinecap="round" />
                  <path d="M14 24L32 36" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                K Explore
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '20px' }}>
              The campus event discovery and registration platform. Built for university communities, academic clubs, and student leaders.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                style={socialIconStyle}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                color: 'var(--primary-text)',
              }}
            >
              Navigation
            </h4>
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
                  All Campus Events
                </button>
              </li>
              <li>
                <a href="#about" style={footerLinkStyle}>
                  About the Platform
                </a>
              </li>
              <li>
                <a href="#categories" style={footerLinkStyle}>
                  Browse Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                color: 'var(--primary-text)',
              }}
            >
              Categories
            </h4>
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

          {/* Campus Help & Office */}
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                color: 'var(--primary-text)',
              }}
            >
              Campus Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--secondary-text)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                <span>Student Affairs Center, Central Campus, Block 1</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--primary-brand)', flexShrink: 0 }} />
                <span>events@k-explore.edu</span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '24px' }}
            >
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.8125rem',
            color: 'var(--secondary-text)',
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
            <span>Designed & Engineered for Campus Communities</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted-text)' }}>
            <strong>Demonstration Notice:</strong> K Explore is a portfolio and university software project. All demonstration events, sample dates, and participant registrations are stored locally in the client's browser and do not represent legally binding contracts with university administration.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--secondary-text)',
  fontSize: '0.875rem',
  cursor: 'pointer',
  padding: 0,
  textAlign: 'left',
  transition: 'color var(--transition-fast)',
};

const socialIconStyle = {
  width: '36px',
  height: '36px',
  borderRadius: 'var(--radius-md)',
  backgroundColor: 'var(--muted-surface)',
  border: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--primary-text)',
};
