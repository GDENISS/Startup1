"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              Get in Touch
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Let's Build Something Together
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Have a project in mind? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-lg bg-rose-600 px-8 py-3 font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <div className="rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-green-400">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Email
                </h3>
                <a
                  href="mailto:hello@akoot.tech"
                  className="text-neutral-400 transition-colors hover:text-rose-500"
                >
                  hello@akoot.tech
                </a>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Location
                </h3>
                <p className="text-neutral-400">
                  Nairobi, Kenya
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Response Time
                </h3>
                <p className="text-neutral-400">
                  We typically respond within 24 hours during business days.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Business Hours
                </h3>
                <div className="space-y-1 text-neutral-400">
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM EAT</p>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-8">
                <h3 className="mb-3 text-lg font-semibold text-white">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-neutral-400 transition-colors hover:text-rose-500"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 transition-colors hover:text-rose-500"
                    aria-label="X (formerly Twitter)"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-neutral-400 transition-colors hover:text-rose-500"
                    aria-label="GitHub"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
