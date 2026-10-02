import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Sponsors | TEDxNTUA 2026",
  description: "Meet the sponsors and partners who supported TEDxNTUA 2026: Cycle 0.",
  path: "/sponsors/",
});

export default function Layout({ children }) {
  return children;
}
