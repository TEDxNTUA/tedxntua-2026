

// Event navigation is now integrated into the main Nav component
// It appears as an extension when the Event button is active
export default function EventLayout({ children }) {
  return (
    <div className="w-full overflow-hidden bg-[#07110d] text-white">
      <div>{children}</div>
    </div>);

}
