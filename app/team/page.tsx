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
  const [positions, setPositions] = useState(teamMembers.map(m => ({ x: m.initialX, y: m.initialY })));
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [lastDispersedTime, setLastDispersedTime] = useState(0);
  const [isDispersing, setIsDispersing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (selectedMember !== null) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      
      setPositions(prev => prev.map((pos, idx) => {
        // Center point for clustering
        const centerX = 50;
        const centerY = 45;
        
        // Calculate distance from mouse
        const distFromMouse = Math.sqrt(
          Math.pow(pos.x - mousePos.x, 2) + Math.pow(pos.y - mousePos.y, 2)
        );
        
        let targetX, targetY;
        
        // If mouse is close, disperse
        if (distFromMouse < 20) {
          setIsDispersing(true);
          setLastDispersedTime(currentTime);
          const angle = Math.atan2(pos.y - mousePos.y, pos.x - mousePos.x);
          const disperseForce = 2;
          targetX = pos.x + Math.cos(angle) * disperseForce;
          targetY = pos.y + Math.sin(angle) * disperseForce;
        } else {
          // Check if 3 seconds have passed since last dispersion
          const timeSinceDisperse = currentTime - lastDispersedTime;
          
          if (isDispersing && timeSinceDisperse < 3000) {
            // Hold position during delay
            targetX = pos.x;
            targetY = pos.y;
          } else {
            // Resume water-like circular motion
            if (isDispersing) setIsDispersing(false);
            const time = Date.now() * 0.0002; // Slower motion
            const angle = time + (idx * Math.PI * 2 / teamMembers.length);
            const radius = 8 + Math.sin(time * 0.5 + idx) * 3; // Wave-like radius variation
            targetX = centerX + Math.cos(angle) * radius;
            targetY = centerY + Math.sin(angle) * radius;
          }
        }
        
        // Apply boundaries (keep within 20-80% range)
        targetX = Math.max(20, Math.min(80, targetX));
        targetY = Math.max(20, Math.min(70, targetY));
        
        // Smooth water-like movement
        const smoothing = 0.05; // Much slower, more fluid
        return {
          x: pos.x + (targetX - pos.x) * smoothing,
          y: pos.y + (targetY - pos.y) * smoothing,
        };
      }));
    }, 40); // Slightly longer interval for smoother motion

    return () => clearInterval(interval);
  }, [selectedMember, mousePos, lastDispersedTime, isDispersing]);

  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-2 font-[family-name:var(--font-geist-sans)] text-4xl font-bold text-neutral-300 md:text-5xl">
              Our Team
            </h1>
            <p className="font-[family-name:var(--font-roboto-flex)] text-neutral-500">
              Hover to interact • Click to learn more
            </p>
          </div>

          {/* Floating Team Members */}
          <div ref={containerRef} className="relative h-[400px]">
            {teamMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => setSelectedMember(index)}
                className="absolute transition-transform hover:scale-110"
                style={{
                  left: `${positions[index].x}%`,
                  top: `${positions[index].y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="group relative">
                  <div className="rounded-full border-2 border-rose-600/30 bg-neutral-950 p-1 transition-all hover:border-rose-600 hover:shadow-lg hover:shadow-rose-600/20">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="font-[family-name:var(--font-geist-sans)] text-sm font-medium text-neutral-300">
                      {member.name}
                    </p>
                    <p className="font-[family-name:var(--font-roboto-flex)] text-xs text-neutral-600">
                      {member.role}
                    </p>
                  </div>
                </div>
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
