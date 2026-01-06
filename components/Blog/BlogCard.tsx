"use client";

import React from 'react';
import { Share2 } from 'lucide-react';
import { useBlogInteractions } from '@/lib/hooks/useBlogInteractions';
import { BlogStats } from './BlogStats';
import type { Blog } from '@/lib/api';

interface BlogCardProps {
  post: Blog;
  isExpanded: boolean;
  onToggle: (post: Blog) => void;
  onShare: (post: Blog) => void;
  formatDate: (date: string) => string;
}

/**
 * Blog card component with integrated view tracking and like functionality
 * Automatically tracks views when expanded and provides like interaction
 */
export function BlogCard({ post, isExpanded, onToggle, onShare, formatDate }: BlogCardProps) {
  const { views, likes, isLiked, isLiking, toggleLike } = useBlogInteractions({
    blogId: post._id,
    slug: post.slug,
    initialViews: post.views || 0,
    initialLikes: post.likes || 0,
  });

  return (
    <article
      id={`blog-${post._id}`}
      className={`group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 transition-all hover:border-rose-600 ${
        isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
    >
      <div className="p-6">
        {/* Category, Author & Read Time */}
        <div className="mb-3 flex items-center justify-between text-xs flex-wrap gap-2">
          <span className="font-mono uppercase tracking-wider text-rose-500">
            {post.category || 'Uncategorized'}
          </span>
          <div className="flex items-center gap-2 text-neutral-500">
            <span>{typeof post.author === 'object' && post.author !== null ? post.author.name : post.author}</span>
            <span>·</span>
            <span>{post.readTime || '5 min read'}</span>
            <button
              type="button"
              aria-label="Share this article"
              className="ml-2 p-1 rounded hover:bg-neutral-800 transition-colors"
              onClick={() => onShare(post)}
            >
              <Share2 className="text-rose-500 w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-rose-500">
          {post.title}
        </h2>

        {/* Content */}
        <div className="overflow-hidden">
          {isExpanded ? (
            <div className="prose prose-invert prose-rose max-w-none">
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {post.excerpt || 'No description available.'}
              </p>
              <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </div>
          ) : (
            <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
              {post.excerpt || 'No description available.'}
            </p>
          )}
        </div>

        {/* Footer with Stats and Actions */}
        <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-4 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <time className="text-xs text-neutral-500">{formatDate(post.createdAt)}</time>
            <BlogStats
              views={views}
              likes={likes}
              isLiked={isLiked}
              isLiking={isLiking}
              onLike={toggleLike}
            />
          </div>
          <button
            onClick={() => onToggle(post)}
            className="text-sm font-medium text-rose-500 transition-colors hover:text-rose-400 focus:outline-none"
          >
            {isExpanded ? '← Read less' : 'Read more →'}
          </button>
        </div>
      </div>
    </article>
  );
}
