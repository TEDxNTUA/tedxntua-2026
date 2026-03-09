"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TEDSocialButton from './SocialButton'
import {socialLists} from '../types'
import {SocialButton} from './SocialButton'


interface SpeakersPopupProps {
isOpen: boolean;
onClose: () => void;
infoBase: any; // Ideally use your Speaker interface here
}


export default function Popup({ isOpen, onClose, infoBase}: SpeakersPopupProps) {
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
  if (!isOpen || !infoBase || !mounted) return null;

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


      {/* Actual Part*/}
      
        {/* Parent: Column on mobile, Row on medium screens+ */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full p-4">
            
            {/* Speaker Image */}
            {infoBase.posterImageUrl && (
              <div className="flex-shrink-0">
                <img
                  src={infoBase.posterImageUrl}
                  alt={infoBase.name}
                  className="w-32 h-32 md:w-40 md:h-48 object-cover border-4 border-gray-100 shadow-md rounded-lg"
                />
              </div>
            )}

          {/* Speaker Info */}
          {/* min-w-0 is the "secret sauce" to prevent text overflow in flexbox */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 break-words leading-tight">
              {infoBase.name}{infoBase.name2 ? ` & ${infoBase.name2}` : ''}
            </h2>
            
            <p className="text-red-600 font-semibold text-lg mt-1 break-words">
              {infoBase.profession}{infoBase.profession2 ? ` & ${infoBase.profession2}` : ''}
            </p>
          </div>
          
        </div>
          

        {/* --- SCROLLABLE SEGMENT START --- */}
        <div className="mt-6 border-t border-gray-100 max-h-30 overflow-y-auto px-2 custom-scrollbar">
          <h1 className="mt-6 text-black font-bold text-1xl">{infoBase.title}</h1>
          <p className="text-gray-700 leading-relaxed text-justify md:text-center whitespace-pre-line">
            {infoBase.description}
            {infoBase.description}
            {infoBase.description}
          </p>
        </div>

        <div className="mt-6 border-t border-gray-100 max-h-30 overflow-y-auto px-2 custom-scrollbar">
          <h1 className="mt-6 text-black font-bold text-1xl">Personal Information</h1>
          <p className="text-gray-700 leading-relaxed text-justify md:text-center whitespace-pre-line">
            {infoBase.personalDescription}
            {infoBase.personalDescription}
            {infoBase.personalDescription}
            {infoBase.description}
          </p>
        </div>

        {/* --- SCROLLABLE SEGMENT END --- */}
        <section className={'mt-4'}>
          <SocialConnection {...infoBase.socials}/>
        </section>
      </div>
    </div>,
    document.body
  );
}


function SocialConnection(socials: socialLists) {
  // 1. Convert the Object into an Array of [name, value] pairs
  // We filter out any keys that don't have a value (string) assigned
  const entries = Object.entries(socials) as [keyof socialLists, string][];

  return (
    <>
      {entries.map(([platformName, url]) => {
        // Skip rendering if the value is undefined or empty
        if (!url) return null;

        return (
          <SocialButton 
            key={platformName} // Use the platform name as a unique key
            name={platformName} 
            urlLink={url} 
            size="35px" 
          />
        );
      })}
    </>
  );
}