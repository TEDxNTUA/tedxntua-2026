// Import global CSS styles
import "./globals.css";

import PageTransition from "./components/PageTransition";
import Nav from "./components/Nav";
import EventNavProvider from "./components/EventNavProvider";
import { TEDSocialButton } from "./components/TedxNTUAsocials";
import FooterContactPanel from "./components/FooterContactPanel";
import CycleZeroMark from "./components/CycleZeroMark";


// Page metadata for SEO and browser tab display
export const metadata = {
  title: "TEDxNTUA 2026",
  description: "TEDxNTUA 2026 - Ideas Worth Spreading"
};



// Define the layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="site-shell bg-blue-100 text-gray-900">
        <EventNavProvider>
          <header className="sticky top-0 z-40 overflow-visible border-b border-white/8 bg-transparent text-white max-h-[120px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_100%)]" />
            <div className="pointer-events-none absolute left-[-2rem] top-[-3.5rem] h-40 w-40 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute left-[2.5rem] top-[-5rem] h-56 w-56 rounded-full border border-white/8" />
            <div className="pointer-events-none absolute right-[-3rem] top-[-4rem] h-48 w-48 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute right-[2rem] top-[-5.5rem] h-64 w-64 rounded-full border border-white/8" />

            <div className="container relative mx-auto min-h-[128px] px-4 py-3 sm:min-h-[144px] sm:px-6 sm:py-4">
              <div className="grid items-start gap-4 lg:grid-cols-[minmax(260px,1fr)_auto_minmax(260px,1fr)] lg:gap-6">
                <div className="flex justify-start">
                  <a
                    href="https://www.tedxntua.com/"
                    aria-label="TEDxNTUA home"
                    className="group relative inline-flex min-h-[76px] items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.05] sm:gap-5 sm:px-5"
                  >
                    <div className="pointer-events-none absolute left-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-white/8 sm:h-28 sm:w-28" />
                    <div className="pointer-events-none absolute left-9 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border border-white/10 sm:h-16 sm:w-16" />
                    <div className="relative flex flex-wrap items-end gap-x-2 gap-y-2 leading-none sm:gap-x-3">
                      <span className="shrink-0">
                        <span className="text-1xl font-bold text-red-600 sm:text-2xl">TEDx</span>
                        <span className="text-1xl font-bold text-white sm:text-2xl">NTUA</span>
                      </span>
                    </div>
                    <img
                      src="/archive.png"
                      alt="Archive"
                      className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-12 md:h-14" />
                  </a>
                </div>

                <div className="hidden lg:block" />

                <div className="flex justify-end">
                  <a
                    href="#"
                    aria-disabled="true"
                    className="group relative inline-flex min-h-[76px] min-w-[230px] items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/[0.05] sm:min-w-[260px] sm:gap-5 sm:px-5"
                  >
                    <div className="pointer-events-none absolute right-4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-white/8 sm:h-28 sm:w-28" />
                    <div className="pointer-events-none absolute right-9 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border border-white/10 sm:h-16 sm:w-16" />
                    <span className="relative text-xs font-semibold uppercase tracking-[0.34em] text-white/72 sm:text-sm">
                      Tickets
                    </span>
                    <img
                      src="/ticket.png"
                      alt="Ticket"
                      className="relative h-10 w-auto rounded-full border border-white/12 bg-black/30 p-1.5 transition-transform duration-300 group-hover:scale-105 sm:h-12 md:h-14"
                    />
                  </a>
                </div>
              </div>

              <div className="absolute inset-x-0 top-0 flex justify-center">
                <Nav />
              </div>
            </div>
          </header>




          <main className="site-main">
            <PageTransition>{children}</PageTransition>
          </main>




          <footer className="site-footer border-t border-white/20 bg-black text-white max-h-70">
            <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">


                <section className="relative flex flex-col items-start gap-5 border-b border-white/15 lg:pr-8">
                  <div className="pointer-events-none absolute right-0 top-3 hidden h-44 w-px bg-white/15 lg:block" />
                  <div className="flex flex-wrap items-end gap-x-2 gap-y-2 leading-none sm:gap-x-3">
                    <span className="shrink-0">
                      <span className="text-2xl font-bold text-red-600 sm:text-3xl">TEDx</span>
                      <span className="text-2xl font-bold text-white sm:text-3xl">NTUA</span>
                    </span>
                    <CycleZeroMark className="h-8 w-auto translate-y-[1px] sm:h-10" />
                  </div>
                  <div className="max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                    This independent TEDx event is operated under license from TED
                    and the auspices of ICCS. This website is our latest version : 2026
                  </div>
                  <div className="pt-2 text-xs uppercase tracking-[0.22em] text-white/55">
                    ALL RIGHTS RESERVED © 2026
                  </div>
                </section>


                <section className="relative border-b border-white/15 pb-8 md:border-b-0 md:pr-8 lg:pb-0">
                  <div className="pointer-events-none absolute right-0 top-3 hidden h-44 w-px bg-white/15 md:block" />
                  <FooterContactPanel />
                </section>


                <section className="flex flex-col items-start gap-5 lg:pl-2">
                  <div className="text-lg font-medium tracking-wide text-white/90">
                    Stay tuned:
                  </div>
                  <section className="relative flex flex-col gap-5 bg-auto">
                    <div className="flex flex-wrap gap-3">
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
                    </div>
                    <div className="footer-social-loop w-full max-w-[320px] pl-1">
                      <svg
                        viewBox="0 -14 320 164"
                        aria-hidden="true"
                        className="h-auto w-full overflow-visible"
                      >
                        <ellipse
                          cx="159"
                          cy="46"
                          rx="72"
                          ry="22"
                          fill="none"
                          stroke="rgba(255,255,255,0.18)"
                          strokeWidth="1.1"
                          strokeDasharray="5 8"
                        />
                        <ellipse
                          cx="159"
                          cy="46"
                          rx="72"
                          ry="22"
                          fill="none"
                          stroke="rgba(34,197,94,0.22)"
                          strokeWidth="1.2"
                          strokeDasharray="14 124"
                          strokeLinecap="round"
                        />
                        <g>
                          <circle cx="0" cy="0" r="4" fill="rgba(34,197,94,0.72)">
                            <animateMotion
                              dur="6.8s"
                              repeatCount="indefinite"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                          <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1">
                            <animateMotion
                              dur="6.8s"
                              repeatCount="indefinite"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                        </g>
                        <g>
                          <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.92)">
                            <animateMotion
                              dur="8.4s"
                              repeatCount="indefinite"
                              begin="-3.4s"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                          <circle cx="0" cy="0" r="7.5" fill="none" stroke="rgba(34,197,94,0.5)" strokeWidth="1">
                            <animateMotion
                              dur="8.4s"
                              repeatCount="indefinite"
                              begin="-3.4s"
                              path="M 159 46 m -72,-22 a 72 22 0 1 1 144 0 a 72 22 0 1 1 -144 0"
                            />
                          </circle>
                        </g>
                      </svg>
                    </div>
                  </section>
                </section>

                
              </div>
            </div>
          </footer>
        </EventNavProvider>
      </body>
    </html>
  );
}
