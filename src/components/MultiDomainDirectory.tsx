import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Music,
  Trophy,
  Theater,
  Briefcase,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Play,
} from 'lucide-react';
import { DomainEvent, EventDomain, CurrencyCode, TicketTier } from '../types';
import MultiDomainEventCard from './MultiDomainEventCard';
import EventDetailModal from './EventDetailModal';
import SeatAndTierSelectorModal from './SeatAndTierSelectorModal';
import MultiStepCheckoutModal from './MultiStepCheckoutModal';

interface MultiDomainDirectoryProps {
  events: DomainEvent[];
  activeDomain: EventDomain;
  selectedCity: string;
  currency: CurrencyCode;
  searchQuery: string;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onBookingComplete: () => void;
}

export default function MultiDomainDirectory({
  events,
  activeDomain,
  selectedCity,
  currency,
  searchQuery,
  showToast,
  onBookingComplete,
}: MultiDomainDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'date' | 'price-asc' | 'price-desc'>('popular');

  // Modals state
  const [inspectingEvent, setInspectingEvent] = useState<DomainEvent | null>(null);
  const [bookingEvent, setBookingEvent] = useState<DomainEvent | null>(null);
  const [checkoutData, setCheckoutData] = useState<{
    event: DomainEvent;
    tier: TicketTier;
    quantity: number;
    seats: string[];
  } | null>(null);
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);

  // Derive categories for the current domain
  const domainEvents = useMemo(() => {
    return events.filter((e) => e.domain === activeDomain);
  }, [events, activeDomain]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    domainEvents.forEach((e) => cats.add(e.category));
    return ['All', ...Array.from(cats)];
  }, [domainEvents]);

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...domainEvents];

    // City Filter
    if (selectedCity && selectedCity !== 'All Cities') {
      result = result.filter((e) => e.city.toLowerCase() === selectedCity.toLowerCase());
    }

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.minPrice - b.minPrice;
      if (sortBy === 'price-desc') return b.minPrice - a.minPrice;
      if (sortBy === 'date') return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });

    return result;
  }, [domainEvents, selectedCity, selectedCategory, searchQuery, sortBy]);

  const domainDescriptions: Record<EventDomain, { title: string; subtitle: string; icon: React.ReactNode }> = {
    concerts: {
      title: 'Concerts, Arena Tours & Classical Galas',
      subtitle: 'Official K Explore live concert discovery. Explore world-class stadium tours, intimate jazz lounges, and orchestral acoustics.',
      icon: <Music size={22} style={{ color: 'var(--color-champagne)' }} />,
    },
    sports: {
      title: 'Stadium Sports, Derbies & Motorsports',
      subtitle: 'Experience live football championships, international T20 cricket, and street-circuit motorsport grand prix under stadium floodlights.',
      icon: <Trophy size={22} style={{ color: 'var(--color-champagne)' }} />,
    },
    theater: {
      title: 'Broadway Revivals, Musicals & Classical Theater',
      subtitle: 'Live West End dramas, timeless Shakespearean revivals, and Broadway-scale musicals with world-renowned repertory troupes.',
      icon: <Theater size={22} style={{ color: 'var(--color-champagne)' }} />,
    },
    conferences: {
      title: 'Tech Summits, AI Keynotes & Design Congresses',
      subtitle: 'Global gatherings of foundation model researchers, frontier software engineers, and luxury UX architects.',
      icon: <Briefcase size={22} style={{ color: 'var(--color-champagne)' }} />,
    },
  };

  const currentDomainMeta = domainDescriptions[activeDomain];

  return (
    <section
      id="multi-domain-directory"
      aria-labelledby="domain-section-title"
      className="reveal"
      style={{
        paddingTop: '48px',
        paddingBottom: '64px',
      }}
    >
      {/* Domain Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            {currentDomainMeta.icon}
            <span className="eyebrow" style={{ margin: 0, textTransform: 'uppercase' }}>
              K EXPLORE &middot; LIVE EXPERIENCES &middot; {activeDomain}
            </span>
          </div>
          <h2 id="domain-section-title" style={{ margin: '2px 0 8px 0', fontSize: '1.9rem' }}>
            {currentDomainMeta.title}
          </h2>
          <p style={{ maxWidth: '640px', color: 'var(--color-text-secondary)', fontSize: '0.94rem', margin: 0 }}>
            {currentDomainMeta.subtitle}
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} style={{ color: 'var(--color-text-secondary)' }} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="popular">Popularity &amp; Trending</option>
            <option value="date">Date (Earliest First)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8125rem', fontWeight: selectedCategory === cat ? 600 : 500 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '64px 20px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '16px',
            border: '1px dashed var(--color-border)',
          }}
        >
          <Sparkles size={36} style={{ margin: '0 auto 12px auto', color: 'var(--color-champagne)' }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>No Events Match Your Filters</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '20px' }}>
            Try switching city to &ldquo;All Cities&rdquo; or clearing your search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
            }}
            className="btn btn-secondary btn-sm"
          >
            Reset Category
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredEvents.map((event) => (
            <MultiDomainEventCard
              key={event.id}
              event={event}
              currency={currency}
              onSelectEvent={(ev) => setInspectingEvent(ev)}
              onQuickBook={(ev) => setBookingEvent(ev)}
              onWatchVideo={(url, title) => setVideoModal({ url, title })}
            />
          ))}
        </div>
      )}

      {/* Event Detail Inspection Modal */}
      {inspectingEvent && (
        <EventDetailModal
          event={inspectingEvent}
          currency={currency}
          onClose={() => setInspectingEvent(null)}
          onBookTickets={(ev) => {
            setInspectingEvent(null);
            setBookingEvent(ev);
          }}
          showToast={showToast}
        />
      )}

      {/* Visual Seat Map & Tier Selector Modal */}
      {bookingEvent && (
        <SeatAndTierSelectorModal
          event={bookingEvent}
          currency={currency}
          onClose={() => setBookingEvent(null)}
          onProceedToCheckout={(ev, tier, qty, seats) => {
            setBookingEvent(null);
            setCheckoutData({ event: ev, tier, quantity: qty, seats });
          }}
          showToast={showToast}
        />
      )}

      {/* Multi-Step Checkout Modal */}
      {checkoutData && (
        <MultiStepCheckoutModal
          event={checkoutData.event}
          tier={checkoutData.tier}
          quantity={checkoutData.quantity}
          seats={checkoutData.seats}
          currency={currency}
          onClose={() => setCheckoutData(null)}
          onBookingSuccess={() => {
            onBookingComplete();
          }}
          showToast={showToast}
        />
      )}

      {/* Highlight Reel Video Lightbox Modal */}
      {videoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setVideoModal(null);
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              aspectRatio: '16/9',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            <button
              type="button"
              onClick={() => setVideoModal(null)}
              aria-label="Close video"
              className="btn btn-secondary"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                padding: 0,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none',
                zIndex: 10,
              }}
            >
              <X size={16} />
            </button>
            <iframe
              src={`${videoModal.url}?autoplay=1`}
              title={videoModal.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
