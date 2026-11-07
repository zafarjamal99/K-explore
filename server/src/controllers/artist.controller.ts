import { Request, Response } from 'express';

// Seeded Artist Profile
const ARTIST_DATA = {
  id: 'artist-aurelia-vance',
  slug: 'aurelia-vance',
  name: 'Aurelia Vance & The Nocturne Collective',
  tagline: 'Modern Orchestral Fusion & Ambient Soundscapes',
  genre: ['Contemporary Classical', 'Neoclassical', 'Ambient Electronic', 'Post-Rock'],
  bio: [
    'Aurelia Vance is an internationally acclaimed composer, pianist, and producer renowned for blurring the boundaries between classical orchestration and modular analog synthesis.',
    'Flanked by The Nocturne Collective—an eight-piece chamber ensemble featuring virtuosic cello, viola, double bass, harp, and live percussion—Vance crafts sonic tapestries that have captivated audiences across five continents.',
    'Her latest full-length album, "Echoes of the Solstice", debuted at #1 on the Billboard Classical Crossover Chart and accumulated over 45 million streams worldwide within its first three months.',
  ],
  heroImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=85',
  portraitImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
  spotifyUrl: 'https://open.spotify.com',
  appleMusicUrl: 'https://music.apple.com',
  youtubeUrl: 'https://www.youtube.com',
  instagramUrl: 'https://instagram.com',
  currentTourName: 'The Solstice World Tour',
};

let tourDatesStore = [
  {
    id: 'tour-nyc-2026',
    tourId: 'solstice-2026',
    venue: 'Radio City Music Hall',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    region: 'North America',
    eventDate: '2026-11-28T20:00:00',
    doorTime: '7:00 PM',
    showTime: '8:00 PM',
    ticketUrl: 'https://www.ticketmaster.com',
    vipTicketUrl: 'https://www.ticketmaster.com',
    ticketStatus: 'ON_SALE',
    isUpcoming: true,
  },
  {
    id: 'tour-london-2026',
    tourId: 'solstice-2026',
    venue: 'Royal Albert Hall',
    city: 'London',
    country: 'United Kingdom',
    region: 'Europe',
    eventDate: '2026-12-04T19:30:00',
    doorTime: '6:30 PM',
    showTime: '7:30 PM',
    ticketUrl: 'https://www.royalalberthall.com',
    ticketStatus: 'SOLD_OUT',
    isUpcoming: true,
  },
  {
    id: 'tour-tokyo-2026',
    tourId: 'solstice-2026',
    venue: 'Suntory Hall (Main Hall)',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia Pacific',
    eventDate: '2026-12-18T19:00:00',
    doorTime: '6:00 PM',
    showTime: '7:00 PM',
    ticketUrl: 'https://www.suntory.com/culture-sports/suntoryhall/',
    ticketStatus: 'ON_SALE',
    isUpcoming: true,
  },
];

export const getArtistProfile = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (slug !== 'aurelia-vance') {
    return res.status(404).json({ success: false, error: 'Artist not found' });
  }
  return res.status(200).json({ success: true, data: ARTIST_DATA });
};

export const getTourDates = async (req: Request, res: Response) => {
  const { region } = req.query;
  let dates = [...tourDatesStore];

  if (region && typeof region === 'string' && region !== 'All') {
    dates = dates.filter((d) => d.region.toLowerCase() === region.toLowerCase());
  }

  return res.status(200).json({ success: true, count: dates.length, data: dates });
};

export const createTourDate = async (req: Request, res: Response) => {
  const { venue, city, country, region, eventDate, doorTime, showTime, ticketStatus, ticketUrl } = req.body;

  if (!venue || !city || !country || !eventDate) {
    return res.status(400).json({ success: false, error: 'Missing required tour date fields' });
  }

  const newStop = {
    id: `tour-${Date.now()}`,
    tourId: 'solstice-2026',
    venue,
    city,
    country,
    region: region || 'North America',
    eventDate,
    doorTime: doorTime || '7:00 PM',
    showTime: showTime || '8:00 PM',
    ticketStatus: ticketStatus || 'ON_SALE',
    ticketUrl: ticketUrl || 'https://www.ticketmaster.com',
    isUpcoming: true,
  };

  tourDatesStore.unshift(newStop);

  return res.status(201).json({ success: true, message: 'Tour stop created successfully', data: newStop });
};
