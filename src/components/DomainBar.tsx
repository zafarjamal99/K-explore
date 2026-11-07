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
  const domains: { id: EventDomain; label: string; icon: React.ReactNode }[] = [
    { id: 'concerts', label: 'Concerts & Live Music', icon: <Music size={16} /> },
    { id: 'sports', label: 'Sports & Stadiums', icon: <Trophy size={16} /> },
    { id: 'theater', label: 'Theater & Musicals', icon: <TheaterIcon size={16} /> },
    { id: 'conferences', label: 'Conferences & Summits', icon: <Briefcase size={16} /> },
  ];

  return (
    <div
      id="domain-explorer-bar"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '28px',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top Section: Domain Options Buttons */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
          <span className="eyebrow" style={{ margin: 0, color: 'var(--color-champagne)' }}>
            EXPLORE EVENT DOMAINS
          </span>
          <span style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
            Curated Live Experiences &middot; Instant Ticketing
          </span>
        </div>

        {/* 4 Domain Navigation Options */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '10px',
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
                  gap: '10px',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  border: isActive ? '2px solid var(--color-champagne)' : '1px solid var(--color-border)',
                  background: isActive ? 'var(--color-stone)' : 'var(--color-bg)',
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(185, 154, 112, 0.2)' : 'none',
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--color-champagne)' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {dom.icon}
                </span>
                <span>{dom.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Search Bar & Filters (City, Currency, My Tickets) */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 280px',
            maxWidth: '520px',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
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
              height: '42px',
              padding: '8px 14px 8px 40px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.86rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Filter Controls: City, Currency, My Tickets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* City Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-stone)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              height: '42px',
            }}
          >
            <MapPin size={14} style={{ color: 'var(--color-champagne)' }} />
            <select
              value={selectedCity}
              onChange={(e) => onSelectCity(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '0.8125rem',
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

          {/* Currency Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--color-stone)',
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              height: '42px',
            }}
          >
            <Globe size={14} style={{ color: 'var(--color-champagne)' }} />
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                fontSize: '0.8125rem',
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

          {/* My Tickets Button */}
          <button
            type="button"
            onClick={onOpenMyBookings}
            className="btn btn-secondary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '42px',
              padding: '0 14px',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            <Ticket size={15} style={{ color: 'var(--color-champagne)' }} />
            <span>My Tickets</span>
            {bookingsCount > 0 && (
              <span className="badge badge-open" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                {bookingsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
