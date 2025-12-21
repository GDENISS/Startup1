import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Founders | Akoot.tech",
  description: "Meet the founders of Akoot.tech - Dennis Githinji and Mike Kareu, Geomatic Engineers passionate about building accessible technology solutions.",
  openGraph: {
    title: "Our Founders | Akoot.tech",
    description: "Meet the team behind Akoot.tech and learn about our journey.",
    type: "website",
  },
};

export default function FoundersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
