// Import Next.js metadata type for SEO and page metadata
import type { Metadata } from "next";
// Import ReactNode type for children prop typing
import type { ReactNode } from "react";
// Import Google Fonts (Geist and Geist Mono) for typography
import { Geist, Geist_Mono } from "next/font/google";
// Import global CSS styles
import "./globals.css";

// Configure Geist Sans font with CSS variable for use throughout the app
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font with CSS variable for monospace text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Page metadata for SEO and browser tab display
export const metadata: Metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading",
};

// Root layout component that wraps all pages in the app
// This is the top-level component that defines the HTML structure
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font variables and antialiasing to the body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Render child pages/components */}
        {children}
      </body>
    </html>
  );
}
