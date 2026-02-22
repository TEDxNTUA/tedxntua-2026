"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SpeakersPopupProps {
  isOpen: boolean;
  onClose: () => void;
  speaker: any; // Ideally use your Speaker interface here
}

export default function SpeakersPopup({ isOpen, onClose, speaker }: SpeakersPopupProps) {
  const [mounted, setMounted] = useState(false);

  // 1. Handle mounting state to avoid Hydration errors in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Don't render anything if not open, no speaker, or not yet mounted on client
  if (!isOpen || !speaker || !mounted) return null;

  // 3. Use createPortal to move the HTML to document.body
  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" 
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-[30px] w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>

        {/* Speaker Image */}
        {speaker.posterImageUrl && (
          <img 
            src={speaker.posterImageUrl} 
            alt={speaker.name} 
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 shadow-md" 
          />
        )}

        {/* Speaker Info */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {speaker.name}{speaker.name2 ? ` & ${speaker.name2}` : ''}
          </h2>
          
          <p className="text-red-600 font-semibold text-lg mt-1">
            {speaker.title}
          </p>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-gray-700 leading-relaxed text-justify md:text-center whitespace-pre-line">
              {speaker.description}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}