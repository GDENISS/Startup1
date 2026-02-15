"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import {
  Zap,
  Target,
  Settings,
  MapPin,
  TrendingUp,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { subscriptionApi, handleApiError } from "@/lib/api";

const LaunchPage = () => {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("sending");
    setSubscribeMessage("");

    try {
      await subscriptionApi.subscribe(email, "landing_page");
      setSubscribeStatus("success");
      setSubscribeMessage("Thanks! You'll receive updates about E-Rates.");
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

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244, 63, 94, 0.15), transparent 50%)`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          {/* Launch Announcement */}
          {/* <div className="mb-8 text-center">
            <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-400 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">NOW LIVE</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div> */}

          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-5xl">
              E-Rates is
              <span className="mt-2 block bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 bg-clip-text text-transparent">
                Finally Here
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-neutral-400 md:text-2xl">
              The future of property rates management has arrived. Experience
              transparency, efficiency, and accuracy like never before.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://e-rates.akoot.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-rose-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/50"
              >
                Launch E-Rates
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/50 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-rose-600 hover:bg-neutral-900"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Interactive Feature Showcase */}
          <div id="learn-more" className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Why E-Rates Changes Everything
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  title: "Geospatial Precision",
                  description:
                    "Every property mapped with pinpoint accuracy using advanced GIS technology",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Real-time calculations and instant updates. No more waiting, no more delays",
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Boost",
                  description:
                    "Reduce leakages and increase collection efficiency by up to 40%",
                },
                {
                  icon: Shield,
                  title: "Transparent & Fair",
                  description:
                    "Clear valuation methods and audit trails. Trust built into every transaction",
                },
                {
                  icon: Target,
                  title: "Precision Engineered",
                  description:
                    "Advanced algorithms ensure accurate assessments every single time",
                },
                {
                  icon: Settings,
                  title: "Fully Customizable",
                  description:
                    "Adapts to your municipality's unique requirements and workflows",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 transition-all hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-500/10 transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-rose-500" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Journey Section */}
          <div className="mb-16 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8 md:p-12">
            <h2 className="mb-6 text-center text-3xl font-bold text-white">
              From Vision to Reality
            </h2>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-lg leading-relaxed text-neutral-300">
                E-Rates is a geospatial digital system that modernizes how
                government property rates are managed and collected. By linking
                property records to accurate maps and real-time data, we've
                created a system that's transparent, fair, and incredibly
                efficient.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-neutral-800 bg-black/50 p-6">
                  <h4 className="mb-3 text-lg font-semibold text-rose-400">
                    For Government
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Improved valuation accuracy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Boosted revenue collection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Reduced leakages and fraud</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Better resource allocation</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-black/50 p-6">
                  <h4 className="mb-3 text-lg font-semibold text-rose-400">
                    For Citizens
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Simplified billing and payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Easy inquiries and tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>No unnecessary office visits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-rose-500">•</span>
                      <span>Clear, transparent processes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {/* <div className="mb-12 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 via-black to-rose-950/20 p-8 text-center backdrop-blur-sm md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your Rates System?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-neutral-300">
              Join the revolution in property rates management. See E-Rates in
              action today.
            </p>
            <a
              href="https://e-rates.akoot.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-lg bg-rose-600 px-10 py-5 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-rose-700 hover:shadow-2xl hover:shadow-rose-500/50"
            >
              Get Started Now
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </a>
          </div> */}

          {/* Newsletter Section */}
          <div className="mx-auto mb-12 max-w-md">
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-8">
              <h3 className="mb-4 text-center text-xl font-bold text-white">
                Stay Updated
              </h3>
              <p className="mb-6 text-center text-sm text-neutral-400">
                Get the latest updates, features, and insights about E-Rates
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:ring-1 focus:ring-rose-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={subscribeStatus === "sending"}
                >
                  {subscribeStatus === "sending"
                    ? "Subscribing..."
                    : "Subscribe for Updates"}
                </button>
                {subscribeStatus === "success" && subscribeMessage && (
                  <div className="rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-center text-sm text-green-400">
                    {subscribeMessage}
                  </div>
                )}
                {subscribeStatus === "error" && subscribeMessage && (
                  <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-center text-sm text-red-400">
                    {subscribeMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Blog Link */}
          <div className="border-t border-neutral-800 pt-12 text-center">
            <h3 className="mb-4 text-xl font-bold text-white">
              Follow Our Journey
            </h3>
            <p className="mb-6 text-neutral-400">
              Read about our development process, feature updates, and the
              future of E-Rates
            </p>
            <a
              href="/blog"
              className="inline-block rounded-lg border border-neutral-800 bg-neutral-950 px-6 py-3 font-medium text-white transition-colors hover:border-rose-600 hover:bg-neutral-900"
            >
              Read Our Blog
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LaunchPage;
