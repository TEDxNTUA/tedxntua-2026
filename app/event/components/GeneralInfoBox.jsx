'use client';
import { useState } from 'react';
import Popup from './InfoPopup';
import { SocialButton } from './SocialButton';
import { capitalizeSegments } from '../textFormatters';

const separtorLine = "border border-emerald-100/15";
const SPEAKER_SOCIAL_HOVER_COLOR = "#088880";
const PERFORMER_SOCIAL_HOVER_COLOR = "#239d54";

const joinCapitalizedProfessions = (...professions) =>
  professions.filter(Boolean).map(capitalizeSegments).join(" & ");


export default function SpeakerInfoBox(speaker) {

  const [showPopup, setShowPopup] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={showPopup}
      className={`group relative mb-7 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] ${separtorLine} bg-[linear-gradient(180deg,rgba(6,95,70,0.96),rgba(2,27,22,0.98))] text-center sm:text-left text-white shadow-[0_18px_60px_rgba(6,95,70,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(6,95,70,0.34)] active:scale-[0.99] sm:max-w-[420px]`}
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
              src={speaker.posterImageUrl}
              alt={speaker.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <section className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-emerald-50/90">
          <SocialConnection
            socials={speaker.socials}
            size="25px"
            mode="whitegreen"
            hoverColor={SPEAKER_SOCIAL_HOVER_COLOR}
          />
        </section>

        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/70">Speaker</p>
            <h1 className="text-xl font-semibold leading-tight sm:text-[1.55rem]">
              {speaker.name}{speaker.name2 ? ` & ${speaker.name2}` : ''}
            </h1>
          </div>

          <p className="text-sm leading-6 text-emerald-50/80 sm:text-[15px]">
            {joinCapitalizedProfessions(speaker.profession, speaker.profession2)}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-[0.28em] text-emerald-100/70">
            Tap to open details
          </div>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={speaker}
        originRect={originRect}
      />
    </button>);

}

export function PerformancesInfoBox(performance) {

  const [showPopup, setShowPopup] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={showPopup}
      className={`group relative mb-7 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] ${separtorLine} bg-[linear-gradient(180deg,rgba(6,95,70,0.96),rgba(2,27,22,0.98))] text-center sm:text-left text-white shadow-[0_18px_60px_rgba(6,95,70,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(6,95,70,0.34)] active:scale-[0.99] sm:max-w-[420px]`}
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
              src={performance.posterImageUrl}
              alt={performance.artName}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <section className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-emerald-50/90">
          <SocialConnection
            socials={performance.socials}
            size="25px"
            mode="whitegreen"
            hoverColor={PERFORMER_SOCIAL_HOVER_COLOR}
          />
        </section>

        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/70">Performance</p>
            <h1 className="text-xl font-semibold leading-tight sm:text-[1.55rem]">
              {performance.artName}
            </h1>
          </div>

          <p className="text-sm leading-6 text-emerald-50/80 sm:text-[15px]">
            {joinCapitalizedProfessions(performance.profession, performance.profession2)}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-[0.28em] text-emerald-100/70">
            Tap to open details
          </div>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={performance}
        originRect={originRect}
      />
    </button>);

}

export function SideHappeningsInfoBox(sideHappening) {

  const [showPopup, setShowPopup] = useState(false);
  const [originRect, setOriginRect] = useState(null);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={showPopup}
      className={`group relative mb-7 flex w-full max-w-[360px] flex-col overflow-hidden rounded-[30px] ${separtorLine} bg-[linear-gradient(180deg,rgba(6,95,70,0.96),rgba(2,27,22,0.98))] text-center sm:text-left text-white shadow-[0_18px_60px_rgba(6,95,70,0.22)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(6,95,70,0.34)] active:scale-[0.99] sm:max-w-[420px]`}
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
              src={sideHappening.posterImageUrl}
              alt={sideHappening.name}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <section className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-emerald-50/90">
          <SocialConnection socials={sideHappening.socials} size="25px" mode="greenyellow" />
        </section>

        <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/70">Side Happening</p>
            <h1 className="text-xl font-semibold leading-tight sm:text-[1.55rem]">
              {sideHappening.name}{sideHappening.name2 ? ` & ${sideHappening.name2}` : ''}
            </h1>
          </div>

          <p className="text-sm leading-6 text-emerald-50/80 sm:text-[15px]">
            {sideHappening.profession}{sideHappening.profession2 ? ` & ${sideHappening.profession2}` : ''}
          </p>

          <div className="pt-2 text-[11px] uppercase tracking-[0.28em] text-emerald-100/70">
            Tap to open details
          </div>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={sideHappening}
        originRect={originRect}
      />
    </button>);

}


function SocialConnection({ socials = {}, size = "35px", mode = "greenyellow", hoverColor }) {
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
            hoverColor={hoverColor} />);

      })}
    </>);

}
