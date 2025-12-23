import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Akoot.tech",
  description: "Learn about Akoot.tech - Building intuitive digital platforms that solve everyday problems for startups, businesses, and government agencies in Kenya and beyond.",
  keywords: ["about akoot.tech", "software company Kenya", "tech startup Nairobi", "web development team", "GIS solutions provider"],
  openGraph: {
    title: "About Us | Akoot.tech",
    description: "Transforming ideas into powerful digital platforms. Building solutions that matter.",
    type: "website",
    url: "https://akoot.tech/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Akoot.tech",
    description: "Learn about our mission and team",
  },
  alternates: {
    canonical: "https://akoot.tech/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
