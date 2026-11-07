import React, { useState } from 'react';
import { Menu, X, Shield, Radio, Calendar, Music, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenAdmin: () => void;
  pendingInquiriesCount?: number;
}

export default function Navbar({
  theme,
  toggleTheme,
  onOpenAdmin,
  pendingInquiriesCount = 0,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-header">
      <div className="container nav-inner">
        {/* Brand Monogram & Title */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg viewBox="0 0 48 48" width="18" height="18">
              <path d="M14 12V36" stroke="var(--color-background)" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 12" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 36" stroke="var(--color-background)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9625rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: 'var(--color-text-primary)',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              K EXPLORE
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                color: 'var(--color-accent-deep)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Artist &middot; Tour &middot; Media
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hide-mobile"
          aria-label="Primary navigation"
          style={{
            alignItems: 'center',
            gap: '28px',
          }}
        >
          <button type="button" onClick={() => scrollToSection('artist-bio')} style={navLinkStyle}>
            Artist
          </button>
          <button type="button" onClick={() => scrollToSection('discography')} style={navLinkStyle}>
            Discography
          </button>
          <button type="button" onClick={() => scrollToSection('tour-dates')} style={navLinkStyle}>
            Tour Dates
          </button>
          <button type="button" onClick={() => scrollToSection('gallery')} style={navLinkStyle}>
            Gallery
          </button>
          <button type="button" onClick={() => scrollToSection('live-stream')} style={navLinkStyle}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E53E3E' }} />
              Live Broadcast
            </span>
          </button>
          <button type="button" onClick={() => scrollToSection('press')} style={navLinkStyle}>
            Press
          </button>
          <button type="button" onClick={() => scrollToSection('booking')} style={navLinkStyle}>
            Booking
          </button>
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Admin CMS Trigger */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="btn btn-secondary btn-sm"
            style={{
              position: 'relative',
              fontWeight: 600,
              fontSize: '0.78125rem',
            }}
            title="Open Artist Management & Booking Portal"
          >
            <Shield size={14} style={{ color: 'var(--color-accent-deep)' }} />
            <span className="hide-mobile">Admin Portal</span>
            {pendingInquiriesCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-accent-deep)',
                  color: '#FFFFFF',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px',
                }}
              >
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-only btn btn-secondary btn-sm"
            aria-label="Toggle mobile menu"
            style={{ width: '38px', height: '38px', padding: 0 }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer show-mobile-only">
          <button type="button" onClick={() => scrollToSection('artist-bio')} style={mobileLinkStyle}>
            <Sparkles size={16} style={{ color: 'var(--color-accent)' }} /> Artist Profile
          </button>
          <button type="button" onClick={() => scrollToSection('discography')} style={mobileLinkStyle}>
            <Music size={16} style={{ color: 'var(--color-accent)' }} /> Discography & Audio
          </button>
          <button type="button" onClick={() => scrollToSection('tour-dates')} style={mobileLinkStyle}>
            <Calendar size={16} style={{ color: 'var(--color-accent)' }} /> World Tour Dates
          </button>
          <button type="button" onClick={() => scrollToSection('live-stream')} style={mobileLinkStyle}>
            <Radio size={16} style={{ color: '#E53E3E' }} /> Live Broadcast
          </button>
          <button type="button" onClick={() => scrollToSection('booking')} style={mobileLinkStyle}>
            <Shield size={16} style={{ color: 'var(--color-accent-deep)' }} /> Booking Inquiries
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            style={{
              ...mobileLinkStyle,
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
            }}
          >
            <Shield size={16} style={{ color: 'var(--color-accent-deep)' }} /> Admin CMS Portal ({pendingInquiriesCount})
          </button>
        </div>
      )}
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontSize: '0.84rem',
  fontWeight: 500,
  color: 'var(--color-text-secondary)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px 0',
  letterSpacing: '0.01em',
  transition: 'color var(--motion-fast) ease',
};

const mobileLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '0.9375rem',
  fontWeight: 500,
  color: 'var(--color-text-primary)',
  padding: '10px 0',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%',
};
