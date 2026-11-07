import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('K Explore Event Discovery & Registration Integration Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the K Explore platform branding and major sections', () => {
    render(<App />);

    // Brand and Hero
    expect(screen.getAllByText(/K EXPLORE/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Discover moments/i)).toBeInTheDocument();
    expect(screen.getByText(/That move you/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Curator's Spotlight/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('heading', { name: /Explore Upcoming Events/i })).toBeInTheDocument();
  });

  it('filters events when a category tab is clicked', async () => {
    render(<App />);

    // Click 'Cultural' category tab
    const culturalTab = screen.getByRole('tab', { name: /Cultural/i });
    fireEvent.click(culturalTab);

    // Dhwani Cultural Gala should be displayed
    await waitFor(() => {
      expect(screen.getByText(/Dhwani: Annual Inter-University Music & Arts Gala/i)).toBeInTheDocument();
    });
  });

  it('filters events dynamically via search query', async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search events/i);
    fireEvent.change(searchInput, { target: { value: 'Rust' } });

    await waitFor(() => {
      expect(screen.getByText(/High-Performance Systems with Rust/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no events match search query', async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search events/i);
    fireEvent.change(searchInput, { target: { value: 'NonexistentEventXYZ123' } });

    await waitFor(() => {
      expect(screen.getByText(/No Matching Experiences Found/i)).toBeInTheDocument();
    });
  });

  it('toggles dark and light mode', () => {
    render(<App />);

    const toggleBtn = screen.getByLabelText(/Switch to (dark|light) mode/i);
    fireEvent.click(toggleBtn);

    const themeAttr = document.documentElement.getAttribute('data-theme');
    expect(['dark', 'light']).toContain(themeAttr);
  });
});
