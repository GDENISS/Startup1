import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers",
  description: "Build with powerful APIs, GIS tools, and AI-powered geospatial solutions from Akoot.tech",
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
