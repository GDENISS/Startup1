import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Founders - The Team Behind Akoot.tech",
  description: "Meet Dennis Githinji and Mike Kareu, Co-Founders of Akoot.tech. Geomatic Engineers from DeKUT passionate about building digital platforms that solve real problems.",
  openGraph: {
    title: "Meet Our Founders - Akoot.tech",
    description: "Meet the team behind Akoot.tech - Dennis Githinji and Mike Kareu.",
    url: "https://akoot.tech/founders",
    images: [{ url: "/og-founders.png", width: 1200, height: 630, alt: "Akoot.tech Founders" }],
  },
};

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

// 1. The Content Data
const foundersData = {
  githinji: `Dennis Githinji is a Co-Founder of Akoot.tech and a Geomatic Engineer from Dedan Kimathi University of Technology (DeKUT). Writing code since his first year, Dennis blends technical engineering with software development.

  His path to founding Akoot.tech began during a government internship where he watched valuable geospatial data sit unused in static reports. He realized that without intuitive tools, critical infrastructure data was useless to decision-makers. Driven by this gap, he co-founded Reli Light to build accessible, ML-powered software that allows local and national governments to visualize their challenges clearly and solve them efficiently.`,

  kareu: `Mike Kareu is a Co-Founder of Akoot.tech and a Geomatic Engineer from Dedan Kimathi University of Technology (DeKUT). An expert developer since his freshman year, Mike specializes in high-performance GIS architecture.

  His inspiration for the startup emerged while analyzing logistics for local businesses. He noticed that companies were bleeding resources simply because they couldn't leverage the spatial data that big tech companies take for granted. Refusing to accept this disparity, Mike co-founded Reli Light to engineer robust, scalable systems that democratize spatial intelligence, ensuring Kenyan businesses have the precise tools they need to thrive in a digital economy.`,
};

// 2. TypeScript Interfaces
interface TypewriterBlockProps {
  text: string;
}

// 3. The GSAP Typewriter Component
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
    <div ref={containerRef} className="leading-relaxed tracking-wide">
      {text.split(" ").map((word: string, index: number) => (
        <span key={index} className="typewriter-word mr-1 inline-block">
          {word}
        </span>
      ))}
    </div>
  );
};

// 4. The Main Component
const Founders = () => {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full cursor-pointer flex-col bg-black px-4 pt-16 text-slate-200">
      <div className="mx-auto w-full max-w-3xl flex-1 pb-8">
        <Tabs defaultValue="Githinji" className="w-full cursor-pointer">
          <TabsList className="grid h-[55px] w-full cursor-pointer grid-cols-2 bg-neutral-800">
            <TabsTrigger value="Githinji">Githinji</TabsTrigger>
            <TabsTrigger value="Kareu">Kareu</TabsTrigger>
          </TabsList>

          {/* Content: Dennis Githinji */}
          <TabsContent value="Githinji">
            <Card className="border-[0.5px] border-stone-700 bg-neutral-950/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="mb-2 font-serif text-2xl text-emerald-400 italic">
                  <div className="flex flex-row space-x-4">
                    <Image
                      src={"https://api.dicebear.com/9.x/avataaars-neutral/svg"}
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col space-y-2">
                      {" "}
                      <p>Dennis Githinji</p>
                      <p className="text-[14px] tracking-tight">
                        <span className="text-neutral-300">Location : </span>{" "}
                        Nairobi Kenya
                      </p>
                    </div>
                  </div>
                </CardTitle>
                {/* Applied text-[12px] (text-xs is essentially 12px in Tailwind) */}
                <CardDescription className="min-h-[200px] text-[12px] text-stone-300">
                  <TypewriterBlock text={foundersData.githinji} />
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Content: Mike Kareu */}
          <TabsContent value="Kareu">
            <Card className="border-[0.5px] border-stone-700 bg-neutral-950/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="mb-2 font-serif text-2xl text-blue-400 italic">
                  <div className="flex flex-row space-x-4">
                    <Image
                      src={"https://api.dicebear.com/9.x/big-ears-neutral/svg"}
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                    <div className="flex flex-col space-y-2">
                      {" "}
                      <p>Mike Kareu</p>
                      <p className="text-[14px] tracking-tight">
                        <span className="text-neutral-300">Location : </span>{" "}
                        Nairobi Kenya
                      </p>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription className="min-h-[200px] text-[12px] text-stone-300">
                  <TypewriterBlock text={foundersData.kareu} />
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Founders;
