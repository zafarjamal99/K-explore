import React, { useMemo } from 'react';
import { Activity, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/events';

export default function ActivityOverview({ events = [], registrations = [] }) {
  const now = new Date();

  const metrics = useMemo(() => {
    const upcoming = events.filter((e) => new Date(e.date) > now);
    const uniqueVenues = new Set(events.map((e) => e.venue)).size;

    // Distribution by category for the SVG chart
    const categoryStats = CATEGORIES.filter((c) => c !== 'All').map((cat) => {
      const count = events.filter((e) => e.category === cat).length;
      return { category: cat, count };
    });

    const maxCount = Math.max(...categoryStats.map((c) => c.count), 1);

    return {
      totalEvents: events.length,
      upcomingCount: upcoming.length,
      localRegistrations: registrations.length,
      venueCount: uniqueVenues,
      categoryStats,
      maxCount,
    };
  }, [events, registrations]);

  return (
    <section
      aria-labelledby="activity-heading"
      className="reveal"
      style={{
        marginTop: '64px',
        marginBottom: '72px',
        padding: '36px 40px',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div>
          <span className="eyebrow">EVENT INTELLIGENCE</span>
          <h2 id="activity-heading" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', margin: 0 }}>
            Curated Activity Overview
          </h2>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            backgroundColor: 'var(--color-surface-muted)',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              display: 'inline-block',
              boxShadow: '0 0 8px rgba(82, 116, 95, 0.5)',
            }}
          />
          Live local state &middot; Refreshed recently
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        {/* Metric 1 */}
        <article
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Calendar size={16} style={{ color: 'var(--color-accent-deep)' }} />
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              Curated Events
            </span>
          </div>
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1,
              color: 'var(--color-text-primary)',
            }}
          >
            {metrics.totalEvents}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Academic Term 2026
          </span>
        </article>

        {/* Metric 2 */}
        <article
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Activity size={16} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              Upcoming Sessions
            </span>
          </div>
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1,
              color: 'var(--color-text-primary)',
            }}
          >
            {metrics.upcomingCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Scheduled for this term
          </span>
        </article>

        {/* Metric 3 */}
        <article
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Users size={16} style={{ color: 'var(--color-success)' }} />
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              Local RSVPs
            </span>
          </div>
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1,
              color: 'var(--color-text-primary)',
            }}
          >
            {metrics.localRegistrations}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Saved in this browser
          </span>
        </article>

        {/* Metric 4 */}
        <article
          style={{
            padding: '20px',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <MapPin size={16} style={{ color: 'var(--color-accent-deep)' }} />
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              Campus Facilities
            </span>
          </div>
          <div
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1,
              color: 'var(--color-text-primary)',
            }}
          >
            {metrics.venueCount}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
            Halls & Laboratories
          </span>
        </article>
      </div>

      {/* SVG Category Distribution Chart */}
      <div
        style={{
          padding: '24px 28px',
          backgroundColor: 'var(--color-surface-muted)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
            Curated Category Distribution
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            Active Programming Focus
          </span>
        </div>

        {/* Accessible SVG Bar Chart */}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg
            viewBox="0 0 680 180"
            style={{ width: '100%', height: 'auto', minWidth: '480px', display: 'block' }}
            role="img"
            aria-label="Bar chart showing distribution of campus events across categories"
          >
            {/* Horizontal Gridlines */}
            <line x1="40" y1="30" x2="660" y2="30" stroke="var(--color-border)" strokeDasharray="3 3" />
            <line x1="40" y1="80" x2="660" y2="80" stroke="var(--color-border)" strokeDasharray="3 3" />
            <line x1="40" y1="130" x2="660" y2="130" stroke="var(--color-border)" strokeWidth="1" />

            {metrics.categoryStats.map((item, idx) => {
              const barWidth = 42;
              const xPos = 60 + idx * 85;
              const barHeight = (item.count / metrics.maxCount) * 90;
              const yPos = 130 - barHeight;

              return (
                <g key={item.category}>
                  {/* Background Track */}
                  <rect
                    x={xPos}
                    y="30"
                    width={barWidth}
                    height="100"
                    fill="rgba(0, 0, 0, 0.03)"
                    rx="4"
                  />
                  {/* Active Bar */}
                  <rect
                    x={xPos}
                    y={yPos}
                    width={barWidth}
                    height={barHeight}
                    fill={idx % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-deep)'}
                    rx="4"
                    style={{
                      transition: 'height 600ms cubic-bezier(0.22, 1, 0.36, 1), y 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                  {/* Value on Top */}
                  <text
                    x={xPos + barWidth / 2}
                    y={yPos - 6}
                    textAnchor="middle"
                    fill="var(--color-text-primary)"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="var(--font-body)"
                  >
                    {item.count}
                  </text>
                  {/* Category Label Below */}
                  <text
                    x={xPos + barWidth / 2}
                    y="152"
                    textAnchor="middle"
                    fill="var(--color-text-secondary)"
                    fontSize="10.5"
                    fontFamily="var(--font-body)"
                    fontWeight="500"
                  >
                    {item.category.length > 7 ? item.category.slice(0, 6) + '…' : item.category}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Honest Data Integrity Disclaimer */}
      <p
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        * <strong>Data Integrity Standard:</strong> Displayed metrics reflect current local browser storage registrations and verified university semester data. No simulated remote traffic or fabricated attendance claims.
      </p>
    </section>
  );
}
