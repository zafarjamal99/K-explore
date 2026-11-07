import React, { useState, useEffect } from 'react';
import { Radio, Users, MessageSquare, Send } from 'lucide-react';

interface LiveVideoPlayerProps {
  streamUrl?: string;
  title?: string;
}

interface ChatMessage {
  id: string;
  user: string;
  city: string;
  message: string;
  time: string;
}

export default function LiveVideoPlayer({
  streamUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title = 'Live from Elbphilharmonie Grand Hall: The Solstice World Tour',
}: LiveVideoPlayerProps) {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [viewerCount, setViewerCount] = useState<number>(4820);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Elena V.', city: 'Berlin', message: 'The string arrangement on Overture is giving chills!', time: '1m ago' },
    { id: '2', user: 'Kenji T.', city: 'Tokyo', message: 'Watching from Shibuya, sound engineering is pristine.', time: 'Just now' },
    { id: '3', user: 'Marcus D.', city: 'London', message: 'Can’t wait for the Royal Albert Hall show next week!', time: 'Just now' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Subtle viewer fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    const msg: ChatMessage = {
      id: String(Date.now()),
      user: 'You',
      city: 'Live Stream',
      message: newMsg.trim(),
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev.slice(-6), msg]);
    setNewMsg('');
  };

  return (
    <section
      id="live-stream"
      aria-labelledby="live-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#E53E3E',
              display: 'inline-block',
              boxShadow: '0 0 10px rgba(229, 62, 62, 0.8)',
            }}
          />
          <span className="eyebrow" style={{ margin: 0, color: '#E53E3E' }}>
            GLOBAL BROADCAST NETWORK
          </span>
        </div>
        <h2 id="live-heading" style={{ margin: '4px 0 10px 0' }}>
          Live Concert Streaming
        </h2>
        <p style={{ maxWidth: '580px', color: 'var(--color-text-secondary)', fontSize: '0.9625rem' }}>
          Official high-definition multi-track live stream direct from the mixing console. Broadcast live to fans worldwide.
        </p>
      </div>

      {/* Main Broadcast Stage Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
        }}
        className="broadcast-layout"
      >
        {/* Left: 16:9 Video Player */}
        <div
          style={{
            backgroundColor: '#0A0B0A',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-elevated)',
          }}
        >
          {/* Stream Status Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#111312',
              color: '#F4F0E8',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(229, 62, 62, 0.2)',
                  color: '#FC8181',
                  border: '1px solid rgba(229, 62, 62, 0.4)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <Radio size={12} />
                LIVE
              </span>
              <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{title}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78125rem', color: '#AAA99F' }}>
              <Users size={14} style={{ color: 'var(--color-accent)' }} />
              <span className="tabular-nums">{viewerCount.toLocaleString()} tuning in</span>
            </div>
          </div>

          {/* 16:9 Video Embed Container */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0"
              title="Aurelia Vance Live Broadcast"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </div>

          {/* Player Footer */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#111312',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78125rem',
              color: '#AAA99F',
            }}
          >
            <span>Audio Master: 96kHz / 24-bit Lossless Stream Direct from Console</span>
            <span style={{ color: 'var(--color-accent)' }}>4K Ultra HD &middot; Multi-Cam</span>
          </div>
        </div>

        {/* Right: Simulated Real-Time Fan Chat */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            height: '420px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
            }}
          >
            <MessageSquare size={15} style={{ color: 'var(--color-accent-deep)' }} />
            <span>Global Fan Live Chat</span>
          </div>

          {/* Messages list */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {chatMessages.map((msg) => (
              <div key={msg.id} style={{ fontSize: '0.8125rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{msg.user}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-accent-deep)' }}>({msg.city})</span>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{msg.time}</span>
                </div>
                <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>{msg.message}</div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSendChat}
            style={{
              padding: '12px',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Send a live message..."
              style={{
                flex: 1,
                height: '38px',
                padding: '0 12px',
                backgroundColor: 'var(--color-surface-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                color: 'var(--color-text-primary)',
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 14px' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (min-width: 1040px) {
          .broadcast-layout {
            grid-template-columns: 1.8fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
