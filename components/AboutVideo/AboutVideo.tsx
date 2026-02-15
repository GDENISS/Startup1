"use client";

import React from "react";

const AboutVideo = () => {
  return (
    <div className="border-border w-full border-t bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Text Content */}
          <div className="w-full space-y-6 lg:w-1/2">
            <div>
              <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                Who We Are
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-300">
                Building the future, one platform at a time
              </h2>
            </div>

            <div className="space-y-4 text-neutral-400">
              <p className="text-[14px] tracking-tight md:text-[16px]">
                At Akoot.tech, we&apos;re more than just a software company.
                We&apos;re problem solvers, innovators, and partners in your
                digital journey.
              </p>

              <p className="text-[14px] tracking-tight md:text-[16px]">
                Our team combines technical expertise with deep industry
                knowledge to create platforms that don&apos;t just work they
                transform how you do business. From GIS solutions to AI powered
                systems, we build technology that makes a real difference.
              </p>

              <p className="text-[14px] tracking-tight md:text-[16px]">
                Whether you&apos;re a startup looking to launch your first
                product or an established organization modernizing your systems,
                we&apos;re here to turn your vision into reality.
              </p>
            </div>

            <div className="flex flex-row gap-4 pt-4">
              <a href="/about">
                <div className="flex h-12 w-fit cursor-pointer items-center justify-center bg-rose-600 px-8 py-2 transition-colors hover:bg-rose-700">
                  <p className="text-base font-medium text-neutral-50">
                    Learn More
                  </p>
                </div>
              </a>
              <a href="/contact">
                <div className="flex h-12 w-fit cursor-pointer items-center justify-center border-b-[0.5px] border-neutral-600 px-6 py-2 transition-colors hover:border-rose-600">
                  <p className="text-base font-medium text-neutral-50">
                    Get in Touch
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Video Content */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video w-full overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                {/* Construction Icon Animation */}
                <div className="relative">
                  <svg
                    className="h-24 w-24 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <div className="absolute -top-2 -right-2 h-6 w-6 animate-pulse rounded-full bg-rose-500/20 ring-4 ring-rose-500/30"></div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Documentary Coming Soon
                  </h3>
                  <p className="max-w-xs text-sm text-neutral-400">
                    We're crafting an exciting video showcase of our work and
                    vision
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="h-1 w-48 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className="h-full animate-[progress_2s_ease-in-out_infinite] rounded-full bg-rose-500"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(244, 63, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 63, 94, 0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
            </div>
            <p className="mt-3 text-center text-sm text-neutral-500">
              Documentary video coming soon - stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVideo;
