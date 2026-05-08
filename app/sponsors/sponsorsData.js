import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));
const supporterLogo = (fileName) => assetPath(`/eventimages/supporters/${fileName}`);
const internetLogo = (domain) => `https://www.google.com/s2/favicons?sz=256&domain=${domain}`;

export const sponsorTiers = [
  {
    tier: "Diamond",
    sponsors: [
      { 
        name: "ΔΕΗ",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/%CE%94%CE%95%CE%97_logo.png",
        link: "https://www.dei.gr/el/"
      }
      
    ]
  },
  {
    tier: "Platinum",
    sponsors: [
      {
        "name": "Oliver Wyman",
        "logo": "https://www.oliverwyman.com/content/dam/oliver-wyman/v3/logos/header-logo-oliver-wyman-black.svg",
        "link": "https://www.oliverwyman.com/"
      },
      {
        "name": "Deree",
        "logo": "https://www.acg.edu/wp-content/uploads/2017/04/logo_white_ACGBigger.png",
        "link": "https://www.acg.edu/"
      },
      {
        "name": "Dialectica",
        "logo": supporterLogo("Dialectica_idzOXMZJL7_0.png"),
        "link": "https://www.dialectica.io/"
      },
      {
        "name": "Alpha Bank",
        "logo": "https://www.alpha.gr/-/media/AlphaGr/Images/logo/alphaBank_logo.svg?iar=0&hash=1F750DEDB5C3D48D59DCC4FB13FC7F07",
        "link": "https://www.alpha.gr/",
        "CVlink": "https://career55.sapsf.eu/sfcareer/jobreqcareerpvt?jobId=2383&company=alphabank&st=741D170957426F827F412FB389FC8CEA7E3F7391"
      },
    ]
  },
  {
    tier: "Grand",
    sponsors: [
      {
        "name": "PWC",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/PwC_2025_Logo.svg/120px-PwC_2025_Logo.svg.png?_=20250429090744",
        "link": "https://www.pwc.com/"
      },
      {
        "name": "Iknowhow",
        "logo": "https://www.iknowhow.com/wp-content/uploads/2024/12/IKH-LOGO-WEB.png",
        "link": "https://www.iknowhow.com/"
      },
      {
        "name": "Epsilonnet",
        "logo": supporterLogo("LOGO_FILESEPSILONNET_logo.png"),
        "link": "https://epsilonnet.gr/"
      }
    ]
  },
  {
    tier: "Partners",
    sponsors: [
      {
    "name": "RedBull",
    "logo": supporterLogo("rebull.webp")
  },
  {
    "name": "Olympos",
    "logo": supporterLogo("olympos.png")
  },
      {
    "name": "ΑΦΗΣ",
    "logo": "https://afis.gr/wp-content/uploads/2023/12/afis-logo-big.png",
    "link": "https://afis.gr/"
  },
  {
    "name": "GDM Assets",
    "logo": "https://gdmassets.gr/wp-content/uploads/2023/06/GDM-Assets-Logo.webp",
    "link": "https://gdmassets.gr/"
  },
  {
    "name": "ZELUS IKE",
    "logo": supporterLogo("Zelus_Logo.png"),
    "link": "https://zelus.gr/"
  },
  {
    "name": "Evenly",
    "logo": supporterLogo("evenly-col-dark-tag.png"),
    "link": "https://evenly.care/el/"
  },
  {
    "name": "Mondelez",
    "logo": supporterLogo("mondelez.png")
  },
  {
    "name": "Vong",
    "logo": supporterLogo("vong.png")
  },
  {
    "name": "Septona",
    "logo": supporterLogo("septona.jpg")
  },
  {
    "name": "Doubia",
    "logo": supporterLogo("doubia.png")
  },
  {
    "name": "Frezyderm",
    "logo": supporterLogo("frezyderm-1.png")
  },
  {
    "name": "Papoutsanis",
    "logo": supporterLogo("papoutsanis-1.png")
  },
  {
    "name": "3E",
    "logo": supporterLogo("3e.png")
  }
    ]
  },
  {
    tier: "Venue Sponsors",
    sponsors: [
      {
    "name": "MEROPION ATHENS",
    "logo": supporterLogo("MeropeionLogo.png"),
    "link": "https://www.meropion.com/"
    },
    {
    "name": "COCO-MAT Hotels",
    "logo": supporterLogo("COCO-MAT-EVENTS.jpeg"),
    "link": "https://www.staycocomat.com/"
    }
  ]
  },
  {
    tier: "Community Partners",
    sponsors: [
      {
    "name": "ThinkBiz",
    "logo": supporterLogo("community partners/THINKBIZ.png")
  },
  {
    "name": "Prometheus",
    "logo": supporterLogo("community partners/prometheus.png")
  },
  {
    "name": "Oceanos",
    "logo": supporterLogo("community partners/oceanos.png")
  },
  {
    "name": "IEEE PES",
    "logo": supporterLogo("community partners/ieeePes.png")
  },
  {
    "name": "O Kosmos tou Pari",
    "logo": supporterLogo("community partners/kosmosTouParh.jpeg")
  },
  {
    "name": "Young Minds NKUA",
    "logo": supporterLogo("community partners/YMNkua.png")
  },
  {
    "name": "Athens Negotiations Tournament",
    "logo": supporterLogo("community partners/logosANT-1.png")
  },
  {
    "name": "FS DET",
    "logo": supporterLogo("community partners/fsDet.png")
  },
  {
    "name": "Euro Avia",
    "logo": supporterLogo("community partners/euroavia.png")
  }
    ]
  },
  {
    tier: "Communication Sponsor",
    sponsors: [
      {
    "name": "ERT GR",
    "logo": supporterLogo("communication sponsor/ERT.png")
  },
  {
    "name": "ERT Radio",
    "logo": supporterLogo("communication sponsor/ertRadio.png")
  }
    ]
  },
  {
    tier: "Media Partners",
    sponsors: [
      {
    "name": "The Stack",
    "logo": supporterLogo("theStack-1.png")
  },
  {
    "name": "Kleidarithmos",
    "logo": supporterLogo("kleidarithmos.png")
  },
  {
    "name": "Athens Surreal",
    "logo": supporterLogo("media partners/athensSurreal.png")
  },
  {
    "name": "Drink Da Milk",
    "logo": supporterLogo("media partners/drinkDaMilk.PNG")
  },
  {
    "name": "ISWS",
    "logo": supporterLogo("media partners/isws.jpeg")
  },
  {
    "name": "Meltemi",
    "logo": supporterLogo("media partners/meltemi.JPG")
  },
  {
    "name": "Neolaia",
    "logo": supporterLogo("media partners/neolaia.png")
  },
  {
    "name": "Neopolis",
    "logo": supporterLogo("media partners/neopolis.png")
  },
  {
    "name": "Optiko",
    "logo": supporterLogo("media partners/optiko_logo.jpg")
  },
  {
    "name": "Toxiko Meli",
    "logo": supporterLogo("media partners/toxiko-meli.png")
  },
  {
    "name": "Yperoxi Athina",
    "logo": supporterLogo("media partners/yperoxiAthina.png")
  }
    ]
  },
  {
    tier: "Supporters",
    sponsors: [
      {
    "name": "What They Said",
    "logo": supporterLogo("whattheysaid.jpeg")
  },
  {
    "name": "New Cult",
    "logo": supporterLogo("new cult logo.png")
  },
  {
    "name": "Studio Materiality",
    "logo": supporterLogo("studioMateriality.png")
  },
      {
    "name": "Symetal",
    "logo": supporterLogo("SYMETAL_sq-1.png"),
    "link": "https://www.symetal.gr/"
  },
  {
    "name": "Ελληνική Παραγωγή",
    "logo": "https://hellenicproduction.org/wp-content/uploads/2017/09/logo.png",
    "link": "https://hellenicproduction.org/"
  },
  {
    "name": "Helintec",
    "logo": supporterLogo("helintec.jpeg"),
    "link": "https://www.helintec.com/"
  },
  {
    "name": "IKY Erasmus +",
    "logo": supporterLogo("ikyErasmus.jpg"),
    "link": "https://www.iky.gr/"
  },
  {
    "name": "Deep Sea",
    "logo": supporterLogo("deepsea_logo.png"),
    "link": "https://www.deepsea.ai/"
  },
  {
    "name": "Nutribullet",
    "logo": supporterLogo("nutribullet.png"),
    "link": "https://www.nutribullet.com/el-gr"
  },
  {
    "name": "Havana Van",
    "logo": supporterLogo("HavanaVan.png"),
    "link": "http://havana.gr/"
  },
  {
    "name": "Traganos Tragos",
    "logo": supporterLogo("traganosTragos.png")
  },
  {
    "name": "Ta Grapha",
    "logo": supporterLogo("tagrapha.png")
  },
  {
    "name": "Xapsia",
    "logo": supporterLogo("xapsia.jpg")
  },
  {
    "name": "Piroskidis",
    "logo": supporterLogo("piroskidis-1.png")
  },
  {
    "name": "Pitsos Kabilo",
    "logo": supporterLogo("pitsoskabilo.png")
  },
  {
    "name": "Dionysakis",
    "logo": supporterLogo("dionysakhs.png")
  },
  {
    "name": "Lorda",
    "logo": supporterLogo("lorda-1.png")
  },
  {
    "name": "Big Nick",
    "logo": supporterLogo("bignick-1.png")
  },
  {
    "name": "Savikos",
    "logo": supporterLogo("savikos.png")
  },
  {
    "name": "Everest",
    "logo": supporterLogo("everest-1.png")
  },
  {
    "name": "Aegean Beauty",
    "logo": supporterLogo("aegeanBeauty.jpeg")
  },
  {
    "name": "efood",
    "logo": supporterLogo("efood-1.png")
  },
  {
    "name": "Haribo",
    "logo": supporterLogo("haribo.PNG")
  },
  {
    "name": "Kyana",
    "logo": supporterLogo("kyana-1.png")
  },
  {
    "name": "La Greche",
    "logo": supporterLogo("laGreche-1.png")
  },
  {
    "name": "Messinian Spa",
    "logo": supporterLogo("messinianSpa-1.png")
  },
  {
    "name": "Mega Spileo Estate",
    "logo": supporterLogo("megaSpileoEstate.png")
  },
  {
    "name": "Mon Reve",
    "logo": supporterLogo("monReve.png")
  },
  {
    "name": "Mr Crepito",
    "logo": supporterLogo("mrCrepito.jpeg")
  },
  {
    "name": "Nanou",
    "logo": supporterLogo("nanou-1.png")
  },
  {
    "name": "Natura Siberica",
    "logo": supporterLogo("naturaSiberica.png")
  },
  {
    "name": "Oler Secreto",
    "logo": supporterLogo("olersecreto.jpg")
  },
  {
    "name": "Pellito",
    "logo": supporterLogo("pellito.jpg")
  },
  {
    "name": "Plac Control",
    "logo": supporterLogo("placContol.jpg")
  },
  {
    "name": "Sdoukos",
    "logo": supporterLogo("sdoukos.png")
  },
  {
    "name": "Stergiou",
    "logo": supporterLogo("stergiou-1.png")
  },
  {
    "name": "TT Clean",
    "logo": supporterLogo("ttclean-1.png")
  },
  {
    "name": "Wowchi",
    "logo": supporterLogo("wowchi-1.png")
  },
  {
    "name": "Zografos",
    "logo": supporterLogo("zografos.png")
  },
  {
    "name": "AB Vasilopoulos",
    "logo": supporterLogo("ab.png"),
    "link": "https://www.ab.gr/"
  },
  {
    "name": "Ioniki",
    "logo": supporterLogo("ioniki.png"),
    "link": "https://www.ioniki.com/en"
  },
  {
    "name": "TEFACO S.A.",
    "logo": supporterLogo("tefaco.jpeg"),
    "link": "http://www.tefaco.gr/"
  },
  {
    "name": "Vamvalis Foods",
    "logo": supporterLogo("vamvalisFoods.jpg"),
    "link": "https://www.vamvalisfoods.com/"
  },
  {
    "name": "PEGASOS S.A.",
    "logo": supporterLogo("pigasosSA.png"),
    "link": "https://pegasos.com.gr/en/"
  },
  {
    "name": "Amam Smash",
    "logo": supporterLogo("amamSmash.png"),
    "link": "https://alimosagora.gr/en/listing/amam-smash/"
  },
  {
    "name": "One Burger",
    "logo": supporterLogo("oneBurger.png"),
    "link": "https://www.oneburger.com/"
  },
  {
    "name": "Starbucks",
    "logo": supporterLogo("starbucks.png"),
    "link": "https://www.starbucks.com.gr/"
  },
  {
    "name": "Occhio Papavassiliou",
    "logo": supporterLogo("occhioPapavassiliou.jpg"),
    "link": "https://www.occhio.gr/en"
  },
  {
    "name": "Cookie Land",
    "logo": supporterLogo("cookieLand.png"),
    "link": "https://cookieland.gr/en/"
  },
  {
    "name": "Legit Coffee",
    "logo": supporterLogo("legitCoffee.png"),
    "link": "https://www.instagram.com/legitcoffeegr/"
  },
  {
    "name": "Arla",
    "logo": internetLogo("arlafoods.gr"),
    "link": "https://www.arlafoods.gr/"
  },
  {
    "name": "Pistachio Tales and Trails",
    "logo": supporterLogo("pistachioTalesAndTrails.jpeg"),
    "link": "https://www.pistachiotalesandtrails.com/"
  },
  {
    "name": "Nymfi Beer",
    "logo": supporterLogo("nymfi.jpg"),
    "link": "https://nymfi-beer.gr/"
  },
  {
    "name": "Archelaou Ena",
    "logo": supporterLogo("archileouEna.png"),
    "link": "https://www.google.com/maps/search/?api=1&query=Archelaou+1+Athens"
  },
  {
    "name": "SKAG",
    "logo": internetLogo("skag.gr"),
    "link": "https://www.skag.gr/"
  },
  {
    "name": "Sanitas",
    "logo": supporterLogo("sanitas.webp"),
    "link": "https://www.sanitas.com.gr/"
  },
  {
    "name": "genAIRation",
    "logo": supporterLogo("genAIRation.png")
  }
    ]
  }
];
