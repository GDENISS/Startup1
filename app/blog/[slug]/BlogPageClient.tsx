"use client";

import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import { BlogStats } from '@/components/Blog/BlogStats';
import { useBlogInteractions } from '@/lib/hooks/useBlogInteractions';
import type { Blog } from '@/lib/api';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'UTC' });
  const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'UTC' });
  return `${month} ${day}, ${year}`;
}

interface BlogPageClientProps {
  post: Blog;
  moreBlogs: Blog[];
}

export default function BlogPageClient({ post, moreBlogs }: BlogPageClientProps) {
  const { views, likes, isLiked, isLiking, toggleLike } = useBlogInteractions({
    blogId: post._id,
    slug: post.slug,
    initialViews: post.views || 0,
    initialLikes: post.likes || 0,
  });

  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog" className="text-rose-500 hover:underline text-sm font-medium inline-flex items-center">
              ← Back to Blog
            </Link>
          </div>
          
          {/* Blog Post Card */}
          <article className="rounded-lg border border-neutral-800 bg-neutral-950 overflow-hidden">
            <div className="p-6">
              {/* Category, Author & Read Time */}
              <div className="mb-3 flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="font-mono uppercase tracking-wider text-rose-500">
                  {post.category || 'Uncategorized'}
                </span>
                <span className="text-neutral-500 flex items-center gap-2">
                  {typeof post.author === 'object' && post.author !== null ? post.author.name : post.author}
                  <span className="mx-1">·</span>
                  {post.readTime || '5 min read'}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-3 text-2xl md:text-3xl font-bold text-white">
                {post.title}
              </h1>

              {/* Content */}
              <div className="overflow-hidden">
                <div className="prose prose-invert prose-rose max-w-none">
                  {post.excerpt && (
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>
              </div>

              {/* Footer with Stats */}
              <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-4 flex-wrap gap-3">
                <time className="text-xs text-neutral-500">{formatDate(post.createdAt)}</time>
                <BlogStats
                  views={views}
                  likes={likes}
                  isLiked={isLiked}
                  isLiking={isLiking}
                  onLike={toggleLike}
                />
              </div>
            </div>
          </article>

          {/* More Blogs Section */}
          {moreBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-white mb-6">More Blogs</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {moreBlogs.map((b) => (
                  <Link 
                    key={b.slug} 
                    href={`/blog/${b.slug}`} 
                    className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:border-rose-600 transition-colors"
                  >
                    <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-mono uppercase tracking-wider text-rose-500">
                        {b.category || 'Uncategorized'}
                      </span>
                      <span>·</span>
                      <span>{typeof b.author === 'object' && b.author !== null ? b.author.name : b.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{b.title}</h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">
                      {b.excerpt || 'No description available.'}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                      <span>{b.readTime || '5 min read'}</span>
                      <div className="flex items-center gap-3">
                        <span>{b.views || 0} views</span>
                        <span>{b.likes || 0} likes</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
