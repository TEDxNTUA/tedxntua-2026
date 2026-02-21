import { title } from "process";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoBox from "../components/ProgramInfoBox";

interface InfoItem {
  time: string;
  title: string;
  itemColor: string;
  description: string;
}

const myDataSection1: InfoItem[] = [
  { time: "10:00 - 11:00", title: "Desert Sun", itemColor: "rgba(230, 57, 70, 0.3)", description: "'Warm vibes'" },
  { time: "11:00 - 12:00", title: "Ocean Breeze", itemColor: "rgba(60, 116, 194, 0.3)", description: "'Cool tones'" }
];
const myDataSection2: InfoItem[] = [
  { time: "12:00 - 13:00", title: "Mountain Peak", itemColor: "rgba(168, 218, 220, 0.3)", description: "'Elevated energy'" },
  { time: "13:00 - 14:00", title: "Forest Whisper", itemColor: "rgba(42, 157, 143, 0.3)", description: "'Natural calm'" }
];
const myDataSection3: InfoItem[] = [
  { time: "14:00 - 15:00", title: "City Lights", itemColor: "rgba(244, 162, 97, 0.3)", description: "'Urban rhythm'" },
  { time: "15:00 - 16:00", title: "Starlit Night", itemColor: "rgba(59, 135, 165, 0.3)", description: "'Cosmic vibes'" }
];


// The Page Component
export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="program" className="min-h-[70vh] py-20 scroll-mt-24">
        
        {/* Header */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Program</h1>
         
         {/* The main content of the program page */}
         <div className="p-10 bg-black min-h-screen">
            
            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Opening - Start Time
              </h1>
            </div>    

            {myDataSection1.map((item, index) => (
              <InfoBox key={index} {...item} />
            ))}

            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Phase 1 - Start Time
              </h1>
            </div> 

            {myDataSection2.map((item, index) => (
              <InfoBox key={index} {...item} />
            ))}

            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Phase 2 - Start Time
              </h1>
            </div> 

            {myDataSection3.map((item, index) => (
              <InfoBox key={index} {...item} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
