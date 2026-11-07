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
        width: '38px',
        height: '38px',
        padding: 0,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'all var(--motion-fast) ease',
      }}
    >
      {isDark ? (
        <Sun size={17} style={{ color: 'var(--color-accent)' }} />
      ) : (
        <Moon size={17} style={{ color: 'var(--color-text-primary)' }} />
      )}
    </button>
  );
}
