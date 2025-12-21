import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoImage from "@/public/akkkoot.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Link href={"/"}>
        <Image 
          src={LogoImage} 
          alt="Akoot.tech Logo" 
          height={32}
          className="h-8 w-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
