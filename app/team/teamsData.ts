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
      assetPath("/MTT/Curators _ MTT/Άγγελος/mtt-255.jpg"),
      assetPath("/MTT/Curators _ MTT/Νάρια/mtt-63.jpg"),
      assetPath("/MTT/Curators _ MTT/Άγγελος/mtt-256.jpg")
    ],
    members: [
      {
        id: "aggelos",
        name: "Άγγελος",
        photo: assetPath("/MTT/Curators _ MTT/Άγγελος/mtt-254.jpg")
      },
      {
        id: "naria",
        name: "Νάρια",
        photo: assetPath("/MTT/Curators _ MTT/Νάρια/mtt-62.jpg")
      }
    ]
  },
  {
    slug: "it",
    title: "IT",
    description: "Technology, infrastructure and stage management.",
    heroImages: [
      assetPath("/MTT/IT _ MTT/Νίκος/mtt-306.jpg"),
      assetPath("/MTT/IT _ MTT/Αντώνης/mtt-528.jpg"),
      assetPath("/MTT/IT _ MTT/Μίσα/mtt-15.jpg")
    ],
    members: [
      {
        id: "nikos",
        name: "Νίκος",
        photo: assetPath("/MTT/IT _ MTT/Νίκος/mtt-44.jpg"),
        social: {
          instagram: "https://www.instagram.com/",
          linkedin: "https://www.linkedin.com/",
        }
      },
      {
        id: "antonis",
        name: "Αντώνης",
        photo: assetPath("/MTT/IT _ MTT/Αντώνης/mtt-527.jpg")
      },
      {
        id: "misa",
        name: "Μίσα",
        photo: assetPath("/MTT/IT _ MTT/Μίσα/mtt-14.jpg")
      }
    ]
  },
  {
    slug: "design",
    title: "Design",
    description: "Visual identity, stage visuals and branding.",
    heroImages: [
      assetPath("/MTT/Design _ MTT/Αργυρώ/mtt-172.jpg"),
      assetPath("/MTT/Design _ MTT/Ευηλία/mtt-182.jpg"),
      assetPath("/MTT/Design _ MTT/Κώστας Π./mtt-289.jpg")
    ],
    members: [
      {
        id: "argyro",
        name: "Αργυρώ",
        photo: assetPath("/MTT/Design _ MTT/Αργυρώ/mtt-171.jpg"),
        social: {
          instagram: "https://www.instagram.com/",
          website: "https://example.com",
        }
      },
      {
        id: "evilia",
        name: "Ευηλία",
        photo: assetPath("/MTT/Design _ MTT/Ευηλία/mtt-181.jpg")
      },
      {
        id: "kostas-p",
        name: "Κώστας Π.",
        photo: assetPath("/MTT/Design _ MTT/Κώστας Π./mtt-288.jpg")
      },
      {
        id: "maria",
        name: "Μαρία",
        photo: assetPath("/MTT/Design _ MTT/Μαρία/mtt-157.jpg")
      }
    ]
  },
  {
    slug: "fundraising",
    title: "Fundraising",
    description: "Sponsorships, donations and budget planning.",
    heroImages: [
      assetPath("/MTT/FR _ MTT/Αριστοτέλης/mtt-101.jpg"),
      assetPath("/MTT/FR _ MTT/Άρτεμις/mtt-126.jpg"),
      assetPath("/MTT/FR _ MTT/Γιώργος/mtt-304.jpg")
    ],
    members: [
      {
        id: "aristotelis",
        name: "Αριστοτέλης",
        photo: assetPath("/MTT/FR _ MTT/Αριστοτέλης/mtt-100.jpg")
      },
      {
        id: "artemis",
        name: "Άρτεμις",
        photo: assetPath("/MTT/FR _ MTT/Άρτεμις/mtt-125.jpg")
      },
      {
        id: "giorgos",
        name: "Γιώργος",
        photo: assetPath("/MTT/FR _ MTT/Γιώργος/mtt-303.jpg")
      },
      {
        id: "eirini",
        name: "Ειρήνη",
        photo: assetPath("/MTT/FR _ MTT/Ειρήνη/mtt-26.jpg")
      },
      {
        id: "eleni",
        name: "Ελένη",
        photo: assetPath("/MTT/FR _ MTT/Ελένη/mtt-104.jpg")
      },
      {
        id: "martina",
        name: "Μαρτίνα",
        photo: assetPath("/MTT/FR _ MTT/Μαρτίνα/mtt-118.jpg")
      }
    ]
  },
  {
    slug: "speakers",
    title: "Speakers",
    description: "Speaker curation and liaison.",
    heroImages: [
      assetPath("/MTT/Speakers _ MTT/Έλενα Κ./mtt-386.jpg"),
      assetPath("/MTT/Speakers _ MTT/Ελευθερία/mtt-435.jpg"),
      assetPath("/MTT/Speakers _ MTT/Κωνσταντίνος/mtt-402.jpg")
    ],
    members: [
      {
        id: "elena-k",
        name: "Έλενα Κ.",
        photo: assetPath("/MTT/Speakers _ MTT/Έλενα Κ./mtt-385.jpg")
      },
      {
        id: "eleftheria",
        name: "Ελευθερία",
        photo: assetPath("/MTT/Speakers _ MTT/Ελευθερία/mtt-434.jpg")
      },
      {
        id: "konstantinos",
        name: "Κωνσταντίνος",
        photo: assetPath("/MTT/Speakers _ MTT/Κωνσταντίνος/mtt-401.jpg")
      }
    ]
  },
  {
    slug: "experience",
    title: "Experience",
    description: "Designing attendee and speaker experience.",
    heroImages: [
      assetPath("/MTT/Experience _ MTT/Αρετή/mtt-235.jpg"),
      assetPath("/MTT/Experience _ MTT/Ελπίδα/mtt-282.jpg"),
      assetPath("/MTT/Experience _ MTT/Φανή/mtt-329.jpg")
    ],
    members: [
      {
        id: "areti",
        name: "Αρετή",
        photo: assetPath("/MTT/Experience _ MTT/Αρετή/mtt-234.jpg")
      },
      {
        id: "elpida",
        name: "Ελπίδα",
        photo: assetPath("/MTT/Experience _ MTT/Ελπίδα/mtt-230.jpg")
      },
      {
        id: "nancy",
        name: "Νάνσυ",
        photo: assetPath("/MTT/Experience _ MTT/Νάνσυ/mtt-215.jpg")
      },
      {
        id: "fani",
        name: "Φανή",
        photo: assetPath("/MTT/Experience _ MTT/Φανή/mtt-328.jpg")
      }
    ]
  },
  {
    slug: "venue",
    title: "Venue",
    description: "Venue logistics and on-site operations.",
    heroImages: [
      assetPath("/MTT/Venue _ MTT/Θοδωρής/mtt-540.jpg"),
      assetPath("/MTT/Venue _ MTT/Φένια/mtt-138.jpg"),
      assetPath("/MTT/Venue _ MTT/Φένια/mtt-139.jpg")
    ],
    members: [
      {
        id: "thodoris",
        name: "Θοδωρής",
        photo: assetPath("/MTT/Venue _ MTT/Θοδωρής/mtt-539.jpg")
      },
      {
        id: "fenia",
        name: "Φένια",
        photo: assetPath("/MTT/Venue _ MTT/Φένια/mtt-137.jpg")
      }
    ]
  },
  {
    slug: "social-media",
    title: "Social Media",
    description: "Communications, socials and outreach.",
    heroImages: [
      assetPath("/MTT/Media _ MTT/Έλενα Ξ./mtt-22.jpg"),
      assetPath("/MTT/Media _ MTT/Μαλβίνα/mtt-2.jpg"),
      assetPath("/MTT/Media _ MTT/Μυρτώ/mtt-206.jpg")
    ],
    members: [
      {
        id: "elena-x",
        name: "Έλενα Ξ.",
        photo: assetPath("/MTT/Media _ MTT/Έλενα Ξ./mtt-21.jpg")
      },
      {
        id: "malvina",
        name: "Μαλβίνα",
        photo: assetPath("/MTT/Media _ MTT/Μαλβίνα/mtt-1.jpg")
      },
      {
        id: "myrto",
        name: "Μυρτώ",
        photo: assetPath("/MTT/Media _ MTT/Μυρτώ/mtt-205.jpg")
      }
    ]
  }
];

export default teams;
