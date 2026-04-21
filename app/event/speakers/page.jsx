'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import SpeakersInfoBox from "../components/GeneralInfoBox";
import EventPageShell from "../components/EventPageShell";

import { allSpeakers } from "../infoDatabase";


export default function ProgramPage() {
  return (
    <EventPageShell 
      title="Speakers"
      description="Γνωρίστε τους ομιλητές του TEDxNTUA 2026, ανθρώπους με όραμα και ιδέες που αξίζει να διαδοθούν, έτοιμους να μοιραστούν τις εμπειρίες και τις γνώσεις τους."
    >
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allSpeakers.map((item, index) => (
          <SpeakersInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
