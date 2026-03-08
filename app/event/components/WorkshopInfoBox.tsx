'use client';
import { useState } from 'react';
import WorkshopPopup from './WorkshopPopup';
import { ExperienceWorkshopItem } from '../types'
import { ProfessionalWorkshopItem } from '../types'
import {SocialButton} from './SocialButton'
import TEDSocialButton from './SocialButton'



// The Component Box
const separtorLine = "border-b border-white"
const height = "530"
const width = "320"
const imgWidh = "280"
const imgHeight = "380"

export default function ExperienceInfoBox(workshop: ExperienceWorkshopItem) {

  const [showPopup, setShowPopup] = useState(false);
  


  return (
    <div>
      <div
      className={`flex flex-col mb-5 items-center ${separtorLine} 
      bg-black
      cursor-pointer transition-all duration-300 ease-in-out
      hover:scale-105 active:scale-95`}
      style={{width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}
      >
   
        <div className={`flex-1 flex items-center justify-center mt-4`}
              style={{width: `${imgWidh}px`, height: `${imgHeight}px` }}
        >
            <img src={workshop.posterImageUrl} alt="Workshop"/>
        </div>

         <section className={'mt-4'}>
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
              {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ''}
            </h1>
          </div>

          <div>
            <p className="font-medium mb-1">
              {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ''}
            </p>
          </div>
        </div>

        <div>
        <WorkshopPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          workshop = {workshop}
        />
        </div>

      </div>
    </div>
  );
}

export function ProfessionalInfoBox(workshop: ProfessionalWorkshopItem) {

  const [showPopup, setShowPopup] = useState(false);
  


  return (
    <div>
      <div
      className={`flex flex-col mb-5 items-center ${separtorLine} 
      bg-black
      cursor-pointer transition-all duration-300 ease-in-out
      hover:scale-105 active:scale-95`}
      style={{width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}
      >
   
        <div className={`flex-1 flex items-center justify-center mt-4`}
              style={{width: `${imgWidh}px`, height: `${imgHeight}px` }}
        >
            <img src={workshop.posterImageUrl} alt="Workshop"/>
        </div>

         <section>
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
              {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ''}
            </h1>
          </div>

          <div>
            <p className="font-medium mb-1">
              {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ''}
            </p>
          </div>
        </div>

        <div>
        <WorkshopPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          workshop = {workshop}
        />
        </div>

      </div>
    </div>
  );
}