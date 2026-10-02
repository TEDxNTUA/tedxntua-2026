import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Speakers | TEDxNTUA 2026",
  description: "Meet the speakers and hosts of TEDxNTUA 2026: Cycle 0 and explore the ideas they brought to the stage.",
  path: "/event/speakers/",
});

export default function Layout({ children }) {
  return children;
}
