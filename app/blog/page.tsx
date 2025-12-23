"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { blogApi, subscriptionApi, handleApiError, type Blog } from "@/lib/api";

// Utility to format blog dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
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
    "Development",
    "Design",
    "Tutorial",
    "News",
    "Company",
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchBlogs();
    }
  }, [isClient]);

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
    } catch (err) {
      setSubscribeStatus("error");
      setSubscribeMessage(handleApiError(err));
      setTimeout(() => {
        setSubscribeStatus("idle");
      }, 5000);
    }
  };

  const toggleBlogExpansion = (blogId: string) => {
    setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
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
              {filteredBlogs?.map((post) => {
                const isExpanded = expandedBlogId === post._id;
                return (
                  <article
                    key={post._id}
                    className={`group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 transition-all hover:border-rose-600 ${
                      isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <div className="p-6">
                      {/* Category & Read Time */}
                      <div className="mb-3 flex items-center justify-between text-xs">
                        <span className="font-mono uppercase tracking-wider text-rose-500">
                          {post.category || 'Uncategorized'}
                        </span>
                        <span className="text-neutral-500">{post.readTime || '5 min read'}</span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-rose-500">
                        {post.title}
                      </h2>

                      {/* Content */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-32 opacity-100'
                      }`}>
                        {isExpanded ? (
                          <div className="prose prose-invert prose-rose max-w-none">
                            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                              {post.excerpt || (post as any).description || 'No description available.'}
                            </p>
                            <div className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                              {post.content}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                            {post.excerpt || (post as any).description || 'No description available.'}
                          </p>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-4">
                        <time className="text-xs text-neutral-500">{formatDate(post.createdAt)}</time>
                        <button
                          onClick={() => toggleBlogExpansion(post._id)}
                          className="text-sm font-medium text-rose-500 transition-colors hover:text-rose-400 focus:outline-none"
                        >
                          {isExpanded ? '← Read less' : 'Read more →'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
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
