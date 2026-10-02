import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Program | TEDxNTUA 2026",
  description: "Explore the TEDxNTUA 2026 Cycle 0 program, including talks, performances, workshops, and the event schedule.",
  path: "/event/program/",
});

export default function Layout({ children }) {
  return children;
}
