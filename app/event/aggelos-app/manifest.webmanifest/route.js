import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    name: "TEDxNTUA Cycle 0",
    short_name: "TEDxNTUA",
    description: "Program, speakers, workshops, sponsors, and giveaways for TEDxNTUA 2026.",
    start_url: "/event/aggelos-app",
    scope: "/event/aggelos-app",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#E62B1E",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/event/aggelosApp/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/event/aggelosApp/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  });
}
