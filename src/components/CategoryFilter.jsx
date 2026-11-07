import React from 'react';
import { CATEGORIES } from '../data/events';

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  return (
    <div
      role="tablist"
      aria-label="Event categories"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        paddingTop: '4px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const count = categoryCounts[cat] ?? 0;

        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              fontSize: '0.875rem',
              fontWeight: isSelected ? 600 : 500,
              borderRadius: 'var(--radius-pill)',
              border: `1px solid ${isSelected ? 'var(--primary-brand)' : 'var(--border)'}`,
              backgroundColor: isSelected ? 'var(--primary-brand)' : 'var(--bg-secondary)',
              color: isSelected ? '#FFFFFF' : 'var(--primary-text)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)',
              boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <span>{cat}</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '2px 6px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: isSelected
                  ? 'rgba(255, 255, 255, 0.22)'
                  : 'var(--muted-surface)',
                color: isSelected ? '#FFFFFF' : 'var(--secondary-text)',
                fontWeight: 600,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
