"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { SocialButton } from './SocialButton';

const SPEAKER_SOCIAL_HOVER_COLOR = "#088880";
const PERFORMER_SOCIAL_HOVER_COLOR = "#239d54";

export default function Popup({ isOpen, onClose, infoBase, originRect }) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  // 3. State for the panel animation style
  const [panelStyle, setPanelStyle] = useState({});

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

  // When the modal opens, compute a transform origin based on the speaker card position
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

  // Don't render anything if not open, no speaker, or not yet mounted on client
  if (!isOpen || !infoBase || !mounted) return null;

  const handleClose = () => {
    setIsClosing(true);
  };

  const socialHoverColor =
    infoBase.itemCategory === "performance"
      ? PERFORMER_SOCIAL_HOVER_COLOR
      : infoBase.itemCategory === "speaker"
        ? SPEAKER_SOCIAL_HOVER_COLOR
        : undefined;

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
        className="speaker-modal-panel relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-emerald-400/25 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_34%),linear-gradient(180deg,rgba(4,18,16,0.98),rgba(6,25,20,0.98))] p-5 shadow-[0_25px_90px_rgba(5,150,105,0.25)] max-h-[calc(100vh-2rem)] overflow-y-auto sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-label={infoBase.name}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:18px_18px] opacity-25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_30%)]" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-emerald-400/30 bg-slate-950/70 text-2xl text-emerald-200 shadow-[0_0_18px_rgba(34,197,94,0.18)] transition-all duration-200 hover:bg-slate-900 hover:text-emerald-100 sm:right-5 sm:top-5">
          
          ✕
        </button>


      {/* Actual Part*/}
      
        {/* Parent: Column on mobile, Row on medium screens+ */}
        <div className="relative grid w-full gap-6 p-1 pt-8 md:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] md:items-start md:gap-8 md:p-3 md:pt-10">
          <aside className="flex flex-col gap-4 md:sticky md:top-2 md:self-start">
            {infoBase.posterImageUrl && (
              <div className="overflow-hidden rounded-[24px] border border-emerald-400/20 bg-slate-950 shadow-[0_0_35px_rgba(34,197,94,0.12)]">
                <img
                  src={infoBase.posterImageUrl}
                  alt={infoBase.name}
                  className="h-64 w-full object-cover sm:h-72 md:h-[360px]"
                />
              </div>
            )}

            <div className="rounded-[24px] border border-emerald-400/20 bg-slate-950/85 p-4 shadow-[0_0_35px_rgba(34,197,94,0.08)] backdrop-blur-sm">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-300">Speaker_01</p>
              <h2 className="mt-2 font-mono text-2xl font-semibold leading-tight text-emerald-50 break-words sm:text-[2.15rem]">
                {infoBase.name}{infoBase.name2 ? ` & ${infoBase.name2}` : ''}
              </h2>
              <p className="mt-2 font-mono text-base font-medium text-emerald-300 break-words sm:text-lg">
                {infoBase.profession}{infoBase.profession2 ? ` & ${infoBase.profession2}` : ''}
              </p>

              <section className="mt-5 flex flex-wrap justify-start gap-4">
                <SocialConnection
                  socials={infoBase.socials}
                  size="25px"
                  mode="whitegreen"
                  hoverColor={socialHoverColor}
                />
              </section>
              {infoBase.personalDescription2 && (
                <section className="mt-4 flex flex-wrap justify-start gap-4 border-t border-emerald-400/20 pt-4">
                  <SocialConnection
                    socials={infoBase.socials2}
                    size="25px"
                    mode="whitegreen"
                    hoverColor={socialHoverColor}
                  />
                </section>
              )}
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4 rounded-[22px] border border-emerald-400/20 bg-slate-950/80 px-4 py-3 text-emerald-50 shadow-[0_0_26px_rgba(34,197,94,0.08)]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-300">Scroll for more</p>
                <p className="font-mono text-sm text-emerald-100/70">System logs are split into compact sections below.</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 font-mono text-emerald-200 animate-bounce">
                ↓
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="scroll-reveal rounded-[22px] border border-emerald-400/20 bg-slate-950/80 p-6 sm:p-8 shadow-[0_0_28px_rgba(34,197,94,0.07)] backdrop-blur-sm lg:col-span-2">
                <h1 className="font-mono text-2xl sm:text-3xl font-semibold text-emerald-100">&gt; {infoBase.title}</h1>
                <p className="mt-4 max-h-[24vh] overflow-y-auto pr-2 font-mono text-base sm:text-lg leading-relaxed text-justify text-emerald-100/75 whitespace-pre-line custom-scrollbar">
                  {infoBase.description}
                </p>
              </article>

              <article className="scroll-reveal rounded-[22px] border border-emerald-400/20 bg-slate-950/80 p-6 sm:p-8 shadow-[0_0_28px_rgba(34,197,94,0.07)] backdrop-blur-sm">
                <h1 className="font-mono text-xl sm:text-2xl font-semibold text-emerald-100">&gt; Personal_Info</h1>
                <p className="mt-4 max-h-[20vh] overflow-y-auto pr-2 font-mono text-base sm:text-lg leading-relaxed text-justify text-emerald-100/75 whitespace-pre-line custom-scrollbar">
                  {infoBase.personalDescription}
                </p>
              </article>

              {infoBase.personalDescription2 && (
                <article className="scroll-reveal rounded-[22px] border border-emerald-400/20 bg-slate-950/80 p-6 sm:p-8 shadow-[0_0_28px_rgba(34,197,94,0.07)] backdrop-blur-sm">
                  <h1 className="font-mono text-xl sm:text-2xl font-semibold text-emerald-100">&gt; Personal_Info_02</h1>
                  <p className="mt-4 max-h-[20vh] overflow-y-auto pr-2 font-mono text-base sm:text-lg leading-relaxed text-justify text-emerald-100/75 whitespace-pre-line custom-scrollbar">
                    {infoBase.personalDescription2}
                  </p>
                </article>
              )}
            </div>
          </section>

        {/* --- SCROLLABLE SEGMENT END --- */}
        </div>
      </div>
    </div>,
    document.body
  );
}


function SocialConnection({ socials = {}, size = "25px", mode = "greenyellow", hoverColor }) {
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
            size={size}
            mode={mode}
            hoverColor={hoverColor} />
          );
      })}
    </>);

}
