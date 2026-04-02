'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ExperienceInfoBox from "../components/WorkshopInfoBox";
import EventPageShell from "../components/EventPageShell";

import { myExperienceWorkshops1 } from "../infoDatabase";

const allWorkshops = [...myExperienceWorkshops1];

export default function ProgramPage() {
  return (
    <EventPageShell title="Experience Workshops">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allWorkshops.map((item, index) => (
          <ExperienceInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
