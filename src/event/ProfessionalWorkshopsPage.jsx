import AnchorScrollHandler from "./AnchorScrollHandler";
import { ProfessionalInfoBox } from "./WorkshopInfoBox";
import { myProfessionalWorkshops1 } from "./infoDatabase";

const allWorkshops = [...myProfessionalWorkshops1];

export default function ProfessionalWorkshopsPage() {
  return (
    <div>
      <AnchorScrollHandler />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Professional Workshops</h1>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allWorkshops.map((item, index) => (
          <ProfessionalInfoBox key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
