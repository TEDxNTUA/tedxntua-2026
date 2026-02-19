// Import Next.js metadata type for SEO and page metadata
import type { Metadata } from "next";
// Import ReactNode type for children prop typing
import type { ReactNode } from "react";
// Import global CSS styles
import "./globals.css";
import PageTransition from "./components/PageTransition";
import Nav from "./components/Nav";
import EventNavProvider from "./components/EventNavProvider";


// Page metadata for SEO and browser tab display
export const metadata: Metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading",
};



// Define the layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="site-shell bg-blue-100 text-gray-900">
        <EventNavProvider>
          <Nav />

          {/* Main Content */}
         <main className="site-main">
          <PageTransition>{children}</PageTransition>
         </main>
          {/* Footer */}
          <footer className="site-footer bg-black text-white py-4">
            <div className="container mx-auto px-4 text-center">
              <p className="text-base sm:text-lg">© 2026 TEDxNTUA. All rights reserved.</p>
            </div>
          </footer>
        </EventNavProvider>
      </body>
    </html>
  );
}
