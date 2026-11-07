import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({ onReset, searchQuery, selectedCategory }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed var(--color-border)',
        margin: '24px 0',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          color: 'var(--color-accent-deep)',
        }}
      >
        <SearchX size={26} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 400,
          marginBottom: '8px',
          color: 'var(--color-text-primary)',
        }}
      >
        No Matching Experiences Found
      </h3>

      <p
        style={{
          maxWidth: '460px',
          marginBottom: '24px',
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem',
        }}
      >
        {searchQuery ? (
          <>
            No events match your search query for <strong style={{ color: 'var(--color-text-primary)' }}>"{searchQuery}"</strong>
            {selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}.
          </>
        ) : (
          `There are currently no events listed under the "${selectedCategory}" category.`
        )}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="btn btn-secondary"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <RotateCcw size={15} />
        Reset All Filters
      </button>
    </div>
  );
}
