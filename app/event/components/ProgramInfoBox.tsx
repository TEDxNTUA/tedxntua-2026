import React from 'react';

// The Type definition
interface Item {
  time: string;
  title: string;
  itemColor: string;
  description: string;
}


// The Component Box
const separtorLine = "border-r border-black"
const height = "min-h-[40px]"

export default function InfoBox({ time, title, itemColor, description }: Item) {
  return (
    <div className={`flex w-full rounded-[40px] mb-5 ${height} items-center 
    border border-black`} style={{ backgroundColor: itemColor }}>

      <div className={`flex-1 flex items-center justify-center text-center ${separtorLine}`}>
        {time}
        </div>
        
      <div className={`flex-1 flex-col items-center justify-center text-center`}>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
