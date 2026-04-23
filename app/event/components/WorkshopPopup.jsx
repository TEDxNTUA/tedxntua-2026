"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { SocialButton } from './SocialButton';









export default function WorkshopsPopup({ isOpen, onClose, workshop, originRect }) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [panelStyle, setPanelStyle] = useState({});

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

  // Handle closing animation and unmount
  useEffect(() => {
    if (isClosing && originRect) {
      const ox = originRect.left + originRect.width / 2;
      const oy = originRect.top + originRect.height / 2;
      // Animate to tiny, transparent state
      setPanelStyle({
        transformOrigin: `${ox}px ${oy}px`,
        transform: 'scale(0.2)',
        opacity: 0,
        transition: 'transform 300ms ease-in, opacity 300ms ease-in',
      });
      // After animation completes, call onClose
      const timeoutId = window.setTimeout(() => {
        onClose();
      }, 300);
      return () => window.clearTimeout(timeoutId);
    }
  }, [isClosing, originRect, onClose]);

  // When the modal opens, compute a transform origin based on the workshop card position
  useEffect(() => {
    let timeoutId;

    if (isOpen && !isClosing && originRect) {
      const ox = originRect.left + originRect.width / 2;
      const oy = originRect.top + originRect.height / 2;
      // Start tiny and invisible, then transition to full size
      setPanelStyle({
        transformOrigin: `${ox}px ${oy}px`,
        transform: 'scale(0.2)',
        opacity: 0,
      });
      // Trigger the transition on the next tick
      timeoutId = window.setTimeout(() => {
        setPanelStyle({
          transformOrigin: `${ox}px ${oy}px`,
          transform: 'scale(1)',
          opacity: 1,
          transition: 'transform 400ms ease-out, opacity 400ms ease-out',
        });
      }, 10);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isOpen, isClosing, originRect]);

  // Keyboard navigation (Escape key)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Don't render anything if not open, no workshop, or not yet mounted on client
  if (!isOpen || !workshop || !mounted) return null;

  const handleClose = () => {
    setIsClosing(true);
  };

  // 3. Use createPortal to move the HTML to document.body
  return createPortal(
    <div
      className={`speaker-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-4 ${isClosing ? 'speaker-modal-backdrop-closing' : ''}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}>
      
      <div
        style={panelStyle}
        className="speaker-modal-panel relative w-full max-w-2xl rounded-2xl border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(4,18,16,0.98),rgba(6,25,20,0.98))] p-6 shadow-[0_0_28px_rgba(34,197,94,0.07)] overflow-y-auto max-h-[90vh] sm:p-8 md:grid md:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] md:gap-6"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-emerald-400/30 bg-slate-950/70 text-2xl text-emerald-200 shadow-[0_0_18px_rgba(34,197,94,0.18)] transition-all duration-200 hover:bg-slate-900 hover:text-emerald-100 sm:right-5 sm:top-5">
          ✕
        </button>

        {/* Grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(0deg,transparent_23%,rgba(34,197,94,0.04)_25%,rgba(34,197,94,0.04)_26%,transparent_27%,transparent_74%,rgba(34,197,94,0.04)_75%,rgba(34,197,94,0.04)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_23%,rgba(34,197,94,0.04)_25%,rgba(34,197,94,0.04)_26%,transparent_27%,transparent_74%,rgba(34,197,94,0.04)_75%,rgba(34,197,94,0.04)_76%,transparent_77%,transparent)] bg-[length:18px_18px]" />

        {/* Left sidebar: image and info */}
        <div className="relative mb-6 md:sticky md:top-0 md:mb-0 md:flex md:flex-col md:gap-4">
          {/* Workshop Image */}
          {workshop.posterImageUrl && (
            <div className="relative overflow-hidden rounded-xl border border-emerald-400/20 shadow-[0_0_18px_rgba(34,197,94,0.12)]">
              <img
                src={workshop.posterImageUrl}
                alt={workshop.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          )}

          {/* Workshop Info Card */}
          <div className="space-y-3 rounded-xl border border-emerald-400/20 bg-slate-900/50 p-4 backdrop-blur-sm">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-200/70">Workshop</p>
              <h3 className="mt-1 text-lg font-bold leading-tight text-emerald-100 sm:text-xl">
                {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ''}
              </h3>
            </div>
            
            <p className="font-mono text-sm leading-6 text-emerald-100/80">
              {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ''}
            </p>

            {/* Social links */}
            {workshop.socials && (
              <div className="flex flex-wrap gap-2 pt-2">
                <SocialConnection {...workshop.socials} />
              </div>
            )}
          </div>
        </div>

        {/* Right section: scrollable content */}
        <div className="space-y-4 md:overflow-y-auto md:pr-4">
          {/* Title */}
          {workshop.title && (
            <article className="scroll-reveal space-y-3 rounded-xl border border-emerald-400/20 bg-slate-900/30 p-4 backdrop-blur-sm">
              <h2 className="font-mono text-base font-bold text-emerald-200 sm:text-lg">&gt; WORKSHOP_DESCRIPTION</h2>
              <p className="font-mono text-sm leading-6 text-emerald-50/90 whitespace-pre-line">
                {workshop.title}
              </p>
            </article>
          )}

          {/* Description */}
          {workshop.description && (
            <article className="scroll-reveal space-y-3 rounded-xl border border-emerald-400/20 bg-slate-900/30 p-4 backdrop-blur-sm">
              <h2 className="font-mono text-base font-bold text-emerald-200 sm:text-lg">&gt; DESCRIPTION</h2>
              <p className="font-mono text-sm leading-6 text-emerald-50/90 whitespace-pre-line max-h-[24vh] overflow-y-auto">
                {workshop.description}
              </p>
            </article>
          )}

          {/* Personal Description */}
          {workshop.personalDescription && (
            <article className="scroll-reveal space-y-3 rounded-xl border border-emerald-400/20 bg-slate-900/30 p-4 backdrop-blur-sm">
              <h2 className="font-mono text-base font-bold text-emerald-200 sm:text-lg">&gt; PERSONAL_INFO</h2>
              <p className="font-mono text-sm leading-6 text-emerald-50/90 whitespace-pre-line max-h-[20vh] overflow-y-auto">
                {workshop.personalDescription}
              </p>
            </article>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}


function SocialConnection(socials) {
  // 1. Convert the Object into an Array of [name, value] pairs
  // We filter out any keys that don't have a value (string) assigned
  const entries = Object.entries(socials);

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
            size="32px" />);


      })}
    </>);

}
