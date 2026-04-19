'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ProfessionalInfoBox from "../components/WorkshopInfoBox";
import EventPageShell from "../components/EventPageShell";

import { allProfWorkshops } from "../infoDatabase";

export default function ProgramPage() {
  return (
    <EventPageShell title="Professional Workshops">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allProfWorkshops.map((item, index) => (
          <ProfessionalInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
