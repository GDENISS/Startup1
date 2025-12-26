import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akoot.tech | Building Digital Platforms That Solve Real Problems",
  description: "Akoot.tech crafts intuitive digital platforms including web applications, mobile solutions, GIS systems, and custom software for startups, businesses, and government agencies in Kenya and beyond.",
  openGraph: {
    title: "Akoot.tech | Building Digital Platforms That Solve Real Problems",
    description: "Crafting intuitive digital platforms for everyday problems. Smart systems for real challenges.",
    url: "https://akoot.tech",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Akoot.tech - Building Digital Platforms" }],
  },
};

import Hero from "@/components/Hero/Hero";
import Stack from "@/components/Stack/Stack";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <div className="relative grid h-[600px] w-full grid-cols-1 md:h-screen md:grid-cols-3">
        <div className="absolute inset-0 z-0">
          <Image
            src="/HomeWork.png"
            alt="Sample work showcase"
            fill
            className="object-cover object-center md:object-right"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/95 to-black/40 md:from-black md:via-black/80 md:to-black/10"></div>
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/60 md:from-black/60 md:via-transparent md:to-black/30"></div>
          <div className="absolute top-0 right-0 left-0 h-20 bg-linear-to-b from-black/95 to-transparent md:h-24 md:from-black/80"></div>
          <div className="absolute top-0 bottom-0 left-0 w-full bg-linear-to-r from-black/80 via-black/60 to-black/20 md:w-3/4 md:from-black/60 md:via-black/40 md:to-transparent"></div>
          <div className="absolute top-16 bottom-16 left-0 w-full bg-linear-to-r from-black/60 via-black/30 to-transparent md:w-2/3 md:from-black/50 md:via-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-transparent opacity-[0.08]"></div>
        </div>

        <div className="relative z-10 col-span-1 flex items-center justify-center px-2 py-8 md:col-span-2 md:px-0 md:py-0">
          <Hero />
        </div>

        <div className="relative z-10 hidden md:block"></div>
      </div>

      <div className="border-border min-h-40 border-t bg-black text-neutral-400">
        <div className="mx-auto max-w-7xl px-0 py-8 md:px-6">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
            <div className="w-full px-4 md:px-0 lg:w-1/3">
              <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                What We Do
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                Crafting platforms for everyday problems.
              </h3>
              <p className="text-muted-foreground mt-4">
                Smart systems for real problems. Building upward from here.
              </p>
            </div>
            <div className="w-full lg:w-2/3">
              <Stack />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
