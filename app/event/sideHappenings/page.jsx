'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import { SideHappeningsInfoBox } from "../components/GeneralInfoBox";
import EventPageShell from "../components/EventPageShell";

import { mySideHappenings } from "../infoDatabase";

const allSideHappenings = [...mySideHappenings];

export default function ProgramPage() {
  return (
    <EventPageShell 
      title="Side Happenings"
      description="Εξερευνήστε τη ζωντανή ατμόσφαιρα του TEDxNTUA με μια ποικιλία διαδραστικών δραστηριοτήτων, ευκαιριών δικτύωσης και εκπλήξεων καθ' όλη τη διάρκεια της ημέρας."
    >
      <AnchorScrollHandler />
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allSideHappenings.map((item, index) => (
          <SideHappeningsInfoBox key={index} {...item} />
        ))}
      </div>
    </EventPageShell>
  );
}
