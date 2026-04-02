"use client";
export default function EventNavToggle({ isOpen, isPeeking, onToggle, visible }) {
  if (!visible) return <></>;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed top-1/2 -translate-y-1/2 z-50 bg-black text-white px-3 py-4 rounded-l-2xl shadow-lg hover:bg-gray-800 transition-all duration-300 ease-in-out ${
      isOpen ? "right-56 translate-x-0" : isPeeking ? "right-12" : "right-0"}`
      }
      aria-label={isOpen ? "Close event navigation" : "Open event navigation"}
      aria-expanded={isOpen}>
      <span className="event-toggle-label block text-xs font-semibold uppercase tracking-[0.35em] [writing-mode:vertical-rl] rotate-180">
        Event
      </span>
    </button>);

}
