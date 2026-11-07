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
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '8px',
        paddingTop: '4px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
        borderBottom: '1px solid var(--color-border)',
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
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              fontSize: '0.84rem',
              fontWeight: isSelected ? 600 : 500,
              border: 'none',
              backgroundColor: 'transparent',
              color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--motion-fast) ease',
            }}
          >
            <span>{cat}</span>
            <span
              className="tabular-nums"
              style={{
                fontSize: '0.72rem',
                padding: '1px 6px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSelected
                  ? 'var(--color-accent-subtle)'
                  : 'var(--color-surface-muted)',
                color: isSelected ? 'var(--color-accent-deep)' : 'var(--color-text-muted)',
                fontWeight: 600,
              }}
            >
              {count}
            </span>

            {/* Subtle Active Underline */}
            {isSelected && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: '12px',
                  right: '12px',
                  height: '2px',
                  backgroundColor: 'var(--color-accent-deep)',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
