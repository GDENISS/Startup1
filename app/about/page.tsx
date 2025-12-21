"use client";

import React from "react";
import Footer from "@/components/Footer/Footer";

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              About Us
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Building Solutions That Matter
            </h1>
            <p className="mt-4 text-lg text-neutral-400">
              Transforming ideas into powerful digital platforms.
            </p>
          </div>

          {/* Story Section */}
          <div className="space-y-8">
            <div className="border-l-2 border-rose-600 pl-6">
              <h2 className="mb-4 text-2xl font-bold text-white">Our Story</h2>
              <p className="text-neutral-400 leading-relaxed">
                Akoot.tech was born from a simple observation: valuable data and 
                innovative ideas often remain trapped, unable to reach their full 
                potential. As Geomatic Engineers from Dedan Kimathi University of 
                Technology, we witnessed firsthand how critical information sat 
                unused in static reports while decision-makers struggled without 
                the tools they needed.
              </p>
            </div>

            <div className="border-l-2 border-rose-600 pl-6">
              <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
              <p className="text-neutral-400 leading-relaxed">
                We craft intuitive digital platforms that solve everyday problems 
                for startups, businesses, and government agencies. Our expertise 
                spans web applications, mobile solutions, GIS systems, and custom 
                software—all built with precision and purpose.
              </p>
            </div>

            <div className="border-l-2 border-rose-600 pl-6">
              <h2 className="mb-4 text-2xl font-bold text-white">What We Do</h2>
              <div className="space-y-4 text-neutral-400">
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Web & Mobile Development
                  </h3>
                  <p className="leading-relaxed">
                    Modern, responsive applications built with cutting-edge 
                    technologies like Next.js, React, and mobile frameworks.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    GIS Solutions
                  </h3>
                  <p className="leading-relaxed">
                    Powerful geospatial platforms that turn complex spatial data 
                    into actionable insights for businesses and governments.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Custom Software
                  </h3>
                  <p className="leading-relaxed">
                    Tailored solutions using Python, Golang, and modern tech stacks 
                    designed specifically for your unique challenges.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-white">
                    Machine Learning
                  </h3>
                  <p className="leading-relaxed">
                    ML-powered tools that help organizations visualize problems 
                    clearly and solve them efficiently.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-2 border-rose-600 pl-6">
              <h2 className="mb-4 text-2xl font-bold text-white">Our Approach</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                We believe in building upward from here. Every project starts with 
                understanding the real problem, not just the surface symptoms. We 
                combine technical excellence with practical thinking to create 
                solutions that are:
              </p>
              <ul className="space-y-2 text-neutral-400">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span><strong className="text-white">Intuitive</strong> — Built for real people, not just developers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span><strong className="text-white">Scalable</strong> — Ready to grow with your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span><strong className="text-white">Reliable</strong> — Tested, secure, and built to last</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span><strong className="text-white">Accessible</strong> — Democratizing technology for all</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 border-t border-neutral-800 pt-12 text-center">
            <h3 className="text-2xl font-bold text-white">
              Ready to Build Something Great?
            </h3>
            <p className="mt-4 text-neutral-400">
              Let's discuss how we can help bring your vision to life.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-rose-600 px-8 py-3 font-medium text-white transition-colors hover:bg-rose-700"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
