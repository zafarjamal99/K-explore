import { Router } from 'express';
import {
  getArtistProfile,
  getTourDates,
  createTourDate,
} from '../controllers/artist.controller';
import {
  submitBookingInquiry,
  submitContactForm,
  listInquiries,
  updateInquiryStatus,
} from '../controllers/forms.controller';
import {
  getMediaGallery,
  getLiveStreamStatus,
} from '../controllers/media.controller';

const router = Router();

// Artist & Tour Routes
router.get('/artists/:slug', getArtistProfile);
router.get('/tours', getTourDates);
router.post('/tours', createTourDate);

// Media & Live Streaming
router.get('/media', getMediaGallery);
router.get('/live', getLiveStreamStatus);

// Forms & Inquiries
router.post('/forms/booking', submitBookingInquiry);
router.post('/forms/contact', submitContactForm);
router.get('/admin/inquiries', listInquiries);
router.patch('/admin/inquiries/:id', updateInquiryStatus);

export default router;
