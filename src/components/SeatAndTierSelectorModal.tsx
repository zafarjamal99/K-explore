import React, { useState } from 'react';
import { X, Check, Shield, Armchair, Sparkles } from 'lucide-react';
import { DomainEvent, TicketTier, CurrencyCode } from '../types';
import { formatPrice } from '../utils/storageUtils';

interface SeatAndTierSelectorModalProps {
  event: DomainEvent;
  currency: CurrencyCode;
  onClose: () => void;
  onProceedToCheckout: (event: DomainEvent, selectedTier: TicketTier, quantity: number, selectedSeats: string[]) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function SeatAndTierSelectorModal({
  event,
  currency,
  onClose,
  onProceedToCheckout,
  showToast,
}: SeatAndTierSelectorModalProps) {
  const [selectedTierId, setSelectedTierId] = useState<string>(event.ticketTiers[0]?.id || '');
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['A4', 'A5']);

  const currentTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const reservedSeats = new Set(['A1', 'A2', 'B5', 'C3', 'C4', 'D8', 'E9', 'F1']);

  const handleSeatClick = (seatCode: string) => {
    if (reservedSeats.has(seatCode)) {
      showToast(`Seat ${seatCode} is already booked by another attendee.`, 'info');
      return;
    }
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatCode));
    } else {
      if (selectedSeats.length >= 8) {
        showToast('Maximum 8 tickets allowed per booking.', 'error');
        return;
      }
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  const quantity = Math.max(1, selectedSeats.length);
  const subtotal = currentTier ? currentTier.price * quantity : 0;

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least 1 seat to proceed.', 'error');
      return;
    }
    onProceedToCheckout(event, currentTier, selectedSeats.length, selectedSeats);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="seat-selector-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-surface"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '840px',
          maxHeight: '94vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '0',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface)',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>
              K EXPLORE VISUAL SEAT SELECTION
            </span>
            <h3 id="seat-selector-title" style={{ margin: '2px 0 0 0', fontSize: '1.25rem' }}>
              {event.title}
            </h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              {event.venue}, {event.city}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close seat selector"
            className="btn btn-secondary"
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tier Selector Ribbon */}
        <div
          style={{
            padding: '16px 28px',
            background: 'var(--color-stone)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
          }}
        >
          {event.ticketTiers.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid var(--color-champagne)' : '1px solid var(--color-border)',
                  background: isSelected ? 'var(--color-surface)' : 'transparent',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  minWidth: '160px',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{tier.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-champagne)', fontWeight: 700 }}>
                  {formatPrice(tier.price, currency)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Seat Map */}
        <div style={{ padding: '28px', textAlign: 'center' }}>
          {/* Orientation Banner */}
          <div
            style={{
              maxWidth: '480px',
              margin: '0 auto 32px auto',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(90deg, transparent, rgba(185, 154, 112, 0.25), transparent)',
              borderBottom: '2px solid var(--color-champagne)',
              color: 'var(--color-champagne)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {event.domain === 'sports' ? '⚽ PITCH / FIELD THIS WAY' : '🎭 ALL EYES THIS WAY (STAGE / SCREEN)'}
          </div>

          {/* Seat Grid Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginBottom: '28px' }}>
            {rows.map((row) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  {row}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatCode = `${row}${i + 1}`;
                    const isReserved = reservedSeats.has(seatCode);
                    const isSelected = selectedSeats.includes(seatCode);

                    return (
                      <button
                        key={seatCode}
                        type="button"
                        onClick={() => handleSeatClick(seatCode)}
                        disabled={isReserved}
                        title={`Seat ${seatCode} - ${isReserved ? 'Reserved' : 'Available'}`}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          border: isSelected
                            ? '2px solid var(--color-champagne)'
                            : isReserved
                            ? '1px solid transparent'
                            : '1px solid var(--color-border)',
                          background: isSelected
                            ? 'var(--color-champagne)'
                            : isReserved
                            ? '#374151'
                            : 'var(--color-stone)',
                          color: isSelected ? '#111' : isReserved ? '#9ca3af' : 'var(--color-text)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: isReserved ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {isSelected ? <Check size={14} /> : i + 1}
                      </button>
                    );
                  })}
                </div>

                <span style={{ width: '20px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  {row}
                </span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--color-stone)', border: '1px solid var(--color-border)' }} />
              <span>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--color-champagne)' }} />
              <span>Selected ({selectedSeats.length})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#374151' }} />
              <span>Sold Out</span>
            </div>
          </div>
        </div>

        {/* Footer Checkout Bar */}
        <div
          style={{
            padding: '20px 28px',
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              Selected Seats: <strong>{selectedSeats.join(', ') || 'None'}</strong>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Subtotal: <span style={{ color: 'var(--color-champagne)' }}>{formatPrice(subtotal, currency)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Sparkles size={16} /> Proceed to Attendee Details
          </button>
        </div>
      </div>
    </div>
  );
}
