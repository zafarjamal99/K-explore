import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Clock, CalendarPlus, Search, Ticket, ExternalLink, CheckCircle2 } from 'lucide-react';
import { TourDate } from '../types';
import { downloadTourIcs } from '../utils/calendarUtils';

interface TourCalendarProps {
  dates: TourDate[];
  artistName: string;
  onSelectTicketRsvp: (tour: TourDate) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function TourCalendar({
  dates,
  artistName,
  onSelectTicketRsvp,
  showToast,
}: TourCalendarProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = ['All', 'North America', 'Europe', 'Asia Pacific'];

  const filteredDates = useMemo(() => {
    return dates.filter((d) => {
      const matchRegion = selectedRegion === 'All' || d.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.venue.toLowerCase().includes(q);
      return matchRegion && matchSearch;
    });
  }, [dates, selectedRegion, searchQuery]);

  const handleDownloadCalendar = (tour: TourDate) => {
    downloadTourIcs(tour, artistName);
    showToast(`Downloaded .ics calendar invite for ${tour.city}.`, 'success');
  };

  const getStatusBadge = (status: TourDate['ticketStatus']) => {
    switch (status) {
      case 'ON_SALE':
        return <span className="badge badge-open">On Sale</span>;
      case 'SOLD_OUT':
        return <span className="badge badge-closed">Sold Out</span>;
      case 'POSTPONED':
        return <span className="badge badge-closing">Postponed</span>;
      case 'FREE_RSVP':
        return <span className="badge badge-open">Free RSVP</span>;
      default:
        return null;
    }
  };

  return (
    <section
      id="tour-dates"
      aria-labelledby="tour-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <div>
          <span className="eyebrow">
            GLOBAL PERFORMANCES &middot; 2026
          </span>
          <h2 id="tour-heading" style={{ margin: '4px 0 10px 0' }}>
            The Solstice World Tour
          </h2>
          <p style={{ maxWidth: '540px', color: 'var(--color-text-secondary)', fontSize: '0.9625rem' }}>
            Confirmed tour stops across iconic concert halls and amphitheaters worldwide. Direct authorized ticketing and VIP passes.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`btn btn-sm ${selectedRegion === reg ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontWeight: selectedRegion === reg ? 600 : 500 }}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Search */}
      <div style={{ marginBottom: '28px', maxWidth: '420px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, venue, or country..."
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '40px',
              paddingRight: '14px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              color: 'var(--color-text-primary)',
            }}
          />
        </div>
      </div>

      {/* Tour Dates List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {filteredDates.length === 0 ? (
          <div
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)',
            }}
          >
            <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
              No tour dates match your search query for "{searchQuery}".
            </p>
          </div>
        ) : (
          filteredDates.map((tour) => {
            const date = new Date(tour.eventDate);
            const monthStr = date.toLocaleString('en-US', { month: 'short' });
            const dayNum = date.getDate();
            const yearNum = date.getFullYear();

            return (
              <div
                key={tour.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-card)',
                  flexWrap: 'wrap',
                  gap: '16px',
                  transition: 'transform var(--motion-fast) ease, border-color var(--motion-fast) ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent-deep)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {/* Date Block & Venue Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', minWidth: '280px' }}>
                  {/* Visual Date Badge */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent-deep)', letterSpacing: '0.08em' }}>
                      {monthStr}
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '1.65rem', fontWeight: 400, fontFamily: 'var(--font-display)', lineHeight: 1, color: 'var(--color-text-primary)' }}>
                      {dayNum}
                    </span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <h4 style={{ fontSize: '1.1875rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                        {tour.city}, {tour.state ? `${tour.state}, ` : ''}{tour.country}
                      </h4>
                      {getStatusBadge(tour.ticketStatus)}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} style={{ color: 'var(--color-accent)' }} />
                      <span>{tour.venue}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={12} />
                      <span>Doors: {tour.doorTime || '7:00 PM'} &middot; Showtime: {tour.showTime || '8:00 PM'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleDownloadCalendar(tour)}
                    className="btn btn-secondary btn-sm"
                    title="Export event to .ics calendar"
                  >
                    <CalendarPlus size={14} />
                    <span className="hide-mobile">Add to Calendar</span>
                  </button>

                  {tour.ticketStatus === 'ON_SALE' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onSelectTicketRsvp(tour)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontWeight: 600 }}
                      >
                        <Ticket size={14} style={{ color: 'var(--color-accent-deep)' }} />
                        <span>RSVP Pass</span>
                      </button>

                      {tour.ticketUrl && (
                        <a
                          href={tour.ticketUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-sm"
                          style={{ gap: '6px' }}
                        >
                          <span>Official Tickets</span>
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </>
                  )}

                  {tour.ticketStatus === 'SOLD_OUT' && (
                    <button
                      type="button"
                      disabled
                      className="btn btn-secondary btn-sm"
                      style={{ opacity: 0.6 }}
                    >
                      Sold Out
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
