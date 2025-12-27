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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Track screen size for client-only logic
  const [isMobile, setIsMobile] = useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle dropdown toggle for mobile
  const handleDropdownToggle = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsDropdownOpen((prev) => !prev);
    }
  };


  const toggleMenu = () => {
    if (!headerRef.current) return;

    if (!isMenuOpen) {
      // Open menu
      const tl = gsap.timeline();
      const width = isMobile ? "95vw" : "90vw";
      const maxWidth = isMobile ? "95vw" : "90vw";
      tl.to(headerRef.current, {
        width,
        maxWidth,
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
      const height = isMobile ? 40 : 48;
      const width = isMobile ? "calc(100vw - 1rem)" : "600px";
      const maxWidth = isMobile ? "95vw" : "600px";
      tl.to(
        headerRef.current,
        {
          height,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.2"
      ).to(headerRef.current, {
        width,
        maxWidth,
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
            <div className="flex flex-col gap-3">
              {menuItems.products.filter(item => item.label !== "E-Rates").map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-muted-light hover:text-accent flex items-center gap-2 text-lg font-extralight tracking-tight transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className={`group relative${isDropdownOpen ? ' open' : ''}`}>
                <div
                  className="flex items-center gap-2 text-lg font-extralight tracking-tight cursor-pointer select-none"
                  onClick={handleDropdownToggle}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isDropdownOpen}
                >
                  OUR PRODUCTS
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div
                  className={`absolute left-0 mt-2 min-w-[140px] rounded bg-neutral-900 shadow-lg transition-all z-20 border border-neutral-700
                    ${isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}
                    group-hover:opacity-100 group-hover:translate-y-0
                  `}
                  style={{
                    display: (isMobile && !isDropdownOpen) ? 'none' : undefined
                  }}
                >
                  {menuItems.products.filter(item => item.label === "E-Rates").map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-muted-light hover:text-accent text-base font-extralight tracking-tight transition-colors whitespace-nowrap"
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 rounded-full bg-rose-600 px-2 py-0.5 text-xs font-medium text-white">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
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
