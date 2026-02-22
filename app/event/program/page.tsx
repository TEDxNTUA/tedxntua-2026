import { title } from "process";
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoSpeakerBox from "../components/ProgramInfoBox1";
import InfoWorkshopBox from "../components/ProgramInfoBox2";

interface InfoSpeakerItem {
  time: string;
  name: string;
  title: string;
  itemColor: string;
  description: string;
}

interface Room {
  room: string;
  name: string;
}

interface InfoWorkshopItem {
  time: string;
  itemInfo: Room[];
  itemColor: string;
}


//DATABASE
//Speakers
const myDataSection1: InfoSpeakerItem[] = [
  { time: "10:00 - 11:00", name: "Legolas", title: "They are taking the Hobbits to Isengard", itemColor: "rgba(230, 57, 70, 0.3)", 
    description: "To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard " },
  { time: "11:00 - 12:00", name: "Gandalf", title: "Kazad-Dum", itemColor: "rgba(60, 116, 194, 0.3)", 
    description: "An increadible journey on how Gandalf the grey kills the Balrog and becomes Gandalf the white" }
];

const myDataSection2: InfoSpeakerItem[] = [
  { time: "12:00 - 13:00", name: "Aragorn", title: "Mountain Peak", itemColor: "rgba(168, 218, 220, 0.3)", 
    description: "Elevated energy" },
  { time: "13:00 - 14:00", name: "Bilbo", title: "Forest Whisper", itemColor: "rgba(42, 157, 143, 0.3)", 
    description: "Natural calm" },
  { time: "14:00 - 15:00", name: "Sam and Frodo", title: "City Lights", itemColor: "rgba(244, 162, 97, 0.3)", 
  description: "Urban rhythm" }
];

//Workshops
const myRooms1: Room[] = [
  {room: "Room 1", 
  name: "Lembas baking by Galadriel" },
  {room: "Room 2", 
  name: "Golden hair by Legolas"},
  {room: "Room 3", 
  name: "Stew making by Eowyn"}
];
const myDataSection3: InfoWorkshopItem[] = [
  { time: "14:00 - 15:00", 
    itemInfo: myRooms1, 
    itemColor: "rgba(204, 243, 128, 0.3)"}
];


// The Page Component
export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="program" className="min-h-[70vh] py-20 scroll-mt-24">
        
        {/* Header */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Program</h1>
         
         {/* The main content of the program page */}
         <div className="p-10 bg-black min-h-screen">
            
            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Opening - Start Time
              </h1>
            </div>    

            {myDataSection1.map((item, index) => (
              <InfoSpeakerBox key={index} {...item} />
            ))}

            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Phase 1 - Start Time
              </h1>
            </div> 

            {myDataSection2.map((item, index) => (
              <InfoSpeakerBox key={index} {...item} />
            ))}

            <div className="w-full border-b border-white pb-4 mb-8">

              <h1 className="text-1xl font-bold text-white">
                Phase 2 - Start Time
              </h1>
            </div> 

            {myDataSection3.map((item, index) => (
              <InfoWorkshopBox key={index} {...item} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
