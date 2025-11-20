import Link from "next/link";
import React from "react";

const RailTrackIcon = () => (
  <svg
    width="24"
    height="14"
    viewBox="0 0 24 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80"
    aria-hidden="true"
  >
    {/* Top Rail */}
    <path
      d="M0 3H24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Bottom Rail */}
    <path
      d="M0 11H24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Sleepers (The wooden planks) */}
    <path
      d="M4 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M12 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <path
      d="M20 3V11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>
);

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Link href={"/"}>
        <h1 className="text-muted-light flex items-center gap-2 text-[16px] font-medium">
          <span className="font-serif italic opacity-80">Reli</span>

          <div className="text-muted-light flex items-center px-1 opacity-60">
            <RailTrackIcon />
          </div>

          <span className="font-serif italic opacity-80">Light</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
