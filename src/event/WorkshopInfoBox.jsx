import { useState } from "react";
import WorkshopPopup from "./WorkshopPopup";
import { SocialButton } from "./SocialButton";

const separatorLine = "border-b border-white";
const height = "530";
const width = "320";
const imgWidth = "280";
const imgHeight = "380";

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

export default function ExperienceInfoBox(workshop) {
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
        <img src={workshop.posterImageUrl} alt="Workshop" />
      </div>

      <section className="mt-4">
        <SocialConnection {...workshop.socials} />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6">
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ""}
          </h1>
        </div>
        <div>
          <p className="font-medium mb-1">
            {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ""}
          </p>
        </div>
      </div>

      <WorkshopPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        workshop={workshop}
      />
    </div>
  );
}

export function ProfessionalInfoBox(workshop) {
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
        <img src={workshop.posterImageUrl} alt="Workshop" />
      </div>

      <section className="mt-4">
        <SocialConnection {...workshop.socials} />
      </section>

      <div className="flex-1 flex items-center flex-col w-full px-6">
        <div>
          <h1 className="text-large mb-1 font-bold uppercase">
            {workshop.name}{workshop.name2 ? ` & ${workshop.name2}` : ""}
          </h1>
        </div>
        <div>
          <p className="font-medium mb-1">
            {workshop.profession}{workshop.profession2 ? ` & ${workshop.profession2}` : ""}
          </p>
        </div>
      </div>

      <WorkshopPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        workshop={workshop}
      />
    </div>
  );
}
