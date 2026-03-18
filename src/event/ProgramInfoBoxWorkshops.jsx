import "./styles.css";

export default function ProgramInfoBoxWorkshops({ time, workshop }) {
  const heightClass = "min-h-[150px]";

  return (
    <div
      className={`custom-card ${heightClass} border-2 flex w-full transition-all duration-300 ease-in-out cursor-pointer overflow-hidden border border-black rounded-[20px] mb-4`}
      style={{
        backgroundColor: workshop[0].itemColor,
        borderColor: workshop[0].itemColor,
      }}
    >
      <div className="flex-[0.3] flex items-center justify-center text-center p-2">
        {time}
      </div>

      <div className="flex-1 flex-col gap-3 flex items-center justify-center text-center p-2">
        <div className="flex justify-center text-center p-2">Workshops</div>
        {workshop.map((info, index) => (
          <div key={index} className="border-b border-black/10 last:border-0 pb-1">
            <p className="font-bold">{info.title}</p>
            <p className="text-xs uppercase tracking-wider">{info.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
