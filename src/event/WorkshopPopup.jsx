import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SocialButton } from "./SocialButton";

function SocialConnection(socials = {}) {
  const entries = Object.entries(socials);

  return (
    <>
      {entries.map(([platformName, url]) => {
        if (!url) return null;
        return (
          <SocialButton
            key={platformName}
            name={platformName}
            urlLink={url}
            size="35px"
          />
        );
      })}
    </>
  );
}

export default function WorkshopPopup({ isOpen, onClose, workshop }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !workshop || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[30px] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-black transition-colors"
        >
          x
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full p-4">
          {workshop.posterImageUrl && (
            <div className="flex-shrink-0">
              <img
                src={workshop.posterImageUrl}
                alt={workshop.name}
                className="w-32 h-32 md:w-40 md:h-48 object-cover border-4 border-gray-100 shadow-md rounded-lg"
              />
            </div>
          )}

          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 break-words leading-tight">
              {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ""}
            </h2>
            <p className="text-red-600 font-semibold text-lg mt-1 break-words">
              {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 max-h-30 overflow-y-auto px-2 custom-scrollbar">
          <h1 className="mt-6 text-black font-bold text-1xl">{workshop.title}</h1>
          <p className="text-gray-700 leading-relaxed text-justify md:text-center whitespace-pre-line">
            {workshop.description}
            {workshop.description}
            {workshop.description}
          </p>
        </div>

        <div className="mt-6 border-t border-gray-100 max-h-30 overflow-y-auto px-2 custom-scrollbar">
          <h1 className="mt-6 text-black font-bold text-1xl">Personal Information</h1>
          <p className="text-gray-700 leading-relaxed text-justify md:text-center whitespace-pre-line">
            {workshop.personalDescription}
            {workshop.personalDescription}
            {workshop.personalDescription}
            {workshop.description}
          </p>
        </div>

        <section className="mt-4">
          <SocialConnection {...workshop.socials} />
        </section>
      </div>
    </div>,
    document.body
  );
}
