import localFont from "next/font/local";
import ClientScrollProvider from "./components/ClientScrollProvider";
import HomeVideoScrubber from "./components/HomeVideoScrubber";

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
// testing