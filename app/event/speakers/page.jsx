'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import SpeakersInfoBox from "../components/GeneralInfoBox";
import EventPageShell from "../components/EventPageShell";

import { mySpeakers1 } from "../infoDatabase";
import { mySpeakers2 } from "../infoDatabase";

const allSpeakers = [...mySpeakers1, ...mySpeakers2];

export default function ProgramPage() {
  return (
    <EventPageShell title="Speakers">
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allSpeakers.map((item, index) => (
          <SpeakersInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
