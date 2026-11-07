import React, { useState } from 'react';
import { Play, Pause, ExternalLink, Disc3, Volume2 } from 'lucide-react';
import { Album, Track } from '../types';

interface DiscographyProps {
  albums: Album[];
}

export default function Discography({ albums }: DiscographyProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const selectedAlbum = albums.find((a) => a.id === selectedAlbumId) || albums[0];

  const toggleTrackPlay = (trackId: string) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  return (
    <section
      id="discography"
      aria-labelledby="discography-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ marginBottom: '36px' }}>
        <span className="eyebrow">
          DISCOGRAPHY &amp; SOUND ARCHIVE
        </span>
        <h2 id="discography-heading" style={{ margin: '4px 0 12px 0' }}>
          Recorded Works
        </h2>
        <p style={{ maxWidth: '580px', color: 'var(--color-text-secondary)', fontSize: '0.9625rem' }}>
          Explore studio recordings and live concert masterings. Select an album to inspect its tracklist, liner notes, and stream preview samples.
        </p>
      </div>

      {/* Album Cards Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}
      >
        {albums.map((album) => {
          const isSelected = album.id === selectedAlbumId;
          return (
            <div
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: `1px solid ${isSelected ? 'var(--color-accent-deep)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: isSelected ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
                transition: 'all var(--motion-normal) var(--ease-luxury)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
              }}
            >
              {/* Cover Art */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={album.coverImage}
                  alt={album.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isSelected ? 'brightness(1.02)' : 'brightness(0.95)',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(28, 29, 27, 0.82)',
                    backdropFilter: 'blur(6px)',
                    color: '#F4F0E8',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {album.type} &middot; {album.releaseYear}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    marginBottom: '4px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {album.title}
                </h3>
                <span style={{ fontSize: '0.78125rem', color: 'var(--color-text-muted)' }}>
                  {album.recordLabel} &middot; {album.tracks.length} Tracks
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Album Deep Dive & Tracklist */}
      {selectedAlbum && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 36px 40px',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '24px',
              marginBottom: '28px',
            }}
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: '4px' }}>
                FEATURED RELEASE &middot; {selectedAlbum.releaseDate}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {selectedAlbum.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>
                Mastered for high-fidelity 96kHz/24-bit audio. Label: {selectedAlbum.recordLabel}
              </p>
            </div>

            {/* External Outlinks */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selectedAlbum.spotifyUrl && (
                <a
                  href={selectedAlbum.spotifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <span>Spotify</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {selectedAlbum.appleMusicUrl && (
                <a
                  href={selectedAlbum.appleMusicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <span>Apple Music</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {selectedAlbum.bandcampUrl && (
                <a
                  href={selectedAlbum.bandcampUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <span>Bandcamp</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Tracklist List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedAlbum.tracks.map((track) => {
              const isPlaying = playingTrackId === track.id;

              return (
                <div
                  key={track.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isPlaying ? 'var(--color-accent-subtle)' : 'var(--color-surface-elevated)',
                    border: `1px solid ${isPlaying ? 'var(--color-accent-deep)' : 'var(--color-border)'}`,
                    transition: 'all var(--motion-fast) ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      onClick={() => toggleTrackPlay(track.id)}
                      aria-label={isPlaying ? 'Pause sample' : 'Play audio sample'}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: isPlaying ? 'var(--color-accent-deep)' : 'var(--color-text-primary)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform var(--motion-fast) ease',
                      }}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
                    </button>

                    <div>
                      <div
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: isPlaying ? 'var(--color-accent-deep)' : 'var(--color-text-primary)',
                        }}
                      >
                        {track.title}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        Track {track.trackNumber} &middot; 30-sec preview
                      </span>
                    </div>
                  </div>

                  {/* Right side: Duration + Live visualizer waveform if playing */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {isPlaying && (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                        <span style={waveBarStyle(0.4)} />
                        <span style={waveBarStyle(0.8)} />
                        <span style={waveBarStyle(0.5)} />
                        <span style={waveBarStyle(0.9)} />
                        <span style={waveBarStyle(0.3)} />
                      </div>
                    )}
                    <span className="tabular-nums" style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {track.durationFormatted}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

const waveBarStyle = (scale: number): React.CSSProperties => ({
  width: '3px',
  height: `${scale * 16}px`,
  backgroundColor: 'var(--color-accent-deep)',
  borderRadius: '1px',
  animation: 'pulseGlow 1s infinite alternate ease-in-out',
});
