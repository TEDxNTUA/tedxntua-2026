"use client";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";
import EventPageShell from "../components/EventPageShell";

import { mySessions1, mySessions2, mySessions3, mySessions4 } from "../infoDatabase";
import { myWorkshopsPack1, myWorkshopsPack2, myWorkshopsPack3 } from "../infoDatabase";

function ProgramSection({ children, title, id }) {
  return (
    <section id={id} className="mb-24 scroll-mt-32">
      <div className="mb-12 flex items-center gap-6">
        <div className="relative flex flex-col">
           <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.25em] text-white">
             {title}
           </h3>
           <div className="h-1 w-20 bg-emerald-400 mt-2 rounded-full" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent" />
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// Quick Navigation Component
function ProgramNav() {
  const sections = [
    { id: 'session1', label: '01' },
    { id: 'workshops1', label: 'W1' },
    { id: 'session2', label: '02' },
    { id: 'workshops2', label: 'W2' },
    { id: 'session3', label: '03' },
    { id: 'workshops3', label: 'W3' },
    { id: 'session4', label: '04' },
  ];

  return (
    <div className="sticky top-24 z-30 mb-12 hidden lg:block">
      <div className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur-xl w-fit mx-auto">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold transition-all hover:bg-emerald-400 hover:text-black border border-white/5 text-white/50"
          >
            {sec.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// The Page Component
export default function ProgramPage() {
  return (
    <EventPageShell 
      title="Program"
      description="Εξερευνήστε το πλήρες πρόγραμμα του TEDxNTUA 2026. Μια ημέρα γεμάτη ομιλίες που προκαλούν τη σκέψη, πρωτοποριακά εργαστήρια και καλλιτεχνικές παραστάσεις."
    >
      <AnchorScrollHandler />
      
      <ProgramNav />

      <div className="max-w-4xl mx-auto">
        <ProgramSection title="Opening Session" id="session1">
          {mySessions1.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Series I" id="workshops1">
          {myWorkshopsPack1.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="Second Session" id="session2">
          {mySessions2.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Series II" id="workshops2">
          {myWorkshopsPack2.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="Third Session" id="session3">
          {mySessions3.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>

        <ProgramSection title="Workshops Series III" id="workshops3">
          {myWorkshopsPack3.map((item, index) => (
            <InfoWorkshopBox key={index} {...item} />
          ))}
        </ProgramSection>

        <ProgramSection title="Final Session" id="session4">
          {mySessions4.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>
      </div>
    </EventPageShell>
  );
}
