"use client";

export default function InfoBox({ time, workshop, color }) {
  const heightClass = "min-h-[150px]";

  return (
    <div
    // 3. Add a click handler and transition classes
    className={`items-center
        ${heightClass} border-2
        flex w-full transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-black rounded-[40px] mb-4`}
    style={{ backgroundColor: color,
      borderColor: color
    }}>
      
      {/* Time Section */}
      <div className={`flex-[0.3] flex items-center justify-center text-center p-2`}>
        {time}
      </div>
        
      {/* Content Section */}
        <div className="flex-1 flex-col gap-3 flex items-center justify-center text-center p-2">
            <div className="flex justify-center text-center p-2">Workshops</div>
            {workshop.map((info, index) =>
        <div key={index} className="border-b border-black/10 last:border-0 pb-1">
                <p className="font-bold">{info.title}</p>
                <p className="text-xs uppercase tracking-wider">{info.room}</p>
                </div>
        )}
        </div>
    </div>);

}
