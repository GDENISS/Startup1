import React from "react";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Team", href: "/team" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer className="w-full border-t border-neutral-800 bg-black py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-neutral-600">
            © 2025 Akoot.tech All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
