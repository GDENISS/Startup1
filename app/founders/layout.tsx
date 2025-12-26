import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Founders - The Team Behind Akoot.tech",
  description: "Meet Dennis Githinji and Mike Kareu, Co-Founders of Akoot.tech. Geomatic Engineers from DeKUT passionate about building digital platforms that solve real problems.",
  openGraph: {
    title: "Meet Our Founders - Akoot.tech",
    description: "Meet the team behind Akoot.tech - Dennis Githinji and Mike Kareu.",
    type: "website",
    url: "https://akoot.tech/founders",
    images: [{ url: "/og-founders.png", width: 1200, height: 630, alt: "Akoot.tech Founders" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Founders - Akoot.tech",
    description: "Meet Dennis Githinji and Mike Kareu, founders of Akoot.tech.",
    images: ["/og-founders.png"],
  },
  alternates: {
    canonical: "https://akoot.tech/founders",
  },
};

export default function FoundersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
