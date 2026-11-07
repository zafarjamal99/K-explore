import React, { useState, useEffect } from 'react';
import {
  X,
  Ticket,
  Calendar,
  MapPin,
  Trash2,
  QrCode,
  Download,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { getStoredRegistrations, deleteRegistration } from '../utils/storageUtils';

export default function MyRegistrationsModal({
  onClose,
  onExploreEvents,
  showToast,
  onRegistrationsChange,
}) {
  const [registrations, setRegistrations] = useState(() => getStoredRegistrations());
  const [activeTicket, setActiveTicket] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleDelete = (id, eventTitle) => {
    const success = deleteRegistration(id);
    if (success) {
      const updated = getStoredRegistrations();
      setRegistrations(updated);
      onRegistrationsChange?.(updated);
      setDeleteConfirmId(null);
      if (activeTicket?.id === id) setActiveTicket(null);
      showToast?.(`Registration for "${eventTitle}" cancelled.`, 'info');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(registrations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'k-explore-my-tickets.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast?.('Exported tickets as JSON.', 'success');
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="my-registrations-title"
    >
      <div className="details-dialog">
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-brand-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-brand)',
              }}
            >
              <Ticket size={20} />
            </div>
            <div>
              <h2 id="my-registrations-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                My Registered Passes
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)', margin: 0 }}>
                Stored locally in this browser &middot; {registrations.length}{' '}
                {registrations.length === 1 ? 'ticket' : 'tickets'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {registrations.length > 0 && (
              <button
                type="button"
                onClick={handleExportJson}
                className="btn btn-secondary btn-sm"
                title="Backup registrations as JSON"
              >
                <Download size={14} />
                Export JSON
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--secondary-text)',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          {registrations.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 16px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--muted-surface)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'var(--secondary-text)',
                }}
              >
                <Ticket size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Active Registrations</h3>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--secondary-text)',
                  maxWidth: '380px',
                  margin: '0 auto 24px auto',
                }}
              >
                You haven't registered for any events yet. Browse our curated calendar and reserve your spot!
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreEvents?.();
                }}
                className="btn btn-primary"
              >
                <Compass size={16} />
                Explore Events
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {registrations.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    backgroundColor: 'var(--muted-surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: 'var(--bg-secondary)',
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border)',
                          marginBottom: '6px',
                          color: 'var(--accent)',
                        }}
                      >
                        {ticket.id}
                      </div>
                      <h4 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                        {ticket.eventTitle}
                      </h4>
                    </div>

                    {/* Delete / Cancel button */}
                    {deleteConfirmId === ticket.id ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--error-bg)',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--error-border)',
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', color: 'var(--error-text)', fontWeight: 600 }}>
                          Cancel RSVP?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(ticket.id, ticket.eventTitle)}
                          style={{
                            background: 'var(--error-text)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '3px 8px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                          }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--secondary-text)',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            padding: '2px 4px',
                          }}
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(ticket.id)}
                        aria-label="Cancel registration"
                        title="Cancel registration"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--secondary-text)',
                          cursor: 'pointer',
                          padding: '6px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '8px',
                      fontSize: '0.8125rem',
                      color: 'var(--secondary-text)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} style={{ color: 'var(--accent)' }} />
                      <span>{ticket.eventDate || 'Confirmed Schedule'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--primary-brand)' }} />
                      <span>{ticket.venue || 'Campus Hall'}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border)',
                      fontSize: '0.78125rem',
                    }}
                  >
                    <span>
                      Registered to: <strong>{ticket.fullName}</strong> ({ticket.email})
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTicket(ticket)}
                      className="btn btn-secondary btn-sm"
                    >
                      <QrCode size={14} /> View Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Lightbox for Individual Pass */}
          {activeTicket && (
            <div
              style={{
                marginTop: '24px',
                padding: '24px',
                backgroundColor: 'var(--bg-secondary)',
                border: '2px solid var(--primary-brand)',
                borderRadius: 'var(--radius-lg)',
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                  }}
                >
                  Digital Ticket Pass
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QrCode size={74} style={{ color: '#191B1F' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                    {activeTicket.eventTitle}
                  </h4>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                    Pass ID: <strong>{activeTicket.id}</strong>
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-text)' }}>
                    Attendee: {activeTicket.fullName} &middot; {activeTicket.department}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-secondary btn-sm"
                >
                  <Download size={14} /> Print Pass
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
