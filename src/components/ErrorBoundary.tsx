import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // Production observability hook: can route to Sentry / Datadog / LogRocket
    console.error('[K Explore ErrorBoundary caught an unhandled exception]:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleClearCacheAndReload = (): void => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignore storage errors in restricted contexts
    }
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorMessage = this.state.error?.message || 'An unexpected runtime error occurred.';
      const componentStack = this.state.errorInfo?.componentStack;

      return (
        <main
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'var(--color-bg, #111312)',
            color: 'var(--color-text, #F4F0E8)',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          }}
        >
          <div
            style={{
              maxWidth: '640px',
              width: '100%',
              backgroundColor: 'var(--color-card, #1B1E1C)',
              borderRadius: '16px',
              border: '1px solid var(--color-border, #373934)',
              padding: '40px 32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans, monospace)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-champagne, #C6A77C)',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              System Resilience Shield
            </p>

            <h1
              style={{
                fontFamily: 'var(--font-serif, "Cormorant Garamond", serif)',
                fontSize: '2rem',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '16px',
                color: 'var(--color-text, #F4F0E8)',
              }}
            >
              Experience Temporarily Interrupted
            </h1>

            <p
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary, #AAA99F)',
                marginBottom: '28px',
              }}
            >
              An unexpected fault occurred during rendering. The issue has been isolated to protect your
              session and stored passes.
            </p>

            {/* Error Message Snippet */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--color-border, #373934)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '28px',
                textAlign: 'left',
                fontSize: '0.8125rem',
                color: '#F87171',
                fontFamily: 'monospace',
                overflowX: 'auto',
              }}
            >
              <strong>Error:</strong> {errorMessage}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <button
                type="button"
                onClick={this.handleReset}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              <button
                type="button"
                onClick={this.handleReload}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '8px',
                }}
              >
                <Home size={16} />
                Reload Application
              </button>

              <button
                type="button"
                onClick={this.handleClearCacheAndReload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary, #AAA99F)',
                  background: 'transparent',
                  border: '1px solid var(--color-border, #373934)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                title="Clears local cache in case of corrupted state"
              >
                <Trash2 size={14} />
                Reset Cache
              </button>
            </div>

            {/* Collapsible Stack Trace */}
            {componentStack && (
              <details
                style={{
                  marginTop: '16px',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary, #AAA99F)',
                  cursor: 'pointer',
                }}
              >
                <summary style={{ padding: '6px 0', outline: 'none' }}>Technical Diagnostic Details</summary>
                <pre
                  style={{
                    margin: '8px 0 0 0',
                    padding: '12px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    lineHeight: 1.5,
                  }}
                >
                  {componentStack}
                </pre>
              </details>
            )}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
