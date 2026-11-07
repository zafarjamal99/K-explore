import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';

// Component that throws on demand
function ProblemChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test Explosion in ProblemChild');
  }
  return <div>Harmonious Child Component</div>;
}

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Suppress console.error in Vitest output for intentional error boundary test
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders child components cleanly when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Harmonious Child Component')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('catches render errors and renders the luxury resilience fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    // Fallback UI should be visible
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Experience Temporarily Interrupted/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Explosion in ProblemChild/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload Application/i })).toBeInTheDocument();
  });

  it('renders a custom fallback if provided via props', () => {
    render(
      <ErrorBoundary fallback={<div>Custom Failover Screen</div>}>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Failover Screen')).toBeInTheDocument();
    expect(screen.queryByText(/Experience Temporarily Interrupted/i)).not.toBeInTheDocument();
  });

  it('resets error state when clicking Try Again', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Now re-render with fixed child
    rerender(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    const tryAgainBtn = screen.getByRole('button', { name: /Try Again/i });
    fireEvent.click(tryAgainBtn);

    expect(screen.getByText('Harmonious Child Component')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
