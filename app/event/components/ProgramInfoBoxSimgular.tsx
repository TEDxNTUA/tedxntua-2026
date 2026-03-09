"use client";
import { useState } from 'react';
import './styles.css';
import {SpeakerItem} from '../types'


const separtorLine = "border-r border-black";

export default function InfoBox({ time, name, title, itemColor, description }: SpeakerItem) {
  // 1. Create the state (false = small, true = expanded)
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Define heights (min-h for the base, transition for smoothness)
  // We use a fixed height or max-height for the 'expanded' state
  const heightClass = isExpanded ? "min-h-[170px]" : "min-h-[40px]";
  const boderClass = isExpanded ? "border-black" : "border-white";

  return (
    <div 
      // 3. Add a click handler and transition classes
      onClick={() => setIsExpanded(!isExpanded)}
      className={`custom-card 
        ${heightClass} border-2
        flex w-full transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-black rounded-[20px] mb-4`} 
      style={{ backgroundColor: itemColor, 
        borderColor: !isExpanded ? itemColor : 'white',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Time Section */}
      <div className={`flex-[0.3] flex items-center justify-center text-center ${separtorLine} p-2`}>
        {time}
      </div>
        
      {/* Content Section */}
      <div className={`flex-1 flex flex-col items-center justify-center text-center p-2`}>
        <p className="font-bold">{name}</p>
        
        {/* 4. Only show description if expanded (optional) or let it reveal */}
        {isExpanded && (
          <p className="text-sm mt-3 animate-fadeIn">"{title}"</p>
        )}
        {isExpanded && (
          <p className="text-sm mt-2 animate-fadeIn">{description}</p>
        )}
      </div>
    </div>
  );
}