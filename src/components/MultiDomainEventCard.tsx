import React from 'react';
import { MapPin, Calendar, Clock, Play, Ticket, Sparkles } from 'lucide-react';
import { DomainEvent, CurrencyCode } from '../types';
import { formatPrice } from '../utils/storageUtils';

interface MultiDomainEventCardProps {
  event: DomainEvent;
  currency: CurrencyCode;
  onSelectEvent: (event: DomainEvent) => void;
  onQuickBook: (event: DomainEvent) => void;
  onWatchVideo?: (videoUrl: string, title: string) => void;
}

export default function MultiDomainEventCard({
  event,
  currency,
  onSelectEvent,
  onQuickBook,
  onWatchVideo,
}: MultiDomainEventCardProps) {
  const formattedDate = new Date(event.startDateTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <article
      className="card-surface"
      style={{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '14px',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => onSelectEvent(event)}
    >
      {/* Media Cover Image */}
      <div style={{ position: 'relative', height: '240px', width: '100%', overflow: 'hidden' }}>
        <img
          src={event.coverImage}
          alt={event.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {event.isTrending && (
            <span
              style={{
                background: 'rgba(239, 68, 68, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#fff',
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 8px',
                borderRadius: '4px',
              }}
            >
              Trending
            </span>
          )}
          <span
            style={{
              background: 'rgba(17, 19, 18, 0.85)',
              backdropFilter: 'blur(4px)',
              color: 'var(--color-champagne)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '3px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(185, 154, 112, 0.3)',
            }}
          >
            {event.category}
          </span>
        </div>

        {/* Video Preview Button Overlay if available */}
        {event.highlightVideoUrl && onWatchVideo && (
          <button
            type="button"
            aria-label={`Watch teaser for ${event.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onWatchVideo(event.highlightVideoUrl!, event.title);
            }}
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              color: '#fff',
              padding: '5px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Play size={12} fill="#fff" />
            <span>Teaser Clip</span>
          </button>
        )}

        {/* Language & Age Ribbon */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            color: '#eee',
            fontSize: '0.72rem',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {event.language} &middot; {event.ageRestriction}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Date & Time */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.8125rem',
            color: 'var(--color-champagne)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} />
            {formattedDate}
          </span>
          <span>&middot;</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)', fontWeight: 400 }}>
            <Clock size={13} />
            {event.durationFormatted}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.35,
            margin: '0 0 8px 0',
            color: 'var(--color-text)',
            fontWeight: 600,
          }}
        >
          {event.title}
        </h3>

        {/* Venue & City */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '14px',
          }}
        >
          <MapPin size={14} style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {event.venue}, {event.city}
          </span>
        </div>

        {/* Short Excerpt */}
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            margin: '0 0 16px 0',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {event.description}
        </p>

        {/* Card Footer: Price & CTA */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
              From
            </span>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)' }}>
              {formatPrice(event.minPrice, currency)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickBook(event);
            }}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Ticket size={14} />
            <span>Book Tickets</span>
          </button>
        </div>
      </div>
    </article>
  );
}
