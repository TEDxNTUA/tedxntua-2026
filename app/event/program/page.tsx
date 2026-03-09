import { title } from "process";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";

import { mySpeakers1 } from '../infoDatabase';
import { mySpeakers2 } from '../infoDatabase';
import { myExperienceWorkshopsPack1 } from '../infoDatabase';
import { myProfessionalWorkshopsPack1 } from '../infoDatabase';


// The Page Component
export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />
        
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
            {mySpeakers1.map((item, index) => (
              <InfoSpeakerBox key={index} {...item} />
            ))}



          <div className="w-full border-b border-white pb-4 mb-8">
            <h1 className="text-1xl font-bold text-white">
              Phase 1 - Start Time
            </h1>
          </div> 
            {mySpeakers2.map((item, index) => (
              <InfoSpeakerBox key={index} {...item} />
            ))}



          <div className="w-full border-b border-white pb-4 mb-8">
            <h1 className="text-1xl font-bold text-white">
              Phase 2 - Start Time
            </h1>
          </div> 
            {myExperienceWorkshopsPack1.map((item, index) => (
              <InfoWorkshopBox key={index} {...item} />
            ))}



          <div className="w-full border-b border-white pb-4 mb-8">
            <h1 className="text-1xl font-bold text-white">
              Phase 3 - Start Time
            </h1>
          </div> 
            {myProfessionalWorkshopsPack1.map((item, index) => (
              <InfoWorkshopBox key={index} {...item} />
            ))}
          </div>

        </div>
    </div>
  );
}
