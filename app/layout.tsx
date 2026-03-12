// Import Next.js metadata type for SEO and page metadata
import type { Metadata } from "next";
// Import ReactNode type for children prop typing
import type { ReactNode } from "react";
// Import global CSS styles
import "./globals.css";
import PageTransition from "./components/PageTransition";
import Nav from "./components/Nav";
import EventNavProvider from "./components/EventNavProvider";
import {TEDSocialButton} from "./components/TedxNTUAsocials";


// Page metadata for SEO and browser tab display
export const metadata: Metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading",
};



// Define the layout component
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-blue-100 text-gray-900">
        <EventNavProvider>


          {/* Header */}
          <header className="bg-black text-white sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
              <a href="https://www.tedxntua.com/" aria-label="TEDxNTUA home">
                <img
                  src="/tedxntua_logo.png"
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
          {/* Changed col-2 to grid-cols-2 */}
            <div className="grid grid-cols-3"> 
              
              <section className="flex flex-col items-start ml-8 border-r border-white">
                <span className="font-bold text-2xl">
                  <span className="text-red-600">TEDx</span>
                  <span className="text-white">NTUA</span>
                </span>
                <div className="max-w-100">
                  This independent TEDx event is operated under license from TED 
                  and the auspices of ICCS. This website is our latest version : 2026
                </div>
                <div className="justify-end mt-8 max-w-70 text-xs">
                  ALL RIGHTS RESERVED © 2026
                </div>
              </section>


              <section className="flex flex-col items-center mr-8 border-r border-white">
                <div>
                  
                </div>
              </section>


              <section className="flex flex-col items-center border-r border-white">
                <div className="justify-end mb-2 max-w-70 text-xl">
                  Stay tuned:
                </div>
                <section className="flex flex-row gap-3 bg-auto">
                  <div className="transition-transform duration-300 hover:-translate-y-2">
                    <TEDSocialButton name='youtube' size='45px' color='color' colorHover='yellow' />
                  </div>
                  <div className="transition-transform duration-300 hover:-translate-y-2">
                    <TEDSocialButton name='instagram' size='45px' color='color' colorHover='yellow' />
                  </div>
                  <div className="transition-transform duration-300 hover:-translate-y-2">
                    <TEDSocialButton name='linkedIn' size='45px' color='color' colorHover='yellow' />
                  </div>
                  <div className="transition-transform duration-300 hover:-translate-y-2">
                    <TEDSocialButton name='tiktok' size='45px' color='color' colorHover='yellow' />
                  </div>
                  <div className="transition-transform duration-300 hover:-translate-y-2">
                    <TEDSocialButton name='facebook' size='45px' color='color' colorHover='yellow' />
                  </div>
                  
                </section>
                <div className="justify-end mt-3 max-w-70 text-xl text-center">
                  Contact us:
                    <div className="max-w-100 text-sm">
                      tedxntua.developers@gmail.com
                    </div>
                </div>
              </section>

              

            </div>
          </footer>

        </EventNavProvider>
      </body>
    </html>
  );
}