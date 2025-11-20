import Image from "next/image";
import React from "react";

const stackItems = [
  {
    name: "Golang",
    logo: "/GoLang.png",
    description:
      "Building high-performance backends and microservices that connect organizations with lightning-fast response times.",
    isDark: false,
  },
  {
    name: "AI Agents",
    logo: "https://api.dicebear.com/9.x/bottts/svg",
    description:
      "Building intelligent AI agents that automate workflows, enhance decision-making, and transform how businesses operate.",
    isDark: false,
  },
  {
    name: "Python",
    logo: "/pythonLogo.svg",
    description:
      "Developing intelligent data processing systems and automation tools that bridge complex workflows seamlessly.",
    isDark: false,
  },
  {
    name: "React Native",
    logo: "/ReactNative.png",
    description:
      "Creating cross-platform mobile solutions that bring digital services directly to users' hands efficiently.",
    isDark: false,
  },
  {
    name: "Next.js",
    logo: "/next.svg",
    description:
      "Crafting modern web applications that serve as digital bridges between organizations and their audiences.",
    isDark: true,
  },
];

const Stack = () => {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Feathered  */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-linear-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-linear-to-l from-[#0a0a0a] to-transparent" />

      <div className="animate-scroll flex space-x-4">
        {stackItems.map((item, index) => (
          <div
            key={`first-${index}`}
            className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-between bg-neutral-900/40 p-4"
          >
            <div className="flex h-20 w-20 items-center justify-center">
              <Image
                src={item.logo}
                alt={`${item.name}-Logo`}
                width={64}
                height={64}
                className={`object-contain ${item.isDark ? "brightness-200 contrast-150" : ""}`}
              />
            </div>
            <div className="flex flex-1 items-center">
              <p className="text-center text-xs leading-relaxed tracking-wide text-white/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {/* loop */}
        {stackItems.map((item, index) => (
          <div
            key={`second-${index}`}
            className="flex h-[200px] w-[200px] shrink-0 flex-col items-center justify-between bg-neutral-900/40 p-4"
          >
            <div className="flex h-20 w-20 items-center justify-center">
              <Image
                src={item.logo}
                alt={`${item.name}-Logo`}
                width={64}
                height={64}
                className={`object-contain ${item.isDark ? "brightness-200 contrast-150" : ""}`}
              />
            </div>
            <div className="flex flex-1 items-center">
              <p className="text-center text-xs leading-relaxed tracking-wide text-white/90">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Stack;

// import React from "react";

// const stackItems = [
//   { name: "Python", color: "#3776AB" },
//   { name: "Golang", color: "#00ADD8" },
//   { name: "React Native", color: "#61DAFB" },
//   { name: "NextJS", color: "#000000" },
//   { name: "React", color: "#61DAFB" },
//   { name: "TypeScript", color: "#3178C6" },
//   { name: "TailwindCSS", color: "#06B6D4" },
//   { name: "PostgreSQL", color: "#4169E1" },
// ];

// const Stack = () => {
//   return (
//     <div className="relative w-full overflow-hidden py-8">
//       {/* Feathered edges */}
//       <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-black to-transparent" />
//       <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-black to-transparent" />

//       {/* Infinite scroll container */}
//       <div className="animate-scroll flex">
//         {/* First set */}
//         {stackItems.map((item, index) => (
//           <div
//             key={`first-${index}`}
//             className="mx-6 flex w-fit flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20 hover:bg-white/10"
//           >
//             <div
//               className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
//               style={{
//                 background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
//                 border: `2px solid ${item.color}60`,
//               }}
//             >
//               {item.name.charAt(0)}
//             </div>
//             <span className="text-sm font-medium text-white/90">
//               {item.name}
//             </span>
//           </div>
//         ))}
//         {/* Duplicate set for seamless loop */}
//         {stackItems.map((item, index) => (
//           <div
//             key={`second-${index}`}
//             className="mx-6 flex min-w-[180px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20 hover:bg-white/10"
//           >
//             <div
//               className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
//               style={{
//                 background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`,
//                 border: `2px solid ${item.color}60`,
//               }}
//             >
//               {item.name.charAt(0)}
//             </div>
//             <span className="text-sm font-medium text-white/90">
//               {item.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .animate-scroll {
//           animation: scroll 20s linear infinite;
//         }

//         .animate-scroll:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Stack;
