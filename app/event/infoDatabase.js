import { withBasePath } from "../lib/basePath";
import Speakers from "./LineUpInfo/SpeakersIT.json";
import ExpWorkshops from "./LineUpInfo/ExpWorkshopsIT.json";
import ProfWorkshops from "./LineUpInfo/ProfWorkshopsIT.json";
// import SideHappenings from "./LineUpInfo/SideHappeningsIT.json";
import Performances from "./LineUpInfo/PerformancesIT.json";

const DEFAULT_POSTER_IMAGE = "/eventimages/speakers/grogyResol.webp";
const WORKSHOP_TIME_1 = "12:30 - 13:45";
const WORKSHOP_TIME_2 = "15:00 - 16:15";
const WORKSHOP_TIME_3 = "17:25 - 18:40";
const SPEAKER_ITEM_COLOR = "rgba(102, 187, 128, 0.28)";
const PERFORMANCE_ITEM_COLOR = "rgba(98, 156, 227, 0.28)";
const EXTRA_ITEM_COLOR = "rgba(213, 128, 30, 0.28)";

const applyPosterBasePath = (items) =>
  items.map((item) => ({
    ...item,
    posterImageUrl:
      item.posterImageUrl &&
      (item.posterImageUrl.startsWith("http://") ||
        item.posterImageUrl.startsWith("https://"))
        ? item.posterImageUrl
        : withBasePath(item.posterImageUrl),
  }));

// Normalize the social links shape across all JSON sources.
const getSocials = (collection, index) => ({
  instagram: collection[index].Instagram,
  instagram2: collection[index].Instagram2,
  linkedin: collection[index].LinkedIn,
  facebook: collection[index].Facebook,
  youtube: collection[index].Youtube,
  tiktok: collection[index].TikTok,
  webpage: collection[index].Web
});

export const myEventInfo = {
  title: "TEDxNTUA 2026",
  date: "May 9, 2026",
};

// Speakers
export const allSpeakers = applyPosterBasePath([
  // Speakers[0] = Eleni Kavvada
  {
    time: "11:50",
    itemCategory: "speaker",
    name: Speakers[0].NameEN,
    profession: Speakers[0].ProfessionEN,
    theme: Speakers[0].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[0].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_KAVVADA.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[0].BioGR,
    socials: getSocials(Speakers, 0)
  },
  // Speakers[2] = Thanos Ioannidis, Speakers[1] = Chara Kontochristou
  {
    time: "14:00",
    itemCategory: "speaker",
    name: Speakers[2].NameEN,
    name2: Speakers[1].NameEN,
    profession: Speakers[2].ProfessionEN,
    profession2: Speakers[1].ProfessionEN,
    theme: Speakers[1].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[1].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Thanos&Chara.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[2].BioGR,
    personalDescription2: Speakers[1].BioGR,
    socials: getSocials(Speakers, 2),
    socials2: getSocials(Speakers, 1)
  },
  // Speakers[3] = Yannis Daglis
  {
    time: "18:40",
    itemCategory: "speaker",
    name: Speakers[3].NameEN,
    profession: Speakers[3].ProfessionEN,
    theme: Speakers[3].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[3].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Daglis.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[3].BioGR,
    socials: getSocials(Speakers, 3)
  },
  // Speakers[4] = Dimitris Barmpas
  {
    time: "14:40",
    itemCategory: "speaker",
    name: Speakers[4].NameEN,
    profession: Speakers[4].ProfessionEN,
    theme: Speakers[4].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[4].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Mr Music.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[4].BioGR,
    socials: getSocials(Speakers, 4)
  },
  // Speakers[5] = Elena Papadimitriou
  {
    time: "16:30",
    itemCategory: "speaker",
    name: Speakers[5].NameEN,
    profession: Speakers[5].ProfessionEN,
    theme: Speakers[5].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[5].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Papadimitriou.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[5].BioGR,
    socials: getSocials(Speakers, 5)
  },
  // Speakers[6] = Stergios Vakalis
  {
    time: "12:10",
    itemCategory: "speaker",
    name: Speakers[6].NameEN,
    profession: Speakers[6].ProfessionEN,
    theme: Speakers[6].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[6].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_VAKALIS.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[6].BioGR,
    socials: getSocials(Speakers, 6)
  },
  // Speakers[7] = Nassos Katsamanis
  {
    time: "14:20",
    itemCategory: "speaker",
    name: Speakers[7].NameEN,
    profession: Speakers[7].ProfessionEN,
    theme: Speakers[7].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[7].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo-Katsamanis.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[7].BioGR,
    socials: getSocials(Speakers, 7)
  },
  // Speakers[8] = Nora Drakou
  {
    time: "19:00",
    itemCategory: "speaker",
    name: Speakers[8].NameEN,
    profession: Speakers[8].ProfessionEN,
    theme: Speakers[8].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[8].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Drakou.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[8].BioGR,
    socials: getSocials(Speakers, 8)
  },
  // Speakers[9] = Dimitris Samolis
  {
    time: "16:50",
    itemCategory: "speaker",
    name: Speakers[9].NameEN,
    profession: Speakers[9].ProfessionEN,
    theme: Speakers[9].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[9].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/photo_Samolhs.webp",
    bcimageUrl: "/eventimages/circle.webp",
    personalDescription: Speakers[9].BioGR,
    socials: getSocials(Speakers, 9)
  }
]);


export const allHosts = applyPosterBasePath([
  // Host[0] = Chrysa Michalopoulou
  {
    time: "",
    itemCategory: "",
    name: Speakers[10].NameEN,
    profession: Speakers[10].ProfessionEN,
    theme: Speakers[10].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[10].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/hostess_photo-01.webp",
    bcimageUrl: "/eventimages/Circle_Host.webp",
    modalEyebrow: "Hostess",
    personalDescription: Speakers[10].BioGR,
    socials: getSocials(Speakers, 10)
  },
  // Host[1] = Manos
  {
    time: "",
    itemCategory: "",
    name: Speakers[11].NameEN,
    profession: Speakers[11].ProfessionEN,
    theme: Speakers[11].Theme,
    title: "",
    itemColor: SPEAKER_ITEM_COLOR,
    description: Speakers[11].DescriptionGR,
    posterImageUrl: "/eventimages/speakers/back_host.webp",
    bcimageUrl: "/eventimages/Circle_Host.webp",
    modalEyebrow: "Backstage Host",
    personalDescription: Speakers[11].BioGR,
    socials: getSocials(Speakers, 11)
  }
])



// Experience workshops
export const allExpWorkshops = applyPosterBasePath([
  // ExpWorkshops[0] = Alexandros Galans, Dimitris Galanis, Vaggelis Dimopoulos
  {
    time: WORKSHOP_TIME_1,
    name: ExpWorkshops[0].NameEN,
    room: "",
    profession: ExpWorkshops[0].ProfessionEN,
    artName: ExpWorkshops[0].ArtName,
    title: ExpWorkshops[0].Title,  
    itemColor: "rgba(45, 35, 18, 0.9)",
    description: ExpWorkshops[0].DescriptionGR,
    posterImageUrl: "/eventimages/workshops/photo-SOUXOUMOUXOU.png",
    personalDescription: ExpWorkshops[0].BioGR,
    socials: getSocials(ExpWorkshops, 0)
  },
  // ExpWorkshops[1] = Ifigenia Pappa
  {
    time: WORKSHOP_TIME_2,
    name: ExpWorkshops[1].NameEN,
    room: "",
    profession: ExpWorkshops[1].ProfessionEN,
    artName: ExpWorkshops[1].ArtName,
    title: ExpWorkshops[1].Title,
    itemColor: "rgba(20, 20, 20, 0.92)",
    description: ExpWorkshops[1].DescriptionGR,
    posterImageUrl: "/eventimages/workshops/photo-WABISABI.png",
    personalDescription: ExpWorkshops[1].BioGR,
    socials: getSocials(ExpWorkshops, 1)
  },
  // ExpWorkshops[2] = Theodora Koutsogaki
  {
    time: WORKSHOP_TIME_3,
    name: ExpWorkshops[2].NameEN,
    room: "",
    profession: ExpWorkshops[2].ProfessionEN,
    artName: ExpWorkshops[2].ArtName,
    title: "Athenaides Project",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: ExpWorkshops[2].DescriptionGR,
    posterImageUrl: "/eventimages/workshops/photo-ATHENAIDES.png",
    personalDescription: ExpWorkshops[2].BioGR,
    socials: getSocials(ExpWorkshops, 2)
  },
]);

// Placeholder entries are kept here for sections that do not yet come from JSON.
export const allProfWorkshops = applyPosterBasePath([
  // ProfWorkshops[0] = The American College of Greece - Deree
  {
    time: WORKSHOP_TIME_1,
    room: "",
    title: ProfWorkshops[0].Title,
    name: ProfWorkshops[0].NameEN,
    description: ProfWorkshops[0].DescriptionGR,
    personal: ProfWorkshops[0].BioGR,
    itemColor: "rgba(25, 35, 12, 0.92)",
    posterImageUrl: "https://www.acg.edu/wp-content/uploads/2017/04/logo_white_ACGBigger.png",
    socials: getSocials(ProfWorkshops, 0)
  },
  // ProfWorkshops[1] = Dialectica
  {
    time: WORKSHOP_TIME_2,
    room: "",
    title: "Dialectica",
    name: ProfWorkshops[1].NameEN,
    description: ProfWorkshops[1].DescriptionGR,
    personal: ProfWorkshops[1].BioGR,
    itemColor: "rgba(25, 35, 12, 0.92)",
    posterImageUrl: "/eventimages/supporters/Dialectica_idzOXMZJL7_0.png",
    socials: getSocials(ProfWorkshops, 1)
  },
  // ProfWorkshops[2] = Oliver Wyman
  {
    time: WORKSHOP_TIME_2,
    room: "",
    title: "Oliver Wyman",
    name: ProfWorkshops[2].NameEN,
    description: ProfWorkshops[2].DescriptionGR,
    personal: ProfWorkshops[2].BioGR,
    itemColor: "rgba(25, 35, 12, 0.92)",
    posterImageUrl: "https://www.oliverwyman.com/content/dam/oliver-wyman/v3/logos/header-logo-oliver-wyman-black.svg",
    socials: getSocials(ProfWorkshops, 2)
  },
  // ProfWorkshops[3] = Alpha Bank
  {
    time: WORKSHOP_TIME_1,
    room: "",
    title: "Alpha Bank",
    name: ProfWorkshops[3].NameEN,
    description: ProfWorkshops[3].DescriptionGR,
    personal: ProfWorkshops[3].BioGR,
    itemColor: "rgba(25, 35, 12, 0.92)",
    posterImageUrl: "https://www.alpha.gr/-/media/AlphaGr/Images/logo/alphaBank_logo.svg?iar=0&hash=1F750DEDB5C3D48D59DCC4FB13FC7F07",
    socials: getSocials(ProfWorkshops, 3)
  }
]);

export const allSideHappenings = applyPosterBasePath([
  {
    name: "Stelios Vrakas",
    artName: "stelios pupet",
    profession: "",
    title: "",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "",
    posterImageUrl: "/eventimages/sideevents/Stelios Pupet/A313E5D6-B022-41BC-91B3-B3855B4640DD.JPG",
    personalDescription: "",
    socials: {
      instagram:
        "https://www.instagram.com/stelios_pupet?igsh=czJhNXA4and6NGxq"
      },
  },
  {
    name: "Stathis Giannakopoulos",
    artName: "Stathis Giannakopoulos",
    profession: "",
    title: "Video Loops",
    itemColor: "rgba(15, 25, 45, 0.9)",
    description: "οπτικοακουστικό installation με ταινιες μικρου μηκους σε λουπα",
    posterImageUrl: "/eventimages/sideevents/Στάθης Γιαννακόπουλος - Video loops/SG LOGO PNG.png",
    personalDescription: "",
    socials: {
    },
  },

  {
    name: "",
    artName: "Photo Booth Van",
    profession: "",
    title: "Photo Booth Van",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "Το Photo Booth Van είναι έτοιμο να σας ταξιδέψει! Φωτογραφηθείτε μέσα στο πιο διασκεδαστικό βαν και πάρτε τις εκτυπώσεις σας στο λεπτό. Οι ευχάριστες στιγμές και το άφθονο γέλιο με τα αγαπημένα σας πρόσωπα είναι εγγυημένες. Σίγουρα θα είναι το αντικείμενο συζήτησης στο τέλος της βραδιάς.",
    posterImageUrl: "/eventimages/sideevents/Photobooth_Van/PhotoBoothVan_LOGO.png",
    personalDescription: "",
    socials: {
      instagram: "https://www.instagram.com/photoboothvan/?hl=el"      },
  },{
    name: "Αλέξανδρος Γαλάνης, Δημήτρης Γαλάνης, Βαγγέλης Δημόπουλος",
    artName: "Souxoumouxou",
    profession: "",
    title: "Souxoumouxou",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "Stand των souxoumouxou με merch",
    posterImageUrl: "/eventimages/sideevents/Souxoumouxou/Logo souxoumouxou.png",
    personalDescription: "",
    socials: {
      instagram: "https://www.instagram.com/souxoumouxou.ath/"      },
  },{
    name: "",
    artName: "Will you... Marrow me?",
    profession: "",
    title: "Will you... Marrow me?",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "Το 'Will you... Marrow me?' είναι μία εθελοντική ομάδα της Επιστημονικής Εταιρείας Φοιτητών Ιατρικής Ελλάδος (ΕΕΦΙΕ). Ο σκοπός της ομάδας μας είναι η ενημέρωση για την δωρεά μυελού των οστών και τη καταγραφή εθελοντών δοτών στο εθνικό και παγκόσμιο μητρώο. Η ομάδα μας δημιουργήθηκε το 2016 με πρωτοβουλία του Παραρτήματος Αθηνών της Ε.Ε.Φ.Ι.Ε και με την βοήθεια της Τράπεζας Εθελοντών Δοτών Μυελού των Οστών 'Όραμα Ελπίδας' και την στήριξη του ΕΚΠΑ και μέσα στα χρόνια κατάφερε να επεκταθεί και στις υπόλοιπες Ιατρικές Σχολές της χώρας.Μέσα στα 9 χρόνια δράσης μας έχουμε καταφέρει να καταγράψουμε περισσότερους από 7.000 εθελοντές,  δότες μυελού, εκ των οποίων οι 11 βρέθηκαν συμβατοί και προχώρησαν σε δωρεά. Επίσης, επεκτείνουμε την ομάδα μας σε Θεσσαλονίκη, Πάτρα, Κρήτη, Ιωάννινα και Αλεξανδρούπολη με τη βοήθεια της Τράπεζας Εθελοντών Δοτών Μυελού των Οστών «Όραμα Ελπίδας» καθώς και του «ΚΕΔΜΟΠ- Χάρισε Ζωή».Μάλιστα, 14 από τα άτομα που κατέγραψε η ομάδα μας προχώρησαν σε δωρεά!",
    posterImageUrl: "/eventimages/sideevents/Will_you_Marrow_me/finalLOGO.png",
    personalDescription: "",
    socials: {
      instagram: "https://www.instagram.com/willyoumarrowme_/?hl=el"      },
  },{
    name: "",
    artName: "Animal center Vyronas",
    profession: "",
    title: "Animal center Vyronas",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "Το καταφύγιο ζώων Βύρωνα αποτελείτε από μια ολιγομελή εθελοντική ομάδα. Σκοπός τους είναι η φροντίδα και η προώθηση για υιοθεσία των αδέσποτων ζώων του δήμου Βύρωνα, καθώς και η ενημέρωση και η ευαισθητοποίηση της κοινωνίας γύρω από θέματα που αφορούν τα αδέσποτα και την ευζωια τους.",
    posterImageUrl: "/eventimages/sideevents/Καταφύγιο Ζώων Βύρωνα/IMG_2058.JPG",
    personalDescription: "",
    socials: {
      instagram: "https://www.instagram.com/climatefresk?igsh=a29meGlnMmk2ZTVn"      },
  },{
    name: "",
    artName: "Checkpoint",
    profession: "",
    title: "",
    itemColor: "rgba(45, 12, 15, 0.9)",
    description: "Οι Κινητές Μονάδες Πρόληψης και Εξέτασης «Checkpoint» ξεκίνησαν το ταξίδι τους το 2015 στην Αθήνα και το 2017 στη Θεσσαλονίκη. Υλοποιούν δράσεις προαγωγής της εξέτασης για HIV και ηπατίτιδες Β και C, τόσο στην Αττική και στη Θεσσαλονίκη, όσο και στην υπόλοιπη Ελλάδα. Η λειτουργία των Κινητών Μονάδων είναι μία πρωτοβουλία του Συλλόγου Ασθενών Ήπατος «Προμηθέας» και του Συλλόγου Οροθετικών Ελλάδος «Θετική Φωνή».",
    posterImageUrl: "/eventimages/sideevents/Checkpoint/3f6d3541-0526-442c-8c5f-be5ca0109587.jpeg",
    personalDescription: "",
    socials: {
      instagram: "https://www.instagram.com/my.checkpoint?igsh=c29qand6ZjRqcWYw"      },
  },
]);

// Performances
export const allPerformances = applyPosterBasePath([
  // Performances[0] = Marios Psarianos
  {
    time: "13:45",
    name: Performances[0].NameEN,
    itemCategory: "performance",
    profession: Performances[0].ProfessionEN,
    artName: Performances[0].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[0].DescriptionGR,
    posterImageUrl: "/eventimages/performancers/photo_Psarianos.png",
    personalDescription: Performances[0].BioGR,
    socials: getSocials(Performances, 0)
  },
  // Performances[1] = Stratos Fygetakis
  {
    time: "17:10",
    name: Performances[1].NameEN,
    itemCategory: "performance",
    profession: Performances[1].ProfessionEN,
    artName: Performances[1].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[1].DescriptionGR,
    posterImageUrl: "/eventimages/performancers/photo_Fygetakis.png",
    personalDescription: Performances[1].BioGR,
    socials: getSocials(Performances, 1)
  },
  // Performances[2] = Konstantina Koutra / KONIKOU
  {
    time: "19:20",
    name: Performances[2].NameEN,
    itemCategory: "performance",
    profession: Performances[2].ProfessionEN,
    artName: Performances[2].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[2].DescriptionGR,
    posterImageUrl: "/eventimages/performancers/photo_Konikou.png",
    personalDescription: Performances[2].BioGR,
    socials: getSocials(Performances, 2)
  },
  // Performances[3] = Black Brides
  {
    time: "16:15",
    name: Performances[3].NameEN,
    itemCategory: "performance",
    profession: Performances[3].ProfessionEN,
    artName: Performances[3].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[3].DescriptionGR,
    posterImageUrl: "/eventimages/performancers/photo_GETUP.png",
    personalDescription: Performances[3].BioGR,
    socials: getSocials(Performances, 3)
  },
  // Performances[4] = Unforgetable
  {
    time: "11:15",
    name: Performances[4].NameEN,
    itemCategory: "performance",
    profession: Performances[4].ProfessionEN,
    artName: Performances[4].Artname,
    itemColor: PERFORMANCE_ITEM_COLOR,
    description: Performances[4].DescriptionGR,
    posterImageUrl: "/eventimages/performancers/photo_GETUP.png",
    personalDescription: Performances[4].BioGR,
    socials: getSocials(Performances, 4)
  }
]);


export const extra = applyPosterBasePath([
  {
    time: "11:30",
    itemCategory: "oppening",
    name: "Opening",
    itemColor: EXTRA_ITEM_COLOR,
  },
  {
      time: "10:00",
      itemCategory: "oppening",
      name: "Registration",
      profession: "",
      itemColor: EXTRA_ITEM_COLOR,
    },
    {
        time: "19:35",
        itemCategory: "closing",
        name: "Closing",
        itemColor: EXTRA_ITEM_COLOR,
      },
    {
        time: "20:00",
        itemCategory: "closing",
        name: "After Party",
        itemColor: EXTRA_ITEM_COLOR,
      }]);

// Session groupings consumed by the program UI.
export const Registration = [
  extra[1], // Registration
];

export const mySessions1 = [
  allPerformances[4], // Unforgetable
  extra[0], // Opening Hostess / Backstage Host / Curators
  allSpeakers[0], // Eleni Kavvada
  allSpeakers[5], // Stergios Vakalis
];

export const mySessions2 = [
  allPerformances[0], // Marios Psarianos
  allSpeakers[1], // Thanos Ioannidis + Chara Kontochristou
  allSpeakers[6], // Nassos Katsamanis
  allSpeakers[3], // Dimitris Barmpas
];

export const mySessions3 = [
  allPerformances[3], // Black Brides
  allSpeakers[4], // Elena Papadimitriou
  allSpeakers[8], // Dimitris Samolis
  allPerformances[1], // Stratos Fygetakis
];

export const mySessions4 = [
  allSpeakers[2], // Yannis Daglis
  allSpeakers[7], // Nora Drakou
  allPerformances[2], // Konstantina Koutra / KONIKOU
  extra[2] // Closing & Curators
];

export const mySessions5 = [
  extra[3], // the team, the hug
];

// Experience workshops
export const myWorkshopsPack1 = [
  {
    time: WORKSHOP_TIME_1,
    color: "rgba(15, 35, 30, 0.9)",
    workshop: [
      allProfWorkshops[0], // The American College of Greece - Deree
      allProfWorkshops[3], // Alpha Bank
      allExpWorkshops[0], // Souxoumouxou
    ],
  },
];

export const myWorkshopsPack2 = [
  {
    time: WORKSHOP_TIME_2,
    color: "rgba(25, 35, 12, 0.92)",
    workshop: [
      allProfWorkshops[1], // Dialectica
      allProfWorkshops[2], // Oliver Wyman
      allExpWorkshops[1], // Wabi Sabi Lab
    ],
  },
];




export const myWorkshopsPack3 = [
  {
    time: WORKSHOP_TIME_3,
    color: "rgba(25, 35, 12, 0.92)",
    workshop: [
      allExpWorkshops[2], // Athenaides
    ],
  },
];


// Side happenings
export const mySideHappenings = [
  allSideHappenings[0],
  allSideHappenings[1],
];
