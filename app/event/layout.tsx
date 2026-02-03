import type { ReactNode } from "react";

// Event navigation is now integrated into the main Nav component
// It appears as an extension when the Event button is active
export default function EventLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div>{children}</div>
    </div>
  );
}
