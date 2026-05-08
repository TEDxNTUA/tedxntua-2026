export const metadata = {
  title: "TEDxNTUA Event App",
  description: "Phone-only TEDxNTUA 2026 event app with program, speakers, workshops, sponsors, and giveaways.",
  manifest: "/event/event-app/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "TEDxNTUA",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function EventAppLayout({ children }) {
  return children;
}
