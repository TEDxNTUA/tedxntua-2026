'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ExperienceInfoBox from "../components/WorkshopInfoBox";
import EventPageShell from "../components/EventPageShell";

import { allExpWorkshops } from "../infoDatabase";


export default function ProgramPage() {
  return (
    <EventPageShell title="Experience Workshops">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allExpWorkshops.map((item, index) => (
          <ExperienceInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}