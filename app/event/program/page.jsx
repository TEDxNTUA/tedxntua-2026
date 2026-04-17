import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBoxSimgular";
import InfoWorkshopBox from "../components/ProgramInfoBoxWorkshops";

import { mySpeakers1, mySpeakers3 } from "../infoDatabase";
import { mySpeakers2 } from "../infoDatabase";
import { myExperienceWorkshopsPack1 } from "../infoDatabase";
import { myProfessionalWorkshopsPack1 } from "../infoDatabase";

function ProgramSection({ title, children }) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/70 via-white/40 to-transparent" />
        <h2 className="shrink-0 text-sm font-semibold uppercase tracking-[0.28em] text-white/80">
          {title}
        </h2>
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
            <ProgramSection title="Opening - Start Time">
              {mySpeakers1.map((item, index) => (
                <InfoSpeakerBox key={index} {...item} />
              ))}
            </ProgramSection>

            <ProgramSection title="Phase 1 - Start Time">
              {mySpeakers2.map((item, index) => (
                <InfoSpeakerBox key={index} {...item} />
              ))}
            </ProgramSection>

            <ProgramSection title="Phase 1 - Start Time">
              {mySpeakers3.map((item, index) => (
                <InfoSpeakerBox key={index} {...item} />
              ))}
            </ProgramSection>

            <ProgramSection title="Phase 2 - Start Time">
              {myExperienceWorkshopsPack1.map((item, index) => (
                <InfoWorkshopBox key={index} {...item} />
              ))}
            </ProgramSection>

            <ProgramSection title="Phase 3 - Start Time">
              {myProfessionalWorkshopsPack1.map((item, index) => (
                <InfoWorkshopBox key={index} {...item} />
              ))}
            </ProgramSection>
          </div>
        </div>
      </div>
    </div>
  );
}
