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
        size={18}
        style={{
          position: 'absolute',
          left: '16px',
          color: 'var(--secondary-text)',
          pointerEvents: 'none',
        }}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search events by title, keyword, venue, or speaker..."
        aria-label="Search events"
        style={{
          width: '100%',
          height: '46px',
          paddingLeft: '44px',
          paddingRight: searchQuery ? '40px' : '16px',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-pill)',
          color: 'var(--primary-text)',
          fontSize: '0.9375rem',
          transition: 'all var(--transition-fast)',
          boxShadow: 'var(--shadow-xs)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary-brand)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)';
          e.target.style.boxShadow = 'var(--shadow-xs)';
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
            color: 'var(--secondary-text)',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
