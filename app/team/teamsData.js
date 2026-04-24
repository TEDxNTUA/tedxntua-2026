import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

export const teams = [
  {
    slug: "curator",
    title: "Curators",
    description: "The people curating the talks and program.",
    heroImages: [
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-9.jpeg"),
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-69.jpeg"),
      assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-278.jpeg")
    ],
    members: [
      {
        id: "aggelos",
        name: "Άγγελος Καρασαββίδης",
        photos: [
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-9.jpeg"),
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Άγγελος ✅/mtt-278.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/karasavvidiss",
        }
      },
      {
        id: "naria",
        name: "Νάρια Σπηλίδη",
        photos: [
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-69.jpeg"),
          assetPath("/MTT_final/Curators_ΤΕΛΙΚΕΣ✅/Νάρια ✅/mtt-76.jpeg")
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
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-43.jpeg"),
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-532.jpeg"),
      assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-15.jpeg")
    ],
    members: [
      {
        id: "nikos",
        name: "Νικόλαος Αναγνώστου",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-43.jpeg"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Νίκος ✅/mtt-46-_.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/nikos._anagnostou",
        }
      },
      {
        id: "antonis",
        name: "Αντώνης Βάκρινος",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-532.jpeg"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Αντώνης ✅/mtt-530.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/ant0nis__",
        }
      },
      {
        id: "misa",
        name: "Mykhailo Kartsev",
        photos: [
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-15.jpeg"),
          assetPath("/MTT_final/IT_ΤΕΛΙΚΕΣ ✅/Μίσα ✅/mtt-17.jpeg")
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
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-180.jpg"),
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-194.jpg"),
      assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-289.jpg")
    ],
    members: [
      {
        id: "argyro",
        name: "Αργυρώ Κλενιάτη",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-180.jpg"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Αργυρώ/mtt-177.jpg")
        ],
        social: {
          instagram: "https://www.instagram.com/sylviaklen6",
        }
      },
      {
        id: "evilia",
        name: "Ευηλία Χατζηπαρασκευαΐδου",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-189.jpg"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Ευηλία_/mtt-194.jpg")
        ],
        social: {
          instagram: "https://www.instagram.com/ev3sun_",
        }
      },
      {
        id: "kostas-p",
        name: "Κωνσταντίνος Παριάρος",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-50.jpg"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Κώστας_/mtt-289.jpg")
        ],
        social: {
          instagram: "https://www.instagram.com/_kostaspar_",
        }
      },
      {
        id: "maria",
        name: "Μαρία Καραλή",
        photos: [
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Μαρία/mtt-169.jpg"),
          assetPath("/MTT_final/Design_ΤΕΛΙΚΕΣ/Μαρία/mtt-158.jpg")
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
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-100.jpeg"),
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-128.jpeg"),
      assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-304.jpeg")
    ],
    members: [
      {
        id: "aristotelis",
        name: "Αριστοτέλης Ρούμπος",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-103.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Αριστοτέλης ✅/mtt-100.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/aristotelis_roub",
        }
      },
      {
        id: "artemis",
        name: "Άρτεμις Κυριακου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-136.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Άρτεμις ✅/mtt-128.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/artemiskyriakouu",
        }
      },
      {
        id: "giorgos",
        name: "Γιώργος Ρούσης",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-97.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Γιώργος ✅/mtt-99.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/rousis__",
        }
      },
      {
        id: "eirini",
        name: "Ειρήνη Ιωαννίδου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ειρήνη ✅/mtt-37.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ειρήνη ✅/mtt-30.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/ioanniduu",
        }
      },
      {
        id: "eleni",
        name: "Ελένη Παπαϊωάννου",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ελένη ✅/mtt-116.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Ελένη ✅/mtt-106.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/elenippn",
        }
      },
      {
        id: "martina",
        name: "Μαρτίνα Ζακέο",
        photos: [
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Μαρτίνα ✅/mtt-124.jpeg"),
          assetPath("/MTT_final/FR_ΤΕΛΙΚΕΣ ✅/Μαρτίνα ✅/mtt-120.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/martinaazaccheo",
        }
      }
    ]
  },
  {
    slug: "speakers",
    title: "Speakers",
    description: "Speaker curation and liaison.",
    heroImages: [
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-445.jpeg"),
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-436.jpeg"),
      assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-409.jpeg")
    ],
    members: [
      {
        id: "elena-k",
        name: "Έλενα Κοτσιαφίτη",
        photos: [
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-538.jpeg"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Έλενα ✅/mtt-445.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/kotsiafiti_",
        }
      },
      {
        id: "eleftheria",
        name: "Ελευθερία Λαζαρίδη",
        photos: [
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-512.jpeg"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Ελευθερία ✅/mtt-436.jpeg")
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
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-404.jpeg"),
          assetPath("/MTT_final/Speakers_ΤΕΛΙΚΕΣ ✅/Κωνσταντίνος ✅/mtt-409.jpeg")
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
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-242.jpeg"),
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-286.jpeg"),
      assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-88.jpeg")
    ],
    members: [
      {
        id: "areti",
        name: "Αρετή Κωνσταντίνου",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-252.jpeg"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Αρετή ✅/mtt-242.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/aretikonstantinouu",
        }
      },
      {
        id: "elpida",
        name: "Ελπίδα Λαυρενίδη",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-286.jpeg"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Ελπίδα ✅/mtt-335.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/elpidalav",
        }
      },
      {
        id: "nancy",
        name: "Νάνσυ Σουλτανοπούλου",
        photos: [
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Νάνσυ ✅/mtt-227.jpeg"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Νάνσυ ✅/mtt-219.jpeg")
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
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-88.jpeg"),
          assetPath("/MTT_final/Experience_ΤΕΛΙΚΕΣ ✅/Φανή ✅/mtt-331.jpeg")
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
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-22.jpeg"),
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-2.jpeg"),
      assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-209.jpg")
    ],
    members: [
      {
        id: "elena-x",
        name: "Έλενα Ξιξή",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-22.jpeg"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Έλενα ✅/mtt-313.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/helenaaa._.xixhhh",
        }
      },
      {
        id: "malvina",
        name: "Μαλβίνα Στεμπίλη",
        photos: [
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-59.jpeg"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μαλβίνα ✅/mtt-56.jpeg")
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
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-209.jpg"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Μυρτώ ✅/mtt-204.jpg")
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
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-300.jpg"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-299.jpg"),
          assetPath("/MTT_final/Media_ΤΕΛΙΚΕΣ/Κώστας/mtt-301.jpg")
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
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-539.jpeg"),
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-145.jpeg"),
      assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-540.jpeg")
    ],
    members: [
      {
        id: "thodoris",
        name: "Θοδωρής Κεραμιανός",
        photos: [
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-540.jpeg"),
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Θοδωρής ✅/mtt-539.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/theodore_keramianos",
        }
      },
      {
        id: "fenia",
        name: "Φωτεινή Κωνσταντίνα Μπρίτσα",
        photos: [
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-138.jpeg"),
          assetPath("/MTT_final/Venue_ΤΕΛΙΚΕΣ ✅/Φένια ✅/mtt-145.jpeg")
        ],
        social: {
          instagram: "https://www.instagram.com/fenia_br",
        }
      }
    ]
  }
];

export default teams;
