import React from "react";
import HeroSlider from "./HeroSlider";
import Image from "next/image";
import Link from "next/link";

const HeroItems = ["Solutions", "Designs", "Software", "Platforms"];
const Stack = ["GIS", "Python", "Golang", ""];

const Hero = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center space-y-4 px-4 py-6 pb-2 md:space-y-6 md:px-4 md:py-4">
      {/* Hero Slider */}
      <div className="flex w-full flex-col items-start justify-center font-extralight tracking-tight md:items-center">
        <div className="mx-0 flex w-full flex-col items-start text-3xl leading-tight md:flex-row md:items-center md:space-x-1 md:text-5xl md:leading-normal">
          <span className="z-10 text-4xl text-neutral-300 md:text-5xl">
            Crafting
          </span>
          <HeroSlider items={HeroItems} />
        </div>

        <div className="text-muted-foreground mt-2 flex w-full flex-col items-start md:flex-row md:items-center md:space-x-4">
          <span className="font-serif text-2xl leading-tight italic opacity-50 md:text-3xl md:leading-normal lg:text-5xl">
            for
          </span>
          <span className="text-3xl leading-tight font-extralight tracking-tight opacity-70 md:text-5xl md:leading-normal">
            everyday problems
          </span>
        </div>
      </div>

      {/* slogan */}
      <div className="w-full">
        <p className="text-[14px] tracking-tight text-neutral-500 md:text-[16px]">
          We engineer intuitive digital platforms that seamlessly connect
          organizations to their customers. From local startups to government
          agencies, we build the software that drives real-world growth.
        </p>
        <p className="text-sm tracking-tight text-neutral-500 md:text-[16px]">
          Smart systems for real problems. Building upward from here
        </p>
      </div>

      <div className="flex w-full flex-row gap-4 md:gap-8">
        <Link href="/e-rates">
          <div className="flex h-10 w-fit cursor-pointer items-center justify-center bg-rose-600 px-6 py-2 transition-colors hover:bg-rose-700 md:px-8">
            <p className="text-sm font-medium text-neutral-50 md:text-base">Get Started</p>
          </div>
        </Link>
        <Link href="/contact">
          <div className="flex h-10 w-fit cursor-pointer items-center justify-center border-b-[0.5px] border-neutral-600 px-4 py-2 transition-colors hover:border-rose-600 md:px-6">
            <p className="text-sm font-medium text-neutral-50 md:text-base">Contact us</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
