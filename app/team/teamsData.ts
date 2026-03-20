export type Member = {
  id: string;
  name: string;
  photo?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
};

export type Team = {
  slug: string;
  title: string;
  description?: string;
  heroImages?: string[];
  members?: Member[];
};

const assetPath = (path: string) => encodeURI(path);

export const teams: Team[] = [
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
        name: "Άγγελος",
        photo: assetPath("/MTT/curators_mtt/angelos/mtt-254.jpg")
      },
      {
        id: "naria",
        name: "Νάρια",
        photo: assetPath("/MTT/curators_mtt/naria/mtt-62.jpg")
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
        name: "Νίκος",
        photo: assetPath("/MTT/it_mtt/nikos/mtt-44.jpg"),
        social: {
          instagram: "https://www.instagram.com/",
          linkedin: "https://www.linkedin.com/",
        }
      },
      {
        id: "antonis",
        name: "Αντώνης",
        photo: assetPath("/MTT/it_mtt/antonis/mtt-527.jpg")
      },
      {
        id: "misa",
        name: "Μίσα",
        photo: assetPath("/MTT/it_mtt/misa/mtt-14.jpg")
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
        name: "Αργυρώ",
        photo: assetPath("/MTT/design_mtt/argyro/mtt-171.jpg"),
        social: {
          instagram: "https://www.instagram.com/",
          website: "https://example.com",
        }
      },
      {
        id: "evilia",
        name: "Ευηλία",
        photo: assetPath("/MTT/design_mtt/evilia/mtt-181.jpg")
      },
      {
        id: "kostas-p",
        name: "Κώστας Π.",
        photo: assetPath("/MTT/design_mtt/kostas_p/mtt-288.jpg")
      },
      {
        id: "maria",
        name: "Μαρία",
        photo: assetPath("/MTT/design_mtt/maria/mtt-157.jpg")
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
        name: "Αριστοτέλης",
        photo: assetPath("/MTT/fr_mtt/aristotelis/mtt-100.jpg")
      },
      {
        id: "artemis",
        name: "Άρτεμις",
        photo: assetPath("/MTT/fr_mtt/artemis/mtt-125.jpg")
      },
      {
        id: "giorgos",
        name: "Γιώργος",
        photo: assetPath("/MTT/fr_mtt/giorgos/mtt-303.jpg")
      },
      {
        id: "eirini",
        name: "Ειρήνη",
        photo: assetPath("/MTT/fr_mtt/eirini/mtt-26.jpg")
      },
      {
        id: "eleni",
        name: "Ελένη",
        photo: assetPath("/MTT/fr_mtt/eleni/mtt-104.jpg")
      },
      {
        id: "martina",
        name: "Μαρτίνα",
        photo: assetPath("/MTT/fr_mtt/martina/mtt-118.jpg")
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
        name: "Έλενα Κ.",
        photo: assetPath("/MTT/speakers_mtt/elena_k/mtt-385.jpg")
      },
      {
        id: "eleftheria",
        name: "Ελευθερία",
        photo: assetPath("/MTT/speakers_mtt/eleftheria/mtt-434.jpg")
      },
      {
        id: "konstantinos",
        name: "Κωνσταντίνος",
        photo: assetPath("/MTT/speakers_mtt/konstantinos/mtt-401.jpg")
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
        name: "Αρετή",
        photo: assetPath("/MTT/experience_mtt/areti/mtt-234.jpg")
      },
      {
        id: "elpida",
        name: "Ελπίδα",
        photo: assetPath("/MTT/experience_mtt/elpida/mtt-230.jpg")
      },
      {
        id: "nancy",
        name: "Νάνσυ",
        photo: assetPath("/MTT/experience_mtt/nancy/mtt-215.jpg")
      },
      {
        id: "fani",
        name: "Φανή",
        photo: assetPath("/MTT/experience_mtt/fani/mtt-328.jpg")
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
        name: "Θοδωρής",
        photo: assetPath("/MTT/venue_mtt/thodoris/mtt-539.jpg")
      },
      {
        id: "fenia",
        name: "Φένια",
        photo: assetPath("/MTT/venue_mtt/fenia/mtt-137.jpg")
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
        name: "Έλενα Ξ.",
        photo: assetPath("/MTT/media_mtt/elena_x/mtt-21.jpg")
      },
      {
        id: "malvina",
        name: "Μαλβίνα",
        photo: assetPath("/MTT/media_mtt/malvina/mtt-1.jpg")
      },
      {
        id: "myrto",
        name: "Μυρτώ",
        photo: assetPath("/MTT/media_mtt/myrto/mtt-205.jpg")
      }
    ]
  }
];

export default teams;
