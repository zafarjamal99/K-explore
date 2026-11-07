import React, { useState } from 'react';
import { Menu, X, Ticket, Compass, Info, Sparkles } from 'lucide-react';
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
        {/* Brand Monogram & Title */}
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
          {/* Logo Icon */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <svg viewBox="0 0 48 48" width="24" height="24">
              <path d="M14 12V36" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 12" stroke="#C97958" strokeWidth="5" strokeLinecap="round" />
              <path d="M14 24L32 36" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--primary-text)',
                display: 'block',
                lineHeight: 1.1,
              }}
            >
              K Explore
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                color: 'var(--secondary-text)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Campus Events
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
          <button
            type="button"
            onClick={() => handleNav(onNavigateHome)}
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--primary-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
            }}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateEvents)}
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--secondary-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--primary-text)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--secondary-text)')}
          >
            Explore Events
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateAbout)}
            style={{
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--secondary-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--primary-text)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--secondary-text)')}
          >
            About
          </button>
        </nav>

        {/* Right Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* My Registrations Button */}
          <button
            type="button"
            onClick={onOpenMyRegistrations}
            className="btn btn-secondary btn-sm"
            style={{
              position: 'relative',
              fontWeight: 600,
            }}
          >
            <Ticket size={16} />
            <span className="hide-mobile">My Passes</span>
            {registrationCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px',
                }}
              >
                {registrationCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="show-mobile-only btn btn-secondary btn-sm"
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            <Compass size={18} />
            Home
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateEvents)}
            style={mobileNavItemStyle}
          >
            <Sparkles size={18} />
            Explore All Events
          </button>

          <button
            type="button"
            onClick={() => handleNav(onNavigateAbout)}
            style={mobileNavItemStyle}
          >
            <Info size={18} />
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
              backgroundColor: 'var(--muted-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
            }}
          >
            <Ticket size={18} />
            My Registered Passes ({registrationCount})
          </button>
        </div>
      )}
    </header>
  );
}

const mobileNavItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--primary-text)',
  padding: '10px 0',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%',
};
