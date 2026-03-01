import { SpeakerItem } from './types';
import { ExperienceWorkshopItem } from './types';
import { ExperienceWorkshopItemPack } from './types';


//import speaker1 from '/images/speakers/gimly1.jpg';

//Speakers
export const mySpeakers1: SpeakerItem[] = [
  { time: "10:00 - 11:00", 
    name: "Legolas", 
    profession: "talker",
    title: "They are taking the Hobbits to Isengard", 
    itemColor: "rgba(189, 149, 74, 0.3)", 
    description: "To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard To Isengard " ,
    posterImageUrl: "/eventimages/speakers/gimly1.jpg",
    personalDescription: "Hello there"}
    ,
  { time: "11:00 - 12:00", 
    name: "Gandalf", 
    profession: "talker",
    title: "Kazad-Dum", 
    itemColor: "rgba(255, 255, 255, 0.43)", 
    description: "An increadible journey on how Gandalf the grey kills the Balrog and becomes Gandalf the white", 
    posterImageUrl: "/eventimages/speakers/gimly1.jpg",
    personalDescription: "Hello there"}
];

export const mySpeakers2: SpeakerItem[] = [
  { time: "13:00 - 14:00", 
    name: "Bilbo Bagins", 
    profession: "talker",
    title: "Mountains Gandals", 
    itemColor: "rgba(230, 57, 70, 0.3)", 
    description: "The story of a mighty burgler who happend to acquire a cerain ring" ,
    posterImageUrl: "/eventimages/speakers/gimly1.jpg",
    personalDescription: "Hello there"}
    ,
  { time: "14:00 - 15:00", 
    name: "Galadriel", 
    profession: "talker",
    title: "Why i gave my hair to a dwarf", 
    itemColor: "rgba(121, 147, 183, 0.3)", 
    description: "He was a really kind dwarf", 
    posterImageUrl: "/eventimages/speakers/gimly1.jpg",
    personalDescription: "Hello there"}
    ,
    { time: "16:00 - 17:00", 
    name: "Pepegrin Took", 
    profession: "talker",
    name2: "Meriadoc Brundyback",
    profession2: "talker",
    title: "The importance of second breakfast", 
    itemColor: "rgba(109, 222, 139, 0.3)", 
    description: "Its just mandatory", 
    posterImageUrl: "/eventimages/speakers/gimly1.jpg",
    personalDescription: "Hello there"}
];


//Performances



//ExperienceWorkshops
const timeE1 = "14:00 - 15:00";
export const myExperienceWorkshops1: ExperienceWorkshopItem[] = [
  { time: timeE1, 
    room: "Room 1", 
    title: "Lembas baking by Galadriel",
    name: "Galadriel" , 
    itemColor: "rgba(204, 243, 128, 0.3)"}
    ,
    { time: timeE1, 
    room: "Room 2", 
    title: "Golden hair by Legolas",
    name: "Legolas", 
    itemColor: "rgba(204, 243, 128, 0.3)"}
    ,
    { time: timeE1, 
    room: "Room 3", 
    title: "Stew making by Eowyn",
    name: "Eowyn", 
    itemColor: "rgba(204, 243, 128, 0.3)"}
];

export const myExperienceWorkshopsPack1: ExperienceWorkshopItemPack[] = [
    {
        time: timeE1,
        workshop: myExperienceWorkshops1}
];

//ProfessionalWorkShops
const timeP1 = "17:00 - 18:00"
export const myProfessionalWorkshops1: ExperienceWorkshopItem[] = [
  { time: timeP1, 
    room: "Room 1", 
    title: "Lembas baking by Galadriel",
    name: "Galadriel" , 
    itemColor: "rgba(204, 243, 128, 0.3)"}
    ,
    { time: timeP1, 
    room: "Room 2", 
    title: "Golden hair by Legolas",
    name: "Legolas", 
    itemColor: "rgba(204, 243, 128, 0.3)"}
    ,
    { time: timeP1, 
    room: "Room 3", 
    title: "Stew making by Eowyn",
    name: "Eowyn", 
    itemColor: "rgba(204, 243, 128, 0.3)"}
];

export const myProfessionalWorkshopsPack1: ExperienceWorkshopItemPack[] = [
    {
        time: timeP1,
        workshop: myProfessionalWorkshops1}
];

//Side Happenings