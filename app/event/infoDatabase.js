import { withBasePath } from "../lib/basePath";

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
  name: "Ελένη Καββάδα",
  profession: "Ιδρύτρια του brand υψηλής ραπτικής και installation 240791",
  theme: "Μόδα",
  title: "Fashion as identity",
  itemColor: "rgba(189, 149, 74, 0.3)",
  description: "Η ομιλία, ακολουθώντας τη γενική θεματική του Tedx, πραγματεύεται την σημαντικότητα του κώδικα 0, σαν ταυτότητα του καλλιτέχνη. Τα προσωπικά του χαρακτηριστικά, που λειτουργούν σαν εφόδια και εργαλεία, απέναντι στην εκάστοτε δημιουργική πρόκληση. Θα συζητήσουμε την ισχύ της προσωπικής υπογραφής σε έναν κόσμο που βάλλεται από πληθώρα πληροφορίας και επιλογών και τη θέση του καλλιτέχνη απέναντι στα δεδομένα. Μέσω της μέχρι τώρα δικής της πορείας, η Ελένη Καββάδα θα μιλήσει για τους προσωπικούς της κώδικες κλειδιά και κατά πόσο την έχουν εξοπλίσει για την δική της διαδρομή. Πρέπει όλοι να έχουμε ένα σημείο 0; Το χτίζουμε στρατηγικά ή ηταν πάντα εκεί και πρέπει απλά να του δώσουμε την απαιτούμενη προσοχή; (+ από Speakers: Όπως αναφέρει η ίδια, «Ασυνείδητα συνέδεσα τη δουλειά μου με την ημερομηνία γέννησής μου», δίνοντας στο γνωστό της brand το όνομα: 240791. Με ποιον τρόπο αποτελούν και τα 2, Cycle 0 Codes; Διαδικασία «επιστροφής» στο χώρο της μόδας σε παλιότερα σχέδια & έργα.)",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Η Ελένη Καββάδα γεννήθηκε και μεγάλωσε στην Αθήνα. Σπούδασε σχέδιο μόδας στο Μιλάνο και την Φλωρεντία. Έχει στο ενεργητικό της πρακτική εξάσκηση στον οίκο Salvatore Ferragamo καθώς και 6ετή εργασία στο πλευρό του Γιώργου Ελευθεριάδη. Το 2021 ιδρύει το 240791, γνωστό για τις ανορθόδοξες σιλουέτες και όγκους των δημιουργιών του. Έχει δείξει τις συλλογές της δύο φορές στην εβδομάδα μόδας του Παρισιού και μία σε αυτή του Μιλάνου, καθώς έχει πάρει μέρος και σε shows στην Αθήνα. ",
  socials: {
    instagram: 'https://www.instagram.com/240791ek/',
  } },

{ time: "11:00 - 12:00",
  name: "Νάσος Κατσαμάνης",
  profession: "Co-founder at Auxilis AI & Διευθυντής Ερευνών στο Ερευνητικό Κέντρο «Αθηνά»",
  theme: "Τεχνητή Νοημοσύνη",
  title: "Kazad-Dum",
  itemColor: "rgba(255, 255, 255, 0.43)",
  description: "An increadible journey on how Gandalf the grey kills the Balrog and becomes Gandalf the white",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Ο Νάσος Κατσαμάνης είναι ερευνητής και επιχειρηματίας στον χώρο της τεχνητής νοημοσύνης, με έμφαση στις τεχνολογίες φωνής και την αλληλεπίδραση ανθρώπου-μηχανής. Είναι συνιδρυτής της Auxilis AI, όπου αναπτύσσει φωνητικούς ψηφιακούς βοηθούς με στόχο τη βελτίωση της πρόσβασης στην ιατρική περίθαλψη. Επίσης, είναι διδάκτορας Ηλεκτρολόγος Μηχανικός του ΕΜΠ και Διευθυντής Ερευνών στο Ερευνητικό Κέντρο «Αθηνά». Εστιάζει στην αξιοποίηση τεχνητής νοημοσύνης αιχμής σε λύσεις με ουσιαστικό αντίκτυπο στον πραγματικό κόσμο.",
  socials: {
    linkedin: 'https://gr.linkedin.com/in/nkatsam'
  } },

  { time: "13:00 - 14:00",
  name: "Θάνος Ιωαννίδης",
  name2: "Ιωάννα Κοντοχρήστου",
  profession: "Αρχιτέκτονας Μηχανικός",
  profession2: "Content Creator",
  theme: "Αρχιτεκτονική",
  title: "Crafting Architecture Stories",
  itemColor: "rgba(230, 57, 70, 0.3)",
  description: "Η ομιλία πραγματεύεται την αρχιτεκτονική ως διαδικασία και ως αφήγηση. Μέσα από το έργο του Erion Workshop και το format της σειράς «Αρχιτεκτονική για το παγωτό σας», παρουσιάζεται πώς η αρχιτεκτονική δεν είναι μόνο το τελικό αποτέλεσμα, αλλά μια αλληλουχία αποφάσεων, επανασχεδιασμών και ερμηνειών. Παράλληλα, αναδεικνύεται η ανάγκη η αρχιτεκτονική να επιστρέψει στη δημόσια κουβέντα με πιο άμεσο, κατανοητό και σύγχρονο τρόπο. (+ από Sp Η αρχιτεκτονική δημιουργία δεν είναι γραμμική αλλά νοείται ως μια συνεχής διαδικασία αξιολόγησης, όπου το τελικό αποτέλεσμα προκύπτει σταδιακά μέσα από δοκιμές και αναθεωρήσεις.)",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Ο Θάνος Ιωαννίδης είναι αρχιτέκτονας μηχανικός και συνιδρυτής του design-build γραφείου Erion Workshop. Μέσα από το γραφείο του δημιουργεί αρχιτεκτονικές ιστορίες, τις οποίες ακολουθεί από τα πρώτα σκίτσα μέχρι την υλοποίησή τους. Παράλληλα, μαζί με τη Χαρά Κοντοχρήστου έχει δημιουργήσει τη σειρά «Αρχιτεκτονική για το παγωτό σας», με στόχο να επαναφέρει την αρχιτεκτονική στη δημόσια συζήτηση, φέρνοντάς την πιο κοντά στις πλατφόρμες κοινωνικής δικτύωσης.                                                                                          Η Χαρά Κοντοχρήστου είναι δημιουργός περιεχομένου, γνωστή αρχικά μέσα από τα POV vlogs της, και σήμερα δραστηριοποιείται σε μια σειρά από διαφορετικά content projects. Είναι παρουσιάστρια, παραγωγός και συνδημιουργός της σειράς «Αρχιτεκτονική για το παγωτό σας» και φροντίζει το περιεχόμενο να παίρνει μορφή συμβατή με τον τρόπο με τον οποίο καταναλώνεται στα μέσα κοινωνικής δικτύωσης.",
  personalDescription2: "Η Χαρά Κοντοχρήστου είναι δημιουργός περιεχομένου, γνωστή αρχικά μέσα από τα POV vlogs της, και σήμερα δραστηριοποιείται σε μια σειρά από διαφορετικά content projects. Είναι παρουσιάστρια, παραγωγός και συνδημιουργός της σειράς «Αρχιτεκτονική για το παγωτό σας» και φροντίζει το περιεχόμενο να παίρνει μορφή συμβατή με τον τρόπο με τον οποίο καταναλώνεται στα μέσα κοινωνικής δικτύωσης.",
  socials: {
    instagram: 'https://www.instagram.com/thanos__ioannidis/',
    webpage: 'https://www.instagram.com/erion_workshop/ '
  },
  socials2: {
    instagram: 'https://www.instagram.com/chara_kontochristou/'
  } },

{ time: "14:00 - 15:00",
  name: "Γιάννης Δαγκλής",
  profession: "Καθηγητής Διαστημικής Φυσικής",
  theme: "Αστροφυσική",
  title: "Why i gave my hair to a dwarf",
  itemColor: "rgba(121, 147, 183, 0.3)",
  description: "(Αρχικές ακέψεις του στην πρώτη συνάντηση, θα επανέλθουμε όταν έχουμε προσχέδιο.) Η ομιλία πραγματεύεται την “κυκλικότητα” της μαγνητικής δραστηριότητας του Ήλιου και την αντίστοιχη κυκλικότητα που προκύπτει για δυναμικά φαινόμενα στο γεωδιάστημα, όπως για παράδειγμα μαγνητικές καταιγίδες, βόρειο σέλας και διαμόρφωση κοσμικής ακτινοβολίας. Πρόκειται για κυκλικά φαινόμενα που δεν είχαν επηρεάσει την ανθρωπότητα στο παρελθόν, αλλά μετά την αυγή της διαστημικής εποχής και τη μελέτη και βασική κατανόηση αυτών των φαινομένων, και την αυξανόμενη χρήση του διαστημικού χώρου για δραστηριότητες έρευνας, τεχνολογίας και επιχειρηματικότητας, επηρεάζουν πλέον σαφώς την ανθρώπινη πραγματικότητα - από τη διαστημική εξερεύνηση μέχρι τον τουρισμό σέλαος στη βόρεια Σκανδιναβία. Οι όποιες βιολογικές και ενδεχομένως ψυχολογικές επιδράσεις δεν έχουν ακόμη πιστοποιηθεί/επιβεβαιωθεί.",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Ο Γιάννης Δαγκλής μελετά τα καπρίτσια του Ήλιου, τις μαγνητικές καταιγίδες και το βόρειο σέλας, και διδάσκει στους φοιτητές του Πανεπιστημίου Αθηνών. Έχει συμβάλλει σε 10 διαστημικές αποστολές της NASA και της ESA, έχει συντονίσει 24 ευρωπαϊκά ερευνητικά προγράμματα κι έχει δημοσιεύσει 7 βιβλία και 200 ερευνητικές εργασίες. Τον μαγεύει το σύμπαν και οι πεζοπορίες στη φύση - ιδίως στα βουνά.",
  socials: {
    instagram: 'https://www.instagram.com/ioannisdaglis/',
    linkedin: 'https://gr.linkedin.com/in/ioannis-a-daglis-a2b8a46',
    facebook: 'https://www.facebook.com/ioannisdaglis/'
  } },

{ time: "16:00 - 17:00",
  name: "Έλενα Παπαδημητρίου",
  profession: "Δημοσιογράφος",
  theme: "Δημοσιογραφία",
  title: "The importance of second breakfast",
  itemColor: "rgba(109, 222, 139, 0.3)",
  description: "Its just mandatory",
  posterImageUrl: "/eventimages/speakers/grogyResol.jpg",
  personalDescription: "Η Έλενα είναι δημοσιογράφος. Έχει σπουδάσει Δημοσιογραφία στο ΑΠΘ και έχει Μεταπτυχιακό στην Πολιτική Επιστήμη και την Κοινωνιολογία στο ΕΚΠΑ. Δουλεύει εδώ και 25 χρόνια, κυρίως στην τηλεόραση και το ραδιόφωνο, στις ειδήσεις και σε ενημερωτικές εκπομπές. Έχει καλύψει εκλογές, δημοψηφίσματα και ανθρωπιστικές κρίσεις σε δημοσιογραφικές αποστολές εκτός Ελλάδας. Το 2025, βραβεύτηκε από το Ίδρυμα Προαγωγής Δημοσιογραφίας Αθανασίου Β. Μπότση. Από τον Οκτώβριο του 2023, είναι επικεφαλής του Editorial του fyi.news, ενός πρωτοποριακού social media first ειδησεογραφικού μέσου.",
  socials: {
    instagram: 'https://www.instagram.com/papadelena/?hl=en%5C',
    linkedin: 'https://gr.linkedin.com/in/elena-papadimitriou-1b61831a1',
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
allSpeakers[1],];


export const mySpeakers2 = [
allSpeakers[2],
allSpeakers[3],
allSpeakers[4]
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
