'use client';
import { useState } from 'react';
import SpeakersPopup from './SpeakersPopup';
import { SpeakerItem } from '../types'
import {SocialButton} from './SocialButton'
import TEDSocialButton from './SocialButton'



// The Component Box
const separtorLine = "border-b border-white"
const height = "h-[420px]"
const width = "w-[300px]"

export default function InfoBox(speaker: SpeakerItem) {

  const [showPopup, setShowPopup] = useState(false);
  


  return (
    <div>
      <div
      className={`flex flex-col ${width} mb-5 ${height} items-ceneter justify-center ${separtorLine} 
      bg-black
      cursor-pointer transition-all duration-300 ease-in-out
      hover:scale-105 active:scale-95`}
      onClick={() => setShowPopup(true)}
      >

        <div className={`flex-1 flex items-center justify-center ${width} ${height}`}>
            <img src={speaker.posterImageUrl} alt="Speaker"/>
        </div>

         <section className={''}>
      <TEDSocialButton
        name = "youtube"
        size = "35px"
        color = "white"
        colorHover = "yellow"
      />
      <TEDSocialButton
        name = "instagram"
        size = "35px"
        color = "white"
        colorHover = "yellow"
      />
      <TEDSocialButton
        name = "youtube"
        size = "35px"
        color = "white"
        colorHover = "yellow"
      />
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
        <SpeakersPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          speaker = {speaker}
        />
        </div>

      </div>
    </div>
  );
}
