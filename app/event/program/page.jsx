"use client";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";
import EventPageShell from "../components/EventPageShell";

import { mySessions1, mySessions2, mySessions3, mySessions4, theEnd } from "../infoDatabase";
import { myWorkshopsPack1, myWorkshopsPack2, myWorkshopsPack3 } from "../infoDatabase";

function ProgramSection({ children, title, id }) {
  return (
    <section id={id} className="mb-20 md:mb-32 scroll-mt-32">
      <div className="mb-6 md:mb-10 flex items-center gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg md:text-2xl font-black uppercase tracking-[0.3em] text-emerald-400">
            {title}
          </h3>
          <div className="h-0.5 w-8 bg-white/20 mt-2" />
        </div>
      </div>
      <div className="border-t border-white/10">{children}</div>
    </section>
  );
}

// Quick Navigation Component - Floating Minimal Pill
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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black p-1.5 backdrop-blur-2xl shadow-2xl">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="flex h-11 w-11 md:h-10 md:w-10 items-center justify-center rounded-full text-[10px] md:text-[10px] font-black transition-all hover:bg-emerald-400 hover:text-black text-white/40 hover:scale-110 active:scale-95"
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
      description=""
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

        <ProgramSection title="The End" id="theend">
          {theEnd.map((item, index) => (
            <InfoSpeakerBox key={index} {...item}/>
          ))}
        </ProgramSection>
      </div>
    </EventPageShell>
  );
}
