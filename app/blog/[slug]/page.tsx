import { notFound } from 'next/navigation';
import { blogApi, type Blog } from '@/lib/api';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import React from 'react';
import BlogPageClient from './BlogPageClient';

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
  
  return <BlogPageClient post={post} moreBlogs={moreBlogs} />;
}
