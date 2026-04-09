import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

export const teams = [
  {
    slug: "curator",
    title: "Curator",
    description: "The people curating the talks and program.",
    heroImages: [
      assetPath("/MTT/curators_mtt/angelos/mtt-255.jpg"),
      assetPath("/MTT/curators_mtt/naria/mtt-63.jpg"),
      assetPath("/MTT/curators_mtt/angelos/mtt-256.jpg")
    ],
    members: [
      {
        id: "aggelos",
        name: "Άγγελος Καρασαββίδης",
        photo: assetPath("/MTT/curators_mtt/angelos/mtt-254.jpg"),
        social: {
          instagram: "https://www.instagram.com/karasavvidiss",
        }
      },
      {
        id: "naria",
        name: "Νάρια Σπηλίδη",
        photo: assetPath("/MTT/curators_mtt/naria/mtt-62.jpg"),
        social: {
          instagram: "https://www.instagram.com/naria_spilidi",
        }
      }
    ]
  },
  {
    slug: "it",
    title: "IT",
    description: "Technology, infrastructure and stage management.",
    heroImages: [
      assetPath("/MTT/it_mtt/nikos/mtt-306.jpg"),
      assetPath("/MTT/it_mtt/antonis/mtt-528.jpg"),
      assetPath("/MTT/it_mtt/misa/mtt-15.jpg")
    ],
    members: [
      {
        id: "nikos",
        name: "Νικόλαος Αναγνώστου",
        photo: assetPath("/MTT/it_mtt/nikos/mtt-44.jpg"),
        social: {
          instagram: "https://www.instagram.com/nikos._anagnostou",
        }
      },
      {
        id: "antonis",
        name: "Αντώνης Βάκρινος",
        photo: assetPath("/MTT/it_mtt/antonis/mtt-527.jpg"),
        social: {
          instagram: "https://www.instagram.com/ant0nis__",
        }
      },
      {
        id: "misa",
        name: "Mykhailo Kartsev",
        photo: assetPath("/MTT/it_mtt/misa/mtt-14.jpg"),
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
      assetPath("/MTT/design_mtt/argyro/mtt-172.jpg"),
      assetPath("/MTT/design_mtt/evilia/mtt-182.jpg"),
      assetPath("/MTT/design_mtt/kostas_p/mtt-289.jpg")
    ],
    members: [
      {
        id: "argyro",
        name: "Αργυρώ Κλενιάτη",
        photo: assetPath("/MTT/design_mtt/argyro/mtt-171.jpg"),
        social: {
          instagram: "https://www.instagram.com/sylviaklen6",
        }
      },
      {
        id: "evilia",
        name: "Ευηλία Χατζηπαρασκευαΐδου",
        photo: assetPath("/MTT/design_mtt/evilia/mtt-181.jpg"),
        social: {
          instagram: "https://www.instagram.com/ev3sun_",
        }
      },
      {
        id: "kostas-p",
        name: "Κωνσταντίνος Παριάρος",
        photo: assetPath("/MTT/design_mtt/kostas_p/mtt-288.jpg"),
        social: {
          instagram: "https://www.instagram.com/_kostaspar_",
        }
      },
      {
        id: "maria",
        name: "Μαρία Καραλή",
        photo: assetPath("/MTT/design_mtt/maria/mtt-157.jpg"),
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
      assetPath("/MTT/fr_mtt/aristotelis/mtt-101.jpg"),
      assetPath("/MTT/fr_mtt/artemis/mtt-126.jpg"),
      assetPath("/MTT/fr_mtt/giorgos/mtt-304.jpg")
    ],
    members: [
      {
        id: "aristotelis",
        name: "Αριστοτέλης Ρούμπος",
        photo: assetPath("/MTT/fr_mtt/aristotelis/mtt-100.jpg"),
        social: {
          instagram: "https://www.instagram.com/aristotelis_roub",
        }
      },
      {
        id: "artemis",
        name: "Άρτεμις Κυριακου",
        photo: assetPath("/MTT/fr_mtt/artemis/mtt-125.jpg"),
        social: {
          instagram: "https://www.instagram.com/artemiskyriakouu",
        }
      },
      {
        id: "giorgos",
        name: "Γιώργος Ρούσης",
        photo: assetPath("/MTT/fr_mtt/giorgos/mtt-303.jpg"),
        social: {
          instagram: "https://www.instagram.com/rousis__",
        }
      },
      {
        id: "eirini",
        name: "Ειρήνη Ελένη Ιωαννίδου",
        photo: assetPath("/MTT/fr_mtt/eirini/mtt-26.jpg"),
        social: {
          instagram: "https://www.instagram.com/ioanniduu",
        }
      },
      {
        id: "eleni",
        name: "Ελένη Παπαϊωάννου",
        photo: assetPath("/MTT/fr_mtt/eleni/mtt-104.jpg"),
        social: {
          instagram: "https://www.instagram.com/elenippn",
        }
      },
      {
        id: "martina",
        name: "Μαρτίνα Ζακέο",
        photo: assetPath("/MTT/fr_mtt/martina/mtt-118.jpg"),
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
      assetPath("/MTT/speakers_mtt/elena_k/mtt-386.jpg"),
      assetPath("/MTT/speakers_mtt/eleftheria/mtt-435.jpg"),
      assetPath("/MTT/speakers_mtt/konstantinos/mtt-402.jpg")
    ],
    members: [
      {
        id: "elena-k",
        name: "Έλενα Κοτσιαφίτη",
        photo: assetPath("/MTT/speakers_mtt/elena_k/mtt-385.jpg"),
        social: {
          instagram: "https://www.instagram.com/kotsiafiti_",
        }
      },
      {
        id: "eleftheria",
        name: "Ελευθερία Λαζαρίδη",
        photo: assetPath("/MTT/speakers_mtt/eleftheria/mtt-434.jpg"),
        social: {
          instagram: "https://www.instagram.com/eleftheria_laz_",
        }
      },
      {
        id: "konstantinos",
        name: "Κωνσταντίνος Καραγιαννόπουλος",
        photo: assetPath("/MTT/speakers_mtt/konstantinos/mtt-401.jpg"),
        social: {
          instagram: "https://www.instagram.com/d.karlos_",
        }
      }
    ]
  },
  {
    slug: "experience",
    title: "Experience",
    description: "Designing attendee and speaker experience.",
    heroImages: [
      assetPath("/MTT/experience_mtt/areti/mtt-235.jpg"),
      assetPath("/MTT/experience_mtt/elpida/mtt-282.jpg"),
      assetPath("/MTT/experience_mtt/fani/mtt-329.jpg")
    ],
    members: [
      {
        id: "areti",
        name: "Αρετή Κωνσταντίνου",
        photo: assetPath("/MTT/experience_mtt/areti/mtt-234.jpg"),
        social: {
          instagram: "https://www.instagram.com/aretikonstantinouu",
        }
      },
      {
        id: "elpida",
        name: "Ελπίδα Λαυρενίδη",
        photo: assetPath("/MTT/experience_mtt/elpida/mtt-230.jpg"),
        social: {
          instagram: "https://www.instagram.com/elpidalav",
        }
      },
      {
        id: "nancy",
        name: "Νάνσυ Σουλτανοπούλου",
        photo: assetPath("/MTT/experience_mtt/nancy/mtt-215.jpg"),
        social: {
          instagram: "https://www.instagram.com/naancysllt",
        }
      },
      {
        id: "fani",
        name: "Φανή Παναγιώτου",
        photo: assetPath("/MTT/experience_mtt/fani/mtt-328.jpg"),
        social: {
          instagram: "https://www.instagram.com/fannie.pn",
        }
      }
    ]
  },
  {
    slug: "social-media",
    title: "Social Media",
    description: "Communications, socials and outreach.",
    heroImages: [
      assetPath("/MTT/media_mtt/elena_x/mtt-22.jpg"),
      assetPath("/MTT/media_mtt/malvina/mtt-2.jpg"),
      assetPath("/MTT/media_mtt/myrto/mtt-206.jpg")
    ],
    members: [
      {
        id: "elena-x",
        name: "Έλενα Ξιξή",
        photo: assetPath("/MTT/media_mtt/elena_x/mtt-21.jpg"),
        social: {
          instagram: "https://www.instagram.com/helenaaa._.xixhhh",
        }
      },
      {
        id: "malvina",
        name: "Μαλβίνα Στεμπίλη",
        photo: assetPath("/MTT/media_mtt/malvina/mtt-1.jpg"),
        social: {
          instagram: "https://www.instagram.com/malvinaast",
        }
      },
      {
        id: "myrto",
        name: "Μυρτώ Μπάντου",
        photo: assetPath("/MTT/media_mtt/myrto/mtt-205.jpg"),
        social: {
          instagram: "https://www.instagram.com/mimiminymoe",
        }
      },
      {
        id: "konstantinos-x",
        name: "Κωνσταντίνος Χάρος",
        photo: assetPath("/MTT/media_mtt/"),
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
      assetPath("/MTT/venue_mtt/thodoris/mtt-540.jpg"),
      assetPath("/MTT/venue_mtt/fenia/mtt-138.jpg"),
      assetPath("/MTT/venue_mtt/fenia/mtt-139.jpg")
    ],
    members: [
      {
        id: "thodoris",
        name: "Θοδωρής Κεραμιανός",
        photo: assetPath("/MTT/venue_mtt/thodoris/mtt-539.jpg"),
        social: {
          instagram: "https://www.instagram.com/theodore_keramianos",
        }
      },
      {
        id: "fenia",
        name: "Φωτεινή Κωνσταντίνα Μπρίτσα",
        photo: assetPath("/MTT/venue_mtt/fenia/mtt-137.jpg"),
        social: {
          instagram: "https://www.instagram.com/fenia_br",
        }
      }
    ]
  }
];

export default teams;
