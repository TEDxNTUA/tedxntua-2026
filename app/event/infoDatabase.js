import { withBasePath } from "../lib/basePath";
import Speakers from "./LineUpInfo/SpeakersIT.json";
import ExpWorkshops from "./LineUpInfo/ExpWorkshopsIT.json";
// import ProfWorkshops from "./LineUpInfo/ProfessionalWorkshopsIT.json";
// import SideHappenings from "./LineUpInfo/SideHappeningsIT.json";
import Performances from "./LineUpInfo/PerformancesIT.json";

const DEFAULT_POSTER_IMAGE = "/eventimages/speakers/grogyResol.jpg";
const EXPERIENCE_WORKSHOP_TIME = "14:00 - 15:00";
const PROFESSIONAL_WORKSHOP_TIME = "17:00 - 18:00";
const SPEAKER_ITEM_COLOR = "rgba(102, 187, 128, 0.28)";
const PERFORMANCE_ITEM_COLOR = "rgba(98, 156, 227, 0.28)";

const applyPosterBasePath = (items) =>
  items.map((item) => ({
    ...item,
    posterImageUrl: withBasePath(item.posterImageUrl),
  }));

// Normalize the social links shape across all JSON sources.
const getSocials = (collection, index) => ({
  instagram: collection[index].Instagram,
  instagram2: collection[index].Instagram2,
  linkedin: collection[index].LinkedIn,
  facebook: collection[index].Facebook,
  youtube: collection[index].Youtube,
  tiktok: collection[index].TikTok,
  webpage: collection[index].Web,
});

export const myEventInfo = {
  title: "TEDxNTUA 2026",
  date: "May 9, 2026",
};

// Speakers
export const allSpeakers = applyPosterBasePath([
  {
    time: "10:00 - 11:00",
    itemCategory: "speaker",
    name: Speakers[0].NameGR,
    profession: Speakers[0].ProfessionGR,
    theme: Speakers[0].Theme,
    title: "Fashion as identity",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[0].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[0].BioGR,
    socials: getSocials(Speakers, 0),
  },
  {
    time: "13:00 - 14:00",
    itemCategory: "speaker",
    name: Speakers[2].NameGR,
    name2: Speakers[1].NameGR,
    profession: Speakers[2].ProfessionGR,
    profession2: Speakers[1].ProfessionGR,
    theme: Speakers[1].Theme,
    title: "Crafting Architecture Stories",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[1].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[2].BioGR,
    personalDescription2: Speakers[1].BioGR,
    socials: getSocials(Speakers, 2),
    socials2: getSocials(Speakers, 1),
  },
  {
    time: "14:00 - 15:00",
    itemCategory: "speaker",
    name: Speakers[3].NameGR,
    profession: Speakers[3].ProfessionGR,
    theme: Speakers[3].Theme,
    title: "Why i gave my hair to a dwarf",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[3].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[3].BioGR,
    socials: getSocials(Speakers, 3),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[4].NameGR,
    profession: Speakers[4].ProfessionGR,
    theme: Speakers[4].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[4].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[4].BioGR,
    socials: getSocials(Speakers, 4),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[5].NameGR,
    profession: Speakers[5].ProfessionGR,
    theme: Speakers[5].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[5].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[5].BioGR,
    socials: getSocials(Speakers, 5),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[6].NameGR,
    profession: Speakers[6].ProfessionGR,
    theme: Speakers[6].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[6].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[6].BioGR,
    socials: getSocials(Speakers, 6),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[7].NameGR,
    profession: Speakers[7].ProfessionGR,
    theme: Speakers[7].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[7].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[7].BioGR,
    socials: getSocials(Speakers, 7),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[8].NameGR,
    profession: Speakers[8].ProfessionGR,
    theme: Speakers[8].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[8].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[8].BioGR,
    socials: getSocials(Speakers, 8),
  },
  {
    time: "16:00 - 17:00",
    itemCategory: "speaker",
    name: Speakers[9].NameGR,
    profession: Speakers[9].ProfessionGR,
    theme: Speakers[9].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[9].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[9].BioGR,
    socials: getSocials(Speakers, 9),
  },
  {
    time: "",
    itemCategory: "",
    name: Speakers[10].NameGR,
    profession: Speakers[10].ProfessionGR,
    theme: Speakers[10].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[10].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[10].BioGR,
    socials: getSocials(Speakers, 10),
  },
  {
    time: "",
    itemCategory: "",
    name: Speakers[11].NameGR,
    profession: Speakers[11].ProfessionGR,
    theme: Speakers[11].Theme,
    title: "The importance of second breakfast",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[11].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Speakers[11].BioGR,
    socials: getSocials(Speakers, 11),
  },
]);

// Experience workshops
export const allExpWorkshops = applyPosterBasePath([
  {
    time: "10:00 - 11:00",
    name: ExpWorkshops[0].NameGR,
    room: "Room 1",
    profession: ExpWorkshops[0].ProfessionGR,
    title: ExpWorkshops[0].ArtNameGR,
    itemColor: "rgba(189, 149, 74, 0.3)",
    description: ExpWorkshops[0].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: ExpWorkshops[0].BioGR,
    socials: getSocials(ExpWorkshops, 0),
  },
  {
    time: "11:00 - 12:00",
    name: ExpWorkshops[1].NameGR,
    room: "Room 2",
    profession: ExpWorkshops[1].ProfessionGR,
    title: ExpWorkshops[1].ArtNameGR,
    itemColor: "rgba(255, 255, 255, 0.43)",
    description: ExpWorkshops[1].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: ExpWorkshops[1].BioGR,
    socials: getSocials(ExpWorkshops, 1),
  },
  {
    time: "13:00 - 14:00",
    name: ExpWorkshops[2].NameGR,
    room: "Room 1",
    profession: ExpWorkshops[2].ProfessionGR,
    title: ExpWorkshops[2].ArtNameGR,
    itemColor: "rgba(230, 57, 70, 0.3)",
    description: ExpWorkshops[2].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: ExpWorkshops[2].BioGR,
    socials: getSocials(ExpWorkshops, 2),
  },
]);

// Placeholder entries are kept here for sections that do not yet come from JSON.
export const allProfWorkshops = applyPosterBasePath([
  {
    time: PROFESSIONAL_WORKSHOP_TIME,
    room: "Room 1",
    title: "Total domination",
    name: "Fernando Alonso",
    profession: "Utter goat of rookies",
    itemColor: "rgba(204, 243, 128, 0.3)",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
    },
  },
  {
    time: PROFESSIONAL_WORKSHOP_TIME,
    room: "Room 2",
    title: "How to succeed long distance relationships",
    name: "Charles Leclerc",
    profession: "2026 WDC",
    name2: "Carlos Sainz",
    profession2: "Smooth operator",
    itemColor: "rgba(204, 243, 128, 0.3)",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
    },
  },
  {
    time: PROFESSIONAL_WORKSHOP_TIME,
    room: "Room 3",
    title: "Higher Bottling techniques",
    name: "Lando Norris",
    profession: "2025 WDC",
    itemColor: "rgba(204, 243, 128, 0.3)",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
    },
  },
]);

export const allSideHappenings = applyPosterBasePath([
  {
    time: "13:00 - 14:00",
    name: "Bilbo Bagins",
    profession: "talker",
    title: "Mountains Gandals",
    itemColor: "rgba(230, 57, 70, 0.3)",
    description: "The story of a mighty burgler who happend to acquire a cerain ring",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: "Hello there",
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
    },
  },
  {
    time: "14:00 - 15:00",
    name: "Galadriel of LothlΓ³rien",
    profession: "talker",
    title: "Why i gave my hair to a dwarf",
    itemColor: "rgba(121, 147, 183, 0.3)",
    description: "He was a really kind dwarf",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: "Hello there",
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
      instagram: "https://www.instagram.com/tedxntua/",
    },
  },
  {
    time: "16:00 - 17:00",
    name: "Pepegrin Took",
    profession: "talker",
    name2: "Meriadoc Brundyback",
    profession2: "talker",
    title: "The importance of second breakfast",
    itemColor: "rgba(109, 222, 139, 0.3)",
    description: "Its just mandatory",
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: "Hello there",
    socials: {
      youtube:
        "https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS",
    },
  },
]);

// Performances
export const allPerformances = applyPosterBasePath([
  {
    time: "13:00 - 14:00",
    name: Performances[0].NameGR,
    itemCategory: "performance",
    profession: Performances[0].ProfessionGR,
    artName: Performances[0].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[0].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Performances[0].BioGR,
    socials: getSocials(Performances, 0),
  },
  {
    time: "14:00 - 15:00",
    name: Performances[1].NameGR,
    itemCategory: "performance",
    profession: Performances[1].ProfessionGR,
    artName: Performances[1].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[1].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Performances[1].BioGR,
    socials: getSocials(Performances, 1),
  },
  {
    time: "16:00 - 17:00",
    name: Performances[2].NameGR,
    itemCategory: "performance",
    profession: Performances[2].ProfessionGR,
    artName: Performances[2].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[2].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Performances[2].BioGR,
    socials: getSocials(Performances, 2),
  },
  {
    time: "16:00 - 17:00",
    name: Performances[3].NameGR,
    itemCategory: "performance",
    profession: Performances[3].ProfessionGR,
    artName: Performances[3].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[3].DescriptionGR,
    posterImageUrl: DEFAULT_POSTER_IMAGE,
    personalDescription: Performances[3].BioGR,
    socials: getSocials(Performances, 3),
  },
]);

// Session groupings consumed by the program UI.
export const mySessions1 = [allSpeakers[0], allSpeakers[6]];

export const mySessions2 = [
  allPerformances[0],
  allSpeakers[1],
  allSpeakers[5],
  allSpeakers[3],
];

export const mySessions3 = [
  allPerformances[3],
  allSpeakers[4],
  allSpeakers[8],
  allPerformances[1]
];

export const mySessions4 = [
  allSpeakers[2], 
  allSpeakers[7], 
  allPerformances[2]];

// Experience workshops
export const myExperienceWorkshopsPack1 = [
  {
    time: EXPERIENCE_WORKSHOP_TIME,
    color: "rgba(92, 169, 149, 0.47)",
    workshop: [
      allExpWorkshops[0],
      allExpWorkshops[1],
      allExpWorkshops[2],
    ],
  },
];

// Professional workshops
export const myProfessionalWorkshopsPack1 = [
  {
    time: PROFESSIONAL_WORKSHOP_TIME,
    color: "rgba(204, 243, 128, 0.3)",
    workshop: [
      allProfWorkshops[0],
      allProfWorkshops[1],
      allProfWorkshops[2],
    ],
  },
];

// Side happenings
export const mySideHappenings = [
  allSideHappenings[0],
  allSideHappenings[1],
  allSideHappenings[2],
];
