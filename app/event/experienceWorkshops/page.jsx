'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import ExperienceInfoBox from "../components/WorkshopInfoBox";
import EventPageShell from "../components/EventPageShell";

import { allExpWorkshops } from "../infoDatabase";


export default function ProgramPage() {
  return (
    <EventPageShell 
      title="Experience Workshops"
      description="Βυθιστείτε σε διαδραστικά εργαστήρια σχεδιασμένα να πυροδοτήσουν τη δημιουργικότητα, να ενισχύσουν τη σύνδεση και να προσφέρουν μοναδικές εμπειρίες που ξεπερνούν τη σκηνή."
    >
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allExpWorkshops.map((item, index) => (
          <ExperienceInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}