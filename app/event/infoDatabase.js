import { withBasePath } from "../lib/basePath";
import Speakers from "./LineUpInfo/SpeakersIT.json";
import ExpWorkshops from "./LineUpInfo/ExpWorkshopsIT.json";
{/*import ProfWorkshops from "./LineUpInfo/ProfessionalWorkshopsIT.json";
import SideHappenings from "./LineUpInfo/SideHappeningsIT.json";*/}
import Performances from "./LineUpInfo/PerformancesIT.json";

const applyPosterBasePath = (items) =>
  items.map((item) => ({
    ...item,
    posterImageUrl: withBasePath(item.posterImageUrl),
  }));

export function getSocials(i, j) {
  // 1. Declare the variable outside the block
  let socials = {}; 

  if (j == Speakers) {
    // 2. Assign the values (don't use 'const' here again)
    socials = {
      instagram: Speakers[i].Instagram,
      instagram2: Speakers[i].Instagram2,
      linkedin: Speakers[i].LinkedIn,
      facebook: Speakers[i].Facebook,
      youtube: Speakers[i].Youtube,
      tiktok: Speakers[i].TikTok,
      webpage: Speakers[i].Web,
    };
  }

  if (j == ExpWorkshops) {
    // 2. Assign the values (don't use 'const' here again)
    socials = {
      instagram: ExpWorkshops[i].Instagram,
      instagram2: ExpWorkshops[i].Instagram2,
      linkedin: ExpWorkshops[i].LinkedIn,
      facebook: ExpWorkshops[i].Facebook,
      youtube: ExpWorkshops[i].Youtube,
      tiktok: ExpWorkshops[i].TikTok,
      webpage: ExpWorkshops[i].Web,
    };
  }

  if (j == Performances) {
    // 2. Assign the values (don't use 'const' here again)
    socials = {
      instagram: Performances[i].Instagram,
      instagram2: Performances[i].Instagram2,
      linkedin: Performances[i].LinkedIn,
      facebook: Performances[i].Facebook,
      youtube: Performances[i].Youtube,
      tiktok: Performances[i].TikTok,
      webpage: Performances[i].Web,
    };
  }

  // 3. Now 'socials' is defined and accessible here
  return socials;
}

export const myEventInfo = {
  title: "TEDxNTUA 2026",
  date: "May 3, 2026",
}

export const allSpeakers = applyPosterBasePath([
{ time: "10:00 - 11:00",
  name: Speakers[0].NameGR,
  profession: Speakers[0].ProfessionGR,
  theme: Speakers[0].Theme,
  title: "Fashion as identity",
  itemColor: "rgba(189, 149, 74, 0.3)",
  description: Speakers[0].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[0].BioGR,
  socials: getSocials(0, Speakers) },

  { time: "13:00 - 14:00",
  name: Speakers[2].NameGR,
  name2: Speakers[1].NameGR,
  profession: Speakers[2].ProfessionGR,
  profession2: Speakers[1].ProfessionGR,
  theme: Speakers[1].Theme,
  title: "Crafting Architecture Stories",
  itemColor: "rgba(230, 57, 70, 0.3)",
  description: Speakers[1].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[2].BioGR,
  personalDescription2: Speakers[1].BioGR,
  socials: getSocials(2, Speakers),
  socials2: getSocials(1, Speakers) },

{ time: "14:00 - 15:00",
  name: Speakers[3].NameGR,
  profession: Speakers[3].ProfessionGR,
  theme: Speakers[3].Theme,
  title: "Why i gave my hair to a dwarf",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: Speakers[3].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[3].BioGR,
  socials: getSocials(3, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[4].NameGR,
  profession: Speakers[4].ProfessionGR,
  theme: Speakers[4].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[4].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[4].BioGR,
  socials: getSocials(4, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[5].NameGR,
  profession: Speakers[5].ProfessionGR,
  theme: Speakers[5].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[5].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[5].BioGR,
  socials: getSocials(5, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[6].NameGR,
  profession: Speakers[6].ProfessionGR,
  theme: Speakers[6].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[6].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[6].BioGR,
  socials: getSocials(6, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[7].NameGR,
  profession: Speakers[7].ProfessionGR,
  theme: Speakers[7].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[7].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[7].BioGR,
  socials: getSocials(7, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[8].NameGR,
  profession: Speakers[8].ProfessionGR,
  theme: Speakers[8].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[8].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[8].BioGR,
  socials: getSocials(8, Speakers) },

{ time: "16:00 - 17:00",
  name: Speakers[9].NameGR,
  profession: Speakers[9].ProfessionGR,
  theme: Speakers[9].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[9].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[9].BioGR,
  socials: getSocials(9, Speakers) },

{ time: "",
  name: Speakers[10].NameGR,
  profession: Speakers[10].ProfessionGR,
  theme: Speakers[10].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[10].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[10].BioGR,
  socials: getSocials(10, Speakers) },

{ time: "",
  name: Speakers[11].NameGR,
  profession: Speakers[11].ProfessionGR,
  theme: Speakers[11].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[11].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[11].BioGR,
  socials: getSocials(11, Speakers) },]);

const timeE1 = "14:00 - 15:00";
const timeP1 = "17:00 - 18:00";
export const allExpWorkshops = applyPosterBasePath([
{ time: "10:00 - 11:00",
  name: ExpWorkshops[0].NameGR,
  room: "Room 1",
  profession: ExpWorkshops[0].ProfessionGR,
  title: ExpWorkshops[0].ArtNameGR,
  itemColor: "rgba(189, 149, 74, 0.3)",
  description: ExpWorkshops[0].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: ExpWorkshops[0].BioGR,
  socials: getSocials(0, ExpWorkshops) },

{ time: "11:00 - 12:00",
  name: "Gandalf the Grey",
  room: "Room 2",
  profession: "talker",
  title: "Kazad-Dum",
  itemColor: "rgba(255, 255, 255, 0.43)",
  description: "An increadible journey on how Gandalf the grey kills the Balrog and becomes Gandalf the white",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },
  { time: "13:00 - 14:00",
  name: "Bilbo Bagins",
  profession: "talker",
  title: "Mountains Gandals",
  room: "Room 1",
  itemColor: "rgba(230, 57, 70, 0.3)",
  description: "The story of a mighty burgler who happend to acquire a cerain ring",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

{ time: "14:00 - 15:00",
  name: "Galadriel of Lothlórien",
  profession: "talker",
  title: "Why i gave my hair to a dwarf",
  room: "Room 1",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: "He was a really kind dwarf",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

{ time: "16:00 - 17:00",
  name: "Pepegrin Took",
  profession: "talker",
  name2: "Meriadoc Brundyback",
  profession2: "talker",
  title: "The importance of second breakfast",
  room: "Room 1",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: "Its just mandatory",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } }]);
export const allProfWorkshops = applyPosterBasePath([{ time: timeP1,
  room: "Room 1",
  title: "Total domination",
  name: "Fernando Alonso",
  profession: "Utter goat of rookies",
  itemColor: "rgba(204, 243, 128, 0.3)",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  }
},

{ time: timeP1,
  room: "Room 2",
  title: "How to succeed long distance relationships",
  name: "Charles Leclerc",
  profession: "2026 WDC",
  name2: "Carlos Sainz",
  profession2: "Smooth operator",
  itemColor: "rgba(204, 243, 128, 0.3)",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

{ time: timeP1,
  room: "Room 3",
  title: "Higher Bottling techniques",
  name: "Lando Norris",
  profession: "2025 WDC",
  itemColor: "rgba(204, 243, 128, 0.3)",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } }]);


export const allSideHappenings = applyPosterBasePath([{ time: "13:00 - 14:00",
  name: "Bilbo Bagins",
  profession: "talker",
  title: "Mountains Gandals",
  itemColor: "rgba(230, 57, 70, 0.3)",
  description: "The story of a mighty burgler who happend to acquire a cerain ring",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

{ time: "14:00 - 15:00",
  name: "Galadriel of Lothlórien",
  profession: "talker",
  title: "Why i gave my hair to a dwarf",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: "He was a really kind dwarf",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS',
    instagram: 'https://www.instagram.com/tedxntua/'
  } },

{ time: "16:00 - 17:00",
  name: "Pepegrin Took",
  profession: "talker",
  name2: "Meriadoc Brundyback",
  profession2: "talker",
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: "Its just mandatory",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } }]);


  export const allPerformances = applyPosterBasePath([{ time: "13:00 - 14:00",
  name: "Bilbo Bagins",
  profession: "talker",
  title: "Mountains Gandals",
  itemColor: "rgba(230, 57, 70, 0.3)",
  description: "The story of a mighty burgler who happend to acquire a cerain ring",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

{ time: "14:00 - 15:00",
  name: "Galadriel of Lothlórien",
  profession: "talker",
  title: "Why i gave my hair to a dwarf",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: "He was a really kind dwarf",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS',
    instagram: 'https://www.instagram.com/tedxntua/'
  } },

{ time: "16:00 - 17:00",
  name: "Pepegrin Took",
  profession: "talker",
  name2: "Meriadoc Brundyback",
  profession2: "talker",
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: "Its just mandatory",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } }]);






//Speakers
export const mySpeakers1 = [
allSpeakers[0],
allSpeakers[1],
allSpeakers[2],];


export const mySpeakers2 = [
allSpeakers[3],
allSpeakers[4],
allSpeakers[5],
];

export const mySpeakers3 = [
allSpeakers[6],
allSpeakers[7],
allSpeakers[8],
];



//Performances
export const myPerformances = [
allPerformances[0],
allPerformances[1],
allPerformances[2],];






//ExperienceWorkshops
export const myExperienceWorkshops1 = [
allExpWorkshops[0],
allExpWorkshops[1],
allExpWorkshops[2],];


export const myExperienceWorkshopsPack1 = [
{
  time: timeE1,
  color: "rgba(189, 149, 74, 0.3)",
  workshop: myExperienceWorkshops1 }];


//ProfessionalWorkShops
export const myProfessionalWorkshops1 = [
allProfWorkshops[0],
allProfWorkshops[1],
allProfWorkshops[2],];


export const myProfessionalWorkshopsPack1 = [
{
  time: timeP1,
  color: "rgba(204, 243, 128, 0.3)",
  workshop: myProfessionalWorkshops1 }];





//SideHappenings
export const mySideHappenings = [
allSideHappenings[0],
allSideHappenings[1],
allSideHappenings[2],];
