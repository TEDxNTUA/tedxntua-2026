import { withBasePath } from "../lib/basePath";
import Speakers from "./LineUpInfo/Speakers.json";

const applyPosterBasePath = (items) =>
  items.map((item) => ({
    ...item,
    posterImageUrl: withBasePath(item.posterImageUrl),
  }));

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
  socials: {
    instagram: Speakers[0].Instagram,
    instagram2: Speakers[0].Instagram2,
    linkedin: Speakers[0].LinkedIn,
    facebook: Speakers[0].Facebook,
    youtube: Speakers[0].Youtube,
    tiktok: Speakers[0].TikTok,
    webpage: Speakers[0].Web,
  } },

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
  socials: {
    instagram: Speakers[2].Instagram,
    instagram2: Speakers[2].Instagram2,
    linkedin: Speakers[2].LinkedIn,
    facebook: Speakers[2].Facebook,
    youtube: Speakers[2].Youtube,
    tiktok: Speakers[2].TikTok,
    webpage: Speakers[2].Web
  },
  socials2: {
    instagram: Speakers[1].Instagram,
    instagram2: Speakers[1].Instagram2,
    linkedin: Speakers[1].LinkedIn,
    facebook: Speakers[1].Facebook,
    youtube: Speakers[1].Youtube,
    tiktok: Speakers[1].TikTok,
    webpage: Speakers[1].Web
  } },

{ time: "14:00 - 15:00",
  name: Speakers[3].NameGR,
  profession: Speakers[3].ProfessionGR,
  theme: Speakers[3].Theme,
  title: "Why i gave my hair to a dwarf",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: Speakers[3].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[3].BioGR,
  socials: {
    instagram: Speakers[3].Instagram,
    instagram2: Speakers[3].Instagram2,
    linkedin: Speakers[3].LinkedIn,
    facebook: Speakers[3].Facebook,
    youtube: Speakers[3].Youtube,
    tiktok: Speakers[3].TikTok,
    webpage: Speakers[3].Web
  } },

{ time: "16:00 - 17:00",
  name: Speakers[4].NameGR,
  profession: Speakers[4].ProfessionGR,
  theme: Speakers[4].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[4].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[4].BioGR,
  socials: {
    instagram: Speakers[4].Instagram,
    instagram2: Speakers[4].Instagram2,
    linkedin: Speakers[4].LinkedIn,
    facebook: Speakers[4].Facebook,
    youtube: Speakers[4].Youtube,
    tiktok: Speakers[4].TikTok,
    webpage: Speakers[4].Web
  }},

{ time: "16:00 - 17:00",
  name: Speakers[5].NameGR,
  profession: Speakers[5].ProfessionGR,
  theme: Speakers[5].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[5].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[5].BioGR,
  socials: {
    instagram: Speakers[5].Instagram,
    instagram2: Speakers[5].Instagram2,
    linkedin: Speakers[5].LinkedIn,
    facebook: Speakers[5].Facebook,
    youtube: Speakers[5].Youtube,
    tiktok: Speakers[5].TikTok,
    webpage: Speakers[5].Web
  }},

{ time: "16:00 - 17:00",
  name: Speakers[6].NameGR,
  profession: Speakers[6].ProfessionGR,
  theme: Speakers[6].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[6].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[6].BioGR,
  socials: {
    instagram: Speakers[6].Instagram,
    instagram2: Speakers[6].Instagram2,
    linkedin: Speakers[6].LinkedIn,
    facebook: Speakers[6].Facebook,
    youtube: Speakers[6].Youtube,
    tiktok: Speakers[6].TikTok,
    webpage: Speakers[6].Web
  }},

{ time: "16:00 - 17:00",
  name: Speakers[7].NameGR,
  profession: Speakers[7].ProfessionGR,
  theme: Speakers[7].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[7].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[7].BioGR,
  socials: {
    instagram: Speakers[7].Instagram,
    instagram2: Speakers[7].Instagram2,
    linkedin: Speakers[7].LinkedIn,
    facebook: Speakers[7].Facebook,
    youtube: Speakers[7].Youtube,
    tiktok: Speakers[7].TikTok,
    webpage: Speakers[7].Web
  }},

{ time: "16:00 - 17:00",
  name: Speakers[8].NameGR,
  profession: Speakers[8].ProfessionGR,
  theme: Speakers[8].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[8].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[8].BioGR,
  socials: {
    instagram: Speakers[8].Instagram,
    instagram2: Speakers[8].Instagram2,
    linkedin: Speakers[8].LinkedIn,
    facebook: Speakers[8].Facebook,
    youtube: Speakers[8].Youtube,
    tiktok: Speakers[8].TikTok,
    webpage: Speakers[8].Web
  }},

{ time: "16:00 - 17:00",
  name: Speakers[9].NameGR,
  profession: Speakers[9].ProfessionGR,
  theme: Speakers[9].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[9].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[9].BioGR,
  socials: {
    instagram: Speakers[9].Instagram,
    instagram2: Speakers[9].Instagram2,
    linkedin: Speakers[9].LinkedIn,
    facebook: Speakers[9].Facebook,
    youtube: Speakers[9].Youtube,
    tiktok: Speakers[9].TikTok,
    webpage: Speakers[9].Web
  }},

{ time: "",
  name: Speakers[10].NameGR,
  profession: Speakers[10].ProfessionGR,
  theme: Speakers[10].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[10].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[10].BioGR,
  socials: {
    instagram: Speakers[10].Instagram,
    instagram2: Speakers[10].Instagram2,
    linkedin: Speakers[10].LinkedIn,
    facebook: Speakers[10].Facebook,
    youtube: Speakers[10].Youtube,
    tiktok: Speakers[10].TikTok,
    webpage: Speakers[10].Web
  }},

{ time: "",
  name: Speakers[11].NameGR,
  profession: Speakers[11].ProfessionGR,
  theme: Speakers[11].Theme,
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: Speakers[11].DescriptionGR,
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: Speakers[11].BioGR,
  socials: {
    instagram: Speakers[11].Instagram,
    instagram2: Speakers[11].Instagram2,
    linkedin: Speakers[11].LinkedIn,
    facebook: Speakers[11].Facebook,
    youtube: Speakers[11].Youtube,
    tiktok: Speakers[11].TikTok,
    webpage: Speakers[11].Web
  }}]);

const timeE1 = "14:00 - 15:00";
const timeP1 = "17:00 - 18:00";
export const allExpWorkshops = applyPosterBasePath([
{ time: "10:00 - 11:00",
  name: "Legolas",
  room: "Room 1",
  profession: "talker",
  title: "They are taking the Hobbits to Isengard",
  itemColor: "rgba(189, 149, 74, 0.3)",
  description: "To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard ",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Hello there",
  socials: {
    youtube: 'https://youtube.com/playlist?list=PLd7-PjFC85gz9xYWxVVqTddWLg75c8jZU&si=hBMWFunVtHqfXeWS'
  } },

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
