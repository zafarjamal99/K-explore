import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  DollarSign,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  FileSpreadsheet,
  Building,
  MapPin,
  Eye,
} from 'lucide-react';
import { BookingInquiry, ContactSubmission, TourDate } from '../types';
import {
  getStoredInquiries,
  updateInquiryStatus,
  getStoredContacts,
  getCustomTourDates,
  saveTourDate,
  deleteTourDate,
} from '../utils/storageUtils';

interface AdminDashboardProps {
  onClose: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onTourDatesUpdated?: () => void;
}

export default function AdminDashboard({
  onClose,
  showToast,
  onTourDatesUpdated,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'contacts' | 'tours'>('inquiries');
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [customTours, setCustomTours] = useState<TourDate[]>([]);

  // Add tour form state
  const [newVenue, setNewVenue] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newRegion, setNewRegion] = useState<TourDate['region']>('North America');
  const [newEventDate, setNewEventDate] = useState('');
  const [newDoorTime, setNewDoorTime] = useState('7:00 PM');
  const [newShowTime, setNewShowTime] = useState('8:00 PM');
  const [newTicketStatus, setNewTicketStatus] = useState<TourDate['ticketStatus']>('ON_SALE');
  const [newTicketUrl, setNewTicketUrl] = useState('');

  const loadData = () => {
    setInquiries(getStoredInquiries());
    setContacts(getStoredContacts());
    setCustomTours(getCustomTourDates());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id: string, status: BookingInquiry['status']) => {
    const success = updateInquiryStatus(id, status);
    if (success) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      showToast(`Inquiry status updated to ${status}.`, 'info');
    }
  };

  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenue || !newCity || !newCountry || !newEventDate) {
      showToast('Please fill in all required tour fields.', 'error');
      return;
    }

    const newDateObj: TourDate = {
      id: `custom-tour-${Date.now()}`,
      tourId: 'solstice-2026',
      venue: newVenue.trim(),
      city: newCity.trim(),
      country: newCountry.trim(),
      region: newRegion,
      eventDate: new Date(newEventDate).toISOString(),
      doorTime: newDoorTime,
      showTime: newShowTime,
      ticketStatus: newTicketStatus,
      ticketUrl: newTicketUrl || 'https://www.ticketmaster.com',
      isUpcoming: true,
    };

    saveTourDate(newDateObj);
    showToast(`Tour stop at ${newVenue} created!`, 'success');

    // Reset form
    setNewVenue('');
    setNewCity('');
    setNewCountry('');
    setNewEventDate('');
    setNewTicketUrl('');
    loadData();
    if (onTourDatesUpdated) onTourDatesUpdated();
  };

  const handleDeleteCustomTour = (id: string) => {
    deleteTourDate(id);
    loadData();
    showToast('Tour date removed.', 'info');
    if (onTourDatesUpdated) onTourDatesUpdated();
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) {
      showToast('No inquiries to export.', 'info');
      return;
    }
    const headers = ['ID,Promoter,Email,Phone,Venue,City,Date,Capacity,Budget,Status'];
    const rows = inquiries.map(
      (i) =>
        `"${i.id}","${i.promoterName}","${i.promoterEmail}","${i.promoterPhone}","${i.venueName}","${i.cityCountry}","${i.eventDate}",${i.capacity},${i.offeredBudgetUsd},"${i.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `booking_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported to CSV.', 'success');
  };

  const totalBudget = inquiries.reduce((acc, curr) => acc + (curr.offeredBudgetUsd || 0), 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-dialog-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="card-surface"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '0',
          animation: 'fadeIn 0.25s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="eyebrow" style={{ color: 'var(--color-champagne)' }}>
                INTERNAL CMS &middot; MANAGEMENT
              </span>
              <span className="badge badge-open" style={{ fontSize: '0.7rem' }}>
                LIVE PORTAL
              </span>
            </div>
            <h3 id="admin-dialog-title" style={{ margin: '4px 0 0 0', fontSize: '1.4rem' }}>
              Tour Manager Dashboard
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin dashboard"
            className="btn btn-secondary"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Top Summary Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            padding: '24px 32px 0 32px',
          }}
        >
          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--color-stone)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
              <span>Total Inquiries</span>
              <Calendar size={16} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>{inquiries.length}</div>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--color-stone)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
              <span>Pipeline Budget</span>
              <DollarSign size={16} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '6px', color: 'var(--color-champagne)' }}>
              ${totalBudget.toLocaleString()}
            </div>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--color-stone)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
              <span>Fan &amp; Press Messages</span>
              <Mail size={16} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>{contacts.length}</div>
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--color-stone)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
              <span>Custom Stops</span>
              <Building size={16} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '6px' }}>{customTours.length}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 32px 0 32px',
            borderBottom: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`btn btn-sm ${activeTab === 'inquiries' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Promoter Inquiries ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`btn btn-sm ${activeTab === 'contacts' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Contact Messages ({contacts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tours')}
              className={`btn btn-sm ${activeTab === 'tours' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Custom Tour Stops ({customTours.length})
            </button>
          </div>

          {activeTab === 'inquiries' && inquiries.length > 0 && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <FileSpreadsheet size={14} /> Export CSV
            </button>
          )}
        </div>

        {/* Tab Content Area */}
        <div style={{ padding: '24px 32px 32px 32px' }}>
          {/* TAB 1: BOOKING INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              {inquiries.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
                  <AlertCircle size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                  <p>No promoter inquiries submitted yet.</p>
                  <p style={{ fontSize: '0.85rem' }}>Submissions from the promoter booking form will appear here in real time.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      style={{
                        padding: '18px 20px',
                        borderRadius: '10px',
                        background: 'var(--color-stone)',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{inq.promoterName}</span>
                            {inq.organization && (
                              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                                ({inq.organization})
                              </span>
                            )}
                            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--color-champagne)' }}>
                              #{inq.id}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                            {inq.promoterEmail} &middot; {inq.promoterPhone}
                          </div>
                        </div>

                        {/* Status Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value as BookingInquiry['status'])}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-bg)',
                              color: 'var(--color-text)',
                              fontSize: '0.8125rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="REVIEWING">Reviewing</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="DECLINED">Declined</option>
                          </select>
                        </div>
                      </div>

                      {/* Event Details Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                          gap: '10px',
                          fontSize: '0.85rem',
                          background: 'var(--color-bg)',
                          padding: '12px 16px',
                          borderRadius: '8px',
                        }}
                      >
                        <div>
                          <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Venue &amp; City</span>
                          <strong>{inq.venueName}</strong>, {inq.cityCountry}
                        </div>
                        <div>
                          <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Target Date</span>
                          <strong>{inq.eventDate}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Capacity</span>
                          <strong>{inq.capacity.toLocaleString()} seats</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.75rem' }}>Offered Budget</span>
                          <strong style={{ color: 'var(--color-champagne)' }}>${inq.offeredBudgetUsd.toLocaleString()} USD</strong>
                        </div>
                      </div>

                      {inq.eventDetails && (
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontStyle: 'italic', marginTop: '2px' }}>
                          &ldquo;{inq.eventDetails}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {activeTab === 'contacts' && (
            <div>
              {contacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
                  <Mail size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
                  <p>No contact submissions yet.</p>
                  <p style={{ fontSize: '0.85rem' }}>Messages sent through the Contact Us form will appear here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {contacts.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        padding: '18px 20px',
                        borderRadius: '10px',
                        background: 'var(--color-stone)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <div>
                          <strong style={{ fontSize: '1rem' }}>{msg.fullName}</strong>
                          <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginLeft: '8px' }}>
                            ({msg.email})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="badge badge-open">{msg.category}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.925rem', marginBottom: '6px' }}>{msg.subject}</div>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM TOUR DATES */}
          {activeTab === 'tours' && (
            <div>
              {/* Add Stop Form */}
              <form
                onSubmit={handleCreateTour}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--color-stone)',
                  border: '1px solid var(--color-champagne)',
                  marginBottom: '28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Plus size={18} color="var(--color-champagne)" />
                  <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Schedule New Tour Stop</h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Venue Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Symphony Hall"
                      value={newVenue}
                      onChange={(e) => setNewVenue(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Boston"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Country *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United States"
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Region</label>
                    <select
                      value={newRegion}
                      onChange={(e) => setNewRegion(e.target.value as TourDate['region'])}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    >
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Latin America">Latin America</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Event Date *</label>
                    <input
                      type="date"
                      required
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Door Time</label>
                    <input
                      type="text"
                      value={newDoorTime}
                      onChange={(e) => setNewDoorTime(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Show Time</label>
                    <input
                      type="text"
                      value={newShowTime}
                      onChange={(e) => setNewShowTime(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Ticket Status</label>
                    <select
                      value={newTicketStatus}
                      onChange={(e) => setNewTicketStatus(e.target.value as TourDate['ticketStatus'])}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                    >
                      <option value="ON_SALE">On Sale</option>
                      <option value="SOLD_OUT">Sold Out</option>
                      <option value="FREE_RSVP">Free RSVP</option>
                      <option value="POSTPONED">Postponed</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>Ticketing Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://www.ticketmaster.com/..."
                    value={newTicketUrl}
                    onChange={(e) => setNewTicketUrl(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-sm">
                  <Plus size={14} /> Add Tour Stop
                </button>
              </form>

              {/* List of Custom Tour Stops */}
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem' }}>
                  Custom Scheduled Stops ({customTours.length})
                </h4>
                {customTours.length === 0 ? (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    No custom stops scheduled yet. Added tour stops automatically appear in the public Tour Calendar.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {customTours.map((tour) => (
                      <div
                        key={tour.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          background: 'var(--color-stone)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <div>
                          <strong>{tour.venue}</strong> &middot; {tour.city}, {tour.country}
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                            {new Date(tour.eventDate).toLocaleDateString()} &middot; {tour.doorTime} / {tour.showTime} &middot; {tour.region}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomTour(tour.id)}
                          aria-label={`Delete ${tour.venue}`}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
