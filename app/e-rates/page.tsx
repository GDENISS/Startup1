"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { Zap, Target, Settings } from "lucide-react";
import { subscriptionApi, handleApiError } from "@/lib/api";

const ComingSoonPage = () => {
  const [time, setTime] = useState(() => new Date());
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Launch date - adjust this to your actual launch date
  const launchDate = React.useMemo(() => new Date("2026-02-01T00:00:00"), []);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;
    
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(countdown);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [launchDate, isClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("sending");
    setSubscribeMessage("");
    
    try {
      await subscriptionApi.subscribe(email, "waitlist");
      setSubscribeStatus("success");
      setSubscribeMessage("Thanks! We'll notify you when we launch.");
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

  // Calculate clock hand angles
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = (seconds * 6) - 90; // 6 degrees per second
  const minuteAngle = (minutes * 6 + seconds * 0.1) - 90; // 6 degrees per minute
  const hourAngle = (hours * 30 + minutes * 0.5) - 90; // 30 degrees per hour

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
              Launching Soon
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-6xl">
              E-Rates
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              Smarter Property Rates for Everyone
            </p>
          </div>

          {/* Analog Clock */}
          <div className="mb-16 flex justify-center">
            <div className="relative">
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                className="drop-shadow-2xl"
              >
                {/* Clock Face */}
                <circle
                  cx="140"
                  cy="140"
                  r="135"
                  fill="transparent"
                  stroke="#262626"
                  strokeWidth="2"
                />
                
                {/* Hour Markers */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x1 = 140 + Math.cos(angle) * 120;
                  const y1 = 140 + Math.sin(angle) * 120;
                  const x2 = 140 + Math.cos(angle) * 110;
                  const y2 = 140 + Math.sin(angle) * 110;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#525252"
                      strokeWidth={i % 3 === 0 ? "3" : "2"}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Hour Hand */}
                <line
                  x1="140"
                  y1="140"
                  x2={140 + Math.cos(hourAngle * Math.PI / 180) * 60}
                  y2={140 + Math.sin(hourAngle * Math.PI / 180) * 60}
                  stroke="#f43f5e"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    transition: "all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
                  }}
                />

                {/* Minute Hand */}
                <line
                  x1="140"
                  y1="140"
                  x2={140 + Math.cos(minuteAngle * Math.PI / 180) * 85}
                  y2={140 + Math.sin(minuteAngle * Math.PI / 180) * 85}
                  stroke="#a3a3a3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    transition: "all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
                  }}
                />

                {/* Second Hand */}
                <line
                  x1="140"
                  y1="140"
                  x2={140 + Math.cos(secondAngle * Math.PI / 180) * 100}
                  y2={140 + Math.sin(secondAngle * Math.PI / 180) * 100}
                  stroke="#525252"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    transition: "all 0.1s linear",
                  }}
                />

                {/* Center Dot */}
                <circle cx="140" cy="140" r="8" fill="#f43f5e" />
                <circle cx="140" cy="140" r="4" fill="#000" />
              </svg>

              {/* Digital Time Display */}
              <div className="mt-6 text-center font-mono text-2xl text-neutral-500">
                {time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <h2 className="mb-8 text-center text-xl font-semibold text-white">
              Launching In
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-neutral-800 bg-neutral-950 p-4 md:p-6"
                >
                  <div className="text-3xl font-bold text-rose-500 md:text-4xl">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-mono text-xs uppercase tracking-wider text-neutral-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              What is E-Rates?
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
             e-Rates is a geospatial digital system that modernizes how government property rates are managed and collected. By linking property records to accurate maps and real-time data, it makes rates transparent, fair, and easy to manage. For government, it improves valuation accuracy, boosts revenue collection, and reduces leakages. For citizens, it simplifies billing, payments, and inquiries cutting delays, confusion, and unnecessary trips to offices. The result is a more efficient, accountable, and people-friendly rates system.
            </p>
            <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                <Zap className="mb-2 h-6 w-6 text-rose-500" />
                <h4 className="mb-2 font-semibold text-white">Lightning Fast</h4>
                <p className="text-muted-foreground text-sm">
                  Instant calculations with real-time updates
                </p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                <Target className="mb-2 h-6 w-6 text-rose-500" />
                <h4 className="mb-2 font-semibold text-white">Accurate</h4>
                <p className="text-muted-foreground text-sm">
                  Precision-engineered algorithms for reliable results
                </p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
                <Settings className="mb-2 h-6 w-6 text-rose-500" />
                <h4 className="mb-2 font-semibold text-white">Customizable</h4>
                <p className="text-muted-foreground text-sm">
                  Tailored to your specific business needs
                </p>
              </div>
            </div>
          </div>

          {/* Notify Me Form */}
          <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-8">
              <h3 className="mb-4 text-center text-xl font-bold text-white">
                Get Notified at Launch
              </h3>
              <p className="text-muted-foreground mb-6 text-center text-sm">
                Be the first to know when E-Rates goes live
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-500 transition-colors focus:border-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-600"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-rose-600 px-6 py-3 font-medium text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={subscribeStatus === "sending"}
                >
                  {subscribeStatus === "sending" ? "Subscribing..." : "Notify Me"}
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

          {/* Follow Progress */}
          <div className="mt-16 border-t border-neutral-800 pt-12 text-center">
            <h3 className="mb-4 text-xl font-bold text-white">
              Follow Our Progress
            </h3>
            <p className="text-muted-foreground mb-6">
              Want to see what we&apos;re building? Check out our blog for updates
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

export default ComingSoonPage;
