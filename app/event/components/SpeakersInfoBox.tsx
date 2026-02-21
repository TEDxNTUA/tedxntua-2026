import React from 'react';

// The Type definition
interface Item {
  Name: string;
  Name2?: string;
  title: string;
  itemColor: string;
  description: string;
}


// The Component Box
const separtorLine = "border-r border-black"
const height = "min-h-[40px]"

export default function InfoBox({ Name, Name2, title, itemColor, description }: Item) {
  return (
    <div className={`flex w-full rounded-[40px] mb-5 ${height} items-center 
    border border-black`} style={{ backgroundColor: itemColor }}>

      <div className={`flex-1 flex items-center justify-center text-center ${separtorLine}`}>
        {Name}{Name2 ? ` & ${Name2}` : ''}
        </div>
      <div className={`flex-1 flex-col items-center justify-center text-center`}>
        <p className="font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
