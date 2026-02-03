"use client";

interface EventNavToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
}

export default function EventNavToggle({ isOpen, onToggle, visible }: EventNavToggleProps): JSX.Element {
  if (!visible) return <></>;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-black text-white p-3 rounded-l-full shadow-lg hover:bg-gray-800 transition-all duration-300"
      aria-label={isOpen ? "Close event navigation" : "Open event navigation"}
      aria-expanded={isOpen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

