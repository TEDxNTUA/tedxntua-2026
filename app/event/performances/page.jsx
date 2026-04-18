'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import {PerformancesInfoBox} from "../components/GeneralInfoBox";
import EventPageShell from "../components/EventPageShell";

import { allPerformances } from "../infoDatabase";

export default function ProgramPage() {
  return (
    <EventPageShell title="Performances">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPerformances.map((item, index) => (
          <PerformancesInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
