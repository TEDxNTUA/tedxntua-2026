import AnchorScrollHandler from "./AnchorScrollHandler";
import { PerformancesInfoBox } from "./GeneralInfoBox";
import { myPerformances } from "./infoDatabase";

const allPerformances = [...myPerformances];

export default function PerformancesPage() {
  return (
    <div>
      <AnchorScrollHandler />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Performances</h1>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPerformances.map((item, index) => (
          <PerformancesInfoBox key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
