"use client";
import { useState } from 'react';
import { SocialButton } from './SocialButton';
import { capitalizeSegments, formatUppercaseNoAccents } from '../textFormatters';

const SPEAKER_SOCIAL_HOVER_COLOR = "#088880";
const PERFORMER_SOCIAL_HOVER_COLOR = "#239d54";

export default function ProgramInfoBoxSimgular({ 
  time, 
  name, 
  name2,
  artName, 
  theme, 
  profession, 
  profession2,
  itemColor, 
  description, 
  itemCategory,
  socials,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine category color/label
  const categoryConfig = {
    speaker: {
      label: "Speaker",
      color: "from-emerald-400/20 to-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-300"
    },
    performance: {
      label: "Performance",
      color: "from-blue-400/20 to-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-300"
    },
    oppening: {
      label: "Opening",
      color: "from-yellow-400/20 to-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-300"
    },
    closing: {
      label: "Closing",
      color: "from-yellow-400/20 to-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-300"
    },
    default: {
      label: itemCategory || "Event",
      color: "from-gray-400/20 to-gray-500/10",
      border: "border-gray-500/30",
      text: "text-gray-300"
    }
  };

  const config = categoryConfig[itemCategory] || categoryConfig.default;
  const canExpand = itemCategory === 'speaker' || itemCategory === 'performance';
  const displayProfession = profession
    ? formatUppercaseNoAccents(capitalizeSegments(profession))
    : "";
  const displayProfession2 = profession2
    ? formatUppercaseNoAccents(capitalizeSegments(profession2))
    : "";
  const displayName = (() => {
    if (itemCategory === 'speaker') {
      return name2 ? `${name} & ${name2}` : name;
    }
    if (itemCategory === 'performance' || itemCategory === 'expworkshop') {
      return artName;
    }
    return name;
  })();

  return (
    <div 
      onClick={() => canExpand && setIsExpanded(!isExpanded)}
      className={`group relative border-b border-white/10 hover:bg-white/[0.02] transition-colors ${canExpand ? 'cursor-pointer' : ''}`}
    >
      <div className="flex flex-col md:flex-row py-6 md:py-8 items-center md:items-center">
        {/* Time Section - Minimal Typography */}
        <div className="flex items-baseline md:flex-col md:items-center justify-center md:justify-center mb-3 md:mb-0 md:w-48 shrink-0">
          <span className="font-mono text-lg md:text-2xl font-black tracking-tighter text-white">
            {time}
          </span>          
        </div>

        {/* Content Section */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border ${config.border} ${config.color} ${config.text}`}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center md:items-start justify-between gap-4">
            <div className="flex-1 flex flex-col items-center md:items-start">
              <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1 group-hover:text-emerald-400 transition-colors">
                {displayName}
              </h4>
              {displayProfession && (
                <div className="text-xs md:text-sm font-medium text-white/50 uppercase tracking-[0.1em]">
                  <p>{displayProfession}</p>
                  {displayProfession2 && <p>& {displayProfession2}</p>}
                </div>
              )}
              <SocialConnection
                socials={socials}
                ownerName={displayName}
                hoverColor={
                  itemCategory === "performance"
                    ? PERFORMER_SOCIAL_HOVER_COLOR
                    : SPEAKER_SOCIAL_HOVER_COLOR
                }
              />
            </div>
            
            <div className={`mt-1 md:mt-2 transition-all duration-300 ${!canExpand ? 'hidden' : 'text-white'}`}>
              {isExpanded ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              ) : (
                <div className="text-white/20 group-hover:text-white/40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Bio - Minimal slide down */}
      {canExpand && (
      <div className={`
        grid transition-all duration-500 ease-in-out
        ${isExpanded ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}
      `}>
        <div className="overflow-hidden">
          <div className="md:ml-48">
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
              <p className="text-sm md:text-base leading-relaxed text-white/60 font-medium">
                {description}
              </p>
              <div className="mt-4 flex justify-center md:justify-start gap-2">
                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${config.color.replace('/20', '/60')}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

function SocialConnection({ socials = {}, ownerName, hoverColor }) {
  const entries = Object.entries(socials).filter(([, url]) => {
    return typeof url === "string" && url.trim();
  });

  if (!entries.length) {
    return null;
  }

  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3"
      onClick={(event) => event.stopPropagation()}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {entries.map(([platformName, url]) => {
        const platform = platformName.toLowerCase().replace(/\d+$/, "");

        return (
          <SocialButton
            key={`${platformName}-${url}`}
            name={platform}
            urlLink={url}
            size="23px"
            mode="whitegreen"
            hoverColor={hoverColor}
            ariaLabel={`${platform} for ${ownerName}`}
          />
        );
      })}
    </div>
  );
}
