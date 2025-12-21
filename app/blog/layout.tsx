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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
