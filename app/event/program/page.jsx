import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";

import { mySessions1, mySessions2, mySessions3, mySessions4 } from "../infoDatabase";
import { myWorkshopsPack1, myWorkshopsPack2, myWorkshopsPack3 } from "../infoDatabase";

function ProgramSection({ profession, children, title }) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/70 via-white/40 to-transparent" />
        <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
      </div>
      <div>{children}</div>
    </section>
  );
}

// The Page Component
export default function ProgramPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.22),transparent_34%),linear-gradient(180deg,#07110d_0%,#050907_100%)] text-white">
      <AnchorScrollHandler />

      <div className="pointer-events-none absolute left-[-10%] top-28 h-72 w-72 rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-80 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-[2.25rem] border border-white/14 bg-black/45 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="mb-10 flex flex-col gap-5 border-b border-white/12 pb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Program
            </h1>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                  Εδώ θα βρείτε το πλήρες πρόγραμμα του TEDxNTUA 2026, με όλες τις ομιλίες και τα εργαστήρια που θα πραγματοποιηθούν κατά τη διάρκεια της εκδήλωσης.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <ProgramSection title="1st Session - Start Time">
              {mySessions1.map((item, index) => (
                <InfoSpeakerBox key={index} {...item}/>
              ))}
            </ProgramSection>



            <ProgramSection title="Workshops - Start Time">
              {myWorkshopsPack1.map((item, index) => (
                <InfoWorkshopBox key={index} {...item} />
              ))}
            </ProgramSection>



            <ProgramSection title="2nd Session - Start Time">
              {mySessions2.map((item, index) => (
                <InfoSpeakerBox key={index} {...item}/>
              ))}
            </ProgramSection>



            <ProgramSection title="Workshops - Start Time">
              {myWorkshopsPack2.map((item, index) => (
                <InfoWorkshopBox key={index} {...item} />
              ))}
            </ProgramSection>



            <ProgramSection title="3rd Session - Start Time">
              {mySessions3.map((item, index) => (
                <InfoSpeakerBox key={index} {...item}/>
              ))}
            </ProgramSection>



          <ProgramSection title="Workshops - Start Time">
              {myWorkshopsPack3.map((item, index) => (
                <InfoWorkshopBox key={index} {...item} />
              ))}
            </ProgramSection>



            <ProgramSection title="4th Session - Start Time">
              {mySessions4.map((item, index) => (
                <InfoSpeakerBox key={index} {...item}/>
              ))}
            </ProgramSection>

          </div>
        </div>
      </div>
    </div>
  );
}
