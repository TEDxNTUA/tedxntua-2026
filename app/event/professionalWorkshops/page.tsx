'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ProfessionalInfoBox from "../components/WorkshopInfoBox";

import { myProfessionalWorkshops1 } from '../infoDatabase';
//import {  } from '../infoDatabase';

const allWorkshops = [...myProfessionalWorkshops1];


export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="speakers">

        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Professional Workshops</h1>          
        </div>

      </section>


      <section id="speakers" className="min-h-[70vh] py-20 scroll-mt-24">

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allWorkshops.map((item, index) => (
                <ProfessionalInfoBox key={index} {...item} />
            ))}
        </div>
        
      </section>

    </div>
  );
}
