"use client";

import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";

const teamMembers = [
  {
    name: "Dennis",
    role: "Co-Founder",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg",
    bio: "Dennis is a Co-Founder of Akoot.tech and a Geomatic Engineer with a passion for transforming geospatial data into actionable insights. Writing code since his first year of university, Dennis blends technical engineering expertise with innovative software development. His journey to founding Akoot.tech began during a government internship where he witnessed valuable geospatial data sitting unused in static reports. Recognizing that without intuitive tools, critical infrastructure data remained inaccessible to decision-makers, he was driven to bridge this gap. Dennis co-founded Akoot.tech to build accessible, ML-powered software that empowers local and national governments to visualize their challenges clearly and solve them efficiently.",
    initialX: 30,
    initialY: 50,
  },
  {
    name: "Mike",
    role: "Co-Founder",
    avatar: "https://api.dicebear.com/9.x/big-ears-neutral/svg",
    bio: "Mike is a Co-Founder of Akoot.tech and a Geomatic Engineer specializing in high-performance GIS architecture. An expert developer with years of hands-on experience, Mike's technical prowess drives the robust systems behind Akoot.tech. His inspiration for the startup emerged while analyzing logistics for local businesses, where he noticed companies losing resources simply because they couldn't leverage the spatial data that big tech companies take for granted. Refusing to accept this disparity, Mike co-founded Akoot.tech to engineer scalable, intelligent systems that democratize spatial intelligence, ensuring Kenyan businesses and organizations have the precise tools they need to thrive in today's digital economy.",
    initialX: 70,
    initialY: 50,
  },
  {
    name: "Lucie",
    role: "Head of Marketing",
    avatar: "https://api.dicebear.com/9.x/big-ears-neutral/svg?seed=Lucie",
    bio: "Lucie is a seasoned geospatial expert and strategic marketer at Akoot.tech, bringing a unique blend of technical knowledge and business acumen to the team. With extensive experience in geospatial analysis and data visualization, Lucie understands both the technical capabilities and market needs of modern GIS solutions. She leverages her deep understanding of spatial technologies to communicate Akoot.tech's value proposition to clients, translating complex geospatial concepts into compelling narratives that resonate with businesses, governments, and developers.",
    initialX: 25,
    initialY: 30,
  },
  {
    name: "Polly",
    role: "GIS Developer",
    avatar: "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Polly",
    bio: "Polly is a seasoned GIS developer at Akoot.tech with deep expertise in building sophisticated geospatial applications and data processing pipelines. Her technical proficiency spans the full spectrum of GIS development, from spatial database design and optimization to creating interactive mapping interfaces and implementing complex spatial algorithms. Polly's passion for solving real-world problems through technology drives her to continuously explore cutting-edge GIS frameworks and geospatial analysis techniques.",
    initialX: 50,
    initialY: 30,
  },
  {
    name: "Alan",
    role: "Finance Manager",
    avatar: "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Alan",
    bio: "Alan serves as the Finance Manager and Operations Lead at Akoot.tech, bringing financial discipline and operational excellence to the organization. As the company's accountant and handler, Alan ensures that Akoot.tech maintains healthy cash flow, accurate financial reporting, and strategic resource allocation. His meticulous approach to financial management and operations enables the technical team to focus on innovation while he handles the critical backend functions that keep the business running smoothly.",
    initialX: 75,
    initialY: 30,
  }
];

interface TypewriterBlockProps {
  text: string;
}

const TypewriterBlock: React.FC<TypewriterBlockProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".typewriter-word",
        {
          opacity: 0,
          y: 5,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.1,
          stagger: 0.02,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={containerRef} className="leading-relaxed tracking-wide font-[family-name:var(--font-roboto-flex)]">
      {text.split(" ").map((word: string, index: number) => (
        <span key={index} className="typewriter-word mr-1 inline-block">
          {word}
        </span>
      ))}
    </div>
  );
};

const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);


  return (
    <>

      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 px-4 py-16">
          {/* Consistent Header with Logical Statement */}
          <div className="mb-12 md:mb-16 flex flex-col items-start">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              Teamwork • Innovation • Impact
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl font-[family-name:var(--font-geist-sans)]">
              Our Team
            </h1>
            <p className="mt-4 text-neutral-400 max-w-xl font-[family-name:var(--font-roboto-flex)]">
              Meet the people behind Akoot.tech
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => setSelectedMember(index)}
                className="group flex flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 shadow-md transition-all duration-300 hover:scale-105 hover:border-rose-600 hover:shadow-rose-600/20 focus:outline-none focus:ring-2 focus:ring-rose-600"
                style={{ animation: `fadeIn 0.7s ${index * 0.1}s both` }}
              >
                <div className="relative mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-rose-600/30 group-hover:border-rose-600 transition-all"
                  />
                </div>
                <p className="font-[family-name:var(--font-geist-sans)] text-lg font-bold text-neutral-200 mb-1">
                  {member.name}
                </p>
                <p className="font-[family-name:var(--font-roboto-flex)] text-sm text-neutral-500 mb-2">
                  {member.role}
                </p>
                <span className="text-xs text-neutral-400 text-center line-clamp-3">
                  {member.bio.split(" ").slice(0, 18).join(" ")}...
                </span>
              </button>
            ))}
          </div>

          {/* Vision Statement */}
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-8 text-center backdrop-blur-sm md:p-12">
              <h2 className="mb-4 font-[family-name:var(--font-geist-sans)] text-2xl font-bold text-neutral-200 md:text-3xl">
                Our Vision
              </h2>
              <p className="font-[family-name:var(--font-roboto-flex)] text-base leading-relaxed text-neutral-400 md:text-lg">
                At Akoot.tech, we believe that powerful geospatial technology should be accessible to everyone. 
                Our team combines deep technical expertise with a genuine commitment to solving real-world problems. 
                From infrastructure planning to business logistics, we're building tools that democratize spatial intelligence 
                and empower organizations across Africa to make data-driven decisions with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Modal for Selected Member */}
        {selectedMember !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute right-4 top-4 rounded-lg p-2 text-neutral-500 transition hover:bg-neutral-900 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex items-center gap-4">
                <Image
                  src={teamMembers[selectedMember].avatar}
                  alt={teamMembers[selectedMember].name}
                  width={100}
                  height={100}
                  className="rounded-full border-2 border-rose-600/30"
                />
                <div>
                  <h2 className="font-[family-name:var(--font-geist-sans)] text-3xl font-bold text-rose-400">
                    {teamMembers[selectedMember].name}
                  </h2>
                  <p className="font-[family-name:var(--font-roboto-flex)] text-lg text-neutral-400">
                    {teamMembers[selectedMember].role}
                  </p>
                </div>
              </div>

              <div className="font-[family-name:var(--font-roboto-flex)] text-sm text-neutral-400">
                <TypewriterBlock text={teamMembers[selectedMember].bio} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TeamPage;
