import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lentroph",
  description: "Connecting organizations for a better tomorrow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          "light  text-foreground bg-background",
        )}
      >
        <NextTopLoader />
        <Providers>
          <main>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
