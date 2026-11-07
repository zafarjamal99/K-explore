import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-secondary btn-sm"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        padding: 0,
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
    >
      {isDark ? (
        <Sun size={18} style={{ color: 'var(--accent)' }} />
      ) : (
        <Moon size={18} style={{ color: 'var(--primary-brand)' }} />
      )}
    </button>
  );
}
