"use client";

import { useState } from "react";
import SmoothImage from "./SmoothImage";

import { pickCollectiveImage } from "../collectiveImages";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>);

}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>);

}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>);

}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>);

}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>);

}









export default function MemberPhoto({ member, containerClassName = "", containerStyle }) {
  const [showSocial, setShowSocial] = useState(false);
  const social = member.social;
  const hasSocial = !!(
  social && (
  social.instagram || social.linkedin || social.twitter || social.facebook || social.website));

  const handleImageClick = (e) => {
    // Toggle state on mobile (touch devices)
    if (window.matchMedia("(hover: none)").matches) {
      e.preventDefault();
      setShowSocial(!showSocial);
    }
  };

  const photos = Array.isArray(member.photos) ? member.photos : (member.photo ? [member.photo] : []);
  const mainPhoto = photos[0] || pickCollectiveImage(member.id);
  const hoverPhoto = photos[1];
  const hasHoverPhoto = !!hoverPhoto;

  return (
    <div
      className={`relative group overflow-hidden ${containerClassName}`}
      style={containerStyle}>
      
      {/* Zoom wrapper — separate from SmoothImage so opacity & transform transitions don't conflict */}
      <div 
        className={`w-full h-full transition-transform duration-500 ease-out cursor-pointer relative ${showSocial ? 'scale-110' : 'group-hover:scale-110'}`}
        onClick={handleImageClick}>
        
        {/* Main Photo */}
        <SmoothImage
          src={mainPhoto}
          alt={member.name}
          loading="eager"
          className={`w-full h-full object-cover transition-opacity duration-700 ${hasHoverPhoto ? 'group-hover:opacity-0' : ''} ${showSocial && hasHoverPhoto ? 'opacity-0' : ''}`}
          style={{ objectPosition: "50% 12%" }} />
        
        {/* Hover Photo */}
        {hasHoverPhoto && (
          <SmoothImage
            src={hoverPhoto}
            alt={member.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ${showSocial ? 'opacity-100' : 'group-hover:opacity-100'}`}
            style={{ objectPosition: "50% 12%" }} />
        )}
      </div>

      {/* Social overlay — subtle visibility by default, enhanced on hover and toggle on mobile touch */}
      {hasSocial &&
      <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 py-3 px-2 bg-rose-950/40 backdrop-blur-sm transition-all duration-300 ease-out ${
        showSocial ? 'opacity-100 bg-rose-950/60' : 'opacity-40 group-hover:opacity-100 group-hover:bg-rose-950/60'
      }`}>
          {social?.instagram &&
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/80 hover:text-pink-400 group-hover:text-white/100 transition-colors duration-150 hover:scale-125 transition-transform"
          onClick={(e) => e.stopPropagation()}>
          
              <InstagramIcon />
            </a>
        }
          {social?.linkedin &&
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white/80 hover:text-blue-400 group-hover:text-white/100 transition-colors duration-150 hover:scale-125 transition-transform"
          onClick={(e) => e.stopPropagation()}>
          
              <LinkedInIcon />
            </a>
        }
          {social?.twitter &&
        <a
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="text-white/80 hover:text-sky-400 group-hover:text-white/100 transition-colors duration-150 hover:scale-125 transition-transform"
          onClick={(e) => e.stopPropagation()}>
          
              <TwitterIcon />
            </a>
        }
          {social?.facebook &&
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-white/80 hover:text-blue-500 group-hover:text-white/100 transition-colors duration-150 hover:scale-125 transition-transform"
          onClick={(e) => e.stopPropagation()}>
          
              <FacebookIcon />
            </a>
        }
          {social?.website &&
        <a
          href={social.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Website"
          className="text-white/80 hover:text-gray-300 group-hover:text-white/100 transition-colors duration-150 hover:scale-125 transition-transform"
          onClick={(e) => e.stopPropagation()}>
          
              <GlobeIcon />
            </a>
        }
        </div>
      }
    </div>);

}
