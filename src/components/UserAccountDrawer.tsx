import React from 'react';
import { X, Ticket, QrCode, Calendar, MapPin, Printer, AlertCircle } from 'lucide-react';
import { OrderBooking, CurrencyCode } from '../types';
import { formatPrice } from '../utils/storageUtils';

interface UserAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: OrderBooking[];
  currency: CurrencyCode;
  onExploreEvents: () => void;
}

export default function UserAccountDrawer({
  isOpen,
  onClose,
  bookings,
  currency,
  onExploreEvents,
}: UserAccountDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookings-drawer-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'var(--modal-overlay)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-surface"
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          overflowY: 'auto',
          borderRadius: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Ticket size={20} style={{ color: 'var(--color-champagne)' }} />
            <div>
              <h3 id="bookings-drawer-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                My Tickets &amp; Bookings
              </h3>
              <p style={{ margin: 0, fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                {bookings.length} Confirmed Pass{bookings.length === 1 ? '' : 'es'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close my tickets drawer"
            className="btn btn-secondary"
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ padding: '24px', flex: 1 }}>
          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
              <AlertCircle size={40} style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--color-text)' }}>
                No active bookings yet
              </h4>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '24px' }}>
                Explore concerts, matches, plays, and summits to book your tickets.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreEvents();
                }}
                className="btn btn-primary btn-sm"
              >
                Browse Events
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    borderRadius: '12px',
                    border: '1px solid var(--color-champagne)',
                    background: 'var(--color-stone)',
                    padding: '20px',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span className="badge badge-open" style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
                        {b.domain}
                      </span>
                      <h4 style={{ margin: '4px 0 2px 0', fontSize: '1.05rem', fontWeight: 600 }}>
                        {b.eventTitle}
                      </h4>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-champagne)' }}>
                        #{b.id}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        {formatPrice(b.totalAmount, currency)}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {b.quantity} Ticket(s)
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} />
                      <span>{b.venue}, {b.city}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} />
                      <span>{new Date(b.eventDate).toLocaleDateString()} &middot; Seats: {b.seats?.join(', ') || 'General'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <QrCode size={24} />
                      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        PASS-OK
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Printer size={13} /> Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
