import React, { useState } from 'react';
import { X, Ticket, QrCode, Calendar, MapPin, Printer, AlertCircle, Heart, Trash2 } from 'lucide-react';
import { OrderBooking, CurrencyCode, DomainEvent } from '../types';
import { formatPrice } from '../utils/storageUtils';

interface UserAccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: OrderBooking[];
  currency: CurrencyCode;
  onExploreEvents: () => void;
  savedEvents?: DomainEvent[];
  onRemoveFavorite?: (eventId: string) => void;
  onSelectEvent?: (event: DomainEvent) => void;
  initialTab?: 'bookings' | 'saved';
}

export default function UserAccountDrawer({
  isOpen,
  onClose,
  bookings,
  currency,
  onExploreEvents,
  savedEvents = [],
  onRemoveFavorite,
  onSelectEvent,
  initialTab = 'bookings',
}: UserAccountDrawerProps) {
  const [drawerTab, setDrawerTab] = useState<'bookings' | 'saved'>(initialTab);

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
            {drawerTab === 'bookings' ? (
              <Ticket size={20} style={{ color: 'var(--color-champagne)' }} />
            ) : (
              <Heart size={20} style={{ color: '#EF4444' }} fill="#EF4444" />
            )}
            <div>
              <h3 id="bookings-drawer-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                {drawerTab === 'bookings' ? 'My Tickets & Bookings' : 'Saved Favorites'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                {drawerTab === 'bookings'
                  ? `${bookings.length} Confirmed Pass${bookings.length === 1 ? '' : 'es'}`
                  : `${savedEvents.length} Saved Event${savedEvents.length === 1 ? '' : 's'}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="btn btn-secondary"
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-stone)',
            padding: '4px 12px',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setDrawerTab('bookings')}
            className={`btn btn-sm ${drawerTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, height: '34px', fontSize: '0.78125rem', fontWeight: drawerTab === 'bookings' ? 600 : 500 }}
          >
            <Ticket size={13} />
            <span>Passes ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setDrawerTab('saved')}
            className={`btn btn-sm ${drawerTab === 'saved' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, height: '34px', fontSize: '0.78125rem', fontWeight: drawerTab === 'saved' ? 600 : 500 }}
          >
            <Heart size={13} fill={drawerTab === 'saved' ? 'currentColor' : 'none'} />
            <span>Saved ({savedEvents.length})</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ padding: '24px', flex: 1 }}>
          {drawerTab === 'bookings' ? (
            bookings.length === 0 ? (
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
            )
          ) : (
            /* SAVED FAVORITES TAB */
            savedEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-secondary)' }}>
                <Heart size={40} style={{ margin: '0 auto 16px auto', opacity: 0.4 }} />
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--color-text)' }}>
                  No saved events yet
                </h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '24px' }}>
                  Click the heart icon on any concert, stadium match, or theater performance to bookmark it for later.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreEvents();
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Explore Events
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {savedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      display: 'flex',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-card)',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={ev.coverImage}
                      alt={ev.title}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', flexShrink: 0 }}
                    />
                    <div style={{ padding: '12px 14px', flex: 1, minWidth: 0 }}>
                      <span className="badge badge-open" style={{ fontSize: '0.625rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                        {ev.domain}
                      </span>
                      <h4
                        style={{
                          margin: '2px 0 4px 0',
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          onClose();
                          onSelectEvent?.(ev);
                        }}
                      >
                        {ev.title}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        {ev.city} &middot; from <strong>{formatPrice(ev.minPrice, currency)}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectEvent?.(ev);
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ height: '28px', padding: '0 10px', fontSize: '0.72rem' }}
                        >
                          View &amp; Book
                        </button>
                        {onRemoveFavorite && (
                          <button
                            type="button"
                            onClick={() => onRemoveFavorite(ev.id)}
                            className="btn btn-secondary btn-sm"
                            style={{ height: '28px', padding: '0 8px' }}
                            title="Remove from favorites"
                          >
                            <Trash2 size={13} style={{ color: 'var(--color-error)' }} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
