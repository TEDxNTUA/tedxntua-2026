"use client";







export default function EventNavToggle({ isOpen, onToggle, visible }) {
  if (!visible) return <></>;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed top-1/2 -translate-y-1/2 z-50 bg-black text-white p-3 rounded-l-full shadow-lg hover:bg-gray-800 transition-all duration-300 ease-in-out ${
      isOpen ? "right-56 translate-x-0" : "right-0"}`
      }
      aria-label={isOpen ? "Close event navigation" : "Open event navigation"}
      aria-expanded={isOpen}>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
        style={{
          transition: 'transform 10000000ms cubic-bezier(0.2, 0.9, 0.2, 1)'
        }}>
        
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>);

}
