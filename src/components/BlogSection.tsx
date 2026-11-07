import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, X, Share2, Check } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function BlogSection({ posts, showToast }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'Tour News', 'New Release', 'Press', 'Behind the Scenes'];

  const filteredPosts = posts.filter(
    (post) => selectedCategory === 'All' || post.category === selectedCategory
  );

  const handleCopyShare = (post: BlogPost) => {
    navigator.clipboard?.writeText(window.location.origin + '#' + post.slug);
    setCopiedLink(true);
    showToast('Article link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section
      id="news-press"
      aria-labelledby="news-heading"
      className="reveal"
      style={{
        paddingTop: '64px',
        paddingBottom: '72px',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <div>
          <span className="eyebrow">EDITORIAL &middot; DISPATCHES</span>
          <h2 id="news-heading" style={{ margin: '4px 0 10px 0' }}>
            News &amp; Press Releases
          </h2>
          <p style={{ maxWidth: '540px', color: 'var(--color-text-secondary)', fontSize: '0.9625rem' }}>
            Official statements, behind-the-scenes engineering logs, and global tour dispatches from Nocturne Archive.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontWeight: selectedCategory === cat ? 600 : 500 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="card-surface"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'pointer',
            }}
            onClick={() => setActiveArticle(post)}
          >
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(17, 19, 18, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: 'var(--color-champagne)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid rgba(185, 154, 112, 0.3)',
                }}
              >
                {post.category}
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '10px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} />
                  {post.date}
                </span>
                <span>&middot;</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  {post.readTime}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 1.35,
                  margin: '0 0 12px 0',
                  color: 'var(--color-text)',
                }}
              >
                {post.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-champagne)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                <span>Read Full Dispatch</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
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
            if (e.target === e.currentTarget) setActiveArticle(null);
          }}
        >
          <div
            className="card-surface"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '16px',
              padding: '0',
              animation: 'fadeIn 0.25s ease-out',
            }}
          >
            {/* Modal Cover Image */}
            <div style={{ position: 'relative', height: '280px', width: '100%' }}>
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="btn btn-secondary"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '38px',
                  height: '38px',
                  padding: 0,
                  borderRadius: '50%',
                  background: 'rgba(17, 19, 18, 0.7)',
                  color: '#fff',
                  border: 'none',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="badge badge-open">{activeArticle.category}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  {activeArticle.date} &middot; {activeArticle.readTime}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  By {activeArticle.author}
                </span>
              </div>

              <h2 id="article-modal-title" style={{ fontSize: '1.8rem', lineHeight: 1.25, margin: '0 0 20px 0' }}>
                {activeArticle.title}
              </h2>

              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  color: 'var(--color-text)',
                  whiteSpace: 'pre-line',
                  marginBottom: '32px',
                }}
              >
                {activeArticle.content}
              </div>

              {/* Footer bar inside modal */}
              <div
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleCopyShare(activeArticle)}
                  className="btn btn-secondary btn-sm"
                >
                  {copiedLink ? <Check size={14} color="#16a34a" /> : <Share2 size={14} />}
                  {copiedLink ? 'Link Copied' : 'Share Article'}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="btn btn-primary btn-sm"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
