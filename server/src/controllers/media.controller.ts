import { Request, Response } from 'express';

const MEDIA_GALLERY = [
  {
    id: 'm1',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
    title: 'Grand Hall Crescendo',
    caption: 'Aurelia Vance conducting the Nocturne string sextet at the Philharmonie.',
    location: 'Paris, France',
    year: 2025,
    isFeatured: true,
    photographer: 'Julien Lefèvre',
  },
  {
    id: 'm2',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85',
    title: 'Acoustic Solitude',
    caption: 'Intimate grand piano soundcheck prior to the sold-out Royal Albert Hall evening.',
    location: 'London, UK',
    year: 2025,
    isFeatured: true,
    photographer: 'Eleanor Ward',
  },
  {
    id: 'm3',
    type: 'IMAGE',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85',
    title: 'The Modular Engine',
    caption: 'Live analog synthesizer manipulation during "Solstice Meridian".',
    location: 'Berlin, Germany',
    year: 2025,
    isFeatured: false,
    photographer: 'Marcus Braun',
  },
  {
    id: 'm5',
    type: 'VIDEO_EMBED',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    title: '"Luminescence in Minor" Live at Elbphilharmonie',
    caption: 'Official 4K multi-track concert recording with 24-piece symphony orchestra.',
    location: 'Hamburg, Germany',
    year: 2025,
    isFeatured: true,
    photographer: 'Nocturne Film Guild',
  },
];

export const getMediaGallery = async (_req: Request, res: Response) => {
  return res.status(200).json({ success: true, count: MEDIA_GALLERY.length, data: MEDIA_GALLERY });
};

export const getLiveStreamStatus = async (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: {
      isLive: true,
      title: 'Live from Elbphilharmonie Grand Hall: The Solstice World Tour',
      streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      currentViewers: 4850,
      protocol: 'HLS / Embed',
    },
  });
};
