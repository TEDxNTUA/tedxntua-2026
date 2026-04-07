'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ProfessionalInfoBox from "../components/WorkshopInfoBox";
import EventPageShell from "../components/EventPageShell";

import { myProfessionalWorkshops1 } from "../infoDatabase";

const allWorkshops = [...myProfessionalWorkshops1];

export default function ProgramPage() {
  return (
    <EventPageShell title="Professional Workshops">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allWorkshops.map((item, index) => (
          <ProfessionalInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
