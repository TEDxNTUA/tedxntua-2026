import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Experience Workshops | TEDxNTUA 2026",
  description: "Explore the hands-on experience workshops from TEDxNTUA 2026: Cycle 0.",
  path: "/event/experienceWorkshops/",
});

export default function Layout({ children }) {
  return children;
}
