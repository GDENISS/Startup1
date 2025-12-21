"use client";

import React from "react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable GIS Applications with Modern Tech",
    excerpt:
      "Exploring how modern frameworks and cloud technologies are revolutionizing geospatial application development and making spatial intelligence accessible to all.",
    date: "December 15, 2024",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Future of Spatial Data in Government",
    excerpt:
      "How local and national governments can leverage geospatial data and ML-powered tools to make better infrastructure and policy decisions.",
    date: "December 10, 2024",
    category: "Industry Insights",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "From Idea to MVP: Our Development Process",
    excerpt:
      "A behind-the-scenes look at how we transform client ideas into functional prototypes, focusing on rapid iteration and user feedback.",
    date: "December 5, 2024",
    category: "Process",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Why Next.js is Our Framework of Choice",
    excerpt:
      "Exploring the technical advantages of Next.js for building performant, SEO-friendly web applications with exceptional user experiences.",
    date: "November 28, 2024",
    category: "Technology",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Machine Learning in Everyday Business",
    excerpt:
      "Practical applications of ML that small and medium businesses can implement today to improve operations and decision-making.",
    date: "November 20, 2024",
    category: "AI & ML",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Democratizing Technology: Our Mission",
    excerpt:
      "Why we believe technology should be accessible to all organizations, not just those with massive budgets and technical teams.",
    date: "November 15, 2024",
    category: "Company",
    readTime: "5 min read",
  },
];

const BlogPage = () => {
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
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 transition-all hover:border-rose-600"
              >
                <div className="p-6">
                  {/* Category & Read Time */}
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-rose-500">
                      {post.category}
                    </span>
                    <span className="text-neutral-500">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-rose-500">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm text-neutral-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                    <time className="text-xs text-neutral-500">{post.date}</time>
                    <span className="text-sm font-medium text-rose-500 transition-colors group-hover:text-rose-400">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More / Pagination Placeholder */}
          <div className="mt-12 text-center">
            <button className="rounded-lg border border-neutral-800 bg-neutral-950 px-8 py-3 font-medium text-white transition-colors hover:border-rose-600 hover:bg-neutral-900">
              Load More Posts
            </button>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-lg border border-neutral-800 bg-neutral-950 p-8 text-center md:p-12">
            <h3 className="text-2xl font-bold text-white">
              Stay Updated
            </h3>
            <p className="mt-4 text-neutral-400">
              Get the latest insights and updates delivered to your inbox.
            </p>
            <div className="mx-auto mt-6 flex flex-col sm:flex-row max-w-md gap-2">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
              />
              <button className="rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
