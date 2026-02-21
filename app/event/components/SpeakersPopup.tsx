// ../components/SpeakersPopup.tsx
interface SpeakersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  speaker: any; // Or use the InfoItem interface
}

export default function SpeakersPopup({ isOpen, onClose, speaker }: SpeakersPopupProps) {
  if (!isOpen || !speaker) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60" onClick={onClose}>
      {/* stopPropagation prevents the popup from closing when clicking inside the white box */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-[90%] md:w-full" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900">✕</button>
        
        
        {speaker.imageUrl && (
          <img src={speaker.imageUrl} alt={speaker.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
        )}
        
        <h2 className="text-2xl font-bold text-center">
          {speaker.name}{speaker.name2 ? ` & ${speaker.name2}` : ''}
        </h2>
        <p className="text-blue-600 text-center font-semibold">{speaker.title}</p>
        <p className="mt-4 text-gray-600 text-center">{speaker.description}</p>
      </div>
    </div>
  );
}