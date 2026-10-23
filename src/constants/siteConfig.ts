type SiteConfig = {
  name: string;
  description: string;
  tagline: string;
  url: string;
  language: string;
  author: {
    name: string;
    url: string;
  };
  links: {
    repository: string;
    support: string;
  };
};

export const siteConfig = {
  name: "BasisLens",
  description:
    "Free, private crypto cost-basis calculator that runs entirely in your browser.",
  tagline:
    "See exactly how every number was calculated — and your data never leaves your device.",
  url: "https://basislens.vercel.app",
  language: "en",
  author: {
    name: "Sviatoslav Zvonyk",
    url: "https://sviatoslav-portfolio.vercel.app",
  },
  links: {
    repository: "https://github.com/SviatoslavZv/basislens",
    support: "https://ko-fi.com/sviatoslavzv",
  },
} as const satisfies SiteConfig;
