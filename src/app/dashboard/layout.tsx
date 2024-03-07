import { DashboardNavbar } from "@/components/dashboard/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lentroph | Dashboard",
  description: "Connecting organizations for a better tomorrow.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-gray-200 min-h-screen">
      <DashboardNavbar />
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
