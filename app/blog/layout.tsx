import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Akoot.tech",
  description: "Thoughts on technology, development, and building better software. Insights and updates from the Akoot.tech team.",
  openGraph: {
    title: "Blog | Akoot.tech",
    description: "Insights on technology, development, and building better software.",
    type: "website",
  },
};
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog - Latest Insights & Updates",
  description: "Thoughts on technology, development, and building better software. Stay updated with the latest trends in web development, mobile apps, and GIS solutions.",
  keywords: ["tech blog", "software development blog", "web development articles", "programming tutorials", "Kenya tech news"],
  openGraph: {
    title: "Blog - Akoot.tech",
    description: "Thoughts on technology, development, and building better software.",
    type: "website",
    url: "https://akoot.tech/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Akoot.tech",
    description: "Thoughts on technology, development, and building better software.",
  },
  alternates: {
    canonical: "https://akoot.tech/blog",
  },
};
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
