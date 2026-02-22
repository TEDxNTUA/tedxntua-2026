'use client';
import React from 'react';
import { useState } from 'react';
import SpeakersPopup from './SpeakersPopup';

// The Type definition
interface Item {
  name: string;
  name2?: string;
  title: string;
  itemColor: string;
  description: string;
  imageUrl?: string;
}


// The Component Box
const separtorLine = "border-b border-black"
const height = "h-[400px]"
const width = "w-[250px]"

export default function InfoBox({ name, name2, title, itemColor, description, imageUrl }: Item) {

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={`flex flex-col ${width} rounded-[40px] mb-5 ${height} items-center justify-center text-center ${separtorLine}`}
    onClick={() => setShowPopup(true)} // Opens the popup on click
    style={{ backgroundColor: itemColor }}>

      <div className={`flex-2 flex items-center justify-center`}>
        <p className="font-medium">
          <img src={imageUrl} alt="Speaker" className="w-[200px] h-full object-cover rounded-[10px]" />
        </p>
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center text-center`}>

        <div className={` flex items-center justify-center text-center`}>
          <h2 className="font-medium">
            {name}{name2 ? ` & ${name2}` : ''}
          </h2>
        </div>

        <div className={`flex items-center justify-center text-center`}>
          <p className="font-medium">
            {description}
          </p>
        </div>

        <div className={`flex items-center justify-center text-center`}>
          <p className="font-medium">
            {title}
          </p>
        </div>

      </div>

      <SpeakersPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        speaker={{ name, name2, title, itemColor, description, imageUrl }} // Pass the relevant speaker data here
      />

</div>
  );
}
