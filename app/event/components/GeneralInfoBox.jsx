'use client';
import { useState } from 'react';
import Popup from './InfoPopup';
import { SocialButton } from './SocialButton';


// The Component Box
const separtorLine = "border-b border-white";
const height = "550";
const width = "320";
const imgWidh = "280";
const imgHeight = "360";


export default function SpeakerInfoBox(speaker) {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`flex flex-col mb-7 items-center ${separtorLine} 
    bg-black
    cursor-pointer transition-all duration-300 ease-in-out
    hover:scale-105 active:scale-95`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}>
      

      <div className={`flex-1 flex items-center justify-center mt-6`}
      style={{ width: `${imgWidh}px`, height: `${imgHeight}px` }}>
        
        <img src={speaker.posterImageUrl} alt="Speaker" />
      </div>

      <section className={'mt-4 flex items-center gap-2'}>
        <SocialConnection socials={speaker.socials} size="25px" mode="greenyellow" />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6"> 
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {speaker.name}{speaker.name2 ? ` & ${speaker.name2}` : ''}
          </h1>
        </div>

        <div>
          <p className="font-medium mb-1">
            {speaker.profession}{speaker.profession2 ? ` & ${speaker.profession2}` : ''}
          </p>
        </div>
      </div>

      <div>
      <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          infoBase={speaker} />
        
      </div>
    </div>);

}

export function PerformancesInfoBox(performance) {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`flex flex-col ${width} mb-5 ${height} items-center ${separtorLine} 
    bg-black
    cursor-pointer transition-all duration-300 ease-in-out
    hover:scale-105 active:scale-95`}
      onClick={() => setShowPopup(true)}>
      

      <div className={`flex-1 flex items-center justify-center mt-4 ${width} ${height}`}>
          <img src={performance.posterImageUrl} alt="Speaker" />
      </div>

      <section className={'mt-4 flex items-center gap-2'}>
        <SocialConnection socials={performance.socials} size="25px" mode="greenyellow" />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6"> 
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {performance.artName}
          </h1>
        </div>

        <div>
          <p className="font-medium mb-1">
            {performance.profession}{performance.profession2 ? ` & ${performance.profession2}` : ''}
          </p>
        </div>
      </div>

      <div>
      <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          infoBase={performance} />
        
      </div>
    </div>);

}

export function SideHappeningsInfoBox(sideHappening) {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <div
        className={`flex flex-col ${width} mb-5 ${height} items-center ${separtorLine} 
      bg-black
      cursor-pointer transition-all duration-300 ease-in-out
      hover:scale-105 active:scale-95`}
        onClick={() => setShowPopup(true)}>
        

        <div className={`flex-1 flex items-center justify-center mt-4 ${width} ${height}`}>
            <img src={sideHappening.posterImageUrl} alt="Speaker" />
        </div>

        <section className={'mt-4 flex items-center gap-2'}>
          <SocialConnection socials={sideHappening.socials} size="25px" mode="greenyellow" />
        </section>

        <div className="flex-1 flex items-center flex-col w-full px-6"> 
          <div>
            <h1 className="text-large mb-1 font-bold uppercase">
              {sideHappening.name}{sideHappening.name2 ? ` & ${sideHappening.name2}` : ''}
            </h1>
          </div>

          <div>
            <p className="font-medium mb-1">
              {sideHappening.profession}{sideHappening.profession2 ? ` & ${sideHappening.profession2}` : ''}
            </p>
          </div>
        </div>

        <div>
        <Popup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            infoBase={sideHappening} />
          
        </div>

      </div>
    </div>);

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
