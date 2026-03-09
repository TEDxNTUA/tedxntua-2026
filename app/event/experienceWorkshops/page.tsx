'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ExperienceInfoBox from "../components/WorkshopInfoBox";

import { myExperienceWorkshops1 } from '../infoDatabase';
//import {  } from '../infoDatabase';

const allWorkshops = [...myExperienceWorkshops1];


export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Experience Workshops</h1>          
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWorkshops.map((item, index) => (
                <ExperienceInfoBox key={index} {...item} />
            ))}
        </div>
    </div>
  );
}
