import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ArtistBio from './components/ArtistBio';
import Discography from './components/Discography';
import TourCalendar from './components/TourCalendar';
import LiveVideoPlayer from './components/LiveVideoPlayer';
import MediaGallery from './components/MediaGallery';
import BlogSection from './components/BlogSection';
import BookingForm from './components/BookingForm';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import TicketRsvpModal from './components/TicketRsvpModal';
import AdminDashboard from './components/AdminDashboard';
import Toast from './components/Toast';

import { ARTIST_PROFILE } from './data/artistData';
import { TourDate, BookingInquiry } from './types';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import { getCustomTourDates, getStoredInquiries } from './utils/storageUtils';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Dialog & Modal states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [ticketRsvpTour, setTicketRsvpTour] = useState<TourDate | null>(null);

  // Inquiries and custom tours count for badges
  const [customTours, setCustomTours] = useState<TourDate[]>(() => getCustomTourDates());
  const [inquiriesCount, setInquiriesCount] = useState<number>(() => getStoredInquiries().length);

  // Global Toast notification system
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    id: number;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  const handleInquiryCreated = (_inq: BookingInquiry) => {
    setInquiriesCount(getStoredInquiries().length);
  };

  const handleTourDatesUpdated = () => {
    setCustomTours(getCustomTourDates());
  };

  // Combine static artist tour dates with user-created custom dates from CMS
  const allTourDates = useMemo(() => {
    return [...customTours, ...ARTIST_PROFILE.tours];
  }, [customTours]);

  // Activate luxury editorial scroll reveal
  useScrollReveal([allTourDates.length]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Structured Data Schema (Schema.org MusicGroup & Event)
  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: ARTIST_PROFILE.name,
      genre: ARTIST_PROFILE.genre,
      url: window.location.origin,
      image: ARTIST_PROFILE.portraitImageUrl,
      description: ARTIST_PROFILE.tagline,
      sameAs: [
        ARTIST_PROFILE.spotifyUrl,
        ARTIST_PROFILE.appleMusicUrl,
        ARTIST_PROFILE.youtubeUrl,
        ARTIST_PROFILE.instagramUrl,
      ],
      album: ARTIST_PROFILE.albums.map((album) => ({
        '@type': 'MusicAlbum',
        name: album.title,
        datePublished: album.releaseDate,
        image: album.coverImage,
      })),
      event: allTourDates.slice(0, 5).map((tour) => ({
        '@type': 'MusicEvent',
        name: `${ARTIST_PROFILE.name} - ${tour.venue}`,
        startDate: tour.eventDate,
        location: {
          '@type': 'Place',
          name: tour.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: tour.city,
            addressCountry: tour.country,
          },
        },
      })),
    };

    let scriptTag = document.getElementById('musicgroup-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'musicgroup-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, [allTourDates]);

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingInquiriesCount={inquiriesCount}
      />

      {/* Main Content Layout */}
      <main id="main-content" className="container" style={{ flex: 1, paddingBottom: '32px' }}>
        {/* Hero Section */}
        <Hero
          artist={ARTIST_PROFILE}
          onExploreTour={() => scrollToSection('tour-dates')}
          onListenMusic={() => scrollToSection('discography')}
        />

        {/* Artist Story & Ensemble Specs */}
        <ArtistBio artist={ARTIST_PROFILE} />

        {/* Discography & Audio Previews */}
        <Discography albums={ARTIST_PROFILE.albums} />

        {/* Tour Calendar & RSVP */}
        <TourCalendar
          dates={allTourDates}
          artistName={ARTIST_PROFILE.name}
          onSelectTicketRsvp={(tour) => setTicketRsvpTour(tour)}
          showToast={showToast}
        />

        {/* Live Broadcast Player & Real-Time Chat */}
        <LiveVideoPlayer />

        {/* High-Resolution Media Gallery */}
        <MediaGallery media={ARTIST_PROFILE.media} />

        {/* News & Editorial Dispatches */}
        <BlogSection posts={ARTIST_PROFILE.posts} showToast={showToast} />

        {/* Promoter Tour Booking Inquiry Portal */}
        <BookingForm
          artistName={ARTIST_PROFILE.name}
          showToast={showToast}
          onInquiryCreated={handleInquiryCreated}
        />

        {/* General, Press & Licensing Contact */}
        <ContactForm showToast={showToast} />
      </main>

      {/* Global Luxury Footer */}
      <Footer
        artist={ARTIST_PROFILE}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Ticket RSVP Pass Modal */}
      {ticketRsvpTour && (
        <TicketRsvpModal
          tour={ticketRsvpTour}
          artistName={ARTIST_PROFILE.name}
          onClose={() => setTicketRsvpTour(null)}
          showToast={showToast}
        />
      )}

      {/* Tour Manager CMS Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          showToast={showToast}
          onTourDatesUpdated={handleTourDatesUpdated}
        />
      )}

      {/* Toast Feedbacks */}
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
