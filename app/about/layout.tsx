import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Akoot.tech",
  description: "Learn about Akoot.tech - Building intuitive digital platforms that solve everyday problems for startups, businesses, and government agencies.",
  openGraph: {
    title: "About Us | Akoot.tech",
    description: "Transforming ideas into powerful digital platforms. Building solutions that matter.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
