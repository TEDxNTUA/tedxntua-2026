import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";
import EventPageShell from "../components/EventPageShell";

import { mySessions1, mySessions2, mySessions3, mySessions4 } from "../infoDatabase";
import { myWorkshopsPack1, myWorkshopsPack2, myWorkshopsPack3 } from "../infoDatabase";

function ProgramSection({ profession, children, title }) {
  return (
    <section className="mb-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/50 via-emerald-400/10 to-transparent" />
        <h3 className="text-xl font-black uppercase tracking-[0.2em] text-emerald-400/90">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

// The Page Component
export default function ProgramPage() {
  return (
    <EventPageShell 
      title="Program"
      description="Εδώ θα βρείτε το πλήρες πρόγραμμα του TEDxNTUA 2026, με όλες τις ομιλίες και τα εργαστήρια που θα πραγματοποιηθούν κατά τη διάρκεια της εκδήλωσης."
    >
      <AnchorScrollHandler />

      <div className="space-y-4">
        <ProgramSection title="1st Session">
          {mySessions1.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Set 1">
          {myWorkshopsPack1.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="2nd Session">
          {mySessions2.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Set 2">
          {myWorkshopsPack2.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="3rd Session">
          {mySessions3.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Set 3">
          {myWorkshopsPack3.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="4th Session">
          {mySessions4.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>
      </div>
    </EventPageShell>
  );
}
