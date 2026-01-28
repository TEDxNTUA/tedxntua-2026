// Import Next.js metadata type for SEO and page metadata
import type { Metadata } from "next";
// Import ReactNode type for children prop typing
import type { ReactNode } from "react";
// Import global CSS styles
import "./globals.css";
// Import the Link component from next/link
import Link from "next/link";

// Page metadata for SEO and browser tab display
export const metadata: Metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading",
};



// Define the layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-blue-100 text-gray-900">
        {/* Header */}
        <header className="bg-black-900 text-white py-4 h-30">
          <div className="relative top-4 left-30">
            <Link href="https://www.tedxntua.com/">
            <img
              src="/tedxntua-logo.png"
              alt="TEDxNTUA official logo"
              className="w-66 h-15 transition-transform duration-300 hover:scale-120"
            />
            </Link>
          </div>
        </header>

        {/* Main Content */}
       <main>
        <div className="w-full h-screen bg-red-200"/>
       </main>
        {/* Footer */}
        <footer className="bg-black text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2026 TEDxNTUA. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}