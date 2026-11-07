import React, { useState, useMemo, useRef } from 'react';
import {
  Compass,
  Grid,
  List,
  ArrowUpDown,
  X,
  Check,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import FeaturedEvent from './components/FeaturedEvent';
import ActivityOverview from './components/ActivityOverview';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import EventCard from './components/EventCard';
import EmptyState from './components/EmptyState';
import EventDetailsModal from './components/EventDetailsModal';
import RegistrationForm from './features/registration/RegistrationForm';
import MyRegistrationsModal from './components/MyRegistrationsModal';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import { EVENTS, CATEGORIES } from './data/events';
import { getStoredRegistrations } from './utils/storageUtils';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-asc');
  const [onlyOpenEvents, setOnlyOpenEvents] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modals & Drawers
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [isMyRegistrationsOpen, setIsMyRegistrationsOpen] = useState(false);

  // Registrations state
  const [registrations, setRegistrations] = useState(() => getStoredRegistrations());

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const eventsSectionRef = useRef(null);
  const featuredSectionRef = useRef(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  const isEventRegistered = (eventId) => {
    return registrations.some((r) => r.eventId === eventId);
  };

  const featuredEvent = useMemo(() => {
    return EVENTS.find((e) => e.isFeatured) || EVENTS[0];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { All: EVENTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = EVENTS.filter((e) => e.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    let result = [...EVENTS];

    if (selectedCategory !== 'All') {
      result = result.filter(
        (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((e) => {
        const inTitle = e.title.toLowerCase().includes(q);
        const inDesc = e.shortDescription?.toLowerCase().includes(q) || e.description?.toLowerCase().includes(q);
        const inVenue = e.venue?.toLowerCase().includes(q) || e.campusLocation?.toLowerCase().includes(q);
        const inCategory = e.category.toLowerCase().includes(q);
        const inSpeaker = e.speaker?.name?.toLowerCase().includes(q);
        const inTags = e.tags?.some((t) => t.toLowerCase().includes(q));
        return inTitle || inDesc || inVenue || inCategory || inSpeaker || inTags;
      });
    }

    if (onlyOpenEvents) {
      result = result.filter((e) => e.status === 'open' || e.status === 'closing_soon');
    }

    result.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'popular') {
        return (b.registeredCount || 0) - (a.registeredCount || 0);
      }
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, onlyOpenEvents, sortBy]);

  // Activate luxury scroll reveals
  useScrollReveal([filteredEvents, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setOnlyOpenEvents(false);
    setSortBy('date-asc');
  };

  const handleScrollToEvents = () => {
    eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToFeatured = () => {
    featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryFromFooter = (cat) => {
    setSelectedCategory(cat);
    handleScrollToEvents();
  };

  return (
    <div className="app-root">
      {/* Top Luxury Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenMyRegistrations={() => setIsMyRegistrationsOpen(true)}
        registrationCount={registrations.length}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateEvents={handleScrollToEvents}
        onNavigateAbout={() => {
          const el = document.getElementById('about');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="container">
        {/* Screen A: Ultra-Luxury Hero Section */}
        <Hero
          onExploreClick={handleScrollToEvents}
          onFeaturedClick={handleScrollToFeatured}
        />

        {/* Dynamic Key Stats */}
        <StatsBanner />

        {/* Featured Curator Spotlight */}
        <div ref={featuredSectionRef}>
          <FeaturedEvent
            event={featuredEvent}
            onSelectEvent={(ev) => setSelectedEventDetails(ev)}
            onRegisterClick={(ev) => setRegisteringEvent(ev)}
            isRegistered={isEventRegistered(featuredEvent.id)}
          />
        </div>

        {/* Screen B: Live Event Activity Panel */}
        <ActivityOverview
          events={EVENTS}
          registrations={registrations}
        />

        {/* Event Discovery Section */}
        <section
          ref={eventsSectionRef}
          id="events"
          aria-labelledby="discovery-heading"
          className="reveal"
          style={{ paddingTop: '32px', scrollMarginTop: '80px' }}
        >
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '32px',
            }}
          >
            <span className="eyebrow">
              CAMPUS CALENDAR
            </span>
            <h2 id="discovery-heading">
              Explore Upcoming Events
            </h2>
            <p style={{ maxWidth: '640px', fontSize: '0.9625rem', color: 'var(--color-text-secondary)' }}>
              Search across key topics, filter by collegiate faculty categories, or view countdown deadlines.
            </p>
          </div>

          {/* Search & Control Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '24px',
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredEvents.length}
              isFiltered={selectedCategory !== 'All' || !!searchQuery || onlyOpenEvents}
            />

            {/* Sort & Quick Filter Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              {/* Only Open Toggle */}
              <button
                type="button"
                onClick={() => setOnlyOpenEvents(!onlyOpenEvents)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${onlyOpenEvents ? 'var(--color-accent-deep)' : 'var(--color-border)'}`,
                  backgroundColor: onlyOpenEvents
                    ? 'var(--color-accent-subtle)'
                    : 'var(--color-surface)',
                  color: onlyOpenEvents ? 'var(--color-accent-deep)' : 'var(--color-text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--motion-fast) ease',
                }}
              >
                {onlyOpenEvents && <Check size={13} />}
                Open Seats Only
              </button>

              {/* Sort Selector */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0 14px',
                  height: '44px',
                }}
              >
                <ArrowUpDown size={14} style={{ color: 'var(--color-text-muted)' }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort events"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                  }}
                >
                  <option value="date-asc">Date: Earliest First</option>
                  <option value="date-desc">Date: Latest First</option>
                  <option value="title-asc">Title: A &ndash; Z</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* View Mode Toggle (Grid / List) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-surface-muted)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid layout"
                  style={{
                    border: 'none',
                    background: viewMode === 'grid' ? 'var(--color-surface)' : 'transparent',
                    color: viewMode === 'grid' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'grid' ? 'var(--shadow-card)' : 'none',
                  }}
                >
                  <Grid size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="List layout"
                  style={{
                    border: 'none',
                    background: viewMode === 'list' ? 'var(--color-surface)' : 'transparent',
                    color: viewMode === 'list' ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: viewMode === 'list' ? 'var(--shadow-card)' : 'none',
                  }}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div id="categories" style={{ marginBottom: '24px' }}>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          </div>

          {/* Active Filter Indicators & Match Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              fontSize: '0.84rem',
              color: 'var(--color-text-secondary)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              Showing <strong style={{ color: 'var(--color-text-primary)' }}>{filteredEvents.length}</strong> of {EVENTS.length} campus experiences
            </div>

            {(selectedCategory !== 'All' || searchQuery || onlyOpenEvents) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8125rem',
                    color: 'var(--color-accent-deep)',
                    fontWeight: 600,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} /> Clear active filters
                </button>
              </div>
            )}
          </div>

          {/* Events Grid or List Rendering */}
          {filteredEvents.length === 0 ? (
            <EmptyState
              onReset={handleResetFilters}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          ) : (
            <div
              className="events-grid"
              style={
                viewMode === 'list'
                  ? { gridTemplateColumns: '1fr', gap: '20px' }
                  : undefined
              }
            >
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelectEvent={(ev) => setSelectedEventDetails(ev)}
                  onRegisterClick={(ev) => setRegisteringEvent(ev)}
                  isRegistered={isEventRegistered(event.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Platform Pillars & About */}
        <AboutSection onExploreClick={handleScrollToEvents} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategoryFromFooter}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateEvents={handleScrollToEvents}
      />

      {/* Modals & Dialogs */}
      {selectedEventDetails && (
        <EventDetailsModal
          event={selectedEventDetails}
          onClose={() => setSelectedEventDetails(null)}
          onRegisterClick={(ev) => setRegisteringEvent(ev)}
          isRegistered={isEventRegistered(selectedEventDetails.id)}
          showToast={showToast}
        />
      )}

      {registeringEvent && (
        <RegistrationForm
          selectedEvent={registeringEvent}
          availableEvents={EVENTS}
          onClose={() => setRegisteringEvent(null)}
          onRegistrationSuccess={(newTicket) => {
            const updated = getStoredRegistrations();
            setRegistrations(updated);
          }}
          showToast={showToast}
        />
      )}

      {isMyRegistrationsOpen && (
        <MyRegistrationsModal
          onClose={() => setIsMyRegistrationsOpen(false)}
          onExploreEvents={handleScrollToEvents}
          showToast={showToast}
          onRegistrationsChange={(updated) => setRegistrations(updated)}
        />
      )}

      {/* Global Toast */}
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
