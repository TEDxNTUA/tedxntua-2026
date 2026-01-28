export type Member = {
  id: string;
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
};

export type Team = {
  slug: string;
  title: string;
  description?: string;
  heroImages?: string[];
  members?: Member[];
};

// Edit this file to add/remove teams and members. Use reachable image URLs or local paths.
export const teams: Team[] = [
  {
    slug: "curator",
    title: "Curator",
    description: "The people curating the talks and program.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Curator+1",
      "https://via.placeholder.com/1000x400?text=Curator+2",
      "https://via.placeholder.com/1000x400?text=Curator+3"
    ],
    members: [
      { id: "alex", name: "Alex Pap", role: "Head Curator", photo: "https://via.placeholder.com/300?text=Alex" },
      { id: "marie", name: "Marie Io", role: "Curator", photo: "https://via.placeholder.com/300?text=Marie" },
      { id: "sam", name: "Sam T.", role: "Curator", photo: "https://via.placeholder.com/300?text=Sam" }
    ]
  },
  {
    slug: "it",
    title: "IT",
    description: "Technology, infrastructure and stage management.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=IT+1",
      "https://via.placeholder.com/1000x400?text=IT+2",
      "https://via.placeholder.com/1000x400?text=IT+3"
    ],
    members: [
      { id: "niko", name: "Niko S.", role: "Lead Engineer", photo: "https://via.placeholder.com/300?text=Niko" },
      { id: "leo", name: "Leon", role: "AV", photo: "https://via.placeholder.com/300?text=Leon" }
    ]
  },
  {
    slug: "design",
    title: "Design",
    description: "Visual identity, stage visuals and branding.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Design+1",
      "https://via.placeholder.com/1000x400?text=Design+2",
      "https://via.placeholder.com/1000x400?text=Design+3"
    ],
    members: [
      { id: "d1", name: "Dana", role: "Lead Designer", photo: "https://via.placeholder.com/300?text=Dana" },
      { id: "d2", name: "Iris", role: "Graphic Designer", photo: "https://via.placeholder.com/300?text=Iris" }
    ]
  },
  {
    slug: "speakers",
    title: "Speakers",
    description: "Speaker curation and liaison.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Speakers+1",
      "https://via.placeholder.com/1000x400?text=Speakers+2",
      "https://via.placeholder.com/1000x400?text=Speakers+3"
    ],
    members: [
      { id: "s1", name: "Elena", role: "Speakers Lead", photo: "https://via.placeholder.com/300?text=Elena" },
      { id: "s2", name: "Tom", role: "Speakers Coord.", photo: "https://via.placeholder.com/300?text=Tom" }
    ]
  },
  {
    slug: "experience",
    title: "Experience",
    description: "Designing attendee and speaker experience.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Experience+1",
      "https://via.placeholder.com/1000x400?text=Experience+2",
      "https://via.placeholder.com/1000x400?text=Experience+3"
    ],
    members: [
      { id: "eva", name: "Eva R.", role: "Experience Lead", photo: "https://via.placeholder.com/300?text=Eva" },
      { id: "mina", name: "Mina", role: "Volunteer Coordinator", photo: "https://via.placeholder.com/300?text=Mina" },
      { id: "dave", name: "Dave", role: "Designer", photo: "https://via.placeholder.com/300?text=Dave" }
    ]
  },
  {
    slug: "venue",
    title: "Venue",
    description: "Venue logistics and on-site operations.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Venue+1",
      "https://via.placeholder.com/1000x400?text=Venue+2",
      "https://via.placeholder.com/1000x400?text=Venue+3"
    ],
    members: [
      { id: "v1", name: "George", role: "Venue Manager", photo: "https://via.placeholder.com/300?text=George" },
      { id: "v2", name: "Sofia", role: "Logistics", photo: "https://via.placeholder.com/300?text=Sofia" }
    ]
  },
  {
    slug: "social-media",
    title: "Social Media",
    description: "Communications, socials and outreach.",
    heroImages: [
      "https://via.placeholder.com/1000x400?text=Social+1",
      "https://via.placeholder.com/1000x400?text=Social+2",
      "https://via.placeholder.com/1000x400?text=Social+3"
    ],
    members: [
      { id: "sm1", name: "Lena", role: "Social Lead", photo: "https://via.placeholder.com/300?text=Lena" },
      { id: "sm2", name: "Omar", role: "Content", photo: "https://via.placeholder.com/300?text=Omar" },
      { id: "sm3", name: "Rita", role: "Community", photo: "https://via.placeholder.com/300?text=Rita" }
    ]
  }
];

export default teams;
