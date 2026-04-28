import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

export const removeAccents = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ά/g, "α")
    .replace(/έ/g, "ε")
    .replace(/ή/g, "η")
    .replace(/ί/g, "ι")
    .replace(/ό/g, "ο")
    .replace(/ύ/g, "υ")
    .replace(/ώ/g, "ω")
    .replace(/Ά/g, "Α")
    .replace(/Έ/g, "Ε")
    .replace(/Ή/g, "Η")
    .replace(/Ί/g, "Ι")
    .replace(/Ό/g, "Ο")
    .replace(/Ύ/g, "Υ")
    .replace(/Ώ/g, "Ω");
};

export const teams = [
  {
    slug: "curator",
    title: "Curators",
    description: "The people curating the talks and program.",
    heroImages: [
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-9.webp"),
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-69.webp"),
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-278.webp")
    ],
    members: [
      {
        id: "aggelos",
        name: "Άγγελος Καρασαββίδης",
        photos: [
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-9.webp"),
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-278.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/karasavvidiss",
          linkedin: "https://www.linkedin.com/in/angelos-karasavvidis-3a3802231/",
          facebook: "https://www.facebook.com/chrisangelkar/",
        }
      },
      {
        id: "naria",
        name: "Νάρια Σπηλίδη",
        photos: [
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-69.webp"),
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-76.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/naria_spilidi",
        }
      }
    ]
  },
  {
    slug: "it",
    title: "Information and Technology",
    description: "Technology, infrastructure and stage management.",
    heroImages: [
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-43.webp"),
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-532.webp"),
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-15.webp")
    ],
    members: [
      {
        id: "nikos",
        name: "Νικόλαος Αναγνώστου",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-43.webp"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-46-_.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/nikos._anagnostou",
          linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
          facebook: "https://m.facebook.com/profile.php?id=100008612345838",
        }
      },
      {
        id: "antonis",
        name: "Αντώνης Βάκρινος",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-532.webp"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-530.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/ant0nis__",
        }
      },
      {
        id: "misa",
        name: "Mykhailo Kartsev",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-15.webp"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-17.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/piwzik",
        }
      }
    ]
  },
  {
    slug: "design",
    title: "Design",
    description: "Visual identity, stage visuals and branding.",
    heroImages: [
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-180.webp"),
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-194.webp"),
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-289.webp")
    ],
    members: [
      {
        id: "argyro",
        name: "Αργυρώ Κλενιάτη",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-180.webp"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-177.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/sylviaklen6",
        }
      },
      {
        id: "evilia",
        name: "Ευηλία Χατζηπαρασκευαΐδου",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-189.webp"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-194.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/ev3sun_",
        }
      },
      {
        id: "kostas-p",
        name: "Κωνσταντίνος Παριάρος",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-50.webp"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-289.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/_kostaspar_",
        }
      },
      {
        id: "maria",
        name: "Μαρία Καραλή",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Μαρία/mtt-169.webp"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Μαρία/mtt-158.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/karalixo",
        }
      }
    ]
  },
  {
    slug: "fundraising",
    title: "Fundraising",
    description: "Sponsorships, donations and budget planning.",
    heroImages: [
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-100.webp"),
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-128.webp"),
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-99.webp")
    ],
    members: [
      {
        id: "aristotelis",
        name: "Αριστοτέλης Ρούμπος",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-103.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-100.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/aristotelis_roub",
        }
      },
      {
        id: "artemis",
        name: "Άρτεμις Κυριακου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-136.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-128.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/artemiskyriakouu",
        }
      },
      {
        id: "giorgos",
        name: "Γιώργος Ρούσης",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-97.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-99.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/rousis__",
        }
      },
      {
        id: "eirini",
        name: "Ειρήνη Ιωαννίδου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ειρήνη ✅/mtt-37.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ειρήνη ✅/mtt-30.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/ioanniduu",
        }
      },
      {
        id: "eleni",
        name: "Ελένη Παπαϊωάννου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ελένη ✅/mtt-116.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ελένη ✅/mtt-106.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/elenippn",
        }
      },
      {
        id: "martina",
        name: "Μαρτίνα Ζακέο",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Μαρτίνα ✅/mtt-124.webp"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Μαρτίνα ✅/mtt-120.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/martinaazaccheo",
          linkedin: "https://www.linkedin.com/in/martina-zaccheo-b52a7a2b6/",
        }
      }
    ]
  },
  {
    slug: "speakers",
    title: "Speakers",
    description: "Speaker curation and liaison.",
    heroImages: [
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-445.webp"),
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-436.webp"),
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-409.webp")
    ],
    members: [
      {
        id: "elena-k",
        name: "Έλενα Κοτσιαφίτη",
        photos: [
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-538.webp"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-445.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/kotsiafiti_",
          linkedin: "https://www.linkedin.com/in/elena-kotsiafiti",
          facebook: "https://www.facebook.com/profile.php?id=100010189967802",
        }
      },
      {
        id: "eleftheria",
        name: "Ελευθερία Λαζαρίδη",
        photos: [
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-512.webp"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-436.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/eleftheria_laz_",
          linkedin: "https://www.linkedin.com/in/eleftheria-lazaridi",
          facebook: "https://www.facebook.com/people/Eleftheria-Lazaridi/pfbid02uy4baKjHQapGpaVcgiFaN5Kby8kVVXnZMWxz5cPADyp1eCQfg9fg2dMuSZvVynDWl/",
        }
      },
      {
        id: "konstantinos",
        name: "Κωνσταντίνος Καραγιαννόπουλος",
        photos: [
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-404.webp"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-409.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/d.karlos_",          linkedin: "https://www.linkedin.com/in/konstantinos-karagiannopoulos-5234ba39b/",
          facebook: "https://www.facebook.com/dinoskarlos.dinoskarlos?locale=el_GR",        }
      }
    ]
  },
  {
    slug: "experience",
    title: "Experience",
    description: "Designing attendee and speaker experience.",
    heroImages: [
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-242.webp"),
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-286.webp"),
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-88.webp")
    ],
    members: [
      {
        id: "areti",
        name: "Αρετή Κωνσταντίνου",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-252.webp"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-242.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/aretikonstantinouu",
        }
      },
      {
        id: "elpida",
        name: "Ελπίδα Λαυρενίδη",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-286.webp"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-335.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/elpidalav",
        }
      },
      {
        id: "nancy",
        name: "Νάνσυ Σουλτανοπούλου",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Νάνσυ ✅/mtt-227.webp"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Νάνσυ ✅/mtt-219.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/naancysllt",
          linkedin: "https://www.linkedin.com/in/nancy-soultanopoulou-6b3412239?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        }
      },
      {
        id: "fani",
        name: "Φανή Παναγιώτου",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-88.webp"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-331.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/fannie.pn",
        }
      }
    ]
  },
  {
    slug: "social-media",
    title: "Media & Marketing",
    description: "Communications, socials and outreach.",
    heroImages: [
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-22.webp"),
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-59.webp"),
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-209.webp")
    ],
    members: [
      {
        id: "elena-x",
        name: "Έλενα Ξιξή",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-22.webp"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-313.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/helenaaa._.xixhhh",
        }
      },
      {
        id: "malvina",
        name: "Μαλβίνα Στεμπίλη",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-59.webp"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-56.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/malvinaast",
          linkedin: "https://www.linkedin.com/in/malvina-stempili-15995b392?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        }
      },
      {
        id: "myrto",
        name: "Μυρτώ Μπάντου",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-209.webp"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-204.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/mimiminymoe",
          linkedin: "https://www.linkedin.com/in/myrto-badou",
        }
      },
      {
        id: "konstantinos-x",
        name: "Κωνσταντίνος Χάρος",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-300.webp"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-299.webp"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-301.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/kostasharos",
        }
      }
    ]
  },
  {
    slug: "venue",
    title: "Venue",
    description: "Venue logistics and on-site operations.",
    heroImages: [
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-539.webp"),
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-145.webp"),
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-540.webp")
    ],
    members: [
      {
        id: "thodoris",
        name: "Θοδωρής Κεραμιανός",
        photos: [
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-540.webp"),
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-539.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/theodore_keramianos",
          linkedin: "https://www.linkedin.com/in/theodore-keramianos-7943903b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        }
      },
      {
        id: "fenia",
        name: "Φωτεινή Κωνσταντίνα Μπρίτσα",
        photos: [
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-138.webp"),
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-145.webp")
        ],
        social: {
          instagram: "https://www.instagram.com/fenia_br",
        }
      }
    ]
  }
];

export default teams;
