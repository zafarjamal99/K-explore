import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, totalResults, isFiltered }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '460px',
      }}
    >
      <Search
        size={17}
        style={{
          position: 'absolute',
          left: '16px',
          color: 'var(--color-text-muted)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search events, curators, venues, or topics..."
        aria-label="Search events"
        style={{
          width: '100%',
          height: '46px',
          paddingLeft: '44px',
          paddingRight: searchQuery ? '40px' : '16px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-text-primary)',
          fontSize: '0.875rem',
          transition: 'all var(--motion-fast) ease',
          boxShadow: 'var(--shadow-card)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-accent)';
          e.target.style.boxShadow = '0 0 0 3px var(--color-accent-subtle)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--color-border)';
          e.target.style.boxShadow = 'var(--shadow-card)';
        }}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search query"
          style={{
            position: 'absolute',
            right: '12px',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
