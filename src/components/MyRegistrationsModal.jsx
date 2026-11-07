import React, { useState, useEffect } from 'react';
import {
  X,
  Ticket,
  Calendar,
  MapPin,
  Trash2,
  QrCode,
  Download,
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
    downloadAnchor.setAttribute('download', 'k-explore-my-passes.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast?.('Exported ticket collection as JSON.', 'success');
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
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent-deep)',
              }}
            >
              <Ticket size={18} />
            </div>
            <div>
              <h2
                id="my-registrations-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                My Registered Passes
              </h2>
              <p style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Stored locally in this browser &middot; {registrations.length}{' '}
                {registrations.length === 1 ? 'pass' : 'passes'}
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
                <Download size={13} />
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
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <X size={18} />
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
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-surface-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Ticket size={24} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  marginBottom: '6px',
                }}
              >
                No Active Registrations
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '380px',
                  margin: '0 auto 24px auto',
                }}
              >
                You haven't reserved admission for any campus events yet. Discover our curated calendar and save your spot.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreEvents?.();
                }}
                className="btn btn-primary"
              >
                <Compass size={15} />
                Explore Events
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {registrations.map((ticket) => (
                <div
                  key={ticket.id}
                  style={{
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '22px 24px',
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
                          backgroundColor: 'var(--color-surface)',
                          fontSize: '0.6875rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-border)',
                          marginBottom: '6px',
                          color: 'var(--color-accent-deep)',
                        }}
                      >
                        {ticket.id}
                      </div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.25rem',
                          fontWeight: 400,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {ticket.eventTitle}
                      </h4>
                    </div>

                    {/* Delete Confirm */}
                    {deleteConfirmId === ticket.id ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--color-error-bg)',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid rgba(168, 79, 67, 0.3)',
                        }}
                      >
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-error)', fontWeight: 600 }}>
                          Cancel RSVP?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(ticket.id, ticket.eventTitle)}
                          style={{
                            background: 'var(--color-error)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '3px 8px',
                            fontSize: '0.72rem',
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
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.72rem',
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
                          color: 'var(--color-text-muted)',
                          cursor: 'pointer',
                          padding: '6px',
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '8px',
                      fontSize: '0.78125rem',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={13} style={{ color: 'var(--color-accent)' }} />
                      <span>{ticket.eventDate || 'Confirmed Schedule'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} style={{ color: 'var(--color-accent-deep)' }} />
                      <span>{ticket.venue || 'Campus Hall'}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: '1px solid var(--color-border)',
                      fontSize: '0.75rem',
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
                      <QrCode size={13} /> View Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Individual Ticket Pass Lightbox */}
          {activeTicket && (
            <div
              style={{
                marginTop: '24px',
                padding: '24px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-accent-deep)',
                borderRadius: 'var(--radius-md)',
                animation: 'fadeIn 200ms ease-out',
                boxShadow: 'var(--shadow-card)',
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
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-accent-deep)',
                  }}
                >
                  Digital Ticket Pass
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                >
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '88px',
                    height: '88px',
                    backgroundColor: '#FFFFFF',
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QrCode size={72} style={{ color: '#1C1D1B' }} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {activeTicket.eventTitle}
                  </h4>
                  <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
                    Pass ID: <strong>{activeTicket.id}</strong>
                  </div>
                  <div style={{ fontSize: '0.78125rem', color: 'var(--color-text-secondary)' }}>
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
                  <Download size={13} /> Print Pass
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
