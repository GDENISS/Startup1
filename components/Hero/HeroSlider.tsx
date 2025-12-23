"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface HeroSliderProps {
  items: string[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ items }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const itemsWithClone = [...items, items[0]];

  useLayoutEffect(() => {
    setMounted(true);
    
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const itemHeight = slider.children[0].clientHeight;
      const totalItems = itemsWithClone.length;

      const tl = gsap.timeline({ repeat: -1 });

      for (let i = 0; i < totalItems - 1; i++) {
        tl.to(slider, {
          y: -(i + 1) * itemHeight,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 2,
        });
      }

      // Instant reset to 0
      tl.to(slider, {
        y: 0,
        duration: 0,
      });
    }, sliderRef);

    return () => ctx.revert();
  }, [itemsWithClone]);

  if (!mounted) {
    return (
      <div className="relative grid overflow-hidden text-5xl text-rose-600">
        <div className="py-2 whitespace-nowrap md:pl-2">
          {items[0]}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative grid overflow-hidden text-5xl text-rose-600"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      }}
    >
      {/* Invisible anchor - prevents layout shift */}
      <div
        className="pointer-events-none col-start-1 row-start-1 flex flex-col items-start opacity-0 md:items-center"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`col-start-1 row-start-1 py-2 whitespace-nowrap md:pl-2 ${
              i === 0 ? "relative" : "absolute"
            }`}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Animated slider */}
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 flex w-full flex-col items-start md:items-center"
      >
        {itemsWithClone.map((item, index) => (
          <div key={index} className="py-2 whitespace-nowrap md:pl-2">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
