import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog Post - Admin",
  robots: "noindex, nofollow",
};

export default function CreateBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
