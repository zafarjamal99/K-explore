export type TicketStatus = 'ON_SALE' | 'SOLD_OUT' | 'CANCELLED' | 'POSTPONED' | 'FREE_RSVP';
export type MediaType = 'IMAGE' | 'VIDEO_EMBED' | 'HLS_STREAM';
export type InquiryStatus = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'DECLINED';

export interface TourDate {
  id: string;
  tourId: string;
  venue: string;
  city: string;
  state?: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America';
  eventDate: string; // ISO string
  doorTime?: string;
  showTime?: string;
  ticketUrl?: string;
  vipTicketUrl?: string;
  ticketStatus: TicketStatus;
  isUpcoming: boolean;
}

export interface Track {
  id: string;
  trackNumber: number;
  title: string;
  durationSec: number;
  durationFormatted: string;
  audioSampleUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  type: 'LP' | 'EP' | 'Live';
  releaseYear: number;
  releaseDate: string;
  coverImage: string;
  recordLabel?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  bandcampUrl?: string;
  tracks: Track[];
}

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption?: string;
  location?: string;
  year?: number;
  isFeatured: boolean;
  photographer?: string;
}

export interface BookingInquiry {
  id: string;
  artistName: string;
  promoterName: string;
  promoterEmail: string;
  promoterPhone: string;
  organization?: string;
  eventDate: string;
  venueName: string;
  cityCountry: string;
  capacity: number;
  offeredBudgetUsd: number;
  eventDetails: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  category: 'General' | 'Press & Media' | 'Licensing' | 'VIP Fan Club';
  subject: string;
  message: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Tour News' | 'New Release' | 'Press' | 'Behind the Scenes';
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export interface ArtistProfile {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  genre: string[];
  bio: string[];
  heroImageUrl: string;
  portraitImageUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  currentTourName: string;
  albums: Album[];
  tours: TourDate[];
  media: MediaItem[];
  posts: BlogPost[];
}
