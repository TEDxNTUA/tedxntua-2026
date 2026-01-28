// Import Next.js metadata type for SEO and page metadata
import type { Metadata } from "next";
// Import ReactNode type for children prop typing
import type { ReactNode } from "react";
// Import global CSS styles
import "./globals.css";
import PageTransition from "./components/PageTransition";
import Nav from "./components/Nav";


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
        <header className="bg-black text-white sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <a href="https://www.tedxntua.com/" aria-label="TEDxNTUA home">
              <img
                src="/tedxntua-logo.png"
                alt="TEDxNTUA official logo"
                className="w-32 sm:w-40 md:w-48 h-auto transition-transform duration-300 hover:scale-110"
              />
            </a>

            <Nav />
          </div>
        </header>

        {/* Main Content */}
       <main>
        <PageTransition>{children}</PageTransition>
       </main>
        {/* Footer */}
        <footer className="bg-black text-white bottom-80 py-4">
          <div className="container mx-auto text-center">
            <p className="text-lg">© 2026 TEDxNTUA. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}