import { Request, Response } from 'express';
import { z } from 'zod';

// Zod Schema for Booking Inquiries
const BookingInquirySchema = z.object({
  artistName: z.string().min(1, 'Artist name is required'),
  promoterName: z.string().min(2, 'Full name must be at least 2 characters'),
  promoterEmail: z.string().email('Invalid email address'),
  promoterPhone: z.string().min(7, 'Valid contact phone number is required'),
  organization: z.string().optional(),
  eventDate: z.string().min(1, 'Target event date is required'),
  venueName: z.string().min(2, 'Venue name is required'),
  cityCountry: z.string().min(2, 'City & Country is required'),
  capacity: z.number().int().min(50, 'Minimum capacity is 50'),
  offeredBudgetUsd: z.number().min(1000, 'Minimum offered budget is $1,000 USD'),
  eventDetails: z.string().min(10, 'Please provide event details (min 10 characters)'),
});

// Zod Schema for Contact Submissions
const ContactSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  category: z.enum(['General', 'Press & Media', 'Licensing', 'VIP Fan Club']),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// In-Memory store fallback when database is provisioning
const inMemoryInquiries: any[] = [];
const inMemoryContacts: any[] = [];

export const submitBookingInquiry = async (req: Request, res: Response) => {
  try {
    const validatedData = BookingInquirySchema.parse(req.body);

    const record = {
      id: `INQ-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      ...validatedData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    inMemoryInquiries.unshift(record);

    return res.status(201).json({
      success: true,
      message: 'Booking inquiry successfully routed to artist management.',
      inquiry: record,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        issues: error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      });
    }
    return res.status(500).json({ success: false, error: 'Internal server error processing inquiry.' });
  }
};

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const validatedData = ContactSubmissionSchema.parse(req.body);

    const record = {
      id: `MSG-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    inMemoryContacts.unshift(record);

    return res.status(201).json({
      success: true,
      message: 'Your dispatch has been delivered to Nocturne management.',
      submission: record,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        issues: error.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
      });
    }
    return res.status(500).json({ success: false, error: 'Internal server error processing contact.' });
  }
};

export const listInquiries = async (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    count: inMemoryInquiries.length,
    data: inMemoryInquiries,
  });
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['PENDING', 'REVIEWING', 'ACCEPTED', 'DECLINED'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid inquiry status.' });
  }

  const inq = inMemoryInquiries.find((i) => i.id === id);
  if (!inq) {
    return res.status(404).json({ success: false, error: 'Inquiry not found.' });
  }

  inq.status = status;
  inq.updatedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: `Inquiry status updated to ${status}.`,
    data: inq,
  });
};
