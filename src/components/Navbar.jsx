import React, { useState } from 'react';
import { Menu, X, Ticket, Compass, Info, Sparkles, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({
  theme,
  toggleTheme,
  onOpenMyRegistrations,
  registrationCount = 0,
  onNavigateHome,
  onNavigateEvents,
  onNavigateAbout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (action) => {
    action?.();
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav-header">
      <div className="container nav-inner">
        {/* Brand Wordmark */}
        <div
          onClick={() => handleNav(onNavigateHome)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* Stylized Monogram */}
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
            <svg viewBox="0 0 48 48" width="20" height="20">
              <path d="M14 12V36" stroke="var(--color-background)" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 12" stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 36" stroke="var(--color-background)" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
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
              Curated Culture
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="hide-mobile"
          aria-label="Primary navigation"
          style={{
            alignItems: 'center',
            gap: '36px',
          }}
        >
          <button
            type="button"
            onClick={() => handleNav(onNavigateHome)}
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent-deep)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateEvents)}
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent-deep)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
          >
            Discover
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('categories');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent-deep)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
          >
            Categories
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateAbout)}
            style={navLinkStyle}
            onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent-deep)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
          >
            About
          </button>
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* My Passes Button */}
          <button
            type="button"
            onClick={onOpenMyRegistrations}
            className="btn btn-secondary btn-sm"
            style={{
              position: 'relative',
              fontWeight: 500,
              fontSize: '0.8125rem',
              letterSpacing: '0.02em',
            }}
          >
            <Ticket size={15} style={{ color: 'var(--color-accent-deep)' }} />
            <span>My Passes</span>
            {registrationCount > 0 && (
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
                  marginLeft: '4px',
                }}
              >
                {registrationCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Explore CTA on Desktop */}
          <button
            type="button"
            onClick={onNavigateEvents}
            className="btn btn-primary btn-sm hide-mobile"
            style={{ padding: '0 18px' }}
          >
            <span>Explore Events</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-only btn btn-secondary btn-sm"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
            }}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer show-mobile-only">
          <button
            type="button"
            onClick={() => handleNav(onNavigateHome)}
            style={mobileNavItemStyle}
          >
            <Compass size={17} style={{ color: 'var(--color-accent)' }} />
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateEvents)}
            style={mobileNavItemStyle}
          >
            <Sparkles size={17} style={{ color: 'var(--color-accent)' }} />
            Discover Events
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              const el = document.getElementById('categories');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={mobileNavItemStyle}
          >
            <Info size={17} style={{ color: 'var(--color-accent)' }} />
            Browse Categories
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateAbout)}
            style={mobileNavItemStyle}
          >
            <Info size={17} style={{ color: 'var(--color-accent)' }} />
            About Platform
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMyRegistrations();
            }}
            style={{
              ...mobileNavItemStyle,
              backgroundColor: 'var(--color-surface-muted)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
            }}
          >
            <Ticket size={17} style={{ color: 'var(--color-accent-deep)' }} />
            My Registered Passes ({registrationCount})
          </button>
        </div>
      )}
    </header>
  );
}

const navLinkStyle = {
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'var(--color-text-secondary)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px 0',
  letterSpacing: '0.01em',
  transition: 'color var(--motion-fast) ease',
};

const mobileNavItemStyle = {
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
