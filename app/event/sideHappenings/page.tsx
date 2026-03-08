'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import PerformancesInfoBox from "../components/GeneralInfoBox";

import { mySideHappenings } from '../infoDatabase';

const allSideHappenings = [...mySideHappenings];


export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="speakers">

        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Side Happenings</h1>
        </div>

      </section>


      <section id="speakers" className="min-h-[70vh] py-20 scroll-mt-24">

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allSideHappenings.map((item, index) => (
                <PerformancesInfoBox key={index} {...item} />
            ))}
        </div>
        
      </section>

    </div>
  );
}
