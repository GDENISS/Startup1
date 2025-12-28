import { notFound } from 'next/navigation';
import { blogApi, type Blog } from '@/lib/api';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import React from 'react';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'UTC' });
  const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'UTC' });
  return `${month} ${day}, ${year}`;
}

interface BlogPostPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { slug } = await props.params;
  let post: Blog | null = null;
  let moreBlogs: Blog[] = [];
  try {
    const res = await blogApi.getBlog(slug);
    if (res && res.success && res.data) {
      post = res.data as Blog;
    }
    // Fetch more blogs for the 'More Blogs' section
    const moreRes = await blogApi.getBlogs(1, 4);
    if (moreRes && moreRes.success && Array.isArray(moreRes.data)) {
      moreBlogs = (moreRes.data as Blog[]).filter(b => b.slug !== slug).slice(0, 3);
    } else if (moreRes && moreRes.success && moreRes.data && 'data' in moreRes.data && Array.isArray(moreRes.data.data)) {
      moreBlogs = (moreRes.data.data as Blog[]).filter(b => b.slug !== slug).slice(0, 3);
    }
  } catch (e) {
    // Optionally log error
  }
  if (!post) {
    notFound();
  }
  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link href="/blog" className="text-rose-500 hover:underline text-sm font-medium">← Back to Blog</Link>
          </div>
          {/* Category, Author, Read Time */}
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-rose-500">
              {post.category || 'Uncategorized'}
            </span>
            <span className="text-neutral-500 flex items-center gap-2">
              {typeof post.author === 'object' && post.author !== null ? post.author.name : post.author}
              <span className="mx-1">·</span>
              {post.readTime || '5 min read'}
              <span className="mx-1">·</span>
              <time>{formatDate(post.createdAt)}</time>
            </span>
          </div>
          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {post.title}
          </h1>
          {/* Excerpt */}
          {post.excerpt && (
            <p className="mb-8 text-lg text-neutral-400">{post.excerpt}</p>
          )}
          {/* Content */}
          <article className="prose prose-invert prose-rose max-w-none text-neutral-200">
            {post.content}
          </article>

          {/* More Blogs Section */}
          {moreBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-white mb-6">More Blogs</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {moreBlogs.map((b) => (
                  <Link key={b.slug} href={`/blog/${b.slug}`} className="block rounded-lg border border-neutral-800 bg-neutral-950 p-4 hover:border-rose-600 transition-colors">
                    <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-mono uppercase tracking-wider text-rose-500">{b.category || 'Uncategorized'}</span>
                      <span>·</span>
                      <span>{typeof b.author === 'object' && b.author !== null ? b.author.name : b.author}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{b.title}</h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">{b.excerpt || (b as any).description || 'No description available.'}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                      <span>{b.readTime || '5 min read'}</span>
                      <span>{formatDate(b.createdAt)}</span>
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
