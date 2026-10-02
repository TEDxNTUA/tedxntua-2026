import localFont from "next/font/local";
import ClientScrollProvider from "./components/ClientScrollProvider";
import HomeVideoScrubber from "./components/HomeVideoScrubber";
import { pageMetadata } from "./lib/seo";

export const metadata = pageMetadata({
  title: "TEDxNTUA 2026: Cycle 0",
  description: "TEDxNTUA 2026: Cycle 0 — Explore the talks, performances, and workshops from September 5, 2026 at Athens Conservatoire.",
  path: "/",
});

const copixelDisplay = localFont({
  src: "../Copixel-Futuristic-Font/Fonts/Copixel-Display.otf",
  display: "swap",
});

export default function Home() {
  return (
    <ClientScrollProvider>
      <HomeVideoScrubber heroTitleClassName={copixelDisplay.className} />
    </ClientScrollProvider>
  );
}
