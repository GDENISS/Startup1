import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team - Meet the People Behind Akoot.tech",
  description: "Meet the passionate team at Akoot.tech - experts in geospatial technology, software development, marketing, and business operations dedicated to building innovative solutions.",
  openGraph: {
    title: "Our Team - Akoot.tech",
    description: "Meet the talented team behind Akoot.tech's innovative geospatial solutions.",
    type: "website",
    url: "https://akoot.tech/team",
    images: [{ url: "/og-team.png", width: 1200, height: 630, alt: "Akoot.tech Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team - Akoot.tech",
    description: "Meet the passionate team building the future of geospatial technology.",
    images: ["/og-team.png"],
  },
  alternates: {
    canonical: "https://akoot.tech/team",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
