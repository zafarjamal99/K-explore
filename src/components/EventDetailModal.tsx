import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Play,
  Ticket,
  Users,
  Shield,
  Sparkles,
  Trophy,
  Theater,
  Briefcase,
  Share2,
  Check,
} from 'lucide-react';
import { DomainEvent, CurrencyCode } from '../types';
import { formatPrice } from '../utils/storageUtils';

interface EventDetailModalProps {
  event: DomainEvent;
  currency: CurrencyCode;
  onClose: () => void;
  onBookTickets: (event: DomainEvent) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function EventDetailModal({
  event,
  currency,
  onClose,
  onBookTickets,
  showToast,
}: EventDetailModalProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'photo'>('photo');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + '#' + event.slug);
    setCopiedLink(true);
    showToast('Event link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedDate = new Date(event.startDateTime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-detail-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'var(--modal-overlay)',
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
          maxWidth: '880px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '0',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Modal Cover Image / Video Embed */}
        <div style={{ position: 'relative', width: '100%', height: '320px', backgroundColor: '#000' }}>
          {activeMediaTab === 'video' && event.highlightVideoUrl ? (
            <iframe
              src={`${event.highlightVideoUrl}?autoplay=1`}
              title={`${event.title} Highlight Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <img
              src={event.coverImage}
              alt={event.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="btn btn-secondary"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: '50%',
              background: 'rgba(17, 19, 18, 0.75)',
              color: '#fff',
              border: 'none',
              zIndex: 10,
            }}
          >
            <X size={18} />
          </button>

          {/* Media switcher if video is available */}
          {event.highlightVideoUrl && (
            <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <button
                type="button"
                onClick={() => setActiveMediaTab('photo')}
                className={`btn btn-sm ${activeMediaTab === 'photo' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem' }}
              >
                Cover Photo
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`btn btn-sm ${activeMediaTab === 'video' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Play size={12} fill="currentColor" /> Watch Teaser
              </button>
            </div>
          )}

          {/* Domain Badge */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
            <span className="badge badge-open" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {event.domain}
            </span>
            <span
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#fff',
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              {event.category}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '32px' }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 id="event-detail-title" style={{ fontSize: '1.75rem', lineHeight: 1.25, margin: '0 0 10px 0' }}>
                {event.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} style={{ color: 'var(--color-champagne)' }} />
                  {formattedDate}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} style={{ color: 'var(--color-champagne)' }} />
                  {event.durationFormatted} (Doors: {event.doorsOpenTime || '1 hr prior'})
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={15} style={{ color: 'var(--color-champagne)' }} />
                  {event.venue}, {event.city}
                </span>
              </div>
            </div>

            {/* Price & Book CTA */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Tickets start from</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-champagne)', marginBottom: '8px' }}>
                {formatPrice(event.minPrice, currency)}
              </div>
              <button
                type="button"
                onClick={() => onBookTickets(event)}
                className="btn btn-primary"
                style={{ padding: '10px 24px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Ticket size={16} /> Select Seats &amp; Book
              </button>
            </div>
          </div>

          {/* Description */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>About this Event</h4>
            <p style={{ margin: 0, fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--color-text)' }}>
              {event.description}
            </p>
          </div>

          {/* DOMAIN-SPECIFIC EXTENSION PANELS */}

          {/* 1. CONCERTS EXTENSION */}
          {event.domain === 'concerts' && event.concertDetails && (
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--color-stone)',
                border: '1px solid var(--color-border)',
                marginBottom: '24px',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-champagne)' }}>
                Concert Lineup &amp; Production Specs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Headliner</span>
                  <strong>{event.concertDetails.headliner}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Genre</span>
                  <strong>{event.concertDetails.genre}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Supporting Acts</span>
                  <span>{event.concertDetails.lineup.join(', ')}</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. SPORTS EXTENSION */}
          {event.domain === 'sports' && event.sportsDetails && (
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--color-stone)',
                border: '1px solid var(--color-border)',
                marginBottom: '24px',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-champagne)' }}>
                Matchday Details &amp; Tournament
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Tournament</span>
                  <strong>{event.sportsDetails.tournament}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Competing Teams</span>
                  <strong>{event.sportsDetails.homeTeam} vs {event.sportsDetails.awayTeam}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Status</span>
                  <span className="badge badge-open">{event.sportsDetails.matchStatus}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. THEATER EXTENSION */}
          {event.domain === 'theater' && event.theaterDetails && (
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--color-stone)',
                border: '1px solid var(--color-border)',
                marginBottom: '24px',
              }}
            >
              <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-champagne)' }}>
                Theatrical Production Specs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Playwright &amp; Director</span>
                  <strong>{event.theaterDetails.playwright}</strong> (Dir. {event.theaterDetails.director})
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Acts &amp; Intermission</span>
                  <span>{event.theaterDetails.actsCount} Acts &middot; {event.theaterDetails.hasIntermission ? 'With 20m Intermission' : 'No Intermission'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Dress Code</span>
                  <strong>{event.theaterDetails.dressCode}</strong>
                </div>
              </div>
            </div>
          )}

          {/* 4. CONFERENCES EXTENSION */}
          {event.domain === 'conferences' && event.conferenceDetails && (
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--color-stone)',
                border: '1px solid var(--color-border)',
                marginBottom: '24px',
              }}
            >
              <h4 style={{ margin: '0 0 14px 0', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-champagne)' }}>
                Featured Keynote Speakers &amp; Tracks
              </h4>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {event.conferenceDetails.keynoteSpeakers.map((sp) => (
                  <div key={sp.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={sp.avatar}
                      alt={sp.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ fontSize: '0.8125rem' }}>
                      <div style={{ fontWeight: 600 }}>{sp.name}</div>
                      <div style={{ color: 'var(--color-text-secondary)' }}>{sp.role}, {sp.company}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {event.conferenceDetails.tracks.map((t) => (
                  <span key={t} className="badge badge-open" style={{ fontSize: '0.75rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ticket Tiers Overview */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem' }}>Available Ticket Tiers</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {event.ticketTiers.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{tier.name}</strong>
                    <span style={{ fontWeight: 700, color: 'var(--color-champagne)' }}>
                      {formatPrice(tier.price, currency)}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                    {tier.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    {tier.available} of {tier.capacity} passes remaining
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {copiedLink ? <Check size={14} color="#16a34a" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copied' : 'Share Event'}</span>
            </button>

            <button
              type="button"
              onClick={() => onBookTickets(event)}
              className="btn btn-primary"
              style={{ padding: '10px 28px', fontWeight: 600 }}
            >
              Book Now &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
