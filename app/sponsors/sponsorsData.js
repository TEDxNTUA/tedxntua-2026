import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

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
        "logo": assetPath("/eventimages/Dialectica_idzOXMZJL7_0.png"),
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
        "logo": withBasePath("/eventimages/LOGO_FILESEPSILONNET_logo.png"),
        "link": "https://epsilonnet.gr/"
      }
    ]
  },
  {
    tier: "Partners",
    sponsors: [
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
    "logo": withBasePath("/eventimages/Zelus_Logo.png"),
    "link": "https://zelus.gr/"
  },
  {
    "name": "Evenly",
    "logo": withBasePath("/eventimages/evenly-col-dark-tag.png"),
    "link": "https://evenly.care/el/"
  }
    ]
  },
  {
    tier: "Venue Sponsors",
    sponsors: [
      {
    "name": "MEROPION ATHENS",
    "logo": "/eventimages/MeropeionLogo.png",
    "link": "https://www.meropion.com/"
    },
    {
    "name": "COCO-MAT Hotels",
    "logo": "/eventimages/COCO-MAT-EVENTS.jpeg",
    "link": "https://www.staycocomat.com/"
    }
  ]
  },
  {
    tier: "Supporters",
    sponsors: [
      {
    "name": "Symetal",
    "logo": assetPath("/eventimages/SYMETAL_sq-1.png"),
    "link": "https://www.symetal.gr/"
  },
  {
    "name": "Ελληνική Παραγωγή",
    "logo": "https://hellenicproduction.org/wp-content/uploads/2017/09/logo.png",
    "link": "https://hellenicproduction.org/"
  },
  {
    "name": "HELINTECH",
    "logo": "https://helintech.com/src/img/logo.png",
    "link": "https://helintech.com/"
  },
  {
    "name": "IKY",
    "logo": "https://www.iky.gr/wp-content/uploads/2023/08/%CE%9B%CE%BF%CE%B3%CF%8C%CF%84%CF%85%CF%80%CE%BF_%CE%99%CE%9A%CE%A5-1-300x279.jpeg.webp",
    "link": "https://www.iky.gr/"
  },
  {
    "name": "Deep Sea",
    "logo": withBasePath("/eventimages/deepsea_logo.png"),
    "link": "https://www.deepsea.ai/"
  },
  {
    "name": "Nutribullet",
    "logo": withBasePath("/eventimages/nutribullet.png"),
    "link": "https://www.nutribullet.com/el-gr"
  },
  {
    "name": "Havana Van",
    "logo": withBasePath("/eventimages/HavanaVan.png"),
    "link": "http://havana.gr/"
  }
    ]
  }
];
