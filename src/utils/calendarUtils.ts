import { TourDate } from '../types';

export function downloadTourIcs(tour: TourDate, artistName: string): void {
  if (!tour || !tour.eventDate) return;

  const startDate = new Date(tour.eventDate);
  const endDate = new Date(startDate.getTime() + 3 * 3600000);

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//K Explore//Artist Tour Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${tour.id}-${startDate.getTime()}@k-explore-tours.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:${artistName} Live at ${tour.venue}`,
    `DESCRIPTION:${artistName} World Tour Concert at ${tour.venue}, ${tour.city}, ${tour.country}`,
    `LOCATION:${tour.venue}, ${tour.city}, ${tour.country}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${tour.city}-${tour.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
