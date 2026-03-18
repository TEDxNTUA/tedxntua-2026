import { useState } from "react";
import Popup from "./InfoPopup";
import { SocialButton } from "./SocialButton";

const separatorLine = "border-b border-white";
const height = "550";
const width = "320";
const imgWidth = "280";
const imgHeight = "360";

function SocialConnection(socials = {}) {
  const entries = Object.entries(socials);

  return (
    <>
      {entries.map(([platformName, url]) => {
        if (!url) return null;

        return (
          <SocialButton
            key={platformName}
            name={platformName}
            urlLink={url}
            size="35px"
          />
        );
      })}
    </>
  );
}

export default function SpeakerInfoBox(speaker) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`flex flex-col mb-7 items-center ${separatorLine} bg-black cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}
    >
      <div
        className="flex-1 flex items-center justify-center mt-6"
        style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
      >
        <img src={speaker.posterImageUrl} alt="Speaker" />
      </div>

      <section className="mt-4">
        <SocialConnection {...speaker.socials} />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6">
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {speaker.name}{speaker.name2 ? ` & ${speaker.name2}` : ""}
          </h1>
        </div>
        <div>
          <p className="font-medium mb-1">
            {speaker.profession}{speaker.profession2 ? ` & ${speaker.profession2}` : ""}
          </p>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={speaker}
      />
    </div>
  );
}

export function PerformancesInfoBox(performance) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`flex flex-col mb-5 items-center ${separatorLine} bg-black cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}
    >
      <div
        className="flex-1 flex items-center justify-center mt-4"
        style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
      >
        <img src={performance.posterImageUrl} alt="Speaker" />
      </div>

      <section className="mt-4">
        <SocialConnection {...performance.socials} />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6">
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {performance.name}{performance.name2 ? ` & ${performance.name2}` : ""}
          </h1>
        </div>
        <div>
          <p className="font-medium mb-1">
            {performance.profession}{performance.profession2 ? ` & ${performance.profession2}` : ""}
          </p>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={performance}
      />
    </div>
  );
}

export function SideHappeningsInfoBox(sideHappening) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`flex flex-col mb-5 items-center ${separatorLine} bg-black cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={() => setShowPopup(true)}
    >
      <div
        className="flex-1 flex items-center justify-center mt-4"
        style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
      >
        <img src={sideHappening.posterImageUrl} alt="Speaker" />
      </div>

      <section className="mt-4">
        <SocialConnection {...sideHappening.socials} />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6">
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {sideHappening.name}{sideHappening.name2 ? ` & ${sideHappening.name2}` : ""}
          </h1>
        </div>
        <div>
          <p className="font-medium mb-1">
            {sideHappening.profession}{sideHappening.profession2 ? ` & ${sideHappening.profession2}` : ""}
          </p>
        </div>
      </div>

      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        infoBase={sideHappening}
      />
    </div>
  );
}
