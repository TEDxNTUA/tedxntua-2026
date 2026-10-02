import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Performances | TEDxNTUA 2026",
  description: "Discover the music and dance performances featured at TEDxNTUA 2026: Cycle 0.",
  path: "/event/performances/",
});

export default function Layout({ children }) {
  return children;
}
