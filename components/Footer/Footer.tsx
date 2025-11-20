import React from "react";

const Footer = () => {
  const footerLinks = [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Founders", href: "#" },
    { label: "Terms", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-neutral-800 bg-black py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-neutral-600">
            © 2025 Reli Light. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
