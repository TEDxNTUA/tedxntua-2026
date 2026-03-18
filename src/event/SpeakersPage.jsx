import AnchorScrollHandler from "./AnchorScrollHandler";
import SpeakersInfoBox from "./GeneralInfoBox";
import { mySpeakers1, mySpeakers2 } from "./infoDatabase";

const allSpeakers = [...mySpeakers1, ...mySpeakers2];

export default function SpeakersPage() {
  return (
    <div>
      <AnchorScrollHandler />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Speakers</h1>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allSpeakers.map((item, index) => (
          <SpeakersInfoBox key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
