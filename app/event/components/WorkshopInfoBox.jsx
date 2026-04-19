'use client';
import { useState } from 'react';
import WorkshopPopup from './WorkshopPopup';
import { SocialButton } from './SocialButton';

const separtorLine = "border border-emerald-100/15";

export default function ExperienceInfoBox(workshop) {

  const [showPopup, setShowPopup] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={showPopup}
      className={`group relative mb-7 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] ${separtorLine} bg-[linear-gradient(180deg,rgba(6,95,70,0.96),rgba(2,27,22,0.98))] text-left text-white shadow-[0_18px_60px_rgba(6,95,70,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(6,95,70,0.34)] active:scale-[0.99] sm:max-w-[420px]`}
      onClick={(e) => {
        setOriginRect(e.currentTarget.getBoundingClientRect());
        setShowPopup(true);
      }}
      style={{ minHeight: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(167,243,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_26%)]" />

      <div className="relative flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/8 shadow-inner">
          <div className="aspect-[4/5] w-full">
            <img
              src={workshop.posterImageUrl}
              alt={workshop.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <section className="flex flex-wrap items-center gap-2 text-emerald-50/90">
          <SocialConnection socials={workshop.socials} size="25px" mode="greenyellow" />
        </section>

        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/70">Experience Workshop</p>
            <h1 className="text-xl font-semibold leading-tight sm:text-[1.55rem]">
              {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ''}
            </h1>
          </div>

          <p className="text-sm leading-6 text-emerald-50/80 sm:text-[15px]">
            {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ''}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-[0.28em] text-emerald-100/70">
            Tap to open details
          </div>
        </div>
      </div>

      <WorkshopPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        workshop={workshop}
        originRect={originRect}
      />
    </button>);

}

export function ProfessionalInfoBox(workshop) {

  const [showPopup, setShowPopup] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={showPopup}
      className={`group relative mb-7 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] ${separtorLine} bg-[linear-gradient(180deg,rgba(6,95,70,0.96),rgba(2,27,22,0.98))] text-left text-white shadow-[0_18px_60px_rgba(6,95,70,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(6,95,70,0.34)] active:scale-[0.99] sm:max-w-[420px]`}
      onClick={(e) => {
        setOriginRect(e.currentTarget.getBoundingClientRect());
        setShowPopup(true);
      }}
      style={{ minHeight: '100%' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(167,243,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_26%)]" />

      <div className="relative flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/8 shadow-inner">
          <div className="aspect-[4/5] w-full">
            <img
              src={workshop.posterImageUrl}
              alt={workshop.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <section className="flex flex-wrap items-center gap-2 text-emerald-50/90">
          <SocialConnection socials={workshop.socials} size="25px" mode="greenyellow" />
        </section>

        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/70">Professional Workshop</p>
            <h1 className="text-xl font-semibold leading-tight sm:text-[1.55rem]">
              {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ''}
            </h1>
          </div>

          <p className="text-sm leading-6 text-emerald-50/80 sm:text-[15px]">
            {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ''}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-[0.28em] text-emerald-100/70">
            Tap to open details
          </div>
        </div>
      </div>

      <WorkshopPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        workshop={workshop}
        originRect={originRect}
      />
    </button>);

}


function SocialConnection({ socials = {}, size = "35px", mode = "greenyellow" }) {
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
            mode={mode} />);


      })}
    </>);

}
