import React from 'react';
import { Music, Trophy, Theater as TheaterIcon, Briefcase, MapPin, Search, Ticket, Globe } from 'lucide-react';
import { EventDomain, CurrencyCode } from '../types';
import { CITIES } from '../data/multiDomainData';

interface DomainBarProps {
  activeDomain: EventDomain;
  onSelectDomain: (domain: EventDomain) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  currency: CurrencyCode;
  onSelectCurrency: (curr: CurrencyCode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
}

export default function DomainBar({
  activeDomain,
  onSelectDomain,
  selectedCity,
  onSelectCity,
  currency,
  onSelectCurrency,
  searchQuery,
  onSearchChange,
  onOpenMyBookings,
  bookingsCount,
}: DomainBarProps) {
  const domains: { id: EventDomain; label: string; icon: React.ReactNode; countLabel: string }[] = [
    { id: 'concerts', label: 'Concerts & Live Music', icon: <Music size={16} />, countLabel: 'BookMyShow Live' },
    { id: 'sports', label: 'Sports & Stadiums', icon: <Trophy size={16} />, countLabel: 'Matchdays & F1' },
    { id: 'theater', label: 'Theater & Musicals', icon: <TheaterIcon size={16} />, countLabel: 'Broadway & NCPA' },
    { id: 'conferences', label: 'Conferences & Summits', icon: <Briefcase size={16} />, countLabel: 'AI & Frontier Tech' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: '64px',
        zIndex: 40,
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div className="container" style={{ padding: '12px 16px' }}>
        {/* Top Control Bar: Search, City, Currency, My Bookings */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '10px',
          }}
        >
          {/* Universal Search Bar */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 260px',
              maxWidth: '460px',
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-secondary)',
              }}
            />
            <input
              type="text"
              placeholder="Search concerts, stadiums, plays, or keynote speakers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.84rem',
              }}
            />
          </div>

          {/* Quick Selectors: City, Currency, My Bookings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* City Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-stone)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <MapPin size={13} style={{ color: 'var(--color-champagne)' }} />
              <select
                value={selectedCity}
                onChange={(e) => onSelectCity(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-stone)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <Globe size={13} style={{ color: 'var(--color-champagne)' }} />
              <select
                value={currency}
                onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-text)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* My Bookings Pill */}
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 600 }}
            >
              <Ticket size={14} style={{ color: 'var(--color-champagne)' }} />
              <span>My Tickets</span>
              {bookingsCount > 0 && (
                <span className="badge badge-open" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                  {bookingsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Domain Navigation Tabs (BookMyShow Horizontal Bar) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px',
            scrollbarWidth: 'none',
          }}
        >
          {domains.map((dom) => {
            const isActive = activeDomain === dom.id;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => onSelectDomain(dom.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '24px',
                  border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                  background: isActive ? 'var(--color-stone)' : 'transparent',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(185, 154, 112, 0.2)' : 'none',
                }}
              >
                <span style={{ color: isActive ? 'var(--color-champagne)' : 'inherit', display: 'flex', alignItems: 'center' }}>
                  {dom.icon}
                </span>
                <span>{dom.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
