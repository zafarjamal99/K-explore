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
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px dashed var(--border)',
        margin: '24px 0',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--muted-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          color: 'var(--secondary-text)',
        }}
      >
        <SearchX size={32} />
      </div>

      <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>No Matching Events Found</h3>

      <p
        style={{
          maxWidth: '460px',
          marginBottom: '24px',
          color: 'var(--secondary-text)',
          fontSize: '0.9375rem',
        }}
      >
        {searchQuery ? (
          <>
            No events match your query for <strong style={{ color: 'var(--primary-text)' }}>"{searchQuery}"</strong>
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
        <RotateCcw size={16} />
        Reset All Filters
      </button>
    </div>
  );
}
