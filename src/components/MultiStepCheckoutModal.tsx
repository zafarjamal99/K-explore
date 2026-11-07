import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Printer,
  Download,
  Calendar,
  MapPin,
  QrCode,
  Shield,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DomainEvent, TicketTier, CurrencyCode, OrderBooking } from '../types';
import { saveOrderBooking, formatPrice } from '../utils/storageUtils';

interface MultiStepCheckoutModalProps {
  event: DomainEvent;
  tier: TicketTier;
  quantity: number;
  seats: string[];
  currency: CurrencyCode;
  onClose: () => void;
  onBookingSuccess: (booking: OrderBooking) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function MultiStepCheckoutModal({
  event,
  tier,
  quantity,
  seats,
  currency,
  onClose,
  onBookingSuccess,
  showToast,
}: MultiStepCheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [customerName, setCustomerName] = useState('Siddharth Rao');
  const [customerEmail, setCustomerEmail] = useState('siddharth@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98200 45678');
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'UPI' | 'NETBANKING'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<OrderBooking | null>(null);

  const subtotal = tier.price * quantity;
  const bookingFee = Math.round(subtotal * 0.05);
  const total = subtotal + bookingFee;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      showToast('Please provide your name and email.', 'error');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newBooking = saveOrderBooking({
        eventId: event.id,
        eventTitle: event.title,
        domain: event.domain,
        eventDate: event.startDateTime,
        venue: event.venue,
        city: event.city,
        coverImage: event.coverImage,
        tierName: tier.name,
        quantity,
        seats,
        totalAmount: total,
        currency,
        customerName,
        customerEmail,
        customerPhone,
        paymentMethod,
      });

      setConfirmedBooking(newBooking);
      setStep('confirmation');
      onBookingSuccess(newBooking);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B99A70', '#E8E1D7', '#FFFFFF', '#16a34a'],
      });

      showToast(`Booking confirmed for ${customerName}!`, 'success');
    }, 150);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
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
          maxWidth: '620px',
          maxHeight: '92vh',
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
              BOOKMYSHOW SECURE CHECKOUT &middot; STEP {step === 'details' ? '1/2' : step === 'payment' ? '2/2' : 'CONFIRMED'}
            </span>
            <h3 id="checkout-modal-title" style={{ margin: '2px 0 0 0', fontSize: '1.25rem' }}>
              {step === 'confirmation' ? 'Booking Confirmed' : 'Instant Checkout'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout dialog"
            className="btn btn-secondary"
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {/* STEP 1: ATTENDEE CONTACT DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit}>
              {/* Event & Tier Summary */}
              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'var(--color-stone)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{event.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  {tier.name} &middot; {quantity} Seat(s): <strong>{seats.join(', ')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
                  <span>Total Payable:</span>
                  <span style={{ color: 'var(--color-champagne)' }}>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name of Primary Attendee *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Rao"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Email Address (for Digital QR Delivery) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="siddharth@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                  Phone / WhatsApp Number (for SMS Pass) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 45678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
              >
                Proceed to Payment &rarr;
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SIMULATION */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '10px' }}>
                  Choose Payment Gateway
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {(['UPI', 'CARD', 'NETBANKING'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: paymentMethod === method ? '2px solid var(--color-champagne)' : '1px solid var(--color-border)',
                        background: paymentMethod === method ? 'var(--color-stone)' : 'transparent',
                        color: 'var(--color-text)',
                        fontWeight: paymentMethod === method ? 700 : 500,
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {method === 'UPI' ? 'UPI / GPay' : method === 'CARD' ? 'Credit / Debit Card' : 'Net Banking'}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'var(--color-stone)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '20px',
                  fontSize: '0.84rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>{tier.name} x {quantity}</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  <span>Convenience &amp; Facility Fee</span>
                  <span>{formatPrice(bookingFee, currency)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '8px', fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--color-champagne)' }}>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginBottom: '20px' }}>
                <Lock size={14} style={{ color: '#16a34a' }} />
                <span>256-Bit SSL Encrypted &amp; PCI-DSS Level 1 Certified Gateway</span>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary"
                  style={{ flex: 2, justifyContent: 'center', padding: '12px' }}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Authorizing Payment...
                    </>
                  ) : (
                    `Pay ${formatPrice(total, currency)} & Confirm`
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: BOOKING CONFIRMATION PASS */}
          {step === 'confirmation' && confirmedBooking && (
            <div>
              <div
                style={{
                  border: '2px dashed var(--color-champagne)',
                  borderRadius: '14px',
                  padding: '24px',
                  background: 'var(--color-surface)',
                  position: 'relative',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '14px' }}>
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>
                      BOOKMYSHOW VERIFIED DIGITAL ENTRY
                    </span>
                    <h4 style={{ margin: '2px 0 0 0', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                      {confirmedBooking.eventTitle}
                    </h4>
                  </div>
                  <span className="badge badge-open">Confirmed</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Passholder</span>
                    <div style={{ fontWeight: 600 }}>{confirmedBooking.customerName}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Booking ID</span>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-champagne)' }}>
                      {confirmedBooking.id}
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Venue &amp; Seats</span>
                    <div>{confirmedBooking.venue} &middot; <strong>{confirmedBooking.seats?.join(', ')}</strong></div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>Tier &amp; Amount</span>
                    <div>{confirmedBooking.tierName} &middot; <strong>{formatPrice(confirmedBooking.totalAmount, currency)}</strong></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'var(--color-text)', color: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' }}>
                      <QrCode size={30} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                      <div>SCAN AT GATE TURNSTILE</div>
                      <div style={{ fontFamily: 'monospace' }}>SEC-GATE-PASS-OK</div>
                    </div>
                  </div>
                  <div style={{ color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={16} /> Issued
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Printer size={15} /> Print Pass
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
