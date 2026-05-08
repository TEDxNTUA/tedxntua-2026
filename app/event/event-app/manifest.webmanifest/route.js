import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    name: "TEDxNTUA Event App",
    short_name: "TEDxNTUA",
    description: "Program, speakers, workshops, sponsors, and giveaways for TEDxNTUA 2026.",
    start_url: "/event/event-app",
    scope: "/event/event-app",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#22c55e",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/event/eventApp/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/event/eventApp/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  });
}
