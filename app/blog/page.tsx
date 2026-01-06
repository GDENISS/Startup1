"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { BlogCard } from "@/components/Blog/BlogCard";
import { blogApi, subscriptionApi, handleApiError, type Blog } from "@/lib/api";

// Utility to format blog dates (hydration-safe: always UTC)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Use UTC to avoid timezone/locale mismatch
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'UTC' });
  const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'UTC' });
  return `${month} ${day}, ${year}`;
};

const BlogPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "All",
    "Technology",
    "Business",
    "Startup",
    "Development",
    "Design",
    "Marketing",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchBlogs();
    }
  }, [isClient]);

  // Expand blog if slug in URL
  useEffect(() => {
    if (!isClient || blogs.length === 0) return;
    const path = window.location.pathname;
    const match = path.match(/^\/blog\/(.+)$/);
    if (match) {
      const blog = blogs.find(b => b.slug === match[1]);
      if (blog && expandedBlogId !== blog._id) {
        setExpandedBlogId(blog._id);
        // Smooth scroll to the blog after a short delay to ensure rendering
        setTimeout(() => {
          const element = document.getElementById(`blog-${blog._id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [isClient, blogs, expandedBlogId]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getBlogs(1, 20);
      console.log('API Response:', response);
      
      if (response.success) {
        // Handle different response structures
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else if (response.data && 'data' in response.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          setBlogs([]);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("sending");
    setSubscribeMessage("");

    try {
      await subscriptionApi.subscribe(email, "blog");
      setSubscribeStatus("success");
      setSubscribeMessage("Successfully subscribed!");
      setEmail("");
      setTimeout(() => {
        setSubscribeStatus("idle");
        setSubscribeMessage("");
      }, 5000);
    } catch (error) {
      // Error already logged in handleApiError
      setSubscribeStatus("error");
      setSubscribeMessage(handleApiError(error));
      setTimeout(() => {
        setSubscribeStatus("idle");
      }, 5000);
    }
  };

  const toggleBlogExpansion = (blog: Blog) => {
    if (expandedBlogId === blog._id) {
      setExpandedBlogId(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/blog');
      }
    } else {
      setExpandedBlogId(blog._id);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `/blog/${blog.slug}`);
      }
    }
  };

  // Share handler for blog posts
  const handleShare = async (post: Blog) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/blog/${post.slug}`;
    const title = post.title;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      alert('Could not share the link.');
    }
  };

  const filteredBlogs = selectedCategory === "all" 
    ? blogs 
    : blogs?.filter(blog => blog.category?.toLowerCase() === selectedCategory.toLowerCase());

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              Insights & Updates
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Thoughts on technology, development, and building better software.
            </p>
            
            {/* Category Filter */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === cat.toLowerCase()
                      ? "bg-rose-600 text-white"
                      : "border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-rose-600 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-neutral-800 bg-neutral-950 p-6">
                  <div className="h-4 bg-neutral-800 rounded w-20 mb-4"></div>
                  <div className="h-6 bg-neutral-800 rounded mb-3"></div>
                  <div className="h-4 bg-neutral-800 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-800 bg-red-950/50 p-8 text-center">
              <p className="text-red-400">{error}</p>
              <button 
                onClick={fetchBlogs}
                className="mt-4 rounded-lg bg-rose-600 px-6 py-2 text-white hover:bg-rose-700"
              >
                Try Again
              </button>
            </div>
          ) : !filteredBlogs || filteredBlogs?.length === 0 ? (
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-8 text-center">
              <p className="text-neutral-400">
                {selectedCategory === "all" 
                  ? "No blog posts yet. Check back soon!" 
                  : `No posts found in "${selectedCategory}" category.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs?.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  isExpanded={expandedBlogId === post._id}
                  onToggle={toggleBlogExpansion}
                  onShare={handleShare}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {!loading && !error && filteredBlogs?.length > 0 && (
            <div className="mt-12 text-center">
              <button className="rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-3 font-medium text-white transition-colors hover:border-rose-600 hover:bg-neutral-900">
                Load More Posts
              </button>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-lg border border-neutral-800 bg-neutral-950 p-8 text-center md:p-12">
            <h3 className="text-2xl font-bold text-white">
              Stay Updated
            </h3>
            <p className="mt-4 text-neutral-400">
              Get the latest insights and updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mx-auto mt-6 flex flex-col sm:flex-row max-w-md gap-2">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribeStatus === "sending"}
                className="flex-1 rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={subscribeStatus === "sending"}
                className="rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeStatus === "sending" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {subscribeMessage && (
              <div className={`mt-4 rounded-lg border px-4 py-3 ${
                subscribeStatus === "success" 
                  ? "border-green-800 bg-green-950/50 text-green-400" 
                  : "border-red-800 bg-red-950/50 text-red-400"
              }`}>
                {subscribeMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
