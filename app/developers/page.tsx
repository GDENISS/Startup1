"use client";

import React from "react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Rocket, Code2, Map, Cpu, ArrowRight } from "lucide-react";

const DevelopersPage = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center">
          {/* Coming Soon Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-600/20 bg-rose-600/5 px-4 py-2 text-sm text-rose-400">
            <Rocket className="h-4 w-4" />
            Coming Soon
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 text-5xl font-bold text-white md:text-7xl">
            Developers Portal
          </h1>
          
          <p className="mb-12 max-w-2xl text-xl text-neutral-400">
            Build with powerful APIs, GIS tools, and AI-powered geospatial solutions
          </p>

          {/* Feature Pills */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300">
              <Code2 className="h-4 w-4 text-rose-500" />
              RESTful API
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300">
              <Map className="h-4 w-4 text-blue-500" />
              GIS Development
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300">
              <Cpu className="h-4 w-4 text-green-500" />
              GeoFM AI Models
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
          >
            Request Early Access
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DevelopersPage;
