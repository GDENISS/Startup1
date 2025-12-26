import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Insights & Updates from Akoot.tech",
  description: "Explore articles on technology, development, design, and digital solutions from the Akoot.tech team. Stay updated with the latest in web development, GIS, and software engineering.",
  keywords: ["tech blog", "software development blog", "web development articles", "programming tutorials", "Kenya tech news", "GIS articles", "Next.js tutorials"],
  openGraph: {
    title: "Akoot.tech Blog - Tech Insights & Updates",
    description: "Explore our latest articles on technology, development, and digital solutions.",
    type: "website",
    url: "https://akoot.tech/blog",
    images: [{ url: "/og-blog.png", width: 1200, height: 630, alt: "Akoot.tech Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akoot.tech Blog - Tech Insights & Updates",
    description: "Explore our latest articles on technology, development, and digital solutions.",
    images: ["/og-blog.png"],
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
