"use client";

import React, { useState } from "react";
import { blogApi, handleApiError } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    authorName: "Admin",
    authorEmail: "",
    category: "",
    tags: "",
    published: true,
    featured: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await blogApi.createBlog({
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: {
          name: formData.authorName,
          ...(formData.authorEmail && { email: formData.authorEmail }),
        },
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published: formData.published,
        featured: formData.featured,
      });

      setStatus("success");
      setMessage("Blog post created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        authorName: "Admin",
        authorEmail: "",
        category: "",
        tags: "",
        published: true,
        featured: false,
      });

      // Redirect to blog page after 2 seconds
      setTimeout(() => {
        router.push("/blog");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setMessage(handleApiError(err));
    }
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Create Blog Post
            </h1>
            <p className="mt-2 text-neutral-400">
              Admin panel - Create a new blog post
            </p>
          </div>
          <Link
            href="/blog"
            className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-white transition-colors hover:border-rose-600 hover:bg-neutral-900"
          >
            Back to Blog
          </Link>
        </div>

        {/* Status Messages */}
        {status === "success" && message && (
          <div className="mb-6 rounded-lg border border-green-800 bg-green-950/50 p-4 text-green-400">
            {message}
          </div>
        )}
        {status === "error" && message && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-950/50 p-4 text-red-400">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-neutral-200">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
              placeholder="Enter blog post title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-neutral-200">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
              placeholder="Brief description of the blog post"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-neutral-200">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-sm text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
              placeholder="Write your blog post content here (supports Markdown)"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Tip: You can use Markdown formatting
            </p>
          </div>

          {/* Author Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="authorName" className="mb-2 block text-sm font-medium text-neutral-200">
                Author Name *
              </label>
              <input
                type="text"
                id="authorName"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                placeholder="Author name"
              />
            </div>

            <div>
              <label htmlFor="authorEmail" className="mb-2 block text-sm font-medium text-neutral-200">
                Author Email (Optional)
              </label>
              <input
                type="email"
                id="authorEmail"
                name="authorEmail"
                value={formData.authorEmail}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                placeholder="author@example.com"
              />
            </div>
          </div>

          {/* Category and Tags */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-neutral-200">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Industry Insights">Industry Insights</option>
                <option value="Process">Process</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="mb-2 block text-sm font-medium text-neutral-200">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                placeholder="react, nextjs, typescript"
              />
              <p className="mt-1 text-xs text-neutral-500">
                Separate tags with commas
              </p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-neutral-200">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-rose-600 focus:ring-2 focus:ring-rose-600 focus:ring-offset-0"
              />
              <span className="text-sm">Publish immediately</span>
            </label>

            <label className="flex items-center gap-2 text-neutral-200">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-rose-600 focus:ring-2 focus:ring-rose-600 focus:ring-offset-0"
              />
              <span className="text-sm">Featured post</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex-1 rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "Creating..." : "Create Blog Post"}
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/blog")}
              className="rounded-lg border border-neutral-800 bg-neutral-950 px-6 py-3 font-medium text-white transition-colors hover:border-rose-600 hover:bg-neutral-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
