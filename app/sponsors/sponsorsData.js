import { withBasePath } from "../lib/basePath";

const assetPath = (path) => encodeURI(withBasePath(path));

export const sponsorTiers = [
  {
    tier: "Diamond",
    icon: "💎",
    sponsors: [
      { 
        name: "Google",
        logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
      },
      { 
        name: "Microsoft",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
      }
    ]
  },
  {
    tier: "Platinum",
    icon: "⭐",
    sponsors: [
      { 
        name: "Amazon Web Services",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
      },
      { 
        name: "IBM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
      },
      { 
        name: "Intel",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Intel_logo.svg"
      }
    ]
  },
  {
    tier: "Grand",
    icon: "✨",
    sponsors: [
      { 
        name: "Cisco Systems",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg"
      },
      { 
        name: "Adobe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg"
      },
      { 
        name: "Salesforce",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg"
      },
      { 
        name: "Oracle",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Oracle_logo.svg"
      },
      { 
        name: "VMware",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Vmware_logo.svg"
      }
    ]
  },
  {
    tier: "Partners",
    icon: "🤝",
    sponsors: [
      { 
        name: "GitHub",
        logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      },
      { 
        name: "Slack",
        logo: "https://a.slack-edge.com/80588/marketing/downloads/logo-download-files/slack_logo_480.png"
      },
      { 
        name: "Figma",
        logo: "https://s3-us-west-2.amazonaws.com/figma-site/logo/logo-black.png"
      },
      { 
        name: "JetBrains",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/IntelliJ_IDEA_Icon.svg"
      }
    ]
  },
  {
    tier: "Supporters",
    icon: "🚀",
    sponsors: [
      { 
        name: "Vercel",
        logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png"
      },
      { 
        name: "Digital Ocean",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/DigitalOcean_logo.svg"
      },
      { 
        name: "HashiCorp",
        logo: "https://www.datocms-assets.com/2885/1629941242-logotype.svg"
      },
      { 
        name: "Supabase",
        logo: "https://supabase.com/brand/supabase-logo-wordmark--dark.png"
      },
      { 
        name: "Stripe",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
      },
      { 
        name: "Auth0",
        logo: "https://cdn.worldvectorlogo.com/logos/auth0.svg"
      },
      { 
        name: "Datadog",
        logo: "https://imgix.datadoghq.com/img/about/presskit/logo-v/dd_vertical_purple.png"
      },
      { 
        name: "New Relic",
        logo: "https://newrelic.com/assets/newrelic/source/NewRelic-logo-square.png"
      }
    ]
  }
];
