'use client';
import AnchorScrollHandler from "../components/AnchorScrollHandler";
import InfoBox from "../components/SpeakersInfoBox";
import SpeakersInfoBox from "../components/SpeakersInfoBox";
import speaker1 from '../images/speakers/speaker1.jpg';
import { useState } from 'react';
import SpeakersPopup from '../components/SpeakersPopup'; // Adjust path as needed


interface InfoItem {
  name: string;
  name2?: string;
  title: string;
  itemColor: string;
  description: string;
  imageUrl?: string;
}

const myDataSection: InfoItem[] = [
  { name: "John Doe", name2: "Jane Smith", title: "Desert Sun", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Warm vibes'" 
    , imageUrl: speaker1.src
  }
  ,
  { name: "Alice Johnson", title: "Ocean Breeze", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Cool tones'"
    , imageUrl: speaker1.src
  }
  ,
  { name: "John Doe", name2: "Jane Smith", title: "Desert Sun", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Warm vibes'" 
    , imageUrl: speaker1.src
  }
  ,
  { name: "Alice Johnson", title: "Ocean Breeze", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Cool tones'"
    , imageUrl: speaker1.src
  }
  ,
  { name: "Alice Johnson", title: "Ocean Breeze", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Cool tones'"
    , imageUrl: speaker1.src
  }
  ,
  { name: "Alice Johnson", title: "Ocean Breeze", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Cool tones'"
    , imageUrl: speaker1.src
  }
  ,
  { name: "Alice Johnson", title: "Ocean Breeze", itemColor: "rgba(226, 202, 49, 0.68)", description: "'Cool tones'"
    , imageUrl: speaker1.src
  }
];


export default function ProgramPage() {
  return (
    <div>
      <AnchorScrollHandler />

      <section id="speakers">

        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Speakers</h1>          
        </div>

      </section>


      <section id="speakers" className="min-h-[70vh] py-20 scroll-mt-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {myDataSection.map((item, index) => (
                <SpeakersInfoBox key={index} {...item} />
            ))}
        </div>
      </section>

    </div>
  );
}
