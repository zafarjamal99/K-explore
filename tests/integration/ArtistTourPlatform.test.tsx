import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../../src/App';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('Artist & Tour Platform Integration Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the luxury artist branding, hero, and main sections', () => {
    render(<App />);

    // Brand and Hero
    expect(screen.getAllByText(/Aurelia Vance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/The Solstice World Tour/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Recorded Works/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Concert Streaming/i)).toBeInTheDocument();
    expect(screen.getByText(/Book the Artist & Ensemble/i)).toBeInTheDocument();
  });

  it('filters tour dates by region', async () => {
    render(<App />);

    const tourSection = document.getElementById('tour-dates');
    expect(tourSection).toBeTruthy();
    if (!tourSection) return;

    // Click 'Europe' region button
    const europeBtn = within(tourSection).getByRole('button', { name: /^Europe$/i });
    fireEvent.click(europeBtn);

    await waitFor(() => {
      expect(within(tourSection).queryByText(/Sydney Opera House/i)).not.toBeInTheDocument();
      expect(within(tourSection).getByText(/Royal Albert Hall/i)).toBeInTheDocument();
    });

    // Switch to 'Asia Pacific'
    const asiaBtn = within(tourSection).getByRole('button', { name: /^Asia Pacific$/i });
    fireEvent.click(asiaBtn);

    await waitFor(() => {
      expect(within(tourSection).getByText(/Sydney Opera House/i)).toBeInTheDocument();
      expect(within(tourSection).queryByText(/Royal Albert Hall/i)).not.toBeInTheDocument();
    });
  });

  it('searches tour dates by city or venue', async () => {
    render(<App />);

    const tourSection = document.getElementById('tour-dates');
    expect(tourSection).toBeTruthy();
    if (!tourSection) return;

    const searchInput = within(tourSection).getByPlaceholderText(/Search city, venue, or country/i);
    fireEvent.change(searchInput, { target: { value: 'Sydney' } });

    await waitFor(() => {
      expect(within(tourSection).getByText(/Sydney Opera House/i)).toBeInTheDocument();
    });
  });

  it('toggles audio track preview playback', async () => {
    render(<App />);

    // Find first track's play button
    const playButtons = screen.getAllByLabelText(/Play audio sample/i);
    expect(playButtons.length).toBeGreaterThan(0);

    // Click play
    fireEvent.click(playButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByLabelText(/Pause sample/i).length).toBeGreaterThan(0);
    });
  });

  it('opens ticket RSVP pass modal and generates a digital pass', async () => {
    render(<App />);

    // Click RSVP Pass button on any tour stop
    const rsvpButtons = screen.getAllByRole('button', { name: /RSVP Pass/i });
    expect(rsvpButtons.length).toBeGreaterThan(0);
    fireEvent.click(rsvpButtons[0]);

    // Modal should appear
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Passholder Full Name/i)).toBeInTheDocument();
    });

    // Fill in pass form
    const nameInput = screen.getByPlaceholderText(/Julian Montgomery/i);
    const emailInput = screen.getByPlaceholderText(/julian@example.com/i);
    fireEvent.change(nameInput, { target: { value: 'Helena Berg' } });
    fireEvent.change(emailInput, { target: { value: 'helena@example.com' } });

    // Submit form directly on form element
    const submitBtn = screen.getByRole('button', { name: /Generate Official Digital Pass/i });
    const form = submitBtn.closest('form');
    expect(form).toBeTruthy();
    if (form) fireEvent.submit(form);

    // Verified ticket view
    await waitFor(() => {
      expect(screen.getByText(/VALIDATED ENTRY/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Helena Berg/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('submits a promoter tour booking inquiry with validation', async () => {
    render(<App />);

    const promoterInput = screen.getByPlaceholderText(/Sebastian Cole/i);
    const emailInput = screen.getByPlaceholderText(/promoter@agency.com/i);
    const phoneInput = screen.getByPlaceholderText(/\+1 \(555\) 019-2834/i);
    const venueInput = screen.getByPlaceholderText(/Symphony Hall/i);
    const cityInput = screen.getByPlaceholderText(/Amsterdam, Netherlands/i);
    const detailsInput = screen.getByPlaceholderText(/Describe ticketing tiering/i);

    fireEvent.change(promoterInput, { target: { value: 'Marcus Sterling' } });
    fireEvent.change(emailInput, { target: { value: 'marcus@promotions.org' } });
    fireEvent.change(phoneInput, { target: { value: '+1 (555) 019-2834' } });
    fireEvent.change(venueInput, { target: { value: 'Elbphilharmonie' } });
    fireEvent.change(cityInput, { target: { value: 'Hamburg, Germany' } });
    fireEvent.change(detailsInput, { target: { value: 'Orchestral stage setup with 9-foot Steinway D grand piano and quad spatial audio system.' } });

    const submitBtn = screen.getByRole('button', { name: /Submit Tour Booking Offer/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Inquiry Dispatched to Booking Agency/i)).toBeInTheDocument();
      expect(screen.getByText(/Reference ID:/i)).toBeInTheDocument();
    });
  });

  it('submits a contact message', async () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText(/Clara Schumann/i);
    const emailInput = screen.getByPlaceholderText(/clara@example.com/i);
    const subjectInput = screen.getByPlaceholderText(/Subject of message/i);
    const messageInput = screen.getByPlaceholderText(/Write your note to artist management/i);

    fireEvent.change(nameInput, { target: { value: 'Sarah Jenkins' } });
    fireEvent.change(emailInput, { target: { value: 'sarah@radioclassical.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Broadcast Feature Interview' } });
    fireEvent.change(messageInput, { target: { value: 'We would love to feature Aurelia Vance on our national classical syndicated broadcast.' } });

    const sendBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(sendBtn);

    await waitFor(() => {
      expect(screen.getByText(/Message Received/i)).toBeInTheDocument();
    });
  });

  it('opens Tour Manager CMS Dashboard', async () => {
    render(<App />);

    // Click Admin Portal in Navbar
    const cmsBtn = screen.getByRole('button', { name: /Admin Portal/i });
    fireEvent.click(cmsBtn);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Tour Manager Dashboard/i)).toBeInTheDocument();
      expect(screen.getByText(/Pipeline Budget/i)).toBeInTheDocument();
    });
  });

  it('toggles light and dark theme', () => {
    render(<App />);

    const toggleBtn = screen.getByLabelText(/Switch to (dark|light) mode/i);
    fireEvent.click(toggleBtn);

    const themeAttr = document.documentElement.getAttribute('data-theme');
    expect(['dark', 'light']).toContain(themeAttr);
  });
});
