"use client";

import React, { useRef, useState } from "react";
import { menuItems } from "@/data/headerData";
import { gsap } from "gsap";
import Logo from "@/components/Logo/Logo";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!headerRef.current) return;

    if (!isMenuOpen) {
      // Open menu
      const tl = gsap.timeline();

      tl.to(headerRef.current, {
        width: window.innerWidth < 768 ? "95vw" : "90vw",
        maxWidth: window.innerWidth < 768 ? "95vw" : "90vw",
        duration: 0.8,
        ease: "power4.inOut",
      })
        .to(headerRef.current, {
          height: 400,
          duration: 0.7,
          ease: "power4.out",
          onComplete: () => {
            setIsMenuOpen(true);
          },
        })
        .fromTo(
          menuContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" },
          "-=0.3"
        );
    } else {
      // Close menu
      const tl = gsap.timeline();

      if (menuContentRef.current) {
        tl.to(menuContentRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power4.in",
        });
      }

      tl.to(
        headerRef.current,
        {
          height: window.innerWidth < 768 ? 40 : 48,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.2"
      ).to(headerRef.current, {
        width: window.innerWidth < 768 ? "calc(100vw - 1rem)" : "600px",
        maxWidth: window.innerWidth < 768 ? "95vw" : "600px",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          setIsMenuOpen(false);
        },
      });
    }
  };
  return (
    <div
      ref={headerRef}
      className="fixed top-2 left-1/2 z-100 mx-auto flex h-10 w-[calc(100vw-1rem)] max-w-[95vw] -translate-x-1/2 flex-col overflow-hidden border-b-[0.5px] border-neutral-500 bg-black px-1 md:top-4 md:z-50 md:h-12 md:w-[600px] md:max-w-[600px] md:px-2"
    >
      {/* Top Bar */}
      <div className="flex h-10 min-h-10 shrink-0 flex-row items-center justify-between ps-1 md:h-12 md:min-h-12 md:ps-2">
        {/* Menu */}
        <div
          onClick={toggleMenu}
          className="flex cursor-pointer flex-row items-center justify-between space-x-3"
        >
          <div className="flex h-5 w-5 flex-col items-center justify-center gap-1">
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            ></span>
          </div>
          <p className="text-[16px] font-extralight tracking-tight text-white">
            Menu
          </p>
        </div>

        {/* LOGO */}
        <Logo />

        {/* CTA */}
        <Link href="/contact">
          <div className="squircle-sm h-fill bg-primary w-fit px-2 py-2 cursor-pointer hover:bg-rose-700 transition-colors">
            <p className="text-primary-foreground text-[12px] font-medium tracking-wide">
              Contact Us
            </p>
          </div>
        </Link>
      </div>

      {isMenuOpen && (
        <div
          ref={menuContentRef}
          className="flex flex-1 flex-row gap-8 px-6 py-8"
        >
          <div className="flex-1">
            <p className="text-muted mb-4 text-xs tracking-wider uppercase">
              OUR PRODUCTS
            </p>
            <div className="flex flex-col gap-3">
              {menuItems.products.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-muted-light hover:text-accent flex items-center gap-2 text-lg font-extralight tracking-tight transition-colors"
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-rose-600 px-2 py-0.5 text-xs font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

{
  /* Explore Column
<div className="flex-1">
  <p className="text-muted mb-4 text-xs tracking-wider uppercase">
    EXPLORE
  </p>
  <div className="flex flex-col gap-3">
    {menuItems.explore.map((item, index) => (
      <a
        key={index}
        href={item.href}
        className="text-muted-light hover:text-accent text-lg font-extralight tracking-tight transition-colors"
      >
        {item.label}
      </a>
    ))}
  </div>
</div> */
}
