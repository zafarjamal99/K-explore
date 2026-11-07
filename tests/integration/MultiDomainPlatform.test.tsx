import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../../src/App';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('BookMyShow Multi-Domain Platform Integration Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the domain ribbon with Concerts, Sports, Theater, and Conferences', () => {
    render(<App />);

    expect(screen.getByRole('button', { name: /Concerts & Live Music/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sports & Stadiums/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Theater & Musicals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Conferences & Summits/i })).toBeInTheDocument();
  });

  it('switches between domains and displays domain-specific events', async () => {
    render(<App />);

    // 1. Switch to Sports Domain
    const sportsBtn = screen.getByRole('button', { name: /Sports & Stadiums/i });
    fireEvent.click(sportsBtn);

    await waitFor(() => {
      expect(screen.getByText(/Stadium Sports, Derbies & Motorsports/i)).toBeInTheDocument();
      expect(screen.getByText(/National Super League Derby/i)).toBeInTheDocument();
    });

    // 2. Switch to Theater Domain
    const theaterBtn = screen.getByRole('button', { name: /Theater & Musicals/i });
    fireEvent.click(theaterBtn);

    await waitFor(() => {
      expect(screen.getByText(/Broadway Revivals, Musicals & Classical Theater/i)).toBeInTheDocument();
      expect(screen.getByText(/The Phantom of the Opera/i)).toBeInTheDocument();
    });

    // 3. Switch to Conferences Domain
    const confBtn = screen.getByRole('button', { name: /Conferences & Summits/i });
    fireEvent.click(confBtn);

    await waitFor(() => {
      expect(screen.getByText(/Tech Summits, AI Keynotes & Design Congresses/i)).toBeInTheDocument();
      expect(screen.getByText(/Global AI & Autonomous Agents World Summit 2026/i)).toBeInTheDocument();
    });
  });

  it('filters events by city and search query', async () => {
    render(<App />);

    // Switch to Sports
    fireEvent.click(screen.getByRole('button', { name: /Sports & Stadiums/i }));

    const searchInput = screen.getByPlaceholderText(/Search concerts, stadiums, plays/i);
    fireEvent.change(searchInput, { target: { value: 'Cricket' } });

    await waitFor(() => {
      expect(screen.getByText(/International T20 Super Series: India vs Australia/i)).toBeInTheDocument();
      expect(screen.queryByText(/National Super League Derby/i)).not.toBeInTheDocument();
    });
  });

  it('completes the interactive visual seat selection and multi-step checkout flow', async () => {
    render(<App />);

    // Switch to Conferences
    fireEvent.click(screen.getByRole('button', { name: /Conferences & Summits/i }));

    await waitFor(() => {
      expect(screen.getByText(/Global AI & Autonomous Agents World Summit 2026/i)).toBeInTheDocument();
    });

    // Click "Book Tickets" on the event card
    const bookButtons = screen.getAllByRole('button', { name: /Book Tickets/i });
    expect(bookButtons.length).toBeGreaterThan(0);
    fireEvent.click(bookButtons[0]);

    // Visual Seat Selector Modal opens
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/BOOKMYSHOW VISUAL SEAT SELECTION/i)).toBeInTheDocument();
    });

    // Click Proceed to Attendee Details
    const proceedBtn = screen.getByRole('button', { name: /Proceed to Attendee Details/i });
    fireEvent.click(proceedBtn);

    // Multi-Step Checkout Modal opens
    await waitFor(() => {
      expect(screen.getByText(/BOOKMYSHOW SECURE CHECKOUT/i)).toBeInTheDocument();
    });

    // Step 1: Attendee Info
    const nextBtn = screen.getByRole('button', { name: /Proceed to Payment/i });
    fireEvent.click(nextBtn);

    // Step 2: Payment Gateway Selection
    await waitFor(() => {
      expect(screen.getByText(/Choose Payment Gateway/i)).toBeInTheDocument();
    });

    const payBtn = screen.getByRole('button', { name: /Pay .* & Confirm/i });
    fireEvent.click(payBtn);

    // Step 3: Verified Digital Booking Pass
    await waitFor(() => {
      expect(screen.getByText(/BOOKMYSHOW VERIFIED DIGITAL ENTRY/i)).toBeInTheDocument();
      expect(screen.getByText(/SCAN AT GATE TURNSTILE/i)).toBeInTheDocument();
    });
  });

  it('opens My Tickets drawer and displays saved bookings', async () => {
    render(<App />);

    // Click "My Tickets"
    const myTicketsBtn = screen.getByRole('button', { name: /My Tickets/i });
    fireEvent.click(myTicketsBtn);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/My Tickets & Bookings/i)).toBeInTheDocument();
    });
  });
});
